(function () {
    const header = document.getElementById("siteHeader");
    const menuBtn = document.getElementById("menuBtn");
    const menuIcon = document.getElementById("menuIcon");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (!header) return;

    // Sticky scroll effect
    function onScroll() {
        if (window.scrollY > 10) {
            header.classList.add("backdrop-blur", "bg-neutral-950/70", "border-b", "border-white/10");
            header.classList.remove("bg-transparent");
        } else {
            header.classList.remove("backdrop-blur", "bg-neutral-950/70", "border-b", "border-white/10");
            header.classList.add("bg-transparent");
        }
    }
    onScroll();
    window.addEventListener("scroll", onScroll);

    // Mobile menu toggle
    function setOpen(open) {
        if (!mobileMenu || !menuBtn || !menuIcon) return;

        if (open) {
            mobileMenu.classList.remove("hidden");
            menuIcon.textContent = "×";
            menuBtn.setAttribute("aria-expanded", "true");
        } else {
            mobileMenu.classList.add("hidden");
            menuIcon.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
            setOpen(!isOpen);
        });
    }

    // Close on Escape
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
    });

    // Close when clicking a menu link
    mobileLinks.forEach((a) => {
        a.addEventListener("click", () => setOpen(false));
    });


    // Copy buttons + toast (Contact section)
    const toastEl = document.getElementById("contactToast");
    const btns = document.querySelectorAll(".copy-btn");

    if (!btns.length) return;

    function showToast(text, ms = 1800) {
        if (!toastEl) return;
        toastEl.textContent = text;
        toastEl.classList.remove("hidden");
        window.clearTimeout(showToast._t);
        showToast._t = window.setTimeout(() => toastEl.classList.add("hidden"), ms);
    }

    async function copyText(text, label) {
        try {
            await navigator.clipboard.writeText(text);
            showToast(`${label} copied!`);
        } catch {
            showToast("Could not copy. Please copy manually.", 2200);
        }
    }

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const text = btn.getAttribute("data-copy") || "";
            const label = btn.getAttribute("data-label") || "Text";
            copyText(text, label);
        });
    });
})();
