document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const bill = document.getElementById("bill");
  const optionsContainer = document.querySelector(".options-container");
  const customOption = document.getElementById("customOption");
  const billError = document.querySelector("label[for='bill'] + span.error");
  const numberOfPeople = document.getElementById("people");
  const numberError = document.querySelector(
    "label[for='people'] + span.error"
  );
  const tipPerPerson = document.getElementById("tip-per-person");
  const totalPerPerson = document.getElementById("total-per-person");
  let amount = 0;
  let percentage = 0;
  let clients = 0;
  let selectedOption;
  const resetButton = document.getElementById("reset-btn");

  function validateBill() {
    const billValue = bill.value;

    if (parseFloat(billValue) === 0) {
      showBillError("Can't be zero");
      return;
    }

    billError.textContent = "";
    billError.className = "error";
    amount = parseFloat(billValue).toFixed(2);
    checkRequirements();
    return;
  }
  function validateNumberOfPeople() {
    const number = numberOfPeople.value;

    if (parseInt(number) === 0) {
      showNumberError("Can't be zero");
      return;
    }

    numberError.textContent = "";
    numberError.className = "error";
    clients = parseInt(numberOfPeople.value);
    checkRequirements();
    return;
  }

  function showBillError(message) {
    billError.textContent = message;
    billError.className = "error active";
  }

  function showNumberError(message) {
    tipPerPerson.innerText = `0.00`;
    totalPerPerson.innerText = `0.00`;
    numberError.textContent = message;
    numberError.className = "error active";
  }

  function checkRequirements() {
    if (amount !== 0 && selectedOption && clients !== 0) {
      calculateTipAndTotal();
    }
  }

  function calculateTipAndTotal() {
    let tip = ((amount * percentage) / 100).toFixed(2);
    let total = (tip * clients).toFixed(2);
    if (isNaN(tip) || isNaN(total)) {
      tip = (0).toFixed(2);
      total = (0).toFixed(2);
    }
    tipPerPerson.innerText = `${tip}`;
    totalPerPerson.innerText = `${total}`;
  }

  bill.addEventListener("input", () => {
    const value = bill.value;

    const decimalCheck = /^\d*\.?\d{0,2}$/;
    if (!decimalCheck.test(value)) {
      bill.value = value.slice(0, value.indexOf(".") + 3);
    }

    validateBill();
  });

  //Reject integers as values
  bill.addEventListener("keydown", (event) => {
    if (event.key === "+" || event.key === "-" || event.key === "e") {
      event.preventDefault();
    }
  });

  optionsContainer.addEventListener("change", () => {
    selectedOption = document.querySelector('input[name="percentage"]:checked');

    if (selectedOption.value === "custom") {
      return;
    } else {
      customOption.value = "";
      percentage = parseInt(selectedOption.value);
      checkRequirements();
    }
  });

  customOption.addEventListener("click", () => {
    document.getElementById("custom").checked = true;
  });
  customOption.addEventListener("input", () => {
    customOption.value = customOption.value.replace(/\./g, "");
    percentage = parseInt(customOption.value);
    checkRequirements();
  });

  customOption.addEventListener("keydown", (event) => {
    if (
      event.key === "+" ||
      event.key === "-" ||
      event.key === "." ||
      event.key === "e"
    ) {
      event.preventDefault();
    }
  });

  //Reject decimal places or negative values;
  numberOfPeople.addEventListener("keydown", (event) => {
    if (event.key === "." || event.key === "-" || event.key === "e") {
      event.preventDefault();
    }
  });

  numberOfPeople.addEventListener("input", () => {
    numberOfPeople.value = numberOfPeople.value.replace(/\./g, "");
    validateNumberOfPeople();
  });

  form.addEventListener("submit", (event) => {
    if (!validateBill()) {
      event.preventDefault();
    }
  });

  resetButton.addEventListener("click", () => {
    form.reset();
  });
});
