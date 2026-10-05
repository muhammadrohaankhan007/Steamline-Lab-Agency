/**
 * Steamline Lab — Engineering & Digital Product Studio Logic
 * Direct execution, clean architecture, high responsiveness
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearHolder = document.getElementById('year-holder');
  if (yearHolder) {
    yearHolder.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Drawer Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mob-link, .mobile-link');

  function openMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('translate-x-full');
    if (mobileBackdrop) mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('translate-x-full');
    if (mobileBackdrop) mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && !mobileDrawer.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });

  // 3. Contact Form Validation & Submission
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const detailsInput = document.getElementById('form-details');
  const errorName = document.getElementById('err-name');
  const errorEmail = document.getElementById('err-email');
  const errorDetails = document.getElementById('err-details');
  const submitBtn = document.getElementById('submit-btn');
  const successBanner = document.getElementById('form-success');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.classList.remove('input-error');
      if (errorName) errorName.classList.remove('visible');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('input-error');
      if (errorEmail) errorEmail.classList.remove('visible');
    });
  }

  if (detailsInput) {
    detailsInput.addEventListener('input', () => {
      detailsInput.classList.remove('input-error');
      if (errorDetails) errorDetails.classList.remove('visible');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 2) {
        if (nameInput) nameInput.classList.add('input-error');
        if (errorName) errorName.classList.add('visible');
        isValid = false;
      }

      // Validate Email
      if (!emailInput || !validateEmail(emailInput.value)) {
        if (emailInput) emailInput.classList.add('input-error');
        if (errorEmail) errorEmail.classList.add('visible');
        isValid = false;
      }

      // Validate Details
      if (!detailsInput || !detailsInput.value.trim() || detailsInput.value.trim().length < 15) {
        if (detailsInput) detailsInput.classList.add('input-error');
        if (errorDetails) errorDetails.classList.add('visible');
        isValid = false;
      }

      if (!isValid) return;

      const scopeEl = document.querySelector('input[name="project_scope"]:checked');
      const scope = scopeEl ? scopeEl.value : 'Custom SaaS';
      const budgetEl = document.getElementById('form-budget');
      const budget = budgetEl ? budgetEl.options[budgetEl.selectedIndex].text : '';
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const detailsVal = detailsInput ? detailsInput.value.trim() : '';

      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Inquiry to Founders';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Routing to Founders...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        // Direct mailto routing to Rohaan, Syed Muhammad Shah, and Mubashir
        const subject = encodeURIComponent(`Project Inquiry: ${scope} — ${nameVal}`);
        const body = encodeURIComponent(`Client Name: ${nameVal}\nClient Email: ${emailVal}\nProject Scope: ${scope}\nEstimated Budget: ${budget}\n\nProject Brief:\n${detailsVal}`);
        window.location.href = `mailto:mohammadrohaan00712@gmail.com?cc=muhammadsyed58@gmail.com,muhammadmubashirf2006@gmail.com&subject=${subject}&body=${body}`;

        contactForm.reset();

        if (successBanner) {
          successBanner.classList.remove('hidden');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 750);
    });
  }

  // 4. Active Navigation State on Scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['home', 'services', 'about', 'team', 'contact'];

  function updateActiveNav() {
    const scrollPos = window.scrollY + 160;
    let currentId = 'home';

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = id;
        }
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('text-sage', 'font-semibold');
        link.classList.remove('text-ink-mid');
      } else {
        link.classList.remove('text-sage', 'font-semibold');
        link.classList.add('text-ink-mid');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
});
