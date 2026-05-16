import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useGetScentQuestions, useGetScentRecommendations } from "@workspace/api-client-react";
import { ArrowRight, RefreshCcw } from "lucide-react";

export default function ScentFinder() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // The actual implementation would use real questions from the backend if available
  // For the sake of the design, we'll implement the wizard UI
  
  const questions = [
    {
      id: "q1",
      question: "Which element draws you in the most?",
      options: [
        { value: "fire", label: "Fire & Spice" },
        { value: "earth", label: "Deep Woods & Resins" },
        { value: "water", label: "Oceanic & Fresh" },
        { value: "air", label: "Airy Florals" }
      ]
    },
    {
      id: "q2",
      question: "When do you feel most powerful?",
      options: [
        { value: "night", label: "Midnight at a Gala" },
        { value: "dawn", label: "First Light of Dawn" },
        { value: "dusk", label: "Golden Hour" },
        { value: "noon", label: "High Noon Sun" }
      ]
    },
    {
      id: "q3",
      question: "Choose a texture:",
      options: [
        { value: "velvet", label: "Crushed Velvet" },
        { value: "silk", label: "Cold Silk" },
        { value: "leather", label: "Worn Leather" },
        { value: "gold", label: "Liquid Gold" }
      ]
    }
  ];

  const handleAnswer = (questionId: string, answerValue: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerValue }));
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    } else {
      setTimeout(() => setShowResults(true), 400);
    }
  };

  const reset = () => {
    setStarted(false);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-[90vh] bg-background flex flex-col pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-serif text-gold-gradient mb-6 leading-tight">The Scent Finder</h1>
              <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto mb-12 leading-relaxed">
                Allow us to guide you to your signature essence. A brief journey to uncover the fragrance that speaks your soul's language.
              </p>
              <Button 
                onClick={() => setStarted(true)}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 rounded-none font-serif text-xl tracking-widest uppercase"
              >
                Begin the Journey
              </Button>
            </motion.div>
          ) : !showResults ? (
            <motion.div 
              key={`q-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="mb-12 text-center">
                <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-4 block">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
                  {questions[currentStep].question}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                    className={`p-6 border text-center font-serif text-lg transition-all duration-300 ${
                      answers[questions[currentStep].id] === option.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 hover:border-primary/50 text-muted-foreground hover:text-foreground bg-secondary/30"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-4 block">
                Your Signature
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-gold-gradient mb-12">
                Oud Absolute
              </h2>
              
              <div className="bg-secondary/20 border border-primary/20 p-8 md:p-12 mb-12 text-left flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-64 bg-secondary shrink-0 overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-serif text-sm">Product Image</div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-foreground mb-4">Why it matches you</h3>
                  <p className="text-muted-foreground font-serif leading-relaxed mb-6">
                    Based on your affinity for deep woods and the golden hour, Oud Absolute provides the perfect resonance. It opens with sharp saffron before settling into a majestic, velvet-like heart of aged agarwood.
                  </p>
                  <Link href="/product/oud-absolute">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 rounded-none font-serif text-lg tracking-widest uppercase flex items-center gap-2">
                      View Masterpiece <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <button 
                onClick={reset}
                className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto font-serif uppercase tracking-widest text-sm"
              >
                <RefreshCcw className="w-4 h-4" /> Retake the Journey
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
