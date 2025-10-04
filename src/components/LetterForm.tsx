import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface LetterFormProps {
  onBack: () => void;
  onGenerate: (content: string) => void;
}

export const LetterForm = ({ onBack, onGenerate }: LetterFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAddress: "",
    senderName: "",
    senderAddress: "",
    tone: "formal",
    reason: "",
    details: "",
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = `Write a ${formData.tone} letter with the following details:
${formData.senderName ? `From: ${formData.senderName}` : ""}
${formData.senderAddress ? `Sender Address: ${formData.senderAddress}` : ""}
${formData.recipientName ? `To: ${formData.recipientName}` : ""}
${formData.recipientAddress ? `Recipient Address: ${formData.recipientAddress}` : ""}
Reason: ${formData.reason}
Key Details: ${formData.details}

Please write a complete, well-formatted ${formData.tone} letter with proper formatting including date, addresses, salutation, body, and closing.`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": "AIzaSyB58vCVnKMF07XENDDtxvN0jLBoWvG8egc",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      onGenerate(generatedText);
    } catch (error) {
      console.error("Error generating letter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="p-8 shadow-[var(--shadow-elegant)]">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Letter Generator
              </h2>
              <p className="text-muted-foreground">Fill in the details to generate your letter</p>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name (Optional)</Label>
                  <Input
                    id="recipientName"
                    placeholder="To whom?"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientAddress">Recipient Address (Optional)</Label>
                  <Input
                    id="recipientAddress"
                    placeholder="Their address"
                    value={formData.recipientAddress}
                    onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name (Optional)</Label>
                  <Input
                    id="senderName"
                    placeholder="Your name"
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderAddress">Sender Address (Optional)</Label>
                  <Input
                    id="senderAddress"
                    placeholder="Your address"
                    value={formData.senderAddress}
                    onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Letter</Label>
                <Input
                  id="reason"
                  placeholder="What is this letter about?"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Key Details / Points</Label>
                <Textarea
                  id="details"
                  placeholder="Any specific points to include..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  rows={4}
                />
              </div>
            </div>

            <Button
              className="w-full"
              variant="gradient"
              size="lg"
              onClick={handleGenerate}
              disabled={loading || !formData.reason}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Letter"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
