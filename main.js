

const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea')
    const notes =[];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes))
}

const addNewNote = (text ='') => {

    // CREATING NEW DIV USING JS
    const note = document.createElement('div');
    note.classList.add('note');
    
    //NOW WE HAVE TO CREATE REST OF BUTTONS 

    const htmlData = `
    <div class="operation">
    <button class="edit"> <i class="fas fa-edit"></i> </button>
    <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>
    
    <div class="main"></div>
    <textarea class="hidden"></textarea>   `;
    
    // ADDING REST OF THE HTMLDATA INSIDE THIS DIV

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note)

    // getting the references
    const editButton = note.querySelector('.edit')
    const delButton = note.querySelector('.delete')
    const mainDiv = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    // Deleting the note

    delButton.addEventListener('click', () => {
        note.remove()
        updateLSData()
    })

    // toggle using edit icon

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change' , (event) => {
        const textvalue = event.target.value;
        mainDiv.innerHTML = textvalue;

        updateLSData();
    })

    document.body.appendChild(note);

}
// Getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach((note) => addNewNote(note))
}

addButton.addEventListener('click', () => addNewNote());
