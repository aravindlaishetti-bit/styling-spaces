"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Cookie, X } from "lucide-react";
import Link from "next/link";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "styling-spaces-cookie-consent-v1";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

export function CookieConsent() {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);
  const [visible, setVisible] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as Partial<CookiePreferences>;

        if (
          typeof parsed.analytics === "boolean" &&
          typeof parsed.marketing === "boolean"
        ) {
          setPreferences({
            necessary: true,
            analytics: parsed.analytics,
            marketing: parsed.marketing,
            updatedAt: parsed.updatedAt || "",
          });
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }

    setReady(true);

    const openPreferences = () => {
      setVisible(true);
      setManageOpen(true);
    };

    window.addEventListener(
      "styling-spaces:open-cookie-preferences",
      openPreferences,
    );

    return () => {
      window.removeEventListener(
        "styling-spaces:open-cookie-preferences",
        openPreferences,
      );
    };
  }, []);

  const savePreferences = useCallback((next: CookiePreferences) => {
    const updated = {
      ...next,
      necessary: true as const,
      updatedAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // The preference remains active for the current page session.
    }

    setPreferences(updated);
    setVisible(false);
    setManageOpen(false);
  }, []);

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      updatedAt: "",
    });
  };

  const declineOptional = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      updatedAt: "",
    });
  };

  const togglePreference = (key: "analytics" | "marketing") => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  if (!ready || (!visible && !manageOpen)) return null;

  return (
    <>
      {visible && !manageOpen && (
        <aside
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-5xl border border-ink/10 bg-ivory p-5 text-ink shadow-[0_20px_80px_rgba(0,0,0,0.22)] sm:inset-x-5 sm:bottom-5 sm:p-7"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Cookie size={18} className="text-terracotta-deep" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Your privacy choices
                </p>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                We use essential browser storage to remember your preferences.
                Optional analytics and marketing technologies are off by
                default. You can accept, decline or manage your choices at
                any time.{" "}
                <Link
                  href="/privacy-policy"
                  className="link-underline font-semibold text-ink"
                >
                  Learn more in our Privacy Policy
                  <ArrowUpRight className="ml-1 inline" size={13} />
                </Link>
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap md:flex-col lg:flex-row">
              <button
                type="button"
                onClick={() => setManageOpen(true)}
                className="border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-ink/5"
              >
                Manage preferences
              </button>
              <button
                type="button"
                onClick={declineOptional}
                className="border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-ink/5"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-terracotta-deep"
              >
                Accept all
              </button>
            </div>
          </div>
        </aside>
      )}

      {manageOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-ink/60 p-3 backdrop-blur-sm sm:p-6"
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-dialog-title"
            className="my-auto w-full max-w-xl border border-ink/10 bg-ivory p-6 text-ink shadow-2xl sm:p-9"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 text-terracotta-deep">
                  <Cookie size={20} />
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]">
                    Privacy settings
                  </p>
                </div>
                <h2
                  id="cookie-dialog-title"
                  className="mt-4 font-serif text-3xl sm:text-4xl"
                >
                  Manage your preferences.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setManageOpen(false)}
                aria-label="Close preferences"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink/15 transition-colors hover:bg-ink/5"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-7 text-muted">
              Choose which optional technologies you allow. Essential browser
              storage is always enabled so we can remember your choices.
            </p>

            <div className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
              <div className="flex items-center justify-between gap-5 py-5">
                <div>
                  <p className="text-sm font-semibold">Necessary</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Required for essential website preferences and operation.
                  </p>
                  <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-terracotta-deep">
                    Always active
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-muted">
                  ON
                </span>
              </div>

              {(
                [
                  {
                    key: "analytics",
                    title: "Analytics",
                    description:
                      "Would allow usage measurement tools to help understand and improve the website, if introduced.",
                  },
                  {
                    key: "marketing",
                    title: "Marketing",
                    description:
                      "Would allow marketing technologies for relevant promotions, if introduced.",
                  },
                ] as const
              ).map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-5 py-5"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-muted">
                      {item.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences[item.key]}
                    aria-label={`${item.title} cookies`}
                    onClick={() => togglePreference(item.key)}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                      preferences[item.key] ? "bg-terracotta-deep" : "bg-ink/20"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        preferences[item.key]
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-6 text-muted">
              These settings record your choices. No optional analytics or
              marketing tracking scripts are activated by this preference
              panel.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => savePreferences(preferences)}
                className="bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-ivory transition-colors hover:bg-terracotta-deep"
              >
                Save my preferences
              </button>
              <button
                type="button"
                onClick={declineOptional}
                className="border border-ink/20 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] transition-colors hover:bg-ink/5"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="border border-ink/20 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] transition-colors hover:bg-ink/5"
              >
                Accept all
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
