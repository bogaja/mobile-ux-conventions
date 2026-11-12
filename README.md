# mobile-ux-conventions

An agent skill that makes AI-built apps feel familiar. It teaches Claude Code, Codex, Cursor and other coding agents the 15 mobile UX conventions that users already expect, and it tells the agent where each one comes from: a platform guideline, research, or plain habit.

> "Users spend most of their time on other sites."
> — Jakob Nielsen, 2000. Known today as Jakob's Law.

Replace "sites" with "apps" and you have the idea: people expect your app to work like the ones they already know.

## Why this exists

AI agents build screens that look fine and feel wrong: six tabs, Settings in the tab bar, a back arrow on a modal, three permission prompts at launch. Each one is small. Together they tell the user "this app was not made by people who use apps".

Lists of "UX rules every app needs" are popular on social media. They are a good start, but they mix three different things:

| Grade | What it is | Example |
| --- | --- | --- |
| `STANDARD` | Written in Apple HIG, Android docs, WCAG or a store policy | Touch target sizes, system back gesture |
| `RESEARCH` | Backed by published usability research | Response-time limits of 0.1 s, 1 s, 10 s |
| `CONVENTION` | No guideline requires it. Users learned it from Instagram, TikTok, YouTube | Home first, profile last |

An agent that treats all three the same gives bad advice. This skill grades every rule and links the source. The grade says where a rule comes from. How serious a violation is gets judged separately, by its effect on the user.

## What the fact-check found

The skill started from a 15-rule list in a TikTok by [@timbuildingapps](https://www.tiktok.com/@timbuildingapps). All 15 are useful. Five needed a correction before an agent can apply them safely:

| Popular version | What the sources say |
| --- | --- |
| Touch targets must be at least 44×44 pt | 44 pt is Apple's default. Apple's minimum is 28 pt. Android recommends at least 48 dp. Web (WCAG AA) asks for 24 CSS px, with exceptions |
| "Create" goes in the middle of the tab bar | Apple: tab bars are for navigation, not actions. On Android a floating action button is the usual place. The center "+" is a social-app habit |
| Swipe from the left edge goes back | iOS: the leading edge. Android gesture navigation: both edges |
| Offer Apple or Google login | Not a duty. But if you use Google login for the main account on iOS, App Store rule 4.8 requires an equivalent privacy-focused option, unless an exemption applies |
| Important buttons go in the thumb zone | The famous thumb-zone map overstates it. Later research by the same author shows people shift grip and tap the center best |

## Install

With the skills CLI:

```bash
npx skills add bogaja/mobile-ux-conventions
```

Manually, for Claude Code:

```bash
git clone https://github.com/bogaja/mobile-ux-conventions.git
cp -r mobile-ux-conventions/skills/mobile-ux-conventions ~/.claude/skills/
```

For other agents, copy `skills/mobile-ux-conventions/` into the agent's skills folder.

## Use

The skill loads by itself when you build or review a mobile screen. You can also ask for it:

- "Review my app's navigation against mobile-ux-conventions before I submit it."
- "Build the tab bar and empty states for my recipe app."
- "Should my finance app have a + button in the middle of the tab bar?"

A review comes back as one table, worst first, with a verdict:

| Severity | Rule | Grade | Location | Finding | Fix |
| --- | --- | --- | --- | --- | --- |
| HIGH | 15 Sign-in | STANDARD | `App.tsx:29` | Google login for the main account with no equivalent privacy-focused option on iOS | Add Sign in with Apple, or confirm a 4.8 exemption |
| HIGH | 2 Back gesture | STANDARD | `App.tsx:109` | `gestureEnabled: false` blocks the iOS back swipe | Remove the option |
| MEDIUM | 5 Tabs | STANDARD | `App.tsx:89` | Six tabs, one of them Settings | Move Settings into Profile, merge to five |

## The 15 rules

| # | Rule | Grade |
| --- | --- | --- |
| 1 | Pull down to refresh, and always offer another way | STANDARD component, CONVENTION to offer |
| 2 | Never break the system back gesture | STANDARD |
| 3 | A center "create" tab is a social-app habit, not a rule | CONVENTION |
| 4 | Home is the first tab, profile is the last | CONVENTION |
| 5 | Keep the tab bar short and stable. Settings rarely earns a tab | STANDARD, CONVENTION |
| 6 | X closes a flow, the arrow goes back one screen | STANDARD on iOS, CONVENTION on Android |
| 7 | Never show a blank screen | STANDARD, RESEARCH |
| 8 | Keep frequent actions easy to reach | RESEARCH |
| 9 | Touch targets: 44 pt on iOS, 48 dp on Android | STANDARD |
| 10 | Tapping the active tab returns to its top | CONVENTION |
| 11 | Use the icons people already know, with labels | STANDARD, CONVENTION |
| 12 | Every action answers at once | RESEARCH |
| 13 | Red means destructive. Deletes can be undone | STANDARD |
| 14 | Ask for permissions in context, with one sentence why | STANDARD, RESEARCH |
| 15 | Make sign-in late and light | STANDARD |

Full text: [SKILL.md](skills/mobile-ux-conventions/SKILL.md). Sources and common mistakes: [references/rules.md](skills/mobile-ux-conventions/references/rules.md). API names for SwiftUI, Compose, React Native and Flutter: [references/platforms.md](skills/mobile-ux-conventions/references/platforms.md).

## What it does not do

Visual style, motion, microcopy and full accessibility audits are out of scope. The skill works next to dedicated skills for those. It has no scripts and makes no network calls: it is three Markdown files.

It is not legal or store-review advice. A code review cannot see runtime behavior, so each review lists what was not checked. The rules are defaults for typical apps: a game or a camera app can break them with a stated reason.

## Test it

[evals/](evals/) holds three test prompts and a small Expo app with planted problems. Run the first prompt with and without the skill and compare.

## Sources

Apple Human Interface Guidelines, App Store Review Guidelines, Android Developers, Material Components, WCAG 2.2, Nielsen Norman Group, and Steven Hoober's field research. Every link is in [references/rules.md](skills/mobile-ux-conventions/references/rules.md), last checked on 2026-11-12. Platform guidelines change: if you find an outdated rule, please open an issue.

## Kurzfassung (Deutsch)

Ein Agent-Skill für Claude Code, Codex und Cursor. Er bringt dem Agenten die 15 UX-Regeln bei, die Nutzer aus Instagram, TikTok und YouTube schon kennen. Jede Regel hat eine Stufe: `STANDARD` (steht bei Apple oder Google), `RESEARCH` (durch Studien belegt) oder `CONVENTION` (reine Gewohnheit). Der Agent baut damit Apps, die sich vertraut anfühlen, und prüft fertige Apps vor dem Store-Upload.

## License

MIT. See [LICENSE](LICENSE).
