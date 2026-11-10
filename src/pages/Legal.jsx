import PageHero from '../components/common/PageHero'
import { SecondaryButton } from '../components/common/Button'
import { siteInfo } from '../data/siteData'
import { ArrowRight } from 'lucide-react'

const content = {
  privacy: {
    eyebrow: 'Legal',
    title: 'PRIVACY',
    script: 'policy',
    description:
      'A short, honest explanation of what this demo does with your information (spoiler: almost nothing).',
    oversized: 'privacy',
    sections: [
      {
        heading: 'This is a demonstration website',
        body: 'Bite Club is a fictional restaurant built as a portfolio and demonstration project. No real orders, reservations, payments or deliveries take place. Any personal details you enter are sample data.',
      },
      {
        heading: 'What we store',
        body: 'Your cart and demo reservations are saved in your browser using localStorage so the experience survives a page refresh. Your checkout details are held temporarily in sessionStorage and are cleared after the demo payment step. None of this is transmitted to a server.',
      },
      {
        heading: 'What we do not do',
        body: 'We do not collect real payment information, run analytics, use advertising trackers, or share data with third parties. There is no backend, database or external service connected to this project.',
      },
      {
        heading: 'Clearing your data',
        body: 'You can clear all demo data at any time by clearing your browser’s site data for this page. Removing your cart from the cart page also updates the locally stored cart immediately.',
      },
      {
        heading: 'Contact',
        body: `For questions about this demo, contact ${siteInfo.email}. This is a fictional address and does not belong to a real business.`,
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'TERMS &',
    script: 'conditions',
    description:
      'The plain-language rules for using this demonstration restaurant experience.',
    oversized: 'terms',
    sections: [
      {
        heading: 'Demo use only',
        body: 'This website is a fictional restaurant demonstration. Menu items, prices, reviews, ratings, contact details, addresses and reservations are sample content. Nothing on this site constitutes a real offer, booking or purchase.',
      },
      {
        heading: 'Orders and payments',
        body: 'All ordering and payment flows are simulated. No real money is charged, no card details are collected or stored, and no food will be prepared or delivered. Order IDs and confirmation screens exist purely for demonstration.',
      },
      {
        heading: 'Reservations',
        body: 'Reservations are saved only in your own browser and are not sent to a restaurant. They do not guarantee a table anywhere, because Bite Club does not physically exist.',
      },
      {
        heading: 'Content and imagery',
        body: 'Food and interior photography is sourced from royalty-free stock providers and used here as placeholder imagery. Illustrations and doodles are original decorative elements created for this demo.',
      },
      {
        heading: 'Liability',
        body: 'This demo is provided as-is for evaluation and portfolio purposes. No warranty is made about availability, accuracy or fitness for a particular purpose.',
      },
      {
        heading: 'Contact',
        body: `Questions? Reach out at ${siteInfo.email}. Again, this is a fictional contact address.`,
      },
    ],
  },
}

export default function Legal({ type = 'privacy' }) {
  const data = content[type] || content.privacy

  return (
    <>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        script={data.script}
        description={data.description}
        tone="butter"
        oversized={data.oversized}
      />

      <section className="relative overflow-hidden bg-cream py-12 sm:py-16">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-[1.8rem] border-[3px] border-choco bg-white/70 p-6 shadow-[5px_5px_0_0_#553B32] sm:p-9">
            <div className="rounded-xl border-2 border-dashed border-choco/30 bg-butter/50 p-4 text-sm leading-relaxed text-choco/75">
              {siteInfo.demoNote}
            </div>

            <div className="mt-7 space-y-7">
              {data.sections.map((section, i) => (
                <div key={section.heading}>
                  <h2 className="flex items-start gap-3 text-2xl leading-tight">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-choco bg-cream font-display text-xs">
                      {i + 1}
                    </span>
                    {section.heading}
                  </h2>
                  <p className="mt-2 pl-10 text-sm leading-relaxed text-choco/70">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t-2 border-dashed border-choco/20 pt-6">
              <SecondaryButton to="/" icon={ArrowRight}>
                Back to Home
              </SecondaryButton>
              <span className="text-xs text-choco/45">
                Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
