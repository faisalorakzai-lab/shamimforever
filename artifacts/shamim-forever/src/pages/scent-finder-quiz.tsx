import { useState } from "react";
import { useLocation } from "wouter";
import { useListProducts } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: number;
  question: string;
  description?: string;
  type: "mood" | "preference" | "occasion" | "intensity";
  options: {
    id: string;
    label: string;
    emoji?: string;
    value: number;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your current mood?",
    description: "Select the mood that resonates with you today",
    type: "mood",
    options: [
      { id: "energetic", label: "Energetic & Vibrant", emoji: "⚡", value: 8 },
      { id: "romantic", label: "Romantic & Sensual", emoji: "💕", value: 7 },
      { id: "calm", label: "Calm & Serene", emoji: "🌿", value: 5 },
      { id: "mysterious", label: "Mysterious & Bold", emoji: "🌙", value: 9 },
      { id: "fresh", label: "Fresh & Clean", emoji: "💧", value: 4 },
    ],
  },
  {
    id: 2,
    question: "What scent notes appeal to you?",
    description: "Choose your preferred fragrance profile",
    type: "preference",
    options: [
      { id: "floral", label: "Floral & Delicate", emoji: "🌸", value: 6 },
      { id: "woody", label: "Woody & Earthy", emoji: "🌲", value: 7 },
      { id: "citrus", label: "Citrus & Zesty", emoji: "🍊", value: 5 },
      { id: "oriental", label: "Oriental & Warm", emoji: "🌺", value: 8 },
      { id: "fruity", label: "Fruity & Sweet", emoji: "🍓", value: 6 },
      { id: "spicy", label: "Spicy & Aromatic", emoji: "🌶️", value: 7 },
    ],
  },
  {
    id: 3,
    question: "What's the occasion?",
    description: "Tell us when you'll wear this fragrance",
    type: "occasion",
    options: [
      { id: "daily", label: "Everyday Wear", emoji: "☀️", value: 4 },
      { id: "evening", label: "Evening Out", emoji: "🌃", value: 7 },
      { id: "special", label: "Special Event", emoji: "✨", value: 9 },
      { id: "office", label: "Professional", emoji: "💼", value: 5 },
      { id: "romantic", label: "Romantic Date", emoji: "💑", value: 8 },
    ],
  },
  {
    id: 4,
    question: "How intense should the fragrance be?",
    description: "Choose your preferred fragrance strength",
    type: "intensity",
    options: [
      { id: "light", label: "Light & Subtle", emoji: "🌬️", value: 3 },
      { id: "moderate", label: "Moderate & Balanced", emoji: "⚖️", value: 6 },
      { id: "strong", label: "Strong & Powerful", emoji: "💥", value: 9 },
    ],
  },
];

export default function ScentFinderQuiz() {
  const [, setLocation] = useLocation();
  const { data: products = [] } = useListProducts();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [recommendations, setRecommendations] = useState<any[] | null>(null);

  const handleSelectOption = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const avgScore = totalScore / Object.keys(answers).length;

    const filtered = products
      .filter((p: any) => p.category === "perfumes")
      .sort((a: any, b: any) => {
        const scoreA = (a.isFeatured ? 2 : 0) + (a.isNewArrival ? 1 : 0);
        const scoreB = (b.isFeatured ? 2 : 0) + (b.isNewArrival ? 1 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 4);

    setRecommendations(filtered);
    toast({ title: "Quiz Complete!", description: "Here are your personalized fragrance recommendations." });
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const isAnswered = answers[currentQuestion.id] !== undefined;
  const isLastStep = currentStep === QUIZ_QUESTIONS.length - 1;
  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  if (recommendations) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif text-gold-gradient mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8" />
              Your Signature Scents
            </h1>
            <p className="text-muted-foreground text-lg">Curated just for your refined taste</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {recommendations.map((product: any, idx: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-secondary/30 border border-border p-6 hover:border-primary transition-colors cursor-pointer group"
                onClick={() => setLocation(`/product/${product.slug}`)}
              >
                {product.images && product.images[0] && (
                  <div className="mb-4 h-48 bg-background rounded overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <h3 className="text-lg font-serif text-foreground mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-serif text-primary">Rs {product.price?.toLocaleString()}</span>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase text-xs py-2">
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => {
                setCurrentStep(0);
                setAnswers({});
                setRecommendations(null);
              }}
              className="bg-secondary text-foreground hover:bg-secondary/80 rounded-none font-serif tracking-widest uppercase"
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-serif text-foreground">Scent Finder Quiz</h1>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              {currentStep + 1} of {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <div className="w-full bg-secondary/30 border border-border h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-serif text-foreground mb-2">{currentQuestion.question}</h2>
            {currentQuestion.description && (
              <p className="text-muted-foreground mb-8">{currentQuestion.description}</p>
            )}

            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border-2 rounded transition-all text-left font-serif ${
                    answers[currentQuestion.id] === option.value
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-secondary/30 text-foreground hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                    <span className="font-medium">{option.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="bg-secondary text-foreground hover:bg-secondary/80 rounded-none font-serif tracking-widest uppercase disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-serif tracking-widest uppercase disabled:opacity-50"
          >
            {isLastStep ? "See Recommendations" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
