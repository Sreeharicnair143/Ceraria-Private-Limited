import re

with open('public/products.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's extract the part before the sidebar
parts = html.split('<!-- Sidebar -->')
if len(parts) == 2:
    pre_sidebar = parts[0] + '<!-- Sidebar -->'
    
    # Let's extract the part after the sidebar
    parts2 = parts[1].split('<!-- Product Grid -->')
    if len(parts2) == 2:
        post_sidebar = '\n    <!-- Product Grid -->' + parts2[1]
        
        # Now let's reconstruct the sidebar exactly as it should be, with Application Filter at the top.
        sidebar_content = """
    <aside class="w-full md:w-64 flex-shrink-0">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-serif text-xl font-bold">Filter By</h3>
        <button onclick="resetFilters()" class="text-xs text-bronze-500 uppercase tracking-widest hover:underline">Clear</button>
      </div>

      <!-- Search Filter -->
      <div class="mb-6">
        <div class="flex gap-2">
          <input type="text" id="search-input" placeholder="Search tiles..." class="w-full px-4 py-2 text-sm border border-sand-200 rounded-lg bg-cream-50/50 text-charcoal-800 focus:outline-none focus:border-bronze-400 transition-all" oninput="clearTimeout(this.to); this.to = setTimeout(() => fetchProducts(), 300)" />
          <button onclick="fetchProducts()" class="px-4 py-2 bg-bronze-500 hover:bg-bronze-600 text-cream-50 rounded-lg transition-colors shadow-sm">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <!-- Application Filter -->
      <div>
        <div class="sidebar-acc-title" onclick="toggleAcc(this)">
          Application <i class="fas fa-chevron-down text-xs transition-transform"></i>
        </div>
        <div class="sidebar-acc-content open">
          <ul class="space-y-3 text-sm text-stone-600" id="filter-application">
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Bathroom" onchange="fetchProducts()"> Bathroom</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Kitchen" onchange="fetchProducts()"> Kitchen</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Living Room" onchange="fetchProducts()"> Living Room</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Bedroom" onchange="fetchProducts()"> Bedroom</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Outdoor" onchange="fetchProducts()"> Outdoor</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Commercial Spaces" onchange="fetchProducts()"> Commercial Spaces</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Staircases" onchange="fetchProducts()"> Staircases</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Counter Slabs" onchange="fetchProducts()"> Counter Slabs</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Elevation Tiles" onchange="fetchProducts()"> Elevation Tiles</label></li>
          </ul>
        </div>
      </div>

      <!-- Size Filter -->
      <div>
        <div class="sidebar-acc-title" onclick="toggleAcc(this)">
          Size <i class="fas fa-chevron-down text-xs transition-transform"></i>
        </div>
        <div class="sidebar-acc-content open">
          <ul class="space-y-3 text-sm text-stone-600" id="filter-size">
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="75x300" onchange="fetchProducts()"> 75 × 300 mm</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="200x200" onchange="fetchProducts()"> 200 × 200 mm</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="300x300" onchange="fetchProducts()"> 300 × 300 mm</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="600x1200" onchange="fetchProducts()"> 600 × 1200 mm</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="800x1600" onchange="fetchProducts()"> 800 × 1600 mm</label></li>
          </ul>
        </div>
      </div>

      <!-- Finish Filter -->
      <div>
        <div class="sidebar-acc-title" onclick="toggleAcc(this)">
          Finish <i class="fas fa-chevron-down text-xs transition-transform"></i>
        </div>
        <div class="sidebar-acc-content open">
          <ul class="space-y-3 text-sm text-stone-600" id="filter-finish">
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Matt" onchange="fetchProducts()"> Matt</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Glossy" onchange="fetchProducts()"> Glossy</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Carving" onchange="fetchProducts()"> Carving</label></li>
          </ul>
        </div>
      </div>

      <!-- Color Filter -->
      <div>
        <div class="sidebar-acc-title" onclick="toggleAcc(this)">
          Explore By Color <i class="fas fa-chevron-down text-xs transition-transform"></i>
        </div>
        <div class="sidebar-acc-content open">
          <ul class="space-y-3 text-sm text-stone-600" id="filter-color">
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Ivory/White" onchange="fetchProducts()"> Ivory/White</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Beige/Crema" onchange="fetchProducts()"> Beige/Crema</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Grey" onchange="fetchProducts()"> Grey</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Charcoal/Black" onchange="fetchProducts()"> Charcoal/Black</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Natural Brown" onchange="fetchProducts()"> Natural Brown</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Aqua/Blue" onchange="fetchProducts()"> Aqua/Blue</label></li>
          </ul>
        </div>
      </div>

      <!-- Texture Filter -->
      <div>
        <div class="sidebar-acc-title" onclick="toggleAcc(this)">
          Explore By Texture / Surface <i class="fas fa-chevron-down text-xs transition-transform"></i>
        </div>
        <div class="sidebar-acc-content open">
          <ul class="space-y-3 text-sm text-stone-600" id="filter-texture">
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Terrazzo & Chips" onchange="fetchProducts()"> Terrazzo & Chips</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Premium Marble" onchange="fetchProducts()"> Premium Marble</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Rustic & Earth" onchange="fetchProducts()"> Rustic & Earth</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Art & Decor" onchange="fetchProducts()"> Art & Decor</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Wood Planks" onchange="fetchProducts()"> Wood Planks</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Natural Stone" onchange="fetchProducts()"> Natural Stone</label></li>
          </ul>
        </div>
      </div>

      <!-- Category Filter -->
      <div>
        <div class="sidebar-acc-title" onclick="toggleAcc(this)">
          Category <i class="fas fa-chevron-down text-xs transition-transform"></i>
        </div>
        <div class="sidebar-acc-content open">
          <ul class="space-y-3 text-sm text-stone-600" id="filter-category">
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Porcelain Tiles" onchange="fetchProducts()"> Porcelain Tiles</label></li>
            <li><label class="flex items-center cursor-pointer hover:text-bronze-500"><input type="checkbox" class="filter-checkbox" value="Ceramic Tiles" onchange="fetchProducts()"> Ceramic Tiles</label></li>
          </ul>
        </div>
      </div>
    </aside>"""
        
        final_html = pre_sidebar + sidebar_content + post_sidebar
        
        # Make sure we don't have duplicated scripts by searching for it
        script_block = """  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const menuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const burgerLines = [
        document.getElementById('burger-line-1'),
        document.getElementById('burger-line-2'),
        document.getElementById('burger-line-3'),
      ];
      let menuOpen = false;

      if(menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
          menuOpen = !menuOpen;
          if (menuOpen) {
            mobileMenu.style.maxHeight = '400px';
          } else {
            mobileMenu.style.maxHeight = '0';
          }
          burgerLines[0].style.transform = menuOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
          burgerLines[1].style.opacity   = menuOpen ? '0' : '1';
          burgerLines[2].style.transform = menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : '';
          burgerLines[2].style.width     = menuOpen ? '1.5rem' : '1rem';
        });
      }
    });
  </script>"""
        
        # Remove ALL instances
        final_html = final_html.replace(script_block, "")
        # Add exactly ONE instance before the Title Banner
        final_html = final_html.replace("<!-- Title Banner -->", script_block + "\n\n  <!-- Title Banner -->")
        
        with open('public/products.html', 'w', encoding='utf-8') as fw:
            fw.write(final_html)
        print("Successfully rebuilt sidebar with python!")
    else:
        print("Product grid not found")
else:
    print("Sidebar not found")
