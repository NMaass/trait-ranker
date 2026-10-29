# October 2026 security remediation

Updated vulnerable direct/transitive dependencies and regenerated the project lockfile. Changes are local until reviewed, merged, and deployed. No production data or credentials were used in validation.

## Validation

Vite production build passed. Jest: 25 passed, including three prototype-poisoning regression cases.

Replaced the obsolete Create React App 4 toolchain with Vite and standalone Jest. Bun is the canonical package manager; use `bun install --frozen-lockfile`, `bun run build`, and `bun run test --runInBand`. The deployment output remains `build/`.

CVE-2026-93753 has no upstream deepmerge fix. The committed Bun patch writes own data properties instead of invoking prototype setters. It covers the CommonJS entry used by Jest and the source entry. The package-version scanner still reports this one low-severity advisory; do not describe the raw scan as clean. Regression tests cover hostile target/source objects and ordinary merge behavior. Advisory: https://github.com/advisories/GHSA-gcqx-w48m-w2h4
