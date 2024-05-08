// script.js

// Function to fetch products from products.json
function fetchProducts() {
  return fetch('products.json')
      .then(response => response.json())
      .catch(error => console.error('Error fetching products:', error));
}

// Function to render products
function renderProducts(products) {
  const productRow = document.getElementById('productRow');
  productRow.innerHTML = '';
  products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('col-md-4');
      card.innerHTML = `
          <div class="card mb-4" style="margin-bottom: 20px;">
              <img class="card-img-top" src="${product.image}" alt="Product Image">
              <div class="card-body">
                  <h5 class="card-title text-center" style="font-size: 1.5rem;">${product.title}</h5>
              </div>
          </div>
      `;
      productRow.appendChild(card);
  });
}

// Function to filter products by category
function filterByCategory(category) {
  // Implement your filtering logic here
}

// Initial render of all products
fetchProducts().then(products => renderProducts(products));

// ekkoLightbox functionality
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});
