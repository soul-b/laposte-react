import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
function LogoutComponent({isLoggedIn, setIsLoggedIn}) {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const navigate = useNavigate();
    const handleDisconnectClick = () => {
        setConfirmationOpen(true);
    };

    const handleConfirmDisconnect = () => {
        setIsLoggedIn(false);
        setConfirmationOpen(false);
    };

    const handleCancelDisconnect = () => {
        setConfirmationOpen(false);
        navigate('/employe/profile');
    };

    return (
        <div className="container_l">
            <div>
                {/*{isLoggedIn ? (*/}
                {/*    <div>*/}
                {/*        <h1>Welcome, User!</h1>*/}
                {/*        <button onClick={handleDisconnectClick}>Disconnect</button>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <h1>You are logged out.</h1>*/}
                {/*)}*/}

                {isLoggedIn && (
                    <div>
                        <p>Are you sure you want to disconnect?</p>
                        <button onClick={handleConfirmDisconnect}>Yes</button>
                        <button onClick={handleCancelDisconnect}>No</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LogoutComponent;
