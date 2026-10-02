import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { work } from "@/src/data/work";
import Home from "../../page";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = work.find((v) => v.slug === slug);
  if (!video) return {};
  const title = `${video.title} | Muhammad Adil`;
  return {
    title,
    description: video.hook,
    alternates: { canonical: `/work/${video.slug}` },
    openGraph: { title, description: video.hook, images: [{ url: video.thumbnail }] },
    twitter: { card: "summary_large_image", title, description: video.hook },
  };
}

// Same page as the home route, opened with this video's lightbox showing.
export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  if (!work.some((v) => v.slug === slug)) notFound();
  return <Home initialSlug={slug} />;
}
