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

    // 🔥 IMPORTANT: default hidden
    if (viewer) {
        viewer.style.display = "none";
    }

    window.openViewer = function(element) {

        const slider = element.closest(".slider");

        if (slider) {
            const items = slider.querySelectorAll(".slide img, .slide video");
            currentItems = Array.from(items);
            currentIndex = currentItems.indexOf(element);
        } else {
            currentItems = [element];
            currentIndex = 0;
        }

        renderViewer();
        viewer.style.display = "flex";
        document.body.style.overflow = "hidden";
    };


    function renderViewer() {
        const item = currentItems[currentIndex];

        let media = "";

        if (item.tagName === "IMG") {
            media = `<img src="${item.src}" class="viewer-media">`;
        } else if (item.tagName === "VIDEO") {
            media = `
                <video class="viewer-media" controls autoplay>
                    <source src="${item.src}" type="video/mp4">
                </video>
            `;
        }

        viewer.innerHTML = `
            <div class="viewer-content">
                <button class="viewer-close">✕</button>
                ${media}
                ${currentItems.length > 1 ? `
                    <button class="viewer-prev">❮</button>
                    <button class="viewer-next">❯</button>
                ` : ""}
            </div>
        `;

        // 🔥 EVENTS (after render)
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


    window.closeViewer = function() {
        viewer.style.display = "none";
        viewer.innerHTML = "";
        document.body.style.overflow = "auto";
    };


    // outside click close
    viewer.addEventListener("click", (e) => {
        if (e.target.id === "viewer") closeViewer();
    });

    // ESC close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeViewer();
    });

});