const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const inputField = document.getElementById("input");

console.log(Number(inputField.value));

let value = Number(inputField.value);

if (value <= 0) {
  minusButton.disabled = true;
  console.log(value);
} else {
  minusButton.disabled = false;
  minusButton.addEventListener("click", (event) => {
    event.preventDefault();
    const currentValue = Number(inputField.value) || 0;
    inputField.value = currentValue - 1;
  });
}

plusButton.addEventListener("click", (event) => {
  event.preventDefault();
  const currentValue = Number(inputField.value) || 0;
  inputField.value = currentValue + 1;
});
