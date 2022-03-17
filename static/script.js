// Tästä alkaa AJAX tehtävä
// Haetaan elementit ja alustetaan muuttujia

let talukko = document.getElementById("taulukonbody");
const taulukkobody = document.querySelector("#jsontaulukko > tbody");
var aika = new Date().toString().slice(0, 15).replace(/-/g, "/");
let numero = 0;

// Funktio tietojen lataamista varten
function lataatiedot() {
  const request = new XMLHttpRequest();
  request.open("get", "static/questdata.json", true);
  // Tarkistetaan AJAX pyynnön tila, ja kun se on valmis, luetaan JSON tiedot käsittelyä varten
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200) {
        try {
          const json = JSON.parse(request.responseText);
          lisaatiedot(json); // Lisää tiedot HTML:n puolle
        } catch (e) {
          console.warn("Tietoja ei pystytty lataamaan");
        }
      }
      if (request.status == 404) {
        console.log("tiedostoa ei löydy");
      }
    }
  };
  request.send();
}
// Funktio tietojen lisäämistä varten
function lisaatiedot(json) {
  // Poistetaan "vanhat" tiedot taulukosta
  while (taulukkobody.firstChild) {
    taulukkobody.removeChild(taulukkobody.firstChild);
  }

  // Lisätään tiedot HTML documenttiin
  json.forEach((element) => {
    talukko.innerHTML += `<tr><td>${json[numero].id}</td><td>${json[numero].username}</td><td>${json[numero].country}</td><td>${json[numero].date}</td><td>${json[numero].message}</td></tr>`;
    numero++;
  });
}
// Suoritetaan tietojen lataus
window.addEventListener("DOMContentLoaded", (event) => {
  lataatiedot();
});

window.onload = (event) => {
  let painonappi = document.getElementById("painonappi"); // Haetaan elementit HTML documentista
  let id = 0;
  let talukko = document.getElementById("taulukonbody");

  painonappi.addEventListener("click", () => {
    let name = document.getElementById("name").value; // Haetaan arvot kentistä
    let country = document.getElementById("country").value;
    let message = document.getElementById("message").value;

    let xmlhttp = new XMLHttpRequest(); // Luodaan ajax olio sekä lisätään tiedot taulukkoon
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        numero++;
        talukko.innerHTML += `<tr><td>${numero}</td><td>${name}</td><td>${country}</td><td>${aika}</td><td>${message}</td></tr>`;
      }
    };

    xmlhttp.open("POST", "/ajaxmessage", true); // Lähetetään ajax tiedot node palvelimelle
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send(
      "name=" + name + "&country=" + country + "&message=" + message
    );
  });
};
