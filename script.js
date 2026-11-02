// =====================================================
// NENDAR LINK PAGE
// Edit your links here — no need to change the HTML.
// =====================================================

const links = [
  { icon: "🔴", title: "Live Streaming", description: "Tonton saya live sekarang!", url: "#" },
  { icon: "♪", title: "TikTok", description: "Follow akun saya", url: "#" },
  { icon: "▶", title: "YouTube", description: "Video terbaru", url: "#" },
  { icon: "💬", title: "WhatsApp", description: "Hubungi saya", url: "#" },
  { icon: "🎮", title: "Game & Emulator", description: "Download & Info", url: "#" }
];

const socials = [
  { icon: "♪", label: "TikTok", url: "#" },
  { icon: "▶", label: "YouTube", url: "#" },
  { icon: "◎", label: "Instagram", url: "#" },
  { icon: "☁", label: "Discord", url: "#" }
];

const linksEl = document.getElementById("links");
links.forEach(item => {
  const a = document.createElement("a");
  a.className = "link-card";
  a.href = item.url;
  a.target = item.url.startsWith("http") ? "_blank" : "_self";
  a.rel = "noopener noreferrer";
  a.innerHTML = `
    <span class="link-icon">${item.icon}</span>
    <span class="link-text">
      <strong>${item.title}</strong>
      <small>${item.description}</small>
    </span>
    <span class="chevron">›</span>
  `;
  linksEl.appendChild(a);
});

const socialEl = document.getElementById("socialLinks");
socials.forEach(item => {
  const a = document.createElement("a");
  a.href = item.url;
  a.title = item.label;
  a.setAttribute("aria-label", item.label);
  a.target = item.url.startsWith("http") ? "_blank" : "_self";
  a.rel = "noopener noreferrer";
  a.textContent = item.icon;
  socialEl.appendChild(a);
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "☾";
});
