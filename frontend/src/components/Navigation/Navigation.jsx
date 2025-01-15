import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { useModal } from '../../context/Modal';

function Navigation({ isLoaded }) {
  const [showOptions, setShowOptions] = useState(false); // For showing login/signup buttons
  const sessionUser = useSelector((state) => state.session.user);
  const { setModalContent, setOnModalClose } = useModal();

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState); // Toggle the dropdown visibility
  };

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />);
    setOnModalClose(null);
    setShowOptions(false); // Optionally close the dropdown after clicking
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
    setOnModalClose(null);
    setShowOptions(false); // Optionally close the dropdown after clicking
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <div className="user-options-container">
        <button onClick={toggleOptions} className={`user-button ${showOptions ? 'active' : ''}`}>
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

  return (
    <ul className="navigation-bar">
      <li>
        <NavLink to="/" id="home-link">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
