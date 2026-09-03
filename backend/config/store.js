import bcrypt from 'bcryptjs';

export const initialFoods = [
  {
    _id: 'food_1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender succulent chicken pieces, rich saffron, and authentic hand-ground Chettinad spices. Served with raita and brinjal curry.',
    category: 'Biryani',
    price: 220,
    rating: 4.8,
    available: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_2',
    name: 'Mutton Biryani',
    description: 'Slow-cooked traditional Seeraga Samba mutton biryani with bone-in tender meat, infused with royal aromatic herbs and caramelized onions.',
    category: 'Biryani',
    price: 280,
    rating: 4.9,
    available: true,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_3',
    name: 'Veg Biryani',
    description: 'Layered fragrant basmati rice loaded with fresh seasonal garden vegetables, paneer cubes, and roasted cashews gently simmered in dum style.',
    category: 'Vegetarian',
    price: 160,
    rating: 4.6,
    available: true,
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e9a?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_4',
    name: 'Chicken Fried Rice',
    description: 'Wok-tossed long-grain rice with shredded tender chicken breast, scrambled eggs, crisp bell peppers, and scallions in savory oriental sauces.',
    category: 'Chinese',
    price: 180,
    rating: 4.7,
    available: true,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_5',
    name: 'Veg Fried Rice',
    description: 'Crisp diced carrots, beans, baby corn, and cabbage flash-fried in a roaring hot wok with spiced jasmine rice and a hint of white pepper.',
    category: 'Chinese',
    price: 140,
    rating: 4.5,
    available: true,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_6',
    name: 'Butter Chicken',
    description: 'Char-grilled tandoori chicken cooked in a velvet-smooth creamy tomato and butter gravy, subtly sweetened with fenugreek leaves (kasoori methi).',
    category: 'Chicken',
    price: 240,
    rating: 4.9,
    available: true,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_7',
    name: 'Paneer Butter Masala',
    description: 'Soft cottage cheese cubes simmered in a luscious makhani gravy enriched with fresh cream, ground cardamom, and toasted melon seeds.',
    category: 'Vegetarian',
    price: 190,
    rating: 4.7,
    available: true,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_8',
    name: 'Chicken 65',
    description: 'Spicy, deep-fried chicken chunks marinated in ginger-garlic paste, red chillies, and curry leaves with a tangy lemon twist.',
    category: 'Chicken',
    price: 180,
    rating: 4.8,
    available: true,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_9',
    name: 'Parotta',
    description: 'Traditional flaky, multi-layered Malabar / Madurai parotta, golden-crisp on the outside and soft inside. Pair with kurma or salna. (Set of 2 pcs)',
    category: 'South Indian',
    price: 20,
    rating: 4.8,
    available: true,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_10',
    name: 'Fresh Lime Juice',
    description: 'Chilled freshly squeezed lime juice with a pinch of black salt and fresh mint sprigs. Choice of sweet, salted, or mixed.',
    category: 'Beverages',
    price: 60,
    rating: 4.5,
    available: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_11',
    name: 'South Indian Meals',
    description: 'Grand festive banana leaf style meal featuring Ponni rice, Sambar, Rasam, Kara Kuzhambu, Poriyal, Kootu, Appalam, Curd, and Payasam.',
    category: 'South Indian',
    price: 150,
    rating: 4.9,
    available: true,
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  },
  {
    _id: 'food_12',
    name: 'Gulab Jamun',
    description: 'Golden fried khoya dumplings soaked in warm rose water and cardamom sugar syrup. Served warm with a garnish of pistachio slivers. (2 pcs)',
    category: 'Desserts',
    price: 80,
    rating: 4.9,
    available: true,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date()
  }
];

export const initialUsers = [
  {
    _id: 'user_admin_1',
    name: 'Brindha Admin',
    email: 'admin@brindhacloudkitchen.com',
    phone: '9876543210',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    createdAt: new Date()
  },
  {
    _id: 'user_cust_1',
    name: 'Priya Raman',
    email: 'customer@brindhacloudkitchen.com',
    phone: '9845012345',
    password: bcrypt.hashSync('customer123', 10),
    role: 'customer',
    createdAt: new Date()
  },
  {
    _id: 'user_cust_2',
    name: 'Karthik Subramanian',
    email: 'customer@example.com',
    phone: '9876500001',
    password: bcrypt.hashSync('customer123', 10),
    role: 'customer',
    createdAt: new Date()
  }
];

export const initialOrders = [
  {
    _id: 'ord_1001',
    user: 'user_cust_1',
    customerName: 'Priya Raman',
    phone: '9845012345',
    deliveryAddress: 'Flat 402, Royal Palms Apartment, Anna Nagar West, Chennai - 600040',
    items: [
      {
        food: 'food_1',
        name: 'Chicken Biryani',
        price: 220,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
      },
      {
        food: 'food_10',
        name: 'Fresh Lime Juice',
        price: 60,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 560,
    deliveryCharge: 40,
    totalAmount: 600,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Preparing',
    createdAt: new Date(Date.now() - 35 * 60 * 1000)
  }
];

export const inMemoryDB = {
  foods: [...initialFoods],
  users: [...initialUsers],
  orders: [...initialOrders],
  contacts: []
};
