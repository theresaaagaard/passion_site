 const medieurl = "https://dragqueens-8f96.restdb.io/media/";
 const myHeaders = {

     "x-apikey": "602e81e35ad3610fb5bb6352"

 }

 document.addEventListener("DOMContentLoaded", start);

 console.log("DOMContentLoaded");

 let queens;
 let filter = "alle";

 function start() {

 loadJSON();
 }



 async function loadJSON() {
     const JSONData = await fetch("https://dragqueens-8f96.restdb.io/rest/queens", {
         headers: myHeaders
     });
     queens = await JSONData.json();
     console.log("Queens", queens);
     visQueens();
 }


 function visQueens() {
     console.log("visQueens");

     const dest = document.querySelector("#oversigt");
     const skabelon = document.querySelector("template").content;
     dest.textContent = "";

     queens.forEach(queen => {

         if (filter == queen.kategori || filter == "alle") {
             // loop igennem json
             const klon = skabelon.cloneNode(true);
             klon.querySelector("img").src = medieurl + queen.billede[0];
             klon.querySelector(".navn").textContent += queen.navn;


             klon.querySelector("#se-mere").addEventListener("click", () => visDetaljer(queen)); //laver eventlistener på ret, der fører én til en funktion, hvor man kan se detaljer om den valgte ret

             dest.appendChild(klon);

         }
     })
 }

 function visDetaljer(hvem) {
     location.href = `detail.html?id=${hvem._id}`;
 }
