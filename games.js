
//generazione cards avente come oggetti i file json
fetch('./data.json')                            //collegamento al file json
.then((response) => response.json())            //standard per fetch
.then((data) => {                               //standard per fetch
    
    //generazione cards
    function showCards(array){              
        //selezione row per creazione cards nella fetch
        let row = document.querySelector('#cardWrapper');
        //selezione navbar
        let navbar = document.querySelector('#navbar');
        
        //evento scroll
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
        
        
        array.forEach((game) => {
            let divCol = document.createElement('div');  //creo il div della colonna 
            divCol.classList.add('col-6', 'col-md-4');  //gli do le classi per farlo diventare una colonna bootstrap
            //modifico il contenuto della colonna con quello che scriverei in html (innerHTML)
            divCol.innerHTML = ` 
            <div class="card border-0 position-relative" style="width: 18rem;">
            <img src="${game.url}" class="card-img-top" alt="...">
            <i class="bi bi-cart"></i>
            <div class="card-body bg-black ">
            <h5 class="card-title displayFont text-light">${game.title}</h5>
            <p class="textFont text-light">${game.price} </p>
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
    }
    //la richiamo fuori dalla fetch
    showCards(data);
    
    //creo una funzione che prendendo l'array data (insieme di oggetti json), ne clona i generi di ogni oggetto 
    function createCategories(){
        let categories = data.map((game) => game.genre); //prendi i generi dell'array di riferimento (data) e mettilo su un nuovo array
        let singolarCategory = []; //creo un array dove metterò tutte le categorie, ma non ripetute
        categories.forEach((category) => { //ciclo l'array per accedere alla categoria di ogni oggetto
            if (!singolarCategory.includes (category)){ //controllo se la categoria non si trova già nell'array vuoto ------- se l'array vuoto non contiene la categoria che sto ciclando allora...
                singolarCategory.push(category); //...mettici all'interno quella categoria
            }
            
        })
        singolarCategory.forEach((category) => { //all'interno della funzione createCategories() creo un text
            let categoryWrapper = document.querySelector('.divJS');
            let catDiv = document.createElement('div');
            catDiv.classList.add('col-12', 'col-md-4', 'textFont', 'w-100', 'd-flex', 'catEffetto');
                catDiv.innerHTML = `
                <option selected value="${category}" class="textFont catEffetto categoria" id="${category}">${category}</option>


                `  //assegnare un id ${category} permette di settare un id diverso per ogni categoria che ha lo stesso nome di essa.
                //passo le categorie ricavate dal array che ha tutte le categorie singolari (uniche)
                //selected è un attributo aggiunto per permettere più avanti di selezionare la categoria (riga 86)
                categoryWrapper.appendChild(catDiv);
        })
    }
        createCategories();

        let categoriesClass = document.querySelectorAll('.categoria'); //vado a catturare tutte le categorie che ho creato tramite createCategories() qui sopra + quella con id tutte in HTML che sarà la default al caricamento della pagina
        function filterByCategory(){
            // console.log(categoriesClass); se vado a stampare vedrò che è una nodelist... Che deve essere trasformata in un array per poter essere lavorata
            let catArray = Array.from(categoriesClass); //trasformo quindi la nodelist in un array salvandolo (catArray)
            // console.log(catArray); al click sulle categorie vedrò un array non più una nodelist
            let selected = catArray.find((categoriaClickata) => categoriaClickata.selected); // nell'array, vai a cercare l'elemento con attributo find (salvato in una variabile perchè find ritorna il primo elemento)
            console.log(selected);
            ; //salvo l'id dell'elemento clickato in una variabile
        }
            categoriesClass.forEach((categoria)=>{ 
               categoria.addEventListener('click', () => {  
                    filterByCategory();
               }) 
            })

})