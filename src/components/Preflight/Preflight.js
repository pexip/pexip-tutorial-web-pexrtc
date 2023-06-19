import { useState } from 'react';
import Panel from '../utils/Panel/Panel';

function Preflight(props) {

  const [nodeDomain, setNodeDomain] = useState('pexipdemo.com')
  const [vmr, setVmr] = useState('meet.marcoscereijo')
  const [displayName, setDisplayName] = useState('Marcos')

  return (
    <div className='Preflight'>
      <Panel>
        <h2>Join a conference</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(nodeDomain, vmr, displayName);
        }}>
          <div className='input-container'>
            <label>Conference Node Domain</label>
            <input type='text' required value={nodeDomain} onChange={(event) => setNodeDomain(event.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Conference (VMR)</label>
            <input type='text' required value={vmr} onChange={(event) => setVmr(event.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Display Name</label>
            <input type='text' required value={displayName} onChange={(event) => setDisplayName(event.target.value)}/>
          </div>
          <input type='submit' value='Join'/>
        </form>
      </Panel>
    </div>
  );
}

export default Preflight;
