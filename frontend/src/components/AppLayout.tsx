import { useEffect, useRef, useState } from 'react';

import { cocktails } from '../data';
import { occasionOptions } from '../domain/occasionOptions';
import rankVibesByOccasion from '../utils/rankVibesByOccasion';
import type { VibeResponse } from '../utils/api';
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
  const { vibes, isLoading, error, reload } = useVibes({ occasionId: selectedOccasionId });
  const [selectedVibeId, setSelectedVibeId] = useState('');
  const [isPairingReady, setIsPairingReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasMounted = useRef(false);

  const hasError = error.length > 0;
  const rankedVibes = rankVibesByOccasion(vibes, selectedOccasionId);
  const hasVibes = rankedVibes.length > 0;
  const selectedVibe = rankedVibes.find((vibe) => vibe.id === selectedVibeId);
  const showLoading = isLoading && !hasVibes && !hasError;
  const hasOccasionMatch =
    selectedOccasionId.length === 0 ||
    cocktails.some((cocktail) => cocktail.occasionIds.includes(selectedOccasionId));

  const handleVibeSelect = (vibeId: string) => {
    setSelectedVibeId(vibeId);
    setIsPairingReady(true);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setIsTransitioning(true);
    window.setTimeout(() => setIsTransitioning(false), 180);
  }, [selectedOccasionId]);

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
          <button className="primary" type="button">
            Start drink pairing
          </button>
        </div>
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
