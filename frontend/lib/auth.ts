// MOCK authentication (browser storage only).
// Replace register/login with calls to the real backend login API later.
export interface User {
  name: string;
  contact: string;
}

const SESSION = "annadata-session";
const PROFILE = "annadata-profile";

function read(key: string): User | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function write(key: string, u: User) {
  try {
    localStorage.setItem(key, JSON.stringify(u));
  } catch {
    /* storage not available */
  }
}

export const getUser = (): User => {
  const s = read(SESSION);
  if (s) return s;
  return { name: "Shilpashree R G", contact: "shilpa@greenflow.io" };
};

export function register(name: string, contact: string) {
  const u = { name: name.trim() || "Shilpashree R G", contact: contact.trim() };
  write(PROFILE, u);
  write(SESSION, u);
}

export function login(contact: string) {
  const profile = read(PROFILE);
  const name = profile && profile.contact === contact ? profile.name : "Shilpashree R G";
  write(SESSION, { name, contact });
}

export function updateName(name: string) {
  const s = read(SESSION);
  if (!s) return;
  write(SESSION, { ...s, name });
  write(PROFILE, { ...s, name });
}

export function logout() {
  try {
    localStorage.removeItem(SESSION);
  } catch {
    /* ignore */
  }
}
