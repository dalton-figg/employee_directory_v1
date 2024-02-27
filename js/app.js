const endpointURL = 'https://randomuser.me/api/';
const users = 12;

const getUserData = async () => {
  const response = await fetch(
    `${endpointURL}?results=${users}&nat=gb,us,ca,nz`
  );

  const data = await response.json();

  populatePage(data.results);
};

getUserData();

const grid = document.getElementById('employee-grid');

const populatePage = (data) => {
  data.forEach((user) => (grid.innerHTML += generateCard(user)));
};

const generateCard = (user) => {
  return `<div class="card">
  <div>
      <img src="${user.picture.large}" width="128" height="128" alt="Employee image" class="card__image">
  </div>
  <div class="card__details">
      <h2 class="card__title">${user.name.first} ${user.name.last}</h2>
      <p>${user.email}</p>
      <p>${user.location.state}</p>
  </div>
</div>`;
};
