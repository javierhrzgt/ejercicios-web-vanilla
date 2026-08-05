let notes = [];

const notesContainer = document.querySelector("#notes-container");

const renderNotes = () => {
  notesContainer.innerHTML = "";
  for (const note of notes) {
    const noteCard = document.createElement("div");
    noteCard.dataset.id = note.id;
    noteCard.classList.add("notes-card");

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const noteEdit = document.createElement("button");
    noteEdit.type = "button";
    noteEdit.textContent = "Editar Nota";
    const noteDelete = document.createElement("button");
    noteDelete.type = "button";
    noteDelete.textContent = "Eliminar Nota";

    noteCard.appendChild(noteText);
    noteCard.appendChild(noteEdit);
    noteCard.appendChild(noteDelete);

    notesContainer.appendChild(noteCard);
  }
};

renderNotes();
