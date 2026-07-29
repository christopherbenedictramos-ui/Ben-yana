/* =====================================================
   BIRTHDAY EXPERIENCE WEBSITE
   SCRIPT ENGINE
   FULL VERSION
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


/* ===========================================
LOADING SCREEN
=========================================== */


const loading =
document.getElementById("loading-screen");


const main =
document.getElementById("main-content");



setTimeout(()=>{


if(loading){

loading.style.opacity="0";


setTimeout(()=>{

loading.style.display="none";


if(main){
main.classList.remove("hidden");
}


},1000);


}



},3000);







/* ===========================================
CREATE FLOATING PARTICLES
=========================================== */


const particleContainer =
document.getElementById("particles");



if(particleContainer){


for(let i=0;i<80;i++){


let particle =
document.createElement("div");


particle.className="particle";


particle.style.left =
Math.random()*100+"%";


particle.style.animationDuration =
(5+Math.random()*10)+"s";


particle.style.animationDelay =
Math.random()*10+"s";


let size =
Math.random()*5+2;


particle.style.width =
size+"px";


particle.style.height =
size+"px";


particleContainer.appendChild(
particle
);


}


}








/* ===========================================
BEGIN BUTTON
=========================================== */


const begin =
document.getElementById("beginBtn");



if(begin){


begin.addEventListener(
"click",
()=>{


document
.querySelector(".story")
.scrollIntoView({

behavior:"smooth"

});



startMusic();


startTyping();



confetti({


particleCount:150,

spread:100,

origin:{
y:.6
}


});



});



}









/* ===========================================
BACKGROUND MUSIC
=========================================== */


const music =
document.getElementById("bgMusic");


let playing=false;



function startMusic(){


if(!music)
return;



if(!playing){


music.volume=.35;


music.play()
.catch(()=>{});


playing=true;


}


}








/* ===========================================
STORY TYPEWRITER
=========================================== */


function startTyping(){


const text =
document.getElementById(
"typing-text"
);



if(!text)
return;



const message = `

Today is not just another ordinary day...

Today is a celebration of someone truly special.

Someone whose presence brings warmth, happiness, and beautiful moments that are worth remembering.

Your kindness, your smile, and the little things you do make the world a little brighter.

You deserve to be appreciated, celebrated, and reminded of how amazing you truly are.

So I created something special...

A little surprise made with love, just for you. 🌷


`;



let index=0;


text.innerHTML="";



let timer =
setInterval(()=>{


text.innerHTML +=
message[index];


index++;


if(index>=message.length){

clearInterval(timer);

}



},45);



}









/* ===========================================
SCROLL REVEAL
=========================================== */


const sections =
document.querySelectorAll(
".hidden-section"
);



function reveal(){


sections.forEach(section=>{


let position =
section.getBoundingClientRect()
.top;



if(position <
window.innerHeight-100){


section.classList.add(
"show"
);


}


});


}



window.addEventListener(
"scroll",
reveal
);


reveal();








/* ===========================================
REASONS SYSTEM
=========================================== */


const reasons=[


"Your smile can brighten anyone's day.",

"Your kindness makes people feel special.",

"You always try your best.",

"You make ordinary moments memorable.",

"You inspire people around you.",

"You deserve all the happiness in the world.",

"Your personality is truly unique.",

"You make life more beautiful.",

"You are someone worth celebrating.",

"You are simply amazing ❤️",

"YOU ARE MY YANA-BOOOOO"

];



let reasonIndex=0;



const reasonBox =
document.getElementById(
"reasonBox"
);



const nextReason =
document.getElementById(
"nextReason"
);




if(nextReason){


nextReason.addEventListener(
"click",
()=>{


reasonIndex++;


if(reasonIndex>=reasons.length){

reasonIndex=0;

}



reasonBox.style.opacity=0;



setTimeout(()=>{


reasonBox.innerHTML =
reasons[reasonIndex];


reasonBox.style.opacity=1;



},300);



});


}








/* ===========================================
PHOTO LIGHTBOX FIXED
=========================================== */


const images =
document.querySelectorAll(
".memory-gallery img"
);



images.forEach(img=>{


img.addEventListener(
"click",
()=>{


let box =
document.createElement(
"div"
);



box.className=
"lightbox active";



let picture =
document.createElement(
"img"
);



picture.src =
img.src;



box.appendChild(
picture
);



document.body.appendChild(
box
);



box.onclick=()=>{


box.remove();


};



});


});









/* ===========================================
CAKE BUTTON
=========================================== */


const cakeButton =
document.querySelector(
".cake button"
);



if(cakeButton){


cakeButton.addEventListener(
"click",
()=>{


confetti({


particleCount:300,

spread:160,

origin:{
y:.5
}


});



});


}









/* ===========================================
OPEN LETTER SURPRISE
=========================================== */


/* ===========================================
OPEN LETTER MODAL
=========================================== */


const letterBtn =
document.getElementById("letterBtn");


const letterModal =
document.getElementById("letterModal");


const closeLetter =
document.getElementById("closeLetter");


const letterTyping =
document.getElementById("letterTyping");



if(letterBtn){


letterBtn.addEventListener(
"click",
()=>{


letterModal.classList.add("show");


letterTyping.innerHTML="";


const message = `

To my Yana🌷

Today is not just another ordinary day...

Today is a celebration of someone who holds a very special place in my heart.

A day to appreciate you, to celebrate you, and to remind you of how truly wonderful you are.

Sometimes, we forget to tell the people who matter most how much they mean to us. So today, I want you to know that your presence is something I deeply appreciate. You have a way of bringing warmth and happiness into the lives of the people around you, often without even realizing it.

Your smile has the power to brighten moments. Your kindness makes people feel comfortable and valued. Your little gestures, your laughter, and the simple things you do create memories that become unforgettable.

I hope you always see yourself the way others see you — someone beautiful, caring, and deserving of all the happiness life has to offer.

Thank you for being the amazing person that you are. Thank you for the moments we have shared, the memories we have created, and the happiness you have brought into my life. Every conversation, every laugh, and every little moment becomes something worth remembering because it happened with you.

Please never forget that you are appreciated more than words can explain. You are someone who deserves to be celebrated, not only on your birthday but every single day.

I hope this new chapter of your life brings you endless smiles, new adventures, success in everything you do, and countless reasons to be happy. May you continue to grow, dream, and become the best version of yourself while always remembering how special you are.

So I created this little surprise for you...

Not because I needed a special occasion to remind you how amazing you are, but because you deserve moments that make you feel loved, valued, and remembered.

This little letter carries my warmest wishes, my appreciation, and a simple reminder:

You are someone truly special, and I hope you never forget that.

Happy Birthday, Yana 🌷❤️



`;



let index=0;



function write(){


if(index < message.length){


letterTyping.innerHTML +=
message.charAt(index);


index++;


setTimeout(write,45);


}


}



setTimeout(
write,
800
);



});



}




if(closeLetter){


closeLetter.addEventListener(
"click",
()=>{


letterModal.classList.remove("show");


});


}




if(letterModal){


letterModal.addEventListener(
"click",
(e)=>{


if(e.target === letterModal){


letterModal.classList.remove("show");


}


});


}









/* ===========================================
CURSOR GLOW
=========================================== */


let glow =
document.createElement(
"div"
);



glow.className =
"cursor-glow";



document.body.appendChild(
glow
);




document.addEventListener(
"mousemove",
(e)=>{


glow.style.left =
e.clientX+"px";


glow.style.top =
e.clientY+"px";



});








/* ===========================================
GSAP HERO ANIMATION
=========================================== */


if(window.gsap){


gsap.from(
".hero-card",
{


opacity:0,

y:80,

duration:2,

ease:"power4.out"


}

);


}




});