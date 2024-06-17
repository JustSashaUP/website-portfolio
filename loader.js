function loadPage() {
  var loader = document.getElementById("container-loader");

  window.addEventListener("load", function () {
    loader.style.display = "none";
  });
}
loadPage();
