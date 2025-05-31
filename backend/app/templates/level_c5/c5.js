// Indicate that the tutorial script has loaded
window.consoleTutorialLoaded = true;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c👋 Welcome to the Console Shortcuts tutorial!', 'color: #5B86D7; font-size: 16px; font-weight: bold;');
  console.log('%cTry the shortcuts you learn in this console window', 'color: #666; font-style: italic;');

  // Create some example elements for demonstration
  const createDemoElements = () => {
    // Create a hidden div with example elements for console practice
    const demoContainer = document.createElement('div');
    demoContainer.id = 'console-shorthand-demo';
    demoContainer.style.display = 'none';

    // Add sample elements for practice
    demoContainer.innerHTML = `
      <div id="demo-box" class="example-element">
        <h3 id="demo-title">Console Practice Element</h3>
        <p class="demo-text">This is for practicing console commands.</p>
        <p class="demo-text">Try selecting elements with different shortcuts.</p>
        <button id="demo-btn">Demo Button</button>
      </div>
    `;

    document.body.appendChild(demoContainer);
  };

  const colorInput = document.getElementById('color-input');
  const colorResult = document.getElementById('result');
  // Add listener to input field changes
  const colorInputChangeListener = () => {
    if (colorInput) {
      colorInput.addEventListener('input', () => {
        // Log the current value of the input field
        // validate that input matches pattern
        const inputValue = colorInput.value;
        if (inputValue === "rgb(122, 68, 230)") {
          colorInput.style.backgroundColor = "#4CAF50";
          colorResult.textContent = "Correct!";
        } else {
          return;
        }

      });
    }
  }

  const paragraphInput = document.getElementById('paragraph-count');
  const paragraphResult = document.getElementById('paragraph-result');
  // Add listener to paragraph input field changes
  const paragraphInputChangeListener = () => {
    if (paragraphInput) {
      paragraphInput.addEventListener('input', () => {
        // select all paragraphs
        const paragraphs = document.querySelectorAll('.demo-text');
        if (paragraphs.length === parseInt(paragraphInput.value)) {
          paragraphInput.style.backgroundColor = "#4CAF50";
          paragraphResult.textContent = "Correct!";
        } else {
          return;
        }
      });
    }
  }

  // Monitor step changes with an observer pattern
  const setupStepMonitor = () => {
    // Keep track of the current step
    let lastActiveStep = 1;

    // Use a mutation observer to detect when step changes
    const observer = new MutationObserver((mutations) => {
      // Check for relevant class changes on stepper items
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' &&
            mutation.attributeName === 'class' &&
            mutation.target.classList.contains('stepper-item')) {

          // Get the step that just became active
          const activeSteps = document.querySelectorAll('.stepper-item.active');
          if (activeSteps.length > 0) {
            const currentStep = parseInt(activeSteps[0].dataset.step);

            // If this is a new step (and not initialization)
            if (currentStep !== lastActiveStep) {
              console.log(`%c📍 Step ${currentStep} active`, 'color: #4a6bbf');

              // Display the appropriate console message for the step
              switch(currentStep) {
                case 2:
                  console.log('%c💡 Try $("#demo-title") to select the demo title', 'color: #5B86D7');
                  break;
                case 3:
                  console.log('%c💡 Try $$(".demo-text").length to count paragraphs', 'color: #FE8D59');
                  break;
                case 4:
                  console.log('%c💡 Try typing "Hello DevTools" and then $_', 'color: #5cb85c');
                  break;
                case 5:
                  console.log('%c🎉 You\'ve learned all the shortcuts! Try combining them.', 'color: #5B86D7; font-weight: bold');
                  break;
              }

              // Update our tracking
              lastActiveStep = currentStep;
            }
          }
        }
      });
    });

    // Start observing all stepper items for class changes
    const stepperItems = document.querySelectorAll('.stepper-item');
    const observerOptions = { attributes: true, attributeFilter: ['class'] };

    stepperItems.forEach(item => {
      observer.observe(item, observerOptions);
    });
  };

  // Initialize with a slight delay to ensure DOM is fully ready
  setTimeout(() => {
    createDemoElements();
    setupStepMonitor();
    colorInputChangeListener(); // Add input change listener
    paragraphInputChangeListener(); // Add paragraph input change listener
  }, 500);
});
