"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toast() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      expand={false}
      toastOptions={{
        classNames: {
          toast:
            "font-sans text-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700",
          title: "font-semibold",
          description: "text-gray-500 dark:text-gray-400",
        },
        duration: 4000,
      }}
    />
  );
}

export { Toast as Toaster };
