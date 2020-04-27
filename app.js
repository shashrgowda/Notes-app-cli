const notes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

// console.log(process.argv);

yargs.version('1.1.0');


yargs.command({
    command: 'add',
    describe: 'Adding a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
        
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Note title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    handler(){
        notes.getNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Reading the notes',
    builder: {
        title:{
            describe: 'Note title to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title);
    }
})

yargs.parse();

// console.log(yargs.argv);

