let restaurants = [

    {

        'name': 'McDonalds',
        'rating': [3],
        'comments': 1523,
        'food': [

            {
                'foodname': 'Big Mac',
                'description': '1 Klassiker + 1 Beilage + 1 Getränk. Bei Auswahl pfandpflichtiger Getränke erhöht sich der Endpreis um das Pfand (+ 0,25 € EINWEG). Infos zu Allergenen u. Zusatzstoffen siehe jew. Einzelprodukt der Kategorien Burger, McNuggets oder McPlant.',
                'img': "./img/bigmac.avif",
                'amount': 1,
                'price': 11.49,
            },

            {
                'foodname': 'McMenu',
                'description': 'Du kriegst von unseren Nuggets einfach nicht genug? Dann probiere jetzt mal unsere neuen McPlant® Nuggets auf Basis von Weizen- und Erbsenprotein (kann in der Küche in Kontakt mit Hähnchenprodukten gekommen sein). Außen knusprig und innen herzhaft-saftig. Echter McDonald\'s Geschmack zum Teilen und Dippen. Beyond Meat® and the Beyond Meat logo are registered trademarks of Beyond Meat, Inc.',
                'img': "./img/mcchicken.avif",
                'amount': 1,
                'price': 10.49,
            },

            {
                'foodname': 'Big Tasty Bacon',
                'description': '1 Klassiker + 1 Beilage + 1 Getränk. Bei Auswahl pfandpflichtiger Getränke erhöht sich der Endpreis um das Pfand (+ 0,25 € EINWEG). Infos zu Allergenen u. Zusatzstoffen siehe jew. Einzelprodukt der Kategorien Burger, McNuggets oder McPlant.',
                'img': "./img/menu.avif",
                'amount': 1,
                'price': 12.49,
            },

            {
                'foodname': 'Chicken McnNuggets',
                'description': 'Dein scharfes Upgrade für den McCrispy® Homestyle. Ein zartes in Buttermilch mariniertes Hähnchenbrustfiletteilstück, frischer Tomaten-Zwiebel-Mix, cremige Guacamole, knackiger Lollo-bionda-Salat, zartschmelzender Cheese und feurige Jalapeños schmecken einfach himmlisch zusammen. Der ist nicht nur crispy, juicy, tender, sondern auch noch spicy!',
                'img': "./img/spicy.avif",
                'amount': 1,
                'price': 12.49,
            },

            {
                'foodname': 'Netzkartoffelpommes',
                'description': 'Du kriegst von unseren Nuggets einfach nicht genug? Dann probiere jetzt mal unsere neuen McPlant® Nuggets auf Basis von Weizen- und Erbsenprotein (kann in der Küche in Kontakt mit Hähnchenprodukten gekommen sein). Außen knusprig und innen herzhaft-saftig. Echter McDonald\'s Geschmack zum Teilen und Dippen. Beyond Meat® and the Beyond Meat logo are registered trademarks of Beyond Meat, Inc.',
                'img': "./img/netzkartoffeln.avif",
                'amount': 1,
                'price': 12.49,
            },

            {
                'foodname': 'Wrap',
                'description': 'Schon der bloße Anblick des McWrap® Chicken Sweet-Chili macht deinen Hunger nervös. Irgendwie süß, aber gefährlich lecker: Eine herrliche Weizentortilla, paniertes Hähnchenfleisch, knackiger Eisbergsalat, weiße Zwiebeln sowie die perfekte Balance aus milder Sandwich-Sauce und süß-scharfer Sauce zeigen deinem Hunger, wo es langgeht.',
                'img': "./img/wrap.avif",
                'amount': 1,
                'price': 12.49,
            },

        ]


    }

];



let restaurantIndex = 0; // in dem Fall McDonalds
let basket = [{ 'foodnames': [], 'prices': [], 'amounts': [], 'notes': [] }];

function render() {
    loadBasket();
    rating();
    foodNav();
    renderCards();
    showBasket();
    sumPrices();
}

function rating() {

    let ratingContainer = document.getElementById('rating');
    ratingContainer.innerHTML = '';
    let commentsNumber = document.getElementById('comments');
    commentsNumber.innerHTML = '';

    for (let i = 0; i < restaurants[restaurantIndex]['rating']; i++) {
        ratingContainer.innerHTML += `  
        <img src="./icons/star-yellow.png">  
        `;
    }

    commentsNumber.innerHTML = `${restaurants[0]['comments']} &nbsp;Bewertungen`;
}

function foodNav() {

    let foodNav = document.getElementById('food-nav');
    foodNav.innerHTML = '';

    for (let i = 0; i < restaurants[restaurantIndex]['food'].length; i++) {
        const foodName = restaurants[restaurantIndex]['food'][i]['foodname'];
        foodNav.innerHTML += /* html */`
        <div class="food-nav-inline"><a href=#card${i}>${foodName}</a></div>
        
        `;

    }

}

function renderCards() {
    let cards = document.getElementById('cards');
    cards.innerHTML = '';

    for (let i = 0; i < restaurants[restaurantIndex]['food'].length; i++) {
        const foodCard = restaurants[restaurantIndex]['food'][i];

        cards.innerHTML += /* html */ `
        <div class="card" onclick="addToBasket(${i})" id="card${i}">
            <div class="card-content">
                    <div class="plus" onclick="addToBasket(${i})">
                        <img src="./icons/plus-circle.svg">
                    </div>
                <h3>${foodCard['foodname']}</h1>
                ${foodCard['description']}
                <h4>${foodCard['price'].toFixed(2).replace('.',',')} €</h4>
            </div>
            <img src="${foodCard['img']}" title="Produkt hinzufügen" class="food-card-img">

        </div>
        `

    }
}

function addToBasket(i) {

    let foodName = restaurants[restaurantIndex]['food'][i]['foodname'];
    let price = restaurants[restaurantIndex]['food'][i]['price'];
    let amount = restaurants[restaurantIndex]['food'][i]['amount'];

    if (basket[0]['foodnames'].indexOf(foodName) === -1) {
        basket[0]['foodnames'].push(foodName);
        basket[0]['prices'].push(price);
        basket[0]['amounts'].push(amount);
    }

    else {
        let index = basket[0]['foodnames'].indexOf(foodName);
        basket[0]['amounts'][index] += 1;
    }

    saveBasket();
    render();
}

function showBasket() {

    let basketContainer = document.querySelector('.basket');
    let basketContainerMobile = document.querySelector('.mobile-basket-popup-content');
    basketContainer.innerHTML = '';
    basketContainerMobile.innerHTML = '';

    for (let i = 0; i < basket[0]['foodnames'].length; i++) {
        const foodname = basket[0]['foodnames'][i];
        const price = basket[0]['prices'][i];
        const amount = basket[0]['amounts'][i];

        if (amount > 0) {

            let innerContent = /* html */`
            <table>
                <tr>
                     <td><b>${amount}</b></td>
                     <td>${foodname}</td>
                    <td>${price.toFixed(2).replace('.',',')} €</td><td><img src="./icons/plus.svg" class="icon-basket" onclick="addAmount(${i})"><img src="./icons/minus.svg" class="icon-basket" onclick="reduceAmount(${i})"></td>
                 </tr>
                <tr>
                <td></td><td class="addNotes" onclick="addNotesInput(${i})" id="addNotesButton${i}">Anmerkung hinzufügen</td>
                 </tr>
            </table>
            <div id="addNotesInput${i}"></div>
            <br>
    `;

            let innerContentMobile = /* html */`
        <table>
            <tr>
                <td><b>${amount}</b></td>
                <td>${foodname}</td>
                <td>${price} €</td><td><img src="./icons/plus.svg" class="icon-basket" onclick="addAmount(${i})"><img src="./icons/minus.svg" class="icon-basket" onclick="reduceAmount(${i})"></td>
            </tr>
            <tr>
            <td></td><td class="addNotes" onclick="addNotesInput(${i})" id="addNotesButtonMobile${i}">Anmerkung hinzufügen</td>
            </tr>
            </table>
                <div id="addNotesInputMobile${i}"></div>
             <br>
            `;

            basketContainer.innerHTML += innerContent;
            basketContainerMobile.innerHTML += innerContentMobile;

        }

        else {

            basketContainer.innerHTML += '';

        }

    }
}


function sumPrices() {

    if (basket[0]['prices'] && basket[0]['amounts']) {

        let prices = basket[0]['prices'];
        let amounts = basket[0]['amounts'];
        let sum = 0;
        let sumContainer = document.getElementById('sum');
        let sumMobile = document.getElementById('mobile-basket-button');
        let sumMobileBasket = document.getElementById('sum-mobile-basket');


        for (let i = 0; i < prices.length; i++) {
            const price = prices[i];
            const amount = amounts[i];
            sum = (price * amount) + sum;
        }

        sum = sum.toFixed(2).replace('.',',');

        sumContainer.innerHTML = /* html */ `
        
        <br><b>${sum} €</b><br><br><br>
        
        <a href="./order-complete.html"><button onclick="emptyBasket()">Bestellung abschließen</button></a>
        `;

        sumMobile.innerHTML = /* html */ `   
        <img src="./icons/shopping_basket.svg" class="icon-basket">&nbsp;Warenkorb (<b>${sum}</b>&nbsp;€)
        `;

        sumMobileBasket.innerHTML = `Gesamtpreis: ${sum}`;
    }
}

function addNotesInput(i) {
    let notesInput = document.getElementById(`addNotesInput${i}`);
    notesInput.innerHTML == '';
    let notesInputMobile = document.getElementById(`addNotesInputMobile${i}`);
    notesInput.innerHTML == '';
    let value;

    if (basket[0]['notes'][i]) {
        value = basket[0]['notes'][i];
    }

    else {
        value = "Anmerkung hier eintragen.";
    }

    notesInput.innerHTML = /* html */`
    
    <div class="note-input"><textarea id="notesInput${i}" type="text">${value}</textarea><img src="./icons/send.svg" class="icon-basket" onclick="saveNotes(${i})"></div>
    `;

    notesInputMobile.innerHTML = /* html */`
    
    <div class="note-input"><textarea id="notesInputMobile${i}" type="text">${value}</textarea><img src="./icons/send.svg" class="icon-basket" onclick="saveNotesMobile(${i})"></div>
    `;
}

function saveNotes(i) {
    let notes = document.getElementById(`notesInput${i}`).value;
    basket[0]['notes'][i] = notes;
    document.getElementById(`addNotesButton${i}`).innerHTML = '';
    document.getElementById(`addNotesInput${i}`).innerHTML = `${basket[0]['notes'][i]} <span class="changeNote" id="changeNote${i}" onclick="addNotesInput(${i})">Bearbeiten</span>`;
    saveBasket();
}

function saveNotesMobile(i) {
    let notesMobile = document.getElementById(`notesInputMobile${i}`).value;
    basket[0]['notes'][i] = notesMobile;
    document.getElementById(`addNotesButtonMobile${i}`).innerHTML = '';
    document.getElementById(`addNotesInputMobile${i}`).innerHTML = `${basket[0]['notes'][i]} <span class="changeNote" id="changeNote${i}" onclick="addNotesInput(${i})">Bearbeiten</span>`;
    saveBasket();
}

function addAmount(i) {
    let amount = basket[0]['amounts'][i];
    basket[0]['amounts'][i] = amount + 1;
    saveBasket();
    render();
}
function reduceAmount(i) {
    let amount = basket[0]['amounts'][i];
    basket[0]['amounts'][i] = amount - 1;

    if (amount === 1) {
        basket[0]['foodnames'].splice(i, 1);
        basket[0]['prices'].splice(i, 1);
        basket[0]['amounts'].splice(i, 1);
        basket[0]['notes'].splice(i, 1);
    }

    saveBasket();
    render();
}


function saveBasket() {
    localStorage.setItem('foodnames', JSON.stringify(basket[0]['foodnames']));
    localStorage.setItem('prices', JSON.stringify(basket[0]['prices']));
    localStorage.setItem('amounts', JSON.stringify(basket[0]['amounts']));
    localStorage.setItem('notes', JSON.stringify(basket[0]['notes']));
}

function loadBasket() {
    let existingLocalStorage = JSON.parse(localStorage.getItem('foodnames'));
    if (existingLocalStorage) {
        basket[0]['foodnames'] = JSON.parse(localStorage.getItem('foodnames'));
        basket[0]['prices'] = JSON.parse(localStorage.getItem('prices'));
        basket[0]['amounts'] = JSON.parse(localStorage.getItem('amounts'));
        basket[0]['notes'] = JSON.parse(localStorage.getItem('notes'));
    }
}

function popup() {
    let popUPArea = document.getElementById('main-container');
    popUPArea.innerHTML += /*html*/ `
        <div class="popup-container" id="popup-container">
            <div class="popup" id="popup">
               
                <div class="popup-input">
                    E-Mail
                    <input placeholder="Deine E-Mail">
                    Passwort
                    <input placeholder="Deine Passwort">
                    <button>Anmelden</button>
                    <div class="warning">Aktuell kein Login möglich.</div>
                </div>
    
                <div class="popup-close" onclick="closePopup()">
                    <img src="./icons/x.svg">
                </div>
            </div>    
        </div>
    `;
}

function showPoup() {
    document.getElementById('popup-container').classList.add('show');
}

function closePopup() {
    document.getElementById('popup-container').classList.remove('show');
}

function showPopupBasket() {
    document.getElementById('mobile-basket-popup-background').classList.add('show-mobile-basket');
}

function closePopupBasket() {
    document.getElementById('mobile-basket-popup-background').classList.remove('show-mobile-basket');
}



function leftScroll() {
    const left = document.querySelector(".food-nav");
    left.scrollBy(200, 0);
}
function rightScroll() {
    const right = document.querySelector(".food-nav");
    right.scrollBy(-200, 0);
}

function emptyBasket() {
    basket = [{ 'foodnames': [], 'prices': [], 'amounts': [], 'notes': [] }];
    saveBasket();
}

