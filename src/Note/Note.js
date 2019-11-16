import React from 'react';
import './Note.scss';

const Note = props => {
  return (
    <div className='note'>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <h6>{props.author}</h6>
    </div>
  );
};

export default Note;
