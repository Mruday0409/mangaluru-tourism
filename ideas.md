# Mangaluru Tourism — Design Direction

## Three stylistic approaches

### Theme Name: Coastal Modernist
Very tactile travel editorial with sun-washed neutrals, dark ink, sea-glass green, and confident red-orange wayfinding. The layout feels like a folded field guide brought to life with cinematic movement.

**Probability:** 0.073

### Theme Name: Monsoon Noir
A moody, cinematic interpretation of the coast built around charcoal, indigo, wet stone, and glints of brass. Large photographic frames and quiet type create a more contemplative, after-rain mood.

**Probability:** 0.021

### Theme Name: Temple Poster Club
A bright, expressive system inspired by coastal sign painting, local buses, festival posters, and hand-painted wayfinding. High-contrast colors and playful overlaps make the guide feel energetic and youthful.

**Probability:** 0.088

## Selected approach: Coastal Modernist

### Design Movement
Contemporary editorial travel design with references to Swiss wayfinding, Indian coastal print ephemera, and modern museum catalogues. The experience should feel collected, tactile, and assured rather than like a generic destination template.

### Core Principles
1. **Field guide over brochure:** Every page should feel like a useful, opinionated edit of the city, not a generic list of attractions.
2. **Contrast with calm:** Pair near-black ink typography with coconut-sand surfaces and a single high-energy vermillion signal color.
3. **Asymmetric rhythm:** Use offset columns, vertical rules, tall image crops, and oversize numerals so the page moves like a route map.
4. **Motion as tide:** Scroll reveals should be smooth and directional, image zooms should be slow, and controls should respond crisply without spectacle.

### Color Philosophy
The base is warm coconut-white and sand so the site feels sunlit even on a small screen. Ink-black anchors trust and improves reading. Sea-glass green carries the emotional center: calm, humid, and coastal. Vermillion is reserved for action, route markers, and the moments that deserve attention—like a painted sign glimpsed from a moving bus.

### Layout Paradigm
A split-field editorial layout: the primary content is offset into a 12-column canvas, while route metadata, page labels, and vertical chapter markers live in a narrow rail. On mobile, the rail collapses into a horizontal route strip. The home page opens with a full-bleed visual field, then shifts into staggered editorial cards instead of a symmetrical card grid.

### Signature Elements
- **Route rail:** slim vertical chapter numbers, location labels, and a vermillion progress dot that tracks the page journey.
- **Tide underline:** a hand-drawn-feeling curved underline motif used sparingly beneath key titles and active navigation.
- **Field-note chips:** small cream tags with a red pin or sea-glass dot for practical, human travel cues.

### Interaction Philosophy
Interactions should feel like turning pages or following a hand-marked route: deliberate, tactile, and quick to understand. Hovering a destination reveals its route number and lifts the image slightly. Carousels use large arrow controls plus a visible fraction indicator. Buttons press in subtly and all controls retain strong keyboard focus states.

### Animation
- Use a 700–900ms opening sequence on the home page: page label fades in, title lifts from 18px below, then the hero image eases from a slightly tighter crop to its resting scale.
- Use IntersectionObserver-based reveal classes for section headings and destination cards, with 30–70ms staggered delays.
- Use transform and opacity only for motion; image hover effects scale to 1.04 maximum and never move surrounding layout.
- Use a 180–240ms ease-out for navigation, buttons, drawer, and carousel transitions.
- Respect `prefers-reduced-motion` by disabling non-essential reveal and zoom animation while preserving opacity and focus clarity.

### Typography System
Use the **Inter** family throughout, honoring the brief. The hierarchy comes from weight, scale, casing, and tracking: 800–900 weight for display headlines, 600–700 for section titles and controls, 400–500 for body copy, and 550–650 for compact labels. Headlines use tight tracking (`-0.055em` to `-0.02em`); utility labels use uppercase with `0.12em` tracking.

### Brand Essence
**An editorial field guide to Mangaluru for travelers who want the coast beyond the obvious—curated routes, local texture, and a slower way to arrive.**

**Personality:** Sunlit, observant, assured.

### Brand Voice
Headlines are concise and sensory. CTAs sound like invitations from someone who has already walked the route. Microcopy is specific, practical, and lightly poetic; never generic filler.

Example lines:
- “Follow the coast until the city turns gold.”
- “Save this route for a late-afternoon wander.”

### Wordmark & Logo
The logo is a bold, text-free symbol: a simplified red-orange route pin that folds into a wave and a small sun notch. It should read as a map mark at small sizes and as a coastal signal flag at larger sizes. The wordmark is set separately in heavy Inter with a slightly clipped terminal on the final “U” to echo the route-pin geometry.

### Signature Brand Color
**Kudla Vermillion — `#E85B3F`**. It is warmer than a standard travel red and more grounded than coral, recalling laterite soil, painted bus signs, and evening light on tiled roofs.

## Page architecture

1. **Home** — cinematic entry, featured routes, mood carousel, and quick trip planner.
2. **Places to Visit** — destination index with filters for beach, heritage, nature, and city.
3. **Destination Detail** — reusable detail template with gallery, route notes, and nearby stops.
4. **Beaches & Backwaters** — coast-focused editorial page.
5. **Culture & Heritage** — temples, old quarters, craft, and living traditions.
6. **Food & Drink** — coastal flavors, breakfast spots, and a dish-led visual story.
7. **Things to Do** — curated activities and daypart suggestions.
8. **Itineraries** — 24-hour, weekend, and slow-travel route plans.
9. **Travel Guide** — getting there, best time, practical notes, and a small map section.
10. **Plan Your Visit** — compact trip builder with saved route state and call-to-action.

## Build reminders

- Use generated visual assets for the hero and key editorial moments; use direct external image links only for supporting content.
- Keep the header, route rail, footer, typography, and motion primitives shared across all routes.
- Prefer named content objects and reusable section components over duplicated page markup.
- Check every animation against the question: “Does this reinforce or dilute the Coastal Modernist field-guide feeling?”

## Style Decisions

- On coconut-white or sand surfaces, the wordmark and navigation use ink-black; on photographic or dark surfaces they may use white, with `#E85B3F` reserved for active navigation marks.
- Every page includes a recognizable route spine — chapter number, compact location/time metadata, a rule line, and a vermillion route dot — so the field-guide structure is visible beyond section eyebrows.
- Kudla Vermillion `#E85B3F` is a signal color for primary actions, active states, route dots, key numerals, and at most one major chapter panel per page; large calm fields should usually be sand, ink, or sea-glass.
- Planning controls should read as field-note objects: practical, tactile, and part of the same curated travel object as the editorial pages.
