import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Cookie } from "lucide-react";
import { CookieTableRow } from "./CookieTableRow";
import { CookieSecurityIssues } from "./CookieSecurityIssues";
import { CookieAnalysisProps } from "./types/CookieTypes";

export const CookieAnalysis = ({ cookies }: CookieAnalysisProps) => {
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
              <CookieTableRow key={cookie.name} cookie={cookie} />
            ))}
          </TableBody>
        </Table>

        <div className="space-y-2">
          {cookies.map((cookie) => (
            <CookieSecurityIssues key={cookie.name} cookie={cookie} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};