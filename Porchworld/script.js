document.addEventListener('DOMContentLoaded', function () {
    const cartCount = document.getElementById('cartCount');
    let cart = [];

    // Sample Products
    const products = [
      { id: 1, name: 'Interior Paint', price: 50, image: 'paint1.jpg' },
      { id: 2, name: 'Exterior Paint', price: 70, image: 'paint2.jpg' },
      { id: 3, name: 'Specialty Paint', price: 90, image: 'paint3.jpg' },
    ];

    const productGrid = document.getElementById('productGrid');

    // Render Products
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productGrid.appendChild(productItem);
    });
  
    // Add to Cart Function
    window.addToCart = function (productId) {
      const product = products.find(p => p.id === productId);
      cart.push(product);
      cartCount.textContent = cart.length;
      alert(`${product.name} added to cart!`);
    };
  });
  
