document.addEventListener("DOMContentLoaded", function () {

    // Load Navbar
    fetch("components/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;

            // 🔥 Wait a little to ensure DOM updated
            setTimeout(() => {
                const hamburger = document.querySelector(".hamburger");
                const navLinks = document.querySelector(".nav-links");

                if (hamburger && navLinks) {
                    hamburger.addEventListener("click", () => {
                        navLinks.classList.toggle("active");
                    });
                }
            }, 100); // small delay = stable
        });

    // Load Footer
    fetch("components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

});