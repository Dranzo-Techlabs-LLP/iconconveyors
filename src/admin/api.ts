const TOKEN_KEY = "icon_admin_token";

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY) || "";
}
export function setToken(t: string) {
  sessionStorage.setItem(TOKEN_KEY, t);
}
export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export async function api<T>(
  path: string,
  opts: RequestInit = {},
  isJson = true
): Promise<T> {
  const r = await fetch(path, {
    ...opts,
    headers: {
      ...(isJson ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${getToken()}`,
      ...(opts.headers || {}),
    },
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok)
    throw new Error((data as { error?: string }).error || `Request failed (${r.status})`);
  return data as T;
}

export async function login(userid: string, password: string) {
  const r = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userid, password }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "Login failed");
  setToken(data.token);
  return data.token as string;
}
