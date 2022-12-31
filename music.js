import onChangeTimeSlider from "./musicConstrols.js"


const musicInfo = [
    {name: "Outsiders - Fleeting words",bc: "rgba(223, 193, 193,0.4)",from: "Nier Replicant", location: "./audio/keigo-hoashi-fleeting-words-outsider.mp3", img: "https://i.pinimg.com/originals/3d/8f/f4/3d8ff4a0b259c6569d291ac3d7d27974.jpg"},
    {name: "Wretched Weaponry", bc: "rgba(221, 9, 9, 0.4)",from: "Nier Automata",location: "./audio/wretched_weaponry.mp3", img: "./img/wretchwep.jpg" },
    {name: "Shadowlord", bc: "rgba(78, 77, 77,0.4)",from: "Nier Replicant",location: "./audio/shadowlord.mp3", img: "https://i.ytimg.com/vi/CUhvg7tkEiY/maxresdefault.jpg" },
    {name: "Sound of End - FalKKone", bc: "rgba(40, 19, 28,0.4)",from: "Nier Automata",location: "./audio/soundOfEnd-falkkone.mp3", img: "./img/soundOfEnd-Falkkone.jpg" },
    {name: "Song of Ancient - FalKKone", bc: "rgba(154, 18, 78,0.4)",from: "Nier Automata/Replicant",location: "./audio/songOfAncient-falkkone.mp3", img: "./img/songOfAncient-falkkone.png" },
    {name: "Kick Back", bc: "rgba(166, 12, 35, 0.4)",from: "Chainsaw Man",location: "./audio/chainsawOp1.mp3", img: "./img/chainsawOp1.jpg" },
    {name: "touhou - Bad Apple", bc: "rgba(198, 189, 190, 0.4)",from: "touhou",location: "./audio/touhouBadAppleOrigina.mp3", img: "./img//badAppleOrig.jpg" },
]
const musicBlock = document.querySelector('[data-music-content]')
const timeSlider = document.querySelector('.time-slider')
const timeEnd = document.querySelector('.time-end')
const sideBar = document.querySelector('.side-bar')
const volumeSlider = document.querySelector('.volume-slider')
const searchInput = document.querySelector('[data-type="search"]')
const timeStart = document.querySelector('.time-start')
let time
let paused
renderMusic(musicInfo)



sideBar.addEventListener('click',selectMusic)
searchInput.addEventListener('change',findMusic)

function selectMusic(e){
    const targ = e.target
    if(targ.dataset.musicItem ){
        const audio = targ.querySelector('[data-type="audio"]')
        if(!(targ.classList.contains('playing'))){
            timeSlider.max = Math.ceil(audio.duration)
            const timeEndTime = Math.round((audio.duration)%60) < 10 ? `0${Math.round((audio.duration)%60)}`:`${Math.round((audio.duration)%60)}`
            timeEnd.innerText = `${Math.floor((audio.duration)/60)}:${timeEndTime}`
            audio.volume = volumeSlider.value/100
            audioPlay(targ,audio)
            if(musicBlock.querySelector('[data-status="selected"]')){
                const pauseBtn = sideBar.querySelector('[data-btn="pause"]')
                pauseBtn.firstElementChild.classList.remove('fa-play')
                pauseBtn.firstElementChild.classList.add('fa-pause')
                paused = false
                timeSlider.value = 0
                time = clearInterval(time)

                const selectedAudio = musicBlock.querySelector('[data-status="selected"]')
                const selectedItem = selectedAudio.closest('.music-item')
                audioStop(selectedItem,selectedAudio)
                selectedAudio.removeAttribute('data-status')
            }
            if(time === undefined)
                time = setInterval(moveTimeSlider,1000,audio.duration,targ)
            audio.setAttribute('data-status','selected')
            
        }
    }else if(targ.dataset.btn === "pause"){
        // if(targ.firstElementChild.classList.contains(''))
        const audio = document.querySelector('.playing').querySelector('[data-type="audio"]')
        const musItme = audio.closest('.music-item')
        if(!paused){
            audioPause(audio,false)
            paused = true
            time = (clearInterval(time))

            // play icon
            targ.firstElementChild.classList.remove('fa-pause')
            targ.firstElementChild.classList.add('fa-play')
        }else{
            audioPause(audio,true)
            paused = false
            time = setInterval(moveTimeSlider,1000,audio.duration,musItme)
            // paused icon
            targ.firstElementChild.classList.remove('fa-play')
            targ.firstElementChild.classList.add('fa-pause')

        }
    }
}
function audioPlay(targ,audio){

    targ.classList.add('playing')
    audio.play()
    // audio.volume = 0.5

}
function audioStop(targ,audio){
    targ.classList.remove('playing')
    audio.currentTime = 0;
    audio.pause();
}
function audioPause(audio,isPaused){
    isPaused ? audio.play():audio.pause()
}
function renderMusic(musicInfo){
    const musicHTML = musicInfo.map(el =>{
        return `
        <div style='background-color: ${el.bc}' data-music-item="true" class="music-item">
            <div class="music-info">
                <h2>${el.name}</h2>
                <p class="music-from">${el.from}</p>
            </div>
            <div class="music-audio">
                <audio data-type="audio" src="${el.location}"></audio>
            </div>
            <div class="music-img">
                <img src="${el.img}" alt="">
            </div>
        </div>
        `
    }).join("")
    musicBlock.innerHTML = musicHTML
}
function moveTimeSlider(audioDur,targg){
    const timeValue = Number(timeSlider.value)
    timeSlider.value = timeValue + 1
    const sliderV = Number(timeSlider.value)
    timeStart.innerText = `${Math.floor((sliderV)/60)}:${Math.round((sliderV)%60) < 10 ? `0${Math.round((sliderV)%60)}`:`${Math.round((sliderV)%60)}`}`
    onChangeTimeSlider()
    if(Math.ceil(audioDur) == timeSlider.value){
        let targ = targg.nextElementSibling
        targ === null ? targ = targg.parentNode.firstElementChild : ""

        const audio = targ.querySelector('[data-type="audio"]')
        timeSlider.max = Math.ceil(audio.duration)

        const timeEndTime = Math.round((audio.duration)%60) < 10 ? `0${Math.round((audio.duration)%60)}`:`${Math.round((audio.duration)%60)}`
        timeEnd.innerText = `${Math.floor((audio.duration)/60)}:${timeEndTime}`
        audio.volume = volumeSlider.value/100
       
        audioPlay(targ,audio)

        const pauseBtn = sideBar.querySelector('[data-btn="pause"]')
        pauseBtn.firstElementChild.classList.remove('fa-play')
        pauseBtn.firstElementChild.classList.add('fa-pause')
        paused = false
        timeSlider.value = 0
        time = clearInterval(time)
        time = setInterval(moveTimeSlider,1000,audio.duration,targ)
        const selectedAudio = musicBlock.querySelector('[data-status="selected"]')
        const selectedItem = selectedAudio.closest('.music-item')
        audioStop(selectedItem,selectedAudio)
        selectedAudio.removeAttribute('data-status')
        audio.setAttribute('data-status','selected')

    }
}
function findMusic(e){
    const song = e.target.value.toLowerCase().trim()
    const newInfo = musicInfo.filter((el)=>{
        return el.name.toLowerCase().includes(song)
    })
    time = clearInterval(time)
    timeSlider.value = 0
    onChangeTimeSlider()
    renderMusic(newInfo)
    Array.from(musicBlock.children).forEach((el)=>{
        el.classList.add('searchIvent')
        setTimeout(() => {
            el.classList.remove('searchIvent')
        }, 400);
    })
}
// Управление музыкой







