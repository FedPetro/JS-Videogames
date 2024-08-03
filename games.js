
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
                navbar.classList.add('w-100');
                navbar.classList.add('ms-0');
            }else {
                navbar.classList.remove('fixed-bottom');
                navbar.classList.remove('widthScroll');
                navbar.classList.add('fixed-top')
            }
        });
        
        row.innerHTML = ''; //svuoto il contenitore ogni volta che lancio la funzione altrimenti vedrei sempre tutte le carte, anche se filtro per categorie... Quelle filtrate le vedrei all'ultimo
        array.forEach((game) => {
            let divCol = document.createElement('div');  //creo il div della colonna 
            divCol.classList.add('col-6', 'col-md-4');  //gli do le classi per farlo diventare una colonna bootstrap
            //modifico il contenuto della colonna con quello che scriverei in html (innerHTML)
            divCol.innerHTML = ` 
            <div class="card border-0 position-relative marginCard" >
            <img src="${game.url}" class="card-img-top imageCard" alt="...">
            <i class="bi bi-cart"></i>
            <div class="card-body">
            <h5 class="card-title displayFont text-light text-truncate" title="${game.title}">${game.title}</h5>
            <p class="textFont">${game.price} </p>
            <p class="textFont">${game.genre} </p>
            </div>
            <div class="consoles pt-2 text-center">
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
            <input type="radio" name="flexRadioDefault" id="${category}" class="form-check-input me-2">
            <label class="form-check-label" for="${category}">${category}</label>`
            //assegnare un id ${category} permette di settare un id diverso per ogni categoria che ha lo stesso nome di essa.
            //passo le categorie ricavate dal array che ha tutte le categorie singolari (uniche)
            //selected è un attributo aggiunto per permettere più avanti di selezionare la categoria (riga 86)
            categoryWrapper.appendChild(catDiv);
            // console.log(catDiv);
        })
    }
        createCategories();

        let inputsCategories = document.querySelectorAll('.form-check-input'); //vado a catturare tutte le categorie che ho creato tramite createCategories() qui sopra + quella con id tutte in HTML che sarà la default al caricamento della pagina
        function filterByCategory(array){
            // console.log(categoriesClass); se vado a stampare vedrò che è una nodelist... Che deve essere trasformata in un array per poter essere lavorata
            let categoriesArray = Array.from(inputsCategories); //trasformo quindi la nodelist in un array salvandolo (catArray)
            // console.log(catArray); al click sulle categorie vedrò un array non più una nodelist
            let selected = categoriesArray.find((ClickedCategory) => ClickedCategory.checked); // nell'array, vai a cercare l'elemento con attributo checked (salvato in una variabile perchè find ritorna il primo elemento)          
            let category = selected.id //salvo l'id dell'elemento clickato in una variabile  
                if(category != 'Tutte'){ // se l'id dell'elemento selezionato è diverso dall'id dell'input di default
                    let filtered = array.filter((game) => game.genre == category); //prendi l'array data che contiene tutti i giochi e per ogni gioco controlla se il genere è uguale al nome della categoria. Se è così pushala in un nuovo array
                    // showCards(categoriesFiltered); //crea le cards solo di quella categoria selezionata
                    return filtered     //estraggo il valore che mi servirà poi per combinare i filtri
                }else{
                    // showCards(data) //altrimenti mostrale tutte (sono contenute in data)
                    return array     //estraggo il valore che mi servirà poi per combinare i filtri
                }
        }

        //filtra per prezzo 
        let priceInput = document.querySelector('#priceInput');
        let priceLabel = document.querySelector('#priceLabel'); //catturo l'input col pallino per il range di prezzo

        function findMaxPrice(){ //vai a trovare il prezzo più alto tra tutti i giochi
            let prices = data.map((game) => +game.price);      //creo un nuovo array tramite il map dove vado a salvare solo i prezzi di ogni gioco. Il + prende la stringa e la trasforma in numero.
            let maxPrice = Math.ceil(Math.max(...prices));     //tramite spread operator vado ad estrarre il numero più alto tra tutti quanti
            priceInput.max = maxPrice;      //assegno all'attributo max il prezzo più alto trovato
            priceInput.value = Math.ceil(maxPrice);        //al caricamento della pagina metti la barra al massimo mostrando tutti i giochi
            priceLabel.innerHTML = `€ ${maxPrice}`; //il prezzo di default che vedo al caricamento della pagina è il più alto
        }

        findMaxPrice();

        function filterByPrice(array){
            let filtered = array.filter((game) => game.price <= +priceInput.value);        //filtra l'array data che contiente tutti i giochi e prendi solo i giochi con un prezzo minore o ugale  
            //showCards(filtered)
            return filtered     //estraggo il valore che mi servirà poi per combinare i filtri
        }



        //filtra per parola
        let inputName = document.querySelector('#inputName'); //catturo l'input della searchbar

        function filterByWord(array){        
            let searchedTitle = inputName.value;    //il titolo del gioco (searchedValue) prendilo da ciò che scrivo in inputName
            let filtered = array.filter((game) => game.title.toLowerCase().includes(searchedTitle.toLowerCase()));       //filtra tutti i giochi (data) e lancia il filter accedendo al gioco singolo e controlla se nel titolo include searchedTitle con un prezzo < o = a quello settato dal pallino
            //il .toLowerCase() mi permetterà di trovare quel gioco anche se scritto in maiuscolo o minuscolo
            //      //crea una card per l'elemento filtrato
            return filtered     //estraggo il valore che mi servirà poi per combinare i filtri
        }


        //lancia tutti i filtri contemporaneamente
        function globalFilter(){
            let filteredByCategory = filterByCategory(data);          //filtra l'insieme di giochi(data) poi...
            let filteredByPrice = filterByPrice(filteredByCategory);    //...da questo array filtra di nuovo...
            let filteredByWord = filterByWord(filteredByPrice);          //...e poi di nuovo
            showCards(filteredByWord);
        }

            inputsCategories.forEach((category)=>{ //per ogni input lancia l'evento...
               category.addEventListener('click', () => {  //... di tipo click...
                globalFilter(); //... e vai a filtrare
                    //riga 27 svuoto il contenitore
               }) 
            })

        inputName.addEventListener('input', () => { 
            globalFilter();
        })

        priceInput.addEventListener('input', () => {
            priceLabel.innerHTML = `€ ${+priceInput.value}`;    //quando sposto il pallino mostra i prezzi in base a dov'è
            globalFilter()     //lancia la funzione di filtraggio quando muovo il pallino 
        })       
})