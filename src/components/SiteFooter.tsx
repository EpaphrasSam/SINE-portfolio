import { Mark } from './Mark';
import { site } from '../lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-shell px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Mark size={26} className="mb-4 text-accent" />
            <p className="max-w-xs text-sm text-ink-2">
              {site.fullName} — {site.role}. Currently open to new work.
            </p>
          </div>

          <ul className="flex flex-col gap-2 sm:items-end">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3 text-sm text-ink-2 transition-colors duration-200 hover:text-ink"
                >
                  <span className="font-mono text-label uppercase text-ink-3">
                    {s.label}
                  </span>
                  <span className="link-underline">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="wave-rule mt-12" aria-hidden="true" />

        <p className="mt-6 font-mono text-label uppercase text-ink-3">
          © {new Date().getFullYear()} {site.fullName}
        </p>
      </div>
    </footer>
  );
}
