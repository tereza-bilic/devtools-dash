document.addEventListener('DOMContentLoaded', () => {
  const secretButton = document.getElementById('secretButton');
  const buttonOverlay = document.getElementById('buttonOverlay');
  const resultMessage = document.getElementById('resultMessage');
  const secretResult = document.getElementById('secretResult');

  let overlayPresent = true;

  // Function to detect if overlay has been removed
  const checkOverlayStatus = () => {
    // Get a fresh reference since the element might have been removed from DOM
    const currentOverlay = document.getElementById('buttonOverlay');
    if (!currentOverlay) {
      overlayPresent = false;
    }
  };

  // Check periodically if overlay has been removed
  const overlayMonitor = setInterval(() => {
    checkOverlayStatus();
  }, 500);

  // Set up the click event listener for the button
  secretButton.addEventListener('click', (event) => {
    // Stop the overlay check
    clearInterval(overlayMonitor);

    // Verify if the click is trusted (real user interaction)
    const isTrustedClick = event.isTrusted;

    // Check if the overlay has been removed
    checkOverlayStatus();

    if (overlayPresent) {
      // If overlay is still present (shouldn't happen if properly removed)
      resultMessage.textContent = "You need to remove the overlay element first!";
      resultMessage.className = "result-message error";
      resultMessage.style.display = "block";
    } else if (!isTrustedClick) {
      // If the click is not from a real user interaction
      resultMessage.textContent = "Nice try! But that's not a genuine mouse click.";
      resultMessage.className = "result-message error";
      resultMessage.style.display = "block";

      // Log attempt to console
    } else {
      // Success! Genuine click detected after overlay removal
      secretResult.textContent = "The secret is: {{level_session.finish_secret}}";
      resultMessage.textContent = "Great job! You've successfully removed the overlay and clicked the button.";
      resultMessage.className = "result-message success";
      resultMessage.style.display = "block";
    }
  });

  // Add a protection against direct JS call attempts
  const originalClick = HTMLElement.prototype.click;
  HTMLElement.prototype.click = function() {
    if (this === secretButton) {
      const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
      // Note: programmatic events have isTrusted=false
      this.dispatchEvent(clickEvent);
      return;
    }
    return originalClick.apply(this, arguments);
  };

  // Add a click handler to the overlay as well to provide a hint
  if (buttonOverlay) {
    buttonOverlay.addEventListener('click', () => {
      resultMessage.textContent = "This overlay is blocking you from clicking the button. Find a way to remove it!";
      resultMessage.className = "result-message error";
      resultMessage.style.display = "block";
    });
  }
});
