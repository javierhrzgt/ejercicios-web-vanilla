let notes = [];
let editingId = null;

const loadNotes = () => {
  const noteSavedString = localStorage.getItem("myNotes");
  if (noteSavedString !== null) {
    notes = JSON.parse(noteSavedString);
  }
};

const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#text-note");
const noteForm = document.querySelector("#form-note");
const btnAddNote = document.querySelector("#btn-add");

const renderNotes = () => {
  notesContainer.innerHTML = "";
  for (const note of notes) {
    const noteCard = document.createElement("div");
    noteCard.dataset.id = note.id;
    noteCard.classList.add("notes-card");

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    const noteEdit = document.createElement("button");
    noteEdit.classList.add("btn", "btn-edit");
    noteEdit.type = "button";
    noteEdit.textContent = "Editar Nota";

    const noteDelete = document.createElement("button");
    noteDelete.classList.add("btn", "btn-delete");
    noteDelete.type = "button";
    noteDelete.textContent = "Eliminar Nota";

    noteCard.appendChild(noteText);
    noteCard.appendChild(btnContainer);
    btnContainer.appendChild(noteEdit);
    btnContainer.appendChild(noteDelete);

    notesContainer.appendChild(noteCard);
  }
};

const saveNotes = () => {
  const notesToString = JSON.stringify(notes);
  localStorage.setItem("myNotes", notesToString);
};

const exitEditMode = () => {
  editingId = null;
  btnAddNote.textContent = "Agregar Nota";
  noteInput.value = "";
};

loadNotes();
renderNotes();

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newNoteText = noteInput.value.trim();

  if (!newNoteText) return;

  if (editingId) {
    notes.find((n) => n.id === editingId).text = newNoteText;
  } else {
    const newNote = { id: Date.now(), text: newNoteText };
    notes.push(newNote);
  }

  saveNotes();
  renderNotes();
  exitEditMode();
});

notesContainer.addEventListener("click", (e) => {
  const btnDelete = e.target.closest(".btn-delete");
  const btnEdit = e.target.closest(".btn-edit");

  if (btnDelete) {
    const noteCard = btnDelete.closest(".notes-card");
    const noteId = Number(noteCard.dataset.id);
    notes = notes.filter((n) => n.id !== noteId);
    saveNotes();
    renderNotes();
    if (editingId === noteId) {
      exitEditMode();
    }
  } else if (btnEdit) {
    const noteCard = btnEdit.closest(".notes-card");
    editingId = Number(noteCard.dataset.id);

    let noteTextEditing = notes.find((n) => n.id === editingId);
    noteInput.value = noteTextEditing.text;
    btnAddNote.textContent = "Guardar Cambios";
  }
});
