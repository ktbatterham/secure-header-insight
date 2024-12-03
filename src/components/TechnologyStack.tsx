import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Globe, Shield, Code } from "lucide-react";

interface Technology {
  name: string;
  category: "server" | "frontend" | "security" | "other";
  version?: string;
}

interface TechnologyStackProps {
  technologies: Technology[];
}

export const TechnologyStack = ({ technologies }: TechnologyStackProps) => {
  const getCategoryIcon = (category: Technology["category"]) => {
    switch (category) {
      case "server":
        return <Server className="w-4 h-4" />;
      case "frontend":
        return <Globe className="w-4 h-4" />;
      case "security":
        return <Shield className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: Technology["category"]) => {
    switch (category) {
      case "server":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "frontend":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "security":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Detected Technologies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Object.entries(
            technologies.reduce((acc, tech) => {
              if (!acc[tech.category]) {
                acc[tech.category] = [];
              }
              acc[tech.category].push(tech);
              return acc;
            }, {} as Record<Technology["category"], Technology[]>)
          ).map(([category, techs]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-2">
                {getCategoryIcon(category as Technology["category"])}
                <h3 className="font-semibold capitalize">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="secondary"
                    className={`${getCategoryColor(tech.category)}`}
                  >
                    {tech.name}
                    {tech.version && ` (${tech.version})`}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};