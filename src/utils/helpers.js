export function setbuttonText(button, isLoading) {
  if (isLoading) {
    isLoading = "Saving...";
  } else {
    isLoading = "Save";
  }
  button.textContent = isLoading;
}
