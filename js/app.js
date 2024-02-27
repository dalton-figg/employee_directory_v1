const endpointURL = 'https://randomuser.me/api/';
const users = 12;
const grid = document.getElementById('employee-grid');
let usersData;

// Get user data and populate the page

const getUserData = async () => {
  try {
    const response = await fetch(
      `${endpointURL}?results=${users}&nat=gb,us,ca,nz`
    );
    const data = await response.json();
    usersData = data.results;
    populatePage(usersData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const populatePage = (userData) => {
  userData.forEach(
    (user, index) => (grid.innerHTML += generateCard(user, index))
  );
};

const generateCard = (user, index) => {
  return `
    <div class="card" data-index=${index}>
      <div>
          <img src="${user.picture.large}" width="128" height="128" alt="Employee image" class="card__image">
      </div>
      <div class="card__details">
          <h2 class="card__title">${user.name.first} ${user.name.last}</h2>
          <p>${user.email}</p>
          <p>${user.location.state}</p>
      </div>
    </div>
  `;
};

// Modals

// Define constants for modal container and modal
const modalContainer = document.getElementById('user-modal-container');
const modal = document.getElementById('user-modal');

// Event listener for grid click

grid.addEventListener('click', (e) => {
  // Find the closest card element
  const target = e.target.closest('.card');
  if (target) {
    // Get the index of the target card
    const targetIndex = target.dataset.index;
    // Call the function to create the modal
    createModal(targetIndex);
  }
});

modalContainer.addEventListener('click', (e) => {
  const target = e.target;

  if (target.className === 'user-modal-container' || target.className === 'user-modal__close') removeModal();
});

// Function to create modal
const createModal = (userIndex) => {
    // Get user data from the array based on the index
    const { picture, name, email, location, cell, dob } = usersData[userIndex];
    const { large } = picture;
    const { first, last } = name;
    const { state, street, postcode, city } = location;
    const { number, name: streetName } = street;
    const userBday = new Date(dob.date);
    
    // Set modal container display to grid
    modalContainer.style.display = 'grid';
    
    // Populate modal HTML with user data
    modal.innerHTML = `
      <p class="user-modal__close">X</p>
      <img src="${large}" width="128" height="128" alt="Employee image" class="user-modal__image">
      <h2 class="user-modal__title">${first} ${last}</h2>
      <p>${email}</p>
      <p>${state}</p>
      <hr class="user-modal__divider">
      <p>${cell}</p>  
      <p>${number} ${streetName} ${city}, ${postcode} </p>  
      <p>Birthday: ${userBday.getDate()}/${userBday.getMonth() + 1}/${userBday.getFullYear()}</p>  
    `;
  };
  

const removeModal = () => {
  modalContainer.style.display = 'none';
  modal.innerHTML = '';
};

// Function to fetch user data
getUserData();
