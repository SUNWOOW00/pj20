const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes')) || []; // Ensure notes is initialized as an empty array if not found in localStorage
if (notes) {
  notes.forEach((note) => addNewNote(note));
}
addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? '' : 'hidden'}">${text}</div>
    <textarea class="${text ? 'hidden' : ''}">${text}</textarea>
  `;
  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');
  textArea.value = text;

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];
  notesText.forEach((note) => notes.push(note.value)); // Push each note value to the array
  localStorage.setItem('notes', JSON.stringify(notes)); // Store notes array in localStorage
}
