import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, Check, Award, AlertCircle, Sparkles, Utensils } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartSidebarProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // overall percentage
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [showOrderReviewReceipt, setShowOrderReviewReceipt] = useState(false);
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);

  // Re-calculate delivery cost
  const deliveryCost = cartItems.length > 0 ? 7.50 : 0;
  
  // Totals calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (appliedDiscount / 100);
  const totalWithDelivery = Math.max(0, subtotal - discountAmount + deliveryCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const formattedCode = promoCode.trim().toUpperCase();
    if (formattedCode === 'SABORES10') {
      setAppliedDiscount(10);
      setPromoSuccess('Cupom "SABORES10" aplicado! Você ganhou 10% de desconto.');
    } else if (formattedCode === 'FRETEGRATIS') {
      setAppliedDiscount(0); // separate voucher trigger
      setPromoSuccess('Parabéns! Desconto de entrega simulado ativado.');
    } else if (formattedCode === '') {
      setPromoError('Por favor, informe um código de cupom.');
    } else {
      setPromoError('Cupom inválido. Experimente usar "SABORES10".');
    }
  };

  const executeSimulatedCheckout = () => {
    setEstimatedMinutes(Math.floor(Math.random() * (40 - 25 + 1)) + 25);
    setShowOrderReviewReceipt(true);
  };

  const handleFinishNewOrder = () => {
    setShowOrderReviewReceipt(false);
    setPromoCode('');
    setAppliedDiscount(0);
    onClearCart();
    onClose();
  };

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-root">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between"
              id="cart-drawer-panel"
            >
              {/* Draw Header */}
              <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold font-display uppercase tracking-wider">Meu Pedido</h2>
                  <span className="text-[10px] bg-stone-800 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-stone-700/50">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} itens
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-all border border-stone-800"
                  id="close-cart-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic state: Normal Cart or Order Successful Receipt */}
              <div className="flex-1 overflow-y-auto px-6 py-6" id="cart-drawer-scroll-body">
                {showOrderReviewReceipt ? (
                  /* ORDER RECEIPT PREVIEW */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-6"
                    id="order-receipt-panel"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-4 border-emerald-50">
                      <Check className="w-8 h-8 font-bold" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-display text-stone-900">Pedido Confirmado!</h3>
                      <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">
                        Seu pedido clássico foi recebido com sucesso pela nossa cozinha e já está sendo preparado de forma artesanal.
                      </p>
                    </div>

                    {/* Delivery summary section */}
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60 text-left space-y-3.5">
                      <div className="flex justify-between items-center pb-2.5 border-b border-stone-100">
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Tempo estimado para entrega</span>
                        <span className="text-xs font-bold text-amber-600 font-mono">{estimatedMinutes} min</span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Endereço de Entrega</p>
                        <p className="text-xs text-stone-700 font-semibold leading-relaxed">Alameda Gourmet, 1012 - Jardins, São Paulo - SP</p>
                      </div>

                      {/* Purchased products bullet points */}
                      <div className="pt-2.5 border-t border-stone-100 space-y-2">
                        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Itens do Cupom</p>
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between text-[11px] text-stone-600 font-sans">
                            <span className="truncate max-w-[200px]">{item.quantity}x {item.name}</span>
                            <span className="font-mono text-stone-800">R$ {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-stone-900 rounded-2xl text-left space-y-2 font-mono text-xs text-stone-300">
                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-stone-400">
                          <span>Desconto ({appliedDiscount}%)</span>
                          <span>- R$ {discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-stone-400">
                        <span>Taxa de Entrega</span>
                        <span>R$ {deliveryCost.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-stone-800">
                        <span>Valor Pago</span>
                        <span>R$ {totalWithDelivery.toFixed(2)}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleFinishNewOrder}
                      className="w-full bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer shadow-md"
                      id="close-receipt-flow-btn"
                    >
                      Acompanhar no Mapa / Voltar
                    </button>
                  </motion.div>
                ) : cartItems.length === 0 ? (
                  /* EMPTY STATE */
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16" id="empty-cart-view">
                    <div className="p-5 rounded-full bg-stone-100 border border-stone-200 text-stone-400">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold font-display text-stone-800">Seu pedido está vazio</h3>
                      <p className="text-stone-400 text-xs mt-1.5 leading-relaxed max-w-[240px] mx-auto">
                        Adicione deliciosos pratos feitos gourmet, doces finos ou monte seu próprio prato!
                      </p>
                    </div>
                  </div>
                ) : (
                  /* PRODUCT LIST VIEW */
                  <div className="space-y-6" id="cart-items-list">
                    {cartItems.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        exit={{ opacity: 0, x: -50 }}
                        className="flex gap-4 pb-4 border-b border-stone-100 items-start"
                        id={`cart-item-${item.id}`}
                      >
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 flex-shrink-0">
                            <Utensils className="w-6 h-6" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-xs font-bold text-stone-900 leading-tight truncate pr-2">
                              {item.name}
                            </h4>
                            <span className="text-xs font-bold font-mono text-stone-900 flex-shrink-0">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          {item.isCustomPlate && item.customIngredients && (
                            <div className="text-[10px] text-stone-500 leading-snug mb-2 font-sans pl-2 border-l-2 border-amber-500/50">
                              <span className="font-semibold block text-stone-600 mb-0.5">Customizado:</span>
                              {item.customIngredients.join(' • ')}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-2.5">
                            {/* Counter Controls */}
                            <div className="flex items-center border border-stone-200 bg-stone-50 rounded-lg overflow-hidden">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="p-1 px-2.5 text-stone-500 hover:bg-stone-200 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 font-mono text-xs font-bold text-stone-800">{item.quantity}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="p-1 px-2.5 text-stone-500 hover:bg-stone-200 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button 
                              onClick={() => onRemoveItem(item.id)}
                              className="text-stone-400 hover:text-red-500 transition-colors p-1"
                              title="Remover"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* VOUCHER COUPON PROMO FORM */}
                    <div className="pt-4 border-t border-stone-100">
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-2.5 text-stone-400 w-4 h-4" />
                          <input 
                            type="text" 
                            placeholder="CUPOM (Ex: SABORES10)" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="w-full text-xs font-mono font-semibold bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white uppercase"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-2xs uppercase tracking-wider px-4 rounded-xl transition-colors"
                        >
                          Aplicar
                        </button>
                      </form>

                      {promoError && (
                        <p className="text-[10px] text-red-500 mt-2 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {promoError}
                        </p>
                      )}

                      {promoSuccess && (
                        <p className="text-[10px] text-emerald-600 mt-2 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          {promoSuccess}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer calculations block */}
              {!showOrderReviewReceipt && cartItems.length > 0 && (
                <div className="px-6 py-6 border-t border-stone-100 bg-stone-50" id="cart-drawer-footer">
                  <div className="space-y-2.5 mb-6 text-xs font-sans text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-stone-800">R$ {subtotal.toFixed(2)}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Desconto ({appliedDiscount}%)
                        </span>
                        <span className="font-mono">- R$ {discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pb-1">
                      <span>Taxa de Entrega (Média Jardins)</span>
                      <span className="font-mono text-stone-800">R$ {deliveryCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-stone-900 pt-3 border-t border-stone-200">
                      <span>Total Geral</span>
                      <span className="font-mono text-lg text-stone-950">R$ {totalWithDelivery.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={executeSimulatedCheckout}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    id="checkout-simulate-btn"
                  >
                    <ShoppingBag className="w-4 h-5" />
                    Finalizar Emulação do Pedido
                  </button>
                  <p className="text-[9px] text-stone-400 text-center mt-2 font-mono">Simulador de compra protegido. Nenhum pagamento real solicitado.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
