# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2025-10-25

### Added

- `useListItemWidth` hook to calculate safe text width accounting for scrollbar and border space
- Helps prevent horizontal text overflow when scrollbar is present
- Automatically accounts for border styles and scrollbar positioning

### Fixed

- Improved layout handling when scrollbar is present to prevent text overflow

## [1.4.0] - 2025-10-23

### Added

- `startAtBottom` prop to initialize the list showing the last items first
- Useful for log viewers, chat applications, and other bottom-up displays

## [1.3.0] - 2025-10-22

### Added

- `keyFn` prop to specify custom key extraction function for list items
- Support for items without `id` property using custom key function

### Changed

- Items no longer require an `id` property when using `keyFn`

## [1.2.0] - 2025-10-22

### Added

- `renderItem` prop for custom rendering of list items
- Generic type support for `ScrollableList<T>` component
- `renderItem` receives both item and index parameters

### Changed

- `ScrollableList` is now generic, accepting `ScrollableList<T extends ScrollableItem>`
- Items can render multi-component layouts instead of just text

## [1.1.0] - 2025-10-21

### Added

- `keyMap` prop for custom keyboard navigation
- Page navigation with `pageUp` and `pageDown`
- Support for special keys (arrows, page keys, home, end, escape, etc.)
- `pageUp()` and `pageDown()` methods to `ScrollView` class

### Changed

- Keyboard input handling now case-insensitive for special keys

## [1.0.0] - 2025-10-21

### Added

- Initial release
- Scrollable list component with keyboard navigation
- Customizable scroll bar (position, character, styling)
- Border customization (style, color, focused color)
- TypeScript support
- Vim-style keys (j/k) and arrow keys for navigation
