"use client";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new Event("styling-spaces:open-cookie-preferences"),
        )
      }
      className="text-left text-sm text-ivory-muted transition-colors hover:text-ivory"
    >
      Cookie preferences
    </button>
  );
}
