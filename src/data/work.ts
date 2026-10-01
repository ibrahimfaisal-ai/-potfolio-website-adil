/**
 * Portfolio video index.
 *
 * Two kinds of source live side by side:
 *  - `local` items are self-hosted MP4s under /public/work/ugc, each with a
 *    poster frame beside it (`<slug>.jpg`). They carry audio, so hover
 *    previews play muted and the lightbox plays with sound.
 *  - `youtube` items embed on click, for any future long-form uploads.
 *
 * `category` is the axis the filter uses. `orientation` decides which block an
 * item renders in, because 9:16 and 16:9 need different tiles.
 */

export type CategoryId =
  | "beauty-skincare"
  | "fashion-style"
  | "food-beverage"
  | "cinematic-film"
  | "comedy-viral";

export type Category = { id: CategoryId; label: string; blurb: string };

export const categories: Category[] = [
  { id: "beauty-skincare", label: "Beauty & Skincare", blurb: "Skincare routines, makeup demos, and product reviews" },
  { id: "fashion-style",   label: "Fashion & Style",   blurb: "Try-ons, lookbooks, eyewear, and street style" },
  { id: "food-beverage",  label: "Food & Beverage",  blurb: "Drinks and lifestyle spots built around the product" },
  { id: "cinematic-film",  label: "Cinematic & Film", blurb: "Film scenes, music videos, and narrative spots" },
  { id: "comedy-viral",    label: "Comedy & Viral",   blurb: "Meme formats and comedic sketches built to be shared" },
];

export type VideoSource =
  | { kind: "youtube"; youtubeId: string }
  | { kind: "local"; src: string };

export type WorkVideo = {
  /** Stable key, also used for the video and poster filenames. */
  slug: string;
  title: string;
  category: CategoryId;
  /** Ad format. */
  format: string;
  /** The look and setting. */
  style: string;
  orientation: "vertical" | "landscape";
  /** Human-readable runtime. */
  duration: string;
  /** The buyer-psychology lever the ad leans on. */
  trigger: string;
  hook: string;
  note: string;
  /** Original creator, shown in the lightbox when set. */
  credit?: string;
  thumbnail: string;
  source: VideoSource;
};

const ugc = (slug: string) => ({
  thumbnail: `/work/ugc/${slug}.jpg`,
  source: { kind: "local", src: `/work/ugc/${slug}.mp4` } as VideoSource,
});

export const work: WorkVideo[] = [
  // ── Vertical 9:16 ──────────────────────────────────────────────────────────
  {
    slug: "skincare-morning-routine",
    title: "60-Second Morning Routine",
    category: "beauty-skincare",
    format: "UGC ad · one continuous take",
    style: "Soft daylight, creator POV",
    orientation: "vertical",
    duration: "60s",
    trigger: "Routine identification",
    hook: "One prompt, one unbroken minute, from mirror to morning coffee.",
    note: "A full minute that plays as a single continuous creator clip: skincare at the mirror, product texture in close-up, out the door and on to breakfast. The product lives inside a routine the viewer already recognises, which is what makes it feel like footage rather than an advert.",
    ...ugc("skincare-morning-routine"),
  },
  {
    slug: "iced-coffee-street-style",
    title: "Iced Coffee, Main Character Energy",
    category: "food-beverage",
    format: "Lifestyle UGC ad",
    style: "Golden hour street, fashion-led",
    orientation: "vertical",
    duration: "12s",
    trigger: "Social belonging",
    hook: "Street style, a dance break, and the drink in every frame.",
    note: "Fast, playful cuts down a busy street at sunset, with the cup pushed right to the lens on the beat. The energy sells the mood first and lets the product ride along with it.",
    ...ugc("iced-coffee-street-style"),
  },
  {
    slug: "lash-tutorial-talking-head",
    title: "Straight-to-Camera Lash Tutorial",
    category: "beauty-skincare",
    format: "Talking-head UGC ad",
    style: "At-home, captioned, handheld",
    orientation: "vertical",
    duration: "27s",
    trigger: "Relatability",
    hook: "A creator talking you through her lashes like a friend would.",
    note: "Selfie framing, on-screen captions and a wand held right up to the lens. It borrows every habit of a real beauty creator's feed, so the product demo lands as advice rather than an ad.",
    ...ugc("lash-tutorial-talking-head"),
  },
  {
    slug: "mascara-single-photo",
    title: "Mascara Demo From One Photo",
    category: "beauty-skincare",
    format: "Product demo UGC ad",
    style: "Bathroom mirror, natural light",
    orientation: "vertical",
    duration: "10s",
    trigger: "Proof by demonstration",
    hook: "One product photo in, a creator-style mascara demo out.",
    note: "Built from a single product photo: the tube, a macro of the brush, the application in the mirror, and the finished look. Ten seconds that answers the only question a buyer has: what will it do on me.",
    ...ugc("mascara-single-photo"),
  },

  {
    slug: "meme-multiverse",
    title: "Meme Multiverse",
    category: "comedy-viral",
    format: "Viral comedy short",
    style: "NYC street, meme recreations",
    orientation: "vertical",
    duration: "28s",
    trigger: "Recognition",
    hook: "Famous meme formats rebuilt as one continuous street scene.",
    note: "Instantly recognisable meme setups staged live on a city block and chained together. Recognition does the work: the viewer is laughing before they know why.",
    credit: "el.cine",
    ...ugc("meme-multiverse"),
  },

  // ── Landscape 16:9 ─────────────────────────────────────────────────────────
  {
    slug: "im8-ai-commercial",
    title: "IM8 AI Commercial",
    category: "food-beverage",
    format: "AI commercial",
    style: "Macro product shots, studio colour",
    orientation: "landscape",
    duration: "51s",
    trigger: "Aspiration",
    hook: "A wellness drink sold through texture, science and ritual.",
    note: "A product spot for IM8 that moves from liquid macros and the tin itself to a lab sequence and a final pour on a red studio backdrop. Every shot is built to make a daily supplement feel premium and precise.",
    ...ugc("im8-ai-commercial"),
  },
  {
    slug: "popeyes-rap-battle",
    title: "Popeyes AI Rap Battle",
    category: "food-beverage",
    format: "AI commercial",
    style: "Night-time city, crowd energy",
    orientation: "landscape",
    duration: "1m 4s",
    trigger: "Rivalry",
    hook: "A fast-food rap battle staged as a full-blown city event.",
    note: "A brand-rivalry spot for Popeyes played as a street-level event: an aerial of the restaurant at night, a packed house party, and a protest crowd with hand-made signs. The rivalry framing turns an ad into something people want to share.",
    ...ugc("popeyes-rap-battle"),
  },
  {
    slug: "anime-ai-short",
    title: "Anime-Style AI Short",
    category: "cinematic-film",
    format: "Animated short",
    style: "Retro anime, neon sci-fi",
    orientation: "landscape",
    duration: "1m 5s",
    trigger: "Nostalgia",
    hook: "A retro sci-fi anime sequence, built step by step with AI.",
    note: "Hand-drawn-look characters, neon interiors and a motorbike finale in the style of classic 80s and 90s anime. It shows the same pipeline can produce stylised animation, not just live-action footage.",
    ...ugc("anime-ai-short"),
  },
  {
    slug: "across-the-table",
    title: "Across the Table",
    category: "cinematic-film",
    format: "Film scene",
    style: "Warm candlelight, shallow focus",
    orientation: "landscape",
    duration: "23s",
    trigger: "Emotion",
    hook: "A quiet childhood moment, shot like a feature film.",
    note: "Two children, a restaurant table and subtitled dialogue, lit with candle-warm practicals and heavy bokeh. The performances carry micro-expressions that most AI footage still misses.",
    credit: "el.cine",
    ...ugc("across-the-table"),
  },
  {
    slug: "the-interrogation",
    title: "The Interrogation",
    category: "cinematic-film",
    format: "Script-to-scene",
    style: "Low-key interrogation room",
    orientation: "landscape",
    duration: "50s",
    trigger: "Tension",
    hook: "A written script turned into a full dialogue scene.",
    note: "A detective and a humanoid robot across a steel table, played shot-reverse-shot with subtitles. It shows the other side of AI video: not just a look, but sustained dialogue and pacing across a whole scene.",
    credit: "el.cine",
    ...ugc("the-interrogation"),
  },
  {
    slug: "diner-confession",
    title: "Diner Confession",
    category: "cinematic-film",
    format: "Drama scene",
    style: "Booth diner, tungsten warmth",
    orientation: "landscape",
    duration: "20s",
    trigger: "Intimacy",
    hook: "Two people, one booth, and a conversation that changes things.",
    note: "A tight two-hander in a diner booth: wide, over-the-shoulder, close-up. Classic coverage and restrained performances make it read as a scene from a real indie drama.",
    ...ugc("diner-confession"),
  },
  {
    slug: "ai-can-be-funny",
    title: "AI Can Be Funny",
    category: "comedy-viral",
    format: "Comedy sketch",
    style: "City street, physical comedy",
    orientation: "landscape",
    duration: "18s",
    trigger: "Surprise",
    hook: "A physical-comedy bit that lands its punchline.",
    note: "A driver climbing out of the wrong window, a walk down the block, and a hydrant gag for the payoff. Comic timing is the hardest thing to generate, which is why this one works as a showcase.",
    credit: "el.cine",
    ...ugc("ai-can-be-funny"),
  },
  {
    slug: "knitwear-try-on",
    title: "Knitwear Try-On, No Photoshoot",
    category: "fashion-style",
    format: "Try-on UGC ad",
    style: "Apartment selfie, warm daylight",
    orientation: "landscape",
    duration: "27s",
    trigger: "Social proof",
    hook: "A full try-on haul without booking a single photoshoot.",
    note: "Selfie-mode chat, the label held up to camera, then the full-length reveal. It follows the rhythm of a real haul video, which is exactly why it reads as a recommendation instead of a campaign.",
    ...ugc("knitwear-try-on"),
  },
  {
    slug: "skincare-selfie-review",
    title: "Skincare Selfie Review",
    category: "beauty-skincare",
    format: "Review UGC ad",
    style: "Morning selfie, sunlit bedroom",
    orientation: "landscape",
    duration: "16s",
    trigger: "Sensory desire",
    hook: "The texture shot, the application, the glow, all in one selfie.",
    note: "Front-camera framing with a texture close-up straight to the lens and the dewy finish on skin at the end. Realistic skin, stray hairs and morning light do the convincing.",
    ...ugc("skincare-selfie-review"),
  },
];
