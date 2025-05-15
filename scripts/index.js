
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  }]

// Button and modal variables
const profileEditButton = document.querySelector(".profile__edit-button"); // Add this line
const profileEditModal = document.querySelector("#edit-profile-modal");
const modalCloseButton = document.querySelector(".modal__close-btn");
const cardsList = document.querySelector(".cards__list"); // Move this up here

// Profile info variables
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Form variables
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Input field variables
const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");




function openModal(modal) {
  modal.classList.add("modal_opened");
}
1.
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
}

function handleProfileEditButtonClick() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}



function getCardElement(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
 
  console.log(data);

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

   const cardlikebutton = cardElement.querySelector(".card__like-button");
   cardlikebutton.addEventListener("click",() => {
    cardlikebutton.classList.toggle("card__like-button_active");
   });

  return cardElement;
}



// Event Listeners
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
modalCloseButton.addEventListener("click", () => closeModal(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Keep your card rendering code
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
  console.log(cardData);
});