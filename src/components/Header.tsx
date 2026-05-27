import { motion } from 'motion/react';
import { ShoppingBag, MapPin, Clock, ChefHat, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNavigateToBuilder: () => void;
}

export default function Header({ cartItemCount, cartTotal, onOpenCart, onNavigateToBuilder }: HeaderProps) {
  return (
    <header className="w-full relative z-40 bg-stone-900 text-stone-100 font-sans" id="app-header">
      {/* Upper Info Bar */}
      <div className="bg-amber-500/10 border-b border-stone-800 text-xs text-stone-300 py-2 px-4 shadow-inner" id="info-bar">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Alameda Gourmet, 1012, Jardins, SP
            </span>
            <span className="hidden md:flex items-center gap-1.5 font-sans">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Terça a Domingo: 11:30 - 23:00
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Entrega rápida & embalagens sustentáveis
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar with Glassmorphism floating feeling */}
      <div className="w-full bg-stone-950/80 backdrop-blur-md sticky top-0 border-b border-stone-800 px-4 py-4" id="main-navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5"
            id="logo-panel"
          >
            <div className="p-2 bg-amber-500 text-stone-950 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white flex items-center gap-1">
                Sabores <span className="text-amber-400">&</span> Delícias
              </h1>
              <p className="text-[9px] md:text-2xs font-mono uppercase tracking-widest text-stone-400">Bistrô de Cozinha Brasileira & Doceria</p>
            </div>
          </motion.div>

          {/* Nav & Action Panel */}
          <div className="flex items-center gap-4" id="navigation-actions">
            <button 
              onClick={onNavigateToBuilder}
              className="hidden lg:flex items-center gap-2 text-xs font-medium font-sans uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors bg-stone-900 border border-amber-500/30 px-3.5 py-1.5 rounded-lg hover:bg-stone-800"
              id="nav-to-builder-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Monte seu PF
            </button>

            {/* Simulated Cart Trigger */}
            <motion.button 
              id="header-cart-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenCart}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/10 flex items-center gap-2.5 transition-all text-sm relative"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-red-600 text-white font-mono text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-stone-950 animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-sans text-xs uppercase tracking-wide">Meu Pedido</span>
              {cartTotal > 0 && (
                <span className="hidden md:inline font-mono font-medium border-l border-amber-950/20 pl-2.5 text-stone-900">
                  R$ {cartTotal.toFixed(2)}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
