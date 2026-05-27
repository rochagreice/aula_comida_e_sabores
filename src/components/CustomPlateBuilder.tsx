import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Leaf, HelpCircle, Utensils, AlertCircle, Plus, Check } from 'lucide-react';
import { CustomIngredient, CartItem } from '../types';
import { CUSTOM_INGREDIENTS } from '../data';

interface CustomPlateBuilderProps {
  onAddCustomPlateToCart: (item: CartItem) => void;
}

export default function CustomPlateBuilder({ onAddCustomPlateToCart }: CustomPlateBuilderProps) {
  // Selection states
  const [selectedBase, setSelectedBase] = useState<CustomIngredient | null>(null);
  const [selectedProtein, setSelectedProtein] = useState<CustomIngredient | null>(null);
  const [selectedBean, setSelectedBean] = useState<CustomIngredient | null>(null);
  const [selectedSides, setSelectedSides] = useState<CustomIngredient[]>([]);
  const [customPlateName, setCustomPlateName] = useState('Meu PF Gourmet Sob Medida');
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);

  // Grouped ingredients
  const bases = CUSTOM_INGREDIENTS.filter(i => i.category === 'base');
  const proteins = CUSTOM_INGREDIENTS.filter(i => i.category === 'protein');
  const beans = CUSTOM_INGREDIENTS.filter(i => i.category === 'bean');
  const sidesAndExtras = CUSTOM_INGREDIENTS.filter(i => i.category === 'side' || i.category === 'extra');

  // Multi-select for sides/extras (max 3 items)
  const toggleSide = (ingredient: CustomIngredient) => {
    if (selectedSides.some(s => s.id === ingredient.id)) {
      setSelectedSides(prev => prev.filter(s => s.id !== ingredient.id));
    } else {
      if (selectedSides.length >= 3) return; // Limit to 3 sides
      setSelectedSides(prev => [...prev, ingredient]);
    }
  };

  // Calculations
  const totalPrice = 
    (selectedBase?.price || 0) + 
    (selectedProtein?.price || 0) + 
    (selectedBean?.price || 0) + 
    selectedSides.reduce((sum, s) => sum + s.price, 0);

  const totalCalories = 
    (selectedBase?.calories || 0) + 
    (selectedProtein?.calories || 0) + 
    (selectedBean?.calories || 0) + 
    selectedSides.reduce((sum, s) => sum + s.calories, 0);

  // Analyze dietary badges (Intersection of dietary properties)
  const allSelections = [
    ...(selectedBase ? [selectedBase] : []),
    ...(selectedProtein ? [selectedProtein] : []),
    ...(selectedBean ? [selectedBean] : []),
    ...selectedSides
  ];

  const getDietaryStatus = () => {
    if (allSelections.length === 0) return [];
    
    const status: string[] = [];
    const isVegano = allSelections.every(item => item.dietary.includes('Vegano'));
    const isGlutenFree = allSelections.every(item => item.dietary.includes('Sem Glúten'));
    const isLactoseFree = allSelections.every(item => item.dietary.includes('Sem Lactose') || item.dietary.includes('Vegano'));
    const isVegetariano = allSelections.every(item => item.dietary.includes('Vegetariano') || item.dietary.includes('Vegano'));

    if (isVegano) status.push('100% Vegano');
    else if (isVegetariano) status.push('Vegetariano');
    
    if (isGlutenFree) status.push('Sem Glúten');
    if (isLactoseFree) status.push('Sem Lactose');

    return status;
  };

  const dietaryBadges = getDietaryStatus();

  // Clear plate
  const handleReset = () => {
    setSelectedBase(null);
    setSelectedProtein(null);
    setSelectedBean(null);
    setSelectedSides([]);
    setCustomPlateName('Meu PF Gourmet Sob Medida');
  };

  // Add Custom Plate to Cart
  const handleAddToCart = () => {
    if (!selectedBase || !selectedProtein || !selectedBean) return;

    const listNames = [
      selectedBase.name,
      selectedProtein.name,
      selectedBean.name,
      ...selectedSides.map(s => s.name)
    ];

    const newCustomPlate: CartItem = {
      id: `custom-pf-${Date.now()}`,
      name: customPlateName.trim() || 'Meu PF Gourmet Personalizado',
      price: totalPrice,
      quantity: 1,
      isCustomPlate: true,
      customIngredients: listNames
    };

    onAddCustomPlateToCart(newCustomPlate);
    setIsAddedSuccessfully(true);
    setTimeout(() => {
      setIsAddedSuccessfully(false);
      handleReset();
    }, 1800);
  };

  const isFormComplete = selectedBase !== null && selectedProtein !== null && selectedBean !== null;

  return (
    <section id="plate-builder-section" className="bg-stone-50 border-y border-stone-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header summary of builder */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-mono font-bold tracking-widest text-amber-600 uppercase bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/15 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Gastronomia Interativa
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-display text-stone-900 tracking-tight mt-4">
            Monte seu Prato Feito (PF)
          </h2>
          <p className="text-stone-500 text-xs md:text-sm mt-3 leading-relaxed">
            Monte a sua verdadeira obra-prima da culinária brasileira. Selecione seus ingredientes favoritos e acompanhe em tempo real o preço, as calorias e as restrições alimentares.
          </p>
        </div>

        {/* Main interactive grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Visual plate simulator stats & action panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 bg-white rounded-3xl border border-stone-200 shadow-lg p-6 md:p-8 flex flex-col justify-between" id="plate-visualizer-left">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-100 mb-6">
                <span className="text-xs font-bold font-display uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-amber-500" />
                  Prato em Construção
                </span>
                <button 
                  onClick={handleReset}
                  className="text-[10px] font-bold font-mono text-stone-400 hover:text-amber-600 transition-colors uppercase tracking-wider"
                >
                  Limpar Prato
                </button>
              </div>

              {/* Dynamic name input */}
              <div className="mb-6">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block mb-1.5">Dê um nome ao seu prato:</label>
                <input 
                  type="text" 
                  value={customPlateName}
                  onChange={(e) => setCustomPlateName(e.target.value)}
                  className="w-full text-base font-bold font-display text-stone-800 bg-stone-50 border border-stone-200/80 rounded-xl px-3.5 py-2Focus focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                  placeholder="Ex: Almoço do Campeão"
                  id="custom-plate-name-input"
                />
              </div>

              {/* Graphical Partition Plate Container */}
              <div className="relative mb-6 flex justify-center py-4">
                <div className="w-56 h-56 rounded-full border-12 border-stone-100 bg-stone-50 shadow-inner relative overflow-hidden flex items-center justify-center transition-all">
                  
                  {/* Outer circle layout partition lines */}
                  <div className="absolute inset-0 border-r border-stone-200/50" />
                  <div className="absolute inset-0 border-b border-stone-200/50" />

                  {/* Partition Visual Items (Conditional renders) */}
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-stone-100/30 flex items-center justify-center p-3 text-center">
                    {selectedBase ? (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-amber-800 tracking-tight leading-none bg-amber-100 px-1.5 py-0.5 rounded">{selectedBase.name.split(' ')[0]}</span>
                        <span className="text-[8px] font-mono text-amber-600">Base</span>
                      </motion.div>
                    ) : (
                      <span className="text-[10px] text-stone-300 font-mono italic">Sem Base</span>
                    )}
                  </div>

                  <div className="absolute right-0 top-0 w-1/2 h-1/2 flex items-center justify-center p-2 text-center border-l border-b border-stone-200/40">
                    {selectedProtein ? (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-emerald-800 tracking-tight leading-none bg-emerald-50 px-1.5 py-0.5 rounded">{selectedProtein.name.split(' ')[0]}</span>
                        <span className="text-[8px] font-mono text-emerald-600">Proteína</span>
                      </motion.div>
                    ) : (
                      <span className="text-[10px] text-stone-300 font-mono italic">Proteína</span>
                    )}
                  </div>

                  <div className="absolute left-0 top-0 w-1/2 h-1/2 flex items-center justify-center p-2 text-center border-r border-b border-stone-200/40">
                    {selectedBean ? (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-sky-800 tracking-tight leading-none bg-sky-50 px-1.5 py-0.5 rounded">{selectedBean.name.split(' ')[0]}</span>
                        <span className="text-[8px] font-mono text-sky-600">Feijão</span>
                      </motion.div>
                    ) : (
                      <span className="text-[10px] text-stone-300 font-mono italic">Grão</span>
                    )}
                  </div>

                  {/* Sides Bubble center */}
                  {selectedSides.length > 0 && (
                    <div className="absolute bg-white/95 rounded-2xl p-1.5 min-w-[50px] shadow-md border border-stone-200 text-[8px] font-mono font-bold text-stone-700 flex flex-col items-center justify-center">
                      <span>+{selectedSides.length} Acomp.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Nutritional/Badge Metrics info */}
              <div className="space-y-4 mb-8">
                {/* Diet tags */}
                {dietaryBadges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center py-2 border-y border-stone-100">
                    {dietaryBadges.map(badge => (
                      <span key={badge} className="text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-100">
                        <Leaf className="w-2.5 h-2.5" />
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Micro calorie bar */}
                <div className="flex justify-between items-center text-xs text-stone-500 font-mono">
                  <span>Energia Estimada</span>
                  <span className="text-stone-800 font-bold">{totalCalories} kcal</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((totalCalories / 1200) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Price & Primary Call to Action */}
            <div className="border-t border-stone-100 pt-6 mt-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[9px] uppercase font-mono tracking-wider text-stone-400">Total do Prato</p>
                  <p className="text-2xl font-black font-mono text-stone-900">R$ {totalPrice.toFixed(2)}</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isAddedSuccessfully ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider text-center py-3.5 rounded-xl shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Adicionado com sucesso!
                  </motion.div>
                ) : (
                  <button 
                    disabled={!isFormComplete}
                    onClick={handleAddToCart}
                    id="add-custom-plate-to-order-btn"
                    className={`w-full font-bold text-xs uppercase tracking-widest text-center py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all ${
                      isFormComplete 
                        ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-stone-950/10 cursor-pointer' 
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {isFormComplete ? 'Adicionar ao Pedido' : 'Selecione Base + Proteína + Feijão'}
                  </button>
                )}
              </AnimatePresence>

              {!isFormComplete && (
                <p className="text-[10px] text-stone-400 text-center mt-2.5 leading-relaxed flex items-center justify-center gap-1 px-4">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-stone-300" />
                  Selecione pelo menos um Grão, uma Proteína e um Feijão para finalizar.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Tabular / Section Options Selection block */}
          <div className="lg:col-span-8 space-y-8" id="plate-ingredients-selector-stack">
            
            {/* Step 1: Bases */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 md:p-8" id="step-base">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 bg-amber-500 text-stone-950 rounded-lg text-xs font-bold font-mono flex items-center justify-center">1</span>
                <div>
                  <h3 className="text-lg font-bold font-display text-stone-900">Selecione uma Base</h3>
                  <p className="text-xs text-stone-500">Fundação do prato, escolha apenas uma opção</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bases.map(ingredient => (
                  <div 
                    key={ingredient.id}
                    onClick={() => setSelectedBase(ingredient)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-28 relative ${
                      selectedBase?.id === ingredient.id
                        ? 'bg-amber-500/5 border-amber-500 shadow-sm'
                        : 'border-stone-200/70 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[13px] font-bold text-stone-800 leading-tight">{ingredient.name}</h4>
                        <div className="flex gap-2.5 mt-1.5 flex-wrap">
                          {ingredient.dietary.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        selectedBase?.id === ingredient.id
                          ? 'bg-amber-500 border-amber-500 text-stone-950'
                          : 'border-stone-300 bg-transparent'
                      }`}>
                        {selectedBase?.id === ingredient.id && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 border-t border-stone-100 pt-2.5 font-mono text-[11px]">
                      <span className="text-stone-400">{ingredient.calories} kcal</span>
                      <span className="text-stone-800 font-bold">+R$ {ingredient.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Proteins */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 md:p-8" id="step-protein">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 bg-amber-500 text-stone-950 rounded-lg text-xs font-bold font-mono flex items-center justify-center">2</span>
                <div>
                  <h3 className="text-lg font-bold font-display text-stone-900">Adicione a Proteína Principal</h3>
                  <p className="text-xs text-stone-500">Carnes nobres cozidas à perfeição ou opções veganas ricas</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {proteins.map(ingredient => (
                  <div 
                    key={ingredient.id}
                    onClick={() => setSelectedProtein(ingredient)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-28 relative ${
                      selectedProtein?.id === ingredient.id
                        ? 'bg-amber-500/5 border-amber-500 shadow-sm'
                        : 'border-stone-200/70 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[13px] font-bold text-stone-800 leading-tight">{ingredient.name}</h4>
                        <div className="flex gap-2.5 mt-1.5 flex-wrap">
                          {ingredient.dietary.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        selectedProtein?.id === ingredient.id
                          ? 'bg-amber-500 border-amber-500 text-stone-950'
                          : 'border-stone-300 bg-transparent'
                      }`}>
                        {selectedProtein?.id === ingredient.id && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 border-t border-stone-100 pt-2.5 font-mono text-[11px]">
                      <span className="text-stone-400">{ingredient.calories} kcal</span>
                      <span className="text-stone-800 font-bold">+R$ {ingredient.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Legumes/Beans */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 md:p-8" id="step-beans">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 bg-amber-500 text-stone-950 rounded-lg text-xs font-bold font-mono flex items-center justify-center">3</span>
                <div>
                  <h3 className="text-lg font-bold font-display text-stone-900">Selecione o Feijão/Grão</h3>
                  <p className="text-xs text-stone-500">O caldo cremoso indispensável para unir os sabores do prato</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {beans.map(ingredient => (
                  <div 
                    key={ingredient.id}
                    onClick={() => setSelectedBean(ingredient)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between h-28 relative ${
                      selectedBean?.id === ingredient.id
                        ? 'bg-amber-500/5 border-amber-500 shadow-sm'
                        : 'border-stone-200/70 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[12px] font-bold text-stone-800 leading-tight block">{ingredient.name}</h4>
                        <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1.5">
                          {ingredient.dietary[0] || 'Completo'}
                        </span>
                      </div>

                      <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
                        selectedBean?.id === ingredient.id
                          ? 'bg-amber-500 border-amber-500 text-stone-950'
                          : 'border-stone-300 bg-transparent'
                      }`}>
                        {selectedBean?.id === ingredient.id && <Check className="w-3 h-3 animate-ping-once" />}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 border-t border-stone-100 pt-2.5 font-mono text-[10px]">
                      <span className="text-stone-400">{ingredient.calories} kcal</span>
                      <span className="text-stone-800 font-bold">+R$ {ingredient.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Sides & Gourmet Extras */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 md:p-8" id="step-sides-extras">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 bg-amber-500 text-stone-950 rounded-lg text-xs font-bold font-mono flex items-center justify-center">4</span>
                <div>
                  <h3 className="text-lg font-bold font-display text-stone-900">Acompanhamentos & Extras Gourmet</h3>
                  <p className="text-xs text-stone-500">Escolha até 3 itens (Fritas, couve, farofinha, queijo coalho...)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sidesAndExtras.map(ingredient => {
                  const isChecked = selectedSides.some(s => s.id === ingredient.id);
                  const isMaxReached = selectedSides.length >= 3 && !isChecked;

                  return (
                    <div 
                      key={ingredient.id}
                      onClick={() => !isMaxReached && toggleSide(ingredient)}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between h-28 relative ${
                        isChecked
                          ? 'bg-amber-500/5 border-amber-500 shadow-sm cursor-pointer'
                          : isMaxReached
                          ? 'border-stone-100 bg-stone-50/50 opacity-40 cursor-not-allowed'
                          : 'border-stone-200/70 hover:border-stone-300 bg-white cursor-pointer'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-[12px] font-bold text-stone-800 leading-none">{ingredient.name}</h4>
                          <span className="text-[8px] font-mono uppercase text-stone-400 mt-1.5 block">
                            {ingredient.category === 'side' ? 'Acompanhamento' : 'Gourmet Extra'}
                          </span>
                        </div>

                        <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-amber-500 border-amber-500 text-stone-950'
                            : 'border-stone-300 bg-transparent'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3 border-t border-stone-100 pt-2.5 font-mono text-[10px]">
                        <span className="text-stone-400">{ingredient.calories} kcal</span>
                        <span className="text-stone-800 font-bold">+R$ {ingredient.price.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
