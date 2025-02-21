//A táblázat adatainak létrehozása tömb formájában
const array = [
    {
        szerzo: "Vörösmarty Mihály",//A szerző neve
        csapat: "romantikus triász",//A szerző irodalmi csoportja
        mu1: "Zalán futása",//Első mű címe
        mu2: "Szózat"//Második mű címe
    },
    {
        szerzo: "Móricz Zsigmond",//A szerző neve
        csapat: "Nyugat I.",//A szerző irodalmi csoportja
        mu1: "Hét krajcár",//Első mű címe
        mu2: ""//Második mű (üres)
    },
    {
        szerzo: "Illyés Gyula",//A szerző neve
        csapat: "Nyugat II.",//A szerző irodalmi csoportja
        mu1: "Egy mondat a zsarnokságról",//Első mű címe
        mu2: "Puszták népe"//Második mű címe
    },
    {
        szerzo: "Radnóti Miklós",//A szerző neve
        csapat: "Nyugat III.",//A szerző irodalmi csoportja
        mu1: "Pogány köszöntő",//Első mű címe
        mu2: "Járkálj csak, halálraítélt"//Második mű címe
    }
];
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

function renderMenu() {
    const headers = ["Szerző neve", "Csapat", "Művei"];//Az oszlopok fejléceinek listája
    
    const table = document.createElement('table');//Új táblázat létrehozása
    table.id = "table";//Egyedi azonosító beállítása a táblázathoz a könnyebb kezelés érdekében
    document.body.appendChild(table);//A táblázat hozzáadása az oldalhoz
    
    const thead = document.createElement('thead');//A táblázat fejléc szekciójának létrehozása
    table.appendChild(thead);//A fejléc hozzáadása a táblázathoz
    
    const headerRow = document.createElement('tr');//Egy új fejlécsor létrehozása
    thead.appendChild(headerRow);//A fejlécsor beillesztése a fejléc szekcióba

    for (let i = 0; i < headers.length; i++) {//Végigmegyünk az oszlopok fejlécén
        const headerCell = document.createElement('th');//Új fejléc cella létrehozása
        headerCell.innerHTML = headers[i];//A cella tartalmának beállítása a fejléc szövegére
        if (i === 2) {//Ha a "Művei" oszlopnál járunk
            headerCell.colSpan = 2;//Az oszlop szélességének kiterjesztése két oszlopra
        }
        headerRow.appendChild(headerCell);//A cella hozzáadása a fejlécsorhoz
    }
    
    const tbody = document.createElement('tbody');//A táblázat törzsének létrehozása
    table.appendChild(tbody);//A törzs beillesztése a táblázatba
    
    for (let i = 0; i < array.length; i++) {//Végigiterálunk az adatok tömbjén
        addRowToTable(array[i], tbody);//Egy új sort adunk hozzá a táblázathoz
    }
}

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

document.getElementById('form').addEventListener('submit', function(e) { 
    e.preventDefault();//Az alapértelmezett űrlapküldési viselkedés megakadályozása
    
    const szerzoElement = document.getElementById('szerzo_nev');//A szerző mező lekérése
    const csapatElement = document.getElementById('group');//A csapat mező lekérése
    const mu1Element = document.getElementById('mu1');//Az első mű mező lekérése
    const mu2Element = document.getElementById('mu2');//A második mű mező lekérése
    const masodikMuCheckbox = document.getElementById('masodik');//A második mű jelölőnégyzetének lekérése
    
    const szerzoValue = szerzoElement.value;//A szerző nevének értéke
    const csapatValue = csapatElement.value;//A csapat nevének értéke
    const mu1Value = mu1Element.value;//Az első mű címének értéke
    const mu2Value = masodikMuCheckbox.checked ? mu2Element.value : '';//A második mű értéke, ha ki van pipálva
    
    // Validációs függvény meghívása
    if (!validateForm(szerzoValue, csapatValue, mu1Value, masodikMuCheckbox.checked, mu2Value))//Ha a validáció sikertelen
        { 
            return;//Kilépés a függvényből
        }

    const newElement = {//Egy új objektum létrehozása az adatokkal
        szerzo: szerzoValue,//A szerző neve
        csapat: csapatValue,//A csoport neve
        mu1: mu1Value,//Az első mű címe
        mu2: mu2Value,//A második mű címe (ha van)
    };
    
    array.push(newElement);//Az új objektum hozzáadása az adatok tömbjéhez

    const table = document.getElementById('table');//A táblázat kiválasztása
    const tbody = table.querySelector('tbody');//A táblázat törzsének kiválasztása
    addRowToTable(newElement, tbody);//Új sor hozzáadása a táblázathoz

    //Az űrlapmezők kiürítése
    szerzoElement.value = '';
    csapatElement.value = '';
    mu1Element.value = '';
    mu2Element.value = '';
    masodikMuCheckbox.checked = false;
});

renderMenu();//A táblázat létrehozásának és megjelenítésének elindítása
