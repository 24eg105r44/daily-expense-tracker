// Seed Data for Daily Expense Tracker Backend

export const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Food & Dining', icon: 'Utensils', color: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.15)', limit: 350 },
  { id: 'cat-2', name: 'Transport & Fuel', icon: 'Car', color: '#4d96ff', bg: 'rgba(77, 150, 255, 0.15)', limit: 180 },
  { id: 'cat-3', name: 'Groceries', icon: 'ShoppingBag', color: '#6bcb77', bg: 'rgba(107, 203, 119, 0.15)', limit: 300 },
  { id: 'cat-4', name: 'Utilities & Bills', icon: 'Zap', color: '#ffd93d', bg: 'rgba(255, 217, 61, 0.15)', limit: 250 },
  { id: 'cat-5', name: 'Entertainment', icon: 'Film', color: '#9b59b6', bg: 'rgba(155, 89, 182, 0.15)', limit: 150 },
  { id: 'cat-6', name: 'Health & Fitness', icon: 'HeartPulse', color: '#e84393', bg: 'rgba(232, 67, 147, 0.15)', limit: 120 },
  { id: 'cat-7', name: 'Shopping', icon: 'Tag', color: '#ff922b', bg: 'rgba(255, 146, 43, 0.15)', limit: 150 },
  { id: 'cat-8', name: 'Miscellaneous', icon: 'Box', color: '#868e96', bg: 'rgba(134, 142, 150, 0.15)', limit: 100 },
];

export const PAYMENT_METHODS = [
  { id: 'cash', name: 'Cash', icon: 'Banknote' },
  { id: 'upi', name: 'UPI / GPay / PhonePe', icon: 'QrCode' },
  { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
  { id: 'bank', name: 'Net Banking', icon: 'Building' }
];

const getRelativeDateStr = (daysOffset, hour = 12, minute = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - daysOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

export const INITIAL_EXPENSES = [
  {
    id: 'exp-1',
    description: 'Morning Coffee & Muffin',
    merchant: 'Starbucks Coffee',
    amount: 4.50,
    categoryId: 'cat-1',
    paymentMethod: 'upi',
    date: getRelativeDateStr(0, 8, 30),
    notes: 'Quick morning breakfast',
    receiptAttached: true,
  },
  {
    id: 'exp-2',
    description: 'Daily Bus & Metro Pass',
    merchant: 'City Transit',
    amount: 5.00,
    categoryId: 'cat-2',
    paymentMethod: 'upi',
    date: getRelativeDateStr(0, 9, 15),
    notes: 'Daily commute to workplace',
    receiptAttached: false,
  },
  {
    id: 'exp-3',
    description: 'Office Cafeteria Lunch',
    merchant: 'Corporate Diner',
    amount: 9.50,
    categoryId: 'cat-1',
    paymentMethod: 'card',
    date: getRelativeDateStr(0, 13, 0),
    notes: 'Chicken Rice Bowl & Beverage',
    receiptAttached: false,
  },
  {
    id: 'exp-4',
    description: 'Evening Tea & Biscuits',
    merchant: 'Corner Tea Stall',
    amount: 2.20,
    categoryId: 'cat-1',
    paymentMethod: 'cash',
    date: getRelativeDateStr(0, 17, 15),
    notes: 'Break with colleagues',
    receiptAttached: false,
  },
  {
    id: 'exp-5',
    description: 'Fresh Fruits & Vegetables',
    merchant: 'Supermarket Fresh',
    amount: 42.80,
    categoryId: 'cat-3',
    paymentMethod: 'card',
    date: getRelativeDateStr(1, 18, 45),
    notes: 'Milk, Eggs, Tomatoes, Bread',
    receiptAttached: true,
  },
  {
    id: 'exp-6',
    description: 'Fuel Station Tank Refill',
    merchant: 'Shell Station',
    amount: 28.00,
    categoryId: 'cat-2',
    paymentMethod: 'card',
    date: getRelativeDateStr(1, 8, 10),
    notes: 'Vehicle petrol refill',
    receiptAttached: false,
  },
  {
    id: 'exp-7',
    description: 'Monthly Electricity Bill',
    merchant: 'City Power & Light',
    amount: 68.50,
    categoryId: 'cat-4',
    paymentMethod: 'bank',
    date: getRelativeDateStr(2, 10, 0),
    notes: 'August power usage bill',
    receiptAttached: true,
  },
  {
    id: 'exp-8',
    description: 'Movie Ticket & Snacks',
    merchant: 'Cineplex Cinema',
    amount: 18.00,
    categoryId: 'cat-5',
    paymentMethod: 'upi',
    date: getRelativeDateStr(3, 20, 30),
    notes: 'Weekend movie with friends',
    receiptAttached: false,
  },
  {
    id: 'exp-9',
    description: 'Pharmacy Medicines',
    merchant: 'HealthCare Pharmacy',
    amount: 12.40,
    categoryId: 'cat-6',
    paymentMethod: 'cash',
    date: getRelativeDateStr(4, 14, 20),
    notes: 'Vitamins & cold tablets',
    receiptAttached: false,
  },
  {
    id: 'exp-10',
    description: 'Home Broadband Wifi Bill',
    merchant: 'Airtel Broadband',
    amount: 35.00,
    categoryId: 'cat-4',
    paymentMethod: 'upi',
    date: getRelativeDateStr(5, 11, 0),
    notes: '100 Mbps fiber internet',
    receiptAttached: true,
  },
  {
    id: 'exp-11',
    description: 'Casual Cotton T-Shirt',
    merchant: 'H&M Outlet',
    amount: 22.00,
    categoryId: 'cat-7',
    paymentMethod: 'card',
    date: getRelativeDateStr(6, 16, 40),
    notes: 'Daily wear shopping',
    receiptAttached: false,
  }
];

export const INITIAL_RECURRING = [
  {
    id: 'rec-1',
    title: 'Apartment Monthly Rent',
    amount: 650.00,
    categoryId: 'cat-4',
    frequency: 'Monthly',
    dueDate: 1,
    autoPost: true,
    lastLogged: getRelativeDateStr(20),
  },
  {
    id: 'rec-2',
    title: 'Fiber Wifi Broadband',
    amount: 35.00,
    categoryId: 'cat-4',
    frequency: 'Monthly',
    dueDate: 5,
    autoPost: true,
    lastLogged: getRelativeDateStr(5),
  },
  {
    id: 'rec-3',
    title: 'Netflix 4K HD Streaming',
    amount: 15.99,
    categoryId: 'cat-5',
    frequency: 'Monthly',
    dueDate: 15,
    autoPost: false,
    lastLogged: getRelativeDateStr(36),
  },
  {
    id: 'rec-4',
    title: 'Gym & Fitness Pass',
    amount: 29.00,
    categoryId: 'cat-6',
    frequency: 'Monthly',
    dueDate: 20,
    autoPost: false,
    lastLogged: getRelativeDateStr(40),
  }
];

export const SAMPLE_SHARED_SPLITS = [
  {
    id: 'split-1',
    title: 'Friday Night Group Dinner',
    totalAmount: 96.00,
    paidBy: 'Alex (You)',
    date: getRelativeDateStr(2, 21, 0),
    members: [
      { name: 'Alex (You)', share: 24.00, paid: 96.00, status: 'Payer' },
      { name: 'Rahul', share: 24.00, paid: 0.00, status: 'Owes $24.00' },
      { name: 'David', share: 24.00, paid: 0.00, status: 'Owes $24.00' },
      { name: 'Sarah', share: 24.00, paid: 0.00, status: 'Owes $24.00' },
    ]
  },
  {
    id: 'split-2',
    title: 'Weekend Grocery Haul',
    totalAmount: 60.00,
    paidBy: 'Rahul',
    date: getRelativeDateStr(4, 15, 30),
    members: [
      { name: 'Rahul', share: 30.00, paid: 60.00, status: 'Payer' },
      { name: 'Alex (You)', share: 30.00, paid: 0.00, status: 'You owe $30.00' },
    ]
  }
];
