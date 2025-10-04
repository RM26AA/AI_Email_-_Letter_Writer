import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface EmailFormProps {
  onBack: () => void;
  onGenerate: (content: string) => void;
}

export const EmailForm = ({ onBack, onGenerate }: EmailFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    recipient: "",
    purpose: "",
    tone: "professional",
    details: "",
    signature: "",
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = `Write a ${formData.tone} email with the following details:
Subject: ${formData.subject}
Recipient: ${formData.recipient}
Purpose: ${formData.purpose}
Key Details: ${formData.details}
Signature: ${formData.signature}

Please write a complete, well-formatted email that is ${formData.tone} in tone.`;

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
      console.error("Error generating email:", error);
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
                Email Generator
              </h2>
              <p className="text-muted-foreground">Fill in the details to generate your email</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Enter the email subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Name</Label>
                <Input
                  id="recipient"
                  placeholder="Who are you sending this to?"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Message Purpose</Label>
                <Input
                  id="purpose"
                  placeholder="What is the main purpose?"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
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

              <div className="space-y-2">
                <Label htmlFor="signature">Closing Signature</Label>
                <Input
                  id="signature"
                  placeholder="Your name"
                  value={formData.signature}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                />
              </div>
            </div>

            <Button
              className="w-full"
              variant="gradient"
              size="lg"
              onClick={handleGenerate}
              disabled={loading || !formData.subject || !formData.recipient}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Email"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
