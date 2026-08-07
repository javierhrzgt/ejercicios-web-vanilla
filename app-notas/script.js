let notes = [];

const loadNotes = () => {
  const noteSavedString = localStorage.getItem("myNotes");
  if (noteSavedString !== null) {
    notes = JSON.parse(noteSavedString);
  }
};

const notesContainer = document.querySelector("#notes-container");

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

loadNotes();
renderNotes();
