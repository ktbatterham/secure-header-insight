import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CertificateInfo {
  valid: boolean;
  issuer: string;
  expirationDate: string;
  daysUntilExpiration: number;
  protocol: string;
  strength: "weak" | "moderate" | "strong";
}

interface CertificateAnalysisProps {
  certInfo: CertificateInfo;
}

export const CertificateAnalysis = ({ certInfo }: CertificateAnalysisProps) => {
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "strong":
        return "bg-success-100 text-success-800";
      case "moderate":
        return "bg-warning-100 text-warning-800";
      case "weak":
        return "bg-danger-100 text-danger-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          SSL/TLS Certificate Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge variant={certInfo.valid ? "default" : "destructive"}>
              {certInfo.valid ? "Valid" : "Invalid"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Issuer</span>
            <span className="text-sm">{certInfo.issuer}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Protocol Version</span>
            <Badge variant="outline">{certInfo.protocol}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Encryption Strength</span>
            <Badge className={getStrengthColor(certInfo.strength)}>
              {certInfo.strength.charAt(0).toUpperCase() + certInfo.strength.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Expires</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{certInfo.expirationDate}</span>
            </div>
          </div>
        </div>

        {certInfo.daysUntilExpiration < 30 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              Certificate expires in {certInfo.daysUntilExpiration} days. Consider renewal soon.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};