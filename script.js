/* =========================================================
   NENDAR LINK IN BIO
   GitHub Pages + Supabase
   ========================================================= */


/* =========================================================
   SUPABASE CONFIG
   ========================================================= */

const SUPABASE_URL = "https://arcnrdjnlxcauhiplgfr.supabase.co";
const SUPABASE_KEY = "sb_publishable_lMT3wM9dhoC6nuF5-b5w5g_suNRS3qD";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* =========================================================
   ELEMENTS
   ========================================================= */

const linksContainer = document.getElementById("links");
const socialContainer = document.getElementById("socialLinks");

const profileName = document.getElementById("profileName");
const profileSubtitle = document.getElementById("profileSubtitle");
const profileBio = document.getElementById("profileBio");
const profileAvatar = document.getElementById("profileAvatar");

const themeToggle = document.getElementById("themeToggle");


/* =========================================================
   DEFAULT DATA
   Dipakai sebagai fallback jika Supabase gagal
   ========================================================= */

const defaultProfile = {
  name: "Nendar",
  subtitle: "Gaming • Creator",
  bio: "Terima kasih sudah berkunjung!",
  avatar_url: "profile.png"
};


const defaultLinks = [
  {
    title: "Live Streaming",
    description: "Tonton saya live sekarang!",
    url: "#",
    icon: "🔴"
  },
  {
    title: "TikTok",
    description: "Follow akun saya",
    url: "#",
    icon: "🎵"
  },
  {
    title: "YouTube",
    description: "Video terbaru",
    url: "#",
    icon: "▶️"
  }
];


const defaultSocials = [
  /*
  {
    platform: "TikTok",
    url: "#",
    icon: "♪"
  },
  {
    platform: "YouTube",
    url: "#",
    icon: "▶"
  }
  */
];


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

  setupThemeToggle();

  loadSavedTheme();

  await loadWebsiteData();

});


/* =========================================================
   LOAD ALL DATA FROM SUPABASE
   ========================================================= */

async function loadWebsiteData() {

  try {

    const [
      profileResult,
      linksResult,
      socialsResult,
      themeResult
    ] = await Promise.all([

      supabaseClient
        .from("profiles")
        .select("*")
        .limit(1)
        .maybeSingle(),

      supabaseClient
        .from("links")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),

      supabaseClient
        .from("socials")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),

      supabaseClient
        .from("themes")
        .select("*")
        .limit(1)
        .maybeSingle()

    ]);


    /* -----------------------------------------------------
       PROFILE
       ----------------------------------------------------- */

    if (profileResult.error) {

      console.error(
        "Gagal mengambil profile:",
        profileResult.error
      );

      applyProfile(defaultProfile);

    } else {

      applyProfile(
        profileResult.data || defaultProfile
      );

    }


    /* -----------------------------------------------------
       LINKS
       ----------------------------------------------------- */

    if (linksResult.error) {

      console.error(
        "Gagal mengambil links:",
        linksResult.error
      );

      applyLinks(defaultLinks);

    } else {

      const links =
        linksResult.data &&
        linksResult.data.length > 0
          ? linksResult.data
          : defaultLinks;

      applyLinks(links);

    }


    /* -----------------------------------------------------
       SOCIALS
       ----------------------------------------------------- */

    if (socialsResult.error) {

      console.error(
        "Gagal mengambil socials:",
        socialsResult.error
      );

      applySocials(defaultSocials);

    } else {

      const socials =
        socialsResult.data &&
        socialsResult.data.length > 0
          ? socialsResult.data
          : defaultSocials;

      applySocials(socials);

    }


    /* -----------------------------------------------------
       THEME
       ----------------------------------------------------- */

    if (themeResult.error) {

      console.error(
        "Gagal mengambil theme:",
        themeResult.error
      );

    } else if (themeResult.data) {

      applyTheme(themeResult.data);

    }

  } catch (error) {

    console.error(
      "Terjadi error saat memuat website:",
      error
    );

    /*
     * Kalau Supabase gagal total,
     * website tetap menampilkan konten default.
     */

    applyProfile(defaultProfile);
    applyLinks(defaultLinks);
    applySocials(defaultSocials);

  }

}


/* =========================================================
   APPLY PROFILE
   ========================================================= */

function applyProfile(profile) {

  const name =
    profile.name ||
    defaultProfile.name;

  const subtitle =
    profile.subtitle ||
    defaultProfile.subtitle;

  const bio =
    profile.bio ||
    defaultProfile.bio;

  const avatar =
    profile.avatar_url ||
    defaultProfile.avatar_url;


  profileName.textContent = name;

  /*
   * Subtitle
   * Mengubah tanda • menjadi span agar
   * tampilan tetap sama dengan desain lama.
   */

  const subtitleParts = subtitle.split("•");

  if (subtitleParts.length >= 2) {

    profileSubtitle.innerHTML =
      `${escapeHtml(subtitleParts[0].trim())}
       <span>•</span>
       ${escapeHtml(subtitleParts.slice(1).join("•").trim())}`;

  } else {

    profileSubtitle.textContent = subtitle;

  }


  profileBio.textContent = bio;


  if (avatar) {

    profileAvatar.src = avatar;

  }

}


/* =========================================================
   APPLY LINKS
   ========================================================= */

function applyLinks(links) {

  linksContainer.innerHTML = "";


  if (!links || links.length === 0) {

    linksContainer.innerHTML = `
      <div class="empty-state">
        Belum ada link.
      </div>
    `;

    return;

  }


  links.forEach((link) => {

    const card = document.createElement("a");

    card.className = "link-card";

    /*
     * Jika URL kosong,
     * jangan biarkan browser error.
     */

    const url =
      link.url &&
      link.url.trim() !== ""
        ? link.url
        : "#";


    card.href = url;


    /*
     * Link eksternal dibuka di tab baru.
     */

    if (
      url !== "#" &&
      !url.startsWith(window.location.origin)
    ) {

      card.target = "_blank";
      card.rel = "noopener noreferrer";

    }


    const icon =
      link.icon ||
      "🔗";


    const title =
      link.title ||
      "Link";


    const description =
      link.description ||
      "";


    card.innerHTML = `
      <div class="link-icon">
        ${escapeHtml(icon)}
      </div>

      <div class="link-content">

        <div class="link-title">
          ${escapeHtml(title)}
        </div>

        ${
          description
            ? `
              <div class="link-description">
                ${escapeHtml(description)}
              </div>
            `
            : ""
        }

      </div>

      <div class="link-arrow">
        →
      </div>
    `;


    linksContainer.appendChild(card);

  });

}


/* =========================================================
   APPLY SOCIALS
   ========================================================= */

function applySocials(socials) {

  socialContainer.innerHTML = "";


  /*
   * Kalau belum ada social media,
   * sembunyikan section agar tidak kosong.
   */

  if (!socials || socials.length === 0) {

    const socialSection =
      document.querySelector(".social");

    if (socialSection) {
      socialSection.style.display = "none";
    }

    return;

  }


  const socialSection =
    document.querySelector(".social");

  if (socialSection) {
    socialSection.style.display = "";
  }


  socials.forEach((social) => {

    const item = document.createElement("a");

    item.className = "social-link";

    item.href =
      social.url &&
      social.url.trim() !== ""
        ? social.url
        : "#";


    item.target = "_blank";

    item.rel =
      "noopener noreferrer";


    const icon =
      social.icon ||
      getSocialIcon(social.platform);


    item.setAttribute(
      "aria-label",
      social.platform || "Social media"
    );


    item.title =
      social.platform || "Social media";


    item.innerHTML = `
      <span>
        ${escapeHtml(icon)}
      </span>
    `;


    socialContainer.appendChild(item);

  });

}


/* =========================================================
   SOCIAL ICON FALLBACK
   ========================================================= */

function getSocialIcon(platform) {

  if (!platform) {
    return "🔗";
  }


  const name =
    platform.toLowerCase();


  if (name.includes("tiktok")) {
    return "♪";
  }


  if (name.includes("youtube")) {
    return "▶";
  }


  if (name.includes("instagram")) {
    return "◎";
  }


  if (name.includes("facebook")) {
    return "f";
  }


  if (name.includes("whatsapp")) {
    return "☏";
  }


  if (name.includes("telegram")) {
    return "➤";
  }


  if (name.includes("discord")) {
    return "◉";
  }


  if (name.includes("x")) {
    return "𝕏";
  }


  return "🔗";

}


/* =========================================================
   APPLY THEME
   ========================================================= */

function applyTheme(theme) {

  if (!theme) {
    return;
  }


  const root =
    document.documentElement;


  /*
   * Warna utama
   */

  if (theme.primary_color) {

    root.style.setProperty(
      "--primary-color",
      theme.primary_color
    );

  }


  /*
   * Warna kedua
   */

  if (theme.secondary_color) {

    root.style.setProperty(
      "--secondary-color",
      theme.secondary_color
    );

  }


  /*
   * Background type
   */

  if (theme.background_type) {

    document.body.dataset.background =
      theme.background_type;

  }


  /*
   * Card style
   */

  if (theme.card_style) {

    document.body.dataset.cardStyle =
      theme.card_style;

  }


  /*
   * Dark mode dari database
   *
   * Hanya diterapkan kalau belum ada
   * preferensi tema tersimpan di browser.
   */

  const savedTheme =
    localStorage.getItem("nendar-theme");


  if (!savedTheme) {

    if (theme.dark_mode === false) {

      document.documentElement
        .setAttribute(
          "data-theme",
          "light"
        );

      updateThemeButton(false);

    } else {

      document.documentElement
        .setAttribute(
          "data-theme",
          "dark"
        );

      updateThemeButton(true);

    }

  }

}


/* =========================================================
   THEME TOGGLE
   ========================================================= */

function setupThemeToggle() {

  if (!themeToggle) {
    return;
  }


  themeToggle.addEventListener(
    "click",
    () => {

      const current =
        document.documentElement
          .getAttribute("data-theme");


      const isDark =
        current !== "light";


      if (isDark) {

        document.documentElement
          .setAttribute(
            "data-theme",
            "light"
          );

        localStorage.setItem(
          "nendar-theme",
          "light"
        );

        updateThemeButton(false);

      } else {

        document.documentElement
          .setAttribute(
            "data-theme",
            "dark"
          );

        localStorage.setItem(
          "nendar-theme",
          "dark"
        );

        updateThemeButton(true);

      }

    }
  );

}


/* =========================================================
   LOAD SAVED THEME
   ========================================================= */

function loadSavedTheme() {

  const savedTheme =
    localStorage.getItem(
      "nendar-theme"
    );


  if (!savedTheme) {
    return;
  }


  document.documentElement
    .setAttribute(
      "data-theme",
      savedTheme
    );


  updateThemeButton(
    savedTheme === "dark"
  );

}


/* =========================================================
   THEME BUTTON ICON
   ========================================================= */

function updateThemeButton(isDark) {

  if (!themeToggle) {
    return;
  }


  if (isDark) {

    themeToggle.textContent = "☀";

    themeToggle.setAttribute(
      "aria-label",
      "Aktifkan mode terang"
    );

    themeToggle.setAttribute(
      "title",
      "Aktifkan mode terang"
    );

  } else {

    themeToggle.textContent = "☾";

    themeToggle.setAttribute(
      "aria-label",
      "Aktifkan mode gelap"
    );

    themeToggle.setAttribute(
      "title",
      "Aktifkan mode gelap"
    );

  }

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}
