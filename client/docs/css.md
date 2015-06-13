CSS
===

For CSS we use BASSCSS as the base style
http://www.basscss.com/

Basic overrides
---------------

Global CSS overrides go in /assets/stylesheets/global.scss

- Do not add specific styles here

Specific styles
---------------

When creating new DOM elements try to use BASSCSS styles first.
Then:

Not sure, we need to keep specific styles contained to the components. We might use a naming convention like:

component /client/comps/shared/NotFound.jsx

Would use a root class:

```
.shared-NotFound
```

### Elements

Elements within a component should be namespaced with `--`, e.g.

```
.shared-NotFound--bigButton
.shared-NotFound--header--title
```

Elements are names using camel came:

```
btnAdd
controlKinds
```

No dashes e.g. `btn-add'

### Modifiers

Modifiers start with a `-`.

e.g.

```
.-active
.-urgent
```

They are applied after the main class:

```
<div class="shared-NotFound -active -urgent">
```

Modifiers should not be global in CSS, e.g.

Bad:

```
.-active { ... }
```

Good:

```
.shared-NotFound {
	&.-active{ ... }
}
```

See example at /client/comps/shared/CssNamings.jsx

Test hooks
----------

Test hook should use a `t-` prefix:

```
<button class="t-btnSave">
```
