/**
 * Portfolio video index.
 *
 * Two kinds of source live side by side:
 *  - `local` items are self-hosted MP4s under /public/work/ugc, each with a
 *    poster frame beside it (`<slug>.jpg`). They carry audio, so hover
 *    previews play muted and the lightbox plays with sound.
 *  - `youtube` items embed on click, for any future long-form uploads.
 *
 * Every category belongs to one portfolio, so a video's portfolio follows from
 * its category: AI-generated and UGC work in one, traditional editing of real
 * footage in the other. `category` is the axis the filter uses within a
 * portfolio. `orientation` decides which block an item renders in, because
 * 9:16 and 16:9 need different tiles.
 */

export type PortfolioId = "ai-ugc" | "editing";

export type Portfolio = {
  id: PortfolioId;
  label: string;
  /** One line under the label on the portfolio switch. */
  tagline: string;
  /** Shown under the category filter when "All" is selected. */
  blurb: string;
};

export const portfolios: Portfolio[] = [
  {
    id: "ai-ugc",
    label: "AI & UGC Videos",
    tagline: "AI commercials made with Seedance, film scenes and creator-style UGC ads.",
    blurb: "AI commercials, film scenes, product campaigns and creator-style ads across every category.",
  },
  {
    id: "editing",
    label: "Video Editing",
    tagline: "Traditional editing on real footage: podcast cuts, talking heads and property reels.",
    blurb: "Podcast cuts, talking-head edits and property reels, all edited from real footage.",
  },
];

/** Shown when a visitor arrives without a /#<portfolio> link or a /work/<slug> URL. */
export const defaultPortfolio: PortfolioId = "ai-ugc";

/**
 * Fired on window with the portfolio id as `detail` whenever the showcase
 * switches portfolio, so the navbar can highlight the matching link.
 */
export const PORTFOLIO_EVENT = "work:portfolio";

export type CategoryId =
  | "beauty-skincare"
  | "fashion-style"
  | "food-beverage"
  | "cinematic-film"
  | "comedy-viral"
  | "apps-tech"
  | "real-estate"
  | "talking-head";

export type Category = { id: CategoryId; portfolio: PortfolioId; label: string; blurb: string };

export const categories: Category[] = [
  { id: "beauty-skincare", portfolio: "ai-ugc",  label: "Beauty & Skincare", blurb: "Skincare routines, makeup demos, and product reviews" },
  { id: "fashion-style",   portfolio: "ai-ugc",  label: "Fashion & Style",   blurb: "Try-ons, lookbooks, eyewear, and street style" },
  { id: "food-beverage",   portfolio: "ai-ugc",  label: "Food & Beverage",   blurb: "Drinks and lifestyle spots built around the product" },
  { id: "cinematic-film",  portfolio: "ai-ugc",  label: "Cinematic & Film",  blurb: "Film scenes, music videos, and narrative spots" },
  { id: "comedy-viral",    portfolio: "ai-ugc",  label: "Comedy & Viral",    blurb: "Meme formats and comedic sketches built to be shared" },
  { id: "apps-tech",       portfolio: "ai-ugc",  label: "Apps & Tech",       blurb: "App demos and software shown in real use" },
  { id: "talking-head",    portfolio: "editing", label: "Talking Head & Podcast", blurb: "Founder clips, podcast cuts and direct-response edits" },
  { id: "real-estate",     portfolio: "editing", label: "Real Estate",       blurb: "Listing reels, agent-led tours and property walkthroughs" },
];

const categoryPortfolio = new Map(categories.map((c) => [c.id, c.portfolio]));

export const portfolioOf = (video: WorkVideo): PortfolioId =>
  categoryPortfolio.get(video.category) ?? defaultPortfolio;

export const isPortfolioId = (value: string): value is PortfolioId =>
  portfolios.some((p) => p.id === value);

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
  {
    slug: "natural-deodorant-review",
    title: "Natural Deodorant, Honest Review",
    category: "beauty-skincare",
    format: "Talking-head UGC ad",
    style: "Home kitchen, word-by-word captions",
    orientation: "vertical",
    duration: "48s",
    trigger: "Trust",
    hook: "A creator talking through a natural deodorant like she would with a friend.",
    note: "Straight-to-camera delivery, the stick turned over in her hands, and single-word captions that keep the eye on screen. It earns attention by feeling unscripted, then lets the product details land one at a time.",
    ...ugc("natural-deodorant-review"),
  },
  {
    slug: "cal-ai-fitness-ugc",
    title: "Cal AI, Gym to Breakfast",
    category: "apps-tech",
    format: "App demo UGC ad",
    style: "Gym floor and kitchen, handheld",
    orientation: "vertical",
    duration: "24s",
    trigger: "Aspiration",
    hook: "A fitness creator tracks her day between sets and breakfast.",
    note: "The app held right up to the lens, cut against training footage and a plate being scanned. Showing the feature inside a lifestyle the viewer wants makes it feel like part of the routine, not another download.",
    ...ugc("cal-ai-fitness-ugc"),
  },
  {
    slug: "honey-shopping-hack",
    title: "Honey, the Shopping Hack",
    category: "apps-tech",
    format: "Screen-demo UGC ad",
    style: "Living-room laptop, kinetic captions",
    orientation: "vertical",
    duration: "29s",
    trigger: "Saving money",
    hook: "Watch the coupons apply at checkout, live on screen.",
    note: "A creator at her laptop, then over-the-shoulder footage as the extension finds codes and drops the total. The proof happens on the checkout page itself, so the saving is something the viewer sees rather than hears about.",
    ...ugc("honey-shopping-hack"),
  },
  {
    slug: "pr-unboxing-linen",
    title: "PR Unboxing, Linen Edit",
    category: "fashion-style",
    format: "Unboxing UGC ad",
    style: "Studio grey, soft key light",
    orientation: "vertical",
    duration: "29s",
    trigger: "Anticipation",
    hook: "A pink PR box, the reveal, and every piece held up to camera.",
    note: "Classic unboxing pacing: the branded box, the pouches, then each piece shown to camera. The reveal structure keeps people watching to the last item, and every product gets a beat of its own.",
    ...ugc("pr-unboxing-linen"),
  },
  {
    slug: "luxury-estate-day-to-night",
    title: "Luxury Estate, Day to Night",
    category: "real-estate",
    format: "Property listing reel",
    style: "Drone aerials, sunlit interiors",
    orientation: "vertical",
    duration: "19s",
    trigger: "Aspiration",
    hook: "From the front lawn to the pool deck in under twenty seconds.",
    note: "An agent's welcome at the front door, then drone passes over the coast and the pool and quick cuts through the interior. The pacing sells the lifestyle of the house before any of the specs.",
    ...ugc("luxury-estate-day-to-night"),
  },
  {
    slug: "open-plan-interior-walkthrough",
    title: "Open-Plan Interior Walkthrough",
    category: "real-estate",
    format: "Agent-led home tour",
    style: "Bright new build, whip-pan transitions",
    orientation: "vertical",
    duration: "22s",
    trigger: "Desire",
    hook: "A new-construction tour, led by the agent, room by room.",
    note: "An on-camera host with bold kinetic titles, then a moving walkthrough of the kitchen, staircase and landing stitched together with whip pans. Buyers get a feel for the space before they ever book a viewing.",
    ...ugc("open-plan-interior-walkthrough"),
  },
  {
    slug: "lower-resting-heart-rate",
    title: "Lower Your Resting Heart Rate",
    category: "talking-head",
    format: "Podcast clip",
    style: "Warm studio, illustrated inserts",
    orientation: "vertical",
    duration: "16s",
    trigger: "Curiosity",
    hook: "One health tip, cut from a long podcast into sixteen seconds.",
    note: "A podcast answer tightened into a clip, with an illustrated heart, animated titles and lifestyle cutaways covering the edit points. It turns a long-form conversation into something that holds on a feed.",
    ...ugc("lower-resting-heart-rate"),
  },
  {
    slug: "qualified-leads-for-contractors",
    title: "Qualified Leads for Contractors",
    category: "talking-head",
    format: "Direct-response ad",
    style: "Outdoor walk-and-talk, animated captions",
    orientation: "vertical",
    duration: "24s",
    trigger: "Pain point",
    hook: "Speaks straight to contractors who are tired of bad leads.",
    note: "A walk-and-talk to camera with captions that call out the audience and the problem in the first seconds. Naming the frustration up front filters for the right viewer, which is exactly what a lead-gen ad has to do.",
    ...ugc("qualified-leads-for-contractors"),
  },
  {
    slug: "in-house-content-team",
    title: "The Case for an In-House Content Team",
    category: "talking-head",
    format: "Expert talking head",
    style: "Warm studio, editorial titles",
    orientation: "vertical",
    duration: "16s",
    trigger: "Authority",
    hook: "An expert making the case for an in-house team, cost by cost.",
    note: "A seated talking head with serif titles, a profile-card pop-up and salary cards that break the numbers down on screen. The graphics turn an opinion into an argument the viewer can follow.",
    ...ugc("in-house-content-team"),
  },
  {
    slug: "trade-with-our-capital",
    title: "Trade With Our Capital",
    category: "talking-head",
    format: "Explainer ad",
    style: "Bright studio lounge, screen inserts",
    orientation: "vertical",
    duration: "39s",
    trigger: "Opportunity",
    hook: "A funded-trader pitch, explained by a host and shown on screen.",
    note: "A presenter in a bright studio, with phone mock-ups, a plan comparison table and kinetic captions dropping in between lines. The inserts carry the detail so the pitch itself stays simple.",
    ...ugc("trade-with-our-capital"),
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
  {
    slug: "air-force-1-and-night-repair",
    title: "Air Force 1 & Night Repair",
    category: "fashion-style",
    format: "Product commercial",
    style: "Black studio, warm gold macro",
    orientation: "landscape",
    duration: "30s",
    trigger: "Desire",
    hook: "Two hero-product spots: a sneaker in black, a serum in gold.",
    note: "The Air Force 1 lifted from its box and turned against pure black, then Estée Lauder Advanced Night Repair in warm macro light. Two very different brand worlds, with the same care for light and texture.",
    ...ugc("air-force-1-and-night-repair"),
  },
  {
    slug: "estee-lauder-night-repair",
    title: "Estée Lauder Advanced Night Repair",
    category: "beauty-skincare",
    format: "Product commercial",
    style: "Warm macro, golden light",
    orientation: "landscape",
    duration: "15s",
    trigger: "Luxury",
    hook: "A serum spot built from texture, light and the bottle itself.",
    note: "A bottle stepping out of shadow, a dropper releasing a bead of serum, condensation on glass and a final lineup. No talent and no voiceover: product craft carries the brand on its own.",
    ...ugc("estee-lauder-night-repair"),
  },
  {
    slug: "founder-podcast-cut",
    title: "Founder Podcast Cut",
    category: "talking-head",
    format: "Podcast edit",
    style: "Dark studio, editorial motion graphics",
    orientation: "landscape",
    duration: "39s",
    trigger: "Authority",
    hook: "A founder's story cut tight, with motion graphics on every beat.",
    note: "A desk-mic talking head layered with editorial typography, a quote card and archival cutaways. The graphics keep a long answer moving, so the viewer stays for the point.",
    ...ugc("founder-podcast-cut"),
  },
  {
    slug: "whop-clipping-before-after",
    title: "Whop Clipping, Before and After",
    category: "talking-head",
    format: "Before & after edit",
    style: "Side by side, animated UI",
    orientation: "landscape",
    duration: "16s",
    trigger: "Proof",
    hook: "The raw take and the finished edit, playing side by side.",
    note: "Raw camera footage in one frame and the finished cut in the other, with captions, UI animation and platform graphics layered in. It shows exactly what the edit adds, which is the clearest way to sell editing.",
    ...ugc("whop-clipping-before-after"),
  },
];
