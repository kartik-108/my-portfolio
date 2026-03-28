const heroImage = document.querySelector(".hero-right img");

document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform = `translate(${x}px, ${y}px)`;
});
const particlesContainer = document.querySelector(".particles");

for (let i = 0; i < 35; i++) {
    const particle = document.createElement("span");

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = 15 + Math.random() * 10 + "s";
    particle.style.opacity = Math.random();

    particlesContainer.appendChild(particle);
}
window.addEventListener("load", () => {

    const heroRight = document.querySelector(".hero-right");

    // Wait until image reveal animation completes
    setTimeout(() => {
        heroRight.classList.add("radar-active");
    }, 1800); // adjust if needed

});
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
