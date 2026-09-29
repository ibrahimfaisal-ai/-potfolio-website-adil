import Navbar from "@/src/components/Navbar/Navbar";

// Navbar only. Each child route decides whether it renders a Footer.
// - app/(site)/page.tsx (home) wraps itself with <Footer> via its own nested layout
// - app/(site)/case-studies/layout.tsx → no Footer (filmstrip owns scroll)
// - app/(site)/case-studies/[slug]/layout.tsx → adds Footer back
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
