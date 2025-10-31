# Task: Fix Dropdown Menu Readability in Registration Forms

## Information Gathered
- **ClientRegistrationForm.jsx**: Uses Tailwind CSS classes for select elements. The select elements for "Industry", "Company Size", "Budget Range", and "Timeline" have classes like `text-lg` but no explicit text color, potentially causing readability issues if inheriting light colors.
- **FreelancerRegistrationForm.jsx**: Uses inline styles for select elements. The "Experience Level" select has `color: "#374151"` (dark gray), which should be readable, but confirming options inherit this color.
- **Issue**: Dropdown text may appear light or unreadable due to default browser styling or background colors.

## Plan
- **Update ClientRegistrationForm.jsx**:
  - Add `text-gray-900` class to all select elements to ensure dark text color for readability.
  - Affected selects: Industry, Company Size, Budget Range, Timeline.
- **Update FreelancerRegistrationForm.jsx**:
  - Ensure select elements have `color: "#374151"` (already present, but verify).
  - Add `color: "#374151"` to option elements if needed for consistency.
- **Testing**: After changes, verify dropdown options are readable in both forms.

## Dependent Files to Edit
- `src/components/shared/auth/ClientRegistrationForm.jsx`
- `src/components/shared/auth/FreelancerRegistrationForm.jsx`

## Followup Steps
- Test the forms by opening the registration pages and checking dropdown readability.
- If issues persist, adjust colors or add custom CSS.
