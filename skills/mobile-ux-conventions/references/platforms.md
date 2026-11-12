# Platform pointers

API names to reach for first. They are starting points, not guarantees: names, availability and behavior change between OS and library versions, so check the current docs and test on a device.

| Rule | SwiftUI | Jetpack Compose | React Native / Expo | Flutter |
| --- | --- | --- | --- | --- |
| 1 Refresh | `.refreshable` | `PullToRefreshBox` | `RefreshControl` | `RefreshIndicator` |
| 2 Back | `NavigationStack` (keep the system back button) | `PredictiveBackHandler`, `BackHandler` | native stack: leave `gestureEnabled` on (iOS only). Android: do not swallow the hardware back event | `PopScope`, `CupertinoPageRoute` on iOS |
| 3 Create | toolbar item, `.sheet` | `FloatingActionButton` | header button, modal screen | `FloatingActionButton` |
| 4, 5 Tabs | `TabView` | `NavigationBar` | native bottom tabs | `NavigationBar`, `CupertinoTabBar` |
| 6 Close vs back | `.sheet`, toolbar item with `.cancellationAction` placement | full-screen dialog with close icon | `presentation: 'modal'` | `fullscreenDialog: true` |
| 7 Empty state | `ContentUnavailableView` | custom composable | `ListEmptyComponent` | custom widget |
| 9 Touch target | `.frame(minWidth: 44, minHeight: 44)`, `.contentShape` | `minimumInteractiveComponentSize` | `hitSlop`, minimum size 44 on iOS and 48 on Android | `kMinInteractiveDimension` |
| 10 Reselect tab | handle in the `TabView` selection binding | `onClick` on the selected item | `useScrollToTop` | `onDestinationSelected` on the same index |
| 11 Icons | SF Symbols, `Label` | Material Symbols | platform icon set per OS | `Icons`, `CupertinoIcons` |
| 12 Feedback | `ProgressView`, `.sensoryFeedback` | progress indicators, `LocalHapticFeedback` | `Pressable`, `ActivityIndicator`, haptics module | `InkWell`, `HapticFeedback` |
| 13 Destructive | `Button(role: .destructive)`, `.confirmationDialog` | `Snackbar` with action, `AlertDialog` | `Alert.alert` with a button `{ text, style: 'destructive' }` (the style shows on iOS only), toast with undo | `SnackBarAction`, `AlertDialog` |
| 14 Permissions | request at point of use, `Info.plist` purpose strings | `rememberLauncherForActivityResult`, `shouldShowRequestPermissionRationale` | request at point of use | permission plugin, request at point of use |
| 15 Sign-in | `SignInWithAppleButton`, passkeys through AuthenticationServices | Credential Manager | Apple and Google auth modules | Apple and Google sign-in plugins |

## Cross-platform notes

- React Native, Expo and Flutter: prefer the navigator and tab bar that wrap the platform's own components. They bring much of the expected behavior with them, but not all of it. Flutter's Cupertino widgets are re-implementations, and JavaScript-based stacks support gestures differently. Test back gesture, tab state, tab reselect and insets on both platforms.
- Branch per platform where the rules differ: touch target (44 pt or 48 dp), create action (toolbar or floating button), back (leading-edge swipe on iOS, system back on Android), permission pre-prompt (one button on iOS unless a legal consent needs more, a way to decline on Android).
- Mobile web and PWA: the browser owns back and pull to refresh. Do not hijack them. Use `overscroll-behavior` only inside scroll areas that need it. Touch targets follow WCAG 2.5.8. The full web checks are in `web.md`.
