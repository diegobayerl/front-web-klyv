import { siteDescription, siteUrl } from "../lib/site";

type Plan = { key: string; name: string; price: string; billing: string; audience: string };

export function SalesStructuredData({ faqs, plans }: {
  faqs: ReadonlyArray<ReadonlyArray<string>>;
  plans: ReadonlyArray<Plan>;
}) {
  const organization = { "@id": `${siteUrl}/#organization` };
  const website = { "@id": `${siteUrl}/#website` };
  const software = { "@id": `${siteUrl}/#software` };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", ...organization, name: "Klyv", url: siteUrl, logo: `${siteUrl}/klyv.svg` },
      { "@type": "WebSite", ...website, name: "Klyv", url: siteUrl, publisher: organization, inLanguage: "pt-BR" },
      {
        "@type": "SoftwareApplication", ...software, name: "Klyv", url: siteUrl, publisher: organization,
        applicationCategory: "BusinessApplication", operatingSystem: "Web", inLanguage: "pt-BR", description: siteDescription,
        offers: plans.map(plan => {
          const amount = /^R\$\s*([\d.]+(?:,\d{2})?)$/.exec(plan.price)?.[1]?.replace(/\./g, "").replace(",", ".");
          return {
            "@type": "Offer", name: plan.name, url: `${siteUrl}/#planos`, description: `${plan.billing}. ${plan.audience}`,
            ...(amount && { price: amount, priceCurrency: "BRL" }),
            ...(amount && plan.key !== "free" && {
              priceSpecification: { "@type": "UnitPriceSpecification", price: amount, priceCurrency: "BRL", billingDuration: "P1M" },
            }),
          };
        }),
      },
      {
        "@type": "FAQPage", "@id": `${siteUrl}/#duvidas`, isPartOf: website, about: software, inLanguage: "pt-BR",
        mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
