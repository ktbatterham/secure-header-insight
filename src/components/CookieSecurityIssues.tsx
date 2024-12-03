import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { CookieInfo } from "./types/CookieTypes";

interface CookieSecurityIssuesProps {
  cookie: CookieInfo;
}

export const CookieSecurityIssues = ({ cookie }: CookieSecurityIssuesProps) => {
  const getSecurityIssues = (cookie: CookieInfo) => {
    const issues: string[] = [];
    
    if (!cookie.secure) {
      issues.push("Missing Secure flag");
    }
    if (!cookie.httpOnly) {
      issues.push("Missing HttpOnly flag");
    }
    if (!cookie.sameSite || cookie.sameSite === "None") {
      issues.push("SameSite attribute should be set to Strict or Lax");
    }
    
    return issues;
  };

  const issues = getSecurityIssues(cookie);
  if (issues.length === 0) return null;

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="ml-2">
        <span className="font-semibold">{cookie.name}</span>: {issues.join(", ")}
      </AlertDescription>
    </Alert>
  );
};