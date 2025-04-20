
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

const editprofileBtn = document.querySelector(".profile__edit-button");
const  addCardbtn = document.querySelector(".profile__edit-button");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClosebtn = editProfileModal.querySelector(".modal__close");
const editFormEl = editProfileModal.querySelector(".modal__form");
const nameInputEl = document.querySelector("#profile-name-input");
const DescriptionInputEl = editFormEl.querySelector(
  "#profile-description-input"
);

const addcardModal = document.querySelector("#edit-profile-modal");
const addcardclosebtn = addCardModal.querySelector(".modal__close");
const addCardFormEL = addCardModal.querySelector(".modal__form");
const captionInputEl = addCardFormEL.querySelector("#profile-name-input");
const linkInputEl = addCardFormEL.querySelector("#card-link-input");



editprofileBtn.addEventListener("click", function () {
  nameinputEl.value = profileNameEl.textContent;
  descriptionInputEl.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_opened");
});

addCardBt.addEventListener("click", function () {
  addCardModal.classList.add("modal_opened");
} 

);

initialCards.forEach(function (item) {
 console.log(item.name);
  console.log(item.link);
});

function openModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editProfileModal.classList.remove("modal_opened");
  // TODO - same thing for description element
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal();
  // TODO - same thing for description element
}

profileEditButton.addEventListener("click", openModal);  

editModalClosebtn.addEventListener("click", closeModal); 

editFormElement.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialcards.length; i++) {
 const cardElement = getCardElement(initialcards[i]);
  cardsList.prepend(cardElement);
}
