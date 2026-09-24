document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector("#appointmentModal");
    const modalPanel = modal?.querySelector(".appointment-modal-panel");
    const closeButton = modal?.querySelector(".appointment-modal-close");
    const appointmentTriggers = document.querySelectorAll(".nav-appointment, .hero-primary, .scroll-to-form");

    if (!modal || !modalPanel || !closeButton) {
        return;
    }

    const openModal = (event) => {
        event.preventDefault();
        modal.hidden = false;
        document.body.classList.add("modal-open");
        closeButton.focus();
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.classList.remove("modal-open");
    };

    appointmentTriggers.forEach((trigger) => {
        trigger.addEventListener("click", openModal);
    });

    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });
});
