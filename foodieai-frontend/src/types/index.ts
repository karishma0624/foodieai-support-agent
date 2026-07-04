export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
}
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isVeg: boolean;
  description: string;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

export interface Order {
  order_number: string;
  created_at: string;
  status: string;
  total_amount: number;
  items: any[];
}
