import { useState } from "react";
import { TypeSelector } from "@/components/TypeSelector";
import { EmailForm } from "@/components/EmailForm";
import { LetterForm } from "@/components/LetterForm";
import { ResultView } from "@/components/ResultView";

type View = "select" | "email" | "letter" | "result";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("select");
  const [generatedContent, setGeneratedContent] = useState("");

  const handleTypeSelect = (type: "email" | "letter") => {
    setCurrentView(type);
  };

  const handleGenerate = (content: string) => {
    setGeneratedContent(content);
    setCurrentView("result");
  };

  const handleBack = () => {
    setCurrentView("select");
    setGeneratedContent("");
  };

  return (
    <>
      {currentView === "select" && <TypeSelector onSelect={handleTypeSelect} />}
      {currentView === "email" && <EmailForm onBack={handleBack} onGenerate={handleGenerate} />}
      {currentView === "letter" && <LetterForm onBack={handleBack} onGenerate={handleGenerate} />}
      {currentView === "result" && <ResultView content={generatedContent} onBack={handleBack} />}
    </>
  );
};

export default Index;
