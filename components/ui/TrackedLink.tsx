"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { analytics, type ContactChannel, type ContactPlacement } from "@/lib/analytics";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  channel: ContactChannel;
  placement: ContactPlacement;
}

/**
 * Plain <a> that fires a `contact_click` event on click. Use for tel:/mailto:/wa.me links.
 * All other props pass through unchanged, so styling is untouched.
 */
export function TrackedLink({ channel, placement, onClick, children, ...rest }: TrackedLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    analytics.contactClick(channel, placement);
    onClick?.(e);
  };
  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
