// JavaScript for level p1
// Filename: p1_obfuscated.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('%cPerformance Level: Layout Shifts Challenge', 'color: #4285f4; font-size: 16px; font-weight: bold;');
  console.log('%cUse the Performance tab to identify the element with the worst CLS score', 'color: #666; font-style: italic;');

  // Generate random alphanumeric ID (6 characters)
  const generateRandomId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Mock fetch function with delay
  const mockFetch = (data, delay = 500) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  };

  // Load products with layout shift
  const loadProducts = async () => {
    const productGrid = document.getElementById('product-grid');

    // First clear any skeleton loading state
    productGrid.innerHTML = '';

    // Products data
    const products = await mockFetch([
      { name: 'Premium Headphones', price: '$149.99', image: 'headphones.jpg' },
      { name: 'Smart Watch', price: '$299.99', image: 'watch.jpg' },
      { name: 'Wireless Charger', price: '$49.99', image: 'charger.jpg' },
      { name: 'Bluetooth Speaker', price: '$89.99', image: 'speaker.jpg' },
      { name: 'Fitness Tracker', price: '$79.99', image: 'tracker.jpg' },
      { name: 'Wireless Earbuds', price: '$129.99', image: 'earbuds.jpg' }
    ], 800);

    // Add products to the grid - will cause minor layout shift
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.id = generateRandomId();

      // Create product content that will shift layout
      productCard.innerHTML = `
        <div class="product-image"></div>
        <div class="product-title">${product.name}</div>
        <div class="product-price">${product.price}</div>
      `;

      productGrid.appendChild(productCard);
    });
  };

  // Load news content with layout shift
  const loadNews = async () => {
    const newsContainer = document.getElementById('news-container');

    // News data with different heights to cause shifts
    const news = await mockFetch([
      {
        title: 'New Product Launch Coming Soon',
        content: 'Our company is preparing to launch an exciting new product line next month.',
        image: true
      },
      {
        title: 'Industry Conference Highlights',
        content: 'The team attended the annual industry conference and brought back valuable insights.',
        image: false
      },
      {
        title: 'Customer Spotlight',
        content: 'Read how our customers are using our products to transform their businesses.',
        image: true
      }
    ], 1200);

    // Clear the container
    newsContainer.innerHTML = '';

    // Add news items that will cause some layout shift
    news.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.className = 'card-content';
      newsItem.id = generateRandomId();

      let content = `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
      `;

      // Add image to some news items - will cause layout shift
      if (item.image) {
        content += `<div class="card-image"></div>`;
      }

      newsItem.innerHTML = content;
      newsContainer.appendChild(newsItem);
    });
  };

  // Load categories with minor layout shift
  const loadCategories = async () => {
    const categoriesContainer = document.getElementById('categories-list');

    // Categories data
    const categories = await mockFetch([
      'Electronics', 'Audio', 'Wearables', 'Smart Home', 'Accessories'
    ], 600);

    // Clear the container
    categoriesContainer.innerHTML = '';

    // Create a list of categories that will cause minor shifts
    const list = document.createElement('ul');
    list.id = generateRandomId();

    categories.forEach(category => {
      const item = document.createElement('li');
      item.textContent = category;
      item.id = generateRandomId();
      list.appendChild(item);
    });

    categoriesContainer.appendChild(list);
  };

  // Load the banner with major layout shift - this is the worst offender
  const loadBanner = async () => {
    // Get the banner element which has the secret as its ID
    const banner = document.getElementById('{{ secret }}');

    // Banner data with big size change
    const bannerData = await mockFetch({
      title: 'SPECIAL OFFER',
      content: 'Get 50% off on all products this week only! Limited time offer!',
      height: '120px'
    }, 1500);

    // Apply the banner content - will cause MAJOR layout shift
    banner.innerHTML = `
      <h3 style="margin:0">${bannerData.title}</h3>
      <p style="margin:10px 0">${bannerData.content}</p>
      <button style="background:#ff4081;color:white;border:none;padding:8px 16px;border-radius:4px">
        Shop Now
      </button>
    `;

    // Remove loading class
    banner.classList.remove('loading');

    // Change height dramatically to cause the biggest layout shift
    banner.style.height = bannerData.height;
    banner.style.padding = '20px';
    banner.style.backgroundColor = '#ffeb3b';
    banner.style.borderColor = '#ff9800';
    banner.style.fontSize = '16px';
  };

  // Load the hero image with layout shift
  const loadHeroImage = async () => {
    const heroImage = document.getElementById('hero-image');

    // Hero data
    await mockFetch({ height: '300px' }, 1000);

    // Update hero image - causes layout shift
    heroImage.classList.remove('loading');
    heroImage.style.height = '300px';
    heroImage.style.backgroundColor = '#4285f4';
  };

  // Load footer content
  const loadFooter = async () => {
    const footerLinks = document.querySelector('.footer-links');
    const copyright = document.querySelector('.copyright');

    // Footer data
    await mockFetch({}, 900);

    // Update footer - minimal layout shift
    footerLinks.innerHTML = `
      <a href="#">About</a> |
      <a href="#">Contact</a> |
      <a href="#">Terms</a> |
      <a href="#">Privacy</a>
    `;

    copyright.textContent = '© 2025 ShiftySite. All rights reserved.';

    // Remove loading classes
    footerLinks.classList.remove('loading');
    copyright.classList.remove('loading');
  };

  // Remove loading state from titles
  const updateTitles = async () => {
    const titles = document.querySelectorAll('.card-title.loading');

    await mockFetch({}, 700);

    titles.forEach(title => {
      title.classList.remove('loading');
    });
  };

  // Initialize the page with staggered loading to create layout shifts
  const initPage = async () => {
    // Start loading everything with different timings to cause layout shifts
    loadCategories();
    loadProducts();

    // Slight delay before loading hero to create more visible shift
    setTimeout(() => {
      loadHeroImage();
    }, 200);

    // Update titles
    setTimeout(() => {
      updateTitles();
    }, 400);

    // Load news content after a delay
    setTimeout(() => {
      loadNews();
    }, 600);

    // Load footer after delay
    setTimeout(() => {
      loadFooter();
    }, 800);

    // Load the banner last - this causes the worst layout shift
    setTimeout(() => {
      loadBanner();
    }, 1000);
  };

  // Initialize everything with a short delay
  setTimeout(() => {
    initPage();
  }, 500);
});
