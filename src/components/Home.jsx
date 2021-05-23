import React from 'react';
import DBMText from './DBMText';
import ShapedBtns from './shapedBtns';
import '../sass/main.scss';


function Home() {
   return (
        <div>
            <div className="home-page" >
                <DBMText />
                <ShapedBtns />
            </div>
        </div>
    );
}


export default Home;
