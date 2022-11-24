// DOM constans
const btnCamera = document.getElementById("btnCamera");
const btnTakePhoto = document.getElementById("btnTakePhoto");
const doomVideo = document.getElementById("doomVideo");

// element
const camera = new Camera(doomVideo);
const orderId = sessionStorage.getItem("orderId");

btnCamera.addEventListener("click", function () {
  camera.start();
});
btnTakePhoto.addEventListener("click", function () {
  let picture = camera.takePhoto();
  camera.stop();
  saveImage(picture);
});

const saveImage = async (image) => {
  sessionStorage.setItem("image", image);
  if (sessionStorage.getItem("photoType") === "visit") {
    location.href = `/views/orders/register_visit.html?id=${orderId}`;
  } else {
    location.href = `/views/orders/register_order.html?id=${orderId}`;
  }
};
