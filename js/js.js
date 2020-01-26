var selected = 1;

var loading = false

window.addEventListener('wheel', function(event) {
    if(!loading){
        loading = true;
        var cols = document.getElementsByClassName('col-3');
        if (event.deltaY < 0) {
            Object.keys(cols).forEach(function (key){
                cols[key].classList.add("slide-right")
                // cols[key].classList.add("flip-right")
            });
            setTimeout(function(){
                Object.keys(cols).forEach(function (key){
                    cols[key].classList.remove("slide-right")
                    // cols[key].classList.remove("flip-right")
                });
                changeColumns("up");
                loading = false;
            }, 1000);
            // console.log('scrolling up\nselected: ' + selected);
        }
        else if (event.deltaY > 0) {
            // console.log('scrolling down\nselected: ' + selected);
            Object.keys(cols).forEach(function (key){
                cols[key].classList.add("slide-left")
            });
            setTimeout(function(){
                Object.keys(cols).forEach(function (key){
                    cols[key].classList.remove("slide-left")
                });
                changeColumns("down");
                loading = false;
            }, 1000);
        }
    }
});

function getValue(val, scroll) {
    if (scroll == "up") {
        val--;
        if (val == 0) {
            val = 5;
        }
    }
    else if (scroll == "down") {
        val++;
        if (val == 6) {
            val = 1;
        }
    }

    return val
}

function changeColumns(scroll) {
    selected = getValue(selected, scroll);

    var el10 = document.getElementsByClassName('col10')[0];
    var el0 = document.getElementsByClassName('col0')[0];
    var el1 = document.getElementsByClassName('col1')[0];
    var el2 = document.getElementsByClassName('col2')[0];
    var el3 = document.getElementsByClassName('col3')[0];
    var el4 = document.getElementsByClassName('col4')[0];
    var el14 = document.getElementsByClassName('col14')[0];

    var placeholder = "col"

    var edge0 = getValue(selected, "up");
    var edge1 = getValue(edge0, "up");
    var edge10 = getValue(edge1, "up");
    var edge2 = getValue(selected, "down");
    var edge3 = getValue(edge2, "down"); 
    var edge14 = getValue(edge3, "down");


    el10.innerHTML = edge10;
    el10.id = placeholder+edge10.toString();

    el0.innerHTML = edge1;
    el0.id = placeholder+edge1.toString();

    el1.innerHTML = edge0;
    el1.id = placeholder+edge0.toString();

    el2.innerHTML = selected;
    el2.id = placeholder+selected.toString();

    el3.innerHTML = edge2;
    el3.id = placeholder+edge2.toString();

    el4.innerHTML = edge3;
    el4.id = placeholder+edge3.toString();

    el14.innerHTML = edge14;
    el14.id = placeholder+edge14.toString();
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            changeColumns("down");
        } else {
            /* right swipe */
            changeColumns("up");
        }                       
    }
    // else {
    //     if ( yDiff > 0 ) {
    //         /* up swipe */ 
    //     } else { 
    //         /* down swipe */
    //     }                                                                 
    // }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

function resize() {
    width = document.getElementsByClassName('col-3')[0].clientWidth;
    var remain = (6*30 + width*3 + width/2) - document.getElementsByClassName('cont')[0].clientWidth/2;
    var cols = document.getElementsByClassName('col-3');
    Object.keys(cols).forEach(function (key){
        cols[key].setAttribute("style", "left: -" + remain + "px");
    });

    widthTransformation = width+30*2;
    document.documentElement.style.setProperty('--width', widthTransformation+"px");
    document.documentElement.style.setProperty('--negWidth', "-"+widthTransformation+"px");
}

var width;
var widthTransformation;
window.addEventListener('load', resize);
window.addEventListener('resize', resize);