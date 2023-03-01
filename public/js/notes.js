const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const noteContainer = document.getElementById('noteContainer')

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
});

const createCard = (note) => {
  const cardEl = document.createElement('div');
  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.innerHTML = `${note.title} </br>`;
  cardBodyEl.innerHTML = `<p>${note.text}</p>`;
  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);
  noteContainer.appendChild(cardEl);
}

getNotes().then((data) => data.forEach((note) => createCard(note)));