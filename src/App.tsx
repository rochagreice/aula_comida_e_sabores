import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  Utensils, 
  IceCream, 
  Cookie, 
  ShoppingBag, 
  Flame, 
  Leaf, 
  Award, 
  ArrowRight, 
  HelpCircle, 
  Heart,
  Mail,
  MapPin,
  Phone,
  Clock,
  ThumbsUp,
  Instagram,
  Facebook
} from 'lucide-react';

// Data & types
import { MenuItem, MenuFilter, CartItem } from './types';
import { MENU_ITEMS, BANNER_IMAGE } from './data';

// Components
import Header from './components/Header';
import MenuCard from './components/MenuCard';
import CustomPlateBuilder from './components/CustomPlateBuilder';
import CartSidebar from './components/CartSidebar';
import ReviewsSection from './components/ReviewsSection';

export default function App() {
  // Shopping Cart & Drawer States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Navigation & Search Catalog States
  const [selectedCategory, setSelectedCategory] = useState<MenuFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietTag, setSelectedDietTag] = useState<string>('all');

  // Refs for smooth navigation
  const menuRef = useRef<HTMLDivElement>(null);
  const builderRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 }];
    });
  };

  const handleAddCustomPlateToCart = (customPlate: CartItem) => {
    setCartItems(prev => [...prev, customPlate]);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      const nextQty = item.quantity + delta;
      if (nextQty <= 0) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? { ...i, quantity: nextQty } : i);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  // Filters calculation
  const filteredItems = MENU_ITEMS.filter(item => {
    // Category match
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    // Search query match
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    // Diet / tags match
    const matchesDiet = selectedDietTag === 'all' || 
                        item.tags.includes(selectedDietTag) ||
                        (selectedDietTag === 'Vegano' && item.tags.includes('Vegano')) ||
                        (selectedDietTag === 'Sem Glúten' && item.tags.includes('Sem Glúten')) ||
                        (selectedDietTag === 'Sem Lactose' && item.tags.includes('Sem Lactose'));

    return matchesCategory && matchesSearch && matchesDiet;
  });

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-400 selection:text-stone-950 flex flex-col justify-between">
      
      {/* HEADER COMPONENT */}
      <Header 
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToBuilder={() => scrollToRef(builderRef)}
      />

      {/* HERO BANNER SECTION (Using Bistro interior banner generated) */}
      <section id="hero-banner" className="relative h-[82vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
        {/* Generated premium photo of bistro background */}
        <img 
          src={BANNER_IMAGE} 
          alt="Bistrô Sabores & Delícias" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-100 animate-[pulse_8s_infinite] pointer-events-none"
        />
        {/* Subtle rich gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/80 pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-1.5 bg-amber-500/25 border border-amber-500/35 px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-300 backdrop-blur-xs"
          >
            <Sparkles className="w-4.5 h-4.5 text-amber-400" />
            Alta Gastronomia Brasileira Artesanal
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black font-display tracking-tight leading-tight max-w-4xl"
          >
            Sabor de Casa com a <span className="text-amber-400">Sofisticação</span> de um Bistrô
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-stone-300 text-sm md:text-base mt-6 max-w-2xl leading-relaxed font-light"
          >
            Descubra a fusão perfeita entre a tradição do nosso <strong className="text-stone-100 font-semibold">Prato Feito</strong> clássico, <strong className="text-stone-100 font-semibold">Sobremesas</strong> inovadoras de confeitaria fina e <strong className="text-stone-100 font-semibold">Doces Artesanais</strong> inesquecíveis.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
            id="hero-buttons-container"
          >
            <button 
              onClick={() => scrollToRef(menuRef)}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 text-xs md:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              id="hero-explore-btn"
            >
              Explorar Nosso Cardápio
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={() => scrollToRef(builderRef)}
              className="px-8 py-4 border-2 border-stone-100/30 hover:border-amber-400 text-white font-bold rounded-2xl text-xs md:text-sm uppercase tracking-wider transition-all duration-300 bg-stone-950/40 hover:bg-stone-950/80 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
              id="hero-builder-btn"
            >
              Construir meu PF Online
            </button>
          </motion.div>

          {/* Quick core metrics summary block */}
          <div className="hidden lg:grid grid-cols-3 gap-10 mt-16 border-t border-stone-800/80 pt-8 w-full max-w-4xl text-center" id="hero-quick-stats">
            <div>
              <p className="text-2xl font-bold text-amber-400 font-mono">100% Fresco</p>
              <p className="text-3xs uppercase tracking-widest text-stone-400 mt-1 font-mono">Ingredientes orgânicos</p>
            </div>
            <div className="border-x border-stone-800/80">
              <p className="text-2xl font-bold text-amber-400 font-mono">Entrega Grátis</p>
              <p className="text-3xs uppercase tracking-widest text-stone-400 mt-1 font-mono">Nos Jardins p/ compras acima R$60</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400 font-mono font-sans flex items-center justify-center gap-1">
                4.9 <StarIconMini className="text-amber-400 w-4 h-4" />
              </p>
              <p className="text-3xs uppercase tracking-widest text-stone-400 mt-1 font-mono">Pontuação geral clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE MENU / INTERACTIVE CATALOG SECTION */}
      <div ref={menuRef} id="menu-catalog-section" className="py-20 px-4 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Section title & subtitle info */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/15 inline-flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              Nosso Cardápio Selecionado
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-stone-900 tracking-tight mt-4">
              Uma Jornada Gastronômica Completa
            </h2>
          </div>

          {/* Catalog Operations Panel: Filter capsules, search bar, dietary options */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200/80 shadow-sm mb-12 flex flex-col gap-6" id="catalog-controls-container">
            
            {/* Row 1: Direct Category Selection Capsules */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-stone-200/50 pb-5">
              <div className="flex flex-wrap gap-2 justify-center" id="category-capsules-group">
                {[
                  { id: 'all', name: 'Cardápio Completo', icon: Utensils },
                  { id: 'mains', name: 'Pratos Feitos Gourmet', icon: Utensils },
                  { id: 'desserts', name: 'Sobremesas Finas', icon: IceCream },
                  { id: 'sweets', name: 'Doces Artesanais', icon: Cookie }
                ].map(cat => {
                  const IconComp = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as MenuFilter)}
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-stone-900 text-white shadow-md' 
                          : 'bg-white hover:bg-stone-200/50 text-stone-700 border border-stone-200'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Live search input field */}
              <div className="relative w-full lg:w-80" id="search-input-panel">
                <Search className="absolute left-3 top-2.5 text-stone-400 w-4.5 h-4.5" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar prato, doce ou ingrediente..."
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors text-stone-800 font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 font-sans"
                    title="Limpar pesquisa"
                  >
                    <XIconMini className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Dietary preference capsules selection */}
            <div className="flex flex-col sm:flex-row items-center gap-3" id="diet-selection-row">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-mono">Restrições Alimentares:</span>
              <div className="flex flex-wrap gap-2" id="dietary-tags-list">
                {[
                  { id: 'all', name: 'Sem filtro' },
                  { id: 'Vegano', name: 'Vegano / Vegetarian' },
                  { id: 'Sem Glúten', name: 'Sem Glúten' },
                  { id: 'Sem Lactose', name: 'Sem Lactose' },
                  { id: 'Mais Vendido', name: 'Favoritos / Mais Vendidos' }
                ].map(tag => {
                  const isActive = selectedDietTag === tag.id;
                  return (
                    <button 
                      key={tag.id}
                      onClick={() => setSelectedDietTag(tag.id)}
                      className={`px-3 py-1.5 rounded-lg text-2xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-stone-950 shadow-sm border border-amber-400'
                          : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* DYNAMIC PRODUCTS CARD GRID */}
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 border rounded-3xl border-stone-200 bg-stone-50/50"
                id="no-items-found-container"
              >
                <HelpCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                <h3 className="text-md font-bold text-stone-800">Nenhum prato correspondente encontrado</h3>
                <p className="text-stone-500 text-xs mt-1.5 max-w-sm mx-auto">
                  Experimente mudar sua busca por palavra-chave ou remover filtros de dieta ou categoria para ver todos os itens de nossa cozinha.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDietTag('all');
                    setSelectedCategory('all');
                  }}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-3xs uppercase tracking-wider px-5 py-2.5 rounded-xl mt-6 transition-colors"
                >
                  Limpar Todos os Filtros
                </button>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                id="menu-catalog-grid"
              >
                {filteredItems.map(item => (
                  <MenuCard 
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    isInCart={cartItems.some(i => i.id === item.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Under grid promo coupon alert */}
          <div className="mt-12 bg-amber-500/5 text-stone-800 p-5 rounded-2xl border border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-400 rounded-lg text-stone-950 font-bold uppercase text-[10px] tracking-wider font-mono shadow-sm">Promo_Code</span>
              <p className="text-xs font-sans text-stone-700 leading-normal">
                Faça o seu pedido e insira o cupom <strong className="text-stone-900 font-bold font-mono">SABORES10</strong> no fechamento do carrinho para ganhar <strong className="text-amber-700 font-bold">10% de Desconto Real</strong>!
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* CORE CUSTOM PLATE BUILDER SECTION */}
      <div ref={builderRef}>
        <CustomPlateBuilder onAddCustomPlateToCart={handleAddCustomPlateToCart} />
      </div>

      {/* REVIEWS AND OPINIONS SECTION */}
      <div ref={reviewsRef}>
        <ReviewsSection />
      </div>

      {/* CORE EXCLUSIVE CART SIDEBAR */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* MASSIVE PREMIUM FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-16 px-4 font-sans border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Restaurant Brand description */}
          <div className="md:col-span-4 space-y-4" id="footer-branding-col">
            <h3 className="text-white text-lg font-bold font-display uppercase tracking-wider flex items-center gap-2">
              Sabores & Delícias
            </h3>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Um conceito de bistrô focado na rica tradição do Prato Feito brasileiro, acompanhado por técnicas modernas de patisserie e confeitaria clássica. Ingredientes de pequenos produtores parceiros.
            </p>
            <div className="flex gap-3 text-stone-400 pt-2" id="footer-social-panel">
              <a href="#" className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Working Hours / Location alerts */}
          <div className="md:col-span-4 space-y-4" id="footer-hours-col">
            <h4 className="text-white text-xs font-bold font-mono tracking-widest uppercase pb-1 border-b border-stone-900">Atendimento & Endereço</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Alameda Gourmet, 1012, Jardins, São Paulo - SP</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>(11) 3215-9988 / (11) 98877-6655</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Terça a Domingo: 11:30 às 23:00</p>
                  <p className="text-[10px] text-stone-500 font-mono mt-0.5">Cozinha encerra 30 minutos antes</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact input simulator */}
          <div className="md:col-span-4 space-y-4" id="footer-newsletter-col">
            <h4 className="text-white text-xs font-bold font-mono tracking-widest uppercase pb-1 border-b border-stone-900">Eventos & Reservas</h4>
            <p className="text-stone-400 text-2xs leading-relaxed">
              Deseja reservar o bistrô para um evento fechado ou corporativo? Deixe seu contato eletrônico.
            </p>
            <div className="flex gap-2" id="newsletter-form-footer">
              <input 
                type="email" 
                placeholder="seu.email@gourmet.com"
                className="bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 w-full font-mono"
              />
              <button 
                onClick={() => alert('Entraremos em contato em até 24 Horas!')}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl p-2.5 flex items-center justify-center transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[9px] text-stone-500 font-mono leading-none">Reservas com antecedência mínima de 48h.</p>
          </div>

        </div>

        {/* Closing copyright label */}
        <div className="max-w-7xl mx-auto pt-10 border-t border-stone-900 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-3xs font-mono tracking-widest text-stone-500 uppercase">
          <p>© 2026 Sabores & Delícias Ltda. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-400 transition-colors">Normas de Privacidade</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Termos do Bistrô</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Micro fallback inline styled components for code size conservation
function StarIconMini(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function XIconMini(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
