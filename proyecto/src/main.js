const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resetNext = false;

buttons.forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.textContent));
});

function handleInput(value) {
  if (value === "C") {
    currentInput = "";
    display.textContent = "0";
    return;
  }

  if (value === "=") {
    try {
      currentInput = currentInput
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");
      let result = eval(currentInput);
      display.textContent = result;
      currentInput = result.toString();
      resetNext = true;
    } catch {
      display.textContent = "Error";
      currentInput = "";
    }
    return;
  }

  if (resetNext && /[0-9.]/.test(value)) {
    currentInput = "";
    resetNext = false;
  }

  currentInput += value;
  display.textContent = currentInput;
}

// Soporte para teclado
document.addEventListener("keydown", e => {
  const key = e.key;

  if ("0123456789.+-*/".includes(key)) {
    handleInput(key.replace("*", "×").replace("/", "÷"));
  } else if (key === "Enter") {
    handleInput("=");
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || "0";
  } else if (key.toLowerCase() === "c") {
    handleInput("C");
  }
});
