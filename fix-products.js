const fs = require('fs');
let html = fs.readFileSync('public/products.html', 'utf8');

// I will just use regex to clean up the bad insertion.
// The file has a duplicate `<script>` section from lines 225-253, and a bad `<!-- Application Filter -->` insertion that broke things.
// Actually, it's easier to find the duplicate script tag and remove it.

const badPart = `  </script>
  
  <script>
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
  </script>

  <!-- Title Banner -->
  <div class="bg-[#1A1714] text-white py-16 px-6">
    <div class="max-w-[1440px] mx-auto">
      <h1 class="font-serif text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
      <p class="text-white/60">Explore the exquisite range of Ceraria luxury tiles.</p>
    </div>
  </div>

  <!-- Main Layout -->
  <section class="max-w-[1440px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
    
    <!-- Sidebar -->
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
      </div>`;

if(html.includes(badPart)) {
    html = html.replace(badPart, '');
    console.log("Found and removed bad part!");
} else {
    console.log("Could not find bad part.");
}

const theApplicationPartAtBottom = `      <!-- Application Filter -->
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
    </aside>`;

if(html.includes(theApplicationPartAtBottom)) {
    html = html.replace(theApplicationPartAtBottom, '    </aside>');
    console.log("Removed from bottom");
}

const addBackSearchAndApplication = `      <!-- Search Filter -->
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
      </div>`;

html = html.replace(`      <!-- Search Filter -->
      <div class="mb-6">
        <div class="flex gap-2">
          <input type="text" id="search-input" placeholder="Search tiles..." class="w-full px-4 py-2 text-sm border border-sand-200 rounded-lg bg-cream-50/50 text-charcoal-800 focus:outline-none focus:border-bronze-400 transition-all" oninput="clearTimeout(this.to); this.to = setTimeout(() => fetchProducts(), 300)" />
`, addBackSearchAndApplication + '\n'); // wait, the button is gone from search filter

fs.writeFileSync('public/products.html', html);
console.log('done');
