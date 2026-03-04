// CSS (webpack handles this)
import "./index.css";

// Validation
import {
  enableValidation,
  validationconfig,
  toggleButtonState,
  resetValidation,
} from "../scripts/validate";

import Api from "../utils/Api";

// ---------- INITIAL CARDS ----------
const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
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
    name: "a very long bridge, over the forest",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "an outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// ---------- API CLASS ----------
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "def30070-5e81-4326-a060-1e06121bc39e",
    "Content-Type": "application/json",
  },
});
let currentUserId = null;
const likedCardsStorageKey = "liked-card-ids";

function getStoredLikedCardIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(likedCardsStorageKey) || "[]");
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function setStoredLikedCardId(cardId, isLiked) {
  if (!cardId) return;
  const likedIds = getStoredLikedCardIds();
  if (isLiked) {
    likedIds.add(cardId);
  } else {
    likedIds.delete(cardId);
  }
  localStorage.setItem(likedCardsStorageKey, JSON.stringify([...likedIds]));
}

function isCardLikedByCurrentUser(card) {
  if (typeof card?.isLiked === "boolean") {
    return card.isLiked;
  }

  const likes = Array.isArray(card?.likes) ? card.likes : [];
  const likedFromApi = likes.some((like) => {
    if (typeof like === "string") return like === currentUserId;
    if (like && typeof like === "object") {
      return like._id === currentUserId || like.id === currentUserId;
    }
    return false;
  });

  if (likedFromApi) return true;
  return getStoredLikedCardIds().has(card?._id);
}
// ---------- RENDER INITIAL CARDS  ----------

api
  .getAppInfo()
  .then(({ userInfo, cards }) => {
    currentUserId = userInfo._id;
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

// ---------- ELEMENTS ----------
const cardsList = document.querySelector(".cards__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditForm = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#new_post-add-card");
const modals = document.querySelectorAll(".modal");
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const closeButtons = document.querySelectorAll(".modal__close-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile__avatar-input");
const avatarModalbutton = document.querySelector(".profile__avatar-button");
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const modalCancelbutton = document.querySelector("#cancel-delete-btn");
let selectedCard = null;

// ---------- MODAL HELPERS ----------
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscape);
}

// TODO - Finish avatar submission handler

function handleavatarSubmit(evt) {
  evt.preventDefault();
  const modalsubmitbtn = evt.target.querySelector('button[type="submit"]');
  const initialText = modalsubmitbtn ? modalsubmitbtn.textContent : "Save";

  if (modalsubmitbtn) {
    modalsubmitbtn.textContent = "Saving...";
  }


  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.src = data?.avatar || avatarInput.value;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      if (modalsubmitbtn) {
        modalsubmitbtn.textContent = initialText;
      }
    });
}
// ToDO - add API call to update avatar
// api
// .getAppInfo()
// .then((cards) => {
//   console.log(cards);
//   cards.forEach((item) => {
//     const cardElement = getCardElement(item);
//     cardsList.append(cardElement);
//   });
// })
// }
// ---------- CARD ----------
function getCardElement(data) {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".card").cloneNode(true);
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  image.src = data.link;
  image.alt = data.name;
  title.textContent = data.name;

  const isLiked = isCardLikedByCurrentUser(data);
  if (isLiked) {
    likeButton.classList.add("card__like-button_active");
  }
  likeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  deleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(evt, data._id);
  });

  image.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return card;
}

function handleLike(evt, cardId) {
  const likeButton = evt.currentTarget;
  const isLiked = likeButton.classList.contains("card__like-button_active");

  likeButton.disabled = true;

  api
    .changeLikeStatus({ id: cardId, isLiked })
    .then((updatedCard) => {
      const likedByUser = isCardLikedByCurrentUser(updatedCard);
      likeButton.classList.toggle("card__like-button_active", likedByUser);
      setStoredLikedCardId(cardId, likedByUser);
    })
    .catch(console.error)
    .finally(() => {
      likeButton.disabled = false;
    });
}

// TODO - if the card is liked, set the active class on the card
function handleDeleteCard(evt, cardId) {
  selectedCard = evt.target.closest(".card");
  console.log(cardId);
  openModal(deleteModal);
}

// ---------- PROFILE FORM ----------
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  resetValidation(
    profileEditForm,
    [nameInput, descriptionInput],
    validationconfig,
  );

  openModal(profileEditModal);
});
// TODO select modal button at top of the page
// to secect avatar modal
avatarModalbutton.addEventListener("click", () => {
  openModal(avatarModal);
});

profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const modalsubmitbtn = evt.target.querySelector('button[type="submit"]');
  const initialText = modalsubmitbtn ? modalsubmitbtn.textContent : "Save";

  if (modalsubmitbtn) {
    modalsubmitbtn.textContent = "Saving...";
  }

  api
    .editUserInfo({
      name: nameInput.value,
      about: descriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileEditModal);
    })
    .catch(console.error)
    .finally(() => {
      if (modalsubmitbtn) {
        modalsubmitbtn.textContent = initialText;
      }
    });
});

// ---------- ADD CARD FORM ----------
document.querySelector(".profile__add-button").addEventListener("click", () => {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const modalsubmitbtn = evt.target.querySelector('button[type="submit"]');
  const initialText = modalsubmitbtn ? modalsubmitbtn.textContent : "Save";

  if (modalsubmitbtn) {
    modalsubmitbtn.textContent = "Saving...";
  }

  const formData = new FormData(addCardForm);
  const cardData = Object.fromEntries(formData);

  api
    .addCard(cardData)
    .then((newCard) => {
      cardsList.prepend(getCardElement(newCard));
      addCardForm.reset();

      const inputs = Array.from(addCardForm.querySelectorAll(".modal__input"));
      const button = addCardForm.querySelector(".modal__submit-btn");
      toggleButtonState(inputs, button, validationconfig);

      closeModal(addCardModal);
    })
    .catch(console.error)
    .finally(() => {
      if (modalsubmitbtn) {
        modalsubmitbtn.textContent = initialText;
      }
    });
});

avatarForm.addEventListener("submit", handleavatarSubmit);

deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (selectedCard) {
    selectedCard.remove();
    selectedCard = null;
  }
  closeModal(deleteModal);
});

modalCancelbutton.addEventListener("click", () => {
  selectedCard = null;
  closeModal(deleteModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// ---------- ENABLE VALIDATION ----------
enableValidation(validationconfig);
