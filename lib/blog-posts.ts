export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  excerpt: string;
  content: string[];
  image: string;
  imageAlt: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "top-10-freedom-camping-spots",
    title: "Top 10 Freedom Camping Spots in New Zealand",
    date: "January 12, 2026",
    dateISO: "2026-01-12",
    readTime: "6 min read",
    excerpt:
      "New Zealand offers hundreds of stunning freedom camping spots for self-contained vehicles. Here are our favourites — from glacier lakes to dramatic coastlines.",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Dramatic New Zealand fjord landscape with mountains and still water",
    content: [
      "New Zealand is one of the few places in the world where freedom camping is not just tolerated — it's built into the culture. The Freedom Camping Act gives self-contained vehicles the right to camp at hundreds of designated spots across the country, from lakesides and beaches to mountain valleys. The key word is self-contained: your vehicle needs a valid certificate (which both our campers carry), and you need to follow the rules at each site. Do that, and New Zealand opens up in a way that no hotel or hostel can match.",
      "Our favourite spots span both islands. Lake Pukaki, fed by glacial meltwater from Aoraki/Mount Cook, has a blue so vivid it looks artificial — pull up for sunset and you won't want to leave. Cape Palliser on the Wairarapa coast is wild and remote, with seal colonies and a dramatic lighthouse walk. The Catlins, on the South Island's southeastern edge, is one of NZ's best-kept secrets: dense native bush, hidden waterfalls, sea lions, and almost no other tourists. Lake Tekapo offers dark-sky stargazing that rivals anywhere on earth. And Raglan on the west coast of the North Island pairs incredible surf breaks with a laid-back beach-town vibe.",
      "The golden rule of freedom camping: leave no trace. Pack out everything you bring, use your camper's facilities (that's what the self-containment certificate is for), and respect the local communities that share these areas. Freedom camping works in New Zealand because the majority of people do it right — and that keeps these remarkable places open for everyone.",
    ],
  },
  {
    slug: "north-island-vs-south-island",
    title: "North Island vs South Island: Which Route to Choose?",
    date: "January 28, 2026",
    dateISO: "2026-01-28",
    readTime: "5 min read",
    excerpt:
      "Most visitors don't have time to explore both islands fully. Knowing which one suits you best makes the difference between a good trip and a great one.",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "New Zealand mountain landscape at golden hour with lake reflection",
    content: [
      "New Zealand's two main islands offer entirely different experiences, and trying to rush through both in a single trip is a recipe for seeing a lot while experiencing very little. The better question isn't 'which island is better?' — it's 'which island suits what I'm actually looking for?' Three weeks on one island, done properly, beats two weeks scrambling across both.",
      "The North Island is warmer, more geologically alive, and culturally rich. Rotorua's geothermal landscape is unlike anything else on the planet — boiling mud pools, erupting geysers, and the deep history of Māori culture. The Bay of Islands is the definition of laid-back coastal paradise. The Tongariro Alpine Crossing is frequently listed among the world's best day hikes. And Cape Reinga, at the very top of the island where the Tasman Sea meets the Pacific Ocean, carries a spiritual significance and a wild beauty that stays with you. Auckland is a great starting point and genuinely underrated as a city.",
      "The South Island is more rugged, cinematic, and remote — the version of New Zealand most people have seen in photos. Queenstown delivers world-class adventure in a spectacular mountain setting. Milford Sound, reached via one of the most dramatic drives in the world through Fiordland, is raw natural theatre. The West Coast is genuine wilderness — untouched native forest, pancake rocks, and barely another soul. And the Mackenzie Basin, home to Lake Tekapo and Lake Pukaki, offers landscapes so otherworldly that NASA researchers have used them as Mars analogues. If you've only got time for one island and dramatic scenery is what you're after, the South Island is hard to beat.",
    ],
  },
  {
    slug: "first-time-camper-guide",
    title: "First Time Camper? Everything You Need to Know",
    date: "February 5, 2026",
    dateISO: "2026-02-05",
    readTime: "7 min read",
    excerpt:
      "Renting a camper for the first time sounds complicated. It isn't. Here's everything you actually need to know before you pick up the keys.",
    image:
      "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Campervan parked on a scenic New Zealand road with mountains in background",
    content: [
      "Renting a camper for the first time is one of those things that sounds like a big deal and turns out to be surprisingly simple. You don't need previous camping experience, a special driver's licence, or any equipment of your own. When you pick up the camper, it's already packed with everything you need — cooking gear, bedding, camp chairs, cleaning supplies. We walk you through where everything is and how it works. Within an hour of picking up the keys, most people feel completely at home.",
      "The biggest adjustment for first-timers is finding places to sleep. New Zealand makes this easy. The Campermate app (free on iOS and Android) maps every campsite, holiday park, and freedom camping spot in the country — you can filter by facilities, cost, distance, and certification requirements. Holiday parks (from around NZ$40–60 per night) offer powered sites, full bathrooms, kitchens, and often laundry facilities. Freedom camping spots are free and frequently spectacular, but require a certified self-contained vehicle — which is exactly what you have. A good rule of thumb: book holiday parks in advance during summer, and use freedom camping for the nights in between.",
      "A few things first-timers consistently wish they'd known: New Zealand's distances look shorter on a map than they feel on the road. The highways are beautiful but winding — 100km often takes two hours, not one. Build in flexibility. Some of the best moments will be unplanned — a side road that leads somewhere extraordinary, a conversation with a local that sends you somewhere you'd never have found otherwise. Don't fill every day. The whole point of a camper is the freedom to stop when you feel like it, not to stick to a rigid itinerary.",
    ],
  },
  {
    slug: "best-time-to-visit-new-zealand",
    title: "The Best Time to Visit New Zealand by Camper",
    date: "February 18, 2026",
    dateISO: "2026-02-18",
    readTime: "5 min read",
    excerpt:
      "Every season in New Zealand has something to offer. Here's an honest guide to when to go — and when to avoid the crowds.",
    image:
      "https://images.unsplash.com/photo-1526917573-86c35c5a8dc3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "New Zealand snow-capped mountains with lush green valleys below",
    content: [
      "New Zealand's peak season runs December through February — the Southern Hemisphere summer. Schools are out, the weather is warmest across the country, and the most-visited spots fill up. For campers, this means competition for the best freedom camping spots and a buzzy, social atmosphere at holiday parks. If you're travelling in peak season, book your camper well in advance (we typically fill up 3–6 months out) and have a loose plan for where you'll sleep each night.",
      "October, November, March, and April are the sweet spots. The shoulder seasons offer thinner crowds, lower prices for activities and accommodation, and often the most beautiful light. Spring in October brings wildflowers to the high country. Autumn in March and April gives the South Island its most settled weather of the year — long, clear days, cool evenings, and the beech forests beginning to turn. These are genuinely our favourite months to be on the road in New Zealand, and most experienced travellers agree.",
      "Winter — June through August — is for those who want dramatic scenery and genuine solitude. Many freedom camping areas remain open year-round. The South Island's ski fields are a legitimate draw. Some alpine roads (including the Homer Tunnel to Milford Sound) can close briefly after heavy snowfall, but most of the country is very driveable. Milford Sound in misty winter rain is, arguably, more atmospheric than in bright summer sun. If you're comfortable with cooler temperatures and shorter days, a winter camper trip through New Zealand is a remarkably different and beautiful experience — and you'll often have the best spots entirely to yourself.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
