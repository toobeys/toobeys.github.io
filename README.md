# Nendar Link Page

Static link-in-bio website designed for GitHub Pages.

## Upload to GitHub Pages

1. Create a GitHub repository.
2. Upload all files and folders from this package.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish.

## Edit links

Open `script.js` and change the `url` values in `links` and `socials`.

Example:

```js
{ icon: "♪", title: "TikTok", description: "Follow akun saya", url: "https://www.tiktok.com/@username" }
```

## Profile image

Replace `assets/profile.png` with your own image. Keep the filename `profile.png`.
