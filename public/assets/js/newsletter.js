const newsForm = document.getElementById('newsletterForm');
const newsMessage = document.getElementById('newsletterMessage');

newsForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;

  let newMessage = {
    formName: "NewsLetter",
    formData: {

      email: email,

    },
  };


  try {
    const response = await fetch('/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    const data = await response.json();

    if (response.ok) {
        displayThankYou()
    } else {
      newsMessage.textContent = data.message || 'Subscription failed.';
      newsMessage.className = 'text-red-500';
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    newsMessage.textContent = 'An unexpected error occurred.';
    newsMessage.className = 'text-red-500';
  }
});

function displayThankYou() {
    document.getElementById('newsletterForm').innerHTML = '<h3>Thank you! You have been added to our NewsLetter, You will recieve an email once we go live!</h3>'
  }