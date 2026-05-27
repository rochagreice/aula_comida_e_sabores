import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Check, PenTool, Sparkles, MessageSquare, Award } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  isNew?: boolean;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [hoveredStars, setHoveredStars] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState(5);
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newName.trim()) return;

    const submitted: Review = {
      id: `rev-${Date.now()}`,
      name: newName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', // Beautiful default Unsplash avatar
      rating: selectedStars,
      comment: newComment,
      date: 'Agora mesmo',
      isNew: true
    };

    setReviews(prev => [submitted, ...prev]);
    setNewComment('');
    setNewName('');
    setSelectedStars(5);
    setSuccessSubmitted(true);
    setTimeout(() => {
      setSuccessSubmitted(false);
    }, 2500);
  };

  // Metrics calcs
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const countStars = (starVal: number) => reviews.filter(r => r.rating === starVal).length;

  return (
    <section id="reviews-section" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-mono font-bold tracking-widest text-amber-600 uppercase bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/15 inline-flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Experiências & Opiniões
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-stone-900 tracking-tight mt-4">
            A Voz dos Nossos Clientes
          </h2>
          <p className="text-stone-500 text-xs md:text-sm mt-3 leading-relaxed">
            Veja o que dizem os críticos locais, amadores e chefs renomados sobre a experiência gastronômica "Sabores & Delícias".
          </p>
        </div>

        {/* Aggregate Ratings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Summary card */}
          <div className="lg:col-span-4 bg-stone-50 rounded-3xl border border-stone-200 p-6 md:p-8 text-center" id="reviews-metric-box">
            <h3 className="text-md font-bold font-display text-stone-800 uppercase tracking-wide">Avaliação Geral</h3>
            
            <div className="my-5">
              <span className="text-5xl font-black font-mono text-stone-900">{averageRating.toFixed(1)}</span>
              <span className="text-stone-400 text-sm font-mono block mt-1">de 5.0 estrelas</span>
            </div>

            <div className="flex justify-center gap-1 mb-6 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-6.5 h-6.5 fill-current ${
                    star <= Math.round(averageRating) ? 'text-amber-400' : 'text-stone-200'
                  }`} 
                />
              ))}
            </div>

            <p className="text-stone-500 text-xs font-medium py-3 border-t border-stone-200/60 font-mono text-center">
              Baseado em {reviews.length} avaliações espontâneas
            </p>

            {/* Micro rating bars */}
            <div className="space-y-2.5 pt-4 text-xs font-mono text-stone-500 text-left">
              {[5, 4, 3, 2, 1].map((val) => {
                const count = countStars(val);
                const percent = (count / reviews.length) * 100;
                return (
                  <div key={val} className="flex items-center gap-3">
                    <span className="w-12 text-right">{val} estrelas</span>
                    <div className="flex-1 bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-400 h-full rounded-full" 
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Submit Review card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200/80 p-6 md:p-8" id="submit-review-box">
            <h3 className="text-lg font-bold font-display text-stone-900 flex items-center gap-2 mb-2">
              <PenTool className="w-5 h-5 text-amber-500" />
              Escrever um Relato
            </h3>
            <p className="text-xs text-stone-500 mb-6">Compartilhe sua opinião sobre nossos pratos feitos ou sobremesas</p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block mb-1.5">Seu Nome:</label>
                  <input 
                    type="text" 
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full text-xs font-semibold text-stone-800 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    placeholder="Ex: Greice Lima"
                    id="new-review-name"
                  />
                </div>

                {/* Stars Indicator Selector */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block mb-1.5">Sua Nota:</label>
                  <div className="flex items-center h-10 gap-1.5" id="stars-selector-panel">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        id={`star-btn-${star}`}
                        onClick={() => setSelectedStars(star)}
                        onMouseEnter={() => setHoveredStars(star)}
                        onMouseLeave={() => setHoveredStars(null)}
                        className={`w-6.5 h-6.5 cursor-pointer transition-colors ${
                          star <= (hoveredStars !== null ? hoveredStars : selectedStars)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-200 fill-none'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-stone-600 font-mono ml-2">
                      ({selectedStars} de 5)
                    </span>
                  </div>
                </div>
              </div>

              {/* Comment text */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block mb-1.5">Sua Opinião Detalhada:</label>
                <textarea 
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors leading-relaxed"
                  placeholder="Comente sobre o ponto da carne, o sabor do feijão, ou o visual dos nossos doces..."
                  id="new-review-comment"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <AnimatePresence mode="wait">
                  {successSubmitted ? (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-[11px] font-bold text-emerald-600 flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Avaliação enviada! Obrigado pelo feedback.
                    </motion.p>
                  ) : <div />}
                </AnimatePresence>

                <button 
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-2xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all hover:shadow-md cursor-pointer"
                  id="submit-review-btn"
                >
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Review list cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="reviews-feed-container">
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div 
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-6 rounded-2xl border ${
                  review.isNew 
                    ? 'border-amber-400 bg-amber-500/5 shadow-amber-500/10 shadow-md relative' 
                    : 'border-stone-200 bg-stone-50/20'
                }`}
                id={`customer-review-${review.id}`}
              >
                {review.isNew && (
                  <span className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-[8px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 fill-current" />
                    Novo!
                  </span>
                )}

                {/* Stars metrics */}
                <div className="flex gap-0.5 text-amber-400 mb-3.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 fill-current ${
                        star <= review.rating ? 'text-amber-400' : 'text-stone-200'
                      }`} 
                    />
                  ))}
                </div>

                <p className="text-stone-600 text-xs leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>

                {/* Profile row */}
                <div className="flex items-center gap-3 border-t border-stone-100 pt-4 mt-auto">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover bg-stone-150 border border-stone-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 leading-none">{review.name}</h4>
                    <span className="text-[9px] font-mono text-stone-400 block mt-1">{review.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
