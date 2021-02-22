 const medieurl = "https://dragqueens-8f96.restdb.io/media/";
 const myHeaders = {

     "x-apikey": "602e81e35ad3610fb5bb6352"

 }
 let menuIsOpen = false;

 document.addEventListener("DOMContentLoaded", start);

 console.log("DOMContentLoaded");

 let queens;
 let filter = "alle";


 function start() {
     document.querySelector("#menuknap").addEventListener("click", toggleMenu);

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


             klon.querySelector("#se_mere").addEventListener("click", () => visDetaljer(queen)); //laver eventlistener på ret, der fører én til en funktion, hvor man kan se detaljer om den valgte ret

             dest.appendChild(klon);

         }
     })
 }

 function visDetaljer(hvem) {
     location.href = `detail.html?id=${hvem._id}`;
 }


 //------------------BURGER MENU-------------------
 function toggleMenu() {
     console.log("toggleMenu");

     document.querySelector("#menuknap").classList.toggle("change");
     document.querySelector("#navbar").classList.toggle("hidden");

     const links = document.querySelectorAll(".link");
     links.forEach(link => link.addEventListener("click", clickLink));

     function clickLink() {

         if (menuIsOpen == true) {
             document.querySelector(".link").removeEventListener("click", clickLink);
             document.querySelector("#navbar").classList.add("hidden");

             document.querySelector("#navbar").classList.remove("openmenu");
             document.querySelector("#navbar").classList.add("closemenu");

             document.querySelector("#menuknap").classList.toggle("change");
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
