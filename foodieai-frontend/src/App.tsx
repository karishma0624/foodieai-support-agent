import React, { useState } from 'react';
import { ChatWidget } from './components/ChatWidget';
import { menuData } from './data/menu';
import { createOrder, fetchOrders } from './lib/api';
import { getOrCreateSessionId } from './lib/session';
import type { CartItem, Order, MenuItem } from './types';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'menu' | 'cart' | 'checkout' | 'orders'>('menu');
  const [filter, setFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [category, setCategory] = useState<string>('All');
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Checkout form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [placedOrder, setPlacedOrder] = useState('');

  const sessionId = getOrCreateSessionId();
  const categories = ['All', ...Array.from(new Set(menuData.map(m => m.category)))];

  const filteredMenu = menuData.filter(item => {
    if (filter === 'veg' && !item.isVeg) return false;
    if (filter === 'nonveg' && item.isVeg) return false;
    if (category !== 'All' && item.category !== category) return false;
    return true;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, isVeg: item.isVeg }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) return { ...i, quantity: Math.max(0, i.quantity + delta) };
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const orderNumber = await createOrder({
        session_id: sessionId,
        customer_name: name,
        delivery_address: address,
        items: cart,
        total_amount: cartTotal
      });
      setPlacedOrder(orderNumber);
      setCart([]);
      setView('checkout');
    } catch (e) {
      alert("Failed to place order");
    }
  };

  const loadOrders = async () => {
    const data = await fetchOrders(sessionId);
    setOrders(data);
    setView('orders');
  };

  const startNewSession = () => {
    if (window.confirm("Start a new session? This will clear your cart and order history for the demo.")) {
      localStorage.removeItem('foodie_session_id');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center">
                <span className="text-orange-600 mr-2">🥘</span>FoodieAI
              </h1>
            </div>
            
            {/* Location Selector */}
            <div className="hidden md:block">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Delivering To</p>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-orange-600 transition group">
                <span className="text-sm font-bold border-b-2 border-gray-900 group-hover:border-orange-600">Coimbatore, Tamil Nadu</span>
                <span className="text-orange-600 text-xs">▼</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <button onClick={startNewSession} className="text-xs font-bold text-gray-500 hover:text-red-600 uppercase tracking-wider transition border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-full">
              ⟳ New User
            </button>
            <button onClick={loadOrders} className="text-gray-700 font-medium hover:text-orange-600 flex items-center space-x-1">
              <span>🧾</span> <span className="hidden sm:inline">Orders</span>
            </button>
            <button onClick={() => setView('cart')} className="relative flex items-center space-x-1 text-gray-700 font-medium hover:text-orange-600 p-2 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
              <span>🛒</span> <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-sm">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        
        {view === 'menu' && (
          <>
            {/* Restaurant Info Banner */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-gray-100 flex justify-between items-center bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&q=80')] bg-cover bg-center relative overflow-hidden h-48">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h2 className="text-4xl font-black mb-2">FoodieAI Kitchen</h2>
                <p className="text-gray-200 font-medium max-w-sm mb-3">Experience AI-curated gourmet delights delivered fresh to your door.</p>
                <div className="flex items-center space-x-3 text-sm font-bold">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center shadow-sm">★ 4.8</span>
                  <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md">30-35 mins</span>
                  <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md">₹200 for two</span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100 sticky top-[80px] z-30">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  {categories.map(c => (
                    <button 
                      key={c} 
                      onClick={() => setCategory(c)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${category === c ? 'bg-gray-900 text-white scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-1 border rounded-lg p-1 bg-gray-50 shadow-inner">
                  <button onClick={() => setFilter('all')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${filter === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
                  <button onClick={() => setFilter('veg')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all flex items-center space-x-1 ${filter === 'veg' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500 hover:text-gray-700'}`}>
                    <span className="w-2 h-2 rounded-full bg-green-600"></span><span>Veg</span>
                  </button>
                  <button onClick={() => setFilter('nonveg')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all flex items-center space-x-1 ${filter === 'nonveg' ? 'bg-white shadow-sm text-red-700' : 'text-gray-500 hover:text-gray-700'}`}>
                    <span className="w-2 h-2 rounded-full bg-red-600"></span><span>Non-Veg</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Menu List */}
            <div className="space-y-8">
              {categories.filter(c => c !== 'All' && (category === 'All' || category === c)).map(cat => (
                <div key={cat}>
                  <h2 className="text-2xl font-black mb-4 text-gray-800">{cat}</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y overflow-hidden">
                    {filteredMenu.filter(m => m.category === cat).map(item => {
                      const cartItem = cart.find(c => c.id === item.id);
                      return (
                        <div key={item.id} className="p-6 flex flex-col sm:flex-row justify-between gap-6 hover:bg-gray-50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`w-4 h-4 flex items-center justify-center border-2 rounded-sm ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                              </span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                            <p className="font-medium text-gray-800 mb-2">₹{item.price}</p>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-md">{item.description}</p>
                          </div>
                          
                          {/* Swiggy Style Image & Add Button */}
                          <div className="flex-shrink-0 flex flex-col items-center w-full sm:w-36">
                            <div className="w-full h-32 rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="relative -mt-5 z-10">
                              {!cartItem ? (
                                <button onClick={() => addToCart(item)} className="px-8 py-2 bg-white text-green-600 border border-gray-200 rounded-lg font-black shadow-md hover:shadow-lg hover:bg-gray-50 transition uppercase tracking-wider text-sm">
                                  ADD
                                </button>
                              ) : (
                                <div className="flex items-center justify-between w-28 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 text-lg font-medium transition">-</button>
                                  <span className="font-bold text-green-700 text-sm">{cartItem.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-9 flex items-center justify-center text-green-600 hover:bg-green-50 text-lg font-medium transition">+</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ... Rest of Cart and Orders Code exactly the same ... */}
        {view === 'cart' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setView('menu')} className="text-orange-600 font-medium hover:underline">← Back to Menu</button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500 font-medium mb-4">Your cart is empty.</p>
                <button onClick={() => setView('menu')} className="px-6 py-2 bg-orange-600 text-white rounded-lg font-bold">Browse Menu</button>
              </div>
            ) : (
              <div>
                <div className="space-y-4 mb-6 divide-y">
                  {cart.map(item => (
                    <div key={item.id} className="pt-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">₹{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-3 bg-gray-50 border rounded-lg px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200 rounded">-</button>
                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200 rounded">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mb-6 flex justify-between items-center font-bold text-lg">
                  <span>To Pay</span>
                  <span>₹{cartTotal}</span>
                </div>
                
                <form onSubmit={handleCheckout} className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-lg mb-2">Delivery Details</h3>
                  <input required type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                  <input required type="text" placeholder="Phone Number" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                  <textarea required placeholder="Delivery Address" value={address} onChange={e=>setAddress(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg shadow-sm h-24 focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition shadow-lg shadow-orange-500/30 text-lg">
                    Place Order • ₹{cartTotal}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {view === 'checkout' && (
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-md mx-auto text-center space-y-4">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl mb-4 shadow-inner">✓</div>
            <h2 className="text-3xl font-black text-gray-900">Order Placed!</h2>
            <p className="text-gray-600 font-medium">Your order has been confirmed and is being prepared with love.</p>
            <div className="bg-gray-50 p-6 rounded-xl border font-mono text-2xl font-black tracking-widest text-orange-600 my-6 shadow-sm">
              {placedOrder}
            </div>
            <p className="text-sm text-gray-500 bg-orange-50 p-3 rounded-lg border border-orange-100">
              💡 <strong>Tip:</strong> Ask our AI assistant anytime for updates using this order number!
            </p>
            <button onClick={() => setView('menu')} className="mt-8 w-full py-4 bg-gray-900 hover:bg-black transition text-white rounded-xl font-bold shadow-lg">Back to Menu</button>
          </div>
        )}

        {view === 'orders' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Past Orders</h2>
              <button onClick={() => setView('menu')} className="text-orange-600 font-medium hover:underline">← Back to Menu</button>
            </div>
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🧾</div>
                <p className="text-gray-500 font-medium">No past orders found in this session.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(o => (
                  <div key={o.order_number} className="border border-gray-200 p-6 rounded-xl shadow-sm bg-gray-50">
                    <div className="flex justify-between items-start mb-4 pb-4 border-b">
                      <div>
                        <p className="font-black text-xl text-gray-900">{o.order_number}</p>
                        <p className="text-sm text-gray-500 font-medium">{new Date(o.created_at).toLocaleString()}</p>
                      </div>
                      <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">{o.status}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-4 space-y-1 font-medium">
                      {o.items.map((i:any) => (
                         <p key={i.id}>• {i.quantity}x {i.name}</p>
                      ))}
                    </div>
                    <p className="font-black text-lg bg-white p-3 rounded-lg border border-gray-200 inline-block">Total Paid: ₹{o.total_amount}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Floating Cart Bar (only visible when in menu view and cart has items) */}
      {view === 'menu' && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
          <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
            <div>
              <p className="font-bold text-lg">{cart.reduce((s,i) => s + i.quantity, 0)} items | ₹{cartTotal}</p>
              <p className="text-xs text-green-200 font-medium uppercase tracking-wider">Extra charges may apply</p>
            </div>
            <button onClick={() => setView('cart')} className="font-bold flex items-center space-x-2 bg-white text-green-700 px-6 py-2 rounded-lg shadow hover:bg-gray-50 transition">
              <span>View Cart</span>
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      )}

      {/* The Agent Widget */}
      <ChatWidget />
      
    </div>
  );
}

export default App;
