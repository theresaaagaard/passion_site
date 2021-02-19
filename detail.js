        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        const medieurl = "https://dragqueens-8f96.restdb.io/media/";
        let person;
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
            document.querySelector(".navn").textcontent += queen.navn;
//            document.querySelector("#main-billede").src = medieurl + queen.billede[0];

            document.querySelector(".talent").textcontent = queen.talent;
            document.querySelector(".placering").textcontent = queen.placering;
            document.querySelector(".varighed").textcontent = queen.varighed;

            document.querySelector("____").addEventListener("click", tilbageTilOversigt);
        }

        function tilbageTilOversigt() {
            history.back();
        }
