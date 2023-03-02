// declaring variables to be used later 
let noteTitle;
let noteText;
let noteList;
let saveButton;
let newButton;

// selecting relevant page elements that will be used
if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  noteList = document.querySelectorAll('.list-container .list-group');
  saveButton = document.querySelector('.save-note');
  newButton = document.querySelector('.new-note');
};

// current note refers to the note in the main page area, will be changed later
let currentNote = {};

// GET request for notes database
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// POST request to notes database
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

// sets text and title of currentNote
const displayCurrentNote = () => {
  if (currentNote.id) {
    noteTitle.value = currentNote.title;
    noteText.value = currentNote.text;
  } else {
    noteTitle.value = '';
    noteText.value = '';
  }
};

// sets newNote values and uses saveNote to post to database, then display all notes
const noteSaver = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    displayAllNotes();
    displayCurrentNote();
  });
};

// displays current note
const noteView = (e) => {
  e.preventDefault();
  currentNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  displayCurrentNote();
};

// displays all notes in sidebar
const displayNotes = async (notes) => {
    let noteData = await notes.json();
    
    if (window.location.pathname === '/notes') {
      noteList.forEach((e) => (e.innerHTML = ''));
    }
  
    let noteListItems = [];
  
    const createList = (text) => {
  
      const listElement = document.createElement('li');
      listElement.classList.add('list-group-item');
  
      const spanElement = document.createElement('span');
      spanElement.classList.add('list-item-title');
      spanElement.innerText = text;
      spanElement.addEventListener('click', noteView);
      listElement.append(spanElement);
      return listElement;
    };
      noteData.forEach((note) => {
      const list = createList(note.title);
      list.dataset.note = JSON.stringify(note);
      noteListItems.push(list);
    });
  
    if (window.location.pathname === '/notes') {
      noteListItems.forEach((note) => noteList[0].append(note));
    }
};  

// empties current note text so that new note can be entered
const newNoteView = () => {
  displayCurrentNote();
  currentNote = {};
};

// gets all notes and displays them
const displayAllNotes = () => getNotes().then(displayNotes);

// event listeners for the buttons
if (window.location.pathname === '/notes') {
  saveButton.addEventListener('click', noteSaver);
  newButton.addEventListener('click', newNoteView);
}

displayAllNotes();