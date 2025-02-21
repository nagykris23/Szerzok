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
creatform()
createchekbox()
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();//Az alapértelmezett űrlapküldési viselkedés megakadályozása

    const szerzoElement = document.getElementById('szerzo');//A szerző mező lekérése
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
