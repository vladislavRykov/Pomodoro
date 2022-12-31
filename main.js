const seconds = document.querySelector('[data-seconds]')
const minutes = document.querySelector('[data-minutes]')
const hours = document.querySelector('[data-hours]')
const semis = document.querySelectorAll('.semis')
const timerStatus = document.querySelector('.timer-status')
const timerBlock = document.querySelector('.timer-block')
const counter = document.querySelector('.counter')
const timeChooser = document.querySelector('[data-type="timeChooser"]')



let futureTime
let angleChanged = 360
let defSec = seconds.textContent
let defMin = minutes.textContent
let defHour = hours.textContent

const defBreak = {
    defSecB: "00",
    defMinB: "00",
    defHourB: 0
}

let startMin
let startSec
let startHours
let setTime
const btnStartStop = document.querySelector('.btn-start')
const btnReset = document.querySelector('.reset')
let int
let circles

btnStartStop.addEventListener('click',(e) =>{
    if(e.target.dataset.type == "start"){
        startMin = minutes.textContent
        startSec = seconds.textContent
        startHours = hours.textContent
        setTime = (startHours*3600 + startMin*60 + Number(startSec))*1000
        int = setInterval(timer,1000)
        btnStartStop.setAttribute('data-type',"close")
        btnStartStop.textContent = "Stop"
        futureTime = setTime + Date.now()
        circles = setInterval(moveCircles,0,angleChanged)
        timeChooser.style.display = "none"
        timerStatus.style.pointerEvents = 'none'

    } else{
        int = clearInterval(int)
        circles = clearInterval(circles)

        btnStartStop.setAttribute('data-type',"start")
        btnStartStop.textContent = "Start"
    }
 
})

btnReset.addEventListener('click',function(){
    int = clearInterval(int)
    circles = clearInterval(circles)
    defaultCircles()
    angleChanged = 360
    counter.innerText = 0
    timerBlock.classList.add('opacity')
    setTimeout(()=>{
        timerBlock.classList.remove('opacity')
        seconds.textContent = defSec
        minutes.textContent = defMin
        hours.textContent = defHour
        timeChooser.style.display = "block"
        timerStatus.style.pointerEvents = 'auto'

    },800)
    if(btnStartStop.getAttribute('data-type') == "close"){
        btnStartStop.setAttribute('data-type',"start")
        btnStartStop.textContent = "Start"
    }

    
})

timerStatus.addEventListener('click',changeTimer)
timeChooser.addEventListener('input',onTimeChooser)
onTimeChooser()


function timer(){
    if(seconds.textContent != 0){
        seconds.textContent--
        seconds.textContent < 10 ? seconds.textContent = "0"+seconds.textContent:""
    }else if(minutes.textContent != 0 && seconds.textContent == 0){
        seconds.textContent = 59
        minutes.textContent--
        minutes.textContent < 10 ? minutes.textContent = "0"+minutes.textContent:""
    }else if(hours.textContent != 0 && minutes.textContent == 0 && seconds.textContent == 0){
        hours.textContent--
        minutes.textContent = 59
        seconds.textContent = 59
    }
    
}
function moveCircles(angleChangedn){
    const currentTime = Date.now()
    const remainingTime = futureTime - currentTime
   
    const angle = (remainingTime/setTime)*angleChangedn
    angleChanged = angle

    if(angleChanged>180){
        semis[0].style.transform = `rotate(${angleChanged}deg)`
    }else{
        semis[0].style.transform = `rotate(${angleChanged}deg)`
        semis[1].style.transform = `rotate(${angleChanged+180}deg)`
        semis[2].style.display = 'block'
    }
    if(remainingTime<0){
        circles = clearInterval(circles)
        int = clearInterval(int)
        defaultCircles()
        if(timerStatus.innerText === "Study"){
            angleChanged = 360
            changeToBreak()
            startMin = defBreak.defMinB
            startSec = defBreak.defSecB
            startHours = defBreak.defHourB
            setTime = (startHours*3600 + startMin*60 + Number(startSec))*1000
            futureTime = setTime + Date.now()
            circles = setInterval(moveCircles,0,angleChanged)
            int = setInterval(timer,1000)
        }else{
            counter.innerText = Number(counter.innerText) + 1
            angleChanged = 360
            changeToStudy()
            startMin = defMin
            startSec = defSec
            startHours = defHour
            setTime = (startHours*3600 + startMin*60 + Number(startSec))*1000
            futureTime = setTime + Date.now()
            circles = setInterval(moveCircles,0,angleChanged)
            int = setInterval(timer,1000)
        }

    }
}
function defaultCircles(){
    semis[2].style.display = 'none'
    semis[0].style.transform = `unset`
    semis[1].style.transform = `unset`
}

function changeTimer(){
    if(timerStatus.innerText === "Study"){
        changeToBreak()
    }else{   
        changeToStudy()
    }
}

function onTimeChooser(){
    const inputVal = timeChooser.value
    if(inputVal < 60){
        timerStatus.innerText === "Study" ? defMin = inputVal:""
        timerStatus.innerText === "Break" ? defBreak.defMinB = (inputVal<10 ? `0${inputVal}`:inputVal):""

        minutes.innerText = (inputVal<10 ? `0${inputVal}`:inputVal)
        hours.innerText = 0
        timerStatus.innerText === "Study" ? defHour = 0: defBreak.defHourB = 0
    }else{
        const hrs = Math.floor(inputVal/60)
        const mts = inputVal%60 < 10 ? `0${inputVal%60}`:inputVal%60
        if(timerStatus.innerText === "Study"){
            defMin = mts
            defHour = hrs
        } 
        else {
            defBreak.defMinB = mts
            defBreak.defHourB = hrs
        }
        minutes.innerText = mts
        hours.innerText = hrs
    }
}


function changeToBreak(){
    timerBlock.style.transform = 'rotate(360deg) scale(0.7)'
    timerBlock.style.left = '130%'
    setTimeout(()=>{
        timerStatus.innerText = "Break"
        seconds.innerText = defBreak.defSecB
        minutes.innerText = defBreak.defMinB
        hours.innerText = defBreak.defHourB
        timerBlock.style.backgroundColor = 'rgb(212, 50, 50)'
        timerBlock.querySelector('.circle-cover').style.backgroundColor = 'rgb(212, 50, 50)'
        timerBlock.querySelector('.timerTime').style.color = 'rgb(212, 50, 50)'
        timerStatus.style.color = 'rgb(212, 50, 50)'
        timerBlock.querySelector('.time').style.backgroundColor = 'rgb(238, 206, 206)'
        timerBlock.querySelectorAll('.brothers').forEach(el=>{
            el.style.backgroundColor = 'rgb(109, 29, 29)'
        })
        timerBlock.querySelector('.circle-3').style.backgroundColor = 'rgb(212, 50, 50)'
        timerBlock.style.transform = 'rotate(-360deg) scale(1)'
        timerBlock.style.left = '0'
        timeChooser.min = 5

    },600)
}
function changeToStudy(){
    timerBlock.style.transform = 'rotate(360deg) scale(0.7)'
    timerBlock.style.left = '130%'
    setTimeout(()=>{
        timerStatus.innerText = "Study"
        seconds.innerText = defSec
        minutes.innerText = defMin
        hours.innerText = defHour
        timerBlock.style.backgroundColor = 'aqua'
        timerBlock.querySelector('.circle-cover').style.backgroundColor = 'aqua'
        timerBlock.querySelector('.timerTime').style.color = 'aqua'
        timerStatus.style.color = 'aqua'
        timerBlock.querySelector('.time').style.backgroundColor = 'white'
        timerBlock.querySelectorAll('.brothers').forEach(el=>{
            el.style.backgroundColor = 'rgb(98, 151, 160)'
        })
        timerBlock.querySelector('.circle-3').style.backgroundColor = 'aqua'
        timerBlock.style.transform = 'rotate(-360deg) scale(1)'
        timerBlock.style.left = '0'
        timeChooser.min = 10

    },600)
}


