const steps = [
    {
        text: "Hey lazy lad, can I ask you something?",
        gif: "1.gif"
    },
    {
        text: "Are you free tomorrow evening? 🥺",
        gif: "3.gif"
    },
    {
        text: "Can we go out tomorrow? " Food is on me! 🍔",
        gif: "6.gif"
    },
    {
        text: "Please? I promise I won't be annoying... much. 👉👈",
        gif: "3.gif" 
    }
];

const weepingGif = "2.webp";
const successGif = "7.gif";

const noTexts = [
    "Please aisa mat karo 🥺",
    "Dil toot jayega mera 💔",
    "Maan jao na Nuiii...",
    "Hm hm Cse ka hun n isliye? 😒",
    "Ek baar aur soch lo!",
    "Are you sure? 😤"
];

let currentStep = 0;

const textElement = document.getElementById("question-text");
const gifElement = document.getElementById("main-gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

function typeWriter(text, i = 0) {
    if (i === 0) textElement.innerHTML = "";
    if (i < text.length) {
        textElement.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 40);
    }
}

typeWriter(steps[0].text);
gifElement.src = steps[0].gif; 

function handleYes() {
    currentStep++;
    
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });

    if (currentStep >= steps.length) {
        showSuccess();
    } else {
        const nextQ = steps[currentStep];
        typeWriter(nextQ.text);
        gifElement.src = nextQ.gif;
        resetButtons();
    }
}

function handleNoInteraction() {
    if (currentStep === steps.length - 1) {
        moveNoButton();
    }
}

function handleNoClick() {
    const randomText = noTexts[Math.floor(Math.random() * noTexts.length)];
    textElement.innerText = randomText;
    
    gifElement.src = weepingGif;

    noBtn.classList.add("shake");
    setTimeout(() => {
        noBtn.classList.remove("shake");
    }, 500);

    if (currentStep === steps.length - 1) {
        moveNoButton();
    }
}

function moveNoButton() {
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

    const maxWidth = window.innerWidth - noBtn.offsetWidth - 40;
    const maxHeight = window.innerHeight - noBtn.offsetHeight - 40;

    const randomX = Math.max(20, Math.random() * maxWidth);
    const randomY = Math.max(20, Math.random() * maxHeight);

    noBtn.style.position = "fixed";
    noBtn.style.zIndex = "9999";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

function resetButtons() {
    yesBtn.style.transform = "scale(1)";
    noBtn.style.position = "static";
    noBtn.style.transform = "none";

    if (noBtn.parentNode === document.body) {
        document.querySelector('.btn-container').appendChild(noBtn);
    }
}

function showSuccess() {
    document.querySelector(".card").innerHTML = `
        <div class="gif-area">
            <img src="${successGif}" style="height:180px; border-radius:20px;">
        </div>
        <h1>Hehe I knew it u will be ready nui? ❤️</h1>
        <p style="color:#666; margin-top:15px; margin-bottom: 25px;">See you tomorrow!</p>
        
        <div class="btn-container">
            <a href="https://wa.me/918579025763?text=Okay%20I'm%20ready%20for%20tomorrow!%20What's%20the%20plan?" 
               class="wa-btn" style="background: #25D366; color: white; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: 800; display: inline-flex; align-items: center; gap: 10px;">
               Let's Plan 💬
            </a>
        </div>
    `;
    
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#00ff00', '#0000ff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#00ff00', '#0000ff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

}
