document.addEventListener("DOMContentLoaded", function () {

    const texts = [
        "AI Developer",
        "Web Creator",
        "Project Leader",
        "Storyteller",
        "Problem Solver"
    ];

    const typingElement = document.querySelector(".typing-text");

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = texts[textIndex];

        if (!isDeleting) {
            typingElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                setTimeout(() => isDeleting = true, 1200);
            }
        } else {
            typingElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        const speed = isDeleting ? 35 : 70;
        setTimeout(type, speed);
    }

    type();
});
window.addEventListener("load", () => {

    const heroRight = document.querySelector(".hero-right");

    // radar starts AFTER image reveal
    setTimeout(() => {
        heroRight.classList.add("radar-active");
    }, 1500);

});
const el = document.querySelector(".typing-text");

if (el) {
  el.textContent = "your text";
}