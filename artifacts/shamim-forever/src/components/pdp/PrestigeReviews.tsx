import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  title: string;
  content: string;
  rating: number;
  date: string;
  isVIPBuyer?: boolean;
}

interface PrestigeReviewsProps {
  reviews: Review[];
}

export function PrestigeReviews({ reviews }: PrestigeReviewsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
          1
        )
      : 0;

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-6">
            Prestige Reviews
          </h2>

          {/* Rating Summary */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(Number(averageRating))
                      ? "fill-primary text-primary"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-serif text-primary">
              {averageRating}
            </span>
            <span className="text-muted-foreground">
              from {reviews.length} reviews
            </span>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Editorial-style testimonials from our most discerning clientele
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="luxury-card p-8 rounded-lg relative group"
            >
              {/* VIP Badge */}
              {review.isVIPBuyer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 px-3 py-1 bg-primary/20 border border-primary rounded-full"
                >
                  <span className="text-xs font-serif text-primary">
                    ✨ VIP Buyer
                  </span>
                </motion.div>
              )}

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-primary text-primary"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>

              {/* Review Title */}
              <h3 className="text-lg font-serif text-foreground mb-3">
                {review.title}
              </h3>

              {/* Review Content */}
              <p className="text-muted-foreground font-serif leading-relaxed mb-6">
                "{review.content}"
              </p>

              {/* Author & Date */}
              <div className="flex justify-between items-center pt-4 border-t border-border/30">
                <div>
                  <p className="font-serif text-foreground text-sm">
                    {review.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-2xl cursor-pointer"
                >
                  👑
                </motion.div>
              </div>

              {/* Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent origin-left"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Reviews Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-primary text-primary rounded-full font-serif text-sm tracking-widest uppercase hover:bg-primary/10 transition-colors"
          >
            View All Reviews
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
