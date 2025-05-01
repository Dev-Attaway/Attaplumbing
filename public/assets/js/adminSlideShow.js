document.addEventListener('DOMContentLoaded', () => {
    let SlideImg = null; // Store the uploaded image path
    let isUploading = false; // Track if an upload is in progress

    // Toggle modal visibility
    window.toggleModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.toggle('hidden');
        } else {
            console.error(`Modal with ID '${modalId}' not found.`);
        }
    };

    // Handle image upload
    const uploadForm = document.querySelector('#uploadForm');
    const imageUpdater = document.querySelector('#SlideImage');
    const uploadBanner = document.querySelector('#uploadBanner');
    const saveButton = document.querySelector('.save-button');

    if (uploadForm) {
        uploadForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!imageUpdater.files || imageUpdater.files.length === 0) {
                alert('Please select an image file to upload.');
                return;
            }

            isUploading = true; // Set upload in progress
            saveButton.disabled = true; // Disable save button during upload

            const formData = new FormData();
            formData.append('productImages', imageUpdater.files[0]);

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();

                if (response.ok) {
                    SlideImg = result.paths[0]; // Update SlideImg variable
                    if (uploadBanner) {
                        uploadBanner.src = SlideImg;
                        uploadBanner.classList.remove('hidden');
                    }
                    isUploading = false; // Mark upload complete
                    saveButton.disabled = false; // Enable save button
                } else {
                    alert('Failed to upload image.');
                    isUploading = false;
                    saveButton.disabled = false;
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                isUploading = false;
                saveButton.disabled = false;
            }
        });
    }

    // Handle save button click
    if (saveButton) {
        saveButton.addEventListener('click', async () => {
            if (isUploading) {
                alert('Please wait until the image upload is complete.');
                return;
            }

            if (!SlideImg) {
                alert('No image uploaded. Please upload an image before saving.');
                return;
            }

            const altText = document.getElementById('alt').value.trim();
            const slideOrder = document.getElementById('numberInput').value.trim();
            const checkbox = document.getElementById('isActive');
            const isActiveSlide = checkbox.checked;

            const newSlide = {
                slideAlt: altText,
                slideorder: parseInt(slideOrder, 10),
                active: isActiveSlide,
                slideURL: SlideImg,
            };

            console.log("New Slide Payload:", newSlide); // Debugging

            try {
                const response = await fetch(`/admin/newSlide`, {
                    method: 'POST',
                    body: JSON.stringify(newSlide),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Slide Created:', result);
                    window.location.reload();
                } else {
                    const error = await response.json();
                    alert(error.message || 'Failed to create the slide. Please try again.');
                }
            } catch (error) {
                console.error('Error adding new slide:', error);
            }
        });
    }


});

async function updateSlide(id) {
    const altTextUpdate = document.getElementById('alt' + id).value.trim()
    const slideOrderUpdate = document.getElementById('numberInput' + id).value.trim()
    const checkboxUpdate = document.getElementById('isActive' + id);
    var isActiveSlide = false
    if (checkboxUpdate.checked) {
        isActiveSlide = true
    } else {
        isActiveSlide = false
    }

    var newSlide


    newSlide = {
        slideAlt: altTextUpdate,
        slideorder: slideOrderUpdate,
        active: isActiveSlide,
    }
    console.log(newSlide)

    const response = await fetch(`/admin/updateSlide/` + id, {
        method: "put",
        body: JSON.stringify(newSlide),
        headers: { "Content-Type": "application/json" }, // Specify the content type
    });


    if (response.ok) {
        window.location.reload()
        console.log(response.json())
    } else {
        alert('Failed to update the blog post. Please try again.');
    }
}

async function removeSlide(id) {
    const response = await fetch(`/admin/removeSlide/` + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }, // Specify the content type
    });
    if (response.ok){
        alert("Slide Deleted")
        window.location.reload();
    }
    else{
        alert("Could not Delete, please contact Support")
    }
}