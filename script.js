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


let games = [
    {name : 'Assassins Creed Shadows', price : '60€', genre : 'Action RPG', photo : './media/AC.png'},
    {name : 'Skull and Bones', price : '40€', genre : 'Action-Adventure', photo : './media/skull-and-bones.png'},
    {name : 'XDefiant', price : 'Free', genre : 'FPS', photo : './media/XDefiant.png'},
    {name : 'Star Wars', price : '60€', genre : 'Action-Adventure', photo : './media/starwars.png'},
    {name : 'Assassins Creed Mirage', price : '45€', genre : 'Action RPG', photo : './media/acm.png'},
    {name : 'The Crew Motorfest', price : '35€', genre : 'Racing', photo : './media/tcm.png'},
];

let row = document.querySelector('#cardWrapper');

function createCards(){
games.forEach((game) => {
    let divCol = document.createElement('div');
    divCol.classList.add('col-12', 'col-md-2');
    divCol.innerHTML = `
    <div class="card border-0 position-relative" style="width: 18rem;">
                    <img src="${game.photo}" class="card-img-top" alt="...">
                    <i class="bi bi-cart"></i>
                    <div class="card-body bg-black ">
                      <h5 class="card-title displayFont text-light">${game.name}</h5>
                      <p class="textFont text-light">${game.genre} </p>
                      <p class="textFont text-light number1 mt-2">Più di 0 utenti </p>
                    </div>
                        <div class="consoles mt-2">
                            <img src="./media/svg_.svg" alt="" class="consoleSize">
                            <img src="./media/svg_ (1).svg" alt="" class="consoleSize">
                            <img src="./media/svg_ (2).svg" alt="" class="consoleSize">
                            <img src="./media/svg_ (3).svg" alt="" class="consoleSize">
                        </div>
                  </div>
    `
    row.appendChild(divCol);
}) 

// funzione icona metti nel carrello (lezione like cuoricini)
let baskets = document.querySelectorAll('.bi-cart');
let cardsImg = document.querySelectorAll('.card-img-top');


    baskets.forEach((basket) => {
        basket.addEventListener('click', () => {
            basket.classList.toggle('bi-cart-check-fill');
            basket.classList.toggle('bi-cart');
        })
    })
    
// funzione add to cart con doppio click su immagine
cardsImg.forEach((cardImg, i) => {
    cardImg.addEventListener('dblclick', () => {
        // uso i perchè così l'evento carrello si attiverà solo sull'elemento corrispondente. Senza, si attiverebbero i carrelli di tutte le immagini
        baskets[i].classList.toggle('bi-cart-check-fill');
        baskets[i].classList.toggle('bi-cart');
    })    
})

}

createCards();


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




        
        










