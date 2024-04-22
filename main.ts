const contrast = document.getElementById("contrast") as HTMLInputElement;
const brightness = document.getElementById("brightness") as HTMLInputElement;
const sepia = document.getElementById("sepia") as HTMLInputElement;
const grayscale = document.getElementById("grayscale") as HTMLInputElement;
const blurInput = document.getElementById("blur") as HTMLInputElement;

const upload = document.getElementById("upload") as HTMLInputElement;
const save = document.getElementById("save") as HTMLAnchorElement;
const img = document.getElementById("img") as HTMLImageElement;

const undo = document.querySelector("span") as HTMLSpanElement;
const imgBox = document.querySelector(".img-box") as HTMLDivElement;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

//reset filter values and elements
const resetValue = () => {
  img.style.filter = "none";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blurInput.value = "0";
};

//hide the image box and buttons when loading the page
window.onload = () => {
  save.style.display = "none";
  imgBox.style.display = "none";
  undo.style.display = "none";
};

//show the image box and buttons when choosing the image
upload.onchange = () => {
  resetValue();
  save.style.display = "block";
  imgBox.style.display = "block";
  undo.style.display = "block";
  //use fileReader class to read the uploaded omage
  const file = new FileReader();
  file.readAsDataURL(upload.files![0]); //first file in the array (selected image)
  file.onload = () => {
    img.src = file.result as string;
  };
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context?.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

//apply filters to the image
//attach event listeners to filter input elements
const filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    if (context) {
      context.filter = `contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blurInput.value}px)`;
      context?.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  });
});

save.onclick = () => {
  save.href = canvas.toDataURL();
};
