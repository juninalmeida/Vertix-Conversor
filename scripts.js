const amount = document.getElementById("amount");

if (!amount) {
  console.warn('Campo "amount" não foi encontrado no DOM');
} else {
  amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
  });
}

const currencyButtons = document.querySelectorAll(".currency-option");
let selectedCurrencyCode = null;

if (currencyButtons.length === 0) {
  console.warn("Nenhuma opção de moeda encontrada no DOM");
} else {
  function getCurrencySymbol(code) {
    switch (code) {
      case "USD":
      case "CAD":
      case "AUD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "JPY":
      case "CNY":
        return "¥";
      case "CHF":
        return "CHF";
      default:
        return "$";
    }
  }
  currencyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currencyButtons.forEach((btn) => {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");

      const codeElement = button.querySelector(".code");
      selectedCurrencyCode = codeElement
        ? codeElement.textContent.trim()
        : null;

      if (selectedCurrencyCode) {
        const symbol = getCurrencySymbol(selectedCurrencyCode);

        if (pillElement) {
          pillElement.textContent = symbol;
        }

        if (suffixCodeElement) {
          suffixCodeElement.textContent = symbol;
        }

        if (suffixSymbolElement) {
          suffixSymbolElement.textContent = symbol;
        }
      }
    });
  });
}

const USD_RATE = 5.44;
const EUR_RATE = 6.34;
const GBP_RATE = 7.26;
const JPY_RATE = 0.035;
const AUD_RATE = 3.61;
const CAD_RATE = 3.94;
const CHF_RATE = 6.76;
const CNY_RATE = 0.77;

const resultAmountElement = document.querySelector(".result-amount");
const resultRateElement = document.querySelector(".result-rate");
const pillElement = document.querySelector(".pill");
const suffixCodeElement = document.querySelector(".suffix-code");
const suffixSymbolElement = document.querySelector(".symbol");

function convertCurrency(amountValue, price, symbol) {
  const numericAmount = Number(amountValue);

  if (isNaN(numericAmount) || numericAmount <= 0) {
    console.warn("Valor inválido para conversão:", amount);
    return;
  }

  if (!selectedCurrencyCode) {
    console.warn("Nenhuma moeda selecionada para conversão");
    return;
  }

  const convertedValue = numericAmount * price;

  const formattedBRL = convertedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  if (resultAmountElement) {
    resultAmountElement.textContent = formattedBRL;
  }

  if (resultRateElement) {
    const formattedRate = price.toFixed(2).replace(".", ",");
    resultRateElement.textContent = `Taxa: 1 ${selectedCurrencyCode} (${symbol}) = R$ ${formattedRate}`;
  }
}

const conversionForm = document.querySelector(".conversion-form");

if (!conversionForm) {
  console.warn('Form ".conversion-form" não encontrado no DOM');
} else {
  conversionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!selectedCurrencyCode) {
      console.warn("Nenhuma moeda de origem selecionada");
      return;
    }

    const currentAmountValue = amount.value.trim();

    if (!currentAmountValue) {
      console.warn("Nenhum valor informado para conversão");
      return;
    }

    switch (selectedCurrencyCode) {
      case "USD":
        convertCurrency(currentAmountValue, USD_RATE, "US$");
        break;

      case "EUR":
        convertCurrency(currentAmountValue, EUR_RATE, "€");
        break;

      case "GBP":
        convertCurrency(currentAmountValue, GBP_RATE, "£");
        break;

      case "JPY":
        convertCurrency(currentAmountValue, JPY_RATE, "¥");
        break;

      case "AUD":
        convertCurrency(currentAmountValue, AUD_RATE, "AU$");
        break;

      case "CAD":
        convertCurrency(currentAmountValue, CAD_RATE, "CA$");
        break;

      case "CHF":
        convertCurrency(currentAmountValue, CHF_RATE, "CHF");
        break;

      case "CNY":
        convertCurrency(currentAmountValue, CNY_RATE, "CH¥");
        break;

      default:
        console.warn("Moeda não suportada:", selectedCurrencyCode);
    }
  });
}
