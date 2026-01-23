import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';

import RecipeDetailModal from './RecipeDetailModal';

function ModalHarness() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>
      <RecipeDetailModal
        isOpen={isOpen}
        title="Test Recipe"
        onClose={() => setIsOpen(false)}
      >
        <p>Modal body</p>
        <button type="button">Inner action</button>
      </RecipeDetailModal>
    </div>
  );
}

describe('RecipeDetailModal', () => {
  it('renders title and body when open', () => {
    render(
      <RecipeDetailModal isOpen title="Test Recipe" onClose={vi.fn()}>
        <p>Modal body</p>
      </RecipeDetailModal>,
    );

    expect(screen.getByRole('dialog', { name: 'Test Recipe' })).toBeInTheDocument();
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <RecipeDetailModal isOpen={false} title="Test Recipe" onClose={vi.fn()}>
        <p>Modal body</p>
      </RecipeDetailModal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when backdrop is clicked', () => {
    const handleClose = vi.fn();

    render(
      <RecipeDetailModal isOpen title="Test Recipe" onClose={handleClose}>
        <p>Modal body</p>
      </RecipeDetailModal>,
    );

    const closeButtons = screen.getAllByRole('button', { name: 'Close recipe details' });
    fireEvent.click(closeButtons[0]);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus and returns it after closing with escape', () => {
    render(<ModalHarness />);

    const triggerButton = screen.getByRole('button', { name: 'Open modal' });
    triggerButton.focus();
    fireEvent.click(triggerButton);

    const closeButtons = screen.getAllByRole('button', { name: 'Close recipe details' });
    const closeButton = closeButtons[1];
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(triggerButton).toHaveFocus();
  });
});
