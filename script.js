/* =====================================================
   BIRTHDAY EXPERIENCE WEBSITE
   MAIN SCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       PAGE FADE IN
    ========================================== */

    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition = "opacity .8s ease";
        document.body.style.opacity = "1";
    }, 100);

    /* ==========================================
       INDEX PAGE - GIFT BOX
    ========================================== */

    const giftBox = document.querySelector(".gift-box");

    if (giftBox) {

        giftBox.addEventListener("click", () => {

            giftBox.style.transform = "scale(1.08) rotate(5deg)";

            setTimeout(() => {
                window.location.href = "choose.html";
            }, 700);

        });

    }

    /* ==========================================
       CHOOSE PAGE
    ========================================== */

    document.querySelectorAll(".choice-card").forEach(card => {

        card.addEventListener("click", (e) => {

            e.preventDefault();

            const destination = card.href;

            card.style.transform = "scale(.95)";
            card.style.opacity = ".6";

            setTimeout(() => {

                window.location.href = destination;

            }, 300);

        });

    });

    /* ==========================================
       FLOATING FLOWERS
    ========================================== */

    function createFlower() {

        const flower = document.createElement("span");

        flower.className = "generated-flower";

        flower.innerHTML = Math.random() > .5 ? "🌷" : "🌸";

        flower.style.left = Math.random() * 100 + "%";
        flower.style.fontSize = (20 + Math.random() * 18) + "px";
        flower.style.animationDuration = (8 + Math.random() * 5) + "s";

        document.body.appendChild(flower);

        setTimeout(() => {

            flower.remove();

        }, 12000);

    }

    setInterval(createFlower, 1800);

    /* ==========================================
       MEMORIES LIGHTBOX
    ========================================== */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    if (lightbox && lightboxImage && closeLightbox) {

        document.querySelectorAll(".memory-photo").forEach(photo => {

            photo.addEventListener("click", () => {

                lightboxImage.src = photo.src;

                lightbox.classList.add("show");

                document.body.style.overflowY = "hidden";

            });

        });

        function closeGallery() {

            lightbox.classList.remove("show");

            document.body.style.overflowY = "auto";

        }

        closeLightbox.addEventListener("click", closeGallery);

        lightbox.addEventListener("click", (e) => {

            if (e.target === lightbox) {

                closeGallery();

            }

        });

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {

                closeGallery();

            }

        });

    }

    /* ==========================================
       MESSAGE PAGE - ENVELOPE
    ========================================== */

    const envelopeBox = document.getElementById("envelopeBox");
    const envelopeScreen = document.getElementById("envelopeScreen");
    const letterContent = document.getElementById("letterContent");

    if (envelopeBox && envelopeScreen && letterContent) {

        envelopeBox.addEventListener("click", () => {

            envelopeBox.classList.add("open");

            setTimeout(() => {

                envelopeScreen.style.display = "none";

                letterContent.classList.remove("hidden-letter");
                letterContent.classList.add("show");

                window.scrollTo({

                    top: 0,
                    behavior: "smooth"

                });

            }, 900);

        });

    }

    /* ==========================================
       TYPING EFFECT
    ========================================== */

    const typingText = document.querySelector(".typing-text");

    if (typingText) {

        const original = typingText.innerHTML;

        typingText.innerHTML = "";

        let index = 0;

        function type() {

            if (index < original.length) {

                typingText.innerHTML += original.charAt(index);

                index++;

                setTimeout(type, 35);

            }

        }

        type();

    }

});
