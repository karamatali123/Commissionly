import type { CalculatorCopy } from "@/content/types";

export const lifeInsurance: CalculatorCopy = {
  id: "life-insurance",
  intro:
    "This life insurance commission calculator turns a premium, a first-year rate, and a renewal rate into commission over the years you enter. The same steps work as an insurance commission calculator for other lines when the contract pays that way.",
  howTo: {
    heading: "How to calculate life insurance commission",
    paragraphs: [
      "Start with the annual premium in the contract. Multiply it by the first-year commission rate. A $2,000 premium at 50% is $1,000 in year one. That 50% is an illustration you can replace. Carrier schedules differ by product, age, and whether the policy is term or permanent. This life insurance commission calculator does not store a schedule.",
      "Renewal commission uses the same premium and the renewal rate, once for each year after the first. At 5%, the renewal is $100 a year. Over five years there are four renewal years, so renewal commission is $400. Add the first year and the total is $1,400. A one-year term has no renewal line.",
      "Use the same boxes for other insurance when the pay is a first-year percent plus a smaller renewal percent on premium. Health, property, and casualty contracts often use that shape even when the percents are different. Enter the premium and the two rates from the appointment or the commission schedule. If the premium changes every year, this page is the level-premium case. Run it again with the new premium.",
      "Draws, chargebacks, and overrides are not in the total. A chargeback can reclaim first-year commission if the policy lapses inside a period the carrier defines. An agency override is a separate percent paid to someone else. For a quota or an accelerator on sales that are not premium, use the [sales commission calculator](/sales-commission-calculator/). For a base paycheck plus commission, use the [salary plus commission calculator](/salary-plus-commission-calculator/).",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "The form opens on a $2,000 premium, 50% in year one, 5% on renewal, and five years. Year one is $1,000. Each later year is $100. Four renewal years are $400. The total is $1,400. None of those rates is a typical life commission. Replace them with the schedule for the product you actually sold.",
      "Change the term to one year and the total falls to the first-year $1,000. Raise the renewal rate to 10% and each later year is $200, so four years add $800 and the five-year total is $1,800. The premium stays $2,000 in every year of this illustration.",
    ],
  },
  industry: {
    heading: "First-year commission and renewal commission",
    paragraphs: [
      "First-year commission is the larger percent, paid on premium in the first policy year. Renewal commission is the smaller percent on premium that continues. Some schedules step the renewal down again after a few years, or stop it. This page uses one renewal rate for every year after the first. If your schedule changes at year six, run the early years here and the later years as a second calculation.",
      "An insurance commission calculator is the same arithmetic when the contract is written as new business plus renewal. The product name does not change the multiplication. What changes is the percent and whether the carrier pays on the premium you typed or on a target premium that is lower. Type the premium the schedule actually uses.",
      "Agency splits can take a share of what the carrier pays before it reaches the writing agent. This total is the commission from the rates you entered, before that extra split. If you keep 70% of carrier pay, multiply the result by 0.70 yourself, or put the carrier total into the [commission split calculator](/commission-split-calculator/). The [commission calculator](/) is the plain sale-times-rate version when there is no renewal year.",
    ],
  },
  faqs: [
    {
      question: "How do you calculate life insurance commission?",
      answer:
        "Multiply the annual premium by the first-year rate, then multiply the same premium by the renewal rate for each year after the first. A $2,000 premium at 50% and then 5% for five years is $1,000 plus four times $100, which is $1,400. Enter the rates from the carrier schedule. The form does not look up a product.",
    },
    {
      question: "What is the difference between first-year and renewal commission?",
      answer:
        "First-year commission is the percent on premium in the first policy year. Renewal commission is the percent on premium after that. The first year is usually larger. On the prefilled numbers, year one is $1,000 and each renewal year is $100. A contract can use more than one renewal rate. This page uses the single renewal rate you type.",
    },
    {
      question: "Can I use this as an insurance commission calculator?",
      answer:
        "Yes, when the pay is a new-business percent plus a renewal percent on premium. Enter that premium and those two rates, whether the line is life, health, or property and casualty. If the contract pays a flat fee per policy instead of a percent, this page will not match it. Type the premium the schedule names, not a different face amount.",
    },
    {
      question: "Does the premium have to stay the same every year?",
      answer:
        "This calculation assumes the premium you typed continues for every year in the term. That fits a level premium. If the premium rises or the client pays a different amount, the renewal line will be wrong. Run a separate calculation for the years with the new premium, and add the totals yourself. The page does not store last year's premium.",
    },
    {
      question: "Are chargebacks included?",
      answer:
        "No. The total is commission earned on the rates and years you entered, assuming the premium stays in force. A lapse can create a chargeback that the carrier defines in the contract. This life insurance commission calculator does not subtract that clawback, and it does not know the free-look period. Treat a lapse as a separate reduction.",
    },
    {
      question: "Is the result after an agency split?",
      answer:
        "No. The result is premium times the rates you entered. If an agency keeps part of the carrier commission before you are paid, that split is another step. You can multiply the total by the share you keep, or divide the carrier total on the commission split calculator. Taxes are not withheld here either. The figure is gross commission.",
    },
  ],
  about:
    "Commissionly multiplies the premium by the first-year rate and by the renewal rate for each later year. Last updated October 22, 2026. The rates are yours to enter. The page does not publish a carrier schedule.",
  reviewNotes: ["Illustrative 50% and 5% rates are not a claim about any carrier schedule."],
};

export const travel: CalculatorCopy = {
  id: "travel",
  intro:
    "This travel agent commission calculator takes a booking amount, the supplier's commission rate, and the share you keep after a host agency split.",
  howTo: {
    heading: "How to calculate travel agent commission",
    paragraphs: [
      "Multiply the booking amount by the supplier commission rate. A $4,000 booking at 10% produces $400 of supplier commission. That 10% is only a starting example. Hotels, cruises, tours, and air do not share one rate, and some bookings pay a flat fee instead of a percent. Type the rate on the booking you are checking.",
      "The host split is the share of that supplier commission you keep. At 70%, you keep $280 and the host agency keeps $120. If you have no host, enter 100% and the host line is zero. If the host keeps a flat fee instead of a percent, this travel agent commission calculator is the percent case. Subtract a flat fee from the supplier commission yourself.",
      "The booking amount should be the amount the commission is calculated on. Some suppliers pay on the fare before tax, and some exclude port charges or resort fees. Using the client's full credit-card total will overstate the commission when those pieces are excluded. Read the commission line on the booking, not the brochure price alone.",
      "Overrides, consortium bonuses, and credit-card fees are extra. They are not in the three boxes. Add a bonus after you have the base commission, and do not treat it as part of the supplier rate unless the statement combines them. For a team that shares one booking, take the amount you keep and divide it on the [commission split calculator](/commission-split-calculator/). A plain percent with no host split also fits the [commission calculator](/).",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "The form opens on a $4,000 booking, a 10% supplier rate, and a 70% share kept by the agent. Supplier commission is $400. You keep $280. The host agency keeps $120. Change the keep share to 100% and you keep the full $400.",
      "A $10,000 cruise at 12% with an 80% keep share is $1,200 of supplier commission and $960 to you. The host keeps $240. Those percents are illustrations. Replace them with the supplier and host agreement for the booking in front of you.",
    ],
  },
  industry: {
    heading: "Supplier commission and the host agency split",
    paragraphs: [
      "Supplier commission is what the hotel, cruise line, tour operator, or other supplier pays on a booking. The rate is in that supplier's program. A host agency split is the agreement between you and the host about how that commission is divided. One agreement can be 70/30, another 90/10, and another a monthly fee plus a higher split. The keep box is your side of that agreement.",
      "Air tickets are a poor fit for a single percent when the supplier pays little or nothing and the agency charges a service fee instead. If you were paid a planning fee, enter that fee as the booking amount and use a 100% rate only if the whole fee is yours. If the fee is not a commission, do not force it through a supplier rate that does not exist.",
      "Groups and tours sometimes pay a different rate above a passenger count. Calculate the base group at one rate and the extra passengers at the other, then add the two supplier commissions before the host split. This page is one rate for one booking amount. The [sales commission calculator](/sales-commission-calculator/) is closer when a quota or an accelerator sits on top of a year of bookings.",
    ],
  },
  faqs: [
    {
      question: "How does a travel agent commission calculator use a host split?",
      answer:
        "It first finds the supplier commission, which is the booking amount times the supplier rate. It then multiplies that commission by the share you keep. On a $4,000 booking at 10%, supplier commission is $400. At a 70% keep share you receive $280 and the host receives $120. Enter 100% if there is no host. The split is whatever your host agreement says.",
    },
    {
      question: "What amount should I enter as the booking?",
      answer:
        "Enter the amount the supplier uses to calculate commission. That is often the fare or package price, and it may exclude taxes or fees the client still pays. Using the full amount charged to the client can overstate the commission. If the confirmation shows a commissionable total, use that figure. The page does not look up a supplier's rule for you.",
    },
    {
      question: "What if the supplier pays a flat fee?",
      answer:
        "Enter the flat fee as the booking amount, set the supplier rate to 100%, and then enter the share you keep. A $150 fee you fully keep is $150. A $150 fee at a 70% host split is $105 to you. Do not also type 100% as the keep share unless the whole fee is yours. This is a workaround for a fee that is not a percent of the trip.",
    },
    {
      question: "Does this include service fees I charge the client?",
      answer:
        "Only if you type them into the booking amount. A planning fee you charge the traveler is not supplier commission. Add it after the result, or enter it as its own calculation with the rate and split that apply to that fee. Mixing the client fee into a supplier percent will not match the supplier statement. Keep the two payments separate.",
    },
    {
      question: "Can several agents share one booking?",
      answer:
        "Find the amount you keep, then divide that amount on the commission split calculator. This page stops at you and the host. It does not know a second agent, a group leader, or an outside referral. If the host split already happened, split only the dollars you received. Do not split the supplier commission again or the host share will be divided twice.",
    },
    {
      question: "Is the result before tax?",
      answer:
        "Yes. The amount you keep is gross commission before income tax. How it is reported depends on whether you are paid as an employee or as an independent contractor. This travel agent commission calculator does not withhold taxes and does not produce a 1099. Use the result to check the booking math, then handle tax with your own records.",
    },
  ],
  about:
    "Commissionly multiplies the booking by the supplier rate, then applies the share you keep. Last updated October 22, 2026. Host agreements and supplier rates are yours to enter.",
  reviewNotes: ["The 10% and 70% defaults are illustrations, not a supplier or host survey."],
};

export const mlm: CalculatorCopy = {
  id: "mlm",
  intro:
    "This MLM commission calculator adds personal sales commission to the override levels you type. It does not predict recruiting income, and most people who join these plans earn very little.",
  howTo: {
    heading: "How to calculate MLM commission",
    paragraphs: [
      "Multiply your personal sales volume by your personal rate. Volume of $1,000 at 20% is $200. That rate is an example. A plan may pay on personal volume, on retail profit, or on points that are not dollars. If the plan uses points, convert them to the dollar volume the statement uses before you type them, or the result will not match the check.",
      "Each override level is someone else's volume times the rate you earn on that level. Level 1 volume of $5,000 at 5% is $250. Leave a level blank to skip it. The total is personal commission plus the overrides you entered. On the prefilled numbers that is $200 plus $250, or $450. This MLM commission calculator does not fill in a downline for you.",
      "The total is only as complete as the rows you type. A plan can have more than three levels, different rates for different products, and bonuses that are not a percent of volume. Add those bonuses after the result. Do not type a hoped-for downline. Type volume that has already been sold, or label the result as a sketch if you are testing a plan on paper.",
      "Recruiting bonuses, car bonuses, and rank prizes are not in the boxes. They are paid on rules that are not a single percent of volume. Read the compensation plan for the period you are checking. For a straight percent of one sale with no levels, the [commission calculator](/) is enough. For tiers on your own sales, use the [tiered commission calculator](/tiered-commission-calculator/).",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "Personal volume is $1,000 at 20%, which is $200. Override level 1 is $5,000 at 5%, which is $250. Levels 2 and 3 are blank, so they add nothing. The total of the levels entered is $450. That is not an income claim. It is the sum of two lines.",
      "Add a second override of $20,000 at 2% and that line is $400. The new total is $850. Clear the first override and the total falls back to the personal $200. The page will not invent volume for people who have not sold anything.",
    ],
  },
  industry: {
    heading: "Personal volume and downline overrides",
    paragraphs: [
      "Personal volume is what you sold. An override is a percent of volume sold by people in a downline, at the level the plan names. The names of those levels vary. What matters is the volume and the rate on the statement. If the statement shows points, use the plan's own conversion before you type a dollar amount. A wrong conversion makes every line wrong.",
      "Published income disclosures for these plans, when a company provides them, usually show that most participants earn little or nothing after expenses. This calculator cannot correct for that. It will happily multiply a large imagined downline by a high rate. That number is not evidence that the downline will exist. Expenses such as product you buy to qualify are not subtracted.",
      "A [salary plus commission calculator](/salary-plus-commission-calculator/) fits a job with a base wage. An MLM payout is usually not that. If you are comparing a plan with a conventional sales job, calculate the conventional job on the salary page and keep this page to the levels in the MLM statement. Do not add the two totals and call the sum expected earnings.",
    ],
  },
  faqs: [
    {
      question: "How do you calculate MLM commission?",
      answer:
        "Multiply personal sales volume by the personal rate, then multiply each override level's volume by that level's rate, and add the lines. $1,000 at 20% is $200. $5,000 at 5% is $250. Together that is $450. Blank levels add nothing. The calculator uses only the rows you fill in. It does not build a downline or estimate recruiting.",
    },
    {
      question: "Does this predict what I will earn?",
      answer:
        "No. It adds the volume and rates you type. If you type volume that has not been sold, the total is a sketch, not a forecast. Income disclosures for many of these plans show that most participants earn very little after expenses. This page does not subtract the products you buy, the fees you pay, or the people who do not reorder.",
    },
    {
      question: "What if my plan has more than three override levels?",
      answer:
        "Calculate the first three levels here, then run the remaining levels as a second pass and add the two totals. The page stops at three override rows so the form stays short. A bonus that is not a percent of volume, such as a rank prize, still has to be added by hand. Do not stuff that prize into a volume box.",
    },
    {
      question: "Should I enter retail price or commissionable volume?",
      answer:
        "Enter the volume the plan uses to calculate the percent. Some plans pay on a wholesale or point value that is lower than the retail price the customer paid. Using retail when the plan uses points will overstate the check. The statement for the period is the right source. This MLM commission calculator does not convert points on its own.",
    },
    {
      question: "Are expenses subtracted?",
      answer:
        "No. The total is commission from the levels you entered, before product purchases, website fees, event tickets, and samples. Those costs can be larger than the commission. Subtract them yourself if you want a personal net. The page also does not withhold taxes. A positive total is not the cash you keep after the costs of participating.",
    },
    {
      question: "Can I include a recruiting bonus?",
      answer:
        "Only if that bonus is truly a percent of volume you can type on a row. Many recruiting bonuses are a fixed dollar amount per new enrollee, or they require a rank you may not hold. Add a fixed bonus after the result instead of hiding it inside a rate. The note under the result is there because typed levels are not the same thing as expected income.",
    },
  ],
  about:
    "Commissionly adds personal volume times your rate to each override level you enter. Last updated October 22, 2026. The total is arithmetic on those rows. It is not an income disclosure.",
  reviewNotes: ["The result note states that typed levels are not a prediction. Do not soften that."],
};

export const loanOfficer: CalculatorCopy = {
  id: "loan-officer",
  intro:
    "This loan officer commission calculator turns basis points on a loan amount into gross commission, applies an optional minimum or maximum, then applies the share you keep.",
  howTo: {
    heading: "How to calculate loan officer commission",
    paragraphs: [
      "Basis points are hundredths of a percent. One hundred basis points equal 1% of the loan amount. On a $400,000 loan, 100 basis points are $4,000. Fifty basis points on a $100,000 loan are $500. Type the basis points from the comp plan for this file. This loan officer commission calculator does not assume a market rate.",
      "A minimum raises the gross if the basis-point math is smaller. A maximum cuts the gross if the math is larger. Leave either box blank when the plan has no floor or ceiling. If both are filled, the minimum cannot be larger than the maximum. The company split is applied after that adjustment, not before.",
      "The share you keep is your percent of the adjusted gross. At 50% of $4,000, you keep $2,000 and the company keeps $2,000. A 100% share means the adjusted gross is yours. Some plans pay a different split after a monthly volume target. This page is one file. Run each file, then add the results for the month.",
      "Broker fees charged to the borrower are not automatically your commission. Enter only the basis points the plan pays you on. If a processor or a referral is paid from your side, subtract that after the result or divide it on the [commission split calculator](/commission-split-calculator/). For a home sale rather than a loan, use the [real estate commission calculator](/real-estate-commission-calculator/).",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "The form opens on a $400,000 loan, 100 basis points, and a 50% share, with no minimum or maximum. Gross commission is $4,000. You keep $2,000. The company keeps $2,000. Change the share to 70% and you keep $2,800.",
      "A $100,000 loan at 50 basis points is $500 before a floor. With a $1,000 minimum and a 100% share, you keep $1,000. A $1,000,000 loan at 200 basis points is $20,000 before a ceiling. With an $8,000 maximum and a 100% share, you keep $8,000. The floor and the ceiling are plan terms, not suggestions.",
    ],
  },
  industry: {
    heading: "Basis points, minimums, and the company split",
    paragraphs: [
      "Loan officer pay is often written in basis points instead of a plain percent. The conversion is mechanical: basis points divided by 10,000, times the loan amount. A plan might pay different points on conventional, FHA, or a brokered loan. Use the points for the file you are checking. Mixing products into one average will not match payroll.",
      "Minimums protect a small loan. Maximums limit a large one. Some plans apply the cap per file, and some apply it per month. This page is per file, which matches the minimum and maximum boxes. A monthly cap has to be checked against the sum of the files, not against one loan. Do not type a monthly cap into the per-file maximum unless the plan says the cap is per file.",
      "Self-generated loans and company-generated loans sometimes pay different splits. Run them as separate calculations. A draw against future commission is not a basis-point question. The [salary plus commission calculator](/salary-plus-commission-calculator/) is closer when there is a base wage and a draw. The result here is gross of income tax.",
    ],
  },
  faqs: [
    {
      question: "How many basis points are in one percent?",
      answer:
        "One percent of the loan is 100 basis points. Half a percent is 50 basis points. On a $400,000 loan, 100 basis points equal $4,000 and 50 basis points equal $2,000. The calculator divides basis points by 10,000 and multiplies by the loan amount. Type the points from the comp plan. A point a borrower pays is not automatically your commission.",
    },
    {
      question: "When does the minimum or maximum apply?",
      answer:
        "After the basis-point math and before the company split. If the math is below the minimum, the gross becomes the minimum. If it is above the maximum, the gross becomes the maximum. Your share is a percent of that adjusted gross. Leave a box blank when that limit does not exist. A minimum larger than the maximum is rejected.",
    },
    {
      question: "Is this one loan or a whole month?",
      answer:
        "One loan. Enter that file's amount and the basis points it pays. Add several results if you want a month. A monthly volume bonus or a monthly cap is not applied automatically. If two products pay different points, run each product separately. Combining them into one average loan will not match the commission statement.",
    },
    {
      question: "Does the company split come before the cap?",
      answer:
        "No. The minimum and maximum adjust the gross commission first. The share you keep is applied to that adjusted amount. On an $8,000 capped gross at 50%, you keep $4,000. If your plan splits first and caps your personal pay, the order here will not match. In that case, cap the result yourself after you see your share.",
    },
    {
      question: "What about a referral to another loan officer?",
      answer:
        "Calculate the file, then give the referral its share of your side. This page does not have a referral box. If you keep $2,000 and owe 25% of that to a referral source, the referral is $500 and you keep $1,500. You can also divide your side on the commission split calculator. Do not reduce the loan amount to imitate a referral.",
    },
    {
      question: "Is the result a mortgage quote for the borrower?",
      answer:
        "No. The result is commission from the basis points and split you typed. It is not an interest rate, an APR, or a closing cost. Borrower-paid points and lender credits belong on a loan estimate, not on this commission page. Use the figure to check a comp plan. It is not a quote you can hand to a borrower.",
    },
  ],
  about:
    "Commissionly converts basis points to a percent of the loan, applies an optional minimum and maximum, then the share you keep. Last updated October 22, 2026. The points come from the plan you type.",
  reviewNotes: ["100 basis points on the form is an illustration, not a typical loan-officer payout."],
};

export const saas: CalculatorCopy = {
  id: "saas",
  intro:
    "This SaaS commission calculator turns new annual or monthly revenue and a rate into commission, then shows that same total paid upfront or divided across the term.",
  howTo: {
    heading: "How to calculate SaaS commission",
    paragraphs: [
      "If the amount is annual, commission is that amount times the rate. $120,000 of new annual revenue at 10% is $12,000. If the amount is monthly, the page first multiplies by 12 so the rate applies to a year of that month. $10,000 a month becomes $120,000 before the rate. That annualizing step repeats the month you typed. It is not a forecast that the customer will renew.",
      "A quota splits the annual figure. Revenue up to the quota uses the base rate. Revenue above the quota uses the base rate times the accelerator. An accelerator of 1 leaves the rate unchanged. An accelerator of 1.5 on $20,000 above a $100,000 quota, at 10%, adds $3,000. Leave the quota blank when the plan is a flat percent of new revenue.",
      "The upfront line is the full commission. The monthly line divides that same total by the term in months. Twelve months turns $12,000 into $1,000 a month. The customer is not paying you twice. The two lines are two ways to schedule one commission. Use the schedule your plan actually pays. A multi-year deal paid as the cash is collected is the monthly line. A deal paid when it is booked is the upfront line.",
      "Renewals, expansions, and churn are separate events. This SaaS commission calculator does not reduce the total if the customer cancels in month four. If the plan claws back unearned commission, subtract that after you know the cancellation. For a non-recurring sale with a quota, the [sales commission calculator](/sales-commission-calculator/) is the same shape without the annualizing step. Tiers that are not a single accelerator belong on the [tiered commission calculator](/tiered-commission-calculator/).",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "The form opens on $120,000 of annual revenue, a 10% rate, no quota, an accelerator of 1, and a 12-month term. Commission is $12,000 upfront. Spread over the term, it is $1,000 a month. The total stays $12,000 either way.",
      "Switch the amount to $10,000 monthly and the page annualizes it to $120,000 before the rate, with a note that this is the month repeated, not a renewal. Add a $100,000 quota and a 1.5 accelerator and the commission becomes $10,000 up to quota plus $3,000 above it, or $13,000. That $13,000 is still one total, whether it is paid now or across the term.",
    ],
  },
  industry: {
    heading: "ACV, ARR, and when the commission is paid",
    paragraphs: [
      "ACV is annual contract value. ARR is annual recurring revenue. Plans use those words in different ways, especially when a contract is shorter or longer than a year. Type the revenue figure your plan multiplies by the rate. If the plan pays on first-year ACV only, do not type a three-year total. The term box changes the schedule of the commission. It does not multiply the revenue by the number of years.",
      "Paying upfront and paying monthly are a timing choice. The monthly amount times the term equals the upfront amount, aside from rounding on the last cent in real payroll. If your plan pays 50% at booking and 50% at go-live, take the upfront total and split it to match that rule. The page itself offers the full amount now, or an even split across the months you enter.",
      "A base salary plus this commission is a different page. Calculate the commission here, then add the base from the [salary plus commission calculator](/salary-plus-commission-calculator/) if you need on-target earnings. Do not type the salary into the revenue box. Revenue is what the customer pays. Commission is your percent of that revenue under the plan.",
    ],
  },
  faqs: [
    {
      question: "How do you calculate SaaS commission on ARR?",
      answer:
        "Multiply the annual revenue by the commission rate. $120,000 at 10% is $12,000. Choose Annual when the amount is already a year. Choose Monthly when you typed one month, and the page multiplies by 12 before the rate. That times-12 step repeats the month you entered. It does not promise that the customer stays for the year.",
    },
    {
      question: "Why are upfront and monthly the same total?",
      answer:
        "They are two schedules for one commission. Upfront pays the whole amount when the deal is counted. Monthly divides that amount by the term. $12,000 over 12 months is $1,000 a month. You do not add those lines together. Use the line that matches the plan. A different split, such as half now and half later, can be taken from the upfront total.",
    },
    {
      question: "What does the accelerator do above quota?",
      answer:
        "It multiplies the base rate only on annualized revenue above the quota. At 10% and an accelerator of 1.5, revenue above quota pays 15%. An accelerator of 1 pays the same 10% above quota as below it. Leave the quota blank for a flat rate on all of the revenue. The quota is compared with the annual figure, including a monthly amount after it is multiplied by 12.",
    },
    {
      question: "Does the term multiply a multi-year contract?",
      answer:
        "No. The term only divides the commission into monthly pieces. If a customer signs a three-year deal and your plan pays on one year of value, type that one year as the revenue. Typing three years of cash into the revenue box will triple the commission. Read the plan before you choose the amount. The months box cannot fix an amount that is already the wrong base.",
    },
    {
      question: "What if the customer cancels?",
      answer:
        "The page does not claw anything back. It shows the commission on the revenue you entered, scheduled upfront or across the term. If the plan recovers commission when a contract ends early, subtract the recovery the plan describes. A cancellation in month four does not automatically cut the result to four months. That rule has to come from the comp plan, not from this form.",
    },
    {
      question: "Where do I add my base salary?",
      answer:
        "Not in the revenue box. Revenue is the customer's contract. Your salary is your pay. Calculate commission here, then add base pay on the salary plus commission calculator if you want a paycheck view. On-target earnings are base plus the commission you expect. This SaaS commission calculator stops at the commission on the new revenue you typed.",
    },
  ],
  about:
    "Commissionly applies the rate to annual revenue, or to a monthly amount times 12, then shows that commission upfront and divided by the term. Last updated October 22, 2026. Renewals are not assumed.",
  reviewNotes: ["Monthly times 12 repeats the entered month. Copy must not call that a renewal forecast."],
};

export const phase2Copy: Record<string, CalculatorCopy> = {
  "life-insurance": lifeInsurance,
  travel,
  mlm,
  "loan-officer": loanOfficer,
  saas,
};
