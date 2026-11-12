export const reelCategories = [
  "All",
  "Studio & Brand",
  "Project Handover",
  "Living Spaces",
  "Pooja Room",
  "Interior Details",
  "Our Work",
] as const;

export type ReelCategory = (typeof reelCategories)[number];
export type ReelCategoryFilter = Exclude<ReelCategory, "All">;

export type InstagramReel = {
  id: string;
  title: string;
  category: ReelCategoryFilter;
  caption: string;
  url: string;
  embedUrl: string;
};

const instagramReelUrl = "https://www.instagram.com/reel";

function reel(
  id: string,
  title: string,
  category: ReelCategoryFilter,
  caption: string,
): InstagramReel {
  return {
    id,
    title,
    category,
    caption,
    url: `${instagramReelUrl}/${id}/`,
    embedUrl: `${instagramReelUrl}/${id}/embed/`,
  };
}

export const instagramReels: InstagramReel[] = [
  reel(
    "DdRRZroPqkx",
    "Our New Office Space",
    "Studio & Brand",
    "A Big Dream. One Vision. One Name — Styling Spaces. Our New Office Space.",
  ),
  reel(
    "DaadyarBxSs",
    "The Brand Reveal",
    "Studio & Brand",
    "Finally revealing the project that had our whole heart for the past few months. STYLING SPACES.",
  ),
  reel(
    "DZe17liv9ki",
    "Heroes of the Site",
    "Our Work",
    "Heroes Of The Site.",
  ),
  reel(
    "DXCLxUdE-ZL",
    "Project Handover",
    "Project Handover",
    "Handing over the keys to a lifestyle, not just a home. This interior speaks for itself.",
  ),
  reel(
    "DWLf0eQjT9a",
    "Living Spaces",
    "Living Spaces",
    "The beauty of a well-lived space.",
  ),
  reel(
    "DVp6pIFE_62",
    "Hall Transformation",
    "Living Spaces",
    "Where elegance meets comfort — our latest hall transformation by Styling Spaces.",
  ),
  reel(
    "DVlhVHYk3sD",
    "Pooja Room",
    "Pooja Room",
    "A sacred corner for a peaceful heart.",
  ),
  reel(
    "DVjHPAWEwLD",
    "From the Archive",
    "Our Work",
    "A closer look from the Styling Spaces Instagram archive.",
  ),
  reel(
    "DSNpMM9k-gH",
    "Details in Focus",
    "Our Work",
    "More from the Styling Spaces studio archive.",
  ),
  reel(
    "DQZnvqxE2gC",
    "Inside the Studio",
    "Our Work",
    "A moment from our interior design journey.",
  ),
  reel(
    "DPt6b32kxGI",
    "A Closer Look",
    "Our Work",
    "Another look inside our work, shared on Instagram.",
  ),
  reel(
    "DHWEN0rIbMW",
    "Washbasin Design",
    "Interior Details",
    "A washbasin that reflects your taste — clean, classy, and timeless!",
  ),
  reel(
    "C-p_oJmPVwF",
    "Partition & Seating",
    "Interior Details",
    "Luxury in every detail — maximizing space with stylish partitioned seating, beautiful wall decor, unique patterns, and seamless storage.",
  ),
];
