import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT_EMAIL, FOOTER, RESOURCE_LINKS, SERVICE_GROUPS } from "./content";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-surface-0">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-3 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div className="sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">{FOOTER.blurb}</p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {FOOTER.location}
              </li>
            </ul>
          </div>

          {SERVICE_GROUPS.map((group) => (
            <FooterColumn key={group.name} title={group.name}>
              {group.services.map((service) => (
                <li key={service.slug}>
                  <a href="#services" className="hover:text-foreground">
                    {service.title}
                  </a>
                </li>
              ))}
            </FooterColumn>
          ))}

          <FooterColumn title="Resources">
            {RESOURCE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.title}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {FOOTER.company.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Aethon Lab. All rights reserved.</span>
          <span>Built with the agents we sell</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-lavender">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}
