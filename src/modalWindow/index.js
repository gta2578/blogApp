import React from "react";
import { useAuth } from "../context/auth";

function Modal() {
  const { isModal, setIsModal } = useAuth();
  const newModalState = { isOpen: false, text: "", action: null };
  console.log(isModal);
  return (
    <div className={isModal.isOpen ? "overlay show" : "overlay"}>
      <div className="dialog">
        <p>{isModal.text}</p>
        <button
          onClick={() => {
            isModal.action && isModal.action();
            setIsModal(newModalState);
          }}
        >
          OK
        </button>
        <button
          onClick={() => {
            setIsModal(newModalState);
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default Modal;
