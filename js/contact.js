// init
emailjs.init("aeKOi-vXZ4P_2xrS7");

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  status.innerText = "Sending...";
  status.style.color = "cyan";

  const params = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  emailjs.send("service_v0ifw89", "template_29dc1qh", params)
    .then((res) => {
      console.log("SUCCESS", res);
      status.innerText = "Message sent successfully Thanks for reaching out! ✅";
      status.style.color = "lightgreen";
      form.reset();
    })
    .catch((err) => {
      console.error("ERROR:", err);
      status.innerText = "Failed to send ❌";
      status.style.color = "red";
    });
});