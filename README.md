# Second Wind Smash Repairs

A static Next.js website for a fictitious panelbeater and spray painter in Woolloongabba, Brisbane. The Jamstacks gallery template ID is `next-panelbeater-smash`.

## Develop and preview

Use Node.js 24 or later.

```sh
npm ci
npm run dev
npm run check
npm start
```

`npm run check` runs the tests, typecheck and production export. `npm start` serves the static files from `out/`.

| Route | Content |
| --- | --- |
| `/` | Paint booth, featured repair, price sheet, claim steps, fleet and workshop details |
| `/repairs/` | Filterable before-and-after job sheets and repair standard |
| `/claims/` | At-the-scene checklist, claim steps and questions. Print the checklist and steps from this page. |
| `/courtesy-cars/` | Fleet, availability, loan terms and enquiry link |
| `/contact/` | Quote, claim and loan enquiries, with a visible email and phone |
| `/404.html` | Static missing-page artwork and recovery links |

## Edit the site

Edit headings, introductions, calls to action and page-specific copy in `app/page.tsx` and the other route files under `app/`. Edit navigation and the wordmark in `components/site-header.tsx`, and footer copy in `components/site-footer.tsx`.

| File | Editable data |
| --- | --- |
| `content/business.ts` | Name, tagline, email, phone, address, directions, approximate map coordinates and weekly hours. Use `HH:MM` local times with the opening time before the closing time. Omit closed days. Update `timeZone` here and in `site.config.json` if the location changes. |
| `content/closures.ts` | Full-day Queensland public holidays and Brisbane’s show holiday. Dates use local `YYYY-MM-DD`. The published calendar covers 2026–2029. Extend the date list and `through` together when new dates are published. Outside the calendar’s range the site displays “Workshop hours.” |
| `content/services.ts` | Price sheet rows. `priceFrom` is whole AUD, with `0` for free and `null` for assessment. `typicalDays` is the working-day range. `insuranceWork` identifies work eligible for insurance. Choose an icon from `serviceIcons`. |
| `content/repairs.ts` | Gallery jobs. Give each job a stable lowercase hyphenated `id` that becomes its page anchor, plus a supported `body`, `damage` and `zone`, panel names, working days, claim flag, story and paint code, name and six-digit hex. Set `featured: true` on exactly one job for Home. |
| `content/courtesy-cars.ts` | Fleet details, including body, 2–8 seats, automatic or manual transmission, petrol or hybrid fuel, tow bar, six-digit paint hex, availability and note. |
| `site.config.json` | Public name, meta description, domain, time zone and Jamstacks configuration. Update the name here and in `content/business.ts` when renaming. The provisioner may add `provisioningId`. |
| `app/tailwind.input.css`, `components/workshop-art.tsx` | Day and night palettes, panel and tape treatments, fonts and SVG artwork |
| `lib/metadata.ts`, `lib/structured-data.ts`, `app/sitemap.ts` | Social metadata, content-driven `AutoBodyShop` data and indexed routes |

The content checks name the collection item and field to fix. Queensland holiday dates come from the [Queensland Government public holidays calendar](https://www.qld.gov.au/recreation/travel/holidays/public).

### Change a courtesy car’s availability

Find `id: 'brisa'` in `content/courtesy-cars.ts` and change `available: true` to `available: false`. After rebuilding, Home reads “2 of 5 cars in the bay this week” and Brisa’s sign reads “Out on loan” on both Home and Courtesy cars. Change the flag back to put Brisa back in the bay. A car request is an enquiry, and the workshop holds a car once it confirms by reply.

### Add a repair job

Copy an object in `content/repairs.ts` and give it a unique ID. Use a generic vehicle description, select the body and damage zone for the illustration, and fill in the panel, paint and job details. The gallery and filter counts update automatically. Change the featured flags together when replacing the Home job.

## Contact and public configuration

Set `jamstacks.siteId` in `site.config.json` or supply `JAMSTACKS_SITE` at build time. When configured, Contact loads one hosted Jamstacks support form and its bootstrap. The hosted runtime owns the name, email and message fields, validation and submission. With an empty site ID, Contact uses email. The public email remains visible either way. SiteLink uses full-document navigation into and out of Contact so each visit gets a fresh bootstrap.

| Environment variable | Public build-time use |
| --- | --- |
| `JAMSTACKS_SITE` | Site ID. A blank value uses the file default. |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base, normally `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding the configured domain |
| `SITE_TIME_ZONE` | IANA time zone overriding the configured time zone |
| `PAGES_BASE_PATH` | GitHub Pages project path such as `/preview` |
| `PAGES_BASE_URL` | Actual Pages origin and path, used for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Local-only opt-in for a localhost CDN. GitHub Actions rejects it. |

Copy `.env.example` to `.env.local` for local values. These settings are public. Keep credentials in deployment secrets.

To verify navigation and URLs with a project path, build and preview the export with these settings. Repeat with a public test site ID to exercise the hosted form bootstrap. Checking the component in preview and confirming real message delivery are separate tests.

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## Pages and gallery publishing

The GitHub Actions workflow builds pull requests and publishes main or manual runs when Pages is configured to use GitHub Actions. It preserves the Jamstacks `provisioning_id` dispatch input and correlated run name. Set the site’s custom domain and HTTPS in Pages. If the repository has a `PAGES_ADMIN_TOKEN` secret with Administration and Pages write access, the workflow can set the custom domain and enforce HTTPS once the certificate is issued. The domain comes from the `SITE_DOMAIN` variable, the config, or the JamstackTemplates repository name. Manage DNS separately.

The finished site self-hosts Archivo (full width and weight axes), Atkinson Hyperlegible Next and Azeret Mono through Fontsource. The npm packages include their OFL 1.1 licences. The app icon lives in `app/icon.svg` and the 1200×630 social image in `public/og.png`.

`jamstacks/` is removable gallery metadata and captures. Ordinary builds, tests and Pages work without it. After a fresh normal build, run the gallery capture script from the portal checkout and validate its report.

```sh
node /path/to/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template . --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

After reviewing the site, remove `plan/` and `.claude/skills/` before publishing the gallery template.

For a host-level content security policy, allow same-origin Next.js assets, the inline theme bootstrap, assets from the configured Jamstacks CDN and the published form’s API origin. The optional workshop map uses `frame-src https://www.google.com`.
