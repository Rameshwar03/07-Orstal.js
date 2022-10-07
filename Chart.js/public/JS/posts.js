const post = document.querySelector(".form--posts");
const postbtn = document.querySelector(".postsbtn");
const postform = document.querySelector(".postsFormUser");

postbtn.addEventListener("click", function () {
  postform.classList.toggle("hidden");
});

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

const posts = async (result) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/post",
      data: {
        id: Math.floor(Math.random() * 100000),
        title: result[0],
        subdesc: result[1],
        photo: result[2],
        description: result[3],
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Post Updated successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", err.response.data.message);
  }
};

post.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const subdesc = document.getElementById("subdesc").value;
  const photu = document.getElementById("formFile").value;
  const description = document.getElementById("description").value;
  let result = [title, subdesc, photu, description];
  posts(result);
});
