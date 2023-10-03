import React, { Fragment } from "react";
import doc1 from "../../assets/doc1.PNG";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { faAmbulance } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Footers from "../../Components/Footer/Footer";
import Navbars from "../../Components/Nav/Navbar";
import Banner from "./Banner";

const Home = ()=>{
    return(
        <Fragment>
            <Navbars/>
        <header>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-6">
                          <h5 id="h5">We Provide All Health Care Solution</h5>
                          <h2 id="h2">Protect Your Health And Take care Of Your Health</h2>
                          <button id="buth">
                            <a href="#">Read More</a>
                          </button>
                          <span id="sph">+</span>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="header-box">
                        <img id="imghome" src={doc1} alt="doc1"/>
                        
                        
                        <FontAwesomeIcon icon={faUserMd} id="icon2"/>
                        
                        
                        </div>
                    </div>
                </div>
            </div>
            
        </header> 
        <Banner/>
        <Footers/>
        </Fragment>
        

    )
}
export default Home;
/*<FontAwesomeIcon icon={faAmbulance} id="icon5"/>
<FontAwesomeIcon icon={faSquare} id="icon1"/>*/