/* eslint-disable */
const logoutForm = document.querySelector(".form--logout");
console.log("logout pressed");
// ALERT
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};

const logout = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: "/logout",
    });
    console.log(res);
    if ((res.data.status = "success"))
      location.assign("http://localhost:3200/");
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }

  // try {
  //   const res = await axios({
  //     method: "POST",
  //     url: "/logout",
  //     header,
  //   });
  //   if ((res.data.status = "success")) location.reload(true);
  // } catch (err) {
  //   showAlert("error", "Error logging out! Try again.");
  // }
};

logoutForm.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
