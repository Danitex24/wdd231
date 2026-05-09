const menuButton = document.querySelector('#menu');
const nav = document.querySelector('#nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuButton.textContent = nav.classList.contains('open') ? '✕' : '☰';
  });
}

const yearElement = document.querySelector('#currentyear');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector('#lastModified');
if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

const timestamp = document.querySelector('#timestamp');
if (timestamp) {
  timestamp.value = new Date().toISOString();
}
