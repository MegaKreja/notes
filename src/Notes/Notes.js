import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStickyNote,
  faCheckCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons';
import Note from '../Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import './Notes.scss';
import axios from 'axios';

const Notes = props => {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios
      .get('./notes.json')
      .then(notes => {
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
    const newNotes = [...notes];
    newNotes.push({ title, body, author });
    setNotes(newNotes);
    handleClose();
  };

  const notesList = notes.map((note, i) => (
    <Note key={i} title={note.title} body={note.body} author={note.author} />
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
