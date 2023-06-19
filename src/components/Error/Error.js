import React from 'react';

import Panel from '../utils/Panel/Panel';

function Error (props) {
  return (
    <div className='Error'>
      <Panel>
        <h2>Error</h2>
        <p>{props.message}</p>
        <button onClick={props.onClose}>Close</button>
      </Panel>
    </div>
  );
}

export default Error;
