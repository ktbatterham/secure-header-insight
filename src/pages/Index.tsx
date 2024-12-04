import { useState } from "react";
import { UrlForm } from "@/components/UrlForm";
import { SecurityGrade } from "@/components/SecurityGrade";
import { HeadersTable } from "@/components/HeadersTable";
import { TechnologyStack } from "@/components/TechnologyStack";
import { CertificateAnalysis } from "@/components/CertificateAnalysis";
import { CookieAnalysis } from "@/components/CookieAnalysis";

const generateMockData = (url: string) => {
  // Parse URL for more dynamic data generation
  const isSecure = url.startsWith('https');
  const domain = new URL(url).hostname;
  const isPopularSite = domain.includes('google') || domain.includes('facebook') || domain.includes('amazon');
  const randomDays = Math.floor(Math.random() * 365) + 1;
  
  // Generate security grade based on URL characteristics
  const getSecurityGrade = () => {
    if (isSecure && isPopularSite) return "A+";
    if (isSecure) return "A";
    if (isPopularSite) return "B";
    return "C";
  };

  return {
    headers: [
      {
        name: "Strict-Transport-Security",
        value: isSecure ? "max-age=31536000; includeSubDomains" : null,
        description: "Ensures secure HTTPS connection",
      },
      {
        name: "Content-Security-Policy",
        value: isPopularSite ? "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;" : null,
        description: "Controls resources the user agent is allowed to load",
      },
      {
        name: "X-Frame-Options",
        value: isPopularSite ? "DENY" : (isSecure ? "SAMEORIGIN" : null),
        description: "Prevents clickjacking attacks",
      },
      {
        name: "X-Content-Type-Options",
        value: isSecure || isPopularSite ? "nosniff" : null,
        description: "Prevents MIME type sniffing",
      },
      {
        name: "Referrer-Policy",
        value: isPopularSite ? "strict-origin-when-cross-origin" : (isSecure ? "no-referrer-when-downgrade" : null),
        description: "Controls how much referrer information should be included with requests",
      },
    ],
    technologies: [
      { name: isPopularSite ? "Nginx" : "Apache", category: "server", version: "1.18.0" },
      { name: "React", category: "frontend", version: "18.2.0" },
      ...(domain.includes('cloudflare') ? [{ name: "Cloudflare", category: "security" }] : []),
      { name: "TypeScript", category: "frontend", version: "4.9.5" },
      { name: isPopularSite ? "AWS" : "Digital Ocean", category: "server" },
      ...(isSecure ? [{ name: "Let's Encrypt", category: "security" }] : []),
      { name: isPopularSite ? "GraphQL" : "REST API", category: "frontend" },
    ],
    certificate: {
      valid: isSecure,
      issuer: isPopularSite ? 
        "DigiCert Global Root CA" : 
        "Let's Encrypt Authority X3",
      expirationDate: new Date(Date.now() + (randomDays * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      daysUntilExpiration: randomDays,
      protocol: isSecure ? "TLS 1.3" : "TLS 1.2",
      strength: isPopularSite ? "strong" : (isSecure ? "moderate" : "weak"),
    },
    cookies: [
      {
        name: "session",
        secure: isSecure,
        httpOnly: isPopularSite,
        sameSite: isPopularSite ? "Strict" : (isSecure ? "Lax" : null),
        expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      },
      {
        name: "preferences",
        secure: isPopularSite || isSecure,
        httpOnly: isPopularSite,
        sameSite: isPopularSite ? "Strict" : (isSecure ? "Lax" : null),
        expires: null,
      },
      {
        name: "analytics",
        secure: isSecure,
        httpOnly: false,
        sameSite: isSecure ? "Lax" : null,
        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
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