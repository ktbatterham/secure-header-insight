import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Cookie, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CookieInfo {
  name: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: "Strict" | "Lax" | "None" | null;
  expires: string | null;
}

interface CookieAnalysisProps {
  cookies: CookieInfo[];
}

export const CookieAnalysis = ({ cookies }: CookieAnalysisProps) => {
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

  const hasVulnerableCookies = cookies.some(cookie => getSecurityIssues(cookie).length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cookie className="w-5 h-5" />
          Cookie Security Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cookie Name</TableHead>
              <TableHead>Secure</TableHead>
              <TableHead>HttpOnly</TableHead>
              <TableHead>SameSite</TableHead>
              <TableHead>Expires</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cookies.map((cookie) => (
              <TableRow key={cookie.name}>
                <TableCell className="font-medium">{cookie.name}</TableCell>
                <TableCell>
                  <Badge variant={cookie.secure ? "success" : "destructive"}>
                    {cookie.secure ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={cookie.httpOnly ? "success" : "destructive"}>
                    {cookie.httpOnly ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={cookie.sameSite === "Strict" || cookie.sameSite === "Lax" ? "success" : "destructive"}>
                    {cookie.sameSite || "Not Set"}
                  </Badge>
                </TableCell>
                <TableCell>{cookie.expires || "Session"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {hasVulnerableCookies && (
          <div className="space-y-2">
            {cookies.map((cookie) => {
              const issues = getSecurityIssues(cookie);
              if (issues.length === 0) return null;
              
              return (
                <Alert key={cookie.name} variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="ml-2">
                    <span className="font-semibold">{cookie.name}</span>: {issues.join(", ")}
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};