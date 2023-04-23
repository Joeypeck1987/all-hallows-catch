const screens = document.querySelectorAll('.screen')
const choose_hallow_btns = document.querySelectorAll('.choose-hallow-btn')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')

let seconds = 0
let score = 0

let selected_hallow = {}

start_btn.addEventListener('click', () => screens
[0].classList.add('up'))

choose_hallow_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_hallow = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createHallow, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createHallow() {
    const hallow = document.createElement('div')
    hallow.classList.add('hallow')
    const { x, y } = getRandomLocation()
    hallow.style.top = `${y}px`
    hallow.style.left = `${x}px`
    hallow.innerHTML = `<img src="${selected_hallow.src}" alt="${selected_hallow.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    hallow.addEventListener('click', catchHallow)

    game_container.appendChild(hallow)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchHallow() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addHallow()
}

function addHallow() {
    setTimeout(createHallow, 1000)
    setTimeout(createHallow, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    } 
    scoreEl.innerHTML = `Score: ${score}`
}