// JavaScript for level c6: Console Superpowers (console.table and console.trace)

// Global state
let completedChallenges = {
  tableChallenge: false,
  traceChallenge: false,
  timeChallenge: false,
  combinedChallenge: false
};

// Products data for console.table challenge
const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, inStock: true },
  { id: 2, name: 'Headphones', category: 'Audio', price: 149.50, inStock: true },
  { id: 3, name: 'Monitor', category: 'Electronics', price: 349.99, inStock: false },
  { id: 4, name: 'Gaming Mouse', category: 'Accessories', price: 89.95, inStock: true },
  { id: 5, name: 'Smart Watch', category: 'Wearables', price: 299.00, inStock: true },
  { id: 6, name: 'Keyboard', category: 'Accessories', price: 129.99, inStock: true },
  { id: 7, name: 'Graphics Card', category: 'Components', price: 1299.99, inStock: false }
];

// Make products available in global scope but not directly visible
Object.defineProperty(window, '_products', {
  value: products,
  writable: false,
  enumerable: false
});

// Console trace challenge functions
function mysteryFunction() {
  findBug();
}

function findBug() {
  // This function is meant to be discovered and traced by the user
  console.log("You found the mystery function! Now use console.trace() to see who called me.");
}

function bugController() {
  mysteryFunction();
}

// Make function available in global scope
window.findBug = findBug;
window.bugController = bugController;

// Shopping cart for combined challenge
const shoppingCart = {
  items: [
    { name: 'T-shirt', price: 19.99, quantity: 2 },
    { name: 'Jeans', price: 49.99, quantity: 1 },
    { name: 'Sneakers', price: 79.99, quantity: 1 },
    { name: 'Hat', price: '25', quantity: 1 } // Bug: price is a string
  ],
  calculateTotal: function() {
    console.log('Calculating total...');
    let total = 0;
    this.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }
};

// Debug function for combined challenge
function debugShoppingCart() {
  console.group('Shopping Cart Debug');
  console.log('Items in cart:');
  console.table(shoppingCart.items);

  console.time('Calculate Total');
  const total = shoppingCart.calculateTotal();
  console.timeEnd('Calculate Total');

  console.log('Total price:', total);
  console.trace('Cart calculation trace');
  console.groupEnd();
}

window.debugShoppingCart = debugShoppingCart;

// Sorting algorithms for time challenge
function bubbleSort(arr) {
  const array = [...arr]; // Create a copy to avoid modifying original
  const n = array.length;

  for (let i = 0; i < n; i++) {
    // Last i elements are already sorted
    for (let j = 0; j < n - i - 1; j++) {
      // Swap if current element is greater than next
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const array = [...arr]; // Create a copy
  const pivot = array[0];
  const left = [];
  const right = [];

  // Start from index 1 as pivot is at index 0
  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Make sorting functions available globally
window.bubbleSort = bubbleSort;
window.quickSort = quickSort;

// Compare sorting algorithms
function compareSortAlgorithms() {
  const data = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));

  console.log("Comparing sorting algorithms with 1000 random numbers:");

  console.time('bubbleSort');
  bubbleSort(data);
  console.timeEnd('bubbleSort');

  console.time('quickSort');
  quickSort(data);
  console.timeEnd('quickSort');

  console.log("Hint: Compare the times and see which one is faster!");
}

window.compareSortAlgorithms = compareSortAlgorithms;

// Initialize event listeners once DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('%c👋 Welcome to the Console Logging tutorial!', 'color: #5B86D7; font-size: 16px; font-weight: bold;');
  // console.table demo button
  document.getElementById('try-table-btn').addEventListener('click', function() {
    console.log('Regular console.log of users array:');
    const users = [
      { id: 1, name: 'Alice', role: 'Developer', active: true },
      { id: 2, name: 'Bob', role: 'Designer', active: false },
      { id: 3, name: 'Charlie', role: 'Manager', active: true },
      { id: 4, name: 'Diana', role: 'DevOps', active: true }
    ];
    console.log(users);

    console.log('Now with console.table - much better!');
    console.table(users);

    // Hint for challenge
    console.log('Hint: Try typing console.table(window._products) to see our product list!');
  });

  // console.trace demo button
  document.getElementById('try-trace-btn').addEventListener('click', function() {
    function firstFunction() {
      secondFunction();
    }

    function secondFunction() {
      thirdFunction();
    }

    function thirdFunction() {
      console.trace('Following the breadcrumbs 🍞');
    }

    firstFunction();

    // Hint for challenge
    console.log('Hint: Try calling bugController() and then use console.trace() in the findBug() function!');
  });

  // console.time demo button
  document.getElementById('try-time-btn').addEventListener('click', function() {
    console.log('Measuring performance with console.time()...');

    // Simple demonstration with an array sort
    const numbers = Array.from({length: 10000}, () => Math.floor(Math.random() * 10000));

    console.time('sort');
    numbers.sort((a, b) => a - b);
    console.timeEnd('sort');

    // More complex example with nested timers
    console.time('dataProcessing');

    console.time('step1');
    // Simulate step 1 processing
    const data1 = Array.from({length: 5000}, () => Math.random());
    console.timeEnd('step1');

    console.time('step2');
    // Simulate step 2 processing
    const data2 = data1.map(x => x * 2);
    console.timeEnd('step2');

    console.timeEnd('dataProcessing');

    console.log('Hint: Try calling compareSortAlgorithms() to see which sorting algorithm is faster!');
  });

  // console.group demo button
  document.getElementById('try-group-btn').addEventListener('click', function() {
    // Basic group example
    console.group('User Authentication Process');
    console.log('Verifying credentials...');
    console.log('Checking permissions...');

    // Nested group example
    console.group('Session Details');
    console.log('Session ID: ABC123');
    console.log('Expires: 2hrs');
    console.groupEnd();

    console.log('Auth successful!');
    console.groupEnd();

    // Collapsed group example
    console.groupCollapsed('Advanced Debugging (click to expand)');
    console.log('This starts collapsed');
    console.log('Great for hiding verbose information');
    console.table({
      user: 'developer123',
      role: 'admin',
      permissions: ['read', 'write', 'delete']
    });
    console.groupEnd();

    // Hint for challenge
    console.log('Hint: Try calling debugShoppingCart() and examine the output carefully!');
  });

  // Table challenge check
  document.getElementById('check-table-challenge').addEventListener('click', function() {
    const userAnswer = document.getElementById('table-challenge-input').value.trim().toLowerCase();
    const feedback = document.getElementById('table-challenge-feedback');

    if (userAnswer === 'graphics card') {
      feedback.textContent = 'Correct! Graphics Card is our most expensive item at $1299.99';
      feedback.className = 'validation-feedback success-feedback';
      completedChallenges.tableChallenge = true;
      checkAllChallenges();
    } else {
      feedback.textContent = 'Not quite! Try using console.table(window._products) and look for the highest price.';
      feedback.className = 'validation-feedback error-feedback';
    }
    feedback.style.display = 'block';
  });

  // Trace challenge check
  document.getElementById('check-trace-challenge').addEventListener('click', function() {
    const userAnswer = document.getElementById('trace-challenge-input').value.trim().toLowerCase();
    const feedback = document.getElementById('trace-challenge-feedback');

    if (userAnswer === 'mysteryfunction') {
      feedback.textContent = 'Correct! mysteryFunction() calls findBug()';
      feedback.className = 'validation-feedback success-feedback';
      completedChallenges.traceChallenge = true;
      checkAllChallenges();
    } else {
      feedback.textContent = 'Not quite! Try adding console.trace() inside the findBug() function, then call bugController().';
      feedback.className = 'validation-feedback error-feedback';
    }
    feedback.style.display = 'block';
  });

  // Time challenge check
  document.getElementById('check-time-challenge').addEventListener('click', function() {
    const userAnswer = document.getElementById('time-challenge-input').value.trim().toLowerCase();
    const feedback = document.getElementById('time-challenge-feedback');

    if (userAnswer === 'quicksort' || userAnswer === 'quick sort') {
      feedback.textContent = 'Correct! QuickSort is significantly faster than BubbleSort for large datasets.';
      feedback.className = 'validation-feedback success-feedback';
      completedChallenges.timeChallenge = true;
      checkAllChallenges();
    } else {
      feedback.textContent = 'Not quite! Try calling compareSortAlgorithms() and check which algorithm completes faster.';
      feedback.className = 'validation-feedback error-feedback';
    }
    feedback.style.display = 'block';
  });

  // Combined challenge check
  document.getElementById('check-combined-challenge').addEventListener('click', function() {
    const userAnswer = document.getElementById('combined-challenge-input').value.trim().toLowerCase();
    const feedback = document.getElementById('combined-challenge-feedback');

    if (userAnswer === 'hat') {
      feedback.textContent = 'Perfect! The Hat has a string price ("25") instead of a number, causing calculation issues.';
      feedback.className = 'validation-feedback success-feedback';
      completedChallenges.combinedChallenge = true;
      checkAllChallenges();
    } else {
      feedback.textContent = 'Not quite! Call debugShoppingCart() and look closely at the data types in the table.';
      feedback.className = 'validation-feedback error-feedback';
    }
    feedback.style.display = 'block';
  });
});

// The nextStep function is handled by the tutorial_level.html template
document.addEventListener('tutorial-step-changed', function(e) {
  const stepNumber = e.detail.newStep;

  // Provide hints in console when reaching specific steps
  if (stepNumber === 1) {
    console.log('%c✨ Hint: Try console.table(window._products) to explore our product data!', 'color: var(--primary-color); font-weight: bold;');
  } else if (stepNumber === 2) {
    console.log('%c🔍 Hint: Call bugController() then add console.trace() inside findBug() to solve the challenge!', 'color: var(--color-orange); font-weight: bold;');
  } else if (stepNumber === 3) {
    console.log('%c⏱️ Hint: Try compareSortAlgorithms() to see which sorting algorithm performs better!', 'color: var(--success-color); font-weight: bold;');
  } else if (stepNumber === 4) {
    console.log('%c📁 Hint: Try organizing your debugging with console.group() and console.groupEnd()!', 'color: var(--primary-light); font-weight: bold;');
    console.log('%c🛒 Hint: Something is wrong with the shopping cart calculation. Use console methods to find the bug!', 'color: var(--primary-dark); font-weight: bold;');
  }
});

function checkAllChallenges() {
  if (completedChallenges.tableChallenge &&
      completedChallenges.traceChallenge &&
      completedChallenges.timeChallenge &&
      completedChallenges.combinedChallenge) {
    console.log('%c🎉 All challenges completed! Call completeLevel() in the console to finish the level!', 'color: var(--success-color); font-weight: bold; font-size: 16px');
  }
}

// Level completion function
window.completeLevel = function() {
  const allCompleted = completedChallenges.tableChallenge &&
                      completedChallenges.traceChallenge &&
                      completedChallenges.timeChallenge &&
                      completedChallenges.combinedChallenge;

  if (allCompleted) {
    document.getElementById('completion-message').style.display = 'block';
    // Scroll to completion message
    document.getElementById('completion-message').scrollIntoView({behavior: 'smooth'});

    // Display confetti effect
    console.log('%c🎉 Congratulations! You have mastered advanced console methods! 🎉',
                'color: var(--success-color); font-weight: bold; font-size: 16px; padding: 10px;');

    // Replace with your actual mechanism for completing the level
    try {
      // This will be defined by the game engine
      window.parent.postMessage({type: 'levelComplete', secret: document.getElementById('secret-code').textContent}, '*');

      // Bonus tip
      console.log('%c💡 Bonus tip: Try console.dir(document.body) to see another useful console method!',
                 'color: #9C27B0; font-weight: bold;');
    } catch (e) {
      console.log('Level complete! In production, this would notify the game engine.');
    }
  } else {
    console.log('%c⚠️ Complete all three challenges before calling completeLevel()!',
                'color: orange; font-weight: bold;');
  }
};
