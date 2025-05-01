
var form = document.querySelector('.edit-blog-form');
var blogBannerImg
const updateBtn = document.querySelector('.save-button')

const updateBlogPost = async (id) => {
    const yourPost = document.getElementById('editor').innerHTML
    const subject = document.getElementById('subject').value.trim()
    const author = document.getElementById('username').value.trim()


    var newPostObj

    if (blogBannerImg != null) {
        newPostObj = {
            username: author,
            PostContent: yourPost,
            subject: subject,
            banner: blogBannerImg
        }
    }
    else {
        newPostObj = {
            username: author,
            PostContent: yourPost,
            subject: subject,
        }
    }
    console.log(newPostObj)

    const response = await fetch(`/admin/editblogPost/${id}`, {
        method: "put",
        body: JSON.stringify(newPostObj),
        headers: { "Content-Type": "application/json" }, // Specify the content type
    });


    if (response.ok) {
        // window.location.href = '/admin/bloglist';
        console.log(response.json())
        alert("successfully Updated Blogpost")
    } else {
        alert('Failed to update the blog post. Please try again.');
    }

};

const imageUpdater = document.querySelector('#banner')

imageUpdater.addEventListener('change', async function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    console.log("I'm called")
    const formData = new FormData();


    if (imageUpdater.files.length === 0) {
        alert('Please select an image file to upload.');
        return;
    }
    for (const file of imageUpdater.files) {
        formData.append('productImages', file);
    }

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            alert('Image uploaded successfully!');
            // Use result.path to reference the uploaded image
            console.log(result.paths); // Add this to your img table or product modal

            // Example: You can update a hidden input field or add the path to a modal form
            const imagePath = result.paths[0];
            blogBannerImg = imagePath; //set global to add to db
            document.querySelector('.current-banner').src = imagePath; // show img

        } else {
            alert('Failed to upload image.');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
    }
});

// updateBtn.addEventListener('click', updateBlogPost)
