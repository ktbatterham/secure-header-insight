import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const UrlForm = ({ onSubmit, isLoading }: UrlFormProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }
    try {
      new URL(url);
      onSubmit(url);
    } catch {
      toast.error("Please enter a valid URL");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl gap-2">
      <Input
        type="url"
        placeholder="Enter website URL (e.g., https://example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Scanning..." : "Analyze Security"}
      </Button>
    </form>
  );
};