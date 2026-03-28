document.addEventListener("mousemove", (e) => {
    const hero = document.querySelector(".hero");

    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;

    hero.style.transform = `translate(${x}px, ${y}px)`;
});
