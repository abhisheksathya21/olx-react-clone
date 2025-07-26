import React from 'react';
import { Modal } from 'flowbite-react';
import guitar from '../../../assets/guita.png'
import close from '../../../assets/close.svg';
import './Login.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../utils/firebase';
import 'react-toastify/dist/ReactToastify.css';


const Login = ({ toggleModal, status }) => {


    const handleClick= async()=>{
      try {
        const result=await signInWithPopup(auth,provider);
        toggleModal();
        console.log('user',result.user);
        
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <Modal show={status} onClick={toggleModal}>
      <div className="modal-centered-wrapper" onClick={(event)=>{event.stopPropagation()}}>
        <img src={close} className="close-btn" onClick={toggleModal} alt="close" />

        <div className="login-modal-content">
          <img src={guitar} alt="Login Icon" className="login-icon" />
          <p className="login-message">
            Help us become one of the safest places to buy and sell
          </p>

          <button className="login-btn phone">📱 Continue with phone</button>
          <button className="login-btn google" onClick={handleClick}>Continue with Google</button>
          <p className="or-text">OR</p>
          <p className="email-login">Login with Email</p>

          <p className="privacy-text">
            All your personal details are safe with us.
          </p>
          <p className="terms-text">
            If you continue, you are accepting <span>OLX Terms and Conditions</span> and <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
