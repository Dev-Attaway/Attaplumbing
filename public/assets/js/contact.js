const sub = document.querySelector("#Sub");

function validateFourm() {
  const name1 = document.querySelector("#name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const message = document.querySelector("#message");
  let errors = 0;

  if (name1.value == null || name1.value == "") {
    errors++;
    name1.placeholder = "Name Must Be Filled";
    name1.classList.add("warning");
  } else {
    name1.classList.remove("warning");
  }

  if (email.value == null || !validateEmail(email.value)) {
    errors++;
    email.placeholder = "Email Must Be Filled";
    email.classList.add("warning");
  } else {
    email.classList.remove("warning");
  }

  if (phone.value == null || !validatePhone(phone.value)) {
    errors++;
    phone.value = "";
    phone.placeholder = "Phone Must Valid";
    phone.classList.add("warning");
  } else {
    phone.classList.remove("warning");
  }

  if (message.value == null || message.value == "") {
    errors++;
    message.placeholder = "Message Must Be Filled";
    message.classList.add("warning");
  } else {
    message.classList.remove("warning");
  }

  return errors;
}

// Simple email validation
function validateEmail(email) {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(email);
}

// Simple phone validation (example: just check for digits)
function validatePhone(phone) {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
}
const newMessage = async (e) => {
  e.preventDefault();
  let theErrors = validateFourm();
  console.log(theErrors);

  if (theErrors === 0) {
    const name1 = document.querySelector("#name");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const message = document.querySelector("#message");

    let newMessage = {
      formName: "Contact Us",
      formData: {
        name: name1.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
      },
    };

    const response = await fetch("/contact/submit", {
      method: "POST",
      body: JSON.stringify(newMessage),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      displayThankYou();
    } else {
      alert(response.statusText);
    }
  }
};

function displayThankYou() {
  document.getElementById('contactForm').innerHTML = '<h3>Thank you for reaching out, a support agent will be in touch shortly!</h3>'
}

sub.addEventListener("click", newMessage);
