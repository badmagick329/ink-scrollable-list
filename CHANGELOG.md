# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-10-22

### Added

- Custom rendering support via `renderItem` prop for full control over item appearance
- Generic type support for `ScrollableList` component to enable strongly-typed custom items
- `renderItem` function receives both the item and its index for flexible rendering

### Changed

- `ScrollableList` component is now generic, accepting `ScrollableList<T>` where `T extends ScrollableItem`
- Enhanced type safety for custom item types when using `renderItem`
- Items can now render multi-component layouts instead of just text

### Documentation

- Added documentation for `renderItem` prop
- Added example showing custom rendering with AppEvent items (timestamps, colored log levels, messages)
- Updated API table to include `renderItem` prop

## [1.1.0] - 2025-10-21

### Added

- Custom key mappings via `keyMap` prop for flexible keyboard navigation
- Page navigation support with `pageUp` and `pageDown` actions
- Support for all special keys (arrows, page keys, home, end, escape, etc.)
- Flexible key matching system that handles both character and special key inputs
- `pageUp()` and `pageDown()` methods to `ScrollView` class

### Changed

- Enhanced keyboard input handling with case-insensitive special key matching
- Updated README with `keyMap` documentation and examples
- Added focus behavior documentation

### Documentation

- Added note about focus requirement and Tab key for cycling focus
- Added examples for custom key configurations
- Updated API documentation with all supported special keys

## [1.0.0] - 2025-10-21

### Added

- Initial release
- Scrollable list component with keyboard navigation
- Customizable scroll bar (position, character, styling)
- Border customization (style, color, focused color)
- TypeScript support
- Vim-style keys (j/k) and arrow keys for navigation
