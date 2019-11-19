import React from 'react';
import { Checkbox, Segment, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Note.scss';

const Note = props => {
  const { title, body, author, index, notes } = props;
  const isChecked = notes[index].checked;

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
      <div className='checkWrapper'>
        {!props.draftsOpen ? (
          <Segment compact>
            <Checkbox checked={isChecked} />
          </Segment>
        ) : (
          <div></div>
        )}
        <h6>{author}</h6>
      </div>
      {props.draftsOpen && (
        <Button
          onClick={() => props.publishDraft(title, body, author, index)}
          className='publishNoteBtn'
          color='blue'
        >
          Publish Draft
        </Button>
      )}
    </div>
  );
};

export default Note;
