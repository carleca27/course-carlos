document.addEventListener('DOMContentLoaded', () => {
    console.log("Listo para el combate")

    // Initialize button
    enableDisableButton();
})

area_de_texto.addEventListener("change", (e) => {
    enableDisableButton();

    e.preventDefault();
})

///////////////////////////////////////////////////////////////////////////

function enableDisableButton()
{
    console.log('Text size: ' + area_de_texto.value.length);
    cuenta_cosas.disabled = area_de_texto.value.length === 0;
}

function cuenta_consonantes()
{
    var consonantes = /[bcdfghjklmnñpqrstvwxyzBCDFGHJKLMNÑPQRSTVWXYZ]/g
    consonantes_encontradas = area_de_texto.value.match(consonantes)
    if (consonantes_encontradas==null) {
        return 0
    } else {
        return consonantes_encontradas.length
    }
}

function cuenta_vocales()
{
    var vocales = /[aeiouAEIOUáéíóúÁÉÍÓÚ]/g //Dato para mí: si añado un "^" delante de la letra, por algún motivo toma la mayúscula como minúscula y viceversa.
    var vocales_encontradas = area_de_texto.value.match(vocales)
    if (vocales_encontradas==null) {
        return 0
    } else {
        return vocales_encontradas.length
    }
}

function mostRepeatedWords(texto)
{
    // Obtain an array of words from the text
    let words = texto.match(/\w+/g); // Si en vez de /\w+/g pusiera /\w/g se contarían los caracteres alfanuméricos uno a uno, en vez de las palabras.
    console.log(words);

    // Calculate the frequency of words, create an array of objects
    console.log('-- calc frequency')
    let wordFrequency = [];

    for (let word of words) {
        // Check if the word was added
        let wordObj = wordFrequency.find(wordObj => wordObj.name === word);

        if (wordObj === undefined) {
            // Insert new word obj
            let wordObj = {"name": word, counter: 1};
            wordFrequency.push(wordObj);
        } else {
            // Increase counter
            wordObj.counter++;
        }
    }

    console.log(wordFrequency)

    console.log('-- start sorting')

    // Sort by most frequent to less frequent
    let sortedWords = wordFrequency.sort((wordA, wordB) => (wordA.counter < wordB.counter) ? 1: -1);

    console.log(sortedWords)

    // Now get the 3 most frequents
    console.log('-- most frequents')
    let mostFrequents = sortedWords.slice(0, 3);
    console.log(mostFrequents)

    let frequentsName = mostFrequents.map(word => {return word.name});
    console.log(frequentsName)

    return frequentsName.join(', ');

    // Lo anterior se podría concatenar tal que así:
    //return sortedWords.slice(0, 3).map(word => {return word.name}).join(', ');
}

cuenta_cosas.addEventListener("click", () => {
    let numero_letras = cuenta_consonantes() + cuenta_vocales()
    let por_ciento_vocales = (cuenta_vocales() * 100) / numero_letras
    let palabras = mostRepeatedWords(area_de_texto.value);

    consonantes_totales.textContent = "Número total de consonantes = " + cuenta_consonantes()
    vocales_totales.textContent = "Número total de vocales = " + cuenta_vocales()
    total_caracteres.textContent = "Número total de caracteres = " + area_de_texto.value.length
    porcentaje_vocales.textContent = "Porcentaje de vocales = " + por_ciento_vocales +"%"
    palabras_repetidas.textContent = "Palabras más repetidas = " + palabras

    /* Aviso a navegante: En efecto, si tienes la desfachatez de poner en el area_de_texto algo como una
    "ü", el % que saldrá es NaN. Estuve intentando cambiarlo un ratillo para que ahí saliera también 0.
    No fui capaz en el tiempo que le dediqué, y no quise echarle más rato. Pero si se me dice cómo se hacía. */

})