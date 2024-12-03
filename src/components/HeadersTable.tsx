import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle } from "lucide-react";

interface Header {
  name: string;
  value: string | null;
  description: string;
}

interface HeadersTableProps {
  headers: Header[];
}

export const HeadersTable = ({ headers }: HeadersTableProps) => {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
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
    </div>
  );
};