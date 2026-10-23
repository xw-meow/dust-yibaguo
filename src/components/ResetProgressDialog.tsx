import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconClose, IconTrash } from './Icons';

interface ResetProgressDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function ResetProgressDialog({ open, onCancel, onConfirm }: ResetProgressDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => cancelRef.current?.focus(), 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div
      className="reset-modal"
      role="presentation"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        ref={panelRef}
        className="reset-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-dialog-title"
        aria-describedby="reset-dialog-desc"
      >
        <span className="reset-modal__icon" aria-hidden="true">
          <IconTrash size={22} />
        </span>
        <button
          type="button"
          className="reset-modal__close"
          aria-label="关闭"
          onClick={onCancel}
        >
          <IconClose size={14} />
        </button>

        <h2 id="reset-dialog-title">清空全部学习进度？</h2>
        <p id="reset-dialog-desc">
          所有方向的掌握记录、挑战次数、最佳成绩与成就进度都会被删除，且无法恢复。
        </p>

        <div className="reset-modal__actions">
          <button
            ref={cancelRef}
            type="button"
            className="reset-modal__cancel"
            onClick={onCancel}
          >
            取消
          </button>
          <button type="button" className="reset-modal__danger" onClick={onConfirm}>
            确认清空
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
