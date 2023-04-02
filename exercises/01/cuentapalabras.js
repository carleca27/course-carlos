document.addEventListener('DOMContentLoaded', () => {
    console.log("Listo para el combate")
})

cuenta_cosas.disabled = true;

area_de_texto.addEventListener("change", (e) => {
    if (area_de_texto.value.length > 0) {
        cuenta_cosas.disabled = false;
    }
    else {
        cuenta_cosas.disabled = true;
    }

    e.preventDefault();
})

///////////////////////////////////////////////////////////////////////////

cuenta_cosas.addEventListener("click", () => {
    var numero_letras = cuenta_consonantes() + cuenta_vocales()
    let por_ciento_vocales = (cuenta_vocales() * 100) / numero_letras

    consonantes_totales.textContent = "Número total de consonantes = " + cuenta_consonantes()
    vocales_totales.textContent = "Número total de vocales = " + cuenta_vocales()
    total_caracteres.textContent = "Número total de caracteres = " + area_de_texto.value.length
    porcentaje_vocales.textContent = "Porcentaje de vocales = " + por_ciento_vocales +"%"
    /* Aviso a navegante: En efecto, si tienes la desfachatez de poner en el area_de_texto algo como una
    "ü", el % que saldrá es NaN. Estuve intentando cambiarlo un ratillo para que ahí saliera también 0.
    No fui capaz en el tiempo que le dediqué, y no quise echarle más rato. Pero si se me dice cómo se hacía. */

function cuenta_consonantes(){
  var consonantes = /[bcdfghjklmnñpqrstvwxyzBCDFGHJKLMNÑPQRSTVWXYZ]/g
  consonantes_encontradas = area_de_texto.value.match(consonantes)
  if (consonantes_encontradas==null){return 0} else {return consonantes_encontradas.length}
}

function cuenta_vocales(){
  var vocales = /[aeiouAEIOUáéíóúÁÉÍÓÚ]/g //Dato para mí: si añado un "^" delante de la letra, por algún motivo toma la mayúscula como minúscula y viceversa.
  var vocales_encontradas = area_de_texto.value.match(vocales)
  if (vocales_encontradas==null){return 0} else {return vocales_encontradas.length}
}

///////////////////////////////////////////////////////////////////////////////////////////

// ÉSTE ES EL CÓDIGO QUE PRETENDÍA CONTAR PALABRAS:

    // let string = area_de_texto.value
    texto = area_de_texto.value

    // function findMostRepeatedWord(string){
    function palabra_repetida(){
      // let words = string.match(/\w+/g);
      var conteo_palabras = texto.match(/\w+/g); // Si en vez de /\w+/g pusiera /\w/g se contarían los caracteres alfanuméricos uno a uno, en vez de las palabras.
      // console.log(words);
      console.log(conteo_palabras);

      // let ocurrencias = {};
      var caso_palabra = {};
      
      // for (let word of words) {
      for (let word of conteo_palabras){
        // if (ocurrencias[word]) {ocurrencias[word]++;} 
        if (caso_palabra[word]) {caso_palabra[word]++}
        // else {ocurrencias [word] = 1;}}
        else {caso_palabra[word] = 1;}
      }
      // console.log (ocurrencias)
      console.log(caso_palabra)

      // let max = 0;
      var palabra_primera = 0;
      var palabra_segunda = 0
      var palabra_tercera = 0
      // let mostRepeatedWord = '';
      var pal1 = '';
      var pal2 = ''
      var pal3 = ''
      // for (let word of words){
      for (let word of conteo_palabras){
        // if(ocurrencias[word] > max) {max = ocurrencias[word]; mostRepeatedWord = word};}
        if(caso_palabra[word] > palabra_primera){palabra_primera = caso_palabra[word]; pal1 = word}
        else if (palabra_primera > caso_palabra[word] > palabra_segunda)
          {palabra_segunda = caso_palabra[word]; pal2 = word}
        else if (palabra_segunda > caso_palabra[word] > palabra_tercera)
          {palabra_tercera = caso_palabra[word]; pal3 = word}
      }

      // return mostRepeatedWord
      return {pal1, pal2, pal3}
    }

    console.log(palabra_repetida());   
})