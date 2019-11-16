import React, { useState, useEffect } from 'react';
import './Notes.css';
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
        console.log(notes.data);
      })
      .catch(err => console.log(err));
  });

  return (
    <div className='notes'>
      <h1>Hello</h1>
    </div>
  );
};

export default Notes;
