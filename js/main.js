// Add fade-up animation and counter animation on scroll
window.addEventListener('DOMContentLoaded', function() {
  function handleFadeUp() {
    document.querySelectorAll('.fade-up').forEach(function(el) {
      var rect = el.getBoundingClientRect();
      var isInViewport = rect.top < window.innerHeight - 70;
      if (isInViewport) {
        el.classList.add('active');
      }
    });
  }
  handleFadeUp();
  window.addEventListener('scroll', handleFadeUp);

  // Animated counter for stats - only trigger when in viewport
  var countersAnimated = false;
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var current = 0;
    var duration = 2000; // 2 seconds
    var step = Math.max(1, Math.floor(target / (duration / 16))); // ~60fps
    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString(); // Add comma formatting for large numbers
    }, 16);
  }

  function handleCounterAnimation() {
    if (countersAnimated) return;
    var statsSection = document.getElementById('stats');
    if (!statsSection) return;
    var rect = statsSection.getBoundingClientRect();
    var isInViewport = rect.top < window.innerHeight - 100;
    if (isInViewport) {
      countersAnimated = true;
      document.querySelectorAll('.countup').forEach(function(el) {
        animateCounter(el);
      });
    }
  }

  // Check for counter animation on scroll
  window.addEventListener('scroll', handleCounterAnimation);
  // Also check on page load in case stats section is already visible
  handleCounterAnimation();
});
