import { useEffect, useRef, useState } from 'react';

import { cocktails } from '../data';
import { occasionOptions } from '../domain/occasionOptions';
import {
  DEFAULT_DIFFICULTY_ID,
  DIFFICULTY_LEVELS,
  DIFFICULTY_HELPER_TEXT,
  DIFFICULTY_QUERY_PARAM,
  DIFFICULTY_URL_SYNC_ENABLED,
} from '../domain/difficultyConfig';
import rankVibesByOccasion from '../utils/rankVibesByOccasion';
import {
  buildCocktailsUrl,
  fetchCocktails,
  type CocktailListItem,
  type CocktailsResponse,
  type VibeResponse,
} from '../utils/api';
import useVibes from '../utils/useVibes';

type NavItem = {
  label: string;
  helper: string;
  isActive: boolean;
};

type FlowStep = {
  title: string;
  description: string;
  meta: string;
};

type SessionDetail = {
  label: string;
  value: string;
};

type OccasionToggleGroupProps = {
  selectedId: string;
  onSelect: (occasionId: string) => void;
};

type FilterQueryState = {
  vibeId: string;
  occasionId: string;
  difficultyId: string;
  page: number;
};

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="100%" height="100%" fill="%23efe7de"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23806c5b" font-size="12">Vibe & Sip</text></svg>';

const RESULTS_LIMIT = 12;

const navItems: NavItem[] = [
  { label: 'Discover', helper: 'Mood & guests', isActive: true },
  { label: 'Plan', helper: 'Experience', isActive: false },
  { label: 'Reserve', helper: 'Inventory', isActive: false },
  { label: 'Confirm', helper: 'Checkout', isActive: false },
];

const flowSteps: FlowStep[] = [
  {
    title: 'Define the vibe',
    description: 'Pick the feel, palette, and soundtrack to anchor the night.',
    meta: 'Mood starter',
  },
  {
    title: 'Build the lineup',
    description: 'Select pours, bites, and hosts that match the energy.',
    meta: 'Menu draft',
  },
  {
    title: 'Lock the moments',
    description: 'Shape arrival rituals, pacing, and the headline toast.',
    meta: 'Timeline',
  },
];

const sessionDetails: SessionDetail[] = [
  { label: 'Location', value: 'Downtown Loft' },
  { label: 'Date', value: 'Oct 12 · 7:00 PM' },
  { label: 'Guests', value: '12–18' },
  { label: 'Budget', value: '$72 / guest' },
];

const focusAreas = ['Staffing', 'Inventory', 'Storytelling cues'];

const getInitialDifficulty = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get(DIFFICULTY_QUERY_PARAM) ?? DEFAULT_DIFFICULTY_ID;
};

const getDifficultyIndex = (difficultyId: string): number => {
  const resolvedId = difficultyId.length > 0 ? difficultyId : DEFAULT_DIFFICULTY_ID;
  const index = DIFFICULTY_LEVELS.findIndex((level) => level.id === resolvedId);

  return index >= 0 ? index : 1;
};

const getDifficultyIdFromIndex = (index: number): string =>
  DIFFICULTY_LEVELS[index]?.id ?? DEFAULT_DIFFICULTY_ID;

type CocktailResultListProps = {
  cocktails: CocktailListItem[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

function CocktailResultsList({
  cocktails: cocktailItems,
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: CocktailResultListProps) {
  const showPagination = totalPages > 1;

  return (
    <div className="results-panel" aria-live="polite">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Curated results</p>
          <h3>Recommended cocktails</h3>
        </div>
        <span className="panel-pill">Step 2 · Results</span>
      </div>
      <ul className="results-list" aria-label="Cocktail results">
        {cocktailItems.map((cocktail) => (
          <li key={cocktail.id} className="result-card">
            <img
              src={cocktail.imageUrl ?? PLACEHOLDER_IMAGE}
              alt={cocktail.name}
              loading="lazy"
            />
            <div>
              <p className="result-title">{cocktail.name}</p>
              <p className="result-desc">{cocktail.description}</p>
            </div>
          </li>
        ))}
      </ul>
      {isLoading && (
        <p className="results-loading" role="status" aria-live="polite">
          Loading cocktails...
        </p>
      )}
      {showPagination && (
        <div className="results-pagination" role="navigation" aria-label="Results pages">
          <button
            className="secondary"
            type="button"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="results-page" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="secondary"
            type="button"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

type EmptyResultsStateProps = {
  onClear: () => void;
};

function EmptyResultsState({ onClear }: EmptyResultsStateProps) {
  return (
    <div className="results-empty" role="status" aria-live="polite">
      <p>No cocktails match those filters yet.</p>
      <button className="secondary" type="button" onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}

const syncFilterQueryParams = ({
  vibeId,
  occasionId,
  difficultyId,
  page,
}: FilterQueryState): void => {
  if (!DIFFICULTY_URL_SYNC_ENABLED) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const resolvedDifficulty = difficultyId.length > 0 ? difficultyId : DEFAULT_DIFFICULTY_ID;

  params.set(DIFFICULTY_QUERY_PARAM, resolvedDifficulty);
  if (vibeId.length > 0) {
    params.set('vibe', vibeId);
  } else {
    params.delete('vibe');
  }

  if (occasionId.length > 0) {
    params.set('occasion', occasionId);
  } else {
    params.delete('occasion');
  }

  if (page > 1) {
    params.set('page', String(page));
  } else {
    params.delete('page');
  }

  window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
};

function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          V&S
        </span>
        <div>
          <p className="brand-title">Vibe &amp; Sip</p>
          <p className="brand-subtitle">Flow shell · Base layout</p>
        </div>
      </div>
      <div className="session-pill" role="status">
        Session in progress
      </div>
    </header>
  );
}

function OccasionToggleGroup({ selectedId, onSelect }: OccasionToggleGroupProps) {
  return (
    <div className="occasion-filter">
      <p className="occasion-label">Occasion</p>
      <div className="occasion-toggle" role="group" aria-label="Occasion filter">
        {occasionOptions.map((option) => (
          <button
            key={option.id || 'occasion-all'}
            type="button"
            className={`occasion-chip${option.id === selectedId ? ' is-active' : ''}`}
            aria-pressed={option.id === selectedId}
            onClick={() => onSelect(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FlowNavItem({ label, helper, isActive }: NavItem) {
  return (
    <li>
      <button type="button" className="nav-item" aria-current={isActive ? 'page' : undefined}>
        <span>{label}</span>
        <small>{helper}</small>
      </button>
    </li>
  );
}

function FlowNav() {
  return (
    <nav className="app-nav" aria-label="Primary">
      <ul>
        {navItems.map((item) => (
          <FlowNavItem
            key={item.label}
            label={item.label}
            helper={item.helper}
            isActive={item.isActive}
          />
        ))}
      </ul>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero-tag">Core flow workspace</p>
      <h1 id="hero-title">Craft a tasting journey that feels intentional.</h1>
      <p className="hero-copy">
        This shell keeps your flow focused: define the vibe, shape the experience, and confirm the
        final guest-ready run of show.
      </p>
      <div className="hero-actions">
        <button className="primary" type="button">
          Start the flow
        </button>
        <button className="ghost" type="button">
          View sample itinerary
        </button>
      </div>
    </section>
  );
}

type VibeCardProps = {
  vibe: VibeResponse;
  isSelected: boolean;
  onSelect: (vibeId: string) => void;
};

function VibeCard({ vibe, isSelected, onSelect }: VibeCardProps) {
  return (
    <li>
      <button
        type="button"
        className={`vibe-card${isSelected ? ' is-selected' : ''}`}
        aria-pressed={isSelected}
        aria-label={vibe.name}
        onClick={() => onSelect(vibe.id)}
      >
        <span className="vibe-icon" aria-hidden="true">
          {vibe.imageUrl ?? '⋯'}
        </span>
        <span className="vibe-name">{vibe.name}</span>
        <span className="vibe-desc">{vibe.description}</span>
      </button>
    </li>
  );
}

function VibeSelectionSection() {
  const [selectedOccasionId, setSelectedOccasionId] = useState('');
  const [selectedDifficultyId, setSelectedDifficultyId] = useState(getInitialDifficulty);
  const { vibes, isLoading, error, reload } = useVibes({ occasionId: selectedOccasionId });
  const [selectedVibeId, setSelectedVibeId] = useState('');
  const [isPairingReady, setIsPairingReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cocktailResults, setCocktailResults] = useState<CocktailsResponse | null>(null);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [resultsError, setResultsError] = useState('');
  const [resultsPage, setResultsPage] = useState(1);
  const hasMounted = useRef(false);

  const hasError = error.length > 0;
  const rankedVibes = rankVibesByOccasion(vibes, selectedOccasionId);
  const hasVibes = rankedVibes.length > 0;
  const selectedVibe = rankedVibes.find((vibe) => vibe.id === selectedVibeId);
  const showLoading = isLoading && !hasVibes && !hasError;
  const hasOccasionMatch =
    selectedOccasionId.length === 0 ||
    cocktails.some((cocktail) => cocktail.occasionIds.includes(selectedOccasionId));
  const difficultyIndex = getDifficultyIndex(selectedDifficultyId);
  const difficultyLabel = DIFFICULTY_LEVELS[difficultyIndex]?.label ?? 'Balanced';
  const cocktailRequestUrl = buildCocktailsUrl({
    vibeId: selectedVibeId,
    occasionId: selectedOccasionId,
    difficultyId: selectedDifficultyId,
  });
  const resultItems = cocktailResults?.items ?? [];
  const hasResults = resultItems.length > 0;
  const totalPages = cocktailResults
    ? Math.max(1, Math.ceil(cocktailResults.total / cocktailResults.limit))
    : 0;

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextIndex = Number(event.target.value);
    setSelectedDifficultyId(getDifficultyIdFromIndex(nextIndex));
  };

  const handleVibeSelect = (vibeId: string) => {
    setSelectedVibeId(vibeId);
    setIsPairingReady(true);
  };

  const handleClearFilters = () => {
    setSelectedVibeId('');
    setSelectedOccasionId('');
    setSelectedDifficultyId(DEFAULT_DIFFICULTY_ID);
    setIsPairingReady(false);
    setResultsPage(1);
  };

  const handleResultsPageChange = (page: number) => {
    setResultsPage(page);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setIsTransitioning(true);
    window.setTimeout(() => setIsTransitioning(false), 180);
  }, [selectedOccasionId]);

  useEffect(() => {
    setSelectedDifficultyId(getInitialDifficulty());
  }, []);

  useEffect(() => {
    syncFilterQueryParams({
      vibeId: selectedVibeId,
      occasionId: selectedOccasionId,
      difficultyId: selectedDifficultyId,
      page: resultsPage,
    });
  }, [selectedVibeId, selectedOccasionId, selectedDifficultyId, resultsPage]);

  useEffect(() => {
    setResultsPage(1);
  }, [selectedVibeId, selectedOccasionId, selectedDifficultyId]);

  useEffect(() => {
    if (selectedVibeId.length === 0) {
      setCocktailResults(null);
      setResultsError('');
      setIsResultsLoading(false);
      return () => {};
    }

    const controller = new AbortController();
    setIsResultsLoading(true);
    setResultsError('');

    fetchCocktails({
      vibeId: selectedVibeId,
      occasionId: selectedOccasionId,
      difficultyId: selectedDifficultyId,
      page: resultsPage,
      limit: RESULTS_LIMIT,
      signal: controller.signal,
    })
      .then((response) => setCocktailResults(response))
      .catch((fetchError) => {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return;
        }
        setCocktailResults(null);
        setResultsError(
          fetchError instanceof Error ? fetchError.message : 'Failed to load cocktails.',
        );
      })
      .finally(() => setIsResultsLoading(false));

    return () => controller.abort();
  }, [selectedVibeId, selectedOccasionId, selectedDifficultyId, resultsPage]);

  return (
    <section className="vibe-panel" aria-labelledby="vibe-title">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Vibe selection</p>
          <h2 id="vibe-title">Choose the vibe</h2>
        </div>
        <span className="panel-pill">Step 1 · Drink pairing</span>
      </div>
      <p className="panel-subcopy">
        Scan the available vibes and pick the mood you want to anchor the night.
      </p>
      <OccasionToggleGroup selectedId={selectedOccasionId} onSelect={setSelectedOccasionId} />
      <div className="difficulty-filter">
        <div className="difficulty-header">
          <p className="difficulty-label">Difficulty</p>
          <span className="difficulty-value" aria-live="polite">
            {difficultyLabel}
          </span>
        </div>
        <input
          className="difficulty-slider"
          type="range"
          min={0}
          max={DIFFICULTY_LEVELS.length - 1}
          step={1}
          value={difficultyIndex}
          onChange={handleDifficultyChange}
          aria-label="Difficulty"
          aria-valuetext={difficultyLabel}
        />
        <div className="difficulty-steps" aria-hidden="true">
          {DIFFICULTY_LEVELS.map((level, index) => (
            <span
              key={level.id}
              className={`difficulty-step${index === difficultyIndex ? ' is-active' : ''}`}
            >
              {level.label}
            </span>
          ))}
        </div>
        <p className="difficulty-helper" role="note">
          {DIFFICULTY_HELPER_TEXT}
        </p>
      </div>
      {!hasOccasionMatch && (
        <p className="occasion-note" role="status" aria-live="polite">
          No direct matches for that occasion yet. Showing the full list instead.
        </p>
      )}
      {showLoading && (
        <div className="vibe-state" role="status" aria-live="polite">
          Loading vibes...
        </div>
      )}
      {hasError && (
        <div className="vibe-state vibe-error" role="alert">
          <p>{error}</p>
          <button className="secondary" type="button" onClick={() => reload()}>
            Retry
          </button>
        </div>
      )}
      {!hasError && (
        <ul
          className={`vibe-grid${isTransitioning ? ' is-fading' : ''}`}
          aria-label="Available vibes"
        >
          {rankedVibes.map((vibe) => (
            <VibeCard
              key={vibe.id}
              vibe={vibe}
              isSelected={vibe.id === selectedVibeId}
              onSelect={handleVibeSelect}
            />
          ))}
        </ul>
      )}
      {isPairingReady && selectedVibe && (
        <div className="vibe-flow" role="status" aria-live="polite">
          <div>
            <p className="vibe-flow-title">Drink pairing ready</p>
            <p className="vibe-flow-copy">Selected vibe: {selectedVibe.name}</p>
          </div>
          <button className="primary" type="button" data-request-url={cocktailRequestUrl}>
            Start drink pairing
          </button>
        </div>
      )}
      {selectedVibeId.length > 0 && resultsError.length > 0 && (
        <div className="results-empty" role="alert">
          <p>{resultsError}</p>
          <button className="secondary" type="button" onClick={handleClearFilters}>
            Clear filters
          </button>
        </div>
      )}
      {selectedVibeId.length > 0 && hasResults && (
        <CocktailResultsList
          cocktails={resultItems}
          currentPage={resultsPage}
          totalPages={totalPages}
          isLoading={isResultsLoading}
          onPageChange={handleResultsPageChange}
        />
      )}
      {selectedVibeId.length > 0 && !hasResults && !isResultsLoading && resultsError.length === 0 && (
        <EmptyResultsState onClear={handleClearFilters} />
      )}
      {!isLoading && !hasError && !hasVibes && (
        <div className="vibe-state" role="status" aria-live="polite">
          No vibes available right now.
        </div>
      )}
    </section>
  );
}

function FlowStepCard({ title, description, meta, index }: FlowStep & { index: number }) {
  return (
    <article className="flow-step" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="flow-step-header">
        <h3>{title}</h3>
        <span className="flow-step-meta">{meta}</span>
      </div>
      <p>{description}</p>
    </article>
  );
}

function FlowSteps() {
  return (
    <section className="flow-panel" aria-labelledby="flow-title">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Core flow</p>
          <h2 id="flow-title">Plan the experience</h2>
        </div>
        <span className="panel-pill">Step 1 of 4</span>
      </div>
      <div className="flow-steps">
        {flowSteps.map((step, index) => (
          <FlowStepCard
            key={step.title}
            index={index}
            title={step.title}
            description={step.description}
            meta={step.meta}
          />
        ))}
      </div>
    </section>
  );
}

function DetailItem({ label, value }: SessionDetail) {
  return (
    <div className="detail-item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function SessionDetails() {
  return (
    <dl className="detail-list">
      {sessionDetails.map((detail) => (
        <DetailItem key={detail.label} label={detail.label} value={detail.value} />
      ))}
    </dl>
  );
}

function FocusList() {
  return (
    <ul className="chip-list">
      {focusAreas.map((focus) => (
        <li key={focus}>{focus}</li>
      ))}
    </ul>
  );
}

function SessionSnapshotCard() {
  return (
    <div className="panel-card" aria-labelledby="session-title">
      <h3 id="session-title">Session snapshot</h3>
      <p className="panel-subcopy">Reference details anchored for the flow.</p>
      <SessionDetails />
    </div>
  );
}

function FocusAreasCard() {
  return (
    <div className="panel-card">
      <h3>Focus areas</h3>
      <p className="panel-subcopy">Keep these visible while building the plan.</p>
      <FocusList />
      <button className="secondary" type="button">
        Review constraints
      </button>
    </div>
  );
}

function SessionPanel() {
  return (
    <aside className="side-panel" aria-label="Session details">
      <SessionSnapshotCard />
      <FocusAreasCard />
    </aside>
  );
}

function MainContent() {
  return (
    <main className="app-main" id="main-content">
      <HeroSection />
      <VibeSelectionSection />
      <div className="main-grid">
        <FlowSteps />
        <SessionPanel />
      </div>
    </main>
  );
}

function AppLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <FlowNav />
      <MainContent />
      <footer className="app-footer">
        <p>Base app shell ready for the core user flow.</p>
        <span>Vibe &amp; Sip · MVP layout</span>
      </footer>
    </div>
  );
}

export default AppLayout;
