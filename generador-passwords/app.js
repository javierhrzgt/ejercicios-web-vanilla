console.clear();

const slider = document.querySelector(".length-control");
const sliderValue = document.querySelector(".length-title");
const passwordOutput = document.querySelector(".password-output");

slider.querySelector("input").addEventListener("input", (e) => {
  sliderValue.setAttribute("data-length", e.target.value);
  applyFill(e.target);
});

applyFill(slider.querySelector("input"));

function applyFill(slider) {
  const style = getComputedStyle(document.documentElement);
  const fill = style.getPropertyValue("--accent-default").trim();
  const background = style.getPropertyValue("--border-strong").trim();

  const percentage =
    (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const bg = `linear-gradient(90deg, ${fill} ${percentage}%, ${background} ${percentage + 0.1}%)`;
  slider.style.background = bg;
  sliderValue.setAttribute("data-length", slider.value);
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function secureMathRandom() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / Math.pow(2, 32);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(secureMathRandom() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(secureMathRandom() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '~!@#$%^&*()_+{}":?><;.,';
  return symbols[Math.floor(secureMathRandom() * symbols.length)];
}

const strengthLabel = document.getElementById("strength-label");
const resultEl = document.getElementById("generated-password");
const lengthEl = document.getElementById("password-length");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbols");

const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");

copyBtn.addEventListener("click", async () => {
  const password = resultEl.value;

  if (!password) return;

  try {
    await navigator.clipboard.writeText(password);
    copyBtn.querySelector("i").className = "fas fa-check";
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.querySelector("i").className = "far fa-copy";
      copyBtn.classList.remove("copied");
    }, 700);
  } catch (err) {
    console.error("Error al copiar:", err);
  }
});

generateBtn.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  passwordOutput.classList.add("has-password");

  resultEl.value = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
  );

  const typesCount = hasLower + hasUpper + hasNumber + hasSymbol;
  updateStrength(typesCount, length);
});

function generatePassword(length, lower, upper, number, symbol) {
  let passwordResult = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0],
  );
  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i++) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      passwordResult += randomFunc[funcName]();
    });
  }

  return passwordResult.slice(0, length);
}

function disableOnlyCheckbox() {
  let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(
    (el) => el.checked,
  );
  totalChecked.forEach((el) => {
    if (totalChecked.length === 1) {
      el.disabled = true;
    } else {
      el.disabled = false;
    }
  });
}
disableOnlyCheckbox();

[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach((el) => {
  el.addEventListener("click", () => {
    disableOnlyCheckbox();
  });
});

function updateStrength(typesCount, length) {
  let label = "";
  let className = "";

  if (typesCount === 1 || length < 10) {
    label = "Débil";
    className = "debil";
  } else if (typesCount === 2) {
    label = "Media";
    className = "media";
  } else {
    label = "Fuerte";
    className = "fuerte";
  }

  strengthLabel.textContent = label;
  strengthLabel.className = className;
}
