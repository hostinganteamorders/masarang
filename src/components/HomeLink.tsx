"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { playIntro } from "@/lib/intro";

/**
 * Tautan ke beranda yang juga memutar ulang salam pembuka. Klik dengan tombol Ctrl/Cmd/Shift atau
 * tombol tengah (buka di tab baru) tidak memutarnya.
 */
export function HomeLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) playIntro();
      }}
    />
  );
}
