import React, { useState, useEffect } from 'react';
const Authorized_patient=()=> {
    return(
        <header>
            <div className="container">
                <div className="row">
                <div className="col-md-3 col-sm-6">
                          <h5>Weelcome to HealthTrust</h5>
                          
                          <button>
                            <a href="#">calendar</a>
                          </button>
                    </div>
                    <div className="col-md-3 col-sm-6">
                    <button>
                            <a href="#">Add patient</a>
                          </button>
                        </div>
                        <div className="col-md-3 col-sm-6">
                        <button>
                            <a href="#">View patient record</a>
                          </button>
                    </div>
                </div>
            </div>
        </header> 
    );
}
export default Authorized_patient;