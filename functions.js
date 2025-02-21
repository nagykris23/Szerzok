/**
 * 
 */
function creatform() {
    //Form létrehozása
    const form = document.createElement('form');
    form.id = 'form';//id hozzáadása a formhoz
    form.action = '#';//action hozzáadása a formhoz

    const fields = [
        { label: 'Szerző neve:', id: 'szerzo', name: 'szerzo', inputType: 'text' },
        { label: 'Csapat:', id: 'group', name: 'group', inputType: 'text' },
        { label: 'Első mű:', id: 'mu1', name: 'mu1', inputType: 'text' },
        { label: 'Második mű:', id: 'mu2', name: 'mu2', inputType: 'text' },
        { label: 'Szeretnél megadni második művet is?', id: 'masodik', name: 'masodik', inputType: 'checkbox' }
    ]
    for(const adat of fields){
        let fieldelement
        if(adat.inputType ==='checkbox'){
            fieldelement = createchekbox(adat.label,adat.id,adat.name)
        }else{
            fieldelement = createFormField(adat.label,adat.id,adat.name)
        }
        form.appendChild(fieldelement)
    }

    //Gomb létrehozása
    const button = document.createElement('button');
    button.innerHTML = 'Hozzáadás';//Gomb szövegének beállítása
    form.appendChild(button);//Gomb hozzáadása a formhoz

    //Form hozzáadása a bodyhoz
    document.body.appendChild(form);
}
/**
 * 
 * @param {string} labelText 
 * @param {string} checkboxID 
 * @param {string} checkboxName 
 * @returns {HTMLDivElement}
 */
function createchekbox(labelText, checkboxID, checkboxName){
    //Checkbox létrehozása
    const container = document.createElement('div')

    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = checkboxID; //Label for attribútum beállítása
    checkboxLabel.innerHTML = labelText; //Label szövegének beállítása
    container.appendChild(checkboxLabel); //Label hozzáadása a containerhez

    const checkbox = document.createElement('input'); //Checkbox létrehozása
    checkbox.type = 'checkbox'; //Checkbox típusának beállítása 
    checkbox.id = checkboxID; //Checkbox id beállítása
    checkbox.name = checkboxName; //Checkbox name beállítása
    container.appendChild(checkbox); //Checkbox hozzáadása a containerhez

    container.appendChild(document.createElement('br')); //Sortörés hozzáadása a containerhez
    return container;
}
/**
 * 
 * form létrehozása
 * @param {string} labelText cimkék szövege
 * @param {string} inputId id azonositása
 * @param {string} inputName inoput elem neve 
 * @param {string} inputType input elem tipusa
 */
//Form mező létrehozása
function createFormField(labelText, inputId, inputName, inputType = 'text') {
    const container = document.createElement('div')
    const label = document.createElement('label');//Label létrehozása
    label.htmlFor = inputId;//Label for attribútum beállítása
    label.innerHTML = labelText;//Label szövegének beállítása

    const input = document.createElement('input');//Input létrehozása
    input.type = inputType;//Input típusának beállítása 
    input.id = inputId;//Input id beállítása
    input.name = inputName;//Input name beállítása

    const errorSpan = document.createElement('span');//Hibaüzenet span létrehozása 
    errorSpan.id = `${inputId}_error`;//Hibaüzenet span id beállítása
    errorSpan.className = 'error';//Hibaüzenet span osztályának beállítása

    container.appendChild(label);//Label hozzáadása a formhoz
    container.appendChild(document.createElement('br'));//Sortörés hozzáadása a formhoz
    container.appendChild(input);//Input hozzáadása a formhoz 
    container.appendChild(document.createElement('br'));//Sortörés hozzáadása a formhoz 
    container.appendChild(errorSpan);//Hibaüzenet span hozzáadása a formhoz
    container.appendChild(document.createElement('br'));//Sortörés hozzáadása a formhoz
    return container
}

/**
 * 
 * @param {string} szerzo  szerzo neve  
 * @param {string} csapat csapat neve
 * @param {string} mu1 elso mu
 * @param {boolean} masodikMuChecked checkbox bevan e vagy nincs benyomva
 * @param {string} mu2 masodik mu cime ha van
 * @returns 
 */
//Validációs függvény a form kitöltöttségének ellenőrzésére
function validateForm(szerzo, csapat, mu1, masodikMuChecked, mu2) {
    let isValid = true;//A validáció alapértelmezett értéke igaz
    //A mezők ellenőrzése
    if (szerzo.trim() === '') {//Ha a szerző mező üres 
        document.getElementById('szerzo_error').textContent = 'A szerző nevét kötelező megadni';//Hibaüzenet
        isValid = false; // validáció sikertelen
    } else {
        document.getElementById('szerzo_error').textContent = '';//Ha minden rendben van, akkor a hibaüzenet üres
    }

    if (csapat.trim() === '') {//Ha a csoport mező üres
        document.getElementById('group_error').textContent = 'A csapatot kötelezö megadni';//hibaüzenet
        isValid = false;// validáció sikertelen
    } else {
        document.getElementById('group_error').textContent = ''; //ha minden rendben van, akkor a hibaüzenet üres
    }

    if (mu1.trim() === '') {//Ha az első mű mező üres
        document.getElementById('mu1_error').textContent = 'Az első műt kötelezö megadni';//hibaüzenet
        isValid = false;// validáció sikertelen
    } else {
        document.getElementById('mu1_error').textContent = '';//ha minden rendben van, akkor a hibaüzenet üres
    }

    // Ha a második mű mezőt kötelező kitölteni, de nincs bepipálva a checkbox
    if (masodikMuChecked && mu2.trim() === '') {
        document.getElementById('mu2_error').textContent = 'A második műt kötelezö megadni';//hibaüzenet
        isValid = false;// validáció sikertelen
    } else if (!masodikMuChecked && mu2.trim() !== '') {//Ha a második mű mezőt nem kötelező kitölteni, de mégis van érték
        document.getElementById('mu2_error').textContent = 'A második műt kötelezö megadni';//hibaüzenet
        isValid = false;// validáció sikertelen
    } else {
        document.getElementById('mu2_error').textContent = '';//ha minden rendben van, akkor a hibaüzenet üres
    }

    return isValid;//A validáció eredményének visszaadása
}
/**
 * táblázat létrehozása
 */
function renderMenu() {
    const headers = [
        { text: "Szerző neve", colspan: 1 },
        { text: "Csapat", colspan: 1 },
        { text: "Művei", colspan: 2 }
    ];

    const table = document.createElement('table');//Új táblázat létrehozása
    table.id = "table";//Egyedi azonosító beállítása a táblázathoz a könnyebb kezelés érdekében
    document.body.appendChild(table);//A táblázat hozzáadása az oldalhoz

    const thead = document.createElement('thead');//A táblázat fejléc szekciójának létrehozása
    table.appendChild(thead);//A fejléc hozzáadása a táblázathoz

    const headerRow = document.createElement('tr');//Egy új fejlécsor létrehozása
    thead.appendChild(headerRow);//A fejlécsor beillesztése a fejléc szekcióba

    for (let i = 0; i < headers.length; i++) {//Végigmegyünk az oszlopok fejlécén
        const headerCell = document.createElement('th');//Új fejléc cella létrehozása
        headerCell.innerHTML = headers[i].text;//A cella tartalmának beállítása a fejléc szövegére
        if (headers[i].colspan>1) {//Ha a "Művei" oszlopnál járunk
            headerCell.colSpan = headers[i].colspan;//Az oszlop szélességének kiterjesztése két oszlopra
        }
        headerRow.appendChild(headerCell);//A cella hozzáadása a fejlécsorhoz
    }
    const tbody = document.createElement('tbody');//A táblázat törzsének létrehozása
    table.appendChild(tbody);//A törzs beillesztése a táblázatba

    for (let i = 0; i < array.length; i++) {//Végigiterálunk az adatok tömbjén
        addRowToTable(array[i], tbody);//Egy új sort adunk hozzá a táblázathoz
    }
}
/**
 * 
 * @param {Object} data 
 * @param {HTMLTableSectionElement} tbody 
 */
function addRowToTable(data, tbody) {
    const row = document.createElement('tr');//Egy új sor létrehozása
    tbody.appendChild(row);//A sor hozzáadása a táblázat törzséhez

    const cell1 = document.createElement('td');//Az első cella létrehozása
    cell1.innerHTML = data.szerzo;//A szerző nevének beállítása a cellában
    row.appendChild(cell1);//A cella beillesztése a sorba

    const cell2 = document.createElement('td');//A második cella létrehozása
    cell2.innerHTML = data.csapat;//A csoport nevének beállítása
    row.appendChild(cell2);//A cella beillesztése a sorba

    if (data.mu2) {
        const cell3 = document.createElement('td');//A harmadik cella létrehozása
        cell3.innerHTML = data.mu1;//Az első mű címének beállítása
        row.appendChild(cell3);//A cella beillesztése a sorba
        const cell4 = document.createElement('td');//A negyedik cella létrehozása
        cell4.innerHTML = data.mu2;//A második mű címének beállítása
        row.appendChild(cell4);//A cella beillesztése a sorba
    } else {
        const cell3 = document.createElement('td');//A harmadik cella létrehozása
        cell3.colSpan = 2;//Az oszlop szélességének kiterjesztése két oszlopra
        cell3.innerHTML = data.mu1;//Az első mű címének beállítása
        row.appendChild(cell3);//A cella beillesztése a sorba
    }
}
