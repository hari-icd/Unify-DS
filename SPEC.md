# SPEC — Design Tokens

Derived from the Unify DS Figma file (Variables, Colors, Typography, Spacing/Radius/Grids, Effect Styles pages). **Do not hand-edit.** Regenerate by re-running the Figma extraction and rewriting this file.

Tokens are harvested by `scripts/generate-tokens.js` — it matches any line of the form `--token-name: value`. Section headings and prose are ignored.

Prefer **semantic** tokens (text-*, bg-*, fg-*, border-*) over palette/utility primitives when generating HTML.

See `DECISIONS.md` for token gaps, naming inconsistencies, and open items.

---

## Typography

### Font families
--font-display: Spectral, Georgia, serif
--font-body: Geist, Inter, -apple-system, sans-serif

### Font sizes (px)
--text-display-2xl: 72px
--text-display-xl: 60px
--text-display-lg: 48px
--text-display-sm: 30px
--text-display-xs: 24px
--text-xl: 20px
--text-lg: 17px
--text-md: 15px
--text-xs: 12px

### Line heights (px)
--leading-display-2xl: 90px
--leading-display-xl: 72px
--leading-display-lg: 60px
--leading-display-sm: 38px
--leading-display-xs: 32px
--leading-xl: 26px
--leading-lg: 28px
--leading-md: 24px
--leading-xs: 16px

### Font weights
--weight-regular: 400
--weight-medium: 500
--weight-semibold: 600
--weight-bold: 700

### Letter spacing (px)
--tracking-display-2xl: -2px
--tracking-display-xl: -2px
--tracking-display-lg: -2px
--tracking-display-xs: -3px
--tracking-default: 0px

### Paragraph
--paragraph-max-width: 720px

---

## Spacing (px)

--spacing-none: 0
--spacing-xxs: 2px
--spacing-xs: 4px
--spacing-sm: 6px
--spacing-md: 8px
--spacing-lg: 12px
--spacing-xl: 16px
--spacing-2xl: 20px
--spacing-3xl: 24px
--spacing-4xl: 32px
--spacing-5xl: 40px
--spacing-6xl: 48px
--spacing-7xl: 64px
--spacing-8xl: 80px
--spacing-9xl: 96px
--spacing-10xl: 128px
--spacing-11xl: 160px

---

## Radius (px)

--radius-none: 0
--radius-xxs: 2px
--radius-xs: 4px
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 8px
--radius-xl: 8px
--radius-2xl: 8px
--radius-3xl: 10px
--radius-4xl: 12px

---

## Widths / Containers (px)

--width-xxs: 320px
--width-xs: 384px
--width-sm: 480px
--width-md: 560px
--width-lg: 640px
--width-xl: 768px
--width-2xl: 1024px
--width-3xl: 1280px
--width-4xl: 1440px
--width-5xl: 1600px
--width-6xl: 1920px
--container-padding-mobile: 16px
--container-padding-desktop: 32px
--container-max-width-desktop: 1280px

---

## Colors — Semantic

These are the tokens to reach for first when generating HTML.

### Text
--color-text-primary: #201f1e
--color-text-secondary: #4a4745
--color-text-tertiary: #6a6662
--color-text-brand-secondary: #002000
--color-text-error-primary: #981d14
--color-text-success-primary: #1e5a3d

### Background
--color-bg-primary: #ffffff
--color-bg-secondary: #fbfaf9
--color-bg-white: #ffffff
--color-bg-brand-primary-alt: #f5f6ea

### Foreground (icons, decorative fills)
--color-fg-primary: #201f1e
--color-fg-brand-primary: #0f2805

### Border
--color-border-primary: #dbd6d1
--color-border-secondary: #edebe8

---

## Colors — Utility (named scales, 25→950)

Use these for component variants (badges, buttons, status pills) where a full ramp is needed. Each scale is monotonic; 25 is the lightest tint, 950 is the deepest shade.

### Brand (olive-green primary)
--utility-brand-25: #f5f6ea
--utility-brand-50: #ecf0db
--utility-brand-100: #c9d29c
--utility-brand-200: #abb67d
--utility-brand-300: #93a05e
--utility-brand-400: #828750
--utility-brand-500: #4e582d
--utility-brand-600: #0f2805
--utility-brand-700: #002000
--utility-brand-800: #001700
--utility-brand-900: #081403
--utility-brand-950: #061002

### Brand Secondary (warm beige)
--utility-brand-secondary-25: #fbfaf9
--utility-brand-secondary-50: #f9f6f1
--utility-brand-secondary-100: #f6f1ea
--utility-brand-secondary-200: #efe8dc
--utility-brand-secondary-300: #ede4d4
--utility-brand-secondary-400: #e2d6c1
--utility-brand-secondary-500: #d1c3ab
--utility-brand-secondary-600: #bcb19e
--utility-brand-secondary-700: #a79e8e
--utility-brand-secondary-800: #766f60
--utility-brand-secondary-900: #39352d
--utility-brand-secondary-950: #1f1b14

### Brand Tertiary (muted tan)
--utility-brand-tertiary-25: #f9f6f0
--utility-brand-tertiary-50: #f0e9db
--utility-brand-tertiary-100: #ded2ba
--utility-brand-tertiary-200: #c4b58c
--utility-brand-tertiary-300: #b3a378
--utility-brand-tertiary-400: #a19164
--utility-brand-tertiary-500: #938256
--utility-brand-tertiary-600: #847347
--utility-brand-tertiary-700: #6a5a32
--utility-brand-tertiary-800: #4c4123
--utility-brand-tertiary-900: #2e2814
--utility-brand-tertiary-950: #181408

### Gray (neutral)
--utility-gray-25: #fbfaf9
--utility-gray-50: #f7f5f3
--utility-gray-100: #f2f0ee
--utility-gray-200: #edebe8
--utility-gray-300: #dbd6d1
--utility-gray-400: #b4ada7
--utility-gray-500: #9f9993
--utility-gray-600: #6a6662
--utility-gray-700: #4a4745
--utility-gray-800: #2f2e2d
--utility-gray-900: #201f1e
--utility-gray-950: #151414

### Error
--utility-error-25: #faf0f0
--utility-error-50: #f6e2e0
--utility-error-100: #f1d3d1
--utility-error-200: #e7b6b2
--utility-error-300: #dc7b74
--utility-error-400: #c3483f
--utility-error-500: #b72318
--utility-error-600: #981d14
--utility-error-700: #7a1710
--utility-error-800: #5c120c
--utility-error-900: #3d0c08
--utility-error-950: #250705

### Warning
--utility-warning-25: #fdf0e3
--utility-warning-50: #fbe5d0
--utility-warning-100: #f9d6b3
--utility-warning-200: #f7c797
--utility-warning-300: #f4b271
--utility-warning-400: #f2a354
--utility-warning-500: #f09437
--utility-warning-600: #d37c25
--utility-warning-700: #9d5206
--utility-warning-800: #753e05
--utility-warning-900: #572e04
--utility-warning-950: #381f05

### Success
--utility-success-25: #f1f5f3
--utility-success-50: #e7eeeb
--utility-success-100: #d3e2db
--utility-success-200: #b6cec2
--utility-success-300: #8bb19e
--utility-success-400: #498467
--utility-success-500: #246c49
--utility-success-600: #1e5a3d
--utility-success-700: #184831
--utility-success-800: #123625
--utility-success-900: #0c2418
--utility-success-950: #07160f

### Jade green
--utility-jade-green-25: #eaf8f1
--utility-jade-green-50: #c1ead5
--utility-jade-green-100: #90d8b5
--utility-jade-green-200: #58c490
--utility-jade-green-300: #2faa70
--utility-jade-green-400: #1fa068
--utility-jade-green-500: #199060
--utility-jade-green-600: #127848
--utility-jade-green-700: #085c34
--utility-jade-green-800: #054020
--utility-jade-green-900: #03280f
--utility-jade-green-950: #011508

### Warm Blue
--utility-warm-blue-25: #f5f7fa
--utility-warm-blue-50: #e8f0f8
--utility-warm-blue-100: #cedcea
--utility-warm-blue-200: #b5c7d9
--utility-warm-blue-300: #9cb3c9
--utility-warm-blue-400: #7e9cb9
--utility-warm-blue-500: #6688a8
--utility-warm-blue-600: #567898
--utility-warm-blue-700: #406481
--utility-warm-blue-800: #2d4c64
--utility-warm-blue-900: #193548
--utility-warm-blue-950: #0d2030

### Steel Blue
--utility-steel-blue-25: #ebf2fb
--utility-steel-blue-50: #c4dcee
--utility-steel-blue-100: #96c0e8
--utility-steel-blue-200: #6ca4ce
--utility-steel-blue-300: #4e84b4
--utility-steel-blue-400: #3870a8
--utility-steel-blue-500: #2e5a86
--utility-steel-blue-600: #22456c
--utility-steel-blue-700: #183252
--utility-steel-blue-800: #10223a
--utility-steel-blue-900: #060c16
--utility-steel-blue-950: #020818

### Pigeon Blue
--utility-pigeon-blue-25: #f2f3f6
--utility-pigeon-blue-50: #e9ecf1
--utility-pigeon-blue-100: #bcc6d9
--utility-pigeon-blue-200: #9aacc4
--utility-pigeon-blue-300: #7b91b0
--utility-pigeon-blue-400: #6879a0
--utility-pigeon-blue-500: #566091
--utility-pigeon-blue-600: #4a5880
--utility-pigeon-blue-700: #313c61
--utility-pigeon-blue-800: #303c60
--utility-pigeon-blue-900: #1a2244
--utility-pigeon-blue-950: #10152b

### Royal violet
--utility-royal-violet-25: #f4effa
--utility-royal-violet-50: #e3d8f3
--utility-royal-violet-100: #d2c0e7
--utility-royal-violet-200: #b7a0d1
--utility-royal-violet-300: #8d75a8
--utility-royal-violet-400: #684d82
--utility-royal-violet-500: #533a6b
--utility-royal-violet-600: #453059
--utility-royal-violet-700: #372747
--utility-royal-violet-800: #291d36
--utility-royal-violet-900: #1c1324
--utility-royal-violet-950: #100c15

### Plum
--utility-plum-25: #f6edf6
--utility-plum-50: #e8d3e8
--utility-plum-100: #d4b0d4
--utility-plum-200: #ba8aba
--utility-plum-300: #9e659e
--utility-plum-400: #7e4a7e
--utility-plum-500: #632e64
--utility-plum-600: #502150
--utility-plum-700: #3d183d
--utility-plum-800: #2c102c
--utility-plum-900: #140614
--utility-plum-950: #08030a

### Mulberry
--utility-mulberry-25: #fcf0f7
--utility-mulberry-50: #f8e0ee
--utility-mulberry-100: #f2c0dc
--utility-mulberry-200: #e898c4
--utility-mulberry-300: #d068a8
--utility-mulberry-400: #b84490
--utility-mulberry-500: #a03c7a
--utility-mulberry-600: #7a2858
--utility-mulberry-700: #601840
--utility-mulberry-800: #440c2c
--utility-mulberry-900: #2c041a
--utility-mulberry-950: #180418

### Crimson magenta
--utility-crimson-magenta-25: #fef5f8
--utility-crimson-magenta-50: #fce8ef
--utility-crimson-magenta-100: #fac1d0
--utility-crimson-magenta-200: #f090b1
--utility-crimson-magenta-300: #e05889
--utility-crimson-magenta-400: #d13060
--utility-crimson-magenta-500: #c01848
--utility-crimson-magenta-600: #970c34
--utility-crimson-magenta-700: #720325
--utility-crimson-magenta-800: #500018
--utility-crimson-magenta-900: #30000e
--utility-crimson-magenta-950: #1a0008

### Rose
--utility-rose-25: #fdf3f4
--utility-rose-50: #f9d6dc
--utility-rose-100: #f1b0bb
--utility-rose-200: #e58998
--utility-rose-300: #d47886
--utility-rose-400: #c2687b
--utility-rose-500: #a85564
--utility-rose-600: #8c3f4e
--utility-rose-700: #702c3a
--utility-rose-800: #551c29
--utility-rose-900: #3a101a
--utility-rose-950: #240810

### Orange
--utility-orange-25: #fef3ea
--utility-orange-50: #fde0c8
--utility-orange-100: #fac49c
--utility-orange-200: #f5a06a
--utility-orange-300: #fb803a
--utility-orange-400: #ec7020
--utility-orange-500: #e8620a
--utility-orange-600: #c44e04
--utility-orange-700: #9e3c02
--utility-orange-800: #782c01
--utility-orange-900: #581f00
--utility-orange-950: #391300

### Terracotta
--utility-terracotta-25: #fbf1ec
--utility-terracotta-50: #f7e4de
--utility-terracotta-100: #edbba8
--utility-terracotta-200: #e19881
--utility-terracotta-300: #d07658
--utility-terracotta-400: #c0624a
--utility-terracotta-500: #a8503a
--utility-terracotta-600: #8e3e2c
--utility-terracotta-700: #743020
--utility-terracotta-800: #5a2316
--utility-terracotta-900: #42170e
--utility-terracotta-950: #2c0d07

### Lime
--utility-lime-25: #eff5e6
--utility-lime-50: #dfe8cf
--utility-lime-100: #cad9b0
--utility-lime-200: #b0c688
--utility-lime-300: #96b460
--utility-lime-400: #7ba139
--utility-lime-500: #62882e
--utility-lime-600: #51760e
--utility-lime-700: #415f0b
--utility-lime-800: #314709
--utility-lime-900: #202f06
--utility-lime-950: #131c03

### Teal
--utility-teal-25: #ebfbfa
--utility-teal-50: #c0eef2
--utility-teal-100: #88dce6
--utility-teal-200: #52ccd8
--utility-teal-300: #2abcca
--utility-teal-400: #1ab2bf
--utility-teal-500: #14a7b8
--utility-teal-600: #0c8898
--utility-teal-700: #0a6e7e
--utility-teal-800: #085464
--utility-teal-900: #063a48
--utility-teal-950: #03202a

### Harbor Teal
--utility-harbor-teal-25: #eaf0f2
--utility-harbor-teal-50: #ccdde2
--utility-harbor-teal-100: #a8c8d2
--utility-harbor-teal-200: #7aafc0
--utility-harbor-teal-300: #4e96aa
--utility-harbor-teal-400: #2e7e94
--utility-harbor-teal-500: #1a6878
--utility-harbor-teal-600: #145660
--utility-harbor-teal-700: #0f444c
--utility-harbor-teal-800: #0a3238
--utility-harbor-teal-900: #072228
--utility-harbor-teal-950: #041418

---

## Colors — Base

--color-white: #ffffff
--color-black: #000000
--color-transparent: #ffffff00

---

## Colors — Alpha

Use sparingly — mostly for overlays, hover wash, and focus halos.

### Black
--alpha-black-05: #0000000d
--alpha-black-10: #0000001a

### White
--alpha-white-30: #ffffff4d

### Brand primary
--alpha-brand-05: #4e582d0d
--alpha-brand-10: #4e582d1a
--alpha-brand-20: #4e582d33
--alpha-brand-30: #4e582d4d
--alpha-brand-40: #4e582d66
--alpha-brand-50: #4e582d80
--alpha-brand-60: #4e582d99
--alpha-brand-70: #4e582db2
--alpha-brand-80: #4e582dcc
--alpha-brand-90: #4e582de5
--alpha-brand-100: #4e582d

### Brand secondary
--alpha-brand-secondary-05: #e5dbc70d
--alpha-brand-secondary-10: #e5dbc71a
--alpha-brand-secondary-20: #e5dbc733
--alpha-brand-secondary-30: #e5dbc74d
--alpha-brand-secondary-40: #e5dbc766
--alpha-brand-secondary-50: #e5dbc780
--alpha-brand-secondary-60: #e5dbc799
--alpha-brand-secondary-70: #e5dbc7b2
--alpha-brand-secondary-80: #e5dbc7cc
--alpha-brand-secondary-90: #e5dbc7e5
--alpha-brand-secondary-100: #e5dbc7

### Error
--alpha-error-05: #b723180d
--alpha-error-10: #b723181a
--alpha-error-20: #b7231833
--alpha-error-30: #b723184d
--alpha-error-40: #b7231866
--alpha-error-50: #b7231880
--alpha-error-60: #b7231899
--alpha-error-70: #b72318b2
--alpha-error-80: #b72318cc
--alpha-error-90: #b72318e5
--alpha-error-100: #b72318

### Gray
--alpha-gray-05: #9f99930d
--alpha-gray-10: #9f99931a
--alpha-gray-20: #9f999333
--alpha-gray-30: #9f99934d
--alpha-gray-40: #9f999366
--alpha-gray-50: #9f999380
--alpha-gray-60: #9f999399
--alpha-gray-70: #9f9993b2
--alpha-gray-80: #9f9993cc
--alpha-gray-90: #9f9993e5
--alpha-gray-100: #9f9993

### Success
--alpha-success-05: #1076450d
--alpha-success-10: #1076451a
--alpha-success-20: #10764533
--alpha-success-30: #1076454d
--alpha-success-40: #10764566
--alpha-success-50: #10764580
--alpha-success-60: #10764599
--alpha-success-70: #107645b2
--alpha-success-80: #107645cc
--alpha-success-90: #107645e5
--alpha-success-100: #107645

---

## Shadows

Elevation scale — CSS `box-shadow` values. Resolved from Figma `Effect` definitions; gray-shadow colors inlined.

--shadow-xs: 0 1px 2px 0 #edebe8
--shadow-sm: 0 1px 2px 0 #edebe8, 0 1px 3px 0 #edebe8
--shadow-md: 0 2px 4px -2px #edebe8, 0 4px 8px -2px #edebe8
--shadow-lg: 0 4px 12px -2px #dbd6d1, 0 12px 12px -80px #dbd6d1
--shadow-xl: 0 8px 8px -4px #edebe8, 0 20px 24px -4px #edebe8
--shadow-2xl: 0 24px 48px -12px #dbd6d1
--shadow-3xl: 0 32px 64px -12px #b4ada7

### Focus rings (use as the OUTLINE shadow on focused inputs/buttons)
--focus-ring-brand: 0 0 0 4px #efe8dc
--focus-ring-gray: 0 0 0 4px #dbd6d1
--focus-ring-error: 0 0 0 4px #f1d3d1
--focus-ring-success: 0 0 0 4px #d3e2db

### Backdrop blurs (radius, in px)
--backdrop-blur-sm: 8px
--backdrop-blur-md: 16px
--backdrop-blur-lg: 24px
--backdrop-blur-xl: 40px
