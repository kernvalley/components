<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v2.0.8] - 2025-11-19

### Fixed
- Fix bug in santizer use when creating templates

## [v2.0.7] - 2025-11-19

### Changed
- Update npm publishing and sanitizer use

## [v2.0.6] - 2025-03-31

### Changed
- Update dependencies and config

## [v2.0.5] - 2024-05-01

### Fixed
- Fixed `<krv-events>` styles in cases of forced theme via the `theme` attribute

## [v2.0.4] - 2024-05-01

### Changed
- Update design of `<krv-events>`

## [v2.0.3] - 2024-04-25

### Added
- `<krv-events>` now as an optional `tags` attribute to filter events

## [v2.0.2] - 2024-04-24

### Changed
- Do not show full end date, just time, if end is same day as start

### Fixed
- Fix icon style / size in `<krv-events>`

## [v2.0.1] - 2024-04-11

### Changed
- Lazy parse styles and templates for components

## [v2.0.0] - 2024-04-06

### Changed
- Switch to using AegisJSProject libraries
- No longer fetch & parse HTML or load styles as `<link rel="stylesheet">`

### Deprecated
- Deprecate all `*#html` Trusted Type Policies
- All such `*.html` & `*.css` files are now empty and deprecated

## [v1.1.5] - 2024-01-30

### Fixed
- Correctly scale images in `<wfd-mayor-events>`

## [v1.1.4] - 2024-01-29

### Added
- Add option/attribute for `<wfd-mayor-events showimages>`

## [v1.1.3] - 2024-01-21

### Added
- Add UTM params to `<wfd-mayor-events>` link + add `source` attribute

### Changed
- Use `CSSStyleSheet().replace()` for `<wfd-events>` styles
- Use Gnome palette colors for `<wfd-events>` colors
- Use `Intl.DateTimeFormat()` to format `<wfd-events>` start/end datetimes
- WIP (just comments) on creating `<wfd-events>` template via `createHTML()`
- Update `<wfd-mayor-events>` style/layout (center events)

## [v1.1.2] - 2024-01-20

### Fixed
- Fixed `<wfd-mayor-events>` requiring `allow-same-origin` when embedded (`sessionStorage` use)
- Fix bad animation

## [v1.1.1] - 2024-01-20

### Added
- Create `<wfd-mayor-events>`
- Add own version of `importmap.json`

### Changed
- Misc CSP & TrustedTypes updates

### Removed
- Remove local installation of certain packages to use `unpkg.com/@shgysk8zer0/` instead

## [v1.1.0] - 2023-07-03

### Changed
- Update to node 20
- Update GH Action for npm publish

## [v1.0.2] - 2023-06-28

### Fixed
- Do not exclude `*.min.*` and `*.map` when publishing

## [v1.0.1] - 2023-06-24

### Added
- Added missing `keywords` to package

## [v1.0.0] - 2023-06-24

Initial Release
