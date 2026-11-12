---
name: mobile-ux-conventions
description: Evidence-graded mobile app UX conventions (Jakob's Law) for tab bars, back and close, gestures, touch targets, empty states, feedback, destructive actions, permissions and sign-in. Use when building or reviewing any iOS, Android, React Native, Flutter or mobile-web screen, navigation or flow.
license: MIT
metadata:
  version: 1.0.0
---

# Mobile UX Conventions

People spend most of their time in other apps. They arrive at yours with habits already formed and expect it to work the same way (Jakob's Law, Jakob Nielsen, 2000). Every broken convention costs the user a moment of thought. Spend that budget only where the product is truly different.

Popular "UX rules" lists mix platform guidance with habits copied from Instagram. Those do not carry the same weight, so every rule here has an evidence grade.

## Evidence grades

The grade says where a rule comes from. It does not say how bad a violation is: severity is judged separately, by the effect on the user (see Review Output Format).

| Grade | Where it comes from | How to treat it |
| --- | --- | --- |
| `STANDARD` | Apple HIG, Android or Material docs, WCAG, or a store policy | Follow it on that platform. Most of it is recommendation, size numbers included. Only store policy is a hard requirement |
| `RESEARCH` | Published usability research | Default. Deviate with a stated reason or your own data |
| `CONVENTION` | No guideline requires it. Users learned it from the dominant apps | Default. Deviate with a stated reason |

## How to use this skill

1. **Find the platform.** SwiftUI or UIKit is iOS. Compose or Views is Android. React Native, Expo and Flutter are both: apply each platform's rule, do not ship iOS patterns to Android. Mobile web and PWA use the Web notes.
2. **Building:** apply the rules as defaults. Prefer the system component, because it usually carries the convention with it (back gesture, refresh control, tab bar). List every deliberate deviation and its reason in your summary.
3. **Reviewing:** check rules 1 to 15 and E1 to E10, then report in the Review Output Format.
4. Read `references/rules.md` for exact wording, numbers, exceptions, sources and common mistakes. Read it before you call something a store or accessibility requirement. Read `references/platforms.md` for API names per framework.

These are defaults for typical apps, not laws. A rule that does not fit the product (a game, a camera, a kiosk app) is a deviation to state, not a defect to force.

## The 15 rules

**1. Pull down to refresh.** `STANDARD` component, `CONVENTION` to offer it. On a list or feed with remote data, pulling down at the top reloads it. Use the system refresh control. Gestures are invisible, so also give a visible way to refresh, such as a button or menu item.

**2. Never break the system back gesture.** `STANDARD`. iOS: a swipe from the leading edge pops the navigation stack. Android with gesture navigation: back swipes from the left and the right edge, and recent versions preview the destination. Do not disable it, and keep carousels, drawers and swipe actions away from the screen edges.

**3. A center "create" tab is a social-app habit, not a rule.** `CONVENTION`. It fits when creating content is the core loop and the category leaders do it. Otherwise look at the platform first: Apple says tab bars are for navigation and actions belong in a toolbar. On Android a floating action button is the usual home of a screen's primary action. If you use a center button, it starts the create flow. It is not a place the user stays in.

**4. Home is the first tab, profile or account is the last.** `CONVENTION`. Say leading and trailing, not left and right, so right-to-left languages mirror correctly. iOS may place a dedicated search tab at the trailing end.

**5. Keep the tab bar short and stable.** `STANDARD`. Android bottom navigation: three to five destinations. iOS gives no number but says to avoid overflow, so five is the practical limit on iPhone. Do not disable or hide tabs. Keep each tab's navigation state. Settings in a tab is unusual (`CONVENTION`): they are changed rarely, so they normally sit behind a gear in the profile or a top corner.

**6. Close and back are different.** `STANDARD` on iOS, `CONVENTION` on Android. A modal sheet or flow is dismissed with Close (X), Cancel or Done. A pushed screen goes back with the back arrow. On iOS a back arrow moves between steps and does not dismiss a sheet. On Android the system back action does close a sheet or dialog, so support it. Never make Done the only way out, and protect unsaved input when a flow closes.

**7. Never show a blank screen.** `STANDARD` and `RESEARCH`. An empty state says why it is empty and, where one makes sense, offers a direct action to fill it. Treat first use, no results, error, offline and "all done" as different states.

**8. Keep frequent actions easy to reach.** `RESEARCH`. The primary action is usually best low on the screen, clear of the system gesture area and safe area. That is a practical heuristic, not a research result: the research does not forbid a top placement, so judge by the screen and the task. Do not present "thumb zone" heat maps as fact: later research shows people shift their grip and tap the center best.

**9. Make touch targets big enough.** `STANDARD`. iOS: 44×44 pt default, 28×28 pt minimum. Android: 48×48 dp recommended. Web: WCAG 2.5.8 (AA) asks for 24×24 CSS px and 2.5.5 (AAA) for 44×44, both with exceptions. The visible icon may be smaller than its hit area. Aim for the default, not the minimum, and name the unit: pt, dp and CSS px differ.

**10. Tapping the active tab returns to its top.** `CONVENTION`, from observation of common apps, with no primary source. The first tap pops to the tab's root. On the root, it scrolls to the top. On iOS a tap on the status bar also scrolls to the top: do not block it.

**11. Use the icons people already know.** `STANDARD` principle, `CONVENTION` for the exact glyphs. Magnifier is search, gear is settings, bell is notifications, trash is delete. Use the platform icon set (SF Symbols, Material Symbols). Tab icons get a visible text label. Every icon that acts as a control gets an accessibility label. Decorative icons are hidden from screen readers.

**12. Every action answers at once.** `RESEARCH`. Use these limits as a guide: about 0.1 s feels instant, so show a pressed state. Past 1 s people notice the wait, so show activity. Near 10 s attention is lost, so show progress and, where possible, a way to cancel. Show placeholders, not a blank wait. Block double submits. Haptics support visible feedback and never replace it.

**13. Red means destructive or error, and deletes can be undone.** `STANDARD`. Keep the destructive meaning of red clear (the system also uses red for badges): an ordinary action like Save should not look like a destructive one. If the brand color is red, mark destructive actions in a second way. Never signal by color alone: add a label or icon. Common, reversible deletes get Undo and no confirmation dialog. Actions with serious or irreversible results get a confirmation whose button names the action ("Delete account"), not "OK".

**14. Ask for permissions in context.** `STANDARD` and `RESEARCH`. Request when the person uses the feature that needs it, not at launch, unless the need is obvious (a navigation app and location). Explain the benefit in one full sentence. iOS: a custom pre-prompt has one button such as "Continue" that leads to the system alert, and does not imitate it (extra actions only where a legal consent needs them). Android: a rationale screen always offers a way to decline and keep using the app. Respect a denial: keep the app usable, do not nag, and offer the way to Settings when the person next asks for that feature.

**15. Make sign-in late and light.** `STANDARD`. Ask for an account only when a feature needs one, and say why. Prefer low-effort methods such as passkeys or platform sign-in. Three store policies are hard requirements, so check their exact scope in `references/rules.md`: (a) App Store 4.8: an iOS app that uses a third-party or social login for its primary account must also offer an equivalent privacy-focused login. Sign in with Apple is the usual way to meet it. An app with only its own email login is exempt, and there are other exemptions. (b) App Store 5.1.1(v): an app that creates accounts must offer account deletion in the app. (c) Google Play: a way to request account deletion from inside the app, plus a web link.

## Extended checklist

Check these too. Sources are in `references/rules.md`.

- **E1** `STANDARD` Content respects safe areas and system bars. New Android versions draw edge to edge.
- **E2** `STANDARD` Each text field sets the right keyboard type. Password fields hide their content.
- **E3** `CONVENTION` The keyboard never covers the focused field.
- **E4** `STANDARD` Text scales with the system font size (Dynamic Type, `sp`).
- **E5** `STANDARD` Light and dark appearance both work, with enough contrast.
- **E6** `STANDARD` Every custom gesture has a visible alternative.
- **E7** `STANDARD` Sheets can be dismissed by swipe where the platform does so. One sheet at a time.
- **E8** `CONVENTION` Drafts and screen state survive an interruption, such as a call or app switch.
- **E9** `CONVENTION` When the product works with remote data, it shows what it has while offline and says that it is offline.
- **E10** `STANDARD` Search is easy to find, and its scope is clear.

## When to break a convention

Ask the Jakob test: would someone who uses the three leading apps in this category know what to do here without thinking? If yes, ship it. If no, the difference must be the product's point, not decoration.

- Store policy: do not break it.
- Other `STANDARD` rules, accessibility sizes included: deviate only for a strong platform or product reason, and say which.
- `RESEARCH` and `CONVENTION`: deviate when the reason is stated. A game or camera app has different peers than a banking app.
- Redesigning learned behavior is costly. Snapchat's 2018 redesign drew a petition with more than 1.2 million signatures, and part of it was rolled back.

## Review Output Format

State the scope, the platforms and what you could inspect (code only, or the running app). Then one table, worst first:

| Severity | Rule | Grade | Location | Finding | Fix |
| --- | --- | --- | --- | --- | --- |
| HIGH | 15 Sign-in | STANDARD | `src/Login.tsx:41` | Google login for the primary account with no equivalent privacy-focused option on iOS | Add Sign in with Apple, or confirm a 4.8 exemption |
| MEDIUM | 5 Tabs | STANDARD | `src/Tabs.tsx:12` | Six tabs, one of them Settings | Move Settings into Profile, merge to five |

Severity follows the effect on the user, not the grade:

- **HIGH:** a store policy is likely broken, a system gesture is blocked, a person cannot finish or leave a task, data is lost, or a control is very hard or impossible to use (a target far under the platform size, no accessible name). Name the effect on the user. A broken recommendation alone is not HIGH.
- **MEDIUM:** learned behavior is broken or people must stop and think: wrong tab order or count, back arrow on a modal, missing empty state, permission prompts at launch, a dialog on every delete, a target somewhat under the recommended size.
- **LOW:** polish, or a gap with no effect on the main task.

Rate per platform when the rule differs (a 40×40 button is over the iOS minimum but under its default, and under the Android recommendation). From code alone you see the declared size, not the real hit area: report a likely problem and list the real size under Not checked. Cite `path:line`, or the screen and component when there is no code. Use the rule number or E number in the Rule column. Merge repeated issues into one row. Do not pad. After the table:

1. **Deviations accepted:** conventions the app breaks with good reason, so nobody "fixes" them later.
2. **Not checked:** what you could not verify from the material (runtime behavior, real hit areas, store exemptions), each with what is needed.
3. **Verdict:** `Block` (any HIGH), `Needs changes` (MEDIUM or LOW only), or `Approve`.

## Boundaries

This skill covers structure and behavior that users already expect. It does not cover visual style, motion design, microcopy, or a full accessibility audit. Use a dedicated skill for those when one is installed. It is not legal or store-review advice, and platform guidelines change: when a rule decides a store submission, confirm it against the linked source.
