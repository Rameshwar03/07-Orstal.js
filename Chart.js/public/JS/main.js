const avatar = document.querySelector(".avatar");
const dropdown = document.querySelector(".avatar-dropdown");

avatar.addEventListener("click", function () {
  dropdown.classList.toggle("hidden");
});

const bar = document.querySelector(".bar");
const asidebar = document.querySelector(".aside_bar");
bar.addEventListener("click", function () {
  asidebar.classList.toggle("hidden");
});
