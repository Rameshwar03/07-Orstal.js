const customerform = document.querySelector(".form--customer");
let custcid = 1;
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

const cust = async (result) => {
    try {
        const res = await axios({
            method: "POST",
            url: "/customer",
            data: {
                // INSERT INTO Customer(custid, companyname, contactname, contacttitle, address, city, region, postalcode, country, phone, fax)
                "custid": Math.floor(Math.random() * 100000),
                "companyname": result[0],
                "contactname": result[1],
                "contacttitle": result[2],
                "address": result[3],
                "city": result[4],
                "region": result[5],
                "postalcode": result[6],
                "country": result[7],
                "phone": result[8],
                "fax": result[9]
            },
        });
        if (res.data.status === "success") {
            showAlert("success", "Logged in successfully!");
            window.setTimeout(() => {
                location.assign("/");
            }, 1500);
        }

    } catch (error) {
        console.log(err);
        showAlert("error", err.response.data.message);
    }
};

customerform.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Customer data insert");
    const companyname = document.getElementById("companyname").values;

    const contactname = document.getElementById("contactname ").values;

    const contacttitle = document.getElementById("contacttitle").values;

    const address = document.getElementById("address").values;

    const city = document.getElementById("city").values;

    const region = document.getElementById("region").values;

    const postalcode = document.getElementById("postalcode").values;

    const country = document.getElementById("country").values;

    const phone = document.getElementById(" phone").values;

    const fax = document.getElementById(" fax").values;

    let result = [companyname, contactname, contacttitle, address, city, region, postalcode, country, phone, fax];
    cust(result);


});