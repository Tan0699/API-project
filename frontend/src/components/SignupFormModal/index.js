


import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className='sign'>
      <button onClick={(e) => (setShowModal(true))}>Sign Up</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;