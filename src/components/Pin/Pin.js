import React, { useState } from 'react';

import Panel from '../utils/Panel/Panel';

function Pin (props) {

  const [pin, setPin] = useState('');

  return (
    <div className='Pin'>
      <Panel>
        <h2>Enter PIN</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(pin);
        }}>
          <div className='input-container'>
            <input type='password' required={props.required}
              placeholder='Enter the PIN'
              value={pin} onChange={(event) => setPin(event.target.value)}/>
          </div>
          <input type='submit' value='Join'/>
        </form>
      </Panel>
    </div>
  );
}

export default Pin;
