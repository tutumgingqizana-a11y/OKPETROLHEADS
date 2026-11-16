
const cars = [
  {
    brand: "Toyota",
    model: "Hilux",
    category: "Bakkie",
    fuel: "Diesel / Petrol",
    engine: "2.4L or 2.8L, depending on derivative",
    drivetrain: "4x2 / 4x4",
    description: "A popular South African bakkie known for durability, towing ability and off-road performance."
  },
  {
    brand: "Toyota",
    model: "Fortuner",
    category: "SUV",
    fuel: "Diesel / Petrol",
    engine: "2.4L or 2.8L, depending on derivative",
    drivetrain: "Rear-wheel drive / 4x4",
    description: "A seven-seat SUV designed for family travel, long-distance driving and off-road adventures."
  },
  {
    brand: "Volkswagen",
    model: "Polo Vivo",
    category: "Hatchback",
    fuel: "Petrol",
    engine: "1.4L / 1.6L, depending on derivative",
    drivetrain: "Front-wheel drive",
    description: "A compact hatchback popular in South Africa for everyday driving and affordable motoring."
  },
  {
    brand: "Volkswagen",
    model: "Tiguan",
    category: "SUV",
    fuel: "Petrol / Diesel",
    engine: "Varies by model year and derivative",
    drivetrain: "Front-wheel drive / 4MOTION",
    description: "A practical SUV offering comfort, technology and space for family journeys."
  },
  {
    brand: "Isuzu",
    model: "D-Max",
    category: "Bakkie",
    fuel: "Diesel",
    engine: "1.9L / 3.0L, depending on derivative",
    drivetrain: "4x2 / 4x4",
    description: "A hardworking bakkie designed for utility, towing and demanding working conditions."
  },
  {
    brand: "Audi",
    model: "A3",
    category: "Sedan",
    fuel: "Petrol",
    engine: "Varies by model year and derivative",
    drivetrain: "Front-wheel drive / quattro on selected versions",
    description: "A premium compact car with modern technology, refined styling and a comfortable interior."
  },
  {
    brand: "BMW",
    model: "3 Series",
    category: "Sedan",
    fuel: "Petrol / Diesel",
    engine: "Varies by model year and derivative",
    drivetrain: "Rear-wheel drive / xDrive on selected versions",
    description: "A sporty executive sedan known for driving dynamics, comfort and premium features."
  },
  {
    brand: "Nissan",
    model: "Navara",
    category: "Bakkie",
    fuel: "Diesel",
    engine: "2.5L, depending on model year",
    drivetrain: "4x2 / 4x4",
    description: "A versatile bakkie suited to work, travel and selected off-road applications."
  },
  {
    brand: "Renault",
    model: "Kwid",
    category: "Hatchback",
    fuel: "Petrol",
    engine: "1.0L, depending on model year",
    drivetrain: "Front-wheel drive",
    description: "A compact city car designed for easy parking and everyday urban driving."
  },
  {
    brand: "Suzuki",
    model: "Swift",
    category: "Hatchback",
    fuel: "Petrol",
    engine: "1.2L, depending on model year",
    drivetrain: "Front-wheel drive",
    description: "A lightweight and economical hatchback suited to city driving and daily commuting."
  },
  {
    brand: "Mercedes-Benz",
    model: "C-Class",
    category: "Sedan",
    fuel: "Petrol / Diesel / Hybrid, depending on derivative",
    engine: "Varies by model year and derivative",
    drivetrain: "Rear-wheel drive / 4MATIC on selected versions",
    description: "A luxury sedan combining premium comfort, modern technology and refined performance."
  },
  {
    brand: "BMW",
    model: "X5",
    category: "SUV",
    fuel: "Petrol / Diesel / Hybrid, depending on derivative",
    engine: "Varies by model year and derivative",
    drivetrain: "xDrive on selected versions",
    description: "A premium SUV offering spacious seating, strong performance and advanced technology."
  }
];

// Get website elements
const carGrid = document.getElementById("carGrid");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");

const carModal = document.getElementById("carModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");

// Display car cards
function displayCars(carList) {
  carGrid.innerHTML = "";

  resultCount.textContent =
    `${carList.length} vehicle(s) found`;

  if (carList.length === 0) {
    carGrid.innerHTML =
      "<p>No cars found. Try another search.</p>";
    return;
  }

  carList.forEach((car, index) => {
    const card = document.createElement("article");
    card.className = "car-card";

    const icon = car.category === "Bakkie" ? "🛻" :
                 car.category === "SUV" ? "🚙" :
                 car.category === "Sedan" ? "🚘" : "🚗";

    const iconDiv = document.createElement("div");
    iconDiv.className = "car-icon";
    iconDiv.textContent = icon;

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
    button.className = "spec-button";
    button.textContent = "View Specs";
    button.addEventListener("click", () => showCarDetails(index));

    card.append(
      iconDiv,
      brand,
      heading,
      category,
      description,
      button
    );

    carGrid.appendChild(card);
  });
}

// Search and filter cars
function filterCars() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedBrand = brandFilter.value;
  const selectedCategory = categoryFilter.value;

  const filteredCars = cars.filter(car => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.category.toLowerCase().includes(searchTerm);

    const matchesBrand =
      selectedBrand === "all" || car.brand === selectedBrand;

    const matchesCategory =
      selectedCategory === "all" ||
      car.category === selectedCategory;

    return matchesSearch && matchesBrand && matchesCategory;
  });

  displayCars(filteredCars);
}

// Show detailed specifications
function showCarDetails(index) {
  const car = cars[index];

  modalDetails.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = `${car.brand} ${car.model}`;

  const specs = [
    ["Brand", car.brand],
    ["Model", car.model],
    ["Category", car.category],
    ["Fuel type", car.fuel],
    ["Engine", car.engine],
    ["Drivetrain", car.drivetrain],
    ["Description", car.description]
  ];

  modalDetails.appendChild(heading);

  specs.forEach(([label, value]) => {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = label + ": ";
    paragraph.append(strong, document.createTextNode(value));
    modalDetails.appendChild(paragraph);
  });

  const note = document.createElement("p");
  note.textContent =
    "Specifications can vary by model year and derivative. Confirm exact South African specifications with the manufacturer.";
  modalDetails.appendChild(note);

  carModal.style.display = "block";
}

// Close popup
function hideCarDetails() {
  carModal.style.display = "none";
}

closeModal.addEventListener("click", hideCarDetails);

carModal.addEventListener("click", event => {
  if (event.target === carModal) {
    hideCarDetails();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideCarDetails();
  }
});

// Activate search and filters
searchInput.addEventListener("input", filterCars);
brandFilter.addEventListener("change", filterCars);
categoryFilter.addEventListener("change", filterCars);

// Load all cars when the website opens
displayCars(cars);
