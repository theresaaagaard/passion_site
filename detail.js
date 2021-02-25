        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        const medieurl = "https://dragqueens-8f96.restdb.io/media/";
        let queen;
        const myHeaders = {
            "x-apikey": "602e81e35ad3610fb5bb6352"
        }

        //opretter variabel, hvor burgermenu er lukket
        let menuIsOpen = false;

        console.log("ID", id);
        document.addEventListener("DOMContentLoaded", loadJSON);

        async function loadJSON() {
            const JSONData = await fetch(`https://dragqueens-8f96.restdb.io/rest/queens/${id}`, {
                headers: myHeaders
            });
            queen = await JSONData.json();

            console.log("Queens", queen);
            visQueen(queen);
        }

        function visQueen() {
            document.querySelector(".navn").textContent += queen.navn;
            document.querySelector("#main_billede").src = medieurl + queen.billede[0];
            document.querySelector("#ekstra_billede1").src = medieurl + queen.billede[1];
            document.querySelector("#ekstra_billede2").src = medieurl + queen.billede[2];
            document.querySelector("#ekstra_billede3").src = medieurl + queen.billede[3];
            document.querySelector("#ekstra_billede4").src = medieurl + queen.billede[4];

            document.querySelector(".talent").textContent = queen.talent;
            document.querySelector(".placering").textContent = queen.placering;
            document.querySelector(".varighed").textContent = queen.varighed + " timer";
            document.querySelector(".pris").textContent = queen.pris;
            document.querySelector(".beskrivelse").textContent = queen.beskrivelse;
            document.querySelector("#rating_billede").src = medieurl + queen.rating;

            document.querySelector("#tilbage").addEventListener("click", tilbageTilOversigt);
        }


        const ekstraBilleder = document.querySelectorAll(".ekstra_billede");
        //eventlistener der lytter til at der bliver klikket på de små billeder
        ekstraBilleder.forEach(knap => knap.addEventListener("click", skiftBillede));

        function skiftBillede() {
            console.log(this);
            //skifter det store billede ud med billedet, der er blevet klikket på
            document.querySelector("#main_billede").src = this.src;
        }





        function tilbageTilOversigt() {
            history.back();
        }

        //lytter til klik på burgermenuen
        document.querySelector("#menuknap").addEventListener("click", toggleMenu);

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
