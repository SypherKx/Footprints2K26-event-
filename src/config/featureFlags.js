// Feature flags for enabling/disabling features
// Set to true to enable Firebase authentication features
// Set to false to disable them (for static website mode)

export const ENABLE_AUTH = false;

// ╔══════════════════════════════════════════════════════════╗
// ║  BACK TO NORMAL?  Just change true → false below.      ║
// ║  That's it. The entire original site comes back.        ║
// ║  No code was deleted — it's only hidden with this flag. ║
// ╚══════════════════════════════════════════════════════════╝
// true  = "Thank You / See You in 2K27" farewell screen
// false = Original Footprints 2K26 website (fully restored)
export const FEST_OVER = false;

// When you want to enable Firebase in the future:
// 1. Set ENABLE_AUTH to true
// 2. Make sure .env file has all the Firebase keys
// 3. Restart the dev server
