import { useState } from "react";
import { UrlForm } from "@/components/UrlForm";
import { SecurityGrade } from "@/components/SecurityGrade";
import { HeadersTable } from "@/components/HeadersTable";
import { TechnologyStack } from "@/components/TechnologyStack";
import { CertificateAnalysis } from "@/components/CertificateAnalysis";
import { CookieAnalysis } from "@/components/CookieAnalysis";

const MOCK_HEADERS = [
  {
    name: "Strict-Transport-Security",
    value: "max-age=31536000",
    description: "Ensures secure HTTPS connection",
  },
  {
    name: "Content-Security-Policy",
    value: null,
    description: "Controls resources the user agent is allowed to load",
  },
  {
    name: "X-Frame-Options",
    value: "SAMEORIGIN",
    description: "Prevents clickjacking attacks",
  },
  {
    name: "X-Content-Type-Options",
    value: "nosniff",
    description: "Prevents MIME type sniffing",
  },
];

const MOCK_TECHNOLOGIES = [
  { name: "Nginx", category: "server" as const, version: "1.18.0" },
  { name: "React", category: "frontend" as const, version: "18.2.0" },
  { name: "Cloudflare", category: "security" as const },
  { name: "TypeScript", category: "frontend" as const, version: "4.9.5" },
  { name: "Let's Encrypt", category: "security" as const },
  { name: "Webpack", category: "frontend" as const, version: "5.75.0" },
  { name: "Node.js", category: "server" as const, version: "16.x" },
];

const MOCK_CERTIFICATE = {
  valid: true,
  issuer: "Let's Encrypt Authority X3",
  expirationDate: "2024-06-15",
  daysUntilExpiration: 120,
  protocol: "TLS 1.3",
  strength: "strong" as const,
};

const MOCK_COOKIES = [
  {
    name: "session",
    secure: true,
    httpOnly: true,
    sameSite: "Strict" as const,
    expires: "2024-12-31",
  },
  {
    name: "preferences",
    secure: false,
    httpOnly: false,
    sameSite: null,
    expires: null,
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setAnalyzed(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Website Security Scanner
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze your website's security headers, certificates, cookies, and technology stack to get detailed recommendations
            for improving your security posture.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <UrlForm onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>

        {analyzed && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <SecurityGrade grade="B" />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">Security Headers</h2>
                  <HeadersTable headers={MOCK_HEADERS} />
                </div>
                <CertificateAnalysis certInfo={MOCK_CERTIFICATE} />
              </div>
              
              <div className="space-y-8">
                <TechnologyStack technologies={MOCK_TECHNOLOGIES} />
                <CookieAnalysis cookies={MOCK_COOKIES} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
