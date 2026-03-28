document.addEventListener("DOMContentLoaded", () => {

    // ================= SLIDER =================
    document.querySelectorAll(".slider").forEach(slider => {

        let slides = slider.querySelectorAll(".slide");
        let index = 0;
        let auto;

        function showSlide(i) {
            slides.forEach(s => s.classList.remove("active"));
            slides[i].classList.add("active");
        }

        showSlide(index);

        function next() {
            index = (index + 1) % slides.length;
            showSlide(index);
        }

        function prev() {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
        }

        const nextBtn = slider.querySelector(".next");
        const prevBtn = slider.querySelector(".prev");

        if (nextBtn) nextBtn.addEventListener("click", next);
        if (prevBtn) prevBtn.addEventListener("click", prev);

        function startAuto() {
            stopAuto();
            auto = setInterval(next, 3500);
        }

        function stopAuto() {
            if (auto) clearInterval(auto);
        }

        slider.addEventListener("mouseenter", stopAuto);
        slider.addEventListener("mouseleave", startAuto);

        startAuto();
    });


    // ================= VIEWER =================
    let currentItems = [];
    let currentIndex = 0;

    const viewer = document.getElementById("viewer");

    window.openViewer = function(element) {

        const slider = element.closest(".slider");

        // 🔥 CASE 1: SLIDER ITEMS
        if (slider) {
            const items = slider.querySelectorAll(".slide img, .slide video");
            currentItems = Array.from(items);
            currentIndex = currentItems.indexOf(element);
        }

        // 🔥 CASE 2: SINGLE ITEM
        else {
            currentItems = [element];
            currentIndex = 0;
        }

        renderViewer();
        viewer.style.display = "flex";
        document.body.style.overflow = "hidden";
    };


    function renderViewer() {
        const item = currentItems[currentIndex];

        let mediaHTML = "";

        // IMAGE
        if (item.tagName === "IMG") {
            mediaHTML = `<img src="${item.src}" class="viewer-media">`;
        }

        // VIDEO
        else if (item.tagName === "VIDEO") {
            mediaHTML = `
                <video class="viewer-media" controls autoplay>
                    <source src="${item.src}" type="video/mp4">
                </video>
            `;
        }

        // ARROWS (only if multiple)
        let arrowsHTML = "";
        if (currentItems.length > 1) {
            arrowsHTML = `
                <button class="viewer-prev">❮</button>
                <button class="viewer-next">❯</button>
            `;
        }

        // 🔥 FINAL VIEWER STRUCTURE (WITH CLOSE BUTTON)
        viewer.innerHTML = `
            <div class="viewer-content">
                <button class="viewer-close">✕</button>
                ${mediaHTML}
                ${arrowsHTML}
            </div>
        `;

        // ================= BUTTON EVENTS =================
        const nextBtn = viewer.querySelector(".viewer-next");
        const prevBtn = viewer.querySelector(".viewer-prev");
        const closeBtn = viewer.querySelector(".viewer-close");

        if (nextBtn) {
            nextBtn.onclick = () => {
                currentIndex = (currentIndex + 1) % currentItems.length;
                renderViewer();
            };
        }

        if (prevBtn) {
            prevBtn.onclick = () => {
                currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
                renderViewer();
            };
        }

        if (closeBtn) {
            closeBtn.onclick = closeViewer;
        }
    }


    // ================= CLOSE VIEWER =================
    window.closeViewer = function() {
        viewer.style.display = "none";
        viewer.innerHTML = "";
        document.body.style.overflow = "auto";
    };

    // click outside close
    viewer.addEventListener("click", (e) => {
        if (e.target.id === "viewer") closeViewer();
    });

    // ESC close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeViewer();
    });

});