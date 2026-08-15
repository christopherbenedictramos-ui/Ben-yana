/* =====================================================
🌷 A LITTLE SCRAPBOOK
COUNTDOWN + FULL INTERACTIVE SCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🌷 Scrapbook started");


    /* =================================================
       🌷 COUNTDOWN
    ================================================= */

    const countdownScreen =
        document.getElementById("countdownScreen");

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    /*
       CHANGE YOUR TARGET DATE HERE

       Example:
       August 11, 2026 at 12:06 PM
    */

    const targetDate =
        new Date("August 11, 2026 12:07:00").getTime();


    let countdownFinished = false;
    let countdownTimer;


    /* =================================================
       COUNTDOWN NUMBER ANIMATION
    ================================================= */

    function animateNumber(element, value) {

        if (!element) return;

        if (element.textContent === value) {
            return;
        }

        element.classList.add("number-changing");


        setTimeout(() => {

            element.textContent = value;

            element.classList.remove(
                "number-changing"
            );

        }, 120);

    }


    /* =================================================
       SHOW SCRAPBOOK
    ================================================= */

    function showScrapbook() {

        if (countdownFinished) {
            return;
        }

        countdownFinished = true;


        console.log(
            "🌷 Countdown finished — opening scrapbook"
        );


        /*
           Keep the screen at 00:00:00
           briefly before disappearing.
        */

        if (daysElement)
            daysElement.textContent = "00";

        if (hoursElement)
            hoursElement.textContent = "00";

        if (minutesElement)
            minutesElement.textContent = "00";

        if (secondsElement)
            secondsElement.textContent = "00";


        setTimeout(() => {

            /*
               Hide countdown
            */

            if (countdownScreen) {

                countdownScreen.classList.add(
                    "countdown-finished"
                );

            }


            /*
               IMPORTANT:
               Force the document to the VERY TOP.
            */

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });


            /*
               Some browsers restore scroll position
               after the countdown disappears.
               Force it again after the transition.
            */

            setTimeout(() => {

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant"
                });

            }, 50);


            /*
               Unlock scrolling
            */

            document.body.style.overflow = "";


            /*
               Make sure the scrapbook cover
               is visible.
            */

            const cover =
                document.querySelector(".cover-page");

            if (cover) {

                cover.classList.remove(
                    "scrapbook-opened"
                );

                cover.classList.add(
                    "page-visible"
                );

            }

        }, 800);

    }


    /* =================================================
       UPDATE COUNTDOWN
    ================================================= */

    function updateCountdown() {

        const now =
            new Date().getTime();

        const difference =
            targetDate - now;


        /*
           Countdown finished
        */

        if (difference <= 0) {

            clearInterval(countdownTimer);

            showScrapbook();

            return;

        }


        /*
           Calculate time
        */

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (1000 * 60)
                ) /
                1000
            );


        /*
           Display
        */

        animateNumber(
            daysElement,
            String(days).padStart(2, "0")
        );


        animateNumber(
            hoursElement,
            String(hours).padStart(2, "0")
        );


        animateNumber(
            minutesElement,
            String(minutes).padStart(2, "0")
        );


        animateNumber(
            secondsElement,
            String(seconds).padStart(2, "0")
        );

    }


    /* =================================================
       LOCK PAGE DURING COUNTDOWN
    ================================================= */

    if (countdownScreen) {

        document.body.style.overflow = "hidden";


        /*
           Always start the page at the top.
        */

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });


        updateCountdown();


        countdownTimer =
            setInterval(
                updateCountdown,
                1000
            );

    }


    /* =================================================
       🌷 SCRAPBOOK ELEMENTS
    ================================================= */

    const openButton =
        document.getElementById(
            "openScrapbook"
        );

    const cover =
        document.querySelector(
            ".cover-page"
        );

    const pages =
        document.querySelectorAll(
            ".scrapbook-page"
        );

    const envelope =
        document.querySelector(
            ".envelope"
        );

    const letter =
        document.querySelector(
            ".letter-container"
        );

    const photos =
        document.querySelectorAll(
            ".polaroid img"
        );

    const stickyNotes =
        document.querySelectorAll(
            ".sticky-note"
        );


    /* =================================================
       INITIAL PAGE STATE
    ================================================= */

    pages.forEach(page => {

        if (
            page.classList.contains(
                "cover-page"
            )
        ) {

            page.classList.add(
                "page-visible"
            );

        }

    });


    /* =================================================
       📖 OPEN SCRAPBOOK
    ================================================= */

    if (
        openButton &&
        cover
    ) {

        openButton.addEventListener(
            "click",
            () => {

                console.log(
                    "📖 Opening scrapbook..."
                );


                /*
                   Close the cover
                */

                cover.classList.add(
                    "scrapbook-opened"
                );


                /*
                   Reveal first page
                */

                setTimeout(() => {

                    const firstPage =
                        document.querySelector(
                            ".memories-page"
                        );


                    if (firstPage) {

                        firstPage.classList.add(
                            "page-visible"
                        );


                        /*
                           Scroll to Memories
                        */

                        firstPage.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }, 700);

            }
        );

    }


    /* =================================================
       📖 PAGE SCROLL REVEAL
    ================================================= */

    const pageObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "page-visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    pages.forEach(page => {

        if (
            !page.classList.contains(
                "cover-page"
            )
        ) {

            pageObserver.observe(page);

        }

    });


    /* =================================================
       📸 PHOTO ENTRANCE
    ================================================= */

    const photoObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "photo-visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.2
            }
        );


    document
        .querySelectorAll(".polaroid")
        .forEach(photo => {

            photoObserver.observe(
                photo
            );

        });


    /* =================================================
       📝 STICKY NOTE ENTRANCE
    ================================================= */

    const noteObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "note-visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    stickyNotes.forEach(note => {

        noteObserver.observe(
            note
        );

    });


    /* =================================================
       📸 PHOTO LIGHTBOX
    ================================================= */

    if (photos.length > 0) {

        const lightbox =
            document.createElement(
                "div"
            );

        lightbox.className =
            "photo-lightbox";


        const image =
            document.createElement(
                "img"
            );

        image.className =
            "lightbox-image";


        const close =
            document.createElement(
                "button"
            );

        close.className =
            "lightbox-close";

        close.type = "button";

        close.setAttribute(
            "aria-label",
            "Close photo"
        );

        close.textContent = "×";


        lightbox.appendChild(
            image
        );

        lightbox.appendChild(
            close
        );

        document.body.appendChild(
            lightbox
        );


        /* Open photo */

        photos.forEach(photo => {

            photo.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    image.src =
                        photo.currentSrc ||
                        photo.src;


                    image.alt =
                        photo.alt ||
                        "Scrapbook memory";


                    lightbox.classList.add(
                        "active"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


        /* Close */

        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            /*
               Only unlock scrolling if
               countdown is already finished.
            */

            if (countdownFinished) {

                document.body.style.overflow =
                    "";

            }


            setTimeout(() => {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {

                    image.src = "";

                }

            }, 300);

        }


        close.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains(
                        "active"
                    )
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =================================================
       💌 ENVELOPE / LETTER
    ================================================= */

    if (
        envelope &&
        letter
    ) {

        let letterOpened = false;


        envelope.addEventListener(
            "click",
            () => {

                if (letterOpened) {
                    return;
                }


                letterOpened = true;


                console.log(
                    "💌 Opening letter..."
                );


                envelope.classList.add(
                    "opened"
                );


                setTimeout(() => {

                    letter.style.display =
                        "block";


                    requestAnimationFrame(
                        () => {

                            requestAnimationFrame(
                                () => {

                                    letter.classList.add(
                                        "letter-visible"
                                    );

                                }
                            );

                        }
                    );


                    setTimeout(() => {

                        letter.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }, 350);


                }, 500);

            }
        );

    }


    /* =================================================
       📝 DRAGGABLE STICKY NOTES
    ================================================= */

    stickyNotes.forEach(note => {

        let dragging = false;

        let startX = 0;
        let startY = 0;

        let currentX = 0;
        let currentY = 0;


        note.addEventListener(
            "pointerdown",
            event => {

                if (
                    event.target.closest(
                        "button"
                    ) ||
                    event.target.closest(
                        "a"
                    )
                ) {

                    return;

                }


                dragging = true;


                note.classList.add(
                    "dragging"
                );


                note.setPointerCapture(
                    event.pointerId
                );


                startX =
                    event.clientX -
                    currentX;

                startY =
                    event.clientY -
                    currentY;

            }
        );


        note.addEventListener(
            "pointermove",
            event => {

                if (!dragging) {
                    return;
                }


                currentX =
                    event.clientX -
                    startX;

                currentY =
                    event.clientY -
                    startY;


                let rotation = 0;


                if (
                    note.classList.contains(
                        "note-one"
                    )
                ) {

                    rotation = -3;

                }


                if (
                    note.classList.contains(
                        "note-two"
                    )
                ) {

                    rotation = 4;

                }


                if (
                    note.classList.contains(
                        "note-three"
                    )
                ) {

                    rotation = 2;

                }


                if (
                    note.classList.contains(
                        "note-four"
                    )
                ) {

                    rotation = -4;

                }


                note.style.transform =
                    `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;

            }
        );


        function stopDragging() {

            if (!dragging) {
                return;
            }


            dragging = false;


            note.classList.remove(
                "dragging"
            );

        }


        note.addEventListener(
            "pointerup",
            stopDragging
        );


        note.addEventListener(
            "pointercancel",
            stopDragging
        );

    });


    /* =================================================
       🚫 PREVENT IMAGE DRAGGING
    ================================================= */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "dragstart",
                event => {

                    event.preventDefault();

                }
            );

        });


    /* =================================================
       📱 MOBILE TAP HIGHLIGHT
    ================================================= */

    document
        .querySelectorAll(
            "button, .polaroid, .envelope, .sticky-note"
        )
        .forEach(element => {

            element.style.webkitTapHighlightColor =
                "transparent";

        });


    /* =================================================
       ⌨️ KEYBOARD SUPPORT
    ================================================= */

    if (envelope) {

        envelope.setAttribute(
            "tabindex",
            "0"
        );


        envelope.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    envelope.click();

                }

            }
        );

    }


    if (openButton) {

        openButton.setAttribute(
            "type",
            "button"
        );

    }


    /* =================================================
       🌷 FINISHED
    ================================================= */

    console.log(
        "🌷 Scrapbook ready!"
    );

});
