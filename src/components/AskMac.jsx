import axios from 'axios';
import React, { useContext, useState } from 'react'
import AlertContext from '../context/alert/alertContext';

function AskMac() {
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [description, setDescription] = useState('');
    const [allSN, setAllSN] = useState([]);
    const [mac, setMac] = useState('');

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const getAllSN = async () => {
        const {data} = await axios.get('/general-test-data');
        
        const allsnArr = []
        data.forEach((item) => {
            if (!allsnArr.includes(item['unit_SN'])) {
                allsnArr.push(item['unit_SN']);                            
            }                        
        });
        allsnArr.sort();
        // console.log(allsnArr)
        setAllSN(allsnArr);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        getAllSN();
        // give MAC address        
        const mac_not_taken = await axios.get('/api/mac/get_new_mac');
        const mac_to_give = mac_not_taken.data['Mac_Address']
        if (allSN.includes(serialNumber)) {
            setAlert('Serial Number already exist.\nNo MAC was given.', 'danger')
        } else {
            const new_mac = {            
                SN: serialNumber,
                Note1: description,
                Name: name            
            } 
            await axios.put(`/api/mac/update_mac/${mac_to_give}`, new_mac);        
            setName('');
            setSerialNumber('');
            setDescription('');
            setMac(mac_to_give);
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
            <div className="tech-container">
                <label className="m-1">Your MAC is:</label>
                <label className="m-1 p back-sky">{mac}</label>
            </div>
            <p className="lead">If a MAC delete is needed, please refer the authorized person.</p>
        </div>
    )
}

export default AskMac
