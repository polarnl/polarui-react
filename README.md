# PolarUI

PolarUI is a component library by PolarNL using TailwindCSS.

Components:

- [x] Button
- [x] Input
- [x] Checkbox with Label
- [x] Dropdown
- [ ] Modal
- [ ] Tabs
- [ ] Tooltip
      and more...

## Installation

```bash
npm install @polarnl/polarui-react
```

## Usage

Import the compiled CSS to get the component styles (this package ships compiled CSS in `dist/styles.css`):

```js
import '@polarnl/polarui-react/styles.css';
```

Or add the import to your global CSS entry so the styles are included in your app build.

## Dropdown

Supports keyboard navigation, controlled/uncontrolled usage, custom option icons (`option.icon`), a custom trigger icon (`chevronIcon`), custom selected icon (`selectedIcon`), and configurable list min width (`listMinWidth`) for better wrapping on narrow triggers.
