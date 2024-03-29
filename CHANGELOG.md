# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
