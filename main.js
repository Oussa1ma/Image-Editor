var contrast = document.getElementById("contrast");
var brightness = document.getElementById("brightness");
var sepia = document.getElementById("sepia");
var grayscale = document.getElementById("grayscale");
var blurInput = document.getElementById("blur");
var upload = document.getElementById("upload");
var save = document.getElementById("save");
var img = document.getElementById("img");
var undo = document.querySelector("span");
var imgBox = document.querySelector(".img-box");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
//reset filter values and elements
var resetValue = function () {
    img.style.filter = "none";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blurInput.value = "0";
};
//hide the image box and buttons when loading the page
window.onload = function () {
    save.style.display = "none";
    imgBox.style.display = "none";
    undo.style.display = "none";
};
//show the image box and buttons when choosing the image
upload.onchange = function () {
    resetValue();
    save.style.display = "block";
    imgBox.style.display = "block";
    undo.style.display = "block";
    //use fileReader class to read the uploaded omage
    var file = new FileReader();
    file.readAsDataURL(upload.files[0]); //first file in the array (selected image)
    file.onload = function () {
        img.src = file.result;
    };
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context === null || context === void 0 ? void 0 : context.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = "none";
    };
};
//apply filters to the image
//attach event listeners to filter input elements
var filters = document.querySelectorAll("ul li input");
filters.forEach(function (filter) {
    filter.addEventListener("input", function () {
        if (context) {
            context.filter = "contrast(".concat(contrast.value, "%)\n    brightness(").concat(brightness.value, "%)\n    sepia(").concat(sepia.value, "%)\n    grayscale(").concat(grayscale.value, ")\n    blur(").concat(blurInput.value, "px)");
            context === null || context === void 0 ? void 0 : context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    });
});
save.onclick = function () {
    save.href = canvas.toDataURL();
};
