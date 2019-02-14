const form = document.querySelector("form");
const photoContainer = document.querySelector(".photos");
const photoCount = 25;

function processPhotos(json) {
  const n = JSON.parse(json);
  console.log(n);

  const photos = n.photos.photo;

  for (let i = 0; i < photoCount; i++) {
    const img = document.createElement("img");
    img.src = getUrl(photos[i]);
    img.classList = "images";

    photoContainer.appendChild(img);

    photoContainer.classList.add("show");
    photoContainer.classList.remove("hide");
  }
}

function getUrl(photoInfo) {
  const { farm, id, secret, server } = photoInfo;

  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_n.jpg`;
}

function displayPhotos(e) {
  e.preventDefault();
  if (photoContainer.childNodes.length > 0) {
    photoContainer.innerHTML = "";
  }

  const formInput = document.getElementById("input-field").value;

  console.log(photoContainer.childNodes.length);

  /*flickr.photos.search */
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09240f4fec75e709105ae588adf7e8fa&tags=${formInput}&format=json&nojsoncallback=1`,
    true
  );

  request.onload = () => processPhotos(request.responseText);
  request.send();
}

form.addEventListener("submit", e => displayPhotos(e));
