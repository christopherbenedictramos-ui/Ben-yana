/* =====================================================
   BIRTHDAY EXPERIENCE WEBSITE
   MAIN SCRIPT ENGINE
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{



/* =====================================================
   PAGE LOADING EFFECT
===================================================== */


document.body.classList.add("page-loaded");



/* =====================================================
   GIFT BOX OPENING
   index.html
===================================================== */


const giftBox = document.querySelector(".gift-box");


if(giftBox){


giftBox.addEventListener(
"click",
()=>{


// small opening animation

giftBox.style.transform =
"scale(1.2) rotate(5deg)";



setTimeout(()=>{


window.location.href =
"choose.html";


},700);



});


}






/* =====================================================
   GIFT HOVER SOUND READY
   (Optional future audio)
===================================================== */


const hoverElements =
document.querySelectorAll(
".gift-box, .choice-card"
);



hoverElements.forEach(
(element)=>{


element.addEventListener(
"mouseenter",
()=>{


element.style.cursor="pointer";


});


});








/* =====================================================
   CHOICE CARD PAGE TRANSITION
   choose.html
===================================================== */


const choiceCards =
document.querySelectorAll(
".choice-card"
);



choiceCards.forEach(
(card)=>{


card.addEventListener(
"click",
(e)=>{


e.preventDefault();



const destination =
card.getAttribute("href");



card.style.transform =
"scale(0.9)";



card.style.opacity =
"0";



setTimeout(()=>{


window.location.href =
destination;


},400);



});


});









/* =====================================================
   FLOATING FLOWER GENERATOR
===================================================== */


function createFlower(){


const flower =
document.createElement("span");



flower.innerHTML="🌷";



flower.className =
"generated-flower";



flower.style.left =
Math.random()*100+"%";



flower.style.animationDuration =
(8 + Math.random()*8)+"s";



flower.style.fontSize =
(20 + Math.random()*30)+"px";



document.body.appendChild(flower);




setTimeout(()=>{


flower.remove();


},15000);



}



setInterval(
createFlower,
1800
);









/* =====================================================
   MEMORY PAGE
   memories.html
===================================================== */



const photos =
document.querySelectorAll(
".memory-photo"
);



photos.forEach(
(photo)=>{


photo.addEventListener(
"click",
()=>{


photo.classList.toggle(
"zoom"
);



});


});










/* =====================================================
   LETTER BOX OPENING
   memories.html
   message.html
===================================================== */


const letterButton =
document.querySelector(
".letter-button"
);



const letterBox =
document.querySelector(
".letter-box"
);



if(letterButton && letterBox){



letterButton.addEventListener(
"click",
()=>{


letterBox.classList.toggle(
"open"
);



});


}









/* =====================================================
   TYPING MESSAGE EFFECT
   message.html
===================================================== */


const typingText =
document.querySelector(
".typing-text"
);



if(typingText){


const text =
typingText.innerHTML;



typingText.innerHTML="";



let index=0;



function typeWriter(){


if(index < text.length){


typingText.innerHTML +=
text.charAt(index);



index++;



setTimeout(
typeWriter,
80
);



}


}



typeWriter();



}









/* =====================================================
   FLOWER PAGE ANIMATION
   flowers.html
===================================================== */


const flowerGarden =
document.querySelector(
".flower-garden"
);



if(flowerGarden){



for(
let i=0;
i<20;
i++
){



const petal =
document.createElement(
"div"
);



petal.className =
"petal";



petal.innerHTML =
"🌸";



petal.style.left =
Math.random()*100+"%";



petal.style.animationDelay =
Math.random()*5+"s";



flowerGarden.appendChild(
petal
);



}


}








/* =====================================================
   BACK BUTTON SUPPORT
===================================================== */


const backButtons =
document.querySelectorAll(
".back-button"
);



backButtons.forEach(
(button)=>{


button.addEventListener(
"click",
()=>{


window.history.back();



});


});









/* =====================================================
   PAGE FADE IN
===================================================== */


document.body.style.opacity="0";



setTimeout(()=>{


document.body.style.transition =
"opacity .8s ease";



document.body.style.opacity="1";



},100);

/* =====================================================
   ENVELOPE OPENING
===================================================== */


const envelopeBox = document.getElementById(
"envelopeBox"
);


const envelopeScreen =
document.getElementById(
"envelopeScreen"
);


const letterContent =
document.getElementById(
"letterContent"
);



if(envelopeBox){


envelopeBox.addEventListener(
"click",
()=>{


envelopeBox.classList.add(
"open"
);



setTimeout(()=>{


envelopeScreen.style.display =
"none";



letterContent.classList.remove(
"hidden-letter"
);



letterContent.classList.add(
"show"
);



window.scrollTo({

top:0,

behavior:"smooth"

});



},1000);



});


}
});
