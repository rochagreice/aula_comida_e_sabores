import { MenuItem, CustomIngredient } from './types';

// Let's store our actual generated images paths here
export const BANNER_IMAGE = '/src/assets/images/bistro_interior_1779917444872.png';

export const MENU_ITEMS: MenuItem[] = [
  // --- PRATOS FEITOS GOURMET ---
  {
    id: 'pf-imperial',
    name: 'Grelhado Imperial',
    description: 'Filé mignon bovino de corte nobre grelhado na brasa, acompanhado de arroz branco soltinho, feijão preto defumado com paio, ovo caipira estalado na manteiga de garrafa, fritas rústicas crocantes e mix de folhas com tomates cereja.',
    category: 'mains',
    price: 49.90,
    image: '/src/assets/images/gourmet_prato_feito_1779917461431.png',
    tags: ['Nobre', 'Mais Vendido', 'Clássico'],
    calories: 780,
    prepTime: '20 min',
    ingredients: ['Filé Mignon 200g', 'Arroz de agulhinha', 'Feijão preto defumado', 'Ovo Caipira Estalado', 'Batata Frita Rústica', 'Limão Siciliano', 'Mix de Folhas e Cebola Roxa']
  },
  {
    id: 'pf-caipira',
    name: 'PF Caipira Premium',
    description: 'Sobrepaleta de leitão confitada e grelhada, polenta cremosa feita com milho verde fresco e queijo da Canastra mergulhado em molho demi-glace, arroz integral rústico, couve refogada no alho e farofinha crocante de bacon e cebola.',
    category: 'mains',
    price: 42.50,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    tags: ['Tradicional', 'Sabor Intenso'],
    calories: 890,
    prepTime: '25 min',
    ingredients: ['Sobrepaleta de porco nobre', 'Polenta cremosa', 'Queijo da Canastra', 'Arroz integral', 'Couve fresca cortada fina', 'Farofa de bacon com farinha de Mandioca flocada']
  },
  {
    id: 'pf-mar',
    name: 'PF das Marés',
    description: 'Lombo de peixe namorado fresco grelhado à perfeição, purê cremoso de banana da terra, arroz de coco aromático salpicado com castanhas, farofa de camarão seco e vinagrete clássico de manga com pimentões coloridos.',
    category: 'mains',
    price: 52.00,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80',
    tags: ['Frutos do Mar', 'Leve', 'Sem Glúten'],
    calories: 620,
    prepTime: '18 min',
    ingredients: ['Peixe Namorado grelhado', 'Banana da Terra madura', 'Arroz com coco e amêndoas', 'Farofa de Mandioca artesanal', 'Camarão seco selecionado', 'Tomate, manga e salsa']
  },
  {
    id: 'pf-vegano',
    name: 'Bistrô Vegano',
    description: 'Elegante steak de grão-de-bico grelhado com cogumelos frescos salteados no azeite de ervas, arroz de couve-flor e quinoa vermelha, feijão branco cozido com sálvia e alecrim, brócolis tostados na chapa e guacamole.',
    category: 'mains',
    price: 39.90,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    tags: ['Vegano', 'Sem Lactose', 'Sem Glúten'],
    calories: 490,
    prepTime: '15 min',
    ingredients: ['Steak de grão-de-bico artesanal', 'Cogumelos Portobello', 'Quinoa vermelha', 'Feijão Branco premium', 'Brócolis frescos', 'Abacate Hass', 'Azeite extra virgem']
  },

  // --- SOBREMESAS ---
  {
    id: 'sob-domo',
    name: 'Domo Imperial de Chocolate',
    description: 'Nossa sobremesa assinatura. Uma esfera oca de chocolate belga recheada com ganache suave de avelã e brownie úmido de castanhas, servida com uma exuberante calda quente de caramelo salgado que derrete tudo na mesa.',
    category: 'desserts',
    price: 34.00,
    image: '/src/assets/images/gourmet_sobremesa_1779917477789.png',
    tags: ['Assinatura', 'Favorito', 'Premium'],
    calories: 550,
    prepTime: '10 min',
    ingredients: ['Chocolate Belga Callebaut 54%', 'Caramelo de baunilha Bourbon', 'Brownie de chocolate amargo', 'Castanhas de Caju tostadas', 'Framboesas frescas']
  },
  {
    id: 'sob-gateau',
    name: 'Petit Gâteau de Doce de Leite',
    description: 'Bolinho macio e morno de doce de leite artesanal com o centro líquido e fluído, servido com sorvete de creme de baunilha de Madagascar artesanal de fabricação própria, crumble crocante de coco tostado e physalis.',
    category: 'desserts',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1541795795328-f073b763494e?w=800&auto=format&fit=crop&q=80',
    tags: ['Clássico', 'Doce de Leite'],
    calories: 470,
    prepTime: '12 min',
    ingredients: ['Doce de leite argentino', 'Sorvete caseiro de baunilha', 'Crumble crocante com manteiga', 'Melted center']
  },
  {
    id: 'sob-limao',
    name: 'Torta Tartellete de Limão Siciliano',
    description: 'Delicada cestinha folhada de massa sablée doce e amanteigada, recheada com coalhada de limão siciliano aveludada, coroada com merengue italiano flambado no maçarico e raspas de limão taiti.',
    category: 'desserts',
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&auto=format&fit=crop&q=80',
    tags: ['Cítrico', 'Leve', 'Refrescante'],
    calories: 380,
    prepTime: '8 min',
    ingredients: ['Limão Siciliano orgânico', 'Farinha de amêndoas premium', 'Claras pasteurizadas para merengue', 'Raspas de limão fresco']
  },

  // --- DOCES ---
  {
    id: 'doce-brigadeiro',
    name: 'Sinfonia de Brigadeiros Premium',
    description: 'Sofisticado quarteto de brigadeiros artesanais boleados na hora: cacau belga 70% com nibs cruas, pistache iraniano caramelizado, leite ninho cremoso com amêndoas laminadas e coco de praia tostado.',
    category: 'sweets',
    price: 18.00,
    image: '/src/assets/images/doces_artesanais_1779917498202.png',
    tags: ['Artesanal', 'Para Presente', 'Glúten Free'],
    calories: 320,
    prepTime: '5 min',
    ingredients: ['Leite condensado de cana-de-açúcar', 'Nibs de Cacau orgânicas', 'Pistache Premium raspado', 'Creme de leite de alta gordura', 'Coco fresco ralado']
  },
  {
    id: 'doce-quindim',
    name: 'Quindim de Oiro à Antiga',
    description: 'Doce tradicional português-brasileiro feito com gemas de ovos caipiras selecionados, coco fresco ralado à mão de textura úmida e fava de baunilha, banhado por uma calda levemente caramelizada de brilho espelhado.',
    category: 'sweets',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1528975604071-b4daaf306c88?w=800&auto=format&fit=crop&q=80',
    tags: ['Histórico', 'Tradição', 'Glúten Free'],
    calories: 290,
    prepTime: '5 min',
    ingredients: ['Gemas de ovos caipiras (livre de odor)', 'Coco ralado natural', 'Açúcar de cana cristal', 'Manteiga sem sal purificada', 'Fava de baunilha']
  },
  {
    id: 'doce-brulee',
    name: 'Cocada Cremosa d\'Ébano',
    description: 'Exclusiva cocada cremosa assada lentamente em forno a lenha, servida sobre casca de melado, coberta por um crocante de pinhão triturado e açúcar maçaricado na hora sob o olhar do cliente.',
    category: 'sweets',
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&auto=format&fit=crop&q=80',
    tags: ['Exclusivo', 'Sabor Rústico'],
    calories: 410,
    prepTime: '7 min',
    ingredients: ['Coco verde e coco seco triturados', 'Caramelo salgado leve', 'Pinhão do sul tostado', 'Melado de cana de engenho']
  }
];

export const CUSTOM_INGREDIENTS: CustomIngredient[] = [
  // --- BASES ---
  { id: 'b1', name: 'Arroz de Jasmim Soltinho', category: 'base', price: 6.00, calories: 180, dietary: ['Vegano', 'Sem Glúten', 'Sem Lactose'] },
  { id: 'b2', name: 'Arroz Integral de Sete Grãos', category: 'base', price: 8.00, calories: 210, dietary: ['Vegano', 'Sem Glúten', 'Sem Lactose'] },
  { id: 'b3', name: 'Purê Cremoso de Banana da Terra', category: 'base', price: 9.00, calories: 150, dietary: ['Vegetariano', 'Sem Glúten'] },
  { id: 'b4', name: 'Aligot de Queijo Meia Cura & Mandioca', category: 'base', price: 12.00, calories: 280, dietary: ['Vegetariano', 'Sem Glúten'] },

  // --- PROTEÍNAS ---
  { id: 'p1', name: 'Filé Mignon à Brasa (150g)', category: 'protein', price: 24.00, calories: 250, dietary: ['Sem Glúten', 'Sem Lactose'] },
  { id: 'p2', name: 'Filé de Tilápia Grelhado no Azeite', category: 'protein', price: 16.00, calories: 170, dietary: ['Sem Glúten', 'Sem Lactose'] },
  { id: 'p3', name: 'Sobrecoxa de Frango Confitada e Grelhada', category: 'protein', price: 14.00, calories: 220, dietary: ['Sem Glúten', 'Sem Lactose'] },
  { id: 'p4', name: 'Elegante Steak de Cogumelos e Grão-de-bico', category: 'protein', price: 15.00, calories: 160, dietary: ['Vegano', 'Sem Glúten', 'Sem Lactose'] },

  // --- FEIJÕES ---
  { id: 'f1', name: 'Feijão Preto Defumado Angus', category: 'bean', price: 5.00, calories: 110, dietary: ['Sem Glúten', 'Sem Lactose'] },
  { id: 'f2', name: 'Feijão Carioca Clássico Temperado', category: 'bean', price: 4.50, calories: 100, dietary: ['Vegano', 'Sem Glúten', 'Sem Lactose'] },
  { id: 'f3', name: 'Feijão Branco de Florença com Ervas', category: 'bean', price: 6.00, calories: 120, dietary: ['Vegano', 'Sem Glúten', 'Sem Lactose'] },

  // --- ACOMPANHAMENTOS ---
  { id: 'a1', name: 'Ovo Frito Gema Mole com Flor de Sal', category: 'side', price: 4.00, calories: 90, dietary: ['Vegetariano', 'Sem Glúten', 'Sem Lactose'] },
  { id: 'a2', name: 'Fritas Rústicas com Alecrim', category: 'side', price: 7.00, calories: 180, dietary: ['Vegano', 'Sem Glúten', 'Sem Lactose'] },
  { id: 'a3', name: 'Couve Fresca Salteada no Alho Roxo', category: 'side', price: 5.00, calories: 45, dietary: ['Vegano', 'Sem Glúten', 'Sem Lactose'] },
  { id: 'a4', name: 'Polenta Frita Crocante', category: 'side', price: 6.50, calories: 140, dietary: ['Vegetariano', 'Sem Glúten'] },

  // --- EXTRAS GOURMET ---
  { id: 'e1', name: 'Farofinha de Pururuca de Bacon', category: 'extra', price: 4.50, calories: 130, dietary: ['Sem Lactose'] },
  { id: 'e2', name: 'Queijo Coalho Grelhado na Grelha', category: 'extra', price: 6.00, calories: 170, dietary: ['Vegetariano', 'Sem Glúten'] },
  { id: 'e3', name: 'Mix de Folhas Preciosas com Nozes', category: 'extra', price: 5.00, calories: 60, dietary: ['Vegetariano', 'Sem Glúten', 'Sem Lactose'] }
];

export const CUSTOMER_REVIEWS = [
  {
    id: 'r1',
    name: 'Ana Cecília Fontes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'O Grelhado Imperial é de outro mundo! A carne derrete na boca e o feijão com sabor defumado remete às melhores memórias de infância, mas com um toque refinado do bistrô. A esfera de chocolate é espetacular!',
    date: 'Hoje'
  },
  {
    id: 'r2',
    name: 'Chef Ricardo Albuquerque',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Comida com essência brasileira, mas vestida com técnicas de alta cozinha. O purê de banana-da-terra do PF de peixe possui acidez e dulçor perfeitamente equilibrados. Volto sempre que estou na região.',
    date: 'Ontem'
  },
  {
    id: 'r3',
    name: 'Juliana Pinho',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Brigadeiros espetaculares de pistache e leite ninho com Nutella. Sem falar no cardápio de combos personalizados onde eu monto meu próprio PF leve e nutritivo. Super recomendo!',
    date: 'Há 3 dias'
  }
];
