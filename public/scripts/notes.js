const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const noteContainer = document.getElementById('noteContainer')

const getNotes = () =>
  fetch('/api/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
});

const createCard = (note) => {
    const cardEl = document.createElement('ul');
    cardEl.innerHTML = `${note.text} </br>`;
    noteContainer.appendChild(cardEl);
}


getNotes().then((data) => data.forEach((note) => createCard(note)));