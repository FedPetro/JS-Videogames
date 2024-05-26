let navbar = document.querySelector('#navbar');
let numCard1 = document.querySelector('.number1');
let numCard2 = document.querySelector('.number2');
let numCard3 = document.querySelector('.number3');
let numCard4 = document.querySelector('.number4');
let numCard5 = document.querySelector('.number5');
let numCard6 = document.querySelector('.number6');


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


//variabile che mi serve da interruttore. E' falso perchè non abbiamo ancora incontrato l'elemento
let confirm = false

// fai partire contatori solo quando li incontri scrollando  
let observer = new IntersectionObserver ((entries) => {
    entries.forEach ((entry) => {
        if (entry.isIntersecting && confirm == false) {
            // le richiamo nell'observer le funzioni precedenti così partiranno solo quando li interseco
            createInterval(400, numCard1);
            createInterval(230, numCard2);
            createInterval(180, numCard3);
            createInterval(320, numCard4);
            createInterval(135, numCard5);
            createInterval(200, numCard6);
            // cambio a true così la condizione non è verificata e non ripartono le funzioni createInterval()
            confirm = true;
            //con setTimeout partire dopo tot secondi prima di ripartire ma il timer partirà solo quando le incontro, perchè è nella funzione observer.
                setTimeout(() => {
                    //confirm è false perchè così potrà ripartire l'animazione
                    confirm = false;
                    //il 5000 è la frequenza, 5 secondi. L'animazione ripartirà dopo 5 secondi e non ogni volta che la rincontro
                }, 5000)
        }
    })
})
observer.observe(numCard1);



// funzione icona metti nel carrello
let baskets = document.querySelectorAll('.bi-cart');
let cardsImg = document.querySelectorAll('.card-img-top');


    baskets.forEach((basket) => {
        basket.addEventListener('click', () => {
            basket.classList.toggle('bi-cart-check-fill');
            basket.classList.toggle('bi-cart');
        })
        
        

// funzione add to cart con doppio click su immagine
        cardsImg.forEach((cardImg, i) => {
            cardImg.addEventListener('dblclick', () => {
                
                basket.classList.toggle('bi-cart-check-fill');
                basket.classList.toggle('bi-cart');
            })    
        })
    })








