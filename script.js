document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Mobile navigation ---------- */
    const header = document.querySelector(".site-header");
    const nav = document.querySelector("#siteNav");
    const navToggle = document.querySelector(".nav-toggle");
    const navItem = document.querySelector(".nav-item");
    const navTrigger = navItem?.querySelector(".nav-trigger");

    const closeNav = () => {
        if (!nav || !navToggle) return;
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
    };

    const closeServices = () => {
        if (!navItem || !navTrigger) return;
        navItem.classList.remove("open");
        navTrigger.setAttribute("aria-expanded", "false");
    };

    if (nav && navToggle) {
        navToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
            if (!isOpen) closeServices();
        });
    }

    if (navItem && navTrigger) {
        navTrigger.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = navItem.classList.toggle("open");
            navTrigger.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // Close menus when a link is chosen, on outside click, or on Escape.
    nav?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeServices();
            closeNav();
        });
    });

    document.addEventListener("click", (event) => {
        if (header && !header.contains(event.target)) {
            closeServices();
            closeNav();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 992) closeNav();
    });

    /* ---------- Appointment modal ---------- */
    const modal = document.querySelector("#appointmentModal");
    const closeButton = modal?.querySelector(".appointment-modal-close");
    const firstField = modal?.querySelector("input");
    const appointmentTriggers = document.querySelectorAll(".nav-appointment, .hero-primary, .scroll-to-form");
    let lastFocused = null;

    const openModal = (event) => {
        if (!modal) return;
        if (event) event.preventDefault();
        lastFocused = document.activeElement;
        modal.hidden = false;
        document.body.classList.add("modal-open");
        closeNav();
        (firstField || closeButton)?.focus();
    };

    const closeModal = () => {
        if (!modal) return;
        modal.hidden = true;
        document.body.classList.remove("modal-open");
        if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };

    if (modal && closeButton) {
        appointmentTriggers.forEach((trigger) => trigger.addEventListener("click", openModal));
        closeButton.addEventListener("click", closeModal);
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal();
        });

        // Allow other pages to link to index.html#appointment.
        if (window.location.hash === "#appointment") {
            openModal();
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        if (modal && !modal.hidden) {
            closeModal();
            return;
        }
        closeServices();
        closeNav();
    });
});
