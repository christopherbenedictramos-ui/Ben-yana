/* =====================================================
   HAPPY BIRTHDAY EXPERIENCE ENGINE
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


/* =====================================================
   ELEMENTS
===================================================== */


const loading =
document.getElementById(
"loading-screen"
);


const intro =
document.getElementById(
"giftIntro"
);


const gift =
document.getElementById(
"introGift"
);


const main =
document.getElementById(
"main-content"
);


const hero =
document.getElementById(
"hero"
);


const bgMusic =
document.getElementById(
"bgMusic"
);




/* =====================================================
   INITIAL STATE
===================================================== */


// lock page scrolling

document.body.style.overflow =
"hidden";


// hide main content

main.classList.remove(
"active"
);



/* =====================================================
   LOADING SCREEN
===================================================== */


setTimeout(()=>{


if(loading){


loading.style.opacity="0";


setTimeout(()=>{


loading.style.display="none";


},1000);


}


},2000);







/* =====================================================
   GIFT OPENING
===================================================== */


if(gift){


gift.addEventListener(
"click",
()=>{


// prevent double click

gift.style.pointerEvents =
"none";



// add animation

gift.classList.add(
"gift-open"
);




// confetti

if(window.confetti){


confetti({

particleCount:250,

spread:120,

origin:{
y:.6
}

});


}





// play music

if(bgMusic){


bgMusic.volume=.35;


bgMusic.play()
.catch(()=>{});


}







setTimeout(()=>{



// remove intro screen

intro.classList.add(
"hide"
);



// unlock scrolling

document.body.style.overflow =
"auto";



// show website

main.classList.add(
"active"
);



// hero animation

gsap.fromTo(

hero,

{
opacity:0,
y:100
},

{
opacity:1,
y:0,
duration:1.5,
ease:"power3.out"
}


);



},1400);





}

);


}









/* =====================================================
   BEGIN JOURNEY
===================================================== */


const begin =
document.getElementById(
"beginBtn"
);



if(begin){


begin.addEventListener(
"click",
()=>{


const story =
document.querySelector(
".story"
);



if(story){


story.classList.remove(
"hidden-section"
);



gsap.fromTo(

story,

{
opacity:0,
y:80
},

{
opacity:1,
y:0,
duration:1

}

);



story.scrollIntoView({

behavior:"smooth"

});



startStoryTyping();



}


}

);


}










/* =====================================================
   STORY TYPEWRITER
===================================================== */


function startStoryTyping(){


const text =
document.getElementById(
"typing-text"
);



if(!text)return;



const message =

`Today is not just another ordinary day...

Today is a celebration of someone truly special.

Someone whose smile, kindness, and presence bring happiness to the people around her.

You deserve to be appreciated, celebrated, and reminded how amazing you are.

Happy Birthday, Yana-boo 🌷

I hope you like it
`;




text.innerHTML="";


let i=0;



let timer=setInterval(()=>{


text.innerHTML +=
message[i];


i++;



if(i>=message.length){


clearInterval(timer);


}



},40);



}








/* =====================================================
   SCROLL REVEAL
===================================================== */


const hiddenSections =
document.querySelectorAll(
".hidden-section"
);



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.classList.remove(
"hidden-section"
);



gsap.fromTo(

entry.target,

{
opacity:0,
y:80
},

{
opacity:1,
y:0,
duration:1

}

);


}


});


},

{
threshold:.2

}

);



hiddenSections.forEach(
(section)=>{

observer.observe(section);

}

);










/* =====================================================
   REASONS
===================================================== */


const reasons=[


"Your kindness makes every moment brighter 🌸",


"Your smile brings happiness to others 💗",


"You create beautiful memories without even trying 🌷",


"You deserve all the love and happiness in the world ✨",


"You are someone truly special ❤️"


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


nextReason.onclick=()=>{


reasonIndex++;


if(reasonIndex>=reasons.length)

reasonIndex=0;



reasonBox.innerHTML =
reasons[reasonIndex];



gsap.from(

reasonBox,

{
opacity:0,
scale:.8,
duration:.5

}

);



};


}










/* =====================================================
   CAKE BUTTON
===================================================== */


const cakeBtn =
document.getElementById(
"cakeBtn"
);



if(cakeBtn){


cakeBtn.onclick=()=>{


cakeBtn.innerHTML =
"✨ Wish Made ✨";



if(window.confetti){


confetti({

particleCount:120,

spread:100

});


}


};


}










/* =====================================================
   LETTER SYSTEM
===================================================== */


const letterBtn =
document.getElementById(
"letterBtn"
);


const modal =
document.getElementById(
"letterModal"
);


const close =
document.getElementById(
"closeLetter"
);



if(letterBtn){


letterBtn.onclick=()=>{


modal.style.display =
"flex";


typeLetter();


};


}





if(close){


close.onclick=()=>{


modal.style.display =
"none";


};


}







function typeLetter(){


const box =
document.getElementById(
"letterTyping"
);



if(!box)return;



const message =

`My Yana-boo 🌷

Happy Birthday, my Allana Marie! ❤️

On your special day, I want you to know how truly grateful I am to have you in my life. Through all the moments when I struggled to show you the love, attention, and reassurance you deserve, you still chose to stay. I know there were times when my shortcomings may have made things harder, but your patience, understanding, and unwavering presence have meant more to me than words could ever explain.

I want you to know that I will always strive to become a better person, not because I have to, but because you inspire me to grow. You make me want to love better, understand you more, and continue building a stronger and happier “us” together.

As you celebrate another year of your life, my wish for you is to always be surrounded by happiness, love, and people who appreciate the amazing person you are. I hope you continue to chase your dreams, achieve everything your heart desires, and never forget how special and valuable you are. May every challenge you face make you stronger, every moment bring you joy, and every day remind you of how loved you are.

I’m beyond grateful for you, my Allana Marie. Thank you for choosing me, for believing in me, and for staying by my side through my best moments and my imperfections. Having you in my life is one of the greatest blessings I could ever ask for, and I promise to keep doing my best to give you the love, care, and appreciation you deserve.

Thank you for all the beautiful memories, the smiles, the laughter, and every wonderful moment we’ve shared. I look forward to creating even more memories with you.

I love you more than words can express, and I always will.

Happy Birthday once again, my boo!!!! May your day be as beautiful, genuine, and wonderful as the person you are.❤️

`;



box.innerHTML="";


let i=0;


let timer=setInterval(()=>{


box.innerHTML +=
message[i];


i++;


if(i>=message.length){


clearInterval(timer);


}



},45);



}






});
