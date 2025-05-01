document.body.classList.add("home-body");
let slideIndex = -1;
let timeout;

function changeSlide(int) {
  slideIndex += int;
  manualChangeSlide();
}

function manualChangeSlide() {
  const slides = document.getElementsByClassName("slide");

  if (slideIndex >= slides.length) {
    slideIndex = 0; // Reset to first slide
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1; // Reset to last slide
  }

  console.log(slideIndex);
  clearTimeout(timeout);

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Hide all slides
  }

  slides[slideIndex].style.display = "block"; // Show the next slide

  setTimeout(() => {
    slides[slideIndex].style.opacity = 1; // Fade in
  }, 50); // Small delay to allow display to register

  timeout = setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

function showSlides() {
  const slides = document.getElementsByClassName("slide");

  // Hide the current slide with fade out
  if (slides[slideIndex]) {
    slides[slideIndex].style.opacity = 0; // Start fading out
  }

  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0; // Reset to first slide
  }

  // Wait for the fade out to complete before changing the slide
  setTimeout(() => {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; // Hide all slides
    }
    slides[slideIndex].style.display = "block"; // Show the next slide

    setTimeout(() => {
      slides[slideIndex].style.opacity = 1; // Fade in
    }, 50); // Small delay to allow display to register
  }, 10); // Wait for fade out before showing the next slide

  // Set timeout for the next transition
  timeout = setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

showSlides();
