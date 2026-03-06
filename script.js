document.addEventListener('DOMContentLoaded', () => {

    // Grab all the elements we need once
    const header        = document.getElementById('header');
    const menuBtn       = document.getElementById('mobile-menu-btn');
    const navLinks      = document.querySelector('.nav-links');
    const allNavLinks   = document.querySelectorAll('.nav-links a');
    const stickyBar     = document.getElementById('sticky-buy-bar');
    const faqItems      = document.querySelectorAll('.faq-item');
    const revealEls     = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-fade');
    const filterBtns    = document.querySelectorAll('.filter-btn');
    const bentoItems    = document.querySelectorAll('.bento-item');
    const swatches      = document.querySelectorAll('.swatch');
    const colorImg      = document.getElementById('color-preview-img');
    const colorLabel    = document.getElementById('color-label');
    const slides        = document.querySelectorAll('.testimonial-slide');
    const dots          = document.querySelectorAll('.dot');


    //1. STICKY HEADER
    // Adds a shadow when user scrolls past the hero
    const heroSection = document.getElementById('home');
    
    const watchScroll = () => {
        const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 400;

        // Sticky class for header shadow
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Show the "buy" bar only after hero
        if (window.scrollY > heroBottom - 100) {
            stickyBar.classList.add('visible');
        } else {
            stickyBar.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', watchScroll);
    watchScroll(); // run once right away


    // 2. MOBILE MENU
    menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        // Lock page scroll behind the menu
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when any nav link is clicked
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    //3. SMOOTH SCROLL 
    allNavLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            const offset = header.offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    //4. ACTIVE NAV LINK HIGHLIGHT
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        let current = '';
        sections.forEach(sec => {
            if (window.pageYOffset >= sec.offsetTop - 120) {
                current = sec.id;
            }
        });
        allNavLinks.forEach(a => {
            a.classList.toggle('active-link', a.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', highlightNav);


    //5. FAQ ACCORDION 
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(f => f.classList.remove('active')); // close all
            if (!isOpen) item.classList.add('active');           // open this one
        });
    });


    //6. GALLERY FILTER
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button style
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show / hide bento items based on category
            bentoItems.forEach(item => {
                const cat = item.dataset.cat;
                if (filter === 'all' || cat === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });


    //7. ENERGY SHOWCASE (Redesigned Color Section)
    const energyDots    = document.querySelectorAll('.energy-dot');
    const energyShoe    = document.getElementById('energy-shoe-img');
    const energyBgText  = document.getElementById('energy-text');
    const energyName    = document.getElementById('energy-name');
    const energySection = document.getElementById('colors');

    energyDots.forEach(dot => {
        dot.addEventListener('click', () => {
            // Update active state
            energyDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            // Get data from attributes
            const { img, text, name, color } = dot.dataset;

            // Transition effect (scale & fade)
            energyShoe.style.opacity = '0';
            energyShoe.style.transform = 'scale(0.9) rotate(-15deg)';
            
            setTimeout(() => {
                energyShoe.src = img;
                energyBgText.textContent = text;
                energyName.textContent = name;
                
                // If section color is needed (subtle change)
                if (color === '#111') {
                    energySection.style.backgroundColor = '#050505';
                } else if (color === '#F4C2C2') {
                    energySection.style.backgroundColor = '#1a0f12'; // Dark pinkish black
                } else if (color === '#40E0D0') {
                    energySection.style.backgroundColor = '#001212'; // Dark teal
                } else if (color === '#B19CD9') {
                    energySection.style.backgroundColor = '#12101a'; // Dark purple
                } else {
                    energySection.style.backgroundColor = '#111'; // default dark
                }

                energyShoe.style.opacity = '1';
                energyShoe.style.transform = 'scale(1) rotate(-15deg)';
            }, 400);
        });
    });

    if (energyShoe) {
        energyShoe.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    }


    //8. TESTIMONIALS CAROUSEL
    let currentSlide = 0;

    const goToSlide = (index) => {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    // Dot click navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => goToSlide(Number(dot.dataset.index)));
    });

    // Auto-advance every 4 seconds
    setInterval(() => {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }, 4000);


    //9. SCROLL REVEAL ANIMATIONS
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

});
