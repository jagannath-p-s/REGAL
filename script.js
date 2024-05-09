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
      card.classList.add('col-md-4', 'd-flex'); // Added 'd-flex' to use flexbox
      card.innerHTML = `
          <div class="card mb-4" style="margin-bottom: 20px;">
              <img class="card-img-top" src="${product.image}" alt="Product Image">
              <div class="card-body">
                  <!-- Add your product information here -->
              </div>
          </div>
      `;
      productRow.appendChild(card);
  });
}

// Function to filter products by category
function filterByCategory(category) {
  fetchProducts().then(products => {
      const filteredProducts = products.filter(product => {
          // Extract the category from the image path
          const categoryFromPath = product.image.split('\\')[2]; // Change '\\' to '/' if you're on a Unix-like system

          // Compare the extracted category with the provided category parameter
          return categoryFromPath.toLowerCase() === category.toLowerCase();
      });
      renderProducts(filteredProducts);
  });
}

// Initial render of all products
fetchProducts().then(products => renderProducts(products));

// ekkoLightbox functionality
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Function to redirect to products.html
function redirectToProducts() {
  window.location.href = 'products.html';
}

// Get the navbar element by its ID
const navbar = document.getElementById('navbar');

// Variable to store the previous scroll position
let lastScrollTop = 0;

// Event listener for scroll events
window.addEventListener('scroll', function() {
  // Get the current scroll position
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Check if the scroll position is below the navbar
  if (scrollTop > navbar.offsetTop) {
      // Add a class to the navbar to stick it to the top
      navbar.classList.add('sticky-top');
  } else {
      // Remove the sticky class from the navbar
      navbar.classList.remove('sticky-top');
  }

  // Update the last scroll position
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

document.addEventListener("DOMContentLoaded", function() {
  const photoMain = document.getElementById("photomain");

  document.addEventListener("mousemove", function(event) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const photoRect = photoMain.getBoundingClientRect();
      const photoCenterX = photoRect.left + photoRect.width / 2;
      const photoCenterY = photoRect.top + photoRect.height / 2;

      const deltaX = mouseX - photoCenterX;
      const deltaY = mouseY - photoCenterY;

      const maxMovement = 30; // Adjust as needed
      const movementX = (deltaX / photoRect.width) * maxMovement;
      const movementY = (deltaY / photoRect.height) * maxMovement;

      photoMain.style.transform = `translate(${movementX}px, ${movementY}px)`;
  });
});
