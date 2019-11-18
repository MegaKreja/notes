import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Note.scss';

const Note = props => {
  const { title, body, author, index } = props;

  return (
    <div className='note'>
      <div className='deleteWrapper'>
        <h2>{title}</h2>
        <FontAwesomeIcon
          onClick={() => props.removeNote(index)}
          className='removeNoteIcon'
          icon={faTimesCircle}
          color='red'
          size='2x'
        />
      </div>
      <p>{body}</p>
      <h6>{author}</h6>
    </div>
  );
};

export default Note;
