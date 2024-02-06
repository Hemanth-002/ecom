import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  min-height: 28rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  padding: 1.2rem;
  overflow-y: scroll;
`;

const ModalComponent = ({ setOpen, form }) => {
  return (
    <Modal>
      <ModalContent>
        <div style={{display:"flex",width:'100%',justifyContent: 'flex-end'}}>
        <IoMdClose size={30} onClick={() => setOpen(false)}/>
        </div>
        {form}
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
