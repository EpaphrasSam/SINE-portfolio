'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ToastContextType {
  toast: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setToast(message);
    const id = setTimeout(() => {
      setToast(null);
    }, 3000);
    setTimeoutId(id);
  }, [timeoutId]);

  const hideToast = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setToast(null);
  }, [timeoutId]);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
