const startButton = document.getElementById('startButton');

startButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/notes';
  });