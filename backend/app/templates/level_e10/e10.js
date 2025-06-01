// JavaScript for level e10: Visual CSS Editors - Grid and Flex Layout Badges
console.log('%c🎮 Welcome to the Visual CSS Editors tutorial!', 'color: #5B86D7; font-size: 16px; font-weight: bold;');
console.log('%cInspect elements and use the layout badges to complete challenges', 'color: #666; font-style: italic;');

// Indicate that the tutorial script has loaded
window.visualEditorsLoaded = true;

// Track completion status
const challengeState = {
  flexChallengeCompleted: false,
  gridChallengeCompleted: false
};

document.addEventListener('DOMContentLoaded', () => {
  // CSS Properties to observe for each challenge
  const flexProperties = ['flex-direction', 'justify-content'];
  const gridProperties = ['grid-template-columns', 'grid-template-rows', 'grid-template-areas'];

  // Set up observers for the challenge containers
  setupFlexboxChallenge();
  setupGridChallenge();

  // Add helpful console messages for each step
  setupStepMonitoring();
});

// Observer to track style changes for flex challenge
function setupFlexboxChallenge() {
  const flexChallenge = document.getElementById('flex-challenge');
  const flexSuccess = document.getElementById('flex-challenge-success');

  if (!flexChallenge || !flexSuccess) return;

  // Create a MutationObserver to watch for style changes
  const flexObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        checkFlexChallengeCompletion(flexChallenge, flexSuccess);
      }
    }
  });

  // Start observing the flex container
  flexObserver.observe(flexChallenge, {
    attributes: true,
    attributeFilter: ['style']
  });

  // Also observe each flex item
  const flexItems = flexChallenge.querySelectorAll('.challenge-item');
  flexItems.forEach(item => {
    flexObserver.observe(item, {
      attributes: true,
      attributeFilter: ['style']
    });
  });
}

// Observer to track style changes for grid challenge
function setupGridChallenge() {
  const gridChallenge = document.getElementById('grid-challenge');
  const gridSuccess = document.getElementById('grid-challenge-success');

  if (!gridChallenge || !gridSuccess) return;

  // Create a MutationObserver to watch for style changes
  const gridObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        checkGridChallengeCompletion(gridChallenge, gridSuccess);
      }
    }
  });

  // Start observing the grid container
  gridObserver.observe(gridChallenge, {
    attributes: true,
    attributeFilter: ['style']
  });

  // Also observe each grid item
  const gridItems = gridChallenge.querySelectorAll('.challenge-item');
  gridItems.forEach(item => {
    gridObserver.observe(item, {
      attributes: true,
      attributeFilter: ['style']
    });
  });
}

// Check if the flex challenge is completed correctly
function checkFlexChallengeCompletion(container, successElement) {
  const computedStyle = window.getComputedStyle(container);
  const flexDirection = computedStyle.getPropertyValue('flex-direction');
  const justifyContent = computedStyle.getPropertyValue('justify-content');

  // Check that items are in a row and spread out
  const isHorizontal = flexDirection.includes('row');
  const isSpacedOut = ['space-between', 'space-around', 'space-evenly'].some(val =>
    justifyContent.includes(val)
  );

  // Check the order of items (logo first, login last)
  const itemsInOrder = checkFlexItemsOrder(container);

  // All conditions must be true to complete challenge
  if (isHorizontal && isSpacedOut && itemsInOrder) {
    successElement.style.display = 'block';
    challengeState.flexChallengeCompleted = true;
    console.log('%c🎉 Great job on the flexbox challenge!', 'color: #4CAF50; font-weight: bold;');
    checkAllChallengesComplete();
  }
}

// Helper function to check if flex items are in the correct order
function checkFlexItemsOrder(container) {
  const items = Array.from(container.querySelectorAll('.challenge-item'));

  // Check if logo is the first visible item
  const logoFirst = items[0].textContent.includes('Logo');

  // Check if login is the last visible item
  const loginLast = items[items.length - 1].textContent.includes('Login');

  return logoFirst && loginLast;
}

// Check if the grid challenge is completed correctly
function checkGridChallengeCompletion(container, successElement) {
  const computedStyle = window.getComputedStyle(container);

  // Get grid template properties
  const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns');
  const gridTemplateRows = computedStyle.getPropertyValue('grid-template-rows');
  const gridTemplateAreas = computedStyle.getPropertyValue('grid-template-areas');

  // Check for multiple columns (at least 2)
  const hasMultipleColumns = gridTemplateColumns.split(/\s+/).filter(Boolean).length >= 2;

  // Check for adequate rows (at least 3 - header, content, footer)
  const hasMultipleRows = gridTemplateRows.split(/\s+/).filter(Boolean).length >= 3;

  // Check item placement using grid-area or grid-column/grid-row properties
  const itemsCorrectlyPlaced = checkGridItemsPlacement(container);

  // All conditions must be true to complete challenge
  if (hasMultipleColumns && hasMultipleRows && itemsCorrectlyPlaced) {
    successElement.style.display = 'block';
    challengeState.gridChallengeCompleted = true;
    console.log('%c🏆 Excellent work on the grid challenge!', 'color: #4CAF50; font-weight: bold;');
    checkAllChallengesComplete();
  }
}

// Helper function to check if grid items are correctly placed
function checkGridItemsPlacement(container) {
  const items = Array.from(container.querySelectorAll('.challenge-item'));

  // Get computed styles for each item
  const headerItem = items.find(item => item.textContent.includes('Header'));
  const sidebarItem = items.find(item => item.textContent.includes('Sidebar'));
  const footerItem = items.find(item => item.textContent.includes('Footer'));

  if (!headerItem || !sidebarItem || !footerItem) return false;

  // Get computed styles
  const headerStyle = window.getComputedStyle(headerItem);
  const sidebarStyle = window.getComputedStyle(sidebarItem);
  const footerStyle = window.getComputedStyle(footerItem);

  // Check header spans full width
  const headerSpansWidth = isSpanningFullWidth(headerItem, container);

  // Check footer spans full width
  const footerSpansWidth = isSpanningFullWidth(footerItem, container);

  // Check sidebar has proper height
  const sidebarProperHeight = isSidebarProperlyPlaced(sidebarItem, container);

  return headerSpansWidth && footerSpansWidth && sidebarProperHeight;
}

// Helper function to check if an element spans the full width
function isSpanningFullWidth(element, container) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  // Allow for small margin of error (5px each side)
  const leftAligned = Math.abs(containerRect.left - elementRect.left) < 20;
  const rightAligned = Math.abs(containerRect.right - elementRect.right) < 20;

  return leftAligned && rightAligned;
}

// Helper function to check if the sidebar is properly placed
function isSidebarProperlyPlaced(sidebar, container) {
  const items = Array.from(container.querySelectorAll('.challenge-item'));
  const headerItem = items.find(item => item.textContent.includes('Header'));
  const footerItem = items.find(item => item.textContent.includes('Footer'));

  if (!headerItem || !footerItem || !sidebar) return false;

  const headerRect = headerItem.getBoundingClientRect();
  const sidebarRect = sidebar.getBoundingClientRect();
  const footerRect = footerItem.getBoundingClientRect();

  // Sidebar should start after header and end before footer
  return sidebarRect.top > headerRect.bottom && sidebarRect.bottom < footerRect.top;
}

// Check if all challenges are complete to reveal the final message
function checkAllChallengesComplete() {
  if (challengeState.flexChallengeCompleted && challengeState.gridChallengeCompleted) {
    const completionMessage = document.getElementById('completion-message');
    if (completionMessage) {
      completionMessage.style.display = 'block';
      console.log('%c🚀 Tutorial complete! You\'ve mastered visual CSS editors!',
        'color: #4CAF50; font-size: 14px; font-weight: bold;');

      // Scroll to the completion message
      completionMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Set up step monitoring to provide helpful messages in the console
function setupStepMonitoring() {
  const stepperItems = document.querySelectorAll('.stepper-item');
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const stepItem = mutation.target;
        const isActive = stepItem.classList.contains('active');
        const step = parseInt(stepItem.dataset.step);

        if (isActive) {
          showStepConsoleHint(step);
        }
      }
    });
  });

  // Observe class changes on all stepper items
  stepperItems.forEach(item => {
    observer.observe(item, { attributes: true, attributeFilter: ['class'] });
  });

  // Show initial hint for the first step
  showStepConsoleHint(1);
}

// Show contextual hints in the console for each step
function showStepConsoleHint(step) {
  const hints = {
    1: {
      message: '📚 Visual CSS editors make layout easier! Ready to discover these DevTools superpowers?',
      style: 'color: #5B86D7; font-weight: bold;'
    },
    2: {
      message: '🔄 Flexbox time! Right-click on any blue box, select "Inspect", and find the flexbox badge.',
      style: 'color: #5B86D7; font-weight: bold;'
    },
    3: {
      message: '🔲 Grid layouts are awesome! Inspect any orange box to find the grid badge and editor.',
      style: 'color: #FE8D59; font-weight: bold;'
    },
    4: {
      message: '💪 Flex challenge: Inspect the navbar container, and use the flexbox editor to fix the layout!',
      style: 'color: #5B86D7; font-weight: bold;'
    },
    5: {
      message: '📏 Grid challenge: Inspect the dashboard container, use the grid editor to create a proper layout!',
      style: 'color: #FE8D59; font-weight: bold;'
    }
  };

  if (hints[step]) {
    console.log(`%c${hints[step].message}`, hints[step].style);
  }
}
