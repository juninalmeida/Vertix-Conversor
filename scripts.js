const amount = document.getElementById("amount");

if (!amount) {
  console.warn('Campo "amount" não foi encontrado no DOM');
} else {
  amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
  });
}