# Nexigence Legal Center

The legal page on the Nexigence Webflow site loads its content from this repo.

## Files

| File | What it is | Edit it? |
|---|---|---|
| `content.html` | All policy text, the sidebar list, and the styles | Yes, this is the only file you change |
| `legal.js` | Loads `content.html` into the Webflow page and runs the sidebar switching | Rarely |
| `index.html` | Standalone preview page | No |

## One-time setup

1. Create a public GitHub repo, e.g. `nexigence-legal`, and upload these four files to the root.
2. Repo **Settings → Pages → Build and deployment**: Source = "Deploy from a branch", Branch = `main`, folder `/ (root)`. Save.
3. After a minute, the preview is live at `https://YOUR-USERNAME.github.io/nexigence-legal/`.
4. In Webflow, on the `/legal` page, add an **Embed** element with:

```html
<div id="nexigence-legal"></div>
<script src="https://YOUR-USERNAME.github.io/nexigence-legal/legal.js" defer></script>
```

5. Publish the Webflow site. The embed shows as an empty box in the Designer; the content appears on the published or staging site.

## Updating content

Edit `content.html` on GitHub and commit. GitHub Pages republishes in about a minute. No Webflow publish is needed.

## Adding a policy

Copy one `<button class="nxl-tab" data-tab="...">` in the sidebar and one `<section class="nxl-panel" data-panel="...">` in main. Give both the same new name.

## Linking to a specific policy

Use `/legal#` plus the policy name, e.g. `/legal#privacy-policy` or `/legal#cookie-policy`.

## Before going live

Text in gray brackets (class `nxl-ph`) marks details to confirm: dates, email addresses, governing law, liability caps, retention periods, subprocessor names. All policy text is a working draft and needs legal review.
