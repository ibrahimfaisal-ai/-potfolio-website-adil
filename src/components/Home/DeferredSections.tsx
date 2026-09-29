"use client";

import dynamic from "next/dynamic";

// The showcase mounts client-side only: it carries the filter state, an image
// grid, and players that nothing above the fold needs.
const WorkShowcase = dynamic(() => import("@/src/components/Work/WorkShowcase"), { ssr: false });

export default function DeferredSections() {
  return <WorkShowcase />;
}
