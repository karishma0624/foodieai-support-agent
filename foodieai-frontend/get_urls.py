import urllib.request, urllib.parse, json, time

dishes = [
  ('m10', 'Chicken Curry', 'Chicken curry'),
  ('m11', 'Veg Biryani', 'Biryani'),
  ('m12', 'Chicken Biryani', 'Hyderabadi biryani'),
  ('m13', 'Jeera Rice', 'Jeera rice'),
  ('m14', 'Curd Rice', 'Curd rice'),
  ('m15', 'Butter Naan', 'Naan'),
  ('m16', 'Garlic Naan', 'Naan'),
  ('m17', 'Tandoori Roti', 'Roti (bread)'),
  ('m18', 'Plain Paratha', 'Paratha'),
  ('m19', 'Gulab Jamun', 'Gulab jamun'),
  ('m20', 'Rasmalai', 'Ras malai'),
  ('m21', 'Chocolate Brownie', 'Chocolate brownie'),
  ('m22', 'Sweet Lassi', 'Lassi'),
  ('m23', 'Masala Chaas', 'Chaas'),
  ('m24', 'Fresh Lime Soda', 'Limonana'),
  ('m25', 'Soft Drinks', 'Soft drink')
]

urls = {}
for m_id, name, search in dishes:
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(search)}&prop=pageimages&format=json&pithumbsize=400"
    req = urllib.request.Request(url, headers={'User-Agent': 'FoodieAIBot'})
    try:
        data = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                urls[m_id] = pages[page_id]['thumbnail']['source']
    except Exception as e:
        print(f"Failed {name}: {e}")
    time.sleep(2.5)

print(json.dumps(urls, indent=2))
