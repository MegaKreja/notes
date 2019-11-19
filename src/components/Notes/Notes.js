import React, { useState, useEffect, Fragment } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStickyNote,
  faCheckCircle,
  faMinusCircle,
  faSort,
  faPenSquare
} from '@fortawesome/free-solid-svg-icons';
import Note from '../Note/Note';
import NoteForm from '../NoteForm/NoteForm';
import './Notes.scss';
import axios from 'axios';

const Notes = props => {
  const [originalNotes, setOriginalNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [draftsOpen, setDraftsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
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
    if (title === '' && body === '' && author === '') {
      setErrorMsg('Please fill all the fields!');
    } else {
      newNotes.push({
        title,
        body,
        author,
        date: new Date().toUTCString()
      });
      setTitle('');
      setBody('');
      setAuthor('');
      setErrorMsg('');
      setOriginalNotes(newNotes);
      setNotes(newNotes);
      handleClose();
    }
  };

  const handleDraftNote = () => {
    const newDraftNotes = [...drafts];
    if (title === '' && body === '' && author === '') {
      setErrorMsg('Please fill all the fields!');
    } else {
      newDraftNotes.push({
        title,
        body,
        author,
        date: new Date().toUTCString()
      });
      setTitle('');
      setBody('');
      setAuthor('');
      setDrafts(newDraftNotes);
      handleClose();
    }
  };

  const handleRemoveNote = index => {
    if (!draftsOpen) {
      const splicedNotes = [...originalNotes];
      splicedNotes.splice(index, 1);
      setOriginalNotes(splicedNotes);
      setNotes(splicedNotes);
    } else {
      const splicedDrafts = [...drafts];
      splicedDrafts.splice(index, 1);
      setDrafts(splicedDrafts);
    }
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

  const openDrafts = () => {
    const isDraftsOpen = draftsOpen;
    setDraftsOpen(!isDraftsOpen);
  };

  const publishDraft = (title, body, author, index) => {
    const newNotes = [...notes];
    handleRemoveNote(index);
    newNotes.push({
      title,
      body,
      author,
      date: new Date().toUTCString()
    });
    setOriginalNotes(newNotes);
    setNotes(newNotes);
  };

  const addNoteBtn = (
    <Button onClick={handleOpen} className='addNoteBtn' color='blue'>
      <FontAwesomeIcon className='addNoteIcon' icon={faStickyNote} size='1x' />
      Add a note
    </Button>
  );

  const addNoteModal = (
    <Modal
      size='tiny'
      open={openModal}
      trigger={addNoteBtn}
      onClose={handleClose}
    >
      <Modal.Content>
        <NoteForm
          close={handleClose}
          changeTitle={onChangeTitle}
          changeAuthor={onChangeAuthor}
          changeBody={onChangeBody}
          draftsOpen={draftsOpen}
          errorMsg={errorMsg}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleDraftNote} color='red'>
          <FontAwesomeIcon icon={faMinusCircle} size='1x' />
          Save to Drafts
        </Button>
        <Button onClick={handleAddNote} color='green'>
          <FontAwesomeIcon icon={faCheckCircle} size='1x' />
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );

  const selectedNotes = !draftsOpen ? notes : drafts;

  const notesList = selectedNotes.map((note, i) => (
    <Note
      key={i}
      index={i}
      title={note.title}
      body={note.body}
      author={note.author}
      notes={notes}
      removeNote={handleRemoveNote}
      draftsOpen={draftsOpen}
      publishDraft={publishDraft}
    />
  ));

  return (
    <div className='notes'>
      <h1>Notes</h1>
      <Button onClick={openDrafts} className='draftsBtn' color='olive'>
        <FontAwesomeIcon icon={faPenSquare} size='1x' />
        {!draftsOpen ? 'Open Drafts' : 'Open Notes'}
      </Button>
      {!draftsOpen && (
        <Fragment>
          {addNoteModal}
          <Button className='sortNotesBtn' onClick={handleSortNotes}>
            <FontAwesomeIcon className='sortNotes' icon={faSort} size='1x' />
            Sort Notes
          </Button>
          <Input
            className='filterNotesInput'
            onChange={e => handleFilterNotes(e.target.value)}
            placeholder='Filter notes...'
          />
        </Fragment>
      )}
      {notesList}
    </div>
  );
};

export default Notes;
