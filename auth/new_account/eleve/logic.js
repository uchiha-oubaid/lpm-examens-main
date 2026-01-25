const connectBtn = document.getElementById("button");
const dataForm = document.getElementById("data-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const numberInput = document.getElementById("number");
const passwordInput = document.getElementById("password");
const passwordOInput = document.getElementById("passwordO");

dataForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const email = emailInput.value;
  const number = numberInput.value;
  const password = passwordInput.value;
  const passwordO = passwordOInput.value;

  function validPasswords() {
    if (password === passwordO && password != "" && passwordO != "") {
      return true;
    }
    return false;
  }

  function validNum(str) {
    const num = Number(str);
    if (!isNaN(num) && Number.isFinite(num)) {  // checking if the number is numeric
      return true;
    }
    return false;
  }

  function validEmail() {
    if (email.includes("@gmail.com")) {
      return true;
    }
    return false;
  }

  function valid() {
    if (validEmail() && validNum(String(number)) && validPasswords()) {
      return true;
    }
    return false;
  }

  // This is like a snippet for sending data from the client to the server
  if (valid()) {
    fetch('http://localhost:3000/new/eleve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, number, password, passwordO })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response from server", data);
        })
  }
});
