# Mobile web, PWA and responsive dashboards

Read this when the product runs in a browser. The 15 rules were written for native apps. On the web the browser owns part of the behavior, so some rules do not apply and other checks take their place.

## Which rules change

- **Rule 1 (refresh):** the browser provides pull to refresh. Do not rebuild it and do not block it. What you still owe is a visible way to reload (W2).
- **Rule 2 (back):** the browser and the OS own the back action. Your job is to make it do the expected thing (W1).
- **Rules 3 and 10:** apply only when the web app has its own bottom bar.
- **Rule 14:** applies only when the page asks for browser permissions (notifications, camera, location).
- **Rule 15:** the store policies (4.8, 5.1.1(v), Google Play) apply only when the web app ships inside a native wrapper in a store. For a pure web app, list them under Not checked, not as findings.

A rule that does not apply is "not applicable" in the summary. It is not a finding.

Order for a web review: W1 to W9 first, then rules 5 to 9 and 11 to 13, then E1 to E10. Touch the other rules only where the list above says they apply.

## Web checks

Use the W number in the Rule column.

- **W1** `CONVENTION` **Back closes the top layer.** With a sheet, dialog or full-screen menu open, the back action closes it and the person stays on the page. A sheet that ignores history turns "back" into "leave". Use a history entry or a route for overlays that hold a task.
- **W2** `CONVENTION` **Errors offer a retry.** "Reload the page" is not enough: an installed web app has no browser bar. Each error state has a button that retries or reloads.
- **W3** `RESEARCH` **A tap answers at once, even when the next page is slow.** Server-rendered navigation can hold the old page for seconds with no sign that anything happened (rule 12). Show pending feedback on the tapped link itself, for example a small spinner in place of its chevron or icon. In Next.js the App Router hook is `useLinkStatus` from `next/link`. Failures get an error view with a retry; in Next.js that is the route-level `error` file.
  - **Do not add a route-level `loading` file as the default fix.** In Next.js it shows only when navigation enters its segment, not between pages below it. It also streams the response, and a streamed response is always status 200, so a `notFound()` in a page below it no longer answers 404 (see "Status Codes" in the Next.js `loading` docs). Use it only where both effects are acceptable.
  - Verify the fix, do not assume it: tap a link with a throttled network and watch for feedback, and check the HTTP status of a page that must be missing or forbidden.
- **W4** `CONVENTION` **The app area keeps people inside.** Logo and home links in the app shell lead to the app's start screen, not to the marketing site. The way out is a clear, deliberate link.
- **W5** `STANDARD` **Safe areas hold at every breakpoint.** With `viewport-fit=cover`, padding uses `env(safe-area-inset-*)`. Check that a responsive class does not override it at a wider breakpoint, and check landscape (https://developer.mozilla.org/en-US/docs/Web/CSS/env).
- **W6** `STANDARD` **Sizes are measured in CSS px.** A size in `rem` or a utility class depends on the root font size, so work out the real number before you compare it to 24 or 44. Never switch off zoom (`user-scalable=no`, `maximum-scale=1`): text must resize (https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).
- **W7** `CONVENTION` **Navigation adapts and stays whole.** A bottom bar on narrow screens and a sidebar on wide ones show the same destinations in the same order. Every role has a way to move between its sections on a narrow screen. A product with several sections needs more than a back link. A plain drill-down (list, then detail) is fine with a back link, and gains from "previous" and "next" on the detail screen.
- **W8** `CONVENTION` **Overlays guard work in progress.** While an upload or save runs, a tap on the backdrop, Escape and the close button do not discard it. Either block closing or cancel the request cleanly.
- **W9** `CONVENTION` **The keyboard does not cover the field.** Bottom-fixed sheets and `vh` heights behave differently once the on-screen keyboard opens. This cannot be seen in code: list it under Not checked and name the screens to test.

## Severity examples for the web

- Lost upload, lost submitted work, or a dead end with no way back: HIGH.
- Typed text in a short form is lost, or back leaves the page: MEDIUM.
- No feedback after a tap on a fast route: LOW. On a slow, data-heavy route: MEDIUM.
- A fix that turns a 404 or 403 into a 200: HIGH, because tests, monitoring and crawlers can no longer see the error.
