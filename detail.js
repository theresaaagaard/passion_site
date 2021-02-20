        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        const medieurl = "https://dragqueens-8f96.restdb.io/media/";
        let queen;
        const myHeaders = {
            "x-apikey": "602e81e35ad3610fb5bb6352"
        }

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
            document.querySelector("#ekstra_billede1").src = medieurl + queen.billede[0];
            document.querySelector("#ekstra_billede2").src = medieurl + queen.billede[0];
            document.querySelector("#ekstra_billede3").src = medieurl + queen.billede[0];
            document.querySelector("#ekstra_billede4").src = medieurl + queen.billede[0];

            document.querySelector(".talent").textContent = queen.talent;
            document.querySelector(".placering").textContent = queen.placering;
            document.querySelector(".varighed").textContent = queen.varighed + " timer";

            document.querySelector("#tilbage").addEventListener("click", tilbageTilOversigt);
        }

        function tilbageTilOversigt() {
            history.back();
        }
