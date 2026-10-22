export type CategoryId =
  | "general"
  | "real-estate"
  | "sales"
  | "insurance"
  | "specialty"
  | "platforms"
  | "tax";

export interface KeywordPage {
  id: string;
  path: string;
  primaryKeyword: string;
  h1: string;
  title: string;
  description: string;
  volume: string;
  difficulty: string;
  secondary: string[];
  category: CategoryId;
  phase: 1 | 2 | 3;
  published: boolean;
  related: string[];
  navLabel: string;
  headerGroup: "real-estate" | "sales" | "insurance" | null;
  parentId?: string;
}

export interface InfoPage {
  id: string;
  path: string;
  h1: string;
  title: string;
  description: string;
}

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "real-estate", label: "Real estate" },
  { id: "sales", label: "Sales" },
  { id: "insurance", label: "Insurance" },
  { id: "specialty", label: "Other specialties" },
  { id: "platforms", label: "Marketplaces and affiliates" },
  { id: "tax", label: "Tax and paychecks" },
];

export const keywordPages: KeywordPage[] = [
  {
    id: "home",
    path: "/",
    primaryKeyword: "commission calculator",
    h1: "Commission Calculator",
    title: "Commission Calculator – Free & Instant | Commissionly",
    description:
      "Free commission calculator for sale pay, a target commission, or the rate you earned. Includes tiers, salary plus commission, and a share link.",
    volume: "5200",
    difficulty: "1",
    secondary: [
      "commission pay calculator",
      "commission rate calculator",
      "commission percentage calculator",
      "how to calculate commission",
    ],
    category: "general",
    phase: 1,
    published: true,
    related: ["real-estate", "sales", "tiered", "salary", "split", "commercial"],
    navLabel: "Commission calculator",
    headerGroup: null,
  },
  {
    id: "real-estate",
    path: "/real-estate-commission-calculator/",
    primaryKeyword: "real estate commission calculator",
    h1: "Real Estate Commission Calculator",
    title: "Real Estate Commission Calculator – Free | Commissionly",
    description:
      "Free real estate commission calculator with broker split, buyer agent fee, and seller net proceeds. You enter every rate. Nothing is treated as standard.",
    volume: "1900",
    difficulty: "6",
    secondary: [
      "realtor commission calculator",
      "real estate agent commission calculator",
      "buyer agent commission calculator",
      "realtor calculator commission",
      "commission calculator real estate",
    ],
    category: "real-estate",
    phase: 1,
    published: true,
    related: ["broker-split", "commercial", "home", "sales", "split", "salary"],
    navLabel: "Real estate commission",
    headerGroup: "real-estate",
  },
  {
    id: "broker-split",
    path: "/real-estate-commission-calculator/broker-split/",
    primaryKeyword: "real estate commission calculator with broker split",
    h1: "Real Estate Commission Calculator with Broker Split",
    title: "Real Estate Broker Split Calculator | Commissionly",
    description:
      "Free real estate commission calculator with broker split, an annual cap, and a flat per-deal fee. See the agent net on this sale before taxes.",
    volume: "100",
    difficulty: "0",
    secondary: ["agent commission split", "broker split calculator"],
    category: "real-estate",
    phase: 1,
    published: true,
    related: ["real-estate", "split", "commercial", "sales", "home"],
    navLabel: "Broker split",
    headerGroup: "real-estate",
    parentId: "real-estate",
  },
  {
    id: "commercial",
    path: "/commercial-real-estate-commission-calculator/",
    primaryKeyword: "commercial real estate commission calculator",
    h1: "Commercial Real Estate Commission Calculator",
    title: "Commercial Real Estate Commission Calculator | Commissionly",
    description:
      "Free commercial real estate commission calculator for building sales and leases. Estimate a percent of price or a percent of total lease rent.",
    volume: "60",
    difficulty: "4",
    secondary: ["commercial lease commission"],
    category: "real-estate",
    phase: 1,
    published: true,
    related: ["real-estate", "broker-split", "home", "split", "sales"],
    navLabel: "Commercial real estate",
    headerGroup: "real-estate",
  },
  {
    id: "sales",
    path: "/sales-commission-calculator/",
    primaryKeyword: "sales commission calculator",
    h1: "Sales Commission Calculator",
    title: "Sales Commission Calculator – Free & Instant | Commissionly",
    description:
      "Free sales commission calculator with an optional quota, accelerator, and draw. See commission earned, percent of quota, and pay above quota.",
    volume: "250",
    difficulty: "29",
    secondary: ["commission rate", "quota", "accelerator"],
    category: "sales",
    phase: 1,
    published: true,
    related: ["tiered", "salary", "home", "split", "real-estate", "broker-split"],
    navLabel: "Sales commission",
    headerGroup: "sales",
  },
  {
    id: "tiered",
    path: "/tiered-commission-calculator/",
    primaryKeyword: "tiered commission calculator",
    h1: "Tiered Commission Calculator",
    title: "Tiered Commission Calculator – Free | Commissionly",
    description:
      "Free tiered commission calculator for marginal and retroactive plans. Edit each tier, then compare both methods on the same sales total today.",
    volume: "60",
    difficulty: "8",
    secondary: ["graduated commission", "commission tiers"],
    category: "sales",
    phase: 1,
    published: true,
    related: ["sales", "salary", "home", "split", "real-estate"],
    navLabel: "Tiered commission",
    headerGroup: "sales",
  },
  {
    id: "salary",
    path: "/salary-plus-commission-calculator/",
    primaryKeyword: "salary plus commission calculator",
    h1: "Salary Plus Commission Calculator",
    title: "Salary Plus Commission Calculator – Free | Commissionly",
    description:
      "Free salary plus commission calculator for base pay, commission rate or tiers, and a draw. See each paycheck and your annual on-target earnings.",
    volume: "70",
    difficulty: "0",
    secondary: ["base plus commission", "OTE calculator"],
    category: "sales",
    phase: 1,
    published: true,
    related: ["sales", "tiered", "home", "split", "real-estate"],
    navLabel: "Salary plus commission",
    headerGroup: "sales",
  },
  {
    id: "split",
    path: "/commission-split-calculator/",
    primaryKeyword: "commission split calculator",
    h1: "Commission Split Calculator",
    title: "Commission Split Calculator – Free & Instant | Commissionly",
    description:
      "Free commission split calculator for up to six people. Divide one fee by percentage or by dollar amounts, and check that the shares add up exactly.",
    volume: "70",
    difficulty: "8",
    secondary: ["split commission between agents"],
    category: "general",
    phase: 1,
    published: true,
    related: ["real-estate", "broker-split", "sales", "home", "commercial"],
    navLabel: "Commission split",
    headerGroup: "sales",
  },
  {
    id: "life-insurance",
    path: "/life-insurance-commission-calculator/",
    primaryKeyword: "life insurance commission calculator",
    h1: "Life Insurance Commission Calculator",
    title: "Life Insurance Commission Calculator | Commissionly",
    description:
      "Free life insurance commission calculator for first-year and renewal commission. Enter premium, both rates, and the number of years to total.",
    volume: "100",
    difficulty: "0",
    secondary: ["insurance commission calculator", "first-year commission", "renewal commission"],
    category: "insurance",
    phase: 2,
    published: true,
    related: ["home", "sales", "salary", "real-estate", "travel"],
    navLabel: "Life insurance",
    headerGroup: "insurance",
  },
  {
    id: "insurance",
    path: "/insurance-commission-calculator/",
    primaryKeyword: "insurance commission calculator",
    h1: "Insurance Commission Calculator",
    title: "Insurance Commission Calculator – Free | Commissionly",
    description:
      "Free insurance commission calculator for new and renewal premium. Compare a first-year rate with a renewal rate on the same policy premium amount.",
    volume: "40",
    difficulty: "0",
    secondary: ["P&C commission", "health insurance commission"],
    category: "insurance",
    phase: 2,
    published: false,
    related: [],
    navLabel: "Insurance commission",
    headerGroup: null,
  },
  {
    id: "annuity",
    path: "/annuity-commission-calculator/",
    primaryKeyword: "annuity commission calculator",
    h1: "Annuity Commission Calculator",
    title: "Annuity Commission Calculator – Free | Commissionly",
    description:
      "Free annuity commission calculator for the upfront percent and an optional trail. See year-one pay and the trail over the years you enter here.",
    volume: "60",
    difficulty: "29",
    secondary: ["annuity agent commission"],
    category: "insurance",
    phase: 2,
    published: false,
    related: [],
    navLabel: "Annuity commission",
    headerGroup: null,
  },
  {
    id: "loan-officer",
    path: "/loan-officer-commission-calculator/",
    primaryKeyword: "loan officer commission calculator",
    h1: "Loan Officer Commission Calculator",
    title: "Loan Officer Commission Calculator – Free | Commissionly",
    description:
      "Free loan officer commission calculator using basis points on the loan amount, with an optional minimum and maximum paid on that single file.",
    volume: "70",
    difficulty: "0",
    secondary: ["mortgage loan officer basis points"],
    category: "specialty",
    phase: 2,
    published: true,
    related: ["home", "real-estate", "sales", "salary", "split"],
    navLabel: "Loan officer",
    headerGroup: null,
  },
  {
    id: "travel",
    path: "/travel-agent-commission-calculator/",
    primaryKeyword: "travel agent commission calculator",
    h1: "Travel Agent Commission Calculator",
    title: "Travel Agent Commission Calculator – Free | Commissionly",
    description:
      "Free travel agent commission calculator for supplier commission and the host agency split. See what you keep from a booking after the split.",
    volume: "100",
    difficulty: "0",
    secondary: ["host agency split"],
    category: "specialty",
    phase: 2,
    published: true,
    related: ["home", "sales", "split", "life-insurance", "saas"],
    navLabel: "Travel agent",
    headerGroup: null,
  },
  {
    id: "mlm",
    path: "/mlm-commission-calculator/",
    primaryKeyword: "mlm commission calculator",
    h1: "MLM Commission Calculator",
    title: "MLM Commission Calculator – Free & Instant | Commissionly",
    description:
      "Free MLM commission calculator for personal sales and a downline override. A neutral note explains why most participants earn very little money.",
    volume: "90",
    difficulty: "0",
    secondary: ["network marketing income"],
    category: "sales",
    phase: 2,
    published: true,
    related: ["home", "tiered", "sales", "salary", "split"],
    navLabel: "MLM commission",
    headerGroup: "sales",
  },
  {
    id: "saas",
    path: "/saas-commission-calculator/",
    primaryKeyword: "saas commission calculator",
    h1: "SaaS Commission Calculator",
    title: "SaaS Commission Calculator – Free & Instant | Commissionly",
    description:
      "Free SaaS commission calculator for ACV or ARR. Compare a multi-year deal paid upfront with the same rate paid out month by month over the term.",
    volume: "60",
    difficulty: "0",
    secondary: ["ARR commission", "SaaS sales comp"],
    category: "sales",
    phase: 2,
    published: true,
    related: ["sales", "tiered", "salary", "home", "split"],
    navLabel: "SaaS commission",
    headerGroup: "sales",
  },
  {
    id: "rental",
    path: "/rental-commission-calculator/",
    primaryKeyword: "rental commission calculator",
    h1: "Rental Commission Calculator",
    title: "Rental Commission Calculator – Free & Instant | Commissionly",
    description:
      "Free rental commission calculator for a percent of one month's rent or a percent of annual rent. Built for leasing agents and apartment locators.",
    volume: "40",
    difficulty: "22",
    secondary: ["leasing agent commission", "apartment locator commission"],
    category: "real-estate",
    phase: 2,
    published: false,
    related: [],
    navLabel: "Rental commission",
    headerGroup: null,
  },
  {
    id: "ny-executor",
    path: "/ny-executor-commission-calculator/",
    primaryKeyword: "ny executor commission calculator",
    h1: "NY Executor Commission Calculator",
    title: "NY Executor Commission Calculator – Free | Commissionly",
    description:
      "Free NY executor commission calculator using the SCPA 2307 sliding scale on amounts received and paid out. Not legal advice. Check the statute.",
    volume: "90",
    difficulty: "0",
    secondary: ["nys executor commission calculator", "SCPA 2307"],
    category: "specialty",
    phase: 2,
    published: false,
    related: [],
    navLabel: "NY executor",
    headerGroup: null,
  },
  {
    id: "ebay",
    path: "/ebay-commission-calculator/",
    primaryKeyword: "ebay commission calculator",
    h1: "eBay Commission Calculator",
    title: "eBay Commission Calculator – Free & Instant | Commissionly",
    description:
      "Free eBay commission calculator for seller fees on a sold item. Rates stay in a checked fee table with the date and the source link on the page.",
    volume: "100",
    difficulty: "0",
    secondary: ["eBay fees"],
    category: "platforms",
    phase: 2,
    published: false,
    related: [],
    navLabel: "eBay fees",
    headerGroup: null,
  },
  {
    id: "paypal",
    path: "/paypal-fee-calculator/",
    primaryKeyword: "paypal commission calculator",
    h1: "PayPal Fee Calculator",
    title: "PayPal Commission Calculator – Free | Commissionly",
    description:
      "Free PayPal commission calculator for the fee taken out of a payment. The rate is stored with the date it was last checked and its source page.",
    volume: "70",
    difficulty: "7",
    secondary: ["PayPal fees"],
    category: "platforms",
    phase: 2,
    published: false,
    related: [],
    navLabel: "PayPal fees",
    headerGroup: null,
  },
  {
    id: "amazon",
    path: "/amazon-affiliate-commission-calculator/",
    primaryKeyword: "amazon affiliate commission calculator",
    h1: "Amazon Affiliate Commission Calculator",
    title: "Amazon Affiliate Commission Calculator | Commissionly",
    description:
      "Free Amazon affiliate commission calculator using Associates category rates. Each rate keeps a last-checked date and the source page URL too.",
    volume: "50",
    difficulty: "2",
    secondary: ["Amazon Associates rates"],
    category: "platforms",
    phase: 2,
    published: false,
    related: [],
    navLabel: "Amazon Associates",
    headerGroup: null,
  },
  {
    id: "clickbank",
    path: "/clickbank-commission-calculator/",
    primaryKeyword: "clickbank commission calculator",
    h1: "ClickBank Commission Calculator",
    title: "ClickBank Commission Calculator – Free | Commissionly",
    description:
      "Free ClickBank commission calculator for an affiliate payout after the recorded fee. The fee line shows when the rate was last checked at the source.",
    volume: "40",
    difficulty: "–",
    secondary: ["affiliate payout"],
    category: "platforms",
    phase: 2,
    published: false,
    related: [],
    navLabel: "ClickBank",
    headerGroup: null,
  },
  {
    id: "tax",
    path: "/commission-tax-calculator/",
    primaryKeyword: "commission tax calculator",
    h1: "Commission Tax Calculator",
    title: "Commission Tax Calculator – Free & Instant | Commissionly",
    description:
      "Free commission tax calculator for supplemental withholding, Social Security, Medicare, and a state rate. Figures are estimates for the tax year shown.",
    volume: "400",
    difficulty: "62",
    secondary: ["commission tax rate calculator", "commission calculator tax"],
    category: "tax",
    phase: 3,
    published: false,
    related: [],
    navLabel: "Commission tax",
    headerGroup: null,
  },
  {
    id: "paycheck",
    path: "/commission-paycheck-calculator/",
    primaryKeyword: "commission paycheck calculator",
    h1: "Commission Paycheck Calculator",
    title: "Commission Paycheck Calculator – Free | Commissionly",
    description:
      "Free commission paycheck calculator that combines commission with regular wages and withholding. It estimates the check, not a payroll filing.",
    volume: "150",
    difficulty: "60",
    secondary: [
      "commission check calculator",
      "paycheck calculator with commission",
      "commission payroll calculator",
    ],
    category: "tax",
    phase: 3,
    published: false,
    related: [],
    navLabel: "Commission paycheck",
    headerGroup: null,
  },
];

export const infoPages: InfoPage[] = [
  {
    id: "calculators",
    path: "/calculators/",
    h1: "Commission Calculators",
    title: "Commission Calculators – Free Tools | Commissionly",
    description:
      "Browse every free Commissionly calculator, from real estate and broker splits to sales pay, tiered plans, salary plus commission, and team splits.",
  },
  {
    id: "about",
    path: "/about/",
    h1: "About Commissionly",
    title: "About Commissionly – Calculator Testing and Sources",
    description:
      "Commissionly publishes free US commission calculators for agents and salespeople. See who runs the site, how the math is tested, and how to report a bug.",
  },
  {
    id: "contact",
    path: "/contact/",
    h1: "Contact",
    title: "Contact Commissionly – Send a Question or Correction",
    description:
      "Contact Commissionly about a calculator result, a missing rate, or a correction. The email address is on this page, and you can send a short note.",
  },
  {
    id: "privacy",
    path: "/privacy-policy/",
    h1: "Privacy Policy",
    title: "Privacy Policy – Analytics, Ads, and CCPA | Commissionly",
    description:
      "Commissionly privacy policy for analytics, cookies, advertising, and CCPA/CPRA choices. Nonessential cookies stay off until you accept them.",
  },
  {
    id: "terms",
    path: "/terms/",
    h1: "Terms of Use",
    title: "Terms of Use for Commissionly Commission Calculators",
    description:
      "Terms of use for Commissionly calculators. Results are planning estimates, not a closing statement or a pay stub, and you decide how to use them.",
  },
  {
    id: "disclaimer",
    path: "/disclaimer/",
    h1: "Disclaimer",
    title: "Commissionly Disclaimer – Estimates Are Not Advice",
    description:
      "Commissionly results are estimates, not financial, tax, legal, or brokerage advice. Confirm every figure with your agreement or a qualified professional.",
  },
];

export function getInfoPage(id: string): InfoPage {
  const page = infoPages.find((entry) => entry.id === id);
  if (!page) throw new Error(`Unknown page: ${id}`);
  return page;
}

export function getKeyword(id: string): KeywordPage {
  const page = keywordPages.find((entry) => entry.id === id);
  if (!page) throw new Error(`Unknown calculator: ${id}`);
  return page;
}

export function publishedKeywords(): KeywordPage[] {
  return keywordPages.filter((page) => page.published);
}

export function relatedKeywords(id: string): KeywordPage[] {
  return getKeyword(id)
    .related.map((relatedId) => getKeyword(relatedId))
    .filter((page) => page.published);
}

export function breadcrumbsFor(id: string): { name: string; path: string }[] {
  const page = getKeyword(id);
  const crumbs = [{ name: "Home", path: "/" }];
  if (page.parentId) {
    const parent = getKeyword(page.parentId);
    crumbs.push({ name: parent.h1, path: parent.path });
  }
  if (page.path !== "/") crumbs.push({ name: page.h1, path: page.path });
  return crumbs;
}

export function infoBreadcrumbs(page: InfoPage): { name: string; path: string }[] {
  return [
    { name: "Home", path: "/" },
    { name: page.h1, path: page.path },
  ];
}

export function headerLinks(group: "real-estate" | "sales" | "insurance"): KeywordPage[] {
  return publishedKeywords().filter((page) => page.headerGroup === group);
}

export function footerGroups(): { label: string; pages: KeywordPage[] }[] {
  return CATEGORIES.map((category) => ({
    label: category.label,
    pages: publishedKeywords().filter((page) => page.category === category.id),
  })).filter((group) => group.pages.length > 0);
}
