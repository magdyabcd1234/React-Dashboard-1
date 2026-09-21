export type OrderStatus = 'completed' | 'pending' | 'processing' | 'cancelled';

export interface Customer {
  name: string;
  email: string;
  avatar: string;
}

export interface DetailedCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  status: 'active' | 'inactive' | 'vip' | 'lead';
  totalSpent: number;
  ordersCount: number;
  country: string;
  joinedDate: string;
}

export interface Order {
  id: string;
  customer: Customer;
  product: string;
  date: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Stripe' | 'Apple Pay';
}

export interface StatMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: 'dollar' | 'users' | 'shoppingBag' | 'activity';
  color: 'indigo' | 'emerald' | 'violet' | 'amber';
  sparkline: number[];
}

export interface RevenueDataPoint {
  period: string;
  revenue: number;
  profit: number;
  expenses: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  revenue: number;
  stock: number;
  rating: number;
}

export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  image: string;
  totalSales: number;
  rating: number;
}

export interface Transaction {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'subscription' | 'one-time' | 'refund';
  gateway: 'Stripe' | 'PayPal' | 'Bank Wire' | 'Apple Pay';
  fee: number;
}

export interface Invoice {
  id: string;
  number: string;
  customer: string;
  email: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  secret: string;
  createdDate: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'order' | 'user' | 'payment' | 'system';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'order' | 'alert' | 'system' | 'user';
}
