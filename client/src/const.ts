export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  try {
    const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL || "https://auth.manus.im";
    const appId = import.meta.env.VITE_APP_ID || "cryptoguard-ai-dev";
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);

    if (!oauthPortalUrl || oauthPortalUrl === "undefined") {
      console.warn("[OAuth] VITE_OAUTH_PORTAL_URL not set, using default");
      return `https://auth.manus.im/app-auth?appId=${encodeURIComponent(appId)}&redirectUri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&type=signIn`;
    }

    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");

    return url.toString();
  } catch (error) {
    console.error("[OAuth] Error generating login URL:", error);
    return "https://auth.manus.im/app-auth";
  }
};
