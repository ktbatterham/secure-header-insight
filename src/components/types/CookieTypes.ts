export interface CookieInfo {
  name: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: "Strict" | "Lax" | "None" | null;
  expires: string | null;
}

export interface CookieAnalysisProps {
  cookies: CookieInfo[];
}