let board = document.getElementById('boardd');

let content = ""

function getRandomNumbers() {
    const numbers = [];
    while (numbers.length < 24) {
        let randomNumber = Math.floor(Math.random() * 24) + 1;
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }
    return numbers;
}

let imagenumbers = [];

function FillRandom(randoms) {
    for (let index = 0; index < 24; index++) {
        let ind = randoms[index];
        if (ind > 12) ind -= 12;
        imagenumbers.push(ind);
        content += `<div class="start-div" id=${index + 1} >
        <img class='for-start' id=img${index + 1} src=images/img${ind}.jpg alt='dr'>
        </div>`
    }
}

let firstclick = 25;
let secondclick = 25;

let elements = [];
let isfirst = true;
let move = 0;
let point = 0;


let time = document.getElementById('time');
let pointe = document.getElementById('point');
let movee = document.getElementById('move');

let lastid=25;


function Show(id) {
    let element = document.getElementById(id);
    let elementimg = document.getElementById(`img${id}`);
    if (isfirst && id!=lastid) {
        lastid=id;
        if (firstclick == 25) {
            firstclick = id - 1;
            elements.push(element)
            elements[1] = elementimg;
        }
        else {
            secondclick = id - 1;
            elements[2] = element;
            elements[3] = elementimg;
            isfirst = false;
            clear();
        }
        element.style.transform = 'rotateY(180deg)';
        elementimg.style.transform = 'rotateY(180deg)';
        elementimg.style.visibility = 'visible';
    }
}


function clear() {
    if (point == 12) alert('win');;
    let result = check();
    if (result) {
        point++;
        setTimeout(() => {
            for (let i = 0; i < elements.length; i++) {
                if (i % 2 == 0) {

                    elements[i].style.height = "0";
                    elements[i].style.width = "0";

                }
                else {
                    elements[i].style.visibility = 'hidden';
                }
            }
            pointe.innerHTML = point;
            isfirst = true;
            elements = [];
            firstclick = 25;
            secondclick = 25;
        }, 2000);
    }
    else {
        setTimeout(() => {
            for (let i = 0; i < elements.length; i++) {
                if (i % 2 == 0) {
                    elements[i].style.transform = 'rotateY(0deg)';
                }
                else {

                    elements[i].style.visibility = 'hidden';
                }
            }
            isfirst = true;
            elements = [];
            firstclick = 25;
            secondclick = 25;
        }, 2000);
    }
    move++;
    movee.innerHTML = move;
}


function check() {
    return imagenumbers[secondclick] == imagenumbers[firstclick];
}

function start() {
    isfirst = true;
    elements = [];
    firstclick = 25;
    secondclick = 25;
    content = "";
    move = 0;
    point = 0;
    movee.innerHTML=0;
    pointe.innerHTML=0;
    time.innerHTML="02:00";
    imagenumbers = [];
    lastid=25;
    FillRandom(getRandomNumbers());
    board.innerHTML = content;
    let imgs = document.getElementsByClassName('for-start');
    let starts = document.getElementsByClassName('start-div');
    console.log(starts)
    setTimeout(() => {
        for (let i = 0; i < starts.length; i++) {
            console.log(starts[i])
            starts[i].addEventListener('click', function() {
                Show(this.id);
            });
            
        }
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.visibility = 'hidden';
        }
        startTimer(2);
    }, 4000)
}
start();




function startTimer(duration) {
    let timer = duration * 60;
    const timerInterval = setInterval(function () {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        let t = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

        if (--timer < 0) {
            clearInterval(timerInterval);
            alert('Game Over');
            start();
        }
        time.innerHTML = t;
    }, 1000);
}

