const SUPABASE_URL =
  "https://arcnrdjnlxcauhiplgfr.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_lMT3wM9dhoC6nuF5-b5w5g_suNRS3qD";


const supabaseClient =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


const defaultProfile = {
  name: "Nendar",
  subtitle: "Gaming • Creator",
  bio: "Terima kasih sudah berkunjung!",
  avatar_url: null
};


const defaultLinks = [
  {
    title: "Live Streaming",
    description: "Tonton saya live sekarang!",
    url: "#",
    icon: "🔴",
    icon_url: null
  },
  {
    title: "TikTok",
    description: "Follow akun saya",
    url: "#",
    icon: "🎵",
    icon_url: null
  },
  {
    title: "YouTube",
    description: "Video terbaru",
    url: "#",
    icon: "▶️",
    icon_url: null
  }
];


document.addEventListener(
  "DOMContentLoaded",
  init
);


async function init() {

  setupThemeToggle();

  await loadPage();

}


async function loadPage() {

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
        .order(
          "sort_order",
          {
            ascending: true
          }
        ),

      supabaseClient
        .from("socials")
        .select("*")
        .eq("is_active", true)
        .order(
          "sort_order",
          {
            ascending: true
          }
        ),

      supabaseClient
        .from("themes")
        .select("*")
        .limit(1)
        .maybeSingle()

    ]);


    const profile =
      profileResult.data ||
      defaultProfile;


    const links =
      linksResult.data &&
      linksResult.data.length
        ? linksResult.data
        : defaultLinks;


    const socials =
      socialsResult.data ||
      [];


    const theme =
      themeResult.data ||
      null;


    applyProfile(profile);

    renderLinks(links);

    renderSocials(socials);

    applyTheme(theme);


  } catch (error) {

    console.error(
      "Gagal memuat halaman:",
      error
    );


    applyProfile(
      defaultProfile
    );

    renderLinks(
      defaultLinks
    );

  }

}


/* =========================================
   PROFILE
========================================= */

function applyProfile(profile) {

  const title =
    document.querySelector(
      ".profile h1"
    );

  const subtitle =
    document.querySelector(
      ".profile .subtitle"
    );

  const welcome =
    document.querySelector(
      ".profile .welcome"
    );

  const avatar =
    document.querySelector(
      ".avatar"
    );


  if (title) {

    title.textContent =
      profile.name ||
      "Nendar";

  }


  if (subtitle) {

    subtitle.innerHTML =
      escapeHtml(
        profile.subtitle ||
        "Gaming • Creator"
      )
      .replace(
        "•",
        "<span>•</span>"
      );

  }


  if (welcome) {

    welcome.textContent =
      profile.bio ||
      "Terima kasih sudah berkunjung!";

  }


  if (
    avatar &&
    profile.avatar_url
  ) {

    avatar.src =
      profile.avatar_url;

  }

}


/* =========================================
   LINKS
========================================= */

function renderLinks(links) {

  const container =
    document.getElementById(
      "links"
    );


  if (!container) {
    return;
  }


  container.innerHTML = "";


  links.forEach(
    (link) => {

      const card =
        document.createElement(
          "a"
        );


      card.className =
        "link-card";


      card.href =
        link.url || "#";


      card.target =
        "_blank";


      card.rel =
        "noopener noreferrer";


      const media =
        link.icon_url
          ?
          `
          <img
            src="${escapeHtml(link.icon_url)}"
            alt=""
            class="link-icon-image"
          >
          `
          :
          `
          <span class="link-icon">
            ${escapeHtml(
              link.icon || "🔗"
            )}
          </span>
          `;


      card.innerHTML = `

        <div class="link-icon-wrap">

          ${media}

        </div>


        <div class="link-content">

          <div class="link-title">
            ${escapeHtml(
              link.title || ""
            )}
          </div>

          ${
            link.description
              ?
              `
              <div class="link-description">
                ${escapeHtml(
                  link.description
                )}
              </div>
              `
              :
              ""
          }

        </div>


        <div class="link-arrow">
          →
        </div>

      `;


      container.appendChild(
        card
      );

    }
  );

}


/* =========================================
   SOCIAL
========================================= */

function renderSocials(
  socials
) {

  const section =
    document.querySelector(
      ".social"
    );


  const container =
    document.getElementById(
      "socialLinks"
    );


  if (
    !section ||
    !container
  ) {

    return;

  }


  if (!socials.length) {

    section.style.display =
      "none";

    return;

  }


  section.style.display =
    "";


  container.innerHTML = "";


  socials.forEach(
    (social) => {

      const link =
        document.createElement(
          "a"
        );


      link.href =
        social.url || "#";


      link.target =
        "_blank";


      link.rel =
        "noopener noreferrer";


      link.className =
        "social-link";


      link.innerHTML =
        social.icon ||
        social.platform ||
        "🔗";


      container.appendChild(
        link
      );

    }
  );

}


/* =========================================
   THEME
========================================= */

function applyTheme(
  theme
) {

  if (!theme) {
    return;
  }


  const root =
    document.documentElement;


  if (
    theme.primary_color
  ) {

    root.style.setProperty(
      "--primary-color",
      theme.primary_color
    );

  }


  if (
    theme.secondary_color
  ) {

    root.style.setProperty(
      "--secondary-color",
      theme.secondary_color
    );

  }


  if (
    theme.background_type
  ) {

    document.body.dataset
      .background =
      theme.background_type;

  }

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

function setupThemeToggle() {

  const button =
    document.getElementById(
      "themeToggle"
    );


  if (!button) {
    return;
  }


  const savedTheme =
    localStorage.getItem(
      "nendar-theme"
    );


  if (
    savedTheme === "light"
  ) {

    document.body.classList
      .add("light-mode");

    button.textContent =
      "☀";

  }


  button.addEventListener(
    "click",
    function () {

      document.body.classList
        .toggle(
          "light-mode"
        );


      const isLight =
        document.body.classList
          .contains(
            "light-mode"
          );


      localStorage.setItem(
        "nendar-theme",
        isLight
          ? "light"
          : "dark"
      );


      button.textContent =
        isLight
          ? "☀"
          : "☾";

    }
  );

}


/* =========================================
   ESCAPE
========================================= */

function escapeHtml(value) {

  return String(value || "")
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}
