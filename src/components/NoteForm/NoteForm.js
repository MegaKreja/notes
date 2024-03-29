import React from 'react';
import { Input } from 'semantic-ui-react';
import './NoteForm.scss';

const NoteForm = props => {
  return (
    <div className='noteForm'>
      <div className='formRowWrapper'>
        <Input
          onChange={props.changeAuthor}
          placeholder='Enter author name...'
        />
        <Input onChange={props.changeTitle} placeholder='Enter note title...' />
      </div>
      <Input
        onChange={props.changeBody}
        fluid
        placeholder='Enter note text...'
      />
      {props.errorMsg !== '' && <p>{props.errorMsg}</p>}
    </div>
  );
};

export default NoteForm;
