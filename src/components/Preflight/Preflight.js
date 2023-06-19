import { useEffect, useState } from 'react';
import Panel from '../utils/Panel/Panel';

const nodeDomainKey = 'pexip-node-domain';
const vmrKey = 'pexip-vmr';
const displayNameKey = 'pexip-display-name';

function Preflight(props) {

  const [nodeDomain, setNodeDomain] = useState('');
  const [vmr, setVmr] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const nodeDomain = localStorage.getItem(nodeDomainKey) ?? '';
    const vmr = localStorage.getItem(vmrKey) ?? '';
    const displayName = localStorage.getItem(displayNameKey) ?? '';
    setNodeDomain(nodeDomain);
    setVmr(vmr);
    setDisplayName(displayName);
  }, []);

  return (
    <div className='Preflight'>
      <Panel>
        <h2>Join a conference</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          localStorage.setItem(nodeDomainKey, nodeDomain);
          localStorage.setItem(vmrKey, vmr);
          localStorage.setItem(displayNameKey, displayName);
          props.onSubmit(nodeDomain, vmr, displayName);
        }}>
          <div className='input-container'>
            <label>Conference Node Domain</label>
            <input type='text' required value={nodeDomain} placeholder='192.168.1.100 or pexipdemo.com' onChange={(event) => setNodeDomain(event.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Conference (VMR)</label>
            <input type='text' required value={vmr} placeholder='conference' onChange={(event) => setVmr(event.target.value)}/>
          </div>
          <div className='input-container'>
            <label>Display Name</label>
            <input type='text' required value={displayName} placeholder='John Smith' onChange={(event) => setDisplayName(event.target.value)}/>
          </div>
          <input type='submit' value='Join'/>
        </form>
      </Panel>
    </div>
  );
}

export default Preflight;
