document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('themeColor');
  if (savedTheme) {
      document.documentElement.style.setProperty('--primary-color', savedTheme);
      document.getElementById('themeSelector').value = savedTheme;
  }

  // Set up event listeners
  document.getElementById('pulseButton').addEventListener('click', triggerPulseAnimation);
  document.getElementById('themeSelector').addEventListener('change', handleThemeChange);
  document.getElementById('animatedBox').addEventListener('click', triggerBoxAnimation);
  setupRippleEffects();
});

function handleThemeChange(event) {
  const color = event.target.value;
  document.documentElement.style.setProperty('--primary-color', color);
  localStorage.setItem('themeColor', color);
}

function triggerPulseAnimation() {
  const box = document.getElementById('animatedBox');
  box.classList.add('animate-pulse');
  setTimeout(() => box.classList.remove('animate-pulse'), 1000);
}

function triggerBoxAnimation() {
  const box = document.getElementById('animatedBox');
  box.style.animation = 'none';
  void box.offsetWidth;
  box.style.animation = null;
  triggerPulseAnimation();
}

function setupRippleEffects() {
  document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', function(e) {
          const ripple = document.createElement('div');
          Object.assign(ripple.style, {
              position: 'absolute',
              width: '20px',
              height: '20px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              left: `${e.clientX}px`,
              top: `${e.clientY}px`
          });
          
          this.appendChild(ripple);
          
          ripple.animate([
              { transform: 'scale(0)', opacity: 1 },
              { transform: 'scale(4)', opacity: 0 }
          ], {
              duration: 500,
              easing: 'ease-out'
          }).onfinish = () => ripple.remove();
      });
  });
}