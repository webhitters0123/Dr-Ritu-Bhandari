document.addEventListener("DOMContentLoaded", function () {
    const scrollButtons = document.querySelectorAll(".scroll-to-form");
    const formSection = document.querySelector(".appointment-form");

    if (scrollButtons.length > 0 && formSection) {
        scrollButtons.forEach((button) => {
            button.addEventListener("click", function (event) {
                event.preventDefault();

                formSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    } else {
        console.warn("Scroll buttons or form section not found. Check class names.");
    }
});
