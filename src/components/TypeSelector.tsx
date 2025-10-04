import { Mail, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TypeSelectorProps {
  onSelect: (type: "email" | "letter") => void;
}

export const TypeSelector = ({ onSelect }: TypeSelectorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="w-full max-w-4xl space-y-8 animate-in fade-in duration-700">
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Writer
          </h1>
          <p className="text-xl text-muted-foreground">
            Generate professional emails and letters instantly
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="p-8 cursor-pointer group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
            onClick={() => onSelect("email")}
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Email</h2>
                <p className="text-muted-foreground">
                  Create professional emails with AI assistance
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-8 cursor-pointer group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
            onClick={() => onSelect("letter")}
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <FileText className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Letter</h2>
                <p className="text-muted-foreground">
                  Generate formal letters for any occasion
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
