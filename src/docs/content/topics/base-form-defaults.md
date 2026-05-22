---
id: form-defaults
title: "Forms"
route: base
order: 200
summary: "Classless native input styling and validation states."
when_to_use: "Building forms with minimal custom classes"
classes:
  - "input"
  - "textarea"
  - "select"
  - ".error"
  - ".success"
  - ".warning"
  - ".row"
  - ".form-actions"
  - ".form-option-row"
  - ".search"
  - ".dropzone"
demos:
  - "FormInputs"
  - "FormCheckboxRadio"
  - "FormDateTime"
  - "FormRange"
  - "FormFile"
  - "FormValidation"
tags:
  - "base"
  - "forms"
---

<span id="forms"></span>

Native controls are styled out of the box, with support for consistent validation classes.

- Prefer semantic form markup (`label`, `fieldset`, help text) before custom wrappers.
- Use `.error`, `.success`, and `.warning` on inputs for validation border colors. `:user-invalid` and `[aria-invalid="true"]` produce the same error styling automatically.
- Use `.stack` for the form's outer vertical rhythm.
- Inside a `<form>` or `<fieldset>`, `.row` is the field-row primitive that groups label + control + caption with tight spacing.
- Reach for `.form-option-row` for inline checkbox/radio rows, `.form-actions` for end-aligned submit/cancel bars, `.search` for inputs that need a magnifier icon, and `.dropzone` for drag-and-drop file uploads. Each has its own topic with full details.
