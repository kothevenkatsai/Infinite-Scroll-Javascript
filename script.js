const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready=false;
let imagesloaded=0;
let totalImages=0;
let photosArray=[];

// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
// GET /photos/random


// check if all images are loaded
function imageLoaded(){

    console.log('image loaded');
    imagesloaded++;
    console.log(imagesloaded);
    if(imagesloaded===totalImages){
        ready=true;
        console.log('ready =',ready);
    }
}

// helper function to set attribute on dom elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}



// create elements for links and photos add to dom
function displayPhotos(){
    imagesloaded=0;
    totalImages=photosArray.length;
    console.log('total images =',totalImages);
    // run function for each object in photosArray
    photosArray.forEach((photo)=>{
        // ccreate <a> to link to unsplash
        const item=document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');

        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // create image for photo
        const img=document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description)
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });


        // event listener ,check when each is finished loading
        img.addEventListener('load',imageLoaded);


        // put img inside a and put both inside image container 
        item.appendChild(img);
        imageContainer.appendChild(item);
         
    });
}


const count=30;
const apiKey='MmXcnlQKMks-BYgWzLyAcjEzt5rXUYz4T7-zLvxjiHs';
// unsplash api
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// get photos from unsplash api
async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();  
      
    } catch(error){
        // catch error here
    }
}


// check to see if scrollng near bottom of page ,load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
        
    }
});


// on load
getPhotos();