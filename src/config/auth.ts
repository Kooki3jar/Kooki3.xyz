// Replace with your actual Google OAuth client ID from Google Cloud Console
export const GOOGLE_CLIENT_ID = '847334290083-vbjgb5fh3eq9ot8qk5s7oo4lc5pbf0h9.apps.googleusercontent.com';

export const GOOGLE_CONFIG = {
  client_id: GOOGLE_CLIENT_ID,
  auto_select: false,
  callback: 'handleCredentialResponse',
  context: 'signin',
  ux_mode: 'popup',
  itp_support: true,
  use_fedcm_for_prompt: false // Disable FedCM to use traditional OAuth flow
};