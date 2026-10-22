import type { CalculatorCopy } from "@/content/types";
import { phase2Copy } from "@/content/phase2";

const home: CalculatorCopy = {
  id: "home",
  intro:
    "This commission calculator turns a sale amount and a rate into commission pay, and it can also find the sale you need or the rate you earned.",
  howTo: {
    heading: "How to calculate commission",
    paragraphs: [
      "Commission pay is the sale amount multiplied by the commission rate. Eight percent is 0.08. On a $75,000 sale, $75,000 times 0.08 is $6,000. The commission tab writes that sentence under the result as you type, including when you enter $75,000 or 8%.",
      "Use the reverse tab when you know the paycheck and the rate. Divide the commission by the rate. $6,000 divided by 0.08 is $75,000, which is the sale that produces that commission at 8%. A rate of 0% cannot be reversed, because there is no sale that creates a commission at a zero rate.",
      "The rate tab is the commission percentage calculator. Divide the commission by the sale and multiply by 100. $6,000 divided by $75,000 is 0.08, or 8%. Use it when a contract lists both dollar amounts and you want the rate.",
      "Tiered pay and salary plus commission are separate plans. A tiered plan changes the rate as sales climb. Salary plus commission adds a base paycheck to the commission. Open those tabs here, or use the [tiered commission calculator](/tiered-commission-calculator/) and the [salary plus commission calculator](/salary-plus-commission-calculator/) when you want the full worksheet.",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "The boxes start at a $75,000 sale and an 8% rate. Commission is $6,000. Reverse that $6,000 at 8% and the sale is $75,000 again. Find the rate from those two dollar amounts and you get 8%. The three tabs are one example seen from three sides.",
      "Change the sale to $120,000 at the same 8% and the commission becomes $9,600. Reset puts $75,000 and 8% back. Copy link keeps the numbers you typed in the address bar, without changing the page's permanent address.",
    ],
  },
  industry: {
    heading: "Typical commission rates",
    paragraphs: [
      "There is no single commission rate. A retail closer, a recruiter, a real estate agent, and a software seller can all be paid a percent of something different. The rate that matters is the one in the comp plan or the contract. This commission pay calculator does not assume a rate for you.",
      "People also search for a commission rate calculator when a plan quotes dollars instead of a percent, and for how to calculate commission when a draw or a quota is involved. Straight commission is the multiplication above. Quota, accelerators, and draws are on the [sales commission calculator](/sales-commission-calculator/). Real estate splits are on the [real estate commission calculator](/real-estate-commission-calculator/).",
    ],
    table: {
      caption: "Examples of how plans are described, not average or required rates.",
      headers: ["Plan", "How the rate is often written", "What to check"],
      rows: [
        ["Straight commission", "A percent of the sale", "Returns, discounts, and split credit"],
        ["Real estate", "A negotiated percent of price", "Who pays the buyer agent, then the broker split"],
        ["Salary plus commission", "Base pay plus a percent", "Pay frequency, draw, and whether tiers are annual"],
        ["Tiered", "Different percents at different sales levels", "Marginal versus retroactive"],
      ],
    },
  },
  faqs: [
    {
      question: "How do you calculate commission?",
      answer:
        "Multiply the sale amount by the commission rate. Convert the percent first: 8% is 0.08, so a $75,000 sale pays $6,000. You can type the dollar sign and the percent sign. The commission calculator strips them and shows the multiplication under the result. Taxes and draws are not part of this first step.",
    },
    {
      question: "What is a commission rate calculator?",
      answer:
        "A commission rate calculator finds the percent when you already know the commission and the sale. Divide the commission by the sale, then multiply by 100. A $6,000 commission on a $75,000 sale is an 8% rate. Use the Find rate tab. Leave the sale above zero or the division does not work.",
    },
    {
      question: "How do I find the sale amount from a commission?",
      answer:
        "Divide the commission you want by the rate. A $6,000 target at 8% needs a $75,000 sale, because 6,000 divided by 0.08 is 75,000. The reverse tab does that and writes the step under the result. Enter a rate above 0%. A zero rate cannot be turned back into a sale amount.",
    },
    {
      question: "What is a commission percentage calculator?",
      answer:
        "It is the same math as the rate tab. You provide the commission dollars and the sale dollars, and the page returns the percentage. $6,000 of commission on a $75,000 sale is 8%. If the commission is larger than the sale, the percentage can be over 100%, which is unusual but the math is still shown.",
    },
    {
      question: "Does this commission pay calculator include taxes?",
      answer:
        "No. The result is the gross commission before income tax and payroll tax. Withholding depends on how the employer runs supplemental wages and on state rules. Treat the number as the commission you earned, not the amount that will land in a checking account after taxes.",
    },
    {
      question: "How is salary plus commission different from straight commission?",
      answer:
        "Straight commission is only the percent of sales. Salary plus commission adds a base paycheck. On-target earnings are the base plus the commission you expect, before a draw changes the cash timing. Use the salary tab when a base is part of the plan, and the commission tab when pay is only a percent of the sale.",
    },
  ],
  about:
    "Commissionly built this commission calculator as a plain arithmetic tool. Each formula is a tested function: sale times rate, commission divided by rate, and commission divided by sale. Last updated October 22, 2026. Results are estimates for planning, not a pay stub.",
  reviewNotes: ["Example rates in the table are illustrations, not survey averages."],
  template: true,
};

const realEstate: CalculatorCopy = {
  id: "real-estate",
  intro:
    "This real estate commission calculator estimates listing and buyer-side fees, your broker split, and an approximate seller net from the rates you enter.",
  howTo: {
    heading: "How to calculate a real estate commission",
    paragraphs: [
      "Start with the sale price. Multiply it by the listing-side rate and, if there is a buyer agent, by the buyer-side rate. On a $450,000 sale, 3% and 3% are $13,500 and $13,500. The total commission is $27,000. Those percents are whatever the agreements say. This realtor commission calculator does not fill in a standard rate.",
      "Your side is the gross you start from. A referral fee comes off that gross first. The broker split applies to what is left. A 70% agent split means you keep 70% and the broker keeps 30%. A franchise percent, if the contract has one, comes off your share after the split. A flat transaction fee comes off last.",
      "Seller net is a different column. It starts at the sale price, subtracts the commission the seller actually pays, then subtracts an estimated closing-cost percent. If the buyer pays the buyer agent, that buyer-side fee is not taken out of the seller's price in this estimate. Closing costs here are only a percent you choose, not a title-company quote.",
      "The order is gross, referral, broker split, franchise fee, transaction fee. Skipping a step is how agents overstate a check. The [broker split calculator](/real-estate-commission-calculator/broker-split/) uses the same order and adds an annual cap or a flat fee.",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "The form opens on a $450,000 sale, 3% listing, 3% buyer, seller pays both, and you are the listing agent on a 70% split. Listing and buyer sides are $13,500 each. After a 30% broker share, $4,050 goes to the broker and $9,450 stays with you. A $295 transaction fee leaves $9,155 before taxes.",
      "Seller net on that example uses a 2% closing-cost guess, which is $9,000. The seller pays $27,000 of commission. $450,000 minus $27,000 minus $9,000 is $414,000. Change who pays the buyer agent and only the listing-side $13,500 comes out of the seller's side of this estimate.",
      "People also ask how much a realtor makes on a $500,000 sale. The answer is the rate in the agreement, not a standard percent. At an illustrative 3% listing side and a 70% split, $500,000 produces $15,000, the broker keeps $4,500, and $10,205 remains after a $295 transaction fee. The same illustration is $6,005 on $300,000 and $20,705 on $1,000,000. The price buttons above the form fill those three prices. Choose Both sides when you have the listing and the buyer, and Referring agent when you only receive a percent of someone else's side.",
    ],
  },
  industry: {
    heading: "How real estate commission works now",
    paragraphs: [
      "Buyer agent compensation is negotiated. Since the 2024 NAR settlement, it is not offered through the MLS the way it used to be. The seller, the buyer, or neither side may pay a buyer agent, depending on the agreements. That is why this buyer agent commission calculator asks who pays, instead of assuming the seller covers both sides.",
      "A real estate agent commission calculator also has to respect the brokerage contract. Splits of 50/50 and 70/30 both show up in real agreements, and some desks add a franchise percent or a flat transaction fee. None of those is a national rule. Read the independent-contractor agreement before you treat a result as your check.",
      "People phrase the same search as realtor calculator commission or commission calculator real estate. The math they want is still price times the agreed rates, then the split. For a lease or a building sale, use the [commercial real estate commission calculator](/commercial-real-estate-commission-calculator/). To divide one fee among several people by hand, use the [commission split calculator](/commission-split-calculator/).",
    ],
    table: {
      caption: "Illustrative listing-side math on a $450,000 sale at 3%. Not a required rate.",
      headers: ["Agent split", "Broker keeps", "Agent keeps before a flat fee"],
      rows: [
        ["50%", "$6,750", "$6,750"],
        ["60%", "$5,400", "$8,100"],
        ["70%", "$4,050", "$9,450"],
        ["80%", "$2,700", "$10,800"],
      ],
    },
  },
  faqs: [
    {
      question: "How does a real estate commission calculator work?",
      answer:
        "It multiplies the sale price by each side's rate, then applies your deductions in order: referral, broker split, franchise fee, and a flat transaction fee. A $450,000 sale at 3% produces $13,500 on that side. At a 70% split and a $295 fee, the listing agent in the example nets $9,155 before taxes. Your contract can use different numbers.",
    },
    {
      question: "What is a typical realtor commission?",
      answer:
        "There is no typical rate you can drop into a contract. Many agreements are still written as a percent of the price, and the percent is negotiated. Buyer-agent pay is negotiated separately and is not a set MLS offer. Enter the percents from the listing agreement and the buyer-broker agreement. Do not treat an old 6% example as a rule.",
    },
    {
      question: "Who pays the buyer agent commission?",
      answer:
        "Whoever the parties agree will pay it. The seller can pay it from the sale, the buyer can pay it, or there can be no buyer agent. This calculator asks that question because the answer changes seller net. If the buyer pays, the estimate removes only the listing-side fee from the seller's proceeds.",
    },
    {
      question: "How do I calculate a real estate agent commission with a broker split?",
      answer:
        "Take your side's commission, remove any referral, then multiply the rest by your split. On $13,500 with no referral and a 70% split, you keep $9,450 and the broker keeps $4,050. Subtract a franchise percent of your share and any flat transaction fee after that. The broker split page adds caps and flat-fee desks.",
    },
    {
      question: "How do I estimate seller net proceeds?",
      answer:
        "Subtract the commission the seller pays and an estimate of other closing costs from the sale price. In the prefilled example the seller pays $27,000 and 2% closing costs are $9,000, so $450,000 becomes $414,000. Replace the 2% with a figure from the closing disclosure draft. This is not a settlement statement.",
    },
    {
      question: "Is the commission calculator for real estate using a standard percentage?",
      answer:
        "No. Every rate starts as an example you can overwrite, and the page never treats a percent as required. The 3% and 3% in the form are only there so the first result is filled in. If your agreement says something else, type that. A result is only as good as the rates you enter.",
    },
  ],
  about:
    "Commissionly built this real estate commission calculator so an agent can see gross, split, and a rough seller net in one place. The math is price times the rates you type, then the deductions in the order above. It is not a closing statement and it is not brokerage, tax, or legal advice. Last updated October 22, 2026.",
  reviewNotes: [
    "Confirm the NAR settlement description and the August 2024 MLS practice-change timing against current NAR materials before relying on that sentence.",
    "The split table is arithmetic on a 3% example, not a survey of brokerage contracts.",
  ],
  template: true,
  affiliate: true,
};

const broker: CalculatorCopy = {
  id: "broker-split",
  intro:
    "This real estate commission calculator with broker split shows a percentage split, a cap, or a flat desk fee, and how much of this deal hits the cap.",
  howTo: {
    heading: "How to calculate a real estate commission with a broker split",
    paragraphs: [
      "The side commission is still price times your rate. On the prefilled $450,000 listing at 3%, that is $13,500. A referral comes off first. What remains is the amount the split, the cap, or the flat fee is applied to. An agent commission split of 70% means the broker's share is 30% until a cap says otherwise.",
      "A percentage split is the simple case. Thirty percent of $13,500 is $4,050 to the broker and $9,450 to you, before franchise and transaction fees. A $295 transaction fee then leaves $9,155. Use this model when the agreement is a plain split with no cap.",
      "A cap changes only the broker's share. You still compute the 30%, but the broker collects it only until your year-to-date payments reach the cap. The prefilled cap is $20,000 with $18,000 already paid, so $2,000 of room is left. This deal would owe $4,050, but only $2,000 is collected. That $2,000 is what counts toward the cap, and the cap is then full.",
      "A flat fee ignores the percent. The broker takes the dollar amount you enter, but not more than the commission left after referral. Franchise and the transaction fee still come off your remainder. Caps and flat fees are contract terms. This broker split calculator does not know your company's anniversary year or which fees count toward the cap.",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "Percentage model: $13,500 listing side, no referral, 70% to you. Broker fee $4,050. Agent share $9,450. Transaction fee $295. Agent net $9,155 before taxes. Seller net in the same file, with both sides paid by the seller and 2% other costs, is $414,000.",
      "Cap model with the prefilled $20,000 cap and $18,000 already paid: room is $2,000, so the broker fee on this deal is $2,000, not $4,050. You keep $11,500 before the $295 fee, which is $11,205. The line under the result states that $2,000 of this deal counts toward the cap.",
    ],
  },
  industry: {
    heading: "How broker splits are usually written",
    paragraphs: [
      "Brokerage agreements use a few repeating shapes. One is a fixed percent on every deal. Another is a percent until a dollar cap, then 100% to the agent for the rest of the cap period, sometimes still minus a transaction fee. A third is a monthly desk fee or a flat amount per closing instead of a percent. Some add a franchise percent on the agent's share.",
      "The cap input is the amount you pay the broker, not your production total, unless your agreement defines the cap that way. If your cap counts something else, do not force this page to match it. Type the remaining room as if it were the whole cap and set year-to-date to zero. The [real estate commission calculator](/real-estate-commission-calculator/) is the same engine without the cap fields.",
    ],
    table: {
      caption: "Same $13,500 side commission, three contract shapes. Illustration only.",
      headers: ["Model", "Broker receives on this deal", "You keep before franchise and the $295 fee"],
      rows: [
        ["70% to you, no cap", "$4,050", "$9,450"],
        ["70% with $2,000 cap room", "$2,000", "$11,500"],
        ["$500 flat fee", "$500", "$13,000"],
      ],
    },
  },
  faqs: [
    {
      question: "What is an agent commission split?",
      answer:
        "It is the percent of your side, after any referral, that you keep. A 70/30 agent commission split means you keep 70% and the broker keeps 30%. On $13,500 with no referral, that is $9,450 and $4,050. The split applies to the commission, not to the sale price. A 70% split is not 70% of $450,000.",
    },
    {
      question: "How does a broker split calculator handle a cap?",
      answer:
        "It computes the broker's percent, then limits that fee to the cap room you have left. If the room is $2,000 and the percent would be $4,050, the broker fee is $2,000 and the rest stays with you. The amount that counts toward the cap is the fee actually paid, $2,000. After that, the room on this deal is zero.",
    },
    {
      question: "What happens after I reach the cap?",
      answer:
        "On this page, a full cap means the broker's percentage fee on the next deal is zero. You still subtract a referral, a franchise percent, and a flat transaction fee if those boxes are filled in. Some agreements reset the cap on a calendar year or an anniversary. Enter the year-to-date number that matches the contract.",
    },
    {
      question: "How is a flat per-deal fee different from a split?",
      answer:
        "A flat fee is a dollar amount, not a percent of the commission. A $500 desk fee on a $13,500 side leaves $13,000 before other deductions. If the fee is larger than the commission left after referral, the page will not take more than that remainder. It does not decide whether your company also charges a monthly fee.",
    },
    {
      question: "Does the cap include my franchise fee and transaction fee?",
      answer:
        "Not in this calculator. The cap limits the broker's percentage share only. Franchise and the transaction fee are subtracted after that, from your side. If your agreement rolls those into the cap, the result will not match the company statement. Use the year-to-date box for payments that actually count, and read the agreement.",
    },
    {
      question: "Can I use this for a buyer-side deal?",
      answer:
        "Yes. Choose buyer agent as your side and enter that side's rate. The split, cap, and flat fee run on the buyer-side gross after referral. Seller net still depends on who pays the buyer agent. A buyer-paid fee is not removed from the seller's sale price in the seller-net line.",
    },
  ],
  about:
    "Commissionly uses the same tested real estate function here as on the main real estate page, with the split model set to percent, cap, or flat fee. Cap room is the annual cap minus year-to-date broker fees you enter. Last updated October 22, 2026. This is not a brokerage statement.",
  reviewNotes: [
    "Cap definitions vary by brokerage. Confirm whether franchise fees and transaction fees count toward the cap in the user's agreement.",
  ],
};

const commercial: CalculatorCopy = {
  id: "commercial",
  intro:
    "This commercial real estate commission calculator estimates a sale commission or a lease commission from the price, rent, term, and rates you enter.",
  howTo: {
    heading: "How to calculate commercial real estate commission",
    paragraphs: [
      "Sale mode is price times the commission rate. A $2,000,000 sale at 5% is $100,000. You can give the listing side a share of that fee. At 60% to listing, listing is $60,000 and the cooperating broker is $40,000. The share is a percent of the commission, not a second percent of the price.",
      "Lease mode starts with total rent: monthly rent times the number of months. $8,000 a month for 36 months is $288,000 of rent. A 6% commission on that total is $17,280. Some agreements instead quote a percent of one year's rent or a schedule. If yours does, convert it into the percent of total rent that matches the contract before you type it.",
      "The split-rate option uses one percent for the first 60 months and another after that. On $10,000 a month for 84 months, years 1 through 5 are 60 months at 6%, which is $36,000. The remaining 24 months at 3% are $7,200. The commercial lease commission is $43,200. A term of 48 months never reaches the second rate.",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "Sale example: $2,000,000 times 5% is $100,000. A 60% listing share is $60,000. The cooperating side is the other $40,000. If the agreement is a 50/50 co-broke, set the listing share to 50 and each side is $50,000.",
      "Lease example with two rates: $10,000 monthly rent, 84 months, 6% for the first five years and 3% after. First slice $36,000, second slice $7,200, total $43,200. Switch off the split rates and enter one percent if the contract uses a single rate on all rent.",
    ],
  },
  industry: {
    heading: "How commercial lease commission is often structured",
    paragraphs: [
      "Commercial fees are negotiated deal by deal. A sale might be a percent of price. A lease might be a percent of the total rent over the term, sometimes with a lower percent on option years or on years after the fifth. Tenant representation and landlord representation can split that fee, or one side can be paid a separate amount. This page does not assume a co-broke.",
      "Free rent, tenant improvement allowances, and expense stops change the rent that a commission clause uses. If the clause says commission is on net effective rent, do that adjustment before you enter the monthly number. The [real estate commission calculator](/real-estate-commission-calculator/) is built for a home sale with a broker split, not for a lease schedule.",
    ],
    table: {
      caption: "Two ways to describe a lease fee. Examples, not market rates.",
      headers: ["Contract style", "What you enter", "Result on $10,000 a month"],
      rows: [
        ["5% of total rent, 5 years", "60 months at 5%", "$30,000"],
        ["6% then 3% on a 7-year term", "60 months at 6%, 24 at 3%", "$43,200"],
        ["One month of rent", "100% of one month, or use the rental page later", "$10,000"],
      ],
    },
  },
  faqs: [
    {
      question: "How do you calculate a commercial real estate commission on a sale?",
      answer:
        "Multiply the price by the rate in the agreement. A $2,000,000 sale at 5% is $100,000. If listing and cooperating brokers share that fee, apply their split to the $100,000, not to the price again. A 60% listing share is $60,000. The other $40,000 is the cooperating side.",
    },
    {
      question: "How is a commercial lease commission calculated?",
      answer:
        "A common version is a percent of total base rent over the term. Monthly rent times months is the lease value, and the rate applies to that value. $8,000 times 36 months is $288,000, and 6% of that is $17,280. If the clause uses a different rent definition, adjust the monthly amount before you calculate.",
    },
    {
      question: "Why would years 1 through 5 use a different rate?",
      answer:
        "Some lease listings pay a higher percent on the first five years and a lower percent on the rest of the term or on option years. This page applies the first rate to 60 months and the second rate to every month after that. A lease shorter than 60 months uses only the first rate. Options that are not yet exercised should not be included unless the clause says to.",
    },
    {
      question: "Does this include a broker split for the agent?",
      answer:
        "No. The result is the fee at the deal level, plus an optional listing and cooperating split of that fee on a sale. Your personal split with your brokerage is a second step. Run that amount through the broker split calculator if you need agent net after a house split, a cap, or a transaction fee.",
    },
    {
      question: "Should free rent be included in the lease value?",
      answer:
        "Only if the commission clause counts it. Many clauses pay on rent actually scheduled, and a free-rent period adds months with zero rent or reduces the effective rent. This calculator multiplies the monthly rent you type by the term you type. Put the rent figure the contract uses in the monthly box.",
    },
    {
      question: "Is there a standard commercial commission rate?",
      answer:
        "No. Sale percents and lease schedules are negotiated, and they move with property type, term, and local custom. The 5% and 6% figures in the examples are there so the page is filled in. Replace them with the listing or the tenant-rep agreement. Do not quote the example as a market rate.",
    },
  ],
  about:
    "Commissionly calculates commercial sale commission as price times rate, and lease commission as rent times months times rate, with an optional second rate after month 60. Last updated October 22, 2026. Confirm the rent definition in the commission clause. This is not a brokerage opinion.",
  reviewNotes: [
    "Lease commission customs differ by market. The year-6 breakpoint is a calculator option, not a claim that every lease uses it.",
  ],
};

const sales: CalculatorCopy = {
  id: "sales",
  intro:
    "This sales commission calculator applies a rate to sales, then an optional quota, accelerator, and draw, and shows how much of quota you reached.",
  howTo: {
    heading: "How to calculate sales commission",
    paragraphs: [
      "With no quota, commission is sales times the rate. $80,000 at 8% is $6,400. That is the whole calculation. Enter the sales that count under the plan. If returns or unpaid invoices are excluded, take them out of the sales box first.",
      "With a quota, the rate applies to sales up to the quota, and the accelerator applies only above it. Accelerator here is a multiplier. At 1.5, the rate above quota is 8% times 1.5, which is 12%. On $80,000 of sales with a $50,000 quota, the first $50,000 pays $4,000 and the next $30,000 pays $3,600. Commission earned is $7,600.",
      "Quota attained is sales divided by quota. $80,000 divided by $50,000 is 160%. Earnings above quota are the $3,600, not the $30,000 of sales. A draw is treated as an advance already paid: additional pay is commission minus the draw, and any shortfall is unrecovered draw. It does not change the commission earned line.",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "Prefilled numbers: $80,000 sales, 8% rate, $50,000 quota, 1.5 accelerator, no draw. Up to quota: $4,000. Above quota: $3,600. Total commission $7,600. Quota attained 160%. Clear the quota box and the same sales pay a flat $6,400, because the accelerator never turns on.",
      "Add a $1,000 draw to the flat $6,400 case and additional pay after the draw is $5,400. If commission were $500 against a $1,000 draw, additional pay would be $0 and unrecovered draw would be $500. The plan, not this page, decides whether that $500 is forgiven.",
    ],
  },
  industry: {
    heading: "Quota, accelerator, and rate",
    paragraphs: [
      "A commission rate is the percent in the plan. A quota is the sales level the plan uses as the line between the base rate and a higher one. An accelerator is the multiplier on that higher slice in this calculator. Some companies instead write the above-quota rate as its own percent. If the plan says 12% above quota, and the base is 8%, the multiplier is 1.5, because 12 divided by 8 is 1.5.",
      "Draws are advances. A recoverable draw is paid back from later commission. This page shows one period, so it can show the shortfall, not a running balance across months. For base pay plus commission, use the [salary plus commission calculator](/salary-plus-commission-calculator/). For tiers that are not a single quota line, use the [tiered commission calculator](/tiered-commission-calculator/).",
    ],
    table: {
      caption: "The prefilled $80,000 sale at 8%, with a $50,000 quota.",
      headers: ["Accelerator", "Rate above quota", "Commission earned"],
      rows: [
        ["1.0", "8%", "$6,400"],
        ["1.5", "12%", "$7,600"],
        ["2.0", "16%", "$8,800"],
      ],
    },
  },
  faqs: [
    {
      question: "How does a sales commission calculator use a quota?",
      answer:
        "Sales up to the quota earn the base rate. Sales above the quota earn the base rate times the accelerator. On $80,000 with a $50,000 quota, an 8% rate, and a 1.5 accelerator, commission is $4,000 plus $3,600, or $7,600. Leave the quota blank if the plan is a single rate on all sales.",
    },
    {
      question: "What is an accelerator?",
      answer:
        "Here it is a multiplier on the rate for sales above quota. An accelerator of 1.5 turns an 8% rate into 12% on that slice only. It does not multiply the whole commission. An accelerator of 1 leaves the rate unchanged. If your plan quotes a second percent instead of a multiplier, divide that percent by the base rate.",
    },
    {
      question: "How do I read percent of quota attained?",
      answer:
        "Divide sales by the quota and multiply by 100. $80,000 of sales on a $50,000 quota is 160% of quota. $40,000 on the same quota is 80%, and none of the sale is paid at the accelerator. The percent can be over 100. It is not a second commission.",
    },
    {
      question: "What are earnings above quota?",
      answer:
        "They are the commission dollars earned on the sales that passed the quota, not the sales dollars themselves. In the example, $30,000 of sales above quota at 12% produces $3,600 of earnings above quota. The other $4,000 was earned on the quota itself at the base rate.",
    },
    {
      question: "How does a draw affect the result?",
      answer:
        "The draw is treated as money already advanced against this commission. Additional pay is commission minus the draw, and it cannot go below zero. If the draw is larger, the difference is unrecovered. A $1,000 draw against $6,400 of commission leaves $5,400 still to pay. The page does not know if your company forgives the shortfall.",
    },
    {
      question: "Does the commission rate include tax?",
      answer:
        "No. The rate is applied to sales to get gross commission. Income tax and payroll withholding are not subtracted. Quota attained is also a sales ratio, not an after-tax figure. Use the result to check a plan, then let payroll calculate the check.",
    },
  ],
  about:
    "Commissionly calculates sales commission as a single rate, or as a base rate up to quota plus rate times accelerator above quota. Last updated October 22, 2026. Match the quota definition in your plan before you compare this to a statement.",
  reviewNotes: ["Accelerator is implemented as a multiplier of the base rate, which is one common plan design, not the only one."],
  template: true,
  affiliate: true,
};

const tiered: CalculatorCopy = {
  id: "tiered",
  intro:
    "This tiered commission calculator compares a marginal, graduated plan with a retroactive plan on the same sales and the tiers you edit.",
  howTo: {
    heading: "How to calculate tiered commission",
    paragraphs: [
      "A tier is a slice of sales with its own rate. The starter table is 5% from $0 through $50,000, 8% above $50,000 through $100,000, and 10% above $100,000. An amount that lands on a boundary stays in the lower tier. $50,000 is still the 5% tier. $50,000.01 is the 8% tier.",
      "Marginal, sometimes called graduated commission, pays each rate only on the dollars inside that tier. On $120,000: $50,000 times 5% is $2,500, the next $50,000 times 8% is $4,000, and the last $20,000 times 10% is $2,000. Total $8,500. Dollars in a gap between tiers, if you leave one, pay nothing.",
      "Retroactive, or flat by the tier reached, pays the rate of the highest tier the total falls in, on every dollar. $120,000 reaches the 10% tier, so the commission is $120,000 times 10%, or $12,000. Same tiers, different rule, $3,500 more. The plan has to say which rule it uses. The names get mixed up in conversation.",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "Leave the default tiers and enter $120,000. Marginal pays $8,500. Switch to retroactive and the same sales pay $12,000. The page also prints the other method under the result so you can see the gap without retyping the sale.",
      "At exactly $100,000, retroactive is still 8%, because the 10% tier starts above $100,000. Commission is $8,000. One dollar more is $100,000.01 times 10% under the retroactive rule. That cliff is why the rule has to be written down before someone is paid.",
    ],
  },
  industry: {
    heading: "Marginal tiers versus retroactive tiers",
    paragraphs: [
      "Graduated commission usually means marginal: you never give back the lower rate on the earlier dollars. Retroactive plans do the opposite once a tier is reached, and they can jump at the boundary. A seller at $99,000 and a seller at $101,000 can be far apart on a retroactive plan and only a little apart on a marginal one. Read the word in the plan, not the word people use in a meeting.",
      "You can add and delete rows. The last row can have a blank end, which means no ceiling. Tiers cannot overlap. If the plan uses monthly tiers, enter the month's sales. If it uses annual tiers, enter the year. This page does not accumulate months for you. A single quota line is often easier on the [sales commission calculator](/sales-commission-calculator/).",
    ],
    table: {
      caption: "Default tiers on $120,000 of sales.",
      headers: ["Method", "What the rate covers", "Commission"],
      rows: [
        ["Marginal", "5% on the first $50,000, 8% on the next $50,000, 10% on $20,000", "$8,500"],
        ["Retroactive", "10% on the entire $120,000", "$12,000"],
      ],
    },
  },
  faqs: [
    {
      question: "What is a graduated commission?",
      answer:
        "Graduated commission is the marginal method. Each rate applies only to the sales inside its tier. On the default table, $120,000 pays $2,500 at 5%, $4,000 at 8%, and $2,000 at 10%, for $8,500. Earlier dollars do not get repriced when you reach a higher tier. If your plan reprices everything, it is retroactive, not graduated.",
    },
    {
      question: "What is the difference between marginal and retroactive tiers?",
      answer:
        "Marginal pays a different rate on each slice. Retroactive pays one rate, the rate of the tier you reached, on the whole amount. At $120,000 on the default tiers, marginal is $8,500 and retroactive is $12,000. The sales number did not change. Only the rule changed. Your plan should name the rule.",
    },
    {
      question: "Which tier includes the exact boundary?",
      answer:
        "The lower tier includes its end amount. $50,000 is paid at 5%, not 8%. $100,000 is still in the 8% tier for a retroactive lookup. The next tier starts on the next dollar. If your plan says the opposite, move the boundary by one dollar in the table so the page matches the document.",
    },
    {
      question: "Can I change the commission tiers?",
      answer:
        "Yes. Edit the start, end, and rate on each row, add a row, or remove one. Leave the end blank on the top tier if there is no ceiling. Rows cannot overlap, and a middle row cannot be open-ended. Reset restores 5%, 8%, and 10% at $50,000 and $100,000.",
    },
    {
      question: "What if my tiers are monthly?",
      answer:
        "Enter that month's sales, not the year, and use the monthly tier amounts in the table. This calculator does not store last month. An annual plan should get the year-to-date or full-year sales the plan uses, and the annual tier table. Mixing a monthly sale with annual tiers will not match payroll.",
    },
    {
      question: "Why is retroactive so much higher at the top tier?",
      answer:
        "Because the higher rate replaces the lower ones on every dollar already sold. Crossing $100,000 on the default table moves the entire balance from 8% to 10% under the retroactive rule. Marginal only puts 10% on the dollars above $100,000. That is the whole difference, and it is why the cliff matters.",
    },
  ],
  about:
    "Commissionly calculates marginal tiers on the overlap of the sale with each band, and retroactive tiers as the full sale times the rate of the band that contains it. Boundaries belong to the lower tier. Last updated October 22, 2026.",
  reviewNotes: ["Boundary convention is lower-tier inclusive. Plans that give the boundary to the higher tier need the end amount moved."],
};

const salary: CalculatorCopy = {
  id: "salary",
  intro:
    "This salary plus commission calculator adds base pay and commission for a paycheck, then shows annual on-target earnings and any draw balance.",
  howTo: {
    heading: "How to calculate salary plus commission",
    paragraphs: [
      "Split the annual base by the number of paychecks. Weekly uses 52, biweekly 26, semi-monthly 24, and monthly 12. A $48,000 base paid monthly is $4,000 a paycheck. Those counts are the usual ones. A company that pays 27 biweekly checks in some years will not match 26 exactly.",
      "Commission depends on whether the sales box is one period or the whole year. Per paycheck, $20,000 at 8% is $1,600, and the year is $1,600 times 12, or $19,200. Per year, you enter the annual sales and the page divides the commission by the number of paychecks. On-target earnings are base plus that annual commission: $48,000 plus $19,200 is $67,200. OTE does not add a draw on top.",
      "A draw is a floor or an advance on the commission, not on the base. If the draw is $2,000 and commission is $1,600, commission cash this paycheck is $2,000. Recoverable means the $400 gap is a balance still owed. Non-recoverable pays the $2,000 and does not keep a balance. Gross pay here is base plus that commission cash.",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "Prefilled: $48,000 base, monthly, $20,000 sales each paycheck, 8%, no draw. Base $4,000. Commission $1,600. Gross $5,600. Annual commission $19,200. OTE $67,200. The same OTE appears if you switch sales to per year and enter $240,000, because 12 times $20,000 is $240,000.",
      "Set a recoverable draw of $2,000. Commission earned stays $1,600, commission cash becomes $2,000, the balance is $400, and gross is $6,000. Switch the draw to non-recoverable and the cash is still $2,000, but the balance is $0. OTE stays $67,200 either way, because OTE is expected earnings before the draw changes timing.",
    ],
  },
  industry: {
    heading: "Base plus commission and OTE",
    paragraphs: [
      "Base plus commission means the salary is paid whether or not you sell, and the commission is extra. OTE, on-target earnings, is what the year pays if sales land where the plan expects. It is a planning number. A draw can make one paycheck higher than commission alone and, if it is recoverable, can leave an amount to clear later. This page shows one representative paycheck, not a year of uneven months.",
      "Tiered commission on this page is marginal and applies to the sales figure you typed. If those tiers are annual, choose per year and enter annual sales. A single accelerator above one quota belongs on the [sales commission calculator](/sales-commission-calculator/). The tier table itself is explained on the [tiered commission calculator](/tiered-commission-calculator/).",
    ],
    table: {
      caption: "Pay periods used to split an annual base. Not a specific employer's calendar.",
      headers: ["Frequency", "Paychecks", "$48,000 base each check"],
      rows: [
        ["Weekly", "52", "$923.08"],
        ["Biweekly", "26", "$1,846.15"],
        ["Semi-monthly", "24", "$2,000.00"],
        ["Monthly", "12", "$4,000.00"],
      ],
    },
  },
  faqs: [
    {
      question: "How do I calculate salary plus commission?",
      answer:
        "Divide annual base by the number of paychecks, calculate commission on the sales you entered, and add them. A $48,000 monthly base is $4,000. Sales of $20,000 at 8% add $1,600. Gross is $5,600 before taxes and before any draw. Annual on-target earnings are $48,000 plus $19,200 of commission, or $67,200.",
    },
    {
      question: "What is an OTE calculator showing?",
      answer:
        "OTE is base plus the commission those sales would produce over a year. It is not a promise and it is not after tax. A draw does not increase OTE on this page. If every paycheck matched the one on screen, gross cash could differ from OTE when a draw tops up a short commission. Read the labels separately.",
    },
    {
      question: "What is the difference between a recoverable and a non-recoverable draw?",
      answer:
        "Both can raise commission cash up to the draw when commission is short. Recoverable keeps the shortfall as a balance, $400 in the example of a $2,000 draw against $1,600 of commission. Non-recoverable pays the draw and clears the balance. The page does not carry the balance into a second month. Your plan decides how repayment actually works.",
    },
    {
      question: "Should sales be per paycheck or per year?",
      answer:
        "Match the box to the tiers or the rate. A rate on each month's sales belongs on per paycheck. An annual quota or annual tiers belong on per year, with the year's sales in the box. Per year divides the annual commission across the paychecks. It does not assume every month was equal in real life. It only spreads the number you entered.",
    },
    {
      question: "Why is biweekly 26 and semi-monthly 24?",
      answer:
        "Biweekly is every two weeks, which is 26 pays in a normal year. Semi-monthly is twice a month, which is 24. Some years have 27 biweekly pay dates. This salary plus commission calculator uses 26 so the base splits evenly. If your calendar has 27, the paycheck math will be slightly off and you should divide the base yourself.",
    },
    {
      question: "Does this include overtime or bonus?",
      answer:
        "No. The paycheck is base split plus commission, adjusted for a draw if you enter one. Overtime, SPIFs, and bonuses are not in the form. Taxes are not withheld. Add those from payroll if you are trying to match a deposit. Use this page to check the plan math, not to reconstruct a pay stub.",
    },
  ],
  about:
    "Commissionly divides base by 52, 26, 24, or 12 paychecks and adds commission from a flat rate or marginal tiers. OTE is annual base plus annual commission. Last updated October 22, 2026. Pay calendars and draw rules in a contract control if they differ.",
  reviewNotes: [
    "Pay-period counts are the conventional 52, 26, 24, and 12. They are not a claim about any employer's payroll calendar.",
  ],
};

const split: CalculatorCopy = {
  id: "split",
  intro:
    "This commission split calculator divides one commission among up to six people by percentage or by fixed dollar amounts that have to add up.",
  howTo: {
    heading: "How to calculate a commission split",
    paragraphs: [
      "Start with the total commission, not the sale price. A $10,000 fee split 50%, 30%, and 20% pays $5,000, $3,000, and $2,000. Each share is the total times that person's percent. The percents have to add to 100. If they add to 90, the page stops and tells you the total it sees, instead of paying out a silent shortfall.",
      "Fixed amounts work the other way. You type the dollars each person gets, and those dollars have to add up to the total commission. $4,000 and $6,000 match a $10,000 fee. $4,000 and $5,000 do not, and the message shows both totals. Use fixed amounts when the agreement says a dollar referral fee rather than a percent.",
      "Names are labels. Blank names show up as Unnamed so a row is not invisible. You can add people up to six and remove people down to two. A two-person 50/50 split is allowed. This is the right tool when you are splitting one check. A brokerage split with a cap is a different contract. Use the [broker split calculator](/real-estate-commission-calculator/broker-split/) for that.",
    ],
  },
  example: {
    heading: "Worked example",
    paragraphs: [
      "The form opens at $10,000 split 50/30/20 among Alex, Jordan, and Sam. Alex gets $5,000, Jordan $3,000, and Sam $2,000. The last line shows the shares add back to $10,000. Change Sam to 10% and the error says the percentages total 90%, not 100%.",
      "Switch to fixed amounts and enter $4,000, $3,500, and $2,500. Those add to $10,000, so the split is accepted. Change the total commission to $9,000 without changing the dollars and the page rejects it, because the fixed amounts no longer match the fee you are dividing.",
    ],
  },
  industry: {
    heading: "Splitting a commission between agents",
    paragraphs: [
      "Teams split fees for a lot of ordinary reasons: a referral, a co-list, a buyer agent and a listing agent who agreed to share one side, or a mentor override. The clean way is to agree the percent of a defined fee, then check that the percents hit 100 before anyone invoices. Splitting the sale price by accident, instead of the commission, overpays everyone.",
      "A referral fee is often a percent of your side, taken before your broker split. This page will split whatever total you give it. If the referral comes out first, subtract it, or include the referring agent as a row and remember the broker split is a later step on your remaining share. The [real estate commission calculator](/real-estate-commission-calculator/) runs that later step.",
    ],
    table: {
      caption: "A $10,000 fee in the default percent split.",
      headers: ["Person", "Percent", "Amount"],
      rows: [
        ["Alex", "50%", "$5,000"],
        ["Jordan", "30%", "$3,000"],
        ["Sam", "20%", "$2,000"],
      ],
    },
  },
  faqs: [
    {
      question: "How do I split a commission between agents?",
      answer:
        "Agree the percent each agent gets of a named fee, and make the percents add to 100. On a $10,000 fee, 50%, 30%, and 20% pay $5,000, $3,000, and $2,000. Enter the fee, not the sale price. If the agreement uses dollar amounts, switch to fixed amounts and make those dollars add up to the same fee.",
    },
    {
      question: "What if the percentages do not total 100?",
      answer:
        "The calculator will not invent the missing percent. It shows the total you entered, such as 90%, and waits. Fix a row or add the remainder to someone. A tolerance of one hundredth of a percent is allowed so 33.33 three times can be entered, but a gap of a full percent is rejected on purpose.",
    },
    {
      question: "When should I use fixed amounts instead of percents?",
      answer:
        "Use fixed amounts when the agreement states dollars, such as a $2,500 referral, and percents when it states a share of the fee. Fixed amounts must add up to the total commission box. If they do not, the message shows both sums. Do not mix a percent in one row and a dollar in another. Pick one mode.",
    },
    {
      question: "Can I split a fee among more than three people?",
      answer:
        "Yes, up to six. Add a row for each person. The same 100% rule, or the same dollar total, still applies. Six people at equal percents would be about 16.67% each, and you may need to adjust the last row so the total is 100. Remove a row if someone drops out, down to a minimum of two.",
    },
    {
      question: "Does this replace a broker split?",
      answer:
        "No. A broker split is your contract with the brokerage, often a percent, a cap, or a flat fee, sometimes after a referral. This page only divides one amount among people. Run the brokerage math on the real estate or broker split calculator, then put the agent's remaining dollars here if several people share that remainder.",
    },
    {
      question: "Are the split amounts before tax?",
      answer:
        "Yes. Each line is a share of the gross commission you entered. The page does not withhold income tax or payroll tax, and it does not know who receives a 1099. It checks that the shares add up. What each person nets after tax is a separate payroll question.",
    },
  ],
  about:
    "Commissionly divides a commission by percents that total 100, or by fixed dollars that total the fee, for two to six people. Last updated October 22, 2026. The page checks the addition. It does not interpret a brokerage agreement.",
  reviewNotes: ["Percent totals allow a 0.01 rounding tolerance so repeating thirds can be entered."],
};

export const calculatorCopy: Record<string, CalculatorCopy> = {
  home,
  "real-estate": realEstate,
  "broker-split": broker,
  commercial,
  sales,
  tiered,
  salary,
  split,
  ...phase2Copy,
};

export function getCopy(id: string): CalculatorCopy {
  const copy = calculatorCopy[id];
  if (!copy) throw new Error(`Missing copy for ${id}`);
  return copy;
}
