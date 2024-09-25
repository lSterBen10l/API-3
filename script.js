document.getElementById('search-button').addEventListener('click', getCharacterInfo);

function getCharacterInfo() {
  const characterName = document.getElementById('character-search').value.trim();

  if (!characterName) {
    alert("Vennligst skriv inn navnet på en karakter.");
    return;
  }

  const url = `https://hp-api.onrender.com/api/characters`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const character = data.find(char => char.name.toLowerCase() === characterName.toLowerCase());

      if (!character) {
        alert("Karakteren ble ikke funnet. Prøv igjen.");
        return;
      }

      displayCharacterInfo(character);
    })
    .catch(error => console.error("Feil ved henting av data: ", error));
}

function displayCharacterInfo(character) {
  const characterInfoDiv = document.getElementById('character-info');
  characterInfoDiv.innerHTML = `
    <img src="${character.image}" alt="${character.name}" />
    <div><span class="character-detail">Navn:</span> ${character.name}</div>
    <div><span class="character-detail">Kjønn:</span> ${character.gender}</div>
    <div><span class="character-detail">Fødselsår:</span> ${character.yearOfBirth || 'Ukjent'}</div>
    <div><span class="character-detail">Hus:</span> ${character.house || 'Ukjent'}</div>
    <div><span class="character-detail">Ancestry:</span> ${character.ancestry || 'Ukjent'}</div>
    <div><span class="character-detail">Patronus:</span> ${character.patronus || 'Ukjent'}</div>
    <div><span class="character-detail">Skuespiller:</span> ${character.actor}</div>
  `;
}
