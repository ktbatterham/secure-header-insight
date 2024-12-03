import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CookieInfo } from "./types/CookieTypes";

interface CookieTableRowProps {
  cookie: CookieInfo;
}

export const CookieTableRow = ({ cookie }: CookieTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{cookie.name}</TableCell>
      <TableCell>
        <Badge variant={cookie.secure ? "default" : "destructive"}>
          {cookie.secure ? "Yes" : "No"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={cookie.httpOnly ? "default" : "destructive"}>
          {cookie.httpOnly ? "Yes" : "No"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={cookie.sameSite === "Strict" || cookie.sameSite === "Lax" ? "default" : "destructive"}>
          {cookie.sameSite || "Not Set"}
        </Badge>
      </TableCell>
      <TableCell>{cookie.expires || "Session"}</TableCell>
    </TableRow>
  );
};