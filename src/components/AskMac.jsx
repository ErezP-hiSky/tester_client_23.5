import axios from 'axios';
import React, { useState } from 'react'

function AskMac() {
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [description, setDescription] = useState('');
    const [mac, setMac] = useState('');

    
    const submitHandler = async (e) => {
        e.preventDefault();
        // give MAC address        
        const mac_not_taken = await axios.get('/api/mac/get_new_mac');
        const mac_to_take = mac_not_taken.data['Mac_Address']
        if (serialNumber.length < 14) {
            alert('Serial Number is too short.\nNo MAC was given.')
        } else {
            const new_mac = {            
                SN: serialNumber,
                Note1: description,
                Name: name            
            } 
            await axios.put(`/api/mac/update_mac/${mac_to_take}`, new_mac);        
            setName('');
            setSerialNumber('');
            setDescription('');
            setMac(mac_to_take);
        }
    }
    
    return (
        <div>            
            <form onSubmit={submitHandler} className="ask-mac-form">
                <div className="ask-mac-form-div">
                    <p htmlFor="name" className="ask-mac-p">
                        Enter your name:
                    </p>
                    <input type="text" className="width-100 name-input-field "
                        name="name" onChange={e => setName(e.target.value)}
                        placeholder="Your name" value={name} required
                        />                    
                </div>
                <div className="ask-mac-form-div">
                    <p htmlFor="serial_number" className="ask-mac-p">
                        Enter serial number:
                    </p>
                    <input type="text" className="width-100 name-input-field "
                        name="serial_number" onChange={e => setSerialNumber(e.target.value)}
                        placeholder="Serial number" value={serialNumber} required
                        />                    
                </div>
                <div>
                    <p htmlFor="description" className="ask-mac-p">
                        Enter unit purpose:
                    </p>
                    <input type="text" className="width-100 name-input-field" 
                        name="description" onChange={e => setDescription(e.target.value)}
                        placeholder="Description" value={description} required                            
                    />                    
                </div>
                <br/>
                <div>
                    <button className="btn btn-sm btn-primary width-100" 
                        type="submit">Ask for MAC</button>
                </div>
            </form>
            <br/>
            <div className="card p m-1">
                <label className="m-1">Your MAC is:</label>
                <label className="m-1 p back-sky">{mac}</label>
            </div>
            <p className="lead">If a MAC delete is needed, please refer the authorized person.</p>
        </div>
    )
}

export default AskMac
