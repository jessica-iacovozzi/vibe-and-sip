import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';

type RecipeDetailModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

function RecipeDetailModal({ isOpen, title, onClose, children }: RecipeDetailModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    lastActiveElement.current = document.activeElement as HTMLElement | null;

    const focusableSelectors =
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

    const focusFirstElement = () => {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(focusableSelectors) ?? [];
      const first = focusable[0];
      if (first) {
        first.focus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(focusableSelectors) ?? [];
      const focusableArray = Array.from(focusable);
      if (focusableArray.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableArray[0];
      const last = focusableArray[focusableArray.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    focusFirstElement();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      lastActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="recipe-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <button
        className="recipe-modal-backdrop"
        type="button"
        aria-label="Close recipe details"
        onClick={onClose}
      />
      <div className="recipe-modal-card" role="document" ref={modalRef}>
        <header className="recipe-modal-header">
          <h2 className="recipe-modal-title" id={titleId}>
            {title}
          </h2>
          <button
            className="recipe-modal-close"
            type="button"
            aria-label="Close recipe details"
            onClick={onClose}
          >
            Close
          </button>
        </header>
        <div className="recipe-modal-body" id={descriptionId}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailModal;
