// Load hero section into the page
fetch("/icsei2025/components/heroComponent.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("hero-container").innerHTML = data;

    initRippleEffect();

     // Wait until navbar HTML is inserted, then bind events
     const hamburger = document.getElementById('hamburger');
     const navLinks = document.getElementById('navLinks');
 
     hamburger.addEventListener('click', () => {
         hamburger.classList.toggle('active');
         navLinks.classList.toggle('active');
     });
 
     // Close mobile menu when clicking on a link
     navLinks.addEventListener('click', (e) => {
         if (e.target.tagName === 'A') {
             hamburger.classList.remove('active');
             navLinks.classList.remove('active');
         }
     });
 
     // Close mobile menu when clicking outside
     document.addEventListener('click', (e) => {
         if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
             hamburger.classList.remove('active');
             navLinks.classList.remove('active');
         }
     });
  });



  function createRipple(event) {
    const element = event.currentTarget;
    
    // Check if this is a form submission or navigation that would cause reset
    const isFormSubmit = element.type === 'submit' || element.closest('form');
    const isNavigation = element.tagName === 'A' && element.href;
    
    // If it's a form submit or navigation, prevent default temporarily
    if (isFormSubmit || isNavigation) {
        event.preventDefault();
    }
    
    // Remove any existing ripples
    const existingRipples = element.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Get element dimensions and position
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Set ripple styles
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Add ripple to element
    element.appendChild(ripple);
    
    // Handle the delayed action after ripple animation
    if (isFormSubmit || isNavigation) {
        setTimeout(() => {
            ripple.remove();
            
            // Now perform the original action
            if (isFormSubmit) {
                // Submit the form
                const form = element.closest('form');
                if (form) {
                    form.submit();
                } else if (element.type === 'submit') {
                    // Trigger form submission
                    element.form?.submit();
                }
            } else if (isNavigation) {
                // Navigate to the link
                window.location.href = element.href;
            }
        }, 300); // Reduced delay for better UX
    } else {
        // Remove ripple after animation completes for regular buttons
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Alternative: Non-blocking ripple effect for buttons that need immediate action
function createInstantRipple(event) {
    const element = event.currentTarget;
    
    // Remove any existing ripples
    const existingRipples = element.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Get element dimensions and position
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Set ripple styles
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Add ripple to element
    element.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Don't prevent default - let the button action proceed immediately
}
// Function to add ripple effect to elements
function addRippleEffect(selector, instant = false) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        // Ensure element has relative positioning
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        
        // Add overflow hidden to contain ripple
        element.style.overflow = 'hidden';
        
        // Add click event listener - choose ripple type
        const rippleFunction = instant ? createInstantRipple : createRipple;
        element.addEventListener('click', rippleFunction);
    });
}

// CSS for ripple effect (add this to your stylesheet)
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    overflow: hidden;
}

@keyframes ripple-animation {
    0% {
        transform: scale(0);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
}

/* Ensure ripple containers have overflow hidden */
.ripple-container {
    overflow: hidden;
    position: relative;
}
`;

// Function to inject CSS
function injectRippleCSS() {
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}

// Initialize ripple effect
function initRippleEffect() {
    // Inject CSS
    injectRippleCSS();
    
    // Add ripple effect to navigation links (with delay)
    addRippleEffect('.nav-links a', false);
    
    // Add instant ripple to buttons that need immediate action
    addRippleEffect('button', true);
    addRippleEffect('.ripple-button', true);
    
    // Add delayed ripple to form submits
    addRippleEffect('input[type="submit"]', false);
    addRippleEffect('button[type="submit"]', false);
}