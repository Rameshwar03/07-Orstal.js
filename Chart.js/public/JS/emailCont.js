function sendMail() {
    var params = {
        name: document.getElementById("emailName").value,
        email: document.getElementById("emailtext").value,
        message: document.getElementById("emailMessage").value,
    };

    const serviceID = "service_hdj03vj";
    const templateID = "template_tsa6tnp";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("emailName").value = "";
            document.getElementById("emailtext").value = "";
            document.getElementById("emailMessage").value = "";
            console.log(res);
            alert("Your message sent successfully!!")

        })
        .catch(err => console.log(err));

}