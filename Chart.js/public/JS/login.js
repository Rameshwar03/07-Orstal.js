/* eslint-disable */
const loginForm = document.querySelector(".form--login");

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

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/login",
      data: {
        email: email,
        password: password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

// const logout = async () => {
//   try {
//     const res = await axios({
//       method: "GET",
//       url: "/users/logout",
//     });
//     if ((res.data.status = "success")) location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//     showAlert("error", "Error logging out! Try again.");
//   }
// };

loginForm.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
