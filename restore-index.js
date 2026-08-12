const fs = require('fs');

const missingContent = `        <!-- Slide 1 -->
        <div class="swiper-slide h-full">
          <video autoplay loop muted playsinline>
            <source src="https://creanza.in/wp-content/uploads/2025/03/banner1.mp4" type="video/mp4">
          </video>
          <div class="hero-overlay">
            <h2 class="text-white font-serif text-5xl md:text-7xl font-bold mb-4">The Pinnacle<br>of Excellence</h2>
            <p class="text-white/80 text-lg md:text-xl max-w-lg mb-8">Elevate your spaces with tiles that blend innovation, artistry, and timeless sophistication.</p>
            <a href="/products.html" class="btn-outline">Explore Now</a>
          </div>
        </div>
        <!-- Slide 2 -->
        <div class="swiper-slide h-full">
          <video autoplay loop muted playsinline>
            <source src="https://creanza.in/wp-content/uploads/2025/03/banner2.mp4" type="video/mp4">
          </video>
          <div class="hero-overlay">
            <h2 class="text-white font-serif text-5xl md:text-7xl font-bold mb-4">Unveiling the Art<br>of Surfaces</h2>
            <p class="text-white/80 text-lg md:text-xl max-w-lg mb-8">Immerse yourself in a world of exquisite tiles, designed to redefine elegance and luxury.</p>
            <a href="/products.html" class="btn-outline">Explore Now</a>
          </div>
        </div>
        <!-- Slide 3 -->
        <div class="swiper-slide h-full">
          <video autoplay loop muted playsinline>
            <source src="https://creanza.in/wp-content/uploads/2025/03/banner3.mp4" type="video/mp4">
          </video>
          <div class="hero-overlay">
            <h2 class="text-white font-serif text-5xl md:text-7xl font-bold mb-4">A Symphony of<br>Texture & Design</h2>
            <p class="text-white/80 text-lg md:text-xl max-w-lg mb-8">Discover an unparalleled fusion of intricate details and refined aesthetics.</p>
            <a href="/products.html" class="btn-outline">Explore Now</a>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </section>

  <!-- ================= REEL SECTION ================= -->
  <section class="reel-section">
    <img src="https://creanza.in/wp-content/uploads/2025/04/Creanza_GVTPGVT_moodboard-scaled-e1743580106904.jpg" alt="Moodboard" class="bg" data-aos="zoom-in" data-aos-duration="1500" />
    <div class="absolute inset-0 bg-black/30 z-0"></div>
    <a href="#homepage-video-modal" class="reel-play-btn popup-video" data-aos="zoom-in" data-aos-delay="500">
      <i class="fas fa-play"></i>
    </a>
  </section>

  <!-- ================= IMPACT AT A GLANCE ================= -->
  <section class="impact-section max-w-[1600px] mx-auto overflow-hidden">
    <div class="impact-left" data-aos="fade-right">
      <h3 class="font-serif text-4xl md:text-5xl font-bold text-charcoal-900 mb-6">Our Impact<br>at a Glance</h3>
      <div class="impact-grid">
        <div class="impact-box">
          <div class="impact-num"><span class="counter" data-target="75">0</span>+</div>
          <div class="impact-label">Countries Served</div>
        </div>
        <div class="impact-box">
          <div class="impact-num"><span class="counter" data-target="25">0</span>M</div>
          <div class="impact-label">Sqmtr Production / Year</div>
        </div>
        <div class="impact-box">
          <div class="impact-num"><span class="counter" data-target="20">0</span>+</div>
          <div class="impact-label">Years of Excellence</div>
        </div>
        <div class="impact-box">
          <div class="impact-num"><span class="counter" data-target="1000">0</span>+</div>
          <div class="impact-label">Channel Partners</div>
        </div>
      </div>
    </div>
    <div class="impact-right mt-10 md:mt-0" data-aos="fade-left">
      <div class="swiper glance-swiper h-full">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="https://creanza.in/wp-content/uploads/2025/03/Property-1Default.png" alt="Impact 1" /></div>
          <div class="swiper-slide"><img src="https://creanza.in/wp-content/uploads/2025/03/Property-1Variant2.png" alt="Impact 2" /></div>
          <div class="swiper-slide"><img src="https://creanza.in/wp-content/uploads/2025/03/Property-1Variant3.png" alt="Impact 3" /></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= TRANSFORM YOUR SPACE ================= -->
  <section class="transform-section bg-white max-w-[1600px] mx-auto overflow-hidden">
    <div class="text-center mb-16" data-aos="fade-up">
      <h2 class="font-serif text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">Transform Your Space with<br>Curated Tile Perfection</h2>
      <p class="text-stone-500 max-w-2xl mx-auto">With a collection for every taste, our tiles seamlessly blend functionality and style, transforming your space into a work of art.</p>
    </div>
    <div class="transform-grid">
      <div class="transform-img-box" data-aos="fade-up" data-aos-delay="100">
        <img src="https://creanza.in/wp-content/uploads/2025/03/REGAL-KLINKER-GREY-scaled.jpg" alt="Regal" />
      </div>
      <div class="transform-img-box" data-aos="fade-up" data-aos-delay="200">
        <img src="https://creanza.in/wp-content/uploads/2025/03/REGAL-FERROL-WHITE-DECOR-scaled.jpg" alt="Regal Decor" />
      </div>
      <div class="transform-img-box" data-aos="fade-up" data-aos-delay="300">
        <img src="https://creanza.in/wp-content/uploads/2025/03/ROYAL-SVEZIA-GRIS-1-scaled.jpg" alt="Royal" />
      </div>
    </div>
    <div class="text-center mt-12" data-aos="fade-up">
      <a href="/products.html" class="btn-dark">Discover All Products</a>
    </div>
  </section>

  <!-- ================= IMAGE STACK TABS ================= -->
  <section class="stack-section">
    <div class="max-w-[1440px] mx-auto">
      <ul class="stack-tabs" data-aos="fade-up">
        <li class="active" data-tab="commercial">Commercial</li>
        <li data-tab="kitchen">Kitchen</li>
        <li data-tab="bathroom">Bathroom</li>
        <li data-tab="bedroom">Bedroom</li>
        <li data-tab="outdoors">Outdoors</li>
      </ul>

      <!-- Commercial Tab -->
      <div class="tab-content active" id="commercial">
        <div class="swiper stack-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/04/GRANDE-LISTELLO-WHITE_GHR-scaled.jpg" alt="Infinia+" />
                <h4 class="stack-hdn">INFINIA+</h4>
                <p class="stack-para">Exquisite large-format tiles combining grandeur with unmatched precision. Perfect for expansive spaces.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/03/ROYAL-VOLTERRA-TAN_GHR-1-scaled.jpg" alt="Solido" />
                <h4 class="stack-hdn">SOLIDO</h4>
                <p class="stack-para">Premium matt granulla structured surface that mimics the feel of real stone.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/04/ROYAL-TRASIA-SAND_EVAN_PARKING-scaled.jpg" alt="Panache" />
                <h4 class="stack-hdn">PANACHE</h4>
                <p class="stack-para">A minimal anti-reflective surface with a natural feel and flat surface.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/04/ROYAL-NATURAL-TERAZZO-SILVER-GREY-scaled.jpg" alt="Evoq" />
                <h4 class="stack-hdn">EVOQ</h4>
                <p class="stack-para">Consistent color and pattern throughout the thickness. Ensures uniform appearance even on exposed edges.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- Kitchen Tab -->
      <div class="tab-content" id="kitchen">
        <div class="swiper stack-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/04/ROYAL-DOLOMITE-GREY-scaled.jpg" alt="Glossy" />
                <h4 class="stack-hdn">GLOSSY</h4>
                <p class="stack-para">Crafted to perfection to provide the ultimate comfort and luxurious experience in culinary spaces.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/03/REGAL-KLINKER-GREY-scaled.jpg" alt="Regal" />
                <h4 class="stack-hdn">REGAL</h4>
                <p class="stack-para">Timeless and elegant, offering heat and stain resistance for the most demanding kitchen environments.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/03/ROYAL-SVEZIA-GRIS-1-scaled.jpg" alt="Svezia" />
                <h4 class="stack-hdn">SVEZIA</h4>
                <p class="stack-para">A stunningly smooth surface designed to be easy to clean while maintaining a premium look.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      
      <!-- Bathroom Tab -->
      <div class="tab-content" id="bathroom">
        <div class="swiper stack-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/04/ROYAL-ESTONIA-BIANCO-scaled.jpg" alt="Evoq" />
                <h4 class="stack-hdn">EVOQ BIANCO</h4>
                <p class="stack-para">Water resistant finish specifically tuned for modern bathrooms and wet areas.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/03/REGAL-FERROL-WHITE-DECOR-scaled.jpg" alt="Ferrol Decor" />
                <h4 class="stack-hdn">FERROL DECOR</h4>
                <p class="stack-para">Intricate decorative elements that bring a spa-like tranquility to your private sanctuary.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- Bedroom Tab -->
      <div class="tab-content" id="bedroom">
        <div class="swiper stack-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/03/ROYAL-VOLTERRA-TAN_GHR-1-scaled.jpg" alt="Volterra Tan" />
                <h4 class="stack-hdn">VOLTERRA</h4>
                <p class="stack-para">Warm, earthy tones with a subtle texture that creates a cozy and inviting bedroom atmosphere.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/04/ROYAL-TRASIA-SAND_EVAN_PARKING-scaled.jpg" alt="Trasia Sand" />
                <h4 class="stack-hdn">TRASİA SAND</h4>
                <p class="stack-para">A gentle, minimalist design ensuring a peaceful and serene environment for rest.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- Outdoors Tab -->
      <div class="tab-content" id="outdoors">
        <div class="swiper stack-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/04/ROYAL-TRASIA-SAND_EVAN_PARKING-scaled.jpg" alt="Parking" />
                <h4 class="stack-hdn">EXTERIOR PRO</h4>
                <p class="stack-para">Heavy-duty, slip-resistant tiles engineered to withstand the elements without losing their charm.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="stack-box">
                <img src="https://creanza.in/wp-content/uploads/2025/04/ROYAL-NATURAL-TERAZZO-SILVER-GREY-scaled.jpg" alt="Terazzo" />
                <h4 class="stack-hdn">TERRAZZO OUTDOOR</h4>
                <p class="stack-para">Durable and visually striking, perfect for patios, driveways, and garden walkways.</p>
                <a href="/products.html" class="btn-outline">View Collection</a>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

    </div>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer class="bg-charcoal-900 text-cream-50 pt-16 pb-8 border-t border-stone-600/30">
    <div class="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <h3 class="font-serif text-2xl font-bold mb-4 tracking-wide text-bronze-400">CERARIA</h3>
        <p class="text-stone-400 text-sm leading-relaxed mb-6">The art of ceramic luxury. Elevating architectural spaces with timeless elegance and unmatched durability.</p>
      </div>
      <div>
        <h4 class="font-serif text-lg font-bold mb-4">Collections</h4>
        <ul class="space-y-2 text-sm text-stone-400">
          <li><a href="#" class="hover:text-bronze-400 transition-colors">Infinia+</a></li>
          <li><a href="#" class="hover:text-bronze-400 transition-colors">Solido</a></li>
          <li><a href="#" class="hover:text-bronze-400 transition-colors">Evoq</a></li>
          <li><a href="#" class="hover:text-bronze-400 transition-colors">Panache</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-serif text-lg font-bold mb-4">Company</h4>
        <ul class="space-y-2 text-sm text-stone-400">
          <li><a href="#" class="hover:text-bronze-400 transition-colors">About Us</a></li>
          <li><a href="#" class="hover:text-bronze-400 transition-colors">Sustainability</a></li>
          
          <li><a href="/contact.html" class="hover:text-bronze-400 transition-colors">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-serif text-lg font-bold mb-4">Connect</h4>
        <div class="flex gap-4 mb-6">
          <a href="#" class="w-10 h-10 rounded-full border border-stone-600 flex items-center justify-center text-stone-400 hover:text-bronze-400 hover:border-bronze-400 transition-colors"><i class="fab fa-instagram"></i></a>
          <a href="#" class="w-10 h-10 rounded-full border border-stone-600 flex items-center justify-center text-stone-400 hover:text-bronze-400 hover:border-bronze-400 transition-colors"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="w-10 h-10 rounded-full border border-stone-600 flex items-center justify-center text-stone-400 hover:text-bronze-400 hover:border-bronze-400 transition-colors"><i class="fab fa-pinterest-p"></i></a>
        </div>
      </div>
    </div>
    <div class="max-w-[1440px] mx-auto px-6 mt-12 pt-8 border-t border-stone-600/30 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500">
      <p>&copy; 2026 CERARIA PRIVATE LIMITED. All rights reserved.</p>
      <div class="flex gap-4 mt-4 md:mt-0">
        <a href="#" class="hover:text-bronze-400 transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-bronze-400 transition-colors">Terms of Service</a>
        <a href="/admin-login" class="hover:text-bronze-400 transition-colors">Admin Login</a>
      </div>
    </div>
  </footer>

  <!-- ================= SCRIPTS ================= -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>

  <script>
    // 1. Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('main-header');
      if (header) {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }
    });

    // 2. Init AOS
    AOS.init({
      once: false, // repeat animations
      offset: 100,
      duration: 800,
      easing: 'ease-out-cubic'
    });

    // 3. Init Swiper (Hero)
    new Swiper('.banner-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 6000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true }
    });\n`;

const html = fs.readFileSync('public/index.html', 'utf8');

const targetStr = `      autoplay: { delay: 3000 },
      slidesPerView: 1
    });`;

const newHtml = html.replace(targetStr, missingContent + targetStr);

fs.writeFileSync('public/index.html', newHtml);
console.log('Restored index.html successfully!');
