// ==========================================
// SUPABASE CONFIG
// ==========================================

const SUPABASE_URL = "https://arcnrdjnlxcauhiplgfr.supabase.co";
const SUPABASE_KEY = "sb_publishable_lMT3wM9dhoC6nuF5-b5w5g_suNRS3qD";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================================
// DEFAULT PROFILE
// ==========================================

const defaultProfile = {
  name: "Nendar",
  subtitle: "Gaming • Creator",
  bio: "Terima kasih sudah berkunjung!",
  avatar_url: "profile.png"
};


// ==========================================
// LOAD WEBSITE
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
        .order("sort_order", {
          ascending: true
        });

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
        .order("sort_order", {
          ascending: true
        });

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
    // APPLY DATA
    // --------------------------------------

    applyProfile(profile || defaultProfile);

    applyLinks(links || []);

    applySocials(socials || []);

    if (theme) {
      applyTheme(theme);
    }

  } catch (error) {

    console.error(
      "Gagal mengambil data Supabase:",
      error
    );

    applyProfile(defaultProfile);
  }
}


// ==========================================
// APPLY PROFILE
// ==========================================

function applyProfile(profile) {

  const nameElement =
    document.querySelector(".profile h1");

  const subtitleElement =
    document.querySelector(".profile .subtitle");

  const welcomeElement =
    document.querySelector(".profile .welcome");

  const avatarElement =
    document.querySelector(".avatar");


  // Nama

  if (nameElement) {

    nameElement.textContent =
      profile.name || defaultProfile.name;

  }


  // Subtitle

  if (subtitleElement) {

    subtitleElement.innerHTML =
      escapeHtml(
        profile.subtitle ||
        defaultProfile.subtitle
      ).replace(
        " • ",
        " <span>•</span> "
      );

  }


  // Bio

  if (welcomeElement) {

    welcomeElement.textContent =
      profile.bio ||
      defaultProfile.bio;

  }


  // Foto

  if (
    avatarElement &&
    profile.avatar_url
  ) {

    avatarElement.src =
      profile.avatar_url;

  }
}


// ==========================================
// APPLY LINKS
// ==========================================

function applyLinks(links) {

  const container =
    document.getElementById("links");

  if (!container) {
    return;
  }


  container.innerHTML = "";


  links.forEach(link => {

    const a =
      document.createElement("a");

    a.href =
      link.url || "#";

    a.className =
      "link-card";

    a.target =
      "_blank";

    a.rel =
      "noopener noreferrer";


    a.innerHTML = `

      <div class="link-icon">
        ${escapeHtml(link.icon || "🔗")}
      </div>

      <div class="link-content">

        <div class="link-title">
          ${escapeHtml(link.title || "")}
        </div>

        ${
          link.description
            ? `
              <div class="link-description">
                ${escapeHtml(link.description)}
              </div>
            `
            : ""
        }

      </div>

    `;


    container.appendChild(a);

  });

}


// ==========================================
// APPLY SOCIALS
// ==========================================

function applySocials(socials) {

  const container =
    document.getElementById("socialLinks");

  if (!container) {
    return;
  }


  container.innerHTML = "";


  socials.forEach(social => {

    const a =
      document.createElement("a");

    a.href =
      social.url || "#";

    a.target =
      "_blank";

    a.rel =
      "noopener noreferrer";

    a.className =
      "social-link";

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
// APPLY THEME
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
