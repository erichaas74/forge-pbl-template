# Secret scanning alert 2

Investigated 2026-09-15. Alert:
https://github.com/erichaas74/forge-pbl-template/security/secret-scanning/2

## Finding

Commit `5716fed4` includes a generated Chrome profile at
`output/story-writing-week-browser/profile/`. The reported file is
`Default/shared_proto_db/000003.log` inside that profile.

- The reported blob contains one distinct Google API key, repeated 46 times.
- Its SHA-256 fingerprint starts with `a6a72fb29e39`. The key itself is deliberately
  omitted from this report.
- Nearby URLs identify `optimizationguide-pa.googleapis.com`.
- The exact key also occurs in the installed Chrome binaries for versions
  `152.0.7977.83` and `153.0.8010.47`.
- It differs from the key in `src/app/infrastructure/firebase/firebase-client.config.ts`.

This evidence identifies a browser-bundled service key. Alert 2 does not establish
that the LMS's own Google credential was leaked. Chromium's
[Optimization Guide implementation](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/components/optimization_guide/core/optimization_guide_features.cc)
uses the browser API key for that service. No key was sent to an API to test it,
and no key was revoked or rotated.

## Repository remediation

Remove all 371 tracked files in that generated profile from Git's index, keeping
the local files. Ignore browser profile directories under `output/` so future
verification runs do not add them again. Reports and screenshots remain usable.
No application code or Firebase configuration needs to change for this finding.

The cleanup must be committed and pushed to change the repository on GitHub.
Existing historical commits still contain the profile. Removing files in a new
commit does not erase history; see GitHub's
[sensitive-data removal guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).
Rewriting shared history is a separate operation and has not been performed.

Verified locally: all 371 files remain on disk, none remain in the Git index,
and an exact-value scan of the index finds no copies of the flagged key. Ignore
checks cover the current profile and future profile paths while keeping reports
and screenshots eligible for tracking. `git diff --cached --check` passes.
`npm run build` passes with stylesheet budget warnings in unchanged application
files. No runtime behavior, contracts, or tests changed.

## Alert status

The available browser session was signed out of GitHub, so the live alert status
could not be inspected or changed. After reviewing this finding, resolve alert 2
as a false positive for a project-owned secret, with this explanation:

> The detected value is a Chrome-bundled Optimization Guide API key captured in a
> generated browser profile. It matches installed Chrome binaries and differs
> from the application's Firebase key. The generated profile is being removed
> from version control and ignored to prevent recurrence.

This investigation is scoped to alert 2; it does not certify every file in the
historical browser profile as free of sensitive data.
