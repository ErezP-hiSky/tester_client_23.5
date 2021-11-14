import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import {Link} from 'react-router-dom';
import '../sass/main.scss';


function Home() {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, [])
    return (        
        <div className="home-page" >            
            <div className="db-img"> 
            </div>            
            <div className="hisky-db">
                <h4 className="hisky-db__head">DBM - Data Base Management</h4>
                <hr/>
                <div className="hisky-db__text">
                    <p>
                        hiSky is testing all of its products.<br/> 
                        This is a system that manages the results in real time, 
                        show to the user what is the current status and what should they pay attention to. 
                    </p>
                    <br/>
                    <p>
                        This is a very important system also for the technicians because 
                        they need to observe what are the main fails a terminal or terminals are having.
                    </p>
                    <br/>
                    <h4>
                        If you are new here, please {' '}
                        <Link className="register-text" to="/register">
                            Register.
                        </Link>
                        {' '} else, please {' '}
                        <Link className="register-text" to="/login">
                            Login !
                        </Link>
                    </h4>
                </div>         
            </div>
        </div>        
    );
}


export default Home;
