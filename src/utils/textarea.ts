import type { KeyboardEvent } from "react";

export const createTextareaKeyDown =
  (onSubmit: () => void) => (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
