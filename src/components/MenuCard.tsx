import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Flame, Info, Plus, Check, X, Award, Utensils, ShieldAlert } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  key?: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  isInCart: boolean;
}

export default function MenuCard({ item, onAddToCart, isInCart }: MenuCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [quantityAdded, setQuantityAdded] = useState(0);

  const handleAddClick = () => {
    onAddToCart(item);
    setQuantityAdded(prev => prev + 1);
    setTimeout(() => {
      setQuantityAdded(0);
    }, 1200);
  };

  return (
    <>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative"
        id={`menu-card-${item.id}`}
      >
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5" id={`card-badges-${item.id}`}>
          {item.tags.map((tag, idx) => (
            <span 
              key={tag} 
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                idx === 0 
                  ? 'bg-stone-900/80 text-amber-300 border border-stone-700/30' 
                  : 'bg-amber-500/90 text-stone-950'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Product Image Stage */}
        <div className="relative overflow-hidden aspect-4/3 bg-stone-100" id={`card-image-wrapper-${item.id}`}>
          <img 
            src={item.image} 
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
            onClick={() => setShowDetails(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Quick info badges bottom bar */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-stone-950/70 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-stone-100 text-[11px] font-medium border border-stone-800/40 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {item.prepTime}
            </span>
            <span className="w-1 h-1 bg-stone-500 rounded-full" />
            <span className="flex items-center gap-0.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              {item.calories} kcal
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col flex-grow" id={`card-body-${item.id}`}>
          <div className="flex justify-between items-start mb-2.5">
            <h3 
              onClick={() => setShowDetails(true)}
              className="text-lg font-bold font-display text-stone-900 hover:text-amber-600 transition-colors cursor-pointer leading-tight"
            >
              {item.name}
            </h3>
          </div>
          
          <p className="text-stone-500 text-xs leading-relaxed mb-6 flex-grow font-sans line-clamp-3">
            {item.description}
          </p>

          {/* Pricing and Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Valor</span>
              <span className="text-xl font-bold font-mono text-stone-900 tracking-tight">
                R$ <span className="text-2xl">{item.price.toFixed(2).split('.')[0]}</span>.{item.price.toFixed(2).split('.')[1]}
              </span>
            </div>

            <div className="flex gap-2">
              <button 
                id={`info-btn-${item.id}`}
                onClick={() => setShowDetails(true)}
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors flex items-center justify-center border border-stone-200/20"
                title="Ver ingredientes"
              >
                <Info className="w-4.5 h-4.5" />
              </button>

              <motion.button 
                id={`add-btn-${item.id}`}
                whileTap={{ scale: 0.94 }}
                onClick={handleAddClick}
                className={`px-4.5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md ${
                  quantityAdded > 0
                    ? 'bg-emerald-500 text-white shadow-emerald-500/10'
                    : isInCart
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/10'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-stone-950/10'
                }`}
              >
                {quantityAdded > 0 ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    +1 Adicionado!
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Details Modals */}
      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-sm" id={`detail-modal-${item.id}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-stone-200"
            >
              <button 
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/60 backdrop-blur-md text-white hover:bg-stone-900 transition-all border border-stone-800"
                id={`close-modal-btn-${item.id}`}
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Photo Header pane */}
                <div className="md:col-span-5 relative bg-stone-100 h-52 md:h-full min-h-[220px]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">
                      {item.category === 'mains' ? 'Prato Feito' : item.category === 'desserts' ? 'Sobremesa' : 'Doce Fino'}
                    </span>
                  </div>
                </div>

                {/* Details Content pane */}
                <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                  <div id={`modal-scrollable-${item.id}`}>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold font-display text-stone-900 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xl font-bold font-mono text-amber-600 mt-1">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>

                    <p className="text-stone-600 text-xs leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-3 p-3.5 bg-stone-50 rounded-2xl mb-6 border border-stone-100 text-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-stone-400 font-mono">Calorias</p>
                        <p className="text-xs font-semibold text-stone-800 font-mono mt-0.5">{item.calories} kcal</p>
                      </div>
                      <div className="border-x border-stone-200">
                        <p className="text-[9px] uppercase tracking-widest text-stone-400 font-mono">Preparo</p>
                        <p className="text-xs font-semibold text-stone-800 font-mono mt-0.5">{item.prepTime}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-stone-400 font-mono">Dieta</p>
                        <span className="text-[10px] font-bold text-emerald-600 mt-0.5 block truncate">
                          {item.tags.includes('Vegano') ? 'Vegana' : item.tags.includes('Frutos do Mar') ? 'Frutos Mar' : 'Standard'}
                        </span>
                      </div>
                    </div>

                    {/* Ingredients detail */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 mb-2.5">
                        <Utensils className="w-3.5 h-3.5 text-amber-500" />
                        Ingredientes & Origem
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] text-stone-600 font-sans pl-1.5 list-disc list-inside">
                        {item.ingredients.map(ing => (
                          <li key={ing} className="truncate">{ing}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Alergenic Info Warning */}
                    <div className="flex gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-[10px] leading-relaxed mb-6">
                      <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-600" />
                      <p>
                        <strong>Alerta para alérgicos:</strong> Preparado em cozinha que manuseia trigo, nozes, leite, ovos e sementes. Em caso de restrições severas, informe nossa equipe de atendimento.
                      </p>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <button 
                      onClick={() => setShowDetails(false)}
                      className="px-5 py-2.5 border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Fechar
                    </button>
                    <button 
                      onClick={() => {
                        onAddToCart(item);
                        setShowDetails(false);
                      }}
                      className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Pedir esta Delícia
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
