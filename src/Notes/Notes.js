import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStickyNote,
  faCheckCircle,
  faMinusCircle,
  faSort
} from '@fortawesome/free-solid-svg-icons';
import Note from '../Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import './Notes.scss';
import axios from 'axios';

const Notes = props => {
  const [originalNotes, setOriginalNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios
      .get('./notes.json')
      .then(notes => {
        setOriginalNotes(notes.data);
        setNotes(notes.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeAuthor = e => {
    setAuthor(e.target.value);
  };

  const onChangeBody = e => {
    setBody(e.target.value);
  };

  const handleAddNote = () => {
    const newNotes = [...originalNotes];
    newNotes.push({ title, body, author, date: new Date().toUTCString() });
    setOriginalNotes(newNotes);
    setNotes(newNotes);
    handleClose();
  };

  const handleRemoveNote = index => {
    const splicedNotes = [...originalNotes];
    splicedNotes.splice(index, 1);
    setOriginalNotes(splicedNotes);
    setNotes(splicedNotes);
  };

  const handleSortNotes = () => {
    const sortedNotes = [...originalNotes];
    sortedNotes.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setNotes(sortedNotes);
  };

  const handleFilterNotes = value => {
    let filteredNotes = [...originalNotes];
    console.log(filteredNotes);
    filteredNotes = filteredNotes.filter(({ title }) => {
      return title.toLowerCase().search(value.toLowerCase()) !== -1;
    });
    setNotes(filteredNotes);
  };

  const notesList = notes.map((note, i) => (
    <Note
      key={i}
      index={i}
      title={note.title}
      body={note.body}
      author={note.author}
      removeNote={handleRemoveNote}
    />
  ));

  const addNoteModal = (
    <Button onClick={handleOpen} className='addNoteBtn' color='blue'>
      <FontAwesomeIcon className='addNoteIcon' icon={faStickyNote} size='1x' />
      Add a note
    </Button>
  );

  return (
    <div className='notes'>
      <h1>Notes</h1>
      <Button className='sortNotesBtn' onClick={handleSortNotes}>
        <FontAwesomeIcon className='sortNotes' icon={faSort} size='1x' />
        Sort Notes
      </Button>
      <Input
        className='filterNotesInput'
        onChange={e => handleFilterNotes(e.target.value)}
        placeholder='Filter notes...'
      />
      {notesList}
      <Modal
        size='tiny'
        open={open}
        trigger={addNoteModal}
        onClose={handleClose}
      >
        <Modal.Content>
          <NoteForm
            close={handleClose}
            changeTitle={onChangeTitle}
            changeAuthor={onChangeAuthor}
            changeBody={onChangeBody}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose} color='red'>
            <FontAwesomeIcon
              className='addNoteIcon'
              icon={faMinusCircle}
              size='1x'
            />
            No
          </Button>
          <Button onClick={handleAddNote} color='green'>
            <FontAwesomeIcon
              className='addNoteIcon'
              icon={faCheckCircle}
              size='1x'
            />
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Notes;
