const app = document.querySelector(".progress-container");
const progress = new ProgressCircle(
  app.querySelector(".progress-container-circle"),
);
const input = app.querySelector(".progress-input");
const animateCheckbox = app.querySelector("#animate");
const hideCheckbox = app.querySelector("#hide");
const valueError = app.querySelector("#value-error");

function validateValue() {
  const valid =
    input.value.trim() !== "" && progress.setValue(input.valueAsNumber);
  const message = valid ? "" : "Введите число от 0 до 100";
  input.setCustomValidity(message);
  input.setAttribute("aria-invalid", String(!valid));
  valueError.textContent = message;
}

input.addEventListener("input", validateValue);
input.addEventListener("blur", () => {
  if (!input.validity.valid) {
    input.value = String(progress.value);
    validateValue();
  }
});

animateCheckbox.addEventListener("change", () => {
  progress.setAnimated(animateCheckbox.checked);
});
hideCheckbox.addEventListener("change", () => {
  progress.setHidden(hideCheckbox.checked);
});

validateValue();
progress.setHidden(hideCheckbox.checked);
progress.setAnimated(animateCheckbox.checked);
