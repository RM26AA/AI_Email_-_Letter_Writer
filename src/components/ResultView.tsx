import { useState } from "react";
import { ArrowLeft, Copy, Eye, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Document, Packer, Paragraph, TextRun } from "docx";

interface ResultViewProps {
  content: string;
  onBack: () => void;
}

export const ResultView = ({ content, onBack }: ResultViewProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The content has been copied successfully.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async () => {
    try {
      const paragraphs = content.split("\n").map(
        (line) =>
          new Paragraph({
            children: [new TextRun(line)],
          })
      );

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "document.docx";
      link.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Downloaded successfully",
        description: "Your document has been saved.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Could not download the document.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="p-8 shadow-[var(--shadow-elegant)]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Generated Content
              </h2>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Preview</DialogTitle>
                    </DialogHeader>
                    <div className="whitespace-pre-wrap font-serif text-sm leading-relaxed">{content}</div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>

                <Button variant="default" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            <Card className="p-6 bg-muted/30 border-2">
              <div className="whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto">
                {content}
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="gradient" size="lg" className="flex-1" onClick={onBack}>
                Create Another
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
