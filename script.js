/* =====================================================
   BIRTHDAY EXPERIENCE WEBSITE
   PREMIUM SCRIPT ENGINE
===================================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{
function createUnlockFlower(){


const flower =
document.createElement("span");



const flowers=[

"🌷",
"🌸",
"🌺",
"✨",
"💗"

];



flower.innerHTML =
flowers[
Math.floor(
Math.random()*flowers.length
)
];



flower.className=
"unlock-flower";



flower.style.left =
Math.random()*100+"%";



flower.style.top =
Math.random()*100+"%";



flower.style.fontSize =
(25+Math.random()*40)+"px";



document.body.appendChild(
flower
);



setTimeout(()=>{

flower.remove();

},4000);



}

/* =====================================
   BIRTHDAY DATE LOCK
===================================== */


const unlockDate = new Date("2026-08-23T00:00:00+08:00").getTime();



const lockScreen =
document.getElementById("lockScreen");


const giftScreen =
document.getElementById("giftScreen");



if(lockScreen && giftScreen){


giftScreen.style.opacity="0";


giftScreen.style.pointerEvents="none";



setInterval(()=>{


const now =
new Date().getTime();



const distance =
unlockDate - now;



if(distance <= 0){


lockScreen.style.opacity="0";


document.body.classList.add(
"birthday-unlocked"
);



setTimeout(()=>{


lockScreen.style.display="none";


giftScreen.style.opacity="1";

giftScreen.style.pointerEvents="auto";


},1200);




/* FLOWER BURST */


for(let i=0;i<30;i++){


createUnlockFlower();


}




/* CONFETTI */


if(typeof confetti !== "undefined"){


confetti({

particleCount:250,

spread:160,

origin:{
y:.5
}

});


}



return;


}


document.getElementById("days").innerHTML =
Math.floor(distance/(1000*60*60*24));


document.getElementById("hours").innerHTML =
Math.floor(distance/(1000*60*60)%24);


document.getElementById("minutes").innerHTML =
Math.floor(distance/(1000*60)%60);


document.getElementById("seconds").innerHTML =
Math.floor(distance/1000%60);



},1000);


}
/* =====================================================
   PAGE FADE IN
===================================================== */


document.body.style.opacity="0";


setTimeout(()=>{

document.body.style.transition=
"opacity .8s ease";


document.body.style.opacity="1";


},100);






/* =====================================================
   GIFT BOX OPENING
===================================================== */


const giftBox =
document.querySelector(".gift-box");



if(giftBox){


giftBox.addEventListener(
"click",
()=>{


giftBox.classList.add("open");



/* CONFETTI */

if(typeof confetti !== "undefined"){


confetti({

particleCount:150,

spread:90,

origin:{
y:.6
}

});


}



setTimeout(()=>{


window.location.href=
"choose.html";


},800);



});


}









/* =====================================================
   CHOOSE PAGE CARD ANIMATION
===================================================== */


const cards =
document.querySelectorAll(".choice-card");



cards.forEach(card=>{


card.addEventListener(
"click",
(e)=>{


e.preventDefault();



const link =
card.getAttribute("href");



card.style.transform=
"scale(.9)";



card.style.opacity=".5";



setTimeout(()=>{


window.location.href=link;


},400);



});


});









/* =====================================================
   FLOATING FLOWERS GENERATOR
===================================================== */


function createFlower(){



const flower =
document.createElement("span");







flower.innerHTML =
flowers[
Math.floor(
Math.random()*flowers.length
)
];



flower.style.left =
Math.random()*100+"%";



flower.style.fontSize =
(20+
Math.random()*25)
+"px";



flower.style.animationDuration =
(7+
Math.random()*6)
+"s";



document.body.appendChild(
flower
);



setTimeout(()=>{

flower.remove();


},14000);



}



setInterval(
createFlower,
2000
);









/* =====================================================
   MEMORY LIGHTBOX
===================================================== */



const lightbox =
document.getElementById(
"lightbox"
);



const lightboxImage =
document.getElementById(
"lightboxImage"
);



const closeLightbox =
document.getElementById(
"closeLightbox"
);




if(
lightbox &&
lightboxImage &&
closeLightbox
){



document
.querySelectorAll(".memory-photo")
.forEach(photo=>{


photo.addEventListener(
"click",
()=>{


console.log("Opening image:", photo.src);



lightboxImage.setAttribute(
"src",
photo.getAttribute("src")
);



lightbox.classList.add("show");



document.body.style.overflow="hidden";



});


});





function closeGallery(){


lightbox.classList.remove(
"show"
);



document.body.style.overflow=
"auto";


}





closeLightbox.onclick=
closeGallery;



lightbox.onclick=
(e)=>{


if(
e.target===lightbox
){

closeGallery();

}


};



document.addEventListener(
"keydown",
(e)=>{


if(
e.key==="Escape"
){

closeGallery();

}


});



}










/* =====================================================
   TYPING EFFECT
===================================================== */

const openLetterBtn =
document.getElementById("openLetterBtn");

const letterContent =
document.getElementById("letterContent");

if(openLetterBtn && letterContent){

    openLetterBtn.addEventListener("click",()=>{

        document.querySelector(".message-intro").style.display="none";

        letterContent.classList.remove("hidden-letter");

        letterContent.classList.add("show");

        startTyping();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

function startTyping(){


/* =====================================================
   MESSAGE PAGE
   OPEN LETTER BUTTON
===================================================== */

const openLetterBtn =
document.getElementById("openLetterBtn");

const letterContent =
document.getElementById("letterContent");

if(openLetterBtn && letterContent){

    openLetterBtn.addEventListener(
    "click",
    ()=>{

        openLetterBtn.style.display="none";

        letterContent.classList.remove("hidden-letter");

        letterContent.classList.add("show");

        startTyping();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}
const text =
document.querySelector(
".typing-text"
);



if(!text)return;



const message =
text.textContent.trim();



text.textContent="";



let i=0;



function typing(){



if(i < message.length){



text.textContent +=
message.charAt(i);



i++;



setTimeout(
typing,
35
);



}



}



typing();



}









/* =====================================================
   FLOWER PAGE SPARKLES
===================================================== */



const flowerPage =
document.querySelector(
".flower-page"
);



if(flowerPage){



setInterval(()=>{


const sparkle =
document.createElement(
"span"
);



sparkle.innerHTML="✨";



sparkle.style.position=
"fixed";



sparkle.style.left=
Math.random()*100+"%";



sparkle.style.top=
Math.random()*100+"%";



sparkle.style.fontSize=
"25px";



sparkle.style.animation=
"fadeSparkle 3s forwards";



sparkle.style.pointerEvents=
"none";



document.body.appendChild(
sparkle
);



setTimeout(()=>{


sparkle.remove();


},3000);



},1200);



}








/* =====================================================
   IMAGE ERROR HANDLER
===================================================== */


document
.querySelectorAll("img")
.forEach(img=>{


img.onerror=()=>{


img.style.display="none";


};


});





});
