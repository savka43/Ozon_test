const blueCircle = document.querySelector(".blue-circle");
const input = document.querySelector(".progress-input");
const animateCheckbox = document.querySelector("#animate");
const hideCheckbox = document.querySelector("#hide");
const circlesContainer = document.querySelector(".progress-container-circle");
const progressVisual = document.querySelector(".progress-visual");
const valueError = document.querySelector("#value-error");

const radius = Number(blueCircle.getAttribute("r"));
const circumference = 2 * Math.PI * radius;
let currentValue = 0;

// Одна полная окружность; значение задаётся только смещением штриха.
blueCircle.setAttribute("stroke-dasharray", String(circumference));

function updateProgress(value) {
    if (!Number.isFinite(value) || value < 0 || value > 100) {
        return false;
    }

    currentValue = value;
    blueCircle.setAttribute("stroke-dashoffset", String(circumference * (1 - value / 100)));
    circlesContainer.setAttribute("aria-valuenow", String(value));
    return true;
}

function validateValue() {
    const valid = updateProgress(input.valueAsNumber);
    const message = valid ? "" : "Введите число от 0 до 100";
    input.setCustomValidity(message);
    input.setAttribute("aria-invalid", String(!valid));
    valueError.textContent = message;
}

input.addEventListener("input", validateValue);

// Пустой или неверный ввод не сбрасывает индикатор.
input.addEventListener("blur", () => {
    if (!input.validity.valid) {
        input.value = String(currentValue);
        validateValue();
    }
});

animateCheckbox.addEventListener("change", () => {
    circlesContainer.classList.toggle("is-animated", animateCheckbox.checked);
});

hideCheckbox.addEventListener("change", () => {
    progressVisual.classList.toggle("is-hidden", hideCheckbox.checked);
});

validateValue();
circlesContainer.classList.toggle("is-animated", animateCheckbox.checked);
progressVisual.classList.toggle("is-hidden", hideCheckbox.checked);
