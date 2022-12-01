const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []

// Unsplash API
const count = 30;
const apiKey = '<insert your unsplash api key here>';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
  

// Create Elements for Links and Photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //For each photo, whithin photosArray
    photosArray.forEach((photo) => {
        // Create the a href element and set its attributes
        const item = document.createElement('a');                        
        setAttributes(item,{
            href: photo.links.html,
            target:'_blank'
        });
        // Create the img element and set its attributes
        const img = document.createElement('img');
        //Directly (w/o helper function)
        /*img.setAttribute('src',photo.urls.regular);
        if (photo.alt_description != null) {
            img.setAttribute('title',photo.alt_description);
            img.setAttribute('alt',photo.alt_description);
        }*/
        //With Helper function
        setAttributes(img,{
            src: photo.urls.regular,
            title: photo.alt_description,
            alt: photo.alt_description
        });

        // Event listener, check when each is finished loading
        img.addEventListener('load',imageLoaded);

        // Append both new elements to imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } 
    catch(error){
        //Catch error here
    }
}

//Check when user is scrolling towards the end of the page
window.addEventListener('scroll', ()=>{
    if (window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    } 
});

//On Load
getPhotos();
