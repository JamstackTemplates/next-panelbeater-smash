import { ClaimStep, ClaimTimeline, ChecklistItem, PolicyQuestion, Responsibility, SceneChecklist } from '../../components/claims';
import { PageHead } from '../../components/page-head';
import { ClipboardArt } from '../../components/workshop-art';
import { Lede, QuoteBand, QuoteLink, SectionHeading, Tape } from '../../components/workshop-ui';
import { business, workshopEmail, workshopPhone } from '../../content/business';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/claims/', 'Insurance claims', 'A step-by-step guide to insurance repairs, from making the car safe to collecting it from Second Wind Smash Repairs.');

export default function ClaimsPage() {
  return <div className="claims-print">
    <div className="wrap print-block hidden font-bold">
      {business.name} · <a href={workshopPhone}>{business.phone}</a> · <a href={workshopEmail}>{business.email}</a>
    </div>
    <PageHead art={<ClipboardArt/>}>
      <PageHead.Label>Insurance claims</PageHead.Label>
      <PageHead.Heading>Your insurance claim, <span className="text-accent-ink">step by step.</span></PageHead.Heading>
      <Lede>General information to help you through a claim. Your policy wording decides what’s covered, so check your Product Disclosure Statement or ask your insurer.</Lede>
    </PageHead>

    <SceneChecklist title="At the scene" action="Print this checklist">
      <ChecklistItem>Check everyone is safe and call <a className="text-link" href="tel:000">000</a> if anyone is hurt.</ChecklistItem>
      <ChecklistItem>Swap names, phone numbers, addresses, registration and insurer details with the other driver.</ChecklistItem>
      <ChecklistItem>Photograph all vehicles, the damage, the road and any signs.</ChecklistItem>
      <ChecklistItem>Write down the time, place and what happened while it’s fresh.</ChecklistItem>
      <ChecklistItem>Note any witnesses’ names and numbers.</ChecklistItem>
      <ChecklistItem>Don’t admit fault. Leave that to the insurers.</ChecklistItem>
    </SceneChecklist>

    <ClaimTimeline title="The five steps" disclaimer="This guide is general information, not insurance, legal or financial advice. A quote or assessment is not claim approval; only your insurer can approve a claim.">
      <ClaimStep number={1} title="Lodge your claim">Contact your insurer and note the claim number.</ClaimStep>
      <ClaimStep number={2} title="Choose your repairer">Many policies let you nominate a repairer, so check your policy. Tell your insurer you’d like Second Wind to quote.</ClaimStep>
      <ClaimStep number={3} title="Free assessment">Bring the car in. We’ll photograph and measure the damage, then send the quote to your insurer’s assessor.</ClaimStep>
      <ClaimStep number={4} title="Approval and repair">Work starts once the insurer authorises it. We’ll keep you updated.</ClaimStep>
      <ClaimStep number={5} title="Pay your excess and collect">If your policy requires it, pay your excess to us at pick-up. We’ll settle the balance with your insurer.</ClaimStep>
    </ClaimTimeline>

    <section className="wrap py-12 sm:py-18">
      <SectionHeading className="mb-5">Who does what</SectionHeading>
      <div className="grid sm:grid-cols-2">
        <Responsibility title="We handle">Photos, the repair quote, conversations with the insurer’s assessor and any extra approval needed for hidden damage.</Responsibility>
        <Responsibility title="You handle">Lodging the claim, checking what your policy covers and paying any excess that applies.</Responsibility>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line bg-primer px-4 py-4">
        <h2><Tape>Not claiming?</Tape></h2>
        <p>We do private repairs and give free quotes. A small repair may cost less than your excess.</p>
      </div>
    </section>

    <section aria-labelledby="claims-questions-heading" className="wrap mb-14 border border-line bg-primer speckled p-6 sm:mb-20 sm:p-9">
      <h2 id="claims-questions-heading" className="mb-5 text-[clamp(2rem,4vw,3.65rem)]">Claims questions</h2>
      <PolicyQuestion question="Do I have to use the insurer’s repairer?">Check your Product Disclosure Statement or ask your insurer about choice of repairer. It depends on your policy.</PolicyQuestion>
      <PolicyQuestion question="What is an excess?">It’s the portion of a claim your policy may require you to pay. Ask your insurer how much applies and when it’s payable.</PolicyQuestion>
      <PolicyQuestion question="What if more damage is found once the panel is off?">We document what we find and send a supplementary quote to the assessor. We’ll let you know if it affects the timing.</PolicyQuestion>
      <PolicyQuestion question="Can I get a courtesy car during an insurance repair?">You can ask for one when you enquire. Availability depends on the dates. Your policy may also include a hire car arranged by your insurer.</PolicyQuestion>
      <PolicyQuestion question="How long will my car be off the road?">It depends on the damage, parts and insurer authorisation. We’ll give you an estimate after the assessment and update you as the repair progresses.</PolicyQuestion>
    </section>

    <QuoteBand>
      <h2 className="text-2xl text-tape-ink sm:text-3xl">Have your claim number handy?</h2>
      <QuoteLink>Ask us to quote for your claim</QuoteLink>
    </QuoteBand>
  </div>;
}
