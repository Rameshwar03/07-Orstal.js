const signupForm = document.querySelector(".form--signup");
let id = 1;
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

const signup = async (result) => {

  try {
    const res = await axios({
      method: "POST",
      url: "/signup",
      data: {
        "id": Math.floor(Math.random() * 100000),
        "firstName": result[0],
        "lastName": result[1],
        "email": result[2],
        "password": result[3],
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", err.response.data.message);
  }
};

signupForm.addEventListener("click", (e) => {
  e.preventDefault();
  console.log('signup pressed')
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  let result = [firstName, lastName, email, password];
  signup(result);
});
