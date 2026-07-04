export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isVeg: boolean;
  description: string;
  image: string;
}

export const menuData: MenuItem[] = [
  { id: 'm1', name: 'Paneer Tikka', category: 'Starters', price: 220, isVeg: true, description: 'Marinated cottage cheese cooked in tandoor', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Paneer_tikka.jpg/500px-Paneer_tikka.jpg' },
  { id: 'm2', name: 'Veg Spring Rolls', category: 'Starters', price: 180, isVeg: true, description: 'Crispy rolls stuffed with seasoned vegetables', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Spring_Rolls_%283357696061%29.jpg/500px-Spring_Rolls_%283357696061%29.jpg' },
  { id: 'm3', name: 'Chicken 65', category: 'Starters', price: 260, isVeg: false, description: 'Spicy, deep-fried chicken bites', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
  { id: 'm4', name: 'Chilli Chicken', category: 'Starters', price: 280, isVeg: false, description: 'Indo-Chinese style spicy chicken stir fry', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chicken_Chilli.JPG/500px-Chicken_Chilli.JPG' },
  { id: 'm5', name: 'Paneer Butter Masala', category: 'Main Course', price: 260, isVeg: true, description: 'Rich tomato and butter gravy with paneer cubes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Paneer_Makhani_Veggie.jpeg/500px-Paneer_Makhani_Veggie.jpeg' },
  { id: 'm6', name: 'Dal Makhani', category: 'Main Course', price: 220, isVeg: true, description: 'Slow-cooked black lentils in creamy tomato gravy', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Punjabi_style_Dal_Makhani.jpg/500px-Punjabi_style_Dal_Makhani.jpg' },
  { id: 'm7', name: 'Chana Masala', category: 'Main Course', price: 200, isVeg: true, description: 'Spicy and tangy chickpea curry', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chana_masala.jpg/500px-Chana_masala.jpg' },
  { id: 'm8', name: 'Kadai Vegetable', category: 'Main Course', price: 230, isVeg: true, description: 'Mixed vegetables cooked with freshly ground spices', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chicken_Jalfrezi_%282103956162%29.jpg/500px-Chicken_Jalfrezi_%282103956162%29.jpg' },
  { id: 'm9', name: 'Butter Chicken', category: 'Main Course', price: 320, isVeg: false, description: 'Tender chicken in a rich, buttery tomato sauce', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg/500px-Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg' },
  { id: 'm10', name: 'Chicken Curry', category: 'Main Course', price: 300, isVeg: false, description: 'Traditional homestyle chicken curry', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
  { id: 'm11', name: 'Veg Biryani', category: 'Biryani & Rice', price: 240, isVeg: true, description: 'Aromatic basmati rice cooked with mixed vegetables and spices', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/500px-%22Hyderabadi_Dum_Biryani%22.jpg' },
  { id: 'm12', name: 'Chicken Biryani', category: 'Biryani & Rice', price: 300, isVeg: false, description: 'Classic fragrant rice layered with spiced chicken', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/500px-Hyderabadi_Chicken_Biryani.jpg' },
  { id: 'm13', name: 'Jeera Rice', category: 'Biryani & Rice', price: 150, isVeg: true, description: 'Basmati rice tempered with cumin seeds', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80' },
  { id: 'm14', name: 'Curd Rice', category: 'Biryani & Rice', price: 140, isVeg: true, description: 'Comforting yogurt mixed with rice and tempering', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Curd_Rice.jpg/500px-Curd_Rice.jpg' },
  { id: 'm15', name: 'Butter Naan', category: 'Breads', price: 50, isVeg: true, description: 'Soft refined flour bread cooked in tandoor', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Annapurna_Naan.jpg/500px-Annapurna_Naan.jpg' },
  { id: 'm16', name: 'Garlic Naan', category: 'Breads', price: 60, isVeg: true, description: 'Naan topped with chopped garlic and butter', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Annapurna_Naan.jpg/500px-Annapurna_Naan.jpg' },
  { id: 'm17', name: 'Tandoori Roti', category: 'Breads', price: 35, isVeg: true, description: 'Whole wheat bread cooked in tandoor', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg/500px-2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg' },
  { id: 'm18', name: 'Plain Paratha', category: 'Breads', price: 45, isVeg: true, description: 'Flaky layered whole wheat flatbread', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/500px-Triangle_paratha_%28cropped%29.JPG' },
  { id: 'm19', name: 'Gulab Jamun', category: 'Desserts', price: 90, isVeg: true, description: 'Deep-fried milk dumplings soaked in sugar syrup', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Gulab-jamun-wallpaper-1.jpg/500px-Gulab-jamun-wallpaper-1.jpg' },
  { id: 'm20', name: 'Rasmalai', category: 'Desserts', price: 110, isVeg: true, description: 'Soft cottage cheese patties in sweetened milk', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Ras_Malai_2.JPG/500px-Ras_Malai_2.JPG' },
  { id: 'm21', name: 'Chocolate Brownie', category: 'Desserts', price: 120, isVeg: true, description: 'Warm, gooey chocolate brownie', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Chocolatebrownie.JPG/500px-Chocolatebrownie.JPG' },
  { id: 'm22', name: 'Sweet Lassi', category: 'Beverages', price: 80, isVeg: true, description: 'Traditional sweetened yogurt drink', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
  { id: 'm23', name: 'Masala Chaas', category: 'Beverages', price: 60, isVeg: true, description: 'Spiced buttermilk', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
  { id: 'm24', name: 'Fresh Lime Soda', category: 'Beverages', price: 70, isVeg: true, description: 'Refreshing lime drink with a choice of sweet or salt', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
  { id: 'm25', name: 'Soft Drinks', category: 'Beverages', price: 50, isVeg: true, description: 'Choice of aerated beverages', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
];
