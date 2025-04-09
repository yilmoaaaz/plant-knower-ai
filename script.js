document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlideIndex = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });

        // Show the target slide
        slides[index].classList.add('active');

        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
    }

    function nextSlide() {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            showSlide(currentSlideIndex);
        }
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Language Switching
    const langEnBtn = document.getElementById('lang-en');
    const langArBtn = document.getElementById('lang-ar');
    const translatableElements = document.querySelectorAll('[data-lang-en], [data-lang-ar]');
    const htmlElement = document.documentElement;

    function setLanguage(lang) {
        // Set html lang attribute
        htmlElement.setAttribute('lang', lang);

        // Add/remove rtl class for layout
        if (lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }

        // Update text content of elements
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                // Use innerHTML because some elements contain HTML tags like <span>
                el.innerHTML = text;
            }
        });

        // Update navigation button text specifically (since they might not have data attributes initially)
        prevBtn.textContent = prevBtn.getAttribute(`data-lang-${lang}`);
        nextBtn.textContent = nextBtn.getAttribute(`data-lang-${lang}`);


        // Update active button style
        langEnBtn.classList.toggle('active-lang', lang === 'en');
        langArBtn.classList.toggle('active-lang', lang === 'ar');

        // Optionally save preference
        localStorage.setItem('preferredLang', lang);
    }

    // Event listeners for language buttons
    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langArBtn.addEventListener('click', () => setLanguage('ar'));

    // Set initial language
    const preferredLang = localStorage.getItem('preferredLang') || 'en'; // Default to English
    setLanguage(preferredLang);

    // Initialize the first slide
    showSlide(currentSlideIndex);
});