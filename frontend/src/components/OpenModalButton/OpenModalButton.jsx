import { useState } from 'react';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './OpenModal.css';

function UserOptionsButton() {
  const [showOptions, setShowOptions] = useState(false);
  const { setModalContent, setOnModalClose } = useModal();

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
  };

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />);
    setOnModalClose(null);
    setShowOptions(false); 
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
    setOnModalClose(null); 
    setShowOptions(false); 
  };

  return (
    <div className="user-options-container">
      <button onClick={toggleOptions} className="user-button">
        profile
      </button>
      {showOptions && (
        <div className="user-options">
          <button onClick={openLoginModal}>Log In</button>
          <button onClick={openSignupModal}>Sign Up</button>
        </div>
      )}
    </div>
  );
}

export default UserOptionsButton;
