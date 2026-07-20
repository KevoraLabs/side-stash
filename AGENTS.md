# Side Stash — agent notes

## Packaging

When the user asks to package / zip / 打包:

1. Run `npm run zip` (Chrome) and/or `npm run zip:firefox` if requested.
2. After a successful zip, **always open the zip output directory** in Finder:
   ```bash
   open .output
   ```
3. Do **not** open the repository root. Only open `.output/` (where `side-stash-*-chrome.zip` lives).
