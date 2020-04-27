const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    console.log(chalk.yellow('Your notes...'));
    const data = loadNotes();
    data.forEach(ele => console.log(chalk.bgBlue(ele.title)));
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find((arr) => arr.title === title);

    if(!duplicateNotes){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'));
    } else {
        console.log(chalk.bgRed('Note title exists'));
    }

    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNotes = (title) => {
   const existingNotes = loadNotes()
   const rmNotes = existingNotes.filter(arr => arr.title !== title)
   

   if(existingNotes.length > rmNotes.length){
        saveNotes(rmNotes);
        console.log(chalk.bgGreen('Note removed'));
   } else {
        console.log(chalk.bgRed('No note found!'));
   }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const readNotes = (title) => {
    const data = loadNotes()
    const display = data.find(arr => arr.title === title);
    
    if(display){
        console.log(chalk.bgBlue(display.title));
        console.log(chalk.inverse(display.body));
    } else {
        console.log(chalk.bgRed('Note not found!')); 
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    getNotes: getNotes,
    readNotes: readNotes
}