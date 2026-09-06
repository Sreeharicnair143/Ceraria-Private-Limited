// Wait for DOM
document.addEventListener("DOMContentLoaded", (event) => {
  
  // 1. Initialize Lenis Smooth Scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger with Lenis
  gsap.registerPlugin(ScrollTrigger);
  
  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  // Hero video background handles its own animation


  // 2. Counters Animation (.impact-box .counter)
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    
    // Create an object to hold the current value for GSAP to animate
    let obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 85%", // trigger when counter is 85% down the viewport
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        counter.innerHTML = Math.ceil(obj.val);
      }
    });
  });


  // 3. Staggered Waterfall Reveals (.gsap-reveal elements)
  // We'll group them by their parent containers to stagger them properly
  const revealContainers = document.querySelectorAll('.impact-grid, .transform-grid, .stack-swiper .swiper-wrapper');
  
  revealContainers.forEach(container => {
    const elements = container.querySelectorAll('.gsap-reveal');
    if (elements.length > 0) {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }
  });


  // 4. Parallax Effect for Images (.gsap-parallax)
  const parallaxImages = document.querySelectorAll('.gsap-parallax');
  parallaxImages.forEach(img => {
    // We scale it slightly in CSS or JS and move it up on scroll
    gsap.set(img, { scale: 1.15, transformOrigin: "center center" }); // Need scale > 1 to avoid showing edges when moved
    
    gsap.to(img, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom", 
        end: "bottom top",
        scrub: true
      }
    });
  });


  // 5. Magnetic Micro-physics for Buttons
  const magneticButtons = document.querySelectorAll('.btn-outline, .btn-dark');
  
  magneticButtons.forEach(btn => {
    // We need to wrap the text in a span to move it independently if desired
    // But for simplicity, we'll just move the whole button based on mouse position
    
    btn.addEventListener("mousemove", function(e) {
      const position = btn.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;

      // Move the button towards the mouse (intensity determined by division)
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: "power3.out"
      });
    });

    btn.addEventListener("mouseleave", function() {
      // Reset position when mouse leaves
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });

});
