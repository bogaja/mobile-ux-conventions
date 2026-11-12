# Rules: evidence, numbers, common mistakes

Sources were checked on 2026-11-12. HIG = Apple Human Interface Guidelines, base URL `https://developer.apple.com/design/human-interface-guidelines/`. Quotes are short and exact. "Popular version" is how the rule usually appears in social posts.

## Contents

1 Refresh · 2 Back gesture · 3 Create · 4 Tab order · 5 Tab count · 6 Close vs back · 7 Empty states · 8 Reach · 9 Touch targets · 10 Reselect tab · 11 Icons · 12 Feedback · 13 Red and undo · 14 Permissions · 15 Sign-in · Extended checklist · Background facts

A quote proves only what it says. Where a rule goes further than its source, the text says "practice" or "convention".

## 1. Pull to refresh

- Both platforms ship the control: Apple `UIRefreshControl`, "a standard control that can initiate the refreshing of a scroll view's contents" (https://developer.apple.com/documentation/uikit/uirefreshcontrol). Android swipe-to-refresh (https://developer.android.com/develop/ui/views/touch-and-input/swipe/add-swipe-interface).
- HIG gestures: give people more than one way to do something, because gestures are hidden (HIG `gestures`).
- Loading on open is not a substitute: a person who suspects stale content needs a way to reload on demand.
- Mistakes: a custom spinner that ignores the system control. Pull to refresh on a screen with nothing to reload. No other way to refresh. On mobile web, fighting the browser's own pull to refresh.

## 2. System back gesture

- iOS: the navigation controller pops "when a person swipes from the leading screen edge" (https://developer.apple.com/documentation/uikit/uinavigationcontroller/interactivepopgesturerecognizer). HIG `gestures`: people expect a Back button in a top toolbar, and many apps add the side swipe as a shortcut. "Avoid conflicting with gestures that access system UI."
- Android: with gesture navigation, back works from the left and right edge. Predictive back previews the destination. Its availability depends on the Android version and the app's target SDK, so check the current page (https://developer.android.com/design/ui/mobile/guides/patterns/predictive-back). With three-button navigation there is no edge swipe, but the back action must still work. Keep touch targets out of system gesture insets (https://developer.android.com/develop/ui/views/layout/edge-to-edge).
- Popular version: "swipe from the left edge". Wrong for Android (both edges) and for right-to-left layouts (leading edge).
- Mistakes: hiding the navigation bar and losing the gesture. Full-width carousels or drawers that start at the edge. Custom back handling that skips the predictive animation.

## 3. Create action

- HIG `tab-bars`: "Use a tab bar to support navigation, not to provide actions." Controls that act on the current view belong in a toolbar.
- Material: the floating action button "represents the primary action of a screen" (https://github.com/material-components/material-components-android/blob/master/docs/components/FloatingActionButton.md).
- Popular version: "Create goes in the middle of the tab bar." That is the Instagram, TikTok and YouTube pattern. No guideline asks for it.
- Neither source forces one answer. A floating button, a toolbar button and a prominent in-content button are all valid: choose from the task and from what the category leaders do. How the create flow is presented (sheet, full screen, pushed screen) follows from the task.
- Mistakes: a center "+" copied into a finance, utility or reading app with no reason. A center button that behaves like a tab and leaves the user "inside" an empty create screen.

## 4. Tab order

- No primary source found. This is an observation, not a measured fact: Instagram, TikTok and YouTube put home first and the account last (seen November 2026). How widespread the pattern is across all apps was not measured.
- HIG `tab-bars`: a tab bar "can include a dedicated search tab at the trailing end".
- Mistakes: profile in the middle. Hard-coded left and right that break in Arabic or Hebrew.

## 5. Tab count

- Material: bottom navigation holds "three to five destinations" (https://github.com/material-components/material-components-android/blob/master/docs/components/BottomNavigation.md).
- HIG `tab-bars`: avoid overflow tabs. "Don't disable or hide tab bar buttons, even when their content is unavailable." Tabs preserve "the current navigation state within each section". For user-selected tabs, "aim for a default list of five or fewer".
- HIG `settings`: the settings area is for "general, infrequently changed settings". Apple does not say where the entry point goes. Keeping it out of the tab bar is a `CONVENTION`, drawn from "infrequently changed" and from tab bars being for navigation between main sections.
- Scope: "three to five" is Material's number for bottom navigation on phones. Tablets, adaptive layouts and user-customised tabs follow their own guidance.
- Popular version: "maximum five tabs". The hard number is Material's. Apple says few, with no overflow.
- Mistakes: six tabs with a More item. Settings, Help or Logout as a tab. Tabs that reset their stack when you leave them.

## 6. Close versus back

- HIG `sheets`: Cancel "dismisses a sheet without saving any changes". Done dismisses after completing a task. "The Back button lets people navigate to a previous step ... It isn't intended to dismiss a sheet." "If you provide a Done button, always pair it with a Cancel button" or a Back button.
- Android: close icon for full-screen dialogs and the Up arrow for hierarchy is common practice. Treat as `CONVENTION` there. The Android system back action is different from an on-screen arrow: it is expected to close a sheet or dialog, so do not block it.
- Mistakes: a back arrow on a modal. An X on a pushed detail screen. A flow that throws away unsaved input when it closes.

## 7. Empty states

- HIG `tab-bars`: "If a section is empty, explain why its content is unavailable."
- NN/g: empty states should communicate system status, teach, and give a direct pathway to the key task (https://www.nngroup.com/articles/empty-state-interface-design/).
- An action is not always right: an "all done" or read-only state may need only the explanation.
- Mistakes: a blank list. "No data" with no action where one is obvious. One generic empty state reused for error, offline and first use.

## 8. Reach

- Hoober 2013: 1,333 observations, of which 780 people were touching the screen. Of those 780: 49% one-handed, 36% cradled, 15% two-handed (https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php).
- Hoober 2017: people shift grip often and "prefer to view and touch the center of the screen" (https://www.uxmatters.com/mt/archives/2017/03/design-for-fingers-touch-and-people-part-1.php).
- Neither study sets a fixed zone. "Low on the screen" is common practice for a primary action, not a research result. Judge reach by the screen and the task.
- Popular version: "important buttons in the bottom half, where the thumb is." Directionally useful, but the green/red thumb-zone map overstates it.
- Mistakes: the only primary action in a top corner. A bottom button under the Android gesture bar or iOS home indicator. Destructive and primary buttons side by side at the bottom.

## 9. Touch targets

| Platform | Default or recommended | Stated minimum | Source |
| --- | --- | --- | --- |
| iOS, iPadOS | 44×44 pt | 28×28 pt | HIG `accessibility` |
| Android | "at least 48dp" | none stated | https://support.google.com/accessibility/android/answer/7101858 |
| Web, AA | none | 24×24 CSS px | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html |
| Web, AAA | none | 44×44 CSS px | https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html |

- These numbers are recommendations, apart from WCAG where a project has committed to a conformance level. A size under them is a finding, and its severity depends on how hard the control becomes to use.
- Both WCAG criteria have exceptions. 2.5.8 (AA) exempts, among others, targets with enough spacing, inline links, and controls drawn by the browser. 2.5.5 (AAA) has its own list. Read the criterion before you report a failure.
- Popular version: "at least 44×44 pt". 44 is Apple's default, not its minimum, and Android's number is 48 dp. Points, dp and CSS px are different units.
- Mistakes: a 24 px icon with no padding or hit slop. Close buttons in corners at 20 px. Targets that touch each other with no spacing.

## 10. Reselect the active tab

- No primary source found for the tab behavior, and its spread was not measured. It is an observed habit of common apps, so treat it as an unproven convention and verify it in the running app.
- iOS documents the status-bar tap: `scrollsToTop` controls "the scroll-to-top gesture" (https://developer.apple.com/documentation/uikit/uiscrollview/scrollstotop).
- Mistakes: reselect does nothing. Reselect reloads and loses scroll position. Nested scroll views that disable the status-bar tap.

## 11. Icons

- HIG `icons`: icons work best with "familiar visual metaphors". Custom icons need alternative text.
- NN/g: icons need a text label, because few icons are universally understood (https://www.nngroup.com/articles/icon-usability/).
- Accessibility labels are for icons that act as controls. A purely decorative icon should be hidden from screen readers, or it adds noise.
- Mistakes: a custom glyph for search or settings. Icon-only tab bar. A heart that means "save" on one screen and "like" on another.

## 12. Feedback

- Nielsen: 0.1 s feels instant, 1 s keeps the flow of thought, 10 s is the limit of attention (https://www.nngroup.com/articles/response-times-3-important-limits/).
- HIG `loading`: "Show something as soon as possible." Use placeholders while content loads.
- HIG `playing-haptics`: haptics complement other feedback.
- The three limits are Nielsen's. Pressed state, spinner and cancel are the usual ways to respect them, not part of the research. Fit the feedback to the situation.
- Mistakes: a button with no pressed state. A full-screen spinner for a 200 ms request. A submit button that can be tapped twice. Haptics as the only signal.

## 13. Red and undo

- HIG `alerts`: "Avoid displaying alerts for common, undoable actions, even when they're destructive." Alert for uncommon destructive actions that cannot be undone.
- HIG `color`: do not rely on color alone. The system also uses red for badges.
- No source bans red elsewhere. The rule is consistency: if red means "destructive" in the app, it cannot also mean "Save". A brand whose main color is red needs another clear signal for destructive actions.
- NN/g: prefer undo, keep confirmations rare and specific (https://www.nngroup.com/articles/confirmation-dialog/). Decide by consequence, not by how often the action happens.
- Mistakes: a red primary button for "Buy". "Are you sure?" on every delete. Confirmation buttons labelled Yes and No. Error shown only as a red border.

## 14. Permissions

- iOS, HIG `privacy`: "Ideally, wait" to request until people use the feature. A custom pre-prompt uses one button such as "Continue" that opens the system alert. "Don't include additional actions in your custom screen or window, unless needed to obtain a legal consent."
- App Store 5.1.1: purpose strings must clearly and completely describe the use (https://developer.apple.com/app-store/review/guidelines/).
- Android: ask in context and "always provide the option to cancel an educational UI flow". The rationale UI includes a "cancel" or "no thanks" button (https://developer.android.com/training/permissions/requesting). So the one-button pre-prompt is an iOS rule. Do not carry it to Android.
- Android 13 and later: most apps need a runtime permission for notifications. Check the page for exemptions (https://developer.android.com/develop/ui/views/notifications/notification-permission).
- NN/g: explain the reason in context (https://www.nngroup.com/articles/permission-requests/).
- After a denial, respect the choice. Do not ask again on every launch. Offer the route to Settings when the person next tries to use the feature.
- Mistakes: three system prompts at first launch. A pre-prompt with "Allow" and "Not now" that imitates the system alert. No path back after "Don't Allow".

## 15. Sign-in

- HIG `managing-accounts`: delay sign-in as long as possible, and explain the benefit when you require it. Prefer passkeys. An app whose core function needs an account may ask for it up front. Passkeys can replace passwords: a second method is not required.
- App Store 4.8 (https://developer.apple.com/app-store/review/guidelines/): applies when an app uses a third-party or social login "to set up or authenticate the user's primary account". Then it must also offer an equivalent login that limits data collection to name and email, lets people keep their email private, and does not collect app interactions for advertising without consent. Sign in with Apple meets this. Another service that meets all three would too. Exemptions include: apps that use only their own account system, alternative app marketplaces, education or enterprise apps with existing accounts, government or industry ID systems, and clients for a specific third-party service. Read the current text before you call it a violation.
- App Store 5.1.1(v): "If your app doesn't include significant account-based features, let people use it without a login." An app that supports account creation "must also offer account deletion within the app".
- Google Play: an app that enables account creation must provide "an in-app path to delete" the account and "a web link resource where users can request app account deletion" (https://support.google.com/googleplay/android-developer/answer/13327111).
- Popular version: "offer Apple or Google login, not only email." It can lower the effort to sign up, but it is not a duty, and using Google alone for the primary account creates the 4.8 duty on iOS unless an exemption applies.
- Mistakes: a login wall before any value is shown, when the core function works without an account. Google or Facebook login on iOS with no equivalent privacy-focused option. No account deletion.

## Extended checklist sources

- E1 Safe areas: HIG `layout`. Android edge to edge, the default once an app targets SDK 35 on Android 15 or later: https://developer.android.com/develop/ui/views/layout/edge-to-edge
- E2 Keyboard types, secure fields, validation: HIG `text-fields`
- E3 Keyboard covering the field: no primary source found. Common practice.
- E4 Text scaling: HIG `typography`
- E5 Dark mode, contrast, not color alone: HIG `color`, https://developer.android.com/guide/topics/ui/accessibility/principles
- E6 Gesture alternatives: HIG `gestures`
- E7 Sheets: HIG `sheets`
- E8 Drafts and state after interruption: no single primary source. Common practice.
- E9 Offline: Android describes the offline-first pattern (https://developer.android.com/topic/architecture/data-layer/offline-first). It is an architecture option, not a duty. How much works offline is a product decision.
- E10 Search: HIG `searching` says to aim for one clearly identified place to search. Local, in-screen search is also fine when its scope is clear.

## Background facts

- Jakob's Law: Jakob Nielsen, "End of Web Design", 22 July 2000: "users spend most of their time on other sites" (https://www.nngroup.com/articles/end-of-web-design/). Summary: https://lawsofux.com/jakobs-law/
- Snapchat 2018: a petition against the redesign passed 1.2 million signatures, and Snap rolled part of it back in May 2018 (https://phys.org/news/2018-05-snapchat-dials-redesign-riled-users.html).
- Pull to refresh was created by Loren Brichter for the Tweetie app (https://www.macstories.net/news/loren-brichter-talks-about-pull-to-refresh-patent-and-design-process/).
