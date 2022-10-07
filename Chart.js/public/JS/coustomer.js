const customerform = document.querySelector(".form--customer");
let id = 1;
const hideAlert = () => {
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg, time = 7) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, time * 1000);
};

const cust = async () => {
    try {
        const res = await axios({
            method: "POST",
            url: " /customer",
            data: {

            }
        })
    } catch (error) {

    }
}