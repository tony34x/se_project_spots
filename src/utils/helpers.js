export function setbuttonText(button, isLoading) {
  if (isLoading) {
    isLoading = "Saving...";
    console.log("setting text to (loadingText): ");
  } else {
    isLoading = "Save";
  }
  button.textContent = isLoading;
}
