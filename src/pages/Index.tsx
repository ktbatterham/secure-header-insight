import { useState } from "react";
import { UrlForm } from "@/components/UrlForm";
import { SecurityGrade } from "@/components/SecurityGrade";
import { HeadersTable } from "@/components/HeadersTable";
import { TechnologyStack } from "@/components/TechnologyStack";
import { CertificateAnalysis } from "@/components/CertificateAnalysis";
import { CookieAnalysis } from "@/components/CookieAnalysis";

const generateMockData = (url: string) => {
  // Generate different mock data based on URL
  const isSecure = url.startsWith('https');
  const domain = new URL(url).hostname;
  
  return {
    headers: [
      {
        name: "Strict-Transport-Security",
        value: isSecure ? "max-age=31536000" : null,
        description: "Ensures secure HTTPS connection",
      },
      {
        name: "Content-Security-Policy",
        value: domain.includes('google') ? "default-src 'self'" : null,
        description: "Controls resources the user agent is allowed to load",
      },
      {
        name: "X-Frame-Options",
        value: domain.includes('facebook') ? "DENY" : "SAMEORIGIN",
        description: "Prevents clickjacking attacks",
      },
      {
        name: "X-Content-Type-Options",
        value: isSecure ? "nosniff" : null,
        description: "Prevents MIME type sniffing",
      },
    ],
    technologies: [
      { name: "Nginx", category: "server" as const, version: "1.18.0" },
      { name: "React", category: "frontend" as const, version: "18.2.0" },
      ...(domain.includes('cloudflare') ? [{ name: "Cloudflare", category: "security" as const }] : []),
      { name: "TypeScript", category: "frontend" as const, version: "4.9.5" },
      { name: domain.includes('google') ? "Google Cloud" : "Let's Encrypt", category: "security" as const },
      { name: "Webpack", category: "frontend" as const, version: "5.75.0" },
      { name: "Node.js", category: "server" as const, version: "16.x" },
    ],
    certificate: {
      valid: isSecure,
      issuer: domain.includes('google') ? "Google Trust Services" : "Let's Encrypt Authority X3",
      expirationDate: "2024-06-15",
      daysUntilExpiration: isSecure ? 120 : 15,
      protocol: isSecure ? "TLS 1.3" : "TLS 1.2",
      strength: isSecure ? "strong" as const : "moderate" as const,
    },
    cookies: [
      {
        name: "session",
        secure: isSecure,
        httpOnly: true,
        sameSite: "Strict" as const,
        expires: "2024-12-31",
      },
      {
        name: "preferences",
        secure: domain.includes('google'),
        httpOnly: false,
        sameSite: domain.includes('facebook') ? "Strict" as const : null,
        expires: null,
      },
    ],
  };
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisData, setAnalysisData] = useState<ReturnType<typeof generateMockData> | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockData = generateMockData(url);
    setAnalysisData(mockData);
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

        {analyzed && analysisData && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <SecurityGrade grade={analysisData.certificate.valid ? "A" : "C"} />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">Security Headers</h2>
                  <HeadersTable headers={analysisData.headers} />
                </div>
                <CertificateAnalysis certInfo={analysisData.certificate} />
              </div>
              
              <div className="space-y-8">
                <TechnologyStack technologies={analysisData.technologies} />
                <CookieAnalysis cookies={analysisData.cookies} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;