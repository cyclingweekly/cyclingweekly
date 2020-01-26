var circles = document.querySelectorAll('circle');
var circleOuter = circles[0];
var circleInner = circles[1];
var radiusOuter = circleOuter.r.baseVal.value;
var radiusInner = circleInner.r.baseVal.value;
var circumferenceOuter = radiusOuter * 2 * Math.PI;
var circumferenceInner = radiusInner * 2 * Math.PI;

function restartOuterCircle() {
    circleOuter.style.strokeDasharray = `${circumferenceOuter} ${circumferenceOuter}`;
    circleOuter.style.strokeDashoffset = `${circumferenceOuter}`;
}

function restartInnerCircle() {
    circleInner.style.strokeDasharray = `${circumferenceInner} ${circumferenceInner}`;
    circleInner.style.strokeDashoffset = `${circumferenceInner}`;
}

function restartCircles() {
    restartOuterCircle();
    restartInnerCircle();
}

function setProgressOuter(percent) {
  const offset = circumferenceOuter - percent / 100 * circumferenceOuter;
  circleOuter.style.strokeDashoffset = offset;
}
function setProgressInner(percent) {
  const offset = circumferenceInner - percent / 100 * circumferenceInner;
  circleInner.style.strokeDashoffset = offset;
}

restartCircles();

var flash = document.getElementById("flash");
var start = document.getElementById("start");
var kmh = document.getElementById("kmh");
var inner = document.getElementById("inner-circle-stroke");
var timer = document.getElementById("timer");
var sets = document.getElementById("sets");

var currentOuter = 0;
var intervalOuter;
var minutesOuter;
var currentInner = 0;
var intervalInner;
var minutesInner;

var currentTimerMinutes;
var currentTimerSeconds = 0;
var intervalTimer;

var zone = ["13-19", "19-26", "26-32", "32+"];
var zonecolor = ["#8debbc", "#ffdc86", "#ffb893", "#d33f49"]

function addToOuter() {
    var percent = 10/(minutesOuter*60);
    currentOuter += percent;
    setProgressOuter(currentOuter);
    if(currentOuter >= 100)
        clearInterval(intervalOuter);
}

function addToInner() {
    var percent = 10/(minutesInner*60);
    currentInner += percent;
    setProgressInner(currentInner);
    if(currentInner >= 100)
        clearInterval(intervalInner);
}

function setCountdown() {
    var s = "";
    if(currentTimerMinutes > 9)
        s += currentTimerMinutes;
    else
        s += "0" + currentTimerMinutes;
    s += ":";
    if(currentTimerSeconds > 9)
        s += currentTimerSeconds;
    else
        s += "0" + currentTimerSeconds;
    
    timer.innerHTML = s;
}

function countdown() {
    currentTimerSeconds--;
    if(currentTimerSeconds < 0) {
        currentTimerSeconds = 0;
        currentTimerMinutes--;
        currentTimerSeconds = 59;
    }
    setCountdown();
    if(currentTimerMinutes <= 0 && currentTimerSeconds <= 0) {
        clearInterval(intervalTimer);
    }
}

function sleep(min) {
    return new Promise(resolve => setTimeout(resolve, min*60000));
}

function reset(z) {
    flash.style.backgroundColor = zonecolor[z-1];
    flash.classList.remove("hidden");
    flash.classList.add("flash-screen");
    setTimeout(function() {
        flash.classList.add("hidden");
        flash.classList.remove("flash-screen");
    }, 500);
}

async function startWeek1() {
    var z;
    start.classList.remove("button");
    start.attributes.removeNamedItem("onclick");
    kmh.classList.remove("hidden");
    minutesOuter = 40;
    intervalOuter = setInterval(addToOuter, 100);

    z = 1;
    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "05:00";
    sets.innerHTML = "1/10";
    minutesInner = 5;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 2;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "05:00";
    sets.innerHTML = "2/10";
    minutesInner = 5;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 3;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "03:00";
    sets.innerHTML = "3/10";
    minutesInner = 3;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 1;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "02:00";
    sets.innerHTML = "4/10";
    minutesInner = 2;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 2;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "05:00";
    sets.innerHTML = "5/10";
    minutesInner = 5;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 3;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "03:00";
    sets.innerHTML = "6/10";
    minutesInner = 3;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 1;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "02:00";
    sets.innerHTML = "7/10";
    minutesInner = 2;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 2;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "05:00";
    sets.innerHTML = "8/10";
    minutesInner = 5;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 3;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "03:00";
    sets.innerHTML = "9/10";
    minutesInner = 3;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    currentInner = 0;

    z = 1;
    reset(z);

    inner.style.stroke = zonecolor[z-1];
    kmh.style.color = zonecolor[z-1];
    start.style.color = zonecolor[z-1];
    start.innerHTML = zone[z-1];
    timer.innerHTML = "02:00";
    sets.innerHTML = "10/10";
    minutesInner = 2;
    currentTimerMinutes = minutesInner;
    intervalInner = setInterval(addToInner, 100);
    intervalTimer = setInterval(countdown, 1000);

    await sleep(minutesInner);
    clearInterval(intervalOuter);
    clearInterval(intervalInner);
    clearInterval(intervalTimer);
}
