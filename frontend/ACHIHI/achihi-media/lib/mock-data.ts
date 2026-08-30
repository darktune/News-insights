export type Category = "National" | "Politics" | "Entertainment" | "Metro" | "Sport" | "Opinion" | "Business";

export type UserRole = "reader" | "contributor" | "admin";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: UserRole;
  articlesCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: number;
  likes: number;
  comments: number;
  shares: number;
  featured: boolean;
  status: "published" | "draft" | "pending";
  tags: string[];
}

export interface Comment {
  id: string;
  articleId: string;
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  replies: Comment[];
}

export const AUTHORS: Author[] = [
  {
    id: "a1",
    name: "Chidi Okafor",
    avatar: "https://picsum.photos/seed/author1/80/80",
    bio: "Senior political correspondent with 10 years covering Nigerian governance.",
    role: "contributor",
    articlesCount: 47,
  },
  {
    id: "a2",
    name: "Amaka Nwosu",
    avatar: "https://picsum.photos/seed/author2/80/80",
    bio: "Entertainment and culture writer. Lagos-based.",
    role: "contributor",
    articlesCount: 32,
  },
  {
    id: "a3",
    name: "Emeka Eze",
    avatar: "https://picsum.photos/seed/author3/80/80",
    bio: "Sports journalist covering football, athletics and Nigerian leagues.",
    role: "contributor",
    articlesCount: 61,
  },
  {
    id: "a4",
    name: "Fatima Aliyu",
    avatar: "https://picsum.photos/seed/author4/80/80",
    bio: "Business and finance editor, focusing on Nigerian economy.",
    role: "admin",
    articlesCount: 89,
  },
  {
    id: "a5",
    name: "Ngozi Adeyemi",
    avatar: "https://picsum.photos/seed/author5/80/80",
    bio: "Metro reporter covering Lagos, Abuja and Port Harcourt.",
    role: "contributor",
    articlesCount: 28,
  },
];

export const ARTICLES: Article[] = [
  {
    id: "art1",
    slug: "senate-passes-new-infrastructure-bill-2026",
    title: "Senate Passes ₦2.4 Trillion Infrastructure Bill Amid Opposition Walkout",
    excerpt: "The Nigerian Senate on Tuesday passed a landmark infrastructure spending bill following a dramatic session that saw opposition senators stage a walkout over alleged irregularities in the voting process.",
    body: `<p>The Nigerian Senate on Tuesday passed a landmark infrastructure spending bill following a dramatic session that saw opposition senators stage a walkout over alleged irregularities in the voting process.</p>
<h2>Key Provisions of the Bill</h2>
<p>The ₦2.4 trillion Infrastructure Development Act 2026 earmarks funds for road rehabilitation across all 36 states, with a particular focus on the deteriorating Lagos-Ibadan Expressway, the Second Niger Bridge connector roads, and critical rural feeder roads that have been left in disrepair for decades.</p>
<blockquote>This is the boldest investment in Nigerian infrastructure since independence — Senate President Godswill Akpabio</blockquote>
<p>Beyond roads, the bill allocates ₦680 billion to power sector reforms, targeting the addition of 5,000 megawatts to the national grid by 2028. Energy experts have cautiously welcomed the commitment, though some note that funding alone cannot resolve the structural issues plaguing the Transmission Company of Nigeria.</p>
<h2>Opposition Response</h2>
<p>Senators from the Peoples Democratic Party and Labour Party walked out of the chamber approximately 40 minutes into the final reading, citing concerns that the bill had been fast-tracked without adequate committee scrutiny. Senator Dino Melaye described the session as "a legislative charade designed to rubber-stamp executive largesse."</p>
<p>The Senate President dismissed the walkout as "political theatrics," noting that the bill had been before the relevant committees for three months and that public hearings were conducted in five geopolitical zones.</p>`,
    coverImage: "https://picsum.photos/seed/politics1/800/450",
    category: "Politics",
    author: AUTHORS[0],
    publishedAt: "2026-08-26T09:30:00Z",
    readTime: 5,
    likes: 234,
    comments: 67,
    shares: 89,
    featured: true,
    status: "published",
    tags: ["Senate", "Infrastructure", "Budget"],
  },
  {
    id: "art2",
    slug: "afrobeats-global-chart-record-2026",
    title: "Nigerian Artist Breaks Global Streaming Record with 'Lagos Nights' Album",
    excerpt: "A debut album from Port Harcourt-born singer Davion has shattered streaming records, becoming the fastest African album to hit 500 million plays on Spotify.",
    body: `<p>A debut album from Port Harcourt-born singer Davion has shattered streaming records, becoming the fastest African album to hit 500 million plays on Spotify, cementing Nigeria's dominance in the global music landscape.</p>
<p>'Lagos Nights' achieved the milestone in just 18 days, surpassing the previous record held by Burna Boy's 'Twice as Tall.' The album blends Afrobeats, highlife, and trap elements in a way that critics are calling "a genre-defining moment."</p>
<h2>The Road to 500 Million</h2>
<p>The album's lead single 'Eko Bridge' topped charts in the UK, Germany, and the United States simultaneously — a first for a Nigerian debut artist. The music video, filmed entirely in Lagos Island and Victoria Island, has garnered over 120 million views on YouTube.</p>`,
    coverImage: "https://picsum.photos/seed/music1/800/450",
    category: "Entertainment",
    author: AUTHORS[1],
    publishedAt: "2026-08-26T08:15:00Z",
    readTime: 4,
    likes: 512,
    comments: 143,
    shares: 267,
    featured: true,
    status: "published",
    tags: ["Music", "Afrobeats", "Streaming"],
  },
  {
    id: "art3",
    slug: "super-eagles-world-cup-qualifier-win",
    title: "Super Eagles Thrash Ghana 3-0, Top World Cup Qualifying Group",
    excerpt: "A brilliant hat-trick from Victor Osimhen propelled Nigeria to a commanding victory over arch-rivals Ghana in the World Cup qualifier, sending the Eagles to the top of Group C.",
    body: `<p>A brilliant hat-trick from Victor Osimhen propelled Nigeria to a commanding victory over arch-rivals Ghana in the World Cup qualifier, sending the Eagles to the top of Group C with maximum points from three games.</p>
<p>The match, played at the Moshood Abiola National Stadium in Abuja before a capacity crowd of 60,000 fans, was a masterclass in attacking football under coach Finidi George, who has transformed the Eagles' fortunes since taking charge last year.</p>
<h2>Match Report</h2>
<p>Osimhen opened the scoring in the 12th minute with a predatory finish after latching onto a through-ball from Samuel Chukwueze. He doubled the lead with a stunning volley on the half-hour mark before completing his hat-trick from the penalty spot in the 67th minute.</p>`,
    coverImage: "https://picsum.photos/seed/football1/800/450",
    category: "Sport",
    author: AUTHORS[2],
    publishedAt: "2026-08-25T22:00:00Z",
    readTime: 6,
    likes: 892,
    comments: 312,
    shares: 445,
    featured: false,
    status: "published",
    tags: ["Super Eagles", "World Cup", "Football"],
  },
  {
    id: "art4",
    slug: "naira-strengthens-dollar-exchange-rate",
    title: "Naira Strengthens to ₦1,450 Per Dollar as Oil Revenues Surge",
    excerpt: "The Nigerian naira recorded its strongest performance in two years, appreciating against the US dollar following a surge in crude oil export revenues and improved CBN foreign exchange management.",
    body: `<p>The Nigerian naira recorded its strongest performance in two years on Tuesday, appreciating to ₦1,450 per US dollar at the official Investors and Exporters window, following a surge in crude oil export revenues and what the Central Bank of Nigeria describes as "improved liquidity management."</p>
<p>The development represents a 12% appreciation over the past 30 days and has been cautiously welcomed by businesses and importers who have struggled with chronic dollar scarcity since the currency was floated in 2023.</p>`,
    coverImage: "https://picsum.photos/seed/business1/800/450",
    category: "Business",
    author: AUTHORS[3],
    publishedAt: "2026-08-26T10:00:00Z",
    readTime: 4,
    likes: 178,
    comments: 89,
    shares: 134,
    featured: false,
    status: "published",
    tags: ["Naira", "Economy", "CBN"],
  },
  {
    id: "art5",
    slug: "lagos-flood-displacement-august-2026",
    title: "Flooding Displaces 12,000 Residents in Lagos Mainland, Relief Efforts Underway",
    excerpt: "Heavy rainfall overnight has caused widespread flooding across Lagos Mainland, displacing thousands of residents and prompting emergency response from NEMA and the Lagos State government.",
    body: `<p>Heavy rainfall overnight has caused widespread flooding across Lagos Mainland, displacing an estimated 12,000 residents and prompting a coordinated emergency response from the National Emergency Management Agency and the Lagos State government.</p>
<p>The worst-affected areas include Bariga, Somolu, Ketu, and Agege, where drainage infrastructure has long been overwhelmed by the combination of rapid urbanization and inadequate maintenance. Some residents reported water levels reaching chest height inside their homes by 2am.</p>`,
    coverImage: "https://picsum.photos/seed/flood1/800/450",
    category: "Metro",
    author: AUTHORS[4],
    publishedAt: "2026-08-26T07:45:00Z",
    readTime: 3,
    likes: 345,
    comments: 128,
    shares: 201,
    featured: false,
    status: "published",
    tags: ["Lagos", "Flooding", "Emergency"],
  },
  {
    id: "art6",
    slug: "tinubu-economic-reform-assessment",
    title: "Two Years On: Has Tinubu's Economic Reform Delivered?",
    excerpt: "An in-depth assessment of the Tinubu administration's flagship economic policies — fuel subsidy removal, naira float, and the tax reform agenda — and their real-world impact on ordinary Nigerians.",
    body: `<p>Two years after President Bola Tinubu took office and immediately announced the end of the fuel subsidy regime, Nigerians are still debating whether the pain of reform has been worth it — and whether the promised economic dividends are finally arriving.</p>
<p>The subsidy removal alone saved the federal government an estimated ₦10 trillion in the first year, money that was theoretically redirected to education, healthcare, and infrastructure. But for millions of Nigerians who saw the cost of petrol more than triple overnight, the arithmetic of reform has felt deeply personal.</p>`,
    coverImage: "https://picsum.photos/seed/opinion1/800/450",
    category: "Opinion",
    author: AUTHORS[0],
    publishedAt: "2026-08-25T14:00:00Z",
    readTime: 8,
    likes: 423,
    comments: 234,
    shares: 312,
    featured: false,
    status: "published",
    tags: ["Tinubu", "Economy", "Reform"],
  },
  {
    id: "art7",
    slug: "abuja-new-metro-line-launch",
    title: "Abuja Light Rail Phase 2 Opens, Connecting Suburbs to City Centre",
    excerpt: "The Federal Capital Territory Administration officially launched the second phase of the Abuja Light Rail system on Monday, adding four new stations and extending service to the Lokogoma and Galadimawa districts.",
    body: `<p>The Federal Capital Territory Administration officially launched the second phase of the Abuja Light Rail system on Monday, adding four new stations and extending service to the Lokogoma and Galadimawa districts where hundreds of thousands of civil servants and residents have long endured brutal commutes.</p>`,
    coverImage: "https://picsum.photos/seed/metro1/800/450",
    category: "National",
    author: AUTHORS[4],
    publishedAt: "2026-08-25T11:30:00Z",
    readTime: 3,
    likes: 267,
    comments: 45,
    shares: 88,
    featured: false,
    status: "published",
    tags: ["Abuja", "Transport", "Infrastructure"],
  },
  {
    id: "art8",
    slug: "nollywood-cannes-award-2026",
    title: "Nollywood Film 'Chains of Oyo' Wins Best Director at Cannes",
    excerpt: "Nigerian filmmaker Kunle Afolayan has made history by becoming the first African director to win the Best Director award at the Cannes Film Festival for his epic historical drama 'Chains of Oyo'.",
    body: `<p>Nigerian filmmaker Kunle Afolayan has made history at the Cannes Film Festival, becoming the first African director to win the prestigious Best Director award for his sweeping historical epic 'Chains of Oyo,' a three-hour meditation on the rise and fall of the Oyo Empire told through the eyes of a royal slave.</p>`,
    coverImage: "https://picsum.photos/seed/nollywood1/800/450",
    category: "Entertainment",
    author: AUTHORS[1],
    publishedAt: "2026-08-24T16:00:00Z",
    readTime: 5,
    likes: 678,
    comments: 189,
    shares: 423,
    featured: false,
    status: "published",
    tags: ["Nollywood", "Cannes", "Film"],
  },
  {
    id: "art9",
    slug: "nigeria-tech-startup-unicorn-2026",
    title: "Lagos Fintech Startup Becomes Nigeria's 6th Unicorn with $1.2B Valuation",
    excerpt: "PayNow Africa, a Lagos-based fintech targeting unbanked communities across West Africa, has raised a $200 million Series C round that values the company at $1.2 billion.",
    body: `<p>PayNow Africa, a Lagos-based fintech startup targeting the unbanked and underbanked communities across West Africa, has closed a $200 million Series C funding round led by Sequoia Capital and Tiger Global, pushing its valuation to $1.2 billion and making it Nigeria's sixth unicorn.</p>`,
    coverImage: "https://picsum.photos/seed/tech1/800/450",
    category: "Business",
    author: AUTHORS[3],
    publishedAt: "2026-08-24T09:00:00Z",
    readTime: 4,
    likes: 345,
    comments: 67,
    shares: 178,
    featured: false,
    status: "published",
    tags: ["Fintech", "Startup", "Investment"],
  },
  {
    id: "art10",
    slug: "ni-delta-amnesty-programme-review",
    title: "FG Reviews Niger Delta Amnesty Programme as Pipeline Vandalism Resurges",
    excerpt: "The federal government has launched a comprehensive review of the Niger Delta Amnesty Programme following a sharp increase in pipeline vandalism that has cut crude oil production by an estimated 200,000 barrels per day.",
    body: `<p>The federal government has launched a comprehensive review of the Niger Delta Amnesty Programme following a sharp increase in pipeline vandalism across Delta, Bayelsa, and Rivers states that has cut crude oil production by an estimated 200,000 barrels per day over the past six weeks.</p>`,
    coverImage: "https://picsum.photos/seed/niger1/800/450",
    category: "National",
    author: AUTHORS[0],
    publishedAt: "2026-08-23T13:00:00Z",
    readTime: 5,
    likes: 189,
    comments: 78,
    shares: 112,
    featured: false,
    status: "published",
    tags: ["Niger Delta", "Oil", "Security"],
  },
  {
    id: "art11",
    slug: "nigeria-women-basketball-afrobasket",
    title: "D'Tigress Retain AfroBasket Title with Dominant 78-52 Final Win",
    excerpt: "Nigeria's women's basketball team retained their AfroBasket championship title with a commanding 78-52 victory over host nation Senegal in Dakar, claiming their fourth consecutive continental crown.",
    body: `<p>Nigeria's women's basketball team, the D'Tigress, retained their AfroBasket championship title on Sunday with a commanding 78-52 victory over host nation Senegal in Dakar, claiming their fourth consecutive continental crown and cementing their status as the undisputed giants of African basketball.</p>`,
    coverImage: "https://picsum.photos/seed/basketball1/800/450",
    category: "Sport",
    author: AUTHORS[2],
    publishedAt: "2026-08-23T21:00:00Z",
    readTime: 3,
    likes: 456,
    comments: 89,
    shares: 234,
    featured: false,
    status: "published",
    tags: ["D'Tigress", "Basketball", "AfroBasket"],
  },
  {
    id: "art12",
    slug: "pending-education-reform-bill",
    title: "WAEC Results Show Improvement But Funding Gap Remains Critical",
    excerpt: "The 2026 West African Senior School Certificate Examination results show an improvement in overall pass rates, but education advocates warn that a chronic underfunding crisis continues to undermine Nigeria's schools.",
    body: `<p>The West African Examinations Council has released the 2026 WASSCE results, showing that 68.2% of Nigerian candidates obtained credits in five or more subjects including English and Mathematics — an improvement of 4.3 percentage points over the previous year.</p>`,
    coverImage: "https://picsum.photos/seed/education1/800/450",
    category: "National",
    author: AUTHORS[4],
    publishedAt: "2026-08-22T10:00:00Z",
    readTime: 4,
    likes: 234,
    comments: 156,
    shares: 89,
    featured: false,
    status: "published",
    tags: ["WAEC", "Education", "Schools"],
  },
];

export const PENDING_ARTICLES: Article[] = [
  {
    id: "pend1",
    slug: "draft-article-one",
    title: "ASUU Strike Threat Looms as FG Fails to Meet Deadline",
    excerpt: "The Academic Staff Union of Universities has issued a fresh warning following the federal government's failure to implement agreed-upon salary packages by the August 31 deadline.",
    body: "<p>Draft content...</p>",
    coverImage: "https://picsum.photos/seed/asuu1/800/450",
    category: "National",
    author: AUTHORS[0],
    publishedAt: "2026-08-26T12:00:00Z",
    readTime: 4,
    likes: 0,
    comments: 0,
    shares: 0,
    featured: false,
    status: "pending",
    tags: ["ASUU", "Education", "Strike"],
  },
  {
    id: "pend2",
    slug: "draft-article-two",
    title: "Kano State Launches Emergency Food Distribution for 500,000 Families",
    excerpt: "The Kano state government has commenced a food distribution programme targeting vulnerable families affected by flooding and the ongoing cost-of-living crisis.",
    body: "<p>Draft content...</p>",
    coverImage: "https://picsum.photos/seed/kano1/800/450",
    category: "National",
    author: AUTHORS[1],
    publishedAt: "2026-08-26T11:00:00Z",
    readTime: 3,
    likes: 0,
    comments: 0,
    shares: 0,
    featured: false,
    status: "pending",
    tags: ["Kano", "Food", "Relief"],
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    articleId: "art1",
    author: AUTHORS[1],
    content: "This is a massive development. The opposition walkout was predictable but the bill passing is what matters. Now we wait to see if the funds actually reach the projects.",
    createdAt: "2026-08-26T10:15:00Z",
    likes: 45,
    replies: [
      {
        id: "c1r1",
        articleId: "art1",
        author: AUTHORS[2],
        content: "Exactly. Nigerian legislators are good at passing bills. Implementation is where it always falls apart. I'll believe it when I see construction begin.",
        createdAt: "2026-08-26T10:45:00Z",
        likes: 23,
        replies: [],
      },
    ],
  },
  {
    id: "c2",
    articleId: "art1",
    author: AUTHORS[4],
    content: "The Lagos-Ibadan expressway funding is long overdue. That road has been a death trap for years.",
    createdAt: "2026-08-26T11:00:00Z",
    likes: 67,
    replies: [],
  },
];

export const CATEGORIES: Category[] = [
  "National",
  "Politics",
  "Entertainment",
  "Metro",
  "Sport",
  "Opinion",
  "Business",
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return ARTICLES.filter((a) => a.featured);
}

export function getTrendingArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.likes + b.comments - (a.likes + a.comments)).slice(0, 5);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
  );
}
