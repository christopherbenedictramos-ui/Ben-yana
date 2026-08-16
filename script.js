/* =========================================================
🌷 A LITTLE SCRAPBOOK
REAL PAGE-TURN SYSTEM
COUNTDOWN + INTERACTIVE SCRAPBOOK
POLISHED SCRIPT ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("🌷 A Little Scrapbook started");


    /* =========================================================
       🌷 ELEMENTS
    ========================================================= */

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

    const openButton =
        document.getElementById("openScrapbook");

    const scrapbook =
        document.querySelector(".scrapbook");

    const pages =
        Array.from(
            document.querySelectorAll(".scrapbook-page")
        );

    const cover =
        document.querySelector(".cover-page");

    const envelope =
        document.querySelector(".envelope");

    const letter =
        document.querySelector(".letter-container");

    const typingLetter =
        document.getElementById("typingLetter");

    const photos =
        Array.from(
            document.querySelectorAll(".polaroid img")
        );

    const stickyNotes =
        Array.from(
            document.querySelectorAll(".sticky-note")
        );


    /* =========================================================
       🌷 STATE
    ========================================================= */

    let scrapbookUnlocked = false;

    let countdownFinished = false;

    let countdownTimer = null;

    let currentPage = 0;

    let isTurningPage = false;

    let letterOpened = false;

    let navigation = null;

    let previousButton = null;

    let nextButton = null;

    let pageNumber = null;


    /* =========================================================
       🌷 SETTINGS
    ========================================================= */

    /*
        CHANGE THIS DATE WHEN NEEDED.

        IMPORTANT:
        JavaScript months are normally zero-based
        when using numeric Date values.

        7 = August

        Example:
        August 23, 2026 at midnight
    */

    const targetDate =
        new Date(
            2026,
            7,
            23,
            0,
            0,
            0
        ).getTime();


    /*
        If you prefer the readable format:

        const targetDate =
            new Date(
                "August 23, 2026 00:00:00"
            ).getTime();
    */


    /* =========================================================
       ✍️ LETTER CONTENT
    ========================================================= */

    const letterText =
`Happy Birthday!

Today, I hope you remember
how special you are.

You deserve happiness,
beautiful moments,
and wonderful memories.

Thank you for being part
of my life.

With love,

Benny 🌷`;


    /* =========================================================
       🎨 PAGE-TURN ENGINE CSS
    ========================================================= */

    const pageTurnStyle =
        document.createElement("style");

    pageTurnStyle.id =
        "scrapbook-page-engine";

    pageTurnStyle.textContent = `

        /* =====================================================
           🌷 LOCKING
        ===================================================== */

        body.scrapbook-locked {
            overflow: hidden !important;
            height: 100vh !important;
            touch-action: none;
        }

        body.scrapbook-open {
            overflow: hidden !important;
            height: 100vh !important;
        }


        /* =====================================================
           📖 SCRAPBOOK
        ===================================================== */

        .scrapbook {
            position: relative !important;
            width: 100%;
            min-height: 100vh;
            perspective: 1800px;
            transform-style: preserve-3d;
            overflow: hidden;
        }


        /* =====================================================
           📄 PAGE BASE
        ===================================================== */

        .scrapbook-page {
            position: absolute !important;

            top: 0;
            left: 50%;

            width: min(1100px, 92%);

            margin: 30px 0 100px !important;

            transform-origin: left center;

            transform:
                translateX(-50%)
                rotateY(0deg);

            visibility: hidden;

            opacity: 1 !important;

            pointer-events: none;

            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;

            transform-style: preserve-3d;

            will-change:
                transform,
                filter;

            z-index: 1;

            transition:
                transform 1s cubic-bezier(.65,.05,.36,1),
                filter 1s ease;
        }


        /* =====================================================
           📄 CURRENT PAGE
        ===================================================== */

        .scrapbook-page.page-current {

            visibility: visible;

            pointer-events: auto;

            z-index: 20;

            transform:
                translateX(-50%)
                rotateY(0deg);

            filter: none;
        }


        /* =====================================================
           📄 NEXT PAGE WAITING
        ===================================================== */

        .scrapbook-page.page-next {

            visibility: visible;

            pointer-events: none;

            z-index: 10;

            transform:
                translateX(-50%)
                rotateY(0deg);

            filter: none;
        }


        /* =====================================================
           📄 TURNED PAGE
        ===================================================== */

        .scrapbook-page.page-turned {

            visibility: visible;

            pointer-events: none;

            z-index: 30;

            transform:
                translateX(-50%)
                rotateY(-180deg);

            filter: brightness(.9);
        }


        /* =====================================================
           📄 PREVIOUS PAGE DURING BACKWARD TURN
        ===================================================== */

        .scrapbook-page.page-previous {

            visibility: visible;

            pointer-events: none;

            z-index: 30;

            transform:
                translateX(-50%)
                rotateY(-180deg);

            filter: none;
        }


        /* =====================================================
           📖 NAVIGATION
        ===================================================== */

        .scrapbook-navigation {

            position: fixed;

            left: 50%;
            bottom: 25px;

            transform:
                translateX(-50%);

            z-index: 9990;

            display: flex;

            align-items: center;
            justify-content: center;

            gap: 15px;

            padding: 10px 15px;

            border-radius: 40px;

            background:
                rgba(255,250,244,.94);

            border:
                1px solid
                rgba(184,111,123,.18);

            box-shadow:
                0 12px 35px
                rgba(77,52,45,.18);

            backdrop-filter:
                blur(10px);

            -webkit-backdrop-filter:
                blur(10px);

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

            transition:
                opacity .4s ease,
                visibility .4s ease;
        }


        .scrapbook-navigation.visible {

            opacity: 1;

            visibility: visible;

            pointer-events: auto;
        }


        /* =====================================================
           🔘 PAGE BUTTONS
        ===================================================== */

        .page-button {

            border: none;

            min-width: 45px;
            height: 42px;

            padding: 0 16px;

            border-radius: 25px;

            background:
                #f7efe5;

            color:
                #b86f7b;

            font-family:
                "Poppins",
                Arial,
                sans-serif;

            font-size: 13px;

            cursor: pointer;

            transition:
                transform .25s ease,
                background .25s ease,
                box-shadow .25s ease,
                opacity .25s ease;
        }


        .page-button:hover:not(:disabled) {

            transform:
                translateY(-3px);

            background:
                #efd1d4;

            box-shadow:
                0 8px 18px
                rgba(77,52,45,.12);
        }


        .page-button:active:not(:disabled) {

            transform:
                scale(.95);
        }


        .page-button:disabled {

            opacity: .35;

            cursor: default;

            transform: none;

            box-shadow: none;
        }


        .page-number {

            min-width: 70px;

            text-align: center;

            font-family:
                "Playfair Display",
                Georgia,
                serif;

            font-size: 14px;

            color:
                #806e6d;
        }


        /* =====================================================
           🌷 OPEN BUTTON
        ===================================================== */

        #openScrapbook.button-hidden {

            opacity: 0 !important;

            visibility: hidden !important;

            pointer-events: none !important;

            transform:
                translateY(15px);

            transition:
                opacity .5s ease,
                transform .5s ease,
                visibility 0s linear .5s;
        }


        /* =====================================================
           📝 STICKY NOTES
        ===================================================== */

        .sticky-note {

            touch-action: none;

            user-select: none;

            -webkit-user-select: none;

            cursor: grab;
        }


        .sticky-note.dragging {

            cursor: grabbing;

            z-index: 9999 !important;

            box-shadow:
                0 20px 40px
                rgba(77,52,45,.25);
        }


        /* =====================================================
           📱 MOBILE
        ===================================================== */

        @media (max-width: 800px) {

            .scrapbook-page {

                width: 94%;

                min-height: 700px;
            }

            .scrapbook-navigation {

                bottom: 20px;
            }
        }


        @media (max-width: 520px) {

            .scrapbook-page {

                width: 94%;

                min-height: 650px;

                margin-top: 20px !important;
            }

            .scrapbook-navigation {

                bottom: 15px;

                gap: 8px;

                padding: 8px 10px;
            }

            .page-button {

                min-width: 40px;

                height: 38px;

                padding: 0 12px;

                font-size: 11px;
            }

            .page-number {

                min-width: 55px;

                font-size: 12px;
            }
        }


        /* =====================================================
           ♿ REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

            .scrapbook-page {

                transition-duration:
                    .01ms !important;
            }

            .scrapbook-navigation {

                transition-duration:
                    .01ms !important;
            }
        }

    `;

    /*
        Remove an older injected version if one exists.
    */

    const oldPageEngine =
        document.getElementById(
            "scrapbook-page-engine"
        );

    if (oldPageEngine) {
        oldPageEngine.remove();
    }

    document.head.appendChild(
        pageTurnStyle
    );


    /* =========================================================
       🔒 INITIAL LOCK
    ========================================================= */

    document.body.classList.add(
        "scrapbook-locked"
    );

    document.body.classList.remove(
        "scrapbook-open"
    );

    document.body.style.overflow =
        "hidden";

    window.scrollTo(
        0,
        0
    );


    /* =========================================================
       🌷 COUNTDOWN NUMBER ANIMATION
    ========================================================= */

    function animateNumber(
        element,
        value
    ) {

        if (!element) {
            return;
        }

        if (
            element.textContent === value
        ) {
            return;
        }

        element.classList.add(
            "number-changing"
        );

        setTimeout(
            () => {

                element.textContent =
                    value;

                element.classList.remove(
                    "number-changing"
                );

            },
            120
        );
    }


    /* =========================================================
       🌷 UPDATE COUNTDOWN
    ========================================================= */

    function updateCountdown() {

        const now =
            Date.now();

        const difference =
            targetDate - now;


        /*
            Countdown finished.
        */

        if (difference <= 0) {

            if (countdownTimer) {

                clearInterval(
                    countdownTimer
                );

                countdownTimer =
                    null;
            }

            showScrapbook();

            return;
        }


        const days =
            Math.floor(
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                ) /
                (
                    1000 *
                    60 *
                    60
                )
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60 *
                        60
                    )
                ) /
                (
                    1000 *
                    60
                )
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (
                        1000 *
                        60
                    )
                ) /
                1000
            );


        animateNumber(
            daysElement,
            String(days)
                .padStart(2, "0")
        );

        animateNumber(
            hoursElement,
            String(hours)
                .padStart(2, "0")
        );

        animateNumber(
            minutesElement,
            String(minutes)
                .padStart(2, "0")
        );

        animateNumber(
            secondsElement,
            String(seconds)
                .padStart(2, "0")
        );
    }


    /* =========================================================
       🌷 SHOW SCRAPBOOK
    ========================================================= */

    function showScrapbook() {

        if (countdownFinished) {
            return;
        }

        countdownFinished =
            true;


        console.log(
            "🌷 Countdown finished!"
        );


        /*
            Force countdown to zero.
        */

        if (daysElement)
            daysElement.textContent =
                "00";

        if (hoursElement)
            hoursElement.textContent =
                "00";

        if (minutesElement)
            minutesElement.textContent =
                "00";

        if (secondsElement)
            secondsElement.textContent =
                "00";


        /*
            Give the countdown exit animation
            time to finish.
        */

        setTimeout(
            () => {

                if (countdownScreen) {

                    countdownScreen.classList.add(
                        "countdown-finished"
                    );
                }


                /*
                    Keep scrapbook locked.

                    User must press
                    "Open Scrapbook".
                */

                document.body.classList.add(
                    "scrapbook-locked"
                );


                document.body.classList.remove(
                    "scrapbook-open"
                );


                document.body.style.overflow =
                    "hidden";


                setupPages();


                /*
                    Make cover ready.
                */

                if (cover) {

                    cover.classList.add(
                        "page-visible"
                    );

                    cover.style.visibility =
                        "visible";

                    cover.style.opacity =
                        "1";

                    cover.style.pointerEvents =
                        "auto";
                }


                window.scrollTo(
                    0,
                    0
                );


                console.log(
                    "📖 Cover revealed"
                );

            },
            800
        );
    }


    /* =========================================================
       📖 SETUP PAGE SYSTEM
    ========================================================= */

    function setupPages() {

    if (!pages.length) {

        console.warn(
            "⚠️ No .scrapbook-page elements found."
        );

        return;
    }

    currentPage = 0;

    createSpiralBinding();

    pages.forEach(
        (page, index) => {

            page.classList.remove(
                "page-current",
                "page-next",
                "page-turned",
                "page-previous"
            );

            if (index === 0) {

                page.classList.add(
                    "page-current"
                );

            } else {

                page.classList.add(
                    "page-next"
                );
            }
        }
    );

    updateNavigation();
}


    /* =========================================================
       📖 CREATE NAVIGATION
    ========================================================= */

    function createNavigation() {

        if (navigation) {
            return;
        }


        navigation =
            document.createElement(
                "div"
            );

        navigation.className =
            "scrapbook-navigation";


        previousButton =
            document.createElement(
                "button"
            );

        previousButton.type =
            "button";

        previousButton.className =
            "page-button";

        previousButton.textContent =
            "← Prev";

        previousButton.setAttribute(
            "aria-label",
            "Previous page"
        );


        pageNumber =
            document.createElement(
                "div"
            );

        pageNumber.className =
            "page-number";

        pageNumber.setAttribute(
            "aria-live",
            "polite"
        );


        nextButton =
            document.createElement(
                "button"
            );

        nextButton.type =
            "button";

        nextButton.className =
            "page-button";

        nextButton.textContent =
            "Next →";

        nextButton.setAttribute(
            "aria-label",
            "Next page"
        );


        navigation.appendChild(
            previousButton
        );

        navigation.appendChild(
            pageNumber
        );

        navigation.appendChild(
            nextButton
        );


        document.body.appendChild(
            navigation
        );


        previousButton.addEventListener(
            "click",
            previousPage
        );


        nextButton.addEventListener(
            "click",
            nextPage
        );


        updateNavigation();
    }


    /* =========================================================
       📖 UPDATE NAVIGATION
    ========================================================= */

    function updateNavigation() {

        if (
            !navigation ||
            !previousButton ||
            !nextButton ||
            !pageNumber
        ) {

            return;
        }


        pageNumber.textContent =
            `${currentPage + 1} / ${pages.length}`;


        previousButton.disabled =
            currentPage === 0 ||
            isTurningPage;


        nextButton.disabled =
            currentPage >=
            pages.length - 1 ||
            isTurningPage;
    }


    /* =========================================================
       📄 ACTIVATE PAGE
    ========================================================= */

    function activatePage(page) {

        if (!page) {
            return;
        }


        page.classList.add(
            "page-visible"
        );


        /*
            Activate photos.
        */

        page
            .querySelectorAll(
                ".polaroid"
            )
            .forEach(
                photo => {

                    photo.classList.add(
                        "photo-visible"
                    );
                }
            );


        /*
            Activate sticky notes.
        */

        page
            .querySelectorAll(
                ".sticky-note"
            )
            .forEach(
                note => {

                    note.classList.add(
                        "note-visible"
                    );
                }
            );
    }


    /* =========================================================
       📖 NEXT PAGE
    ========================================================= */

    function nextPage() {

        /*
            Don't allow page turns
            while locked.
        */

        if (!scrapbookUnlocked) {
            return;
        }


        /*
            Don't allow two animations
            at the same time.
        */

        if (isTurningPage) {
            return;
        }


        /*
            Already at final page.
        */

        if (
            currentPage >=
            pages.length - 1
        ) {

            return;
        }


        const current =
            pages[currentPage];

        const next =
            pages[currentPage + 1];


        if (!current || !next) {
            return;
        }


        isTurningPage =
            true;

        updateNavigation();


        console.log(
            `📖 Page ${currentPage + 1} → ${currentPage + 2}`
        );


        /*
            Bring next page into position.
        */

        next.classList.remove(
            "page-next",
            "page-turned",
            "page-previous"
        );

        next.classList.add(
            "page-current"
        );


        /*
            Force browser repaint.

            This is important because
            without it the browser can combine
            both class changes.
        */

        void next.offsetWidth;


        /*
            Turn current page over.
        */

        current.classList.remove(
            "page-current"
        );

        current.classList.add(
            "page-turned"
        );


        /*
            Update state.
        */

        currentPage++;


        activatePage(
            next
        );


        updateNavigation();


        /*
            Wait for the actual CSS
            animation to finish.
        */

        waitForPageTurn(
            () => {

                /*
                    The page behind the
                    current page can stay
                    in its turned state.
                */

                isTurningPage =
                    false;

                updateNavigation();

            }
        );
    }


    /* =========================================================
       📖 PREVIOUS PAGE
    ========================================================= */

    function previousPage() {

        if (!scrapbookUnlocked) {
            return;
        }


        if (isTurningPage) {
            return;
        }


        if (currentPage <= 0) {
            return;
        }


        const current =
            pages[currentPage];

        const previous =
            pages[currentPage - 1];


        if (!current || !previous) {
            return;
        }


        isTurningPage =
            true;

        updateNavigation();


        console.log(
            `📖 Page ${currentPage + 1} → ${currentPage}`
        );


        /*
            Current page moves backward.
        */

        current.classList.remove(
            "page-current"
        );

        current.classList.add(
            "page-previous"
        );


        /*
            Bring previous page back
            from the turned position.
        */

        previous.classList.remove(
            "page-turned",
            "page-next",
            "page-previous"
        );

        previous.classList.add(
            "page-current"
        );


        /*
            Force repaint.
        */

        void previous.offsetWidth;


        /*
            Update state.
        */

        currentPage--;


        activatePage(
            previous
        );


        updateNavigation();


        /*
            After the animation,
            the old current page becomes
            the next page again.
        */

        waitForPageTurn(
            () => {

                current.classList.remove(
                    "page-previous",
                    "page-turned"
                );

                current.classList.add(
                    "page-next"
                );


                isTurningPage =
                    false;

                updateNavigation();

            }
        );
    }


    /* =========================================================
       ⏱️ PAGE TURN TIMER
    ========================================================= */

    function waitForPageTurn(
        callback
    ) {

        let finished =
            false;


        const finish =
            () => {

                if (finished) {
                    return;
                }

                finished =
                    true;

                callback();
            };


        /*
            Normal animation duration.
        */

        const timer =
            setTimeout(
                finish,
                1050
            );


        /*
            Also listen for the actual
            transition ending.
        */

        const activePage =
            pages[currentPage];


        if (activePage) {

            const transitionHandler =
                event => {

                    if (
                        event.propertyName ===
                        "transform"
                    ) {

                        clearTimeout(
                            timer
                        );

                        activePage.removeEventListener(
                            "transitionend",
                            transitionHandler
                        );

                        finish();
                    }
                };


            activePage.addEventListener(
                "transitionend",
                transitionHandler
            );
        }
    }


    /* =========================================================
       📖 OPEN SCRAPBOOK
    ========================================================= */

    if (openButton) {

        openButton.type =
            "button";


        openButton.addEventListener(
            "click",
            () => {

                if (scrapbookUnlocked) {
                    return;
                }


                /*
                    Unlock scrapbook.
                */

                scrapbookUnlocked =
                    true;


                console.log(
                    "📖 Scrapbook opened"
                );


                /*
                    Unlock scrolling state.
                */

                document.body.classList.remove(
                    "scrapbook-locked"
                );

                document.body.classList.add(
                    "scrapbook-open"
                );

                document.body.style.overflow =
                    "hidden";


                /*
                    Hide open button.
                */

                openButton.classList.add(
                    "button-hidden"
                );


                /*
                    Open cover.

                    These classes are left here
                    so your existing CSS can
                    animate the cover if it has
                    its own animation.
                */

                if (cover) {

                    cover.classList.add(
                        "scrapbook-opened"
                    );

                    cover.classList.add(
                        "scrapbook-opening"
                    );


                    setTimeout(
                        () => {

                            cover.classList.remove(
                                "scrapbook-opening"
                            );

                        },
                        1000
                    );
                }


                /*
                    Create navigation.
                */

                createNavigation();


                /*
                    Show navigation after
                    opening animation.
                */

                setTimeout(
                    () => {

                        if (navigation) {

                            navigation.classList.add(
                                "visible"
                            );
                        }

                    },
                    500
                );


                window.scrollTo(
                    0,
                    0
                );
            }
        );
    }


    /* =========================================================
       📸 PHOTO LIGHTBOX
    ========================================================= */

    function setupLightbox() {

        if (!photos.length) {
            return;
        }


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

        image.alt =
            "Scrapbook memory";


        const close =
            document.createElement(
                "button"
            );

        close.className =
            "lightbox-close";

        close.type =
            "button";

        close.textContent =
            "×";

        close.setAttribute(
            "aria-label",
            "Close photo"
        );


        lightbox.appendChild(
            image
        );

        lightbox.appendChild(
            close
        );


        document.body.appendChild(
            lightbox
        );


        /*
            Open photo.
        */

        photos.forEach(
            photo => {

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
            }
        );


        /*
            Close lightbox.
        */

        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );


            document.body.style.overflow =
                "hidden";


            setTimeout(
                () => {

                    if (
                        !lightbox.classList.contains(
                            "active"
                        )
                    ) {

                        image.removeAttribute(
                            "src"
                        );
                    }

                },
                300
            );
        }


        close.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                closeLightbox();
            }
        );


        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
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


    setupLightbox();


    /* =========================================================
       💌 ENVELOPE / LETTER
    ========================================================= */

    function setupLetter() {

        if (
            !envelope ||
            !letter
        ) {

            return;
        }


        envelope.setAttribute(
            "tabindex",
            "0"
        );


        envelope.setAttribute(
            "role",
            "button"
        );


        envelope.setAttribute(
            "aria-label",
            "Open birthday letter"
        );


        envelope.addEventListener(
            "click",
            openLetter
        );


        envelope.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openLetter();
                }
            }
        );


        function openLetter() {

            if (letterOpened) {
                return;
            }


            letterOpened =
                true;


            console.log(
                "💌 Opening letter..."
            );


            envelope.classList.add(
                "opened"
            );


            setTimeout(
                () => {

                    letter.style.display =
                        "block";


                    requestAnimationFrame(
                        () => {

                            requestAnimationFrame(
                                () => {

                                    letter.classList.add(
                                        "letter-visible"
                                    );

                                    typeLetter();

                                }
                            );
                        }
                    );

                },
                500
            );
        }
    }


    setupLetter();


    /* =========================================================
       ✍️ LETTER TYPING
    ========================================================= */

    function typeLetter() {

        if (!typingLetter) {
            return;
        }


        if (
            typingLetter.dataset.typed ===
            "true"
        ) {

            return;
        }


        typingLetter.dataset.typed =
            "true";


        typingLetter.innerHTML =
            "";


        let index =
            0;


        const typingSpeed =
            35;


        function typeCharacter() {

            if (
                index >=
                letterText.length
            ) {

                return;
            }


            const character =
                letterText.charAt(
                    index
                );


            /*
                Preserve line breaks.
            */

            if (
                character === "\n"
            ) {

                typingLetter.appendChild(
                    document.createElement(
                        "br"
                    )
                );

            } else {

                const span =
                    document.createElement(
                        "span"
                    );

                span.textContent =
                    character;

                typingLetter.appendChild(
                    span
                );
            }


            index++;


            setTimeout(
                typeCharacter,
                typingSpeed
            );
        }


        typeCharacter();
    }


    /* =========================================================
       📝 DRAGGABLE STICKY NOTES
    ========================================================= */

    function setupStickyNotes() {

        stickyNotes.forEach(
            (note, index) => {

                let dragging =
                    false;

                let currentX =
                    0;

                let currentY =
                    0;

                let startX =
                    0;

                let startY =
                    0;


                const rotations = [
                    -3,
                     4,
                     2,
                    -4,
                     3,
                    -2,
                     5,
                    -3,
                     2,
                    -5,
                     3,
                    -2
                ];


                const originalRotation =
                    rotations[
                        index %
                        rotations.length
                    ];


                note.style.setProperty(
                    "--note-rotation",
                    `${originalRotation}deg`
                );


                /*
                    Pointer starts dragging.
                */

                note.addEventListener(
                    "pointerdown",
                    event => {

                        /*
                            Don't drag buttons
                            or links.
                        */

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


                        dragging =
                            true;


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


                        event.preventDefault();
                    }
                );


                /*
                    Move sticky note.
                */

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


                        note.style.transform =
                            `
                            translate(
                                ${currentX}px,
                                ${currentY}px
                            )
                            rotate(
                                ${originalRotation}deg
                            )
                            `;
                    }
                );


                /*
                    Stop dragging.
                */

                function stopDragging(
                    event
                ) {

                    if (!dragging) {
                        return;
                    }


                    dragging =
                        false;


                    note.classList.remove(
                        "dragging"
                    );


                    try {

                        note.releasePointerCapture(
                            event.pointerId
                        );

                    } catch (error) {

                        /*
                            Pointer already released.
                        */

                    }
                }


                note.addEventListener(
                    "pointerup",
                    stopDragging
                );


                note.addEventListener(
                    "pointercancel",
                    stopDragging
                );


                note.addEventListener(
                    "lostpointercapture",
                    () => {

                        dragging =
                            false;

                        note.classList.remove(
                            "dragging"
                        );
                    }
                );
            }
        );
    }


    setupStickyNotes();


    /* =========================================================
       🚫 PREVENT IMAGE DRAGGING
    ========================================================= */

    document
        .querySelectorAll(
            "img"
        )
        .forEach(
            img => {

                img.setAttribute(
                    "draggable",
                    "false"
                );


                img.addEventListener(
                    "dragstart",
                    event => {

                        event.preventDefault();
                    }
                );
            }
        );


    /* =========================================================
       📱 REMOVE TAP HIGHLIGHT
    ========================================================= */

    document
        .querySelectorAll(
            "button, .polaroid, .envelope, .sticky-note"
        )
        .forEach(
            element => {

                element.style.webkitTapHighlightColor =
                    "transparent";
            }
        );


    /* =========================================================
       ⌨️ KEYBOARD PAGE TURNING
    ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (!scrapbookUnlocked) {
                return;
            }


            /*
                Don't interfere with typing.
            */

            const tag =
                event.target.tagName;


            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {

                return;
            }


            /*
                Ignore modifier combinations.
            */

            if (
                event.ctrlKey ||
                event.metaKey ||
                event.altKey
            ) {

                return;
            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                nextPage();
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                previousPage();
            }
        }
    );


    /* =========================================================
       👆 MOBILE SWIPE PAGE TURNING
    ========================================================= */

    let touchStartX =
        0;

    let touchStartY =
        0;

    let touchStartedOnInteractive =
        false;


    document.addEventListener(
        "touchstart",
        event => {

            if (!scrapbookUnlocked) {
                return;
            }


            const target =
                event.target;


            /*
                Don't accidentally turn pages
                while interacting with photos,
                envelopes, buttons, notes, etc.
            */

            touchStartedOnInteractive =
                Boolean(
                    target.closest(
                        "button, a, .polaroid, .envelope, .sticky-note, .photo-lightbox"
                    )
                );


            if (
                touchStartedOnInteractive
            ) {

                return;
            }


            const touch =
                event.changedTouches[0];


            touchStartX =
                touch.screenX;


            touchStartY =
                touch.screenY;
        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        event => {

            if (!scrapbookUnlocked) {
                return;
            }


            if (
                touchStartedOnInteractive
            ) {

                touchStartedOnInteractive =
                    false;

                return;
            }


            const touch =
                event.changedTouches[0];


            const touchEndX =
                touch.screenX;


            const touchEndY =
                touch.screenY;


            const distanceX =
                touchEndX -
                touchStartX;


            const distanceY =
                touchEndY -
                touchStartY;


            /*
                Ignore vertical gestures.
            */

            if (
                Math.abs(distanceX) <=
                Math.abs(distanceY)
            ) {

                return;
            }


            /*
                Minimum swipe distance.
            */

            if (
                Math.abs(distanceX) <
                60
            ) {

                return;
            }


            /*
                LEFT = NEXT
                RIGHT = PREVIOUS
            */

            if (
                distanceX < 0
            ) {

                nextPage();

            } else {

                previousPage();
            }

        },
        {
            passive: true
        }
    );


    /* =========================================================
       🖱️ MOUSE WHEEL PAGE TURNING
       Disabled by default.

       Uncomment this section if you want
       mouse-wheel page turning.
    ========================================================= */

    /*
    let wheelLocked = false;

    document.addEventListener(
        "wheel",
        event => {

            if (!scrapbookUnlocked) {
                return;
            }

            if (wheelLocked) {
                return;
            }

            if (Math.abs(event.deltaY) < 30) {
                return;
            }

            wheelLocked = true;

            if (event.deltaY > 0) {
                nextPage();
            } else {
                previousPage();
            }

            setTimeout(() => {
                wheelLocked = false;
            }, 1100);

        },
        {
            passive: true
        }
    );
    */
/* =====================================================
   🌀 REAL SCRAPBOOK SPIRAL BINDING
===================================================== */

function createSpiralBinding() {

    pages.forEach((page) => {

        /* Prevent duplicates */
        if (page.querySelector(".scrapbook-spiral")) {
            return;
        }

        const spiral =
            document.createElement("div");

        spiral.className =
            "scrapbook-spiral";

        /* Create individual metal rings */
        const ringCount = 18;

        for (let i = 0; i < ringCount; i++) {

            const ring =
                document.createElement("span");

            ring.className =
                "spiral-ring";

            ring.style.setProperty(
                "--ring-index",
                i
            );

            spiral.appendChild(ring);
        }

        /* Binding holes */
        const holes =
            document.createElement("div");

        holes.className =
            "spiral-holes";

        for (let i = 0; i < ringCount; i++) {

            const hole =
                document.createElement("span");

            holes.appendChild(hole);
        }

        spiral.appendChild(holes);

        page.appendChild(spiral);
    });
}

    /* =========================================================
       🌷 INITIALIZE
    ========================================================= */

    if (!countdownScreen) {

        /*
            No countdown exists.

            Start scrapbook immediately.
        */

        countdownFinished =
            true;


        setupPages();


        /*
            Don't lock the scrapbook
            if there is no countdown.
        */

        if (openButton) {

            openButton.style.display =
                "none";
        }


        scrapbookUnlocked =
            true;


        document.body.classList.remove(
            "scrapbook-locked"
        );

        document.body.classList.add(
            "scrapbook-open"
        );


        createNavigation();


        setTimeout(
            () => {

                if (navigation) {

                    navigation.classList.add(
                        "visible"
                    );
                }

            },
            300
        );


    } else {

        /*
            Countdown exists.
        */

        updateCountdown();


        countdownTimer =
            setInterval(
                updateCountdown,
                1000
            );
    }


    /* =========================================================
       🌷 FINAL
    ========================================================= */

    console.log(
        "🌷 Scrapbook ready!"
    );

});
