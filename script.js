const songname = document.getElementById('song');
const song = document.getElementById('audioo');
const play = document.getElementById('play');
const next = document.getElementById('frente');
const capadisc = document.getElementById('imgp');
const artist = document.getElementById('artist');
const ret = document.getElementById('return');
const barprogress = document.getElementById('barp');
const pcout = document.getElementById('barc');
const timei = document.getElementById('timei');
const timef = document.getElementById('timef');


const $modal = document.getElementById('modal');

function openModal (){
    $modal.style.display = "flex";
}
function closeModal (){
    $modal.style.display = "none";
}




document.addEventListener("mousemove", parallax);

function parallax(e) {
    this.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed');

        const x = (window.innerWidth / 2 - e.pageX * speed) / 100;
        const y = (window.innerHeight / 2 - e.pageY * speed) / 100;

        layer.style.transform = `translate(${x}px, ${y}px)`;
    });
}

let isPlaying = false;

const musicone = {
 songnamex : 'The Model',
 artistx : 'kraftwerk',
 filex: 'music_(1)'
};

const musictwo = {
    songnamex : 'Feel Good Inc',
    artistx : 'Gorillaz',
    filex: 'music_(2)'
};

    const musicthree = {
        songnamex : 'Silence & Secrets',
        artistx : 'WhoMadeWho',
        filex: 'music_(4)'
   };

   const playlist = [musicone, musictwo, musicthree];
   let index = 0;


function ouvir(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;

}

function pausar(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;

}
function dicidirplay(){
    if(isPlaying == true){
        pausar();
    }
    else {
        ouvir();
    }
}


function updatetimett(){
    timef.innerText = toH(song.duration);
    
}


function iniciarsong(){
    capadisc.src = `${playlist[index].filex}.jpg`;
    song.src = `${playlist[index].filex}.mp3`;
    songname.innerText = playlist[index].songnamex;
    artist.innerText = playlist[index].artistx;

}

function returnsong(){
 if (index === 0)
 {
    index = playlist.length - 1;
 }
 else {
    index -= 1;

 }

 iniciarsong ();
 ouvir();

}


 function nextsong(){
    if (index === playlist.length - 1){
        index = 0;
    }
    else {
       index += 1;
   
    }

 iniciarsong ();
 ouvir();

}

function updateprogressbar(){
 const barwidth = (song.currentTime/song.duration)*100;
 barprogress.style.setProperty('--progress', `${barwidth}%`);
 timei.innerText = toH(song.currentTime);
 

}

function jumpto(event){
    const width = pcout.clientWidth;
    const clickposition = event.offsetX;
    const JumpToTime = (clickposition/width)* song.duration;
    song.currentTime = JumpToTime;
}

function toH(originalNumber) {
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let sec = Math.floor(originalNumber - hours*3600 - min*60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

iniciarsong();

play.addEventListener('click', dicidirplay);
ret.addEventListener('click', returnsong);
next.addEventListener('click', nextsong);
song.addEventListener('timeupdate', updateprogressbar);
song.addEventListener ('loadedmetadata', updatetimett);
pcout.addEventListener('click', jumpto);

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const score = document.querySelector(".scorevalue");
const finalscore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonplay = document.querySelector(".btn-play");

const audio = new Audio('audio.mp3');

const size = 30

const ipos = {x: 50, y: 100}
let snake = [ipos]

const incrementscore = () => {
    score.innerText = +score.innerText + 10
}
const randomnum = (min, max) =>{
    return Math.round(Math.random() * (max - min) + min)
}
const randomposition = (min, max) =>{
    const number = randomnum(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
const red = randomnum (0, 255)
const green = randomnum (0, 255)
const blue = randomnum (0, 255)

return `rgb(${red}, ${green}, ${blue})`
}

const checkeat = () => {
    const head = snake[snake.length -1]

    if(head.x == food.x && head.y == food.y){
        incrementscore()
        snake.push(head)
        audio.play()

        let x = randomposition()
        let y = randomposition()

        while (snake.find((position) => position.x == x && position.y == y)){
            x = randomposition()
            y = randomposition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()

    }

}

const gameover = () => {
direction = undefined
menu.style.display = "flex"
finalscore.innerText = score.innerText
canvas.style.filter = "blur(2px)"

}
const checkcolision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const next = snake.length - 2

   const wall = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

   const self = snake.find((position, index) => {
     return index < next && position.x == head.x && position.y == head.y
   })
        
   if(wall || self){
    gameover()
   }
}

const food = {
    x: randomposition(),
    y: randomposition(),
    color: randomColor()
}

let direction ="direita", loopid

const drawFood = () => {
    const {x, y, color} = food
    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) =>{

        if(index == snake.length -1){
            ctx.fillStyle = "White"
        }

    ctx.fillRect(position.x, position.y, size, size)

})
}

const moveSnake =() => {
    const head = snake[snake.length -1]


    if  (direction == "direita"){
        snake.push({x:head.x + size, y:head.y})

    }
    if  (direction == "esquerda"){
        snake.push({x:head.x - size, y:head.y})
}
if  (direction == "abaixo"){
    snake.push({x:head.x, y:head.y + size})
}
if  (direction == "acima"){
    snake.push({x:head.x, y:head.y - size})
}

snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for( let i = 30; i < canvas.width; i += 30) {
    ctx.beginPath()
    ctx.lineTo(i, 0)
    ctx.lineTo(i, 600)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineTo(0, i)
    ctx.lineTo(600, i)
    ctx.stroke()

    }
}


const gameloop = () => {
    clearInterval(loopid)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkeat()
    checkcolision()

 loopid = setTimeout (() => {
 gameloop()

}, 300)
}

gameloop()

document.addEventListener("keydown", ({key}) => {
 if (key == "ArrowRight" && direction != "esquerda"){
    direction = "direita"
 }
 if (key == "ArrowLeft" && direction != "direita"){
    direction = "esquerda"
 }
    if (key == "ArrowDown" && direction != "acima"){
    direction = "abaixo"
    }
       if (key == "ArrowUp" && direction != "abaixo"){
    direction = "acima"
 }
 })

 buttonplay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    location. reload()

 })
