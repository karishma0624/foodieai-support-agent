import urllib.request, urllib.parse, json, re

dishes = [
  ('m1', 'Paneer Tikka', 'Starters', 220, 'true', 'Marinated cottage cheese cooked in tandoor', 'Paneer tikka'),
  ('m2', 'Veg Spring Rolls', 'Starters', 180, 'true', 'Crispy rolls stuffed with seasoned vegetables', 'Spring roll'),
  ('m3', 'Chicken 65', 'Starters', 260, 'false', 'Spicy, deep-fried chicken bites', 'Chicken 65'),
  ('m4', 'Chilli Chicken', 'Starters', 280, 'false', 'Indo-Chinese style spicy chicken stir fry', 'Chilli chicken'),
  ('m5', 'Paneer Butter Masala', 'Main Course', 260, 'true', 'Rich tomato and butter gravy with paneer cubes', 'Paneer makhani'),
  ('m6', 'Dal Makhani', 'Main Course', 220, 'true', 'Slow-cooked black lentils in creamy tomato gravy', 'Dal makhani'),
  ('m7', 'Chana Masala', 'Main Course', 200, 'true', 'Spicy and tangy chickpea curry', 'Chana masala'),
  ('m8', 'Kadai Vegetable', 'Main Course', 230, 'true', 'Mixed vegetables cooked with freshly ground spices', 'Jalfrezi'),
  ('m9', 'Butter Chicken', 'Main Course', 320, 'false', 'Tender chicken in a rich, buttery tomato sauce', 'Butter chicken'),
  ('m10', 'Chicken Curry', 'Main Course', 300, 'false', 'Traditional homestyle chicken curry', 'Chicken curry'),
  ('m11', 'Veg Biryani', 'Biryani & Rice', 240, 'true', 'Aromatic basmati rice cooked with mixed vegetables and spices', 'Biryani'),
  ('m12', 'Chicken Biryani', 'Biryani & Rice', 300, 'false', 'Classic fragrant rice layered with spiced chicken', 'Hyderabadi biryani'),
  ('m13', 'Jeera Rice', 'Biryani & Rice', 150, 'true', 'Basmati rice tempered with cumin seeds', 'Jeera rice'),
  ('m14', 'Curd Rice', 'Biryani & Rice', 140, 'true', 'Comforting yogurt mixed with rice and tempering', 'Curd rice'),
  ('m15', 'Butter Naan', 'Breads', 50, 'true', 'Soft refined flour bread cooked in tandoor', 'Naan'),
  ('m16', 'Garlic Naan', 'Breads', 60, 'true', 'Naan topped with chopped garlic and butter', 'Naan'),
  ('m17', 'Tandoori Roti', 'Breads', 35, 'true', 'Whole wheat bread cooked in tandoor', 'Roti (bread)'),
  ('m18', 'Plain Paratha', 'Breads', 45, 'true', 'Flaky layered whole wheat flatbread', 'Paratha'),
  ('m19', 'Gulab Jamun', 'Desserts', 90, 'true', 'Deep-fried milk dumplings soaked in sugar syrup', 'Gulab jamun'),
  ('m20', 'Rasmalai', 'Desserts', 110, 'true', 'Soft cottage cheese patties in sweetened milk', 'Ras malai'),
  ('m21', 'Chocolate Brownie', 'Desserts', 120, 'true', 'Warm, gooey chocolate brownie', 'Chocolate brownie'),
  ('m22', 'Sweet Lassi', 'Beverages', 80, 'true', 'Traditional sweetened yogurt drink', 'Lassi'),
  ('m23', 'Masala Chaas', 'Beverages', 60, 'true', 'Spiced buttermilk', 'Chaas'),
  ('m24', 'Fresh Lime Soda', 'Beverages', 70, 'true', 'Refreshing lime drink with a choice of sweet or salt', 'Limonana'),
  ('m25', 'Soft Drinks', 'Beverages', 50, 'true', 'Choice of aerated beverages', 'Soft drink')
]

out = """export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isVeg: boolean;
  description: string;
  image: string;
}

export const menuData: MenuItem[] = [
"""

fallback_img = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"

for m_id, name, cat, price, isVeg, desc, search in dishes:
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(search)}&prop=pageimages&format=json&pithumbsize=400"
    req = urllib.request.Request(url, headers={'User-Agent': 'FoodieAIBot'})
    img_url = fallback_img
    try:
        data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                img_url = pages[page_id]['thumbnail']['source']
    except Exception as e:
        print(f"Failed {name}: {e}")
    
    out += f"  {{ id: '{m_id}', name: '{name}', category: '{cat}', price: {price}, isVeg: {isVeg}, description: '{desc}', image: '{img_url}' }},\n"

out += "];\n"

with open("src/data/menu.ts", "w", encoding="utf-8") as f:
    f.write(out)

print("SUCCESSFULLY GENERATED MENU.TS WITH WIKIPEDIA IMAGES!")
