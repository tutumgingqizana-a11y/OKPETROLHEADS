
// ======================================
// OKUHLE PETROLHEADS - JAVASCRIPT
// ======================================

const cars = [
  {
    brand: "Toyota",
    model: "Hilux",
    category: "Bakkie",
    fuel: "Diesel / Petrol",
    engine: "2.4L / 2.8L",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=85",
    description: "A powerful South African bakkie built for work, towing and off-road driving."
  },
  {
    brand: "Toyota",
    model: "Fortuner",
    category: "SUV",
    fuel: "Diesel / Petrol",
    engine: "2.4L / 2.8L",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
    description: "A spacious family SUV with off-road capability."
  },
  {
    brand: "Volkswagen",
    model: "Polo Vivo",
    category: "Hatchback",
    fuel: "Petrol",
    engine: "1.4L / 1.6L",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",
    description: "A popular compact hatchback for everyday South African driving."
  },
  {
    brand: "Volkswagen",
    model: "Tiguan",
    category: "SUV",
    fuel: "Petrol / Diesel",
    engine: "Varies by derivative",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
    description: "A comfortable SUV with modern technology and practical space."
  },
  {
    brand: "Isuzu",
    model: "D-Max",
    category: "Bakkie",
    fuel: "Diesel",
    engine: "1.9L / 3.0L",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=85",
    description: "A durable bakkie designed for tough working conditions."
  },
  {
    brand: "Audi",
    model: "A3",
    category: "Sedan",
    fuel: "Petrol",
    engine: "Varies by derivative",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=900&q=85",
    description: "A premium compact vehicle with elegant styling and technology."
  },
  {
    brand: "BMW",
    model: "3 Series",
    category: "Sedan",
    fuel: "Petrol / Diesel",
    engine: "Varies by derivative",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85",
    description: "A sporty executive sedan offering comfort and performance."
  },
  {
    brand: "BMW",
    model: "X5",
    category: "SUV",
    fuel: "Petrol / Diesel / Hybrid",
    engine: "Varies by derivative",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85",
    description: "A premium SUV with luxury features and strong performance."
  },
  {
    brand: "Nissan",
    model: "Navara",
    category: "Bakkie",
    fuel: "Diesel",
    engine: "Varies by model year",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=85",
    description: "A versatile bakkie for business, travel and outdoor adventures."
  },
  {
    brand: "Renault",
    model: "Kwid",
    category: "Hatchback",
    fuel: "Petrol",
    engine: "1.0L",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
    description: "A compact city car designed for economical everyday driving."
  },
  {
    brand: "Suzuki",
    model: "Swift",
    category: "Hatchback",
    fuel: "Petrol",
    engine: "1.2L",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=85",
    description: "A compact and economical hatchback for city driving."
  },
  {
    brand: "Mercedes-Benz",
    model: "C-Class",
    category: "Sedan",
    fuel: "Petrol / Diesel / Hybrid",
    engine: "Varies by derivative",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85",
    description: "A luxury sedan with premium comfort and modern technology."
  }
];

// ======================================
// WEBSITE ELEMENTS
// ======================================

const carGrid = document.getElementById("carGrid");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");

const carModal = document.getElementById("carModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");

// ======================================
// DISPLAY CAR PICTURES AND CARDS
// ======================================

function displayCars(carList) {

  carGrid.innerHTML = "";

  resultCount.textContent =
    carList.length + " cars found";

  if (carList.length === 0) {
    carGrid.textContent = "No cars found.";
    return;
  }

  carList.forEach((car) => {

    const card = document.createElement("div");
    card.className = "car-card";

    const image = document.createElement("img");
    image.src = car.image;
    image.alt = car.brand + " " + car.model;
    image.className = "car-image";
    image.loading = "lazy";

    const brand = document.createElement("p");
    brand.className = "car-brand";
    brand.textContent = car.brand;

    const heading = document.createElement("h3");
    heading.textContent = car.model;

    const category = document.createElement("p");
    category.textContent = "Category: " + car.category;

    const description = document.createElement("p");
    description.textContent = car.description;

    const button = document.createElement("button");
    button.textContent = "View Specifications";
    button.className = "spec-button";

    button.addEventListener("click", () => {
      showCarDetails(car);
    });

    image.onerror = () => {
      image.alt = "Picture unavailable for " + car.model;
    };

    card.append(
      image,
      brand,
      heading,
      category,
      description,
      button
    );

    carGrid.appendChild(card);
  });
}

// ======================================
// SEARCH FUNCTION
// ======================================

function searchCars() {

  const searchText =
    searchInput.value.toLowerCase().trim();

  const selectedBrand = brandFilter.value;
  const selectedCategory = categoryFilter.value;

  const filteredCars = cars.filter(car => {

    const matchesSearch =
      car.brand.toLowerCase().includes(searchText) ||
      car.model.toLowerCase().includes(searchText) ||
      car.category.toLowerCase().includes(searchText);

    const matchesBrand =
      selectedBrand === "all" ||
      car.brand === selectedBrand;

    const matchesCategory =
      selectedCategory === "all" ||
      car.category === selectedCategory;

    return matchesSearch &&
           matchesBrand &&
           matchesCategory;
  });

  displayCars(filteredCars);
}

// ======================================
// VEHICLE SPECIFICATIONS POPUP
// ======================================

function showCarDetails(car) {

  modalDetails.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = car.brand + " " + car.model;

  const image = document.createElement("img");
  image.src = car.image;
  image.alt = car.brand + " " + car.model;
  image.style.width = "100%";
  image.style.maxHeight = "250px";
  image.style.objectFit = "cover";

  modalDetails.append(heading, image);

  const specifications = [
    ["Brand", car.brand],
    ["Model", car.model],
    ["Category", car.category],
    ["Fuel type", car.fuel],
    ["Engine", car.engine],
    ["Description", car.description]
  ];

  specifications.forEach(([label, value]) => {

    const paragraph = document.createElement("p");

    const strong = document.createElement("strong");
    strong.textContent = label + ": ";

    paragraph.append(
      strong,
      document.createTextNode(value)
    );

    modalDetails.appendChild(paragraph);
  });

  const note = document.createElement("p");
  note.textContent =
    "Specifications vary by model year and derivative. Check the manufacturer's South African specifications for exact details.";

  modalDetails.appendChild(note);

  carModal.style.display = "block";
}

// ======================================
// CLOSE POPUP
// ======================================

function hideCarDetails() {
  carModal.style.display = "none";
}

closeModal.addEventListener("click", hideCarDetails);

carModal.addEventListener("click", function(event) {
  if (event.target === carModal) {
    hideCarDetails();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    hideCarDetails();
  }
});

// ======================================
// ACTIVATE SEARCH AND FILTERS
// ======================================

searchInput.addEventListener("input", searchCars);
brandFilter.addEventListener("change", searchCars);
categoryFilter.addEventListener("change", searchCars);

// ======================================
// LOAD ALL CARS WHEN WEBSITE OPENS
// ======================================

displayCars(cars);
