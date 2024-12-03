import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface Header {
  name: string;
  value: string | null;
  description: string;
}

interface HeadersTableProps {
  headers: Header[];
}

const getRecommendation = (headerName: string): string => {
  const recommendations: Record<string, string> = {
    "Strict-Transport-Security": "Add 'Strict-Transport-Security: max-age=31536000; includeSubDomains' to force HTTPS connections",
    "Content-Security-Policy": "Implement a Content Security Policy to prevent XSS attacks. Start with 'default-src 'self'' and gradually add required sources",
    "X-Frame-Options": "Set 'X-Frame-Options: DENY' to prevent clickjacking attacks, or 'SAMEORIGIN' if frame embedding is needed",
    "X-Content-Type-Options": "Add 'X-Content-Type-Options: nosniff' to prevent MIME type sniffing",
    "Referrer-Policy": "Set 'Referrer-Policy: strict-origin-when-cross-origin' to control information in the Referer header",
    "Permissions-Policy": "Implement Permissions-Policy to control browser features. Example: 'camera=(), microphone=(), geolocation=()'",
  };
  
  return recommendations[headerName] || "Consider implementing this security header based on your application's needs";
};

export const HeadersTable = ({ headers }: HeadersTableProps) => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Header</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {headers.map((header) => (
            <TableRow key={header.name}>
              <TableCell className="font-medium">{header.name}</TableCell>
              <TableCell>
                {header.value ? (
                  <div className="flex items-center text-success-DEFAULT">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Present
                  </div>
                ) : (
                  <div className="flex items-center text-danger-DEFAULT">
                    <XCircle className="w-4 h-4 mr-2" />
                    Missing
                  </div>
                )}
              </TableCell>
              <TableCell>{header.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="space-y-2">
        {headers.filter(header => !header.value).map(header => (
          <Alert key={header.name} variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              <span className="font-semibold">{header.name}</span>: {getRecommendation(header.name)}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};