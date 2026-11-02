// ==========================================
// SUPABASE CONFIG
// ==========================================

const SUPABASE_URL = "MASUKKAN_SUPABASE_URL";
const SUPABASE_KEY = "MASUKKAN_SUPABASE_PUBLISHABLE_KEY";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================================
// DEFAULT DATA
// Dipakai jika database belum tersedia
// ==========================================

const defaultProfile = {
  name: "Nendar",
  subtitle: "Gaming • Creator",
  bio: "Terima kasih sudah berkunjung!",
  avatar_url: "profile.png"
};


// ==========================================
// LOAD WEBSITE DATA
// ==========================================

async function loadWebsiteData() {

  try {

    // --------------------------------------
    // PROFILE
    // --------------------------------------

    const { data: profile, error: profileError } =
      await supabaseClient
        .from("profiles")
        .select("*")
        .limit(1)
        .single();

    if (profileError) {
      console.error("Profile error:", profileError);
    }


    // --------------------------------------
    // LINKS
    // --------------------------------------

    const { data: links, error: linksError } =
      await supabaseClient
        .from("links")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

    if (linksError) {
      console.error("Links error:", linksError);
    }


    // --------------------------------------
    // SOCIALS
    // --------------------------------------

    const { data: socials, error: socialsError } =
      await supabaseClient
        .from("socials")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

    if (socialsError) {
      console.error("Socials error:", socialsError);
    }


    // --------------------------------------
    // THEME
    // --------------------------------------

    const { data: theme, error: themeError } =
      await supabaseClient
        .from("themes")
        .select("*")
        .limit(1)
        .single();

    if (themeError) {
      console.error("Theme error:", themeError);
    }


    // --------------------------------------
    // APPLY PROFILE
    // --------------------------------------

    applyProfile(profile || defaultProfile);


    // --------------------------------------
    // APPLY LINKS
    // --------------------------------------

    if (links && links.length) {
      applyLinks(links);
    }


    // --------------------------------------
    // APPLY SOCIALS
    // --------------------------------------

    if (socials && socials.length) {
      applySocials(socials);
    }


    // --------------------------------------
    // APPLY THEME
    // --------------------------------------

    if (theme) {
      applyTheme(theme);
    }

  } catch (error) {

    console.error(
      "Gagal mengambil data dari Supabase:",
      error
    );

    applyProfile(defaultProfile);

  }

}


// ==========================================
// PROFILE
// ==========================================

function applyProfile(profile) {

  const nameElement =
    document.querySelector(".profile-name");

  const subtitleElement =
    document.querySelector(".profile-subtitle");

  const bioElement =
    document.querySelector(".profile-bio");

  const avatarElement =
    document.querySelector(".avatar");


  if (nameElement) {
    nameElement.textContent =
      profile.name || defaultProfile.name;
  }


  if (subtitleElement) {
    subtitleElement.textContent =
      profile.subtitle || defaultProfile.subtitle;
  }


  if (bioElement) {
    bioElement.textContent =
      profile.bio || defaultProfile.bio;
  }


  if (
    avatarElement &&
    profile.avatar_url
  ) {

    avatarElement.src =
      profile.avatar_url;

  }

}


// ==========================================
// LINKS
// ==========================================

function applyLinks(links) {

  const container =
    document.querySelector(".links-container");

  if (!container) {
    console.warn("links-container tidak ditemukan.");
    return;
  }

  container.innerHTML = "";


  links.forEach(link => {

    const a =
      document.createElement("a");

    a.href = link.url || "#";

    a.className = "link-card";

    a.target = "_blank";

    a.rel = "noopener noreferrer";


    a.innerHTML = `

      <div class="link-icon">
        ${link.icon || "🔗"}
      </div>

      <div class="link-content">

        <div class="link-title">
          ${escapeHtml(link.title || "")}
        </div>

        ${
          link.description
          ?
          `<div class="link-description">
             ${escapeHtml(link.description)}
           </div>`
          :
          ""
        }

      </div>

    `;


    container.appendChild(a);

  });

}


// ==========================================
// SOCIAL MEDIA
// ==========================================

function applySocials(socials) {

  const container =
    document.querySelector(".social-links");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  socials.forEach(social => {

    const a =
      document.createElement("a");

    a.href = social.url || "#";

    a.target = "_blank";

    a.rel = "noopener noreferrer";

    a.className = "social-link";

    a.setAttribute(
      "aria-label",
      social.platform || "Social"
    );

    a.innerHTML =
      social.icon || "🔗";


    container.appendChild(a);

  });

}


// ==========================================
// THEME
// ==========================================

function applyTheme(theme) {

  const root =
    document.documentElement;


  if (theme.primary_color) {

    root.style.setProperty(
      "--primary-color",
      theme.primary_color
    );

  }


  if (theme.secondary_color) {

    root.style.setProperty(
      "--secondary-color",
      theme.secondary_color
    );

  }


  if (theme.card_style) {

    document.body.dataset.cardStyle =
      theme.card_style;

  }


  if (theme.background_type) {

    document.body.dataset.background =
      theme.background_type;

  }

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(value) {

  return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}


// ==========================================
// START
// ==========================================

loadWebsiteData();
