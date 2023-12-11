window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
  });

$(document).ready(function() {
    $('.fade-in').addClass('fade-in');
  });

//contact form
document.addEventListener("DOMContentLoaded", function() {
  // Check if localStorage is supported
  if (typeof(Storage) !== "undefined") {
      // Retrieve stored values if they exist
      var storedName = localStorage.getItem("name");
      var storedEmail = localStorage.getItem("email");
      var storedMessage = localStorage.getItem("message");

      // Listen for form submission
      document.getElementById("contactForm").addEventListener("submit", function(event) {
          // Save user inputs to localStorage
          localStorage.setItem("name", document.getElementById("name").value);
          localStorage.setItem("email", document.getElementById("email").value);
          localStorage.setItem("message", document.getElementById("message").value);
      });
  } else {
      // localStorage is not supported
      console.warn("LocalStorage is not supported in this browser.");
  }
});

//HOTEL BOOKING

// Define global variables to store booking details
let bookings = [];
let totalCostBeforePromo = 0;

// Initialize the page on load
document.addEventListener("DOMContentLoaded", function () {
  initializePage();
});

function initializePage() {
  // Clear initial booking details
  bookings = [];

  // Set total cost to zero
  totalCostBeforePromo = 0;

  // Display initial state
  displayConfirmation();

  // Update the cost of the current booking display
  updateCurrentBookingCost();
}

// Function to update and display the cost of the current booking
function updateCurrentBookingCost() {
  const currentBookingCostDisplay = document.getElementById("currentBookingCost");
  currentBookingCostDisplay.innerHTML = `<p>Current Booking Cost: LKR ${totalCostBeforePromo.toFixed(2)}</p>`;
}

function bookAdventure() {
  // Retrieve values from the form for Adventure Booking
  const adventureType = document.getElementById("adventureType").value;
  const numAdultsAdventure = parseInt(document.getElementById("numAdultsAdventure").value, 10);
  const numChildrenAdventure = parseInt(document.getElementById("numChildrenAdventure").value, 10);
  const needGuide = document.getElementById("needGuide").checked;
  const guideForAdults = document.getElementById("guideForAdults").checked;
  const guideForKids = document.getElementById("guideForKids").checked;

  // Define adventure prices
  const adventurePrices = {
    localAdult: 5000,
    localKid: 2000,
    foreignAdult: 10000,
    foreignKid: 5000,
  };

  // Calculate adventure cost based on the selected adventure type
  let adventureCost = 0;
  if (adventureType === "local") {
    adventureCost += adventurePrices.localAdult * numAdultsAdventure;
    adventureCost += adventurePrices.localKid * numChildrenAdventure;
  } else if (adventureType === "foreigner") {
    adventureCost += adventurePrices.foreignAdult * numAdultsAdventure;
    adventureCost += adventurePrices.foreignKid * numChildrenAdventure;
  }

  // Calculate additional guide charges if needed
  const guideCostAdult = needGuide && guideForAdults ? 1000 * numAdultsAdventure : 0;
  const guideCostKids = needGuide && guideForKids ? 500 * numChildrenAdventure : 0;

  // Update total adventure cost
  adventureCost += guideCostAdult + guideCostKids;

  // Display a thank-you message including adventure details
  const adventureDetailsSection = document.getElementById("adventureDetails");
  adventureDetailsSection.innerHTML = `
    <h2>Thank You for Your Adventure Booking!</h2>
    <p>Adventure Type: ${adventureType}</p>
    <p>Number of Adults: ${numAdultsAdventure}</p>
    <p>Number of Children: ${numChildrenAdventure}</p>
    <p>Need Guide: ${needGuide ? 'Yes' : 'No'}</p>
    <p>Guide For Adults: ${guideForAdults ? 'Yes' : 'No'}</p>
    <p>Guide For Kids: ${guideForKids ? 'Yes' : 'No'}</p>
    <p>Total Adventure Cost: LKR ${adventureCost.toFixed(2)}</p>
    <hr>
  `;

  // Add adventure booking details to the array
  bookings.push({
    type: "Adventure",
    details: adventureDetailsSection.innerHTML,
    cost: adventureCost,
  });

  // Reset booking details for Adventure Booking
  resetAdventureBooking();

  // Display confirmation message
  displayConfirmation();

  // Update the cost of the current booking display
  updateCurrentBookingCost();
}

function bookNow() {
  // Retrieve values from the form for Hotel Booking
  const roomType = document.getElementById("roomType").value;
  const numRooms = parseInt(document.getElementById("numRooms").value, 10);
  const numAdults = parseInt(document.getElementById("numAdults").value, 10);
  const numChildren = parseInt(document.getElementById("numChildren").value, 10);
  const checkInDate = document.getElementById("checkInDate").value;
  const checkOutDate = document.getElementById("checkOutDate").value;
  const wifi = document.getElementById("wifi").checked;
  const poolView = document.getElementById("poolView").checked;
  const gardenView = document.getElementById("gardenView").checked;
  const extraBed = document.getElementById("extraBed").checked;
  const extraBeds = parseInt(document.getElementById("extraBeds").value, 10);
  const promoCode = document.getElementById("promoCode").value;

  // Define room prices
  const roomPrices = {
    single: 25000,
    double: 35000,
    triple: 40000,
  };

  // Calculate base room cost
  const baseRoomCost = roomPrices[roomType] * numRooms;

  // Calculate extra cost for kids above 5 years of age for meals
  const mealCostPerChild = 5000;
  const mealCostForChildren = numChildren > 0 ? mealCostPerChild * numChildren : 0;

  // Calculate extra bed cost
  const extraBedCost = extraBed ? 8000 * extraBeds : 0;

  // Calculate total cost before promo code deduction
  totalCostBeforePromo = baseRoomCost + mealCostForChildren + extraBedCost;

  // Apply promo code deduction if valid
  const validPromoCode = "Promo123";
  const promoCodeDiscountPercentage = 5;
  if (promoCode === validPromoCode) {
    const promoCodeDiscount = (promoCodeDiscountPercentage / 100) * totalCostBeforePromo;
    totalCostBeforePromo -= promoCodeDiscount;
  }

  // Display a thank-you message including hotel details
  const hotelDetailsSection = document.getElementById("hotelDetails");
  hotelDetailsSection.innerHTML = `
    <h2>Thank You for Your Hotel Booking!</h2>
    <p>Room Type: ${roomType}</p>
    <p>Number of Rooms: ${numRooms}</p>
    <p>Number of Adults: ${numAdults}</p>
    <p>Number of Children: ${numChildren}</p>
    <p>Check-in Date: ${checkInDate}</p>
    <p>Check-out Date: ${checkOutDate}</p>
    <p>Extra Requirements: 
      ${wifi ? 'WiFi, ' : ''}
      ${poolView ? 'Pool View, ' : ''}
      ${gardenView ? 'Garden View, ' : ''}
      ${extraBed ? 'Extra Bed' : ''}
    </p>
    <p>Number of Extra Beds: ${extraBeds}</p>
    <p>Total Cost Before Promo Code: LKR ${totalCostBeforePromo.toFixed(2)}</p>
    <hr>
  `;

  // Add hotel booking details to the array
  bookings.push({
    type: "Hotel",
    details: hotelDetailsSection.innerHTML,
    cost: totalCostBeforePromo,
  });

  // Reset booking details for Hotel Booking
  resetHotelBooking();

  // Display confirmation message
  displayConfirmation();

  // Update the cost of the current booking display
  updateCurrentBookingCost();
}

// Function to reset adventure booking form fields
function resetAdventureBooking() {
  document.getElementById("adventureType").value = "local";
  document.getElementById("numAdultsAdventure").value = "1";
  document.getElementById("numChildrenAdventure").value = "0";
  document.getElementById("needGuide").checked = false;
  document.getElementById("guideForAdults").checked = false;
  document.getElementById("guideForKids").checked = false;
}

// Function to reset hotel booking form fields
function resetHotelBooking() {
  document.getElementById("roomType").value = "single";
  document.getElementById("numRooms").value = "1";
  document.getElementById("numAdults").value = "1";
  document.getElementById("numChildren").value = "0";
  document.getElementById("checkInDate").value = "";
  document.getElementById("checkOutDate").value = "";
  document.getElementById("wifi").checked = false;
  document.getElementById("poolView").checked = false;
  document.getElementById("gardenView").checked = false;
  document.getElementById("extraBed").checked = false;
  document.getElementById("extraBeds").value = "0";
  document.getElementById("promoCode").value = "";
}

// Function to display confirmation message
function displayConfirmation() {
  // Display confirmation message
  const confirmationSection = document.getElementById("confirmation");
  confirmationSection.style.display = "block";
  const currentBookingDetails = document.getElementById("currentBookingDetails");
  currentBookingDetails.innerHTML = "";

  // Display all bookings in the current booking details section
  for (const booking of bookings) {
    currentBookingDetails.innerHTML += booking.details;
  }

  const totalCostDisplay = document.getElementById("totalCost");
  totalCostDisplay.innerHTML = `<p>Total Cost: LKR ${calculateTotalCost().toFixed(2)}</p>`;
}

// Function to calculate the total cost of all bookings
function calculateTotalCost() {
  let totalCost = 0;
  for (const booking of bookings) {
    totalCost += booking.cost;
  }
  return totalCost;
}

// Function to save bookings as favorites in local storage
function addToFavorites() {
  localStorage.setItem("favorites", JSON.stringify(bookings));
  alert("Booking added to favorites!");
}

// Function to load favorites from local storage
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  bookings = favorites;
  displayConfirmation();
  alert("Favorites loaded!");
}

// Function for checking loyalty points
function checkLoyalty() {
  // Calculate loyalty points
  const numRooms = parseInt(document.getElementById("numRooms").value, 10);
  const loyaltyPointsEarned = numRooms > 3 ? 20 * numRooms : 0;

  // Display earned loyalty points to the user
  const loyaltyPointsInput = document.getElementById("loyaltyPoints");
  loyaltyPointsInput.value = loyaltyPointsEarned;

  // Save earned loyalty points to local storage
  localStorage.setItem("loyaltyPoints", loyaltyPointsEarned);

  alert(`Earned ${loyaltyPointsEarned} loyalty points!`);
}

// Function to load loyalty points from local storage and display them
function loadLoyaltyPoints() {
  const loyaltyPointsInput = document.getElementById("loyaltyPoints");
  const storedLoyaltyPoints = localStorage.getItem("loyaltyPoints") || 0;
  loyaltyPointsInput.value = storedLoyaltyPoints;
}

// Call the function to load loyalty points on page load
document.addEventListener("DOMContentLoaded", function () {
  loadLoyaltyPoints();
});