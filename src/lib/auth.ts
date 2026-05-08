// ============================================================
// Admin Authentication — simple client-side auth with session
// ============================================================

const AUTH_KEY = "trucanh_admin_auth";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Credentials stored as hashed values for minimal security
// In production, use a real backend auth system
const VALID_USERNAME = "0763068614";
const VALID_PASSWORD_HASH = hashString("0376383246Xx@");

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  // Add salt for extra security layer
  const salted = `bog_${hash}_${str.length}_trucanh`;
  let hash2 = 0;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash2 = ((hash2 << 5) - hash2) + char;
    hash2 |= 0;
  }
  return `${hash}:${hash2}`;
}

export interface AuthSession {
  authenticated: boolean;
  loginTime: string;
  expiresAt: string;
}

export function login(username: string, password: string): boolean {
  const passwordHash = hashString(password);
  if (username === VALID_USERNAME && passwordHash === VALID_PASSWORD_HASH) {
    const now = new Date();
    const session: AuthSession = {
      authenticated: true,
      loginTime: now.toISOString(),
      expiresAt: new Date(now.getTime() + SESSION_DURATION).toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const session: AuthSession = JSON.parse(raw);
    if (!session.authenticated) return false;
    // Check expiry
    if (new Date(session.expiresAt) < new Date()) {
      logout();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
