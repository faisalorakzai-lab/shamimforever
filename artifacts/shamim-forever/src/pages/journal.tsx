import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";

const categories = [
  { slug: "sovereign-lifestyle", label: "Sovereign Lifestyle" },
  { slug: "luxury-intelligence", label: "Luxury Intelligence" },
  { slug: "rwa-future", label: "RWA Future" },
  { slug: "elite-fashion", label: "Elite Fashion" },
  { slug: "blockchain-luxury", label: "Blockchain Luxury" },
];

const articles = [
  {
    category: "Sovereign Lifestyle",
    title: "The Art of Wearing Oud: A Sovereign's Guide to Fragrance",
    excerpt: "Oud is not just a scent — it is a statement of origin, a declaration of depth. Chairman Faisal Orakzai on the philosophy of fragrance as identity.",
    date: "May 14, 2026",
    readTime: "8 min",
    featured: true,
    image: null,
  },
  {
    category: "Blockchain Luxury",
    title: "Why Every Luxury Item Deserves a Blockchain Certificate",
    excerpt: "In an era of counterfeits and duplicates, ownership must be provable. The case for digital authentication in Pakistan's luxury market.",
    date: "May 10, 2026",
    readTime: "6 min",
    featured: true,
    image: null,
  },
  {
    category: "RWA Future",
    title: "$OKBOND: Tokenizing Real-World Luxury Assets",
    excerpt: "The convergence of blockchain and high jewelry is creating a new paradigm for ownership, investment, and wealth preservation in South Asia.",
    date: "May 6, 2026",
    readTime: "10 min",
    featured: false,
    image: null,
  },
  {
    category: "Elite Fashion",
    title: "Pakistan's Emerging Luxury Identity: Beyond Tradition",
    excerpt: "How a new generation of Pakistani designers and houses are forging a sovereign identity in global luxury — and why it matters.",
    date: "April 30, 2026",
    readTime: "7 min",
    featured: false,
    image: null,
  },
  {
    category: "Luxury Intelligence",
    title: "The Psychology of Exclusivity: Why Scarcity Creates Desire",
    excerpt: "Understanding the deeper mechanics behind why limited access and curated release strategies work — and how Shamim Forever applies them.",
    date: "April 25, 2026",
    readTime: "5 min",
    featured: false,
    image: null,
  },
  {
    category: "Sovereign Lifestyle",
    title: "Building a Personal Fragrance Wardrobe: The Five-Bottle Strategy",
    excerpt: "Every sovereign needs a fragrance for every occasion. Here's how to build a collection that tells your full story without saying a word.",
    date: "April 20, 2026",
    readTime: "9 min",
    featured: false,
    image: null,
  },
];

const categoryColors: Record<string, string> = {
  "Sovereign Lifestyle": "text-yellow-400",
  "Blockchain Luxury": "text-blue-400",
  "RWA Future": "text-purple-400",
  "Elite Fashion": "text-pink-400",
  "Luxury Intelligence": "text-emerald-400",
};

export default function Journal() {
  const featured = articles.filter(a => a.featured);
  const rest = articles.filter(a => !a.featured);

  return (
    <div className="bg-background min-h-screen">

      {/* Header */}
      <section className="relative py-32 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-background to-zinc-900/50" />
        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-primary tracking-[0.5em] uppercase text-xs mb-6">
            Shamim Forever
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-serif text-gold-gradient mb-6">
            The Journal
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl font-serif italic text-muted-foreground">
            Luxury Intelligence. Sovereign Thinking. Elite Perspective.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            <button className="text-primary text-xs tracking-widest uppercase font-medium shrink-0 border-b border-primary pb-1">
              All
            </button>
            {categories.map(cat => (
              <button key={cat.slug}
                className="text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase font-medium shrink-0 transition-colors pb-1">
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featured.map((article, i) => (
            <motion.article key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group cursor-pointer luxury-card overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-zinc-900 to-black border-b border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <span className="text-primary/30 font-serif text-5xl">"</span>
                <div className="absolute bottom-4 left-4">
                  <span className={`text-xs tracking-widest uppercase font-medium ${categoryColors[article.category] || 'text-primary'}`}>
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-muted-foreground text-xs">{article.date}</span>
                  <span className="text-muted-foreground/40">·</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime} read</span>
                  </div>
                </div>
                <h2 className="font-serif text-2xl text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-primary text-xs tracking-widest uppercase font-medium">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Rest of Articles */}
        <div className="space-y-0 border-t border-border">
          {rest.map((article, i) => (
            <motion.article key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group flex items-start gap-8 py-8 border-b border-border cursor-pointer hover:bg-card/30 px-4 -mx-4 transition-colors"
            >
              <div className="shrink-0 w-24 text-center">
                <div className="text-xs text-muted-foreground">{article.date.split(" ").slice(0, 2).join(" ")}</div>
                <div className={`text-xs tracking-widest uppercase mt-2 ${categoryColors[article.category] || 'text-primary'}`}>
                  {article.category.split(" ")[0]}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                <span>{article.readTime}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-card/20 border-t border-border">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-primary tracking-[0.4em] uppercase text-xs mb-4">Intelligence Weekly</p>
            <h2 className="text-4xl font-serif text-gold-gradient mb-4">The Chairman's Notes</h2>
            <p className="text-muted-foreground mb-8">Every Sunday. Luxury intelligence, sovereign thinking, and exclusive previews — delivered personally.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-background border border-border px-5 py-4 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60"
              />
              <button className="bg-primary text-primary-foreground px-6 py-4 text-sm tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
