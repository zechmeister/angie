---
tags: [component, form]
title: Radio button
layout: layouts/sidebar.njk
---

# Radio button

## Development notes

- add `ds-radio` as base class to a `input[type=radio]` element
- combine with one size modifier: `ds-radio-small` or `ds-radio-mini`
- important: `input` element must be followed by `label` element in the markup

### Code example

```
<input type="radio" value="yes" id="r1" class="ds-radio" />
<label for="r1">Lorem ipsum</label>
```

#### small

```
<input type="radio" value="yes" id="r1" class="ds-radio ds-radio-small" />
<label for="r1">Lorem ipsum</label>
```

#### mini

```
<input type="radio" value="yes" id="r1" class="ds-radio ds-radio-mini" />
<label for="r1">Lorem ipsum</label>
```

#### with multiple lines

If the label text is too long to fit on one line, wrap the radio and label in a container (e.g. a `div` or a `span`) containing nothing else. This will prevent the label text from wrapping under the radio.

```
<div>
  <input type="radio" name="radios" value="4" id="r3" class="ds-radio" />
  <label for="r3">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt
    cursus mi, a dictum magna venenatis vitae. Nunc a sollicitudin libero. In
    a risus iaculis felis eleifend sodales. Morbi ullamcorper congue viverra.
    Aliquam ullamcorper, neque ac rutrum hendrerit, erat mauris euismod quam,
    at aliquam diam mauris et magna.
  </label>
</div>
```

Note that this uses the `has` selector, which is only available on recent versions of Chrome and Safari for now. If you need to support Firefox or older browsers, add the `flex` class to the wrapping container instead.

### Regular size (default)

<div class="ds-stack-24">
  <div>
    <input type="radio" name="radios" value="1" id="r0" checked class="ds-radio" />
    <label for="r0">Lorem ipsum 1</label>
  </div>

  <div>
    <input type="radio" name="radios" value="2" id="r1" class="ds-radio" />
    <label for="r1">Lorem ipsum 2</label>
  </div>

  <div class="flex">
    <input type="radio" name="radios" value="4" id="r3" class="ds-radio" />
    <label for="r3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt
      cursus mi, a dictum magna venenatis vitae. Nunc a sollicitudin libero. In
      a risus iaculis felis eleifend sodales. Morbi ullamcorper congue viverra.
      Aliquam ullamcorper, neque ac rutrum hendrerit, erat mauris euismod quam,
      at aliquam diam mauris et magna.
    </label>
  </div>

  <div>
    <input type="radio" name="radios" value="3" id="r2" disabled class="ds-radio" />
    <label for="r2">Lorem ipsum 3 (disabled)</label>
  </div>
</div>

### Small size

<div class="ds-stack-16">
  <div>
    <input type="radio" name="sradios" value="1" id="sr0" checked class="ds-radio ds-radio-small" />
    <label for="sr0">Lorem ipsum 1</label>
  </div>

  <div>
    <input type="radio" name="sradios" value="2" id="sr1" class="ds-radio ds-radio-small" />
    <label for="sr1">Lorem ipsum 2</label>
  </div>

  <div class="flex">
    <input type="radio" name="sradios" value="4" id="sr3" class="ds-radio ds-radio-small" />
    <label for="sr3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt
      cursus mi, a dictum magna venenatis vitae. Nunc a sollicitudin libero. In
      a risus iaculis felis eleifend sodales. Morbi ullamcorper congue viverra.
      Aliquam ullamcorper, neque ac rutrum hendrerit, erat mauris euismod quam,
      at aliquam diam mauris et magna.
    </label>
  </div>

  <div>
    <input type="radio" name="sradios" value="3" id="sr2" disabled class="ds-radio ds-radio-small" />
    <label for="sr2">Lorem ipsum 3 (disabled)</label>
  </div>
</div>

### Mini size

<div class="ds-stack-8">
  <div>
    <input type="radio" name="mradios" value="1" id="mr0" checked class="ds-radio ds-radio-mini" />
    <label for="mr0">Lorem ipsum 1</label>
  </div>

  <div>
    <input type="radio" name="mradios" value="2" id="mr1" class="ds-radio ds-radio-mini" />
    <label for="mr1">Lorem ipsum 2</label>
  </div>

  <div class="flex">
    <input type="radio" name="mradios" value="4" id="mr3" class="ds-radio ds-radio-mini" />
    <label for="mr3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt
      cursus mi, a dictum magna venenatis vitae. Nunc a sollicitudin libero. In
      a risus iaculis felis eleifend sodales. Morbi ullamcorper congue viverra.
      Aliquam ullamcorper, neque ac rutrum hendrerit, erat mauris euismod quam,
      at aliquam diam mauris et magna.
    </label>
  </div>

  <div>
    <input type="radio" name="mradios" value="3" id="mr2" disabled class="ds-radio ds-radio-mini" />
    <label for="mr2">Lorem ipsum 3 (disabled)</label>
  </div>
</div>

## Further resources

- [MDN: The HTML Radio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
- [GOV.UK Design System - Components - Radios](https://design-system.service.gov.uk/components/radios/)
