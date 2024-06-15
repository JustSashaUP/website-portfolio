function loader() {
  document.querySelector(".container-loader").classList.add("active");
}

function fadeOut() {
  setTimeout(loader, 1000);
}

fadeOut();
