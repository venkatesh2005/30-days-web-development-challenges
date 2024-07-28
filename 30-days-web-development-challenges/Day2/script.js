const colors = {
    brown: [
        "images/brown1.png",
        "images/brown2.png",
        "images/brown3.png",
        "images/brown4.png",
        "images/brown5.png",
        "images/brown6.png",
        "images/brown7.png",
        "images/brown8.png"
    ],
    black: [
        "images/black1.png",
        "images/black2.png",
        "images/black3.png",
        "images/black4.png",
        "images/black5.png",
        "images/black6.png",
        "images/black7.png",
        "images/black8.png"
    ]
};

document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('click', () => {
        const color = box.getAttribute('data-color');
        const newImages = colors[color];
        
        const slider = document.querySelector('.slider');
        slider.innerHTML = ''; 
        newImages.forEach((src, index) => {
            const div = document.createElement('div');
            div.classList.add('slider-item');
            if (index === 0) div.classList.add('active');
            const img = document.createElement('img');
            img.src = src;
            div.appendChild(img);
            slider.appendChild(div);
        });

        addEventListeners();
    });
});

let slidePosition = 0;
let sliders = document.querySelectorAll('.slider-item');
const totalSliders = sliders.length;
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

btnPrev.addEventListener('click', prevSlide);
btnNext.addEventListener('click', nextSlide);

function updatePosition() {
    sliders.forEach(slide => {
        slide.classList.remove('active');
        slide.classList.add('hidden');
    });

    dots.forEach(dot => {
        dot.classList.remove('dot-active');
    });

    sliders[slidePosition].classList.add('active');
    dots[slidePosition].classList.add('dot-active');
}

function prevSlide() {
    if (slidePosition === 0) {
        slidePosition = totalSliders - 1;
    } else {
        slidePosition--;
    }
    updatePosition();
}

function nextSlide() {
    if (slidePosition === totalSliders - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    updatePosition();
}

const dotContainer = document.querySelector('.dots');
sliders.forEach(slide => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');
dots[slidePosition].classList.add('dot-active');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        slidePosition = index;
        updatePosition();
    });
});

function addEventListeners() {
    sliders = document.querySelectorAll('.slider-item');
    totalSliders = sliders.length;

    dots.forEach(dot => {
        dot.removeEventListener('click', handleDotClick);
    });

    dotContainer.innerHTML = '';
    sliders.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('dot-active');
        dot.addEventListener('click', () => {
            slidePosition = index;
            updatePosition();
        });
        dotContainer.appendChild(dot);
    });

    dots = document.querySelectorAll('.dot');
}

const boxes = document.querySelectorAll('.box');
const display = document.getElementById('display');

boxes.forEach(box => {
    box.addEventListener('click', () => {
        boxes.forEach(b => b.classList.remove('active'));
        box.classList.add('active');
        const content = box.querySelector('p').textContent;
        display.textContent = content;
    });
});


const minusBtn=document.querySelector('#minus');
const plusBtn=document.querySelector('#plus');
const qtyTxt=document.querySelector('#qty')

minusBtn.addEventListener('click',()=>{
    let qty=parseInt(qtyTxt.value);
    if(qty>0){
        qty--;
        qtyTxt.value=qty;
    }
});

plusBtn.addEventListener('click',()=>{
    let qty=parseInt(qtyTxt.value);
    if(qty>0){
        qty++;
        qtyTxt.value=qty;
    }
});