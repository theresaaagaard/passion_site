 //henter data fra restdb
 const medieurl = "https://dragqueens-8f96.restdb.io/media/";
 const myHeaders = {

     "x-apikey": "602e81e35ad3610fb5bb6352"

 }

 //opretter variabel, hvor burgermenu er lukket
 let menuIsOpen = false;

 //lytter til om DOM er loaded
 document.addEventListener("DOMContentLoaded", start);
 console.log("DOMContentLoaded");

 //opretter variabel til queens
 let queens;
 //opretter variabel til filtering
 let filter = "alle";

 //når dom er loaded begynder start funktion
 function start() {

     //toggle mellem kategori menuen er skjult eller fremme
     function myFunction(mediaquery) {
         if (mediaquery.matches) { // If media query matches
             document.querySelector(".kategorier").classList.add("hidden");
             document.querySelector(".sorter").textContent = "Sortér: ☰";
         } else {
             document.querySelector(".kategorier").classList.remove("hidden");
             document.querySelector(".sorter").textContent = "Sortér:";
         }
     }
     //opretter variabel som lytter til skærmstørrelse
     let mediaquery = window.matchMedia("(max-width: 650px)")
     myFunction(mediaquery) // Call listener function at run time
     mediaquery.addListener(myFunction) // Attach listener function on state changes

     //lytter til klik på burgermenuen
     document.querySelector("#menuknap").addEventListener("click", toggleMenu);

     //opretter variabel til filtreringsknapper og lytter til klik på hvert enkelt og kalder funktion
     const filterKnapper = document.querySelectorAll(".kategorier button");
     filterKnapper.forEach(knap => knap.addEventListener("click", valgtKategori));

     //load json data
     loadJSON();
 }

 //viser den valgte kategori efter klik på filtreringsknap
 function valgtKategori() {
     filter = this.dataset.kategori;
     console.log("valgtKategori");

     //fjerne og tilføjer valgt class på den valgte
     document.querySelector(".valgt").classList.remove("valgt");
     this.classList.add("valgt");

     //kald visQueens funktion
     visQueens();
 }

 //load  og fetch JSON
 async function loadJSON() {
     const JSONData = await fetch("https://dragqueens-8f96.restdb.io/rest/queens", {
         headers: myHeaders
     });
     queens = await JSONData.json();
     console.log("Queens", queens);
     //kald funktion visQueens
     visQueens();
 }

 //tilføjer data til klon
 function visQueens() {
     console.log("visQueens");

     const dest = document.querySelector("#oversigt");
     const skabelon = document.querySelector("template").content;

     dest.textContent = "";

     queens.forEach(queen => {

         if (filter == queen.talent || filter == "alle") {
             // loop igennem json
             const klon = skabelon.cloneNode(true);
             klon.querySelector(".navn").textContent += queen.navn;
             klon.querySelector("img").src = medieurl + queen.billede[0];

             klon.querySelector(".billede").addEventListener("click", () => visDetaljer(queen));
             klon.querySelector("#se_mere").addEventListener("click", () => visDetaljer(queen)); //laver eventlistener på queen, der fører én til en funktion, hvor man kan se detaljer om den valgte ret

             //tilføjer klon til oversigten sektion
             dest.appendChild(klon);

         }
     })
 }
 //gå til detaljesiden når der klikkes på den enkelte queen
 function visDetaljer(hvem) {
     location.href = `detail.html?id=${hvem._id}`;
 }

 // toggle på sortér-knappen og kalder sorterMenu funktion
 document.querySelector(".sorter").addEventListener("click", sorterMenu);

 //toggle class hidden på kategorier
 function sorterMenu() {
     console.log("sorterMenu");
     document.querySelector(".kategorier").classList.toggle("hidden");
 }

 //------------------BURGER MENU-------------------
 function toggleMenu() {
     console.log("toggleMenu");

     //toggler burgermenuens udseende
     document.querySelector("#menuknap").classList.toggle("change");
     //toggler hidden på navbar
     document.querySelector("#navbar").classList.toggle("hidden");

     //opretter variabel som lytter til ethvert klik på links i navbaren og kalder clickLink funktion
     const links = document.querySelectorAll(".link");
     links.forEach(link => link.addEventListener("click", clickLink));


     function clickLink() {
         //undersøger om menuen er åben
         if (menuIsOpen == true) {
             //luk navbaren ved click på et link inde i navbaren
             document.querySelector(".link").removeEventListener("click", clickLink);
             document.querySelector("#navbar").classList.add("hidden");

             //tilføjer closemenu animation
             document.querySelector("#navbar").classList.remove("openmenu");
             document.querySelector("#navbar").classList.add("closemenu");

             //ændrer burgermenu tilbage til "lukket" tilstand
             document.querySelector("#menuknap").classList.toggle("change");

             //menuen er åben så ændrer variabelen til lukket
             menuIsOpen = false;
         }
     }

     // Undersøg om menuen er åben eller lukket
     if (menuIsOpen == true) {

         // Menuen er åben, så vi lukker den med css
         document.querySelector("#navbar").classList.remove("openmenu");
         document.querySelector("#navbar").classList.add("closemenu");

         // menuen er nu lukket, så ændrer menuvariablen til at vise dette
         menuIsOpen = false;
     } else {

         // menuen er lukket, så vi åbner den
         document.querySelector("#navbar").classList.remove("closemenu");
         document.querySelector("#navbar").classList.add("openmenu");

         // Menuen er nu åben, så vi ændrer menuvariablen til at visse dette
         menuIsOpen = true;
     }
     console.log(menuIsOpen);
 }
