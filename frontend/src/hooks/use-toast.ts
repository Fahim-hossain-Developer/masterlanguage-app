"use client";

import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning" | "loading";

interface ToastOptions {
  description?: string;
  duration?: number;
  id?: string | number;
}

export function useToast() {
  const show = (
    type: ToastType,
    message: string,
    options?: ToastOptions
  ) => {
    const { description, duration, id } = options ?? {};

    switch (type) {
      case "success":
        return toast.success(message, { description, duration, id });
      case "error":
        return toast.error(message, { description, duration, id });
      case "info":
        return toast.info(message, { description, duration, id });
      case "warning":
        return toast.warning(message, { description, duration, id });
      case "loading":
        return toast.loading(message, { description, id });
      default:
        return toast(message, { description, duration, id });
    }
  };

  const success = (message: string, options?: ToastOptions) =>
    show("success", message, options);

  const error = (message: string, options?: ToastOptions) =>
    show("error", message, options);

  const info = (message: string, options?: ToastOptions) =>
    show("info", message, options);

  const warning = (message: string, options?: ToastOptions) =>
    show("warning", message, options);

  const loading = (message: string, options?: ToastOptions) =>
    show("loading", message, options);

  const dismiss = (id?: string | number) => toast.dismiss(id);

  const promise = <T>(
    promiseFn: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: unknown) => string);
    }
  ) =>
    toast.promise(promiseFn, {
      loading: messages.loading,
      success: messages.success as string,
      error: messages.error as string,
    });

  return { success, error, info, warning, loading, dismiss, promise, show };
}
