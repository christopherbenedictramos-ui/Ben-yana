/* =====================================================
   BIRTHDAY EXPERIENCE WEBSITE
   PREMIUM SCRIPT ENGINE
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{



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



flower.className=
"generated-flower";



const flowers=[
"🌷",
"🌸",
"🌺",
"✨"
];



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


lightboxImage.src=
photo.src;



lightbox.classList.add(
"show"
);



document.body.style.overflow=
"hidden";



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
   ENVELOPE OPENING
===================================================== */



const envelope =
document.getElementById(
"envelopeBox"
);



const envelopeScreen =
document.getElementById(
"envelopeScreen"
);



const letter =
document.getElementById(
"letterContent"
);



if(
envelope &&
envelopeScreen &&
letter
){



envelope.addEventListener(
"click",
()=>{


envelope.classList.add(
"open"
);



setTimeout(()=>{


envelopeScreen.style.display=
"none";



letter.classList.remove(
"hidden-letter"
);



letter.classList.add(
"show"
);



startTyping();



},900);



});


}









/* =====================================================
   TYPING EFFECT
===================================================== */



function startTyping(){



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
