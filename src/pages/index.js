// CSS (webpack handles this)
import "./index.css";

import { validationConfig } from "../utils/constants";

// Validation
import {
  enableValidation,
  toggleButtonState,
  resetValidation,
} from "../scripts/validate";

import Api from "../utils/Api";

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

function renderUserInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
  profileAvatar.alt = userInfo.name;
}

function getStoredLikedCardIds() {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(likedCardsStorageKey) || "[]",
    );
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
    renderUserInfo(userInfo);
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
const addCardForm = document.querySelector("#add-card-form");
const editAvatarForm = document.querySelector("#edit-avatar-form");
const modals = document.querySelectorAll(".modal");
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const closeButtons = document.querySelectorAll(".modal__close-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarInput = avatarModal.querySelector("#profile__avatar-input");
const avatarModalButton = document.querySelector(".profile__avatar-button");
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.querySelector("#delete-confirm-form");
const modalCancelButton = document.querySelector("#cancel-delete-btn");
let selectedCard = null;
let selectedCardId = null;

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
// TODO - implement loading text for all other form submissions
// TODO - Finish avatar submission handler

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const modalSubmitButton = evt.target.querySelector('button[type="submit"]');
  const initialText = modalSubmitButton ? modalSubmitButton.textContent : "Save";

  if (modalSubmitButton) {
    modalSubmitButton.textContent = "Saving...";
  }
  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      renderUserInfo(data);
      editAvatarForm.reset();
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      if (modalSubmitButton) {
        modalSubmitButton.textContent = initialText;
      }
    });
}
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
  selectedCardId = cardId;
  openModal(deleteModal);
}

// ---------- PROFILE FORM ----------
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  resetValidation(
    profileEditForm,
    [nameInput, descriptionInput],
    validationConfig,
  );

  openModal(profileEditModal);
});
// TODO select modal button at top of the page
// to secect avatar modal
avatarModalButton.addEventListener("click", () => {
  editAvatarForm.reset();
  resetValidation(editAvatarForm, [avatarInput], validationConfig);
  toggleButtonState(
    [avatarInput],
    editAvatarForm.querySelector(".modal__submit-btn"),
    validationConfig,
  );
  openModal(avatarModal);
});

profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const modalSubmitButton = evt.target.querySelector('button[type="submit"]');
  const initialText = modalSubmitButton ? modalSubmitButton.textContent : "Save";

  if (modalSubmitButton) {
    modalSubmitButton.textContent = "Saving...";
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
      if (modalSubmitButton) {
        modalSubmitButton.textContent = initialText;
      }
    });
});

// ---------- ADD CARD FORM ----------
document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardForm.reset();
  const addCardInputs = Array.from(addCardForm.querySelectorAll(".modal__input"));
  resetValidation(addCardForm, addCardInputs, validationConfig);
  toggleButtonState(
    addCardInputs,
    addCardForm.querySelector(".modal__submit-btn"),
    validationConfig,
  );
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const modalSubmitButton = evt.target.querySelector('button[type="submit"]');
  const initialText = modalSubmitButton ? modalSubmitButton.textContent : "Save";

  if (modalSubmitButton) {
    modalSubmitButton.textContent = "Saving...";
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
      toggleButtonState(inputs, button, validationConfig);

      closeModal(addCardModal);
    })
    .catch(console.error)
    .finally(() => {
      if (modalSubmitButton) {
        modalSubmitButton.textContent = initialText;
      }
    });
});

editAvatarForm.addEventListener("submit", handleAvatarSubmit);


deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (!selectedCard || !selectedCardId) return;

  const deleteSubmitBtn = deleteForm.querySelector('button[type="submit"]');
  const initialText = deleteSubmitBtn ? deleteSubmitBtn.textContent : "Delete";

  if (deleteSubmitBtn) {
    deleteSubmitBtn.textContent = "Deleting...";
    deleteSubmitBtn.disabled = true;
  }

  api
    .deleteCard({ id: selectedCardId })
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      if (deleteSubmitBtn) {
        deleteSubmitBtn.textContent = initialText;
        deleteSubmitBtn.disabled = false;
      }
    });
});

modalCancelButton.addEventListener("click", () => {
  selectedCard = null;
  selectedCardId = null;
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
enableValidation(validationConfig);
