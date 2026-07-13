import { LABEL_NAME, SOCIALS } from '@/lib/constants';
import EngravedRule from '@/components/EngravedRule';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/25 bg-void">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xs uppercase tracking-engraved text-bone-muted transition-colors duration-300 hover:text-gold-bright"
              >
                {s.label}
                <span className="ml-2 normal-case tracking-normal text-bone-muted">
                  {s.handle}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <EngravedRule className="mx-auto mt-10 max-w-md" />

        <div className="mt-8 text-center">
          <p className="engraved font-display text-sm uppercase tracking-monument text-bone-muted">
            {LABEL_NAME}
          </p>
          <p className="mt-3 font-body text-xs text-bone-muted">
            © {new Date().getFullYear()} Underdog City
          </p>
        </div>
      </div>
    </footer>
  );
}
