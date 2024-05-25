let navbar = document.querySelector('#navbar');
let number1 = document.querySelector('.number1');
let number2 = document.querySelector('.number2');
let number3 = document.querySelector('.number3');
let number4 = document.querySelector('.number4');
let number5 = document.querySelector('.number5');
let number6 = document.querySelector('.number6');


// scroll navbar: da su a giù e più piccola senza transizione
window.addEventListener ('scroll', () => {
    if (window.scrollY > 400){     
        navbar.classList.remove('fixed-top');
        navbar.classList.add('widthScroll');
        navbar.classList.add('fixed-bottom')
    }else {
        navbar.classList.remove('fixed-bottom');
        navbar.classList.remove('widthScroll');
        navbar.classList.add('fixed-top')
    }
});



// fai partire contatori
// la generalizzo così che posso settare valori diversi per i contatori di ogni card
function createInterval (numToReach, num){
let counter = 0;
let interval = setInterval (() => {
        if (counter < numToReach ){
            counter++;
            num.innerHTML = `Più di ${counter}k utenti`
        } else{
            clearInterval(interval)
        }
})      
};
// le richiamo nell'observer così partiranno solo quando li interseco




// fai partire contatori solo quando li incontri scrollando
let observer = new IntersectionObserver ((entries) => {
    entries.forEach ((entry) => {
        if (entry.isIntersecting) {
            createInterval(400, number1);
            createInterval(230, number2);
            createInterval(180, number3);
            createInterval(320, number4);
            createInterval(135, number5);
            createInterval(200, number6);
        }
    })
})
observer.observe(number1);


