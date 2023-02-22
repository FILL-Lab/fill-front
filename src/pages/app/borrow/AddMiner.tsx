/** @format */

import { Modal, Input, Button, message } from "antd";
import { useState } from "react";
import Validation from "@/store/Validation";
import Contract from "@/store/contract";

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [miner, setMiner] = useState("");
  const [signature, setSignature] = useState("");
  const getSigningMsg = () => {
    if (miner) {
      //0x00a36b
      Validation.getSigningMsg(miner);
    } else {
      message.warning("please enter miner ");
    }
  };

  const handleMine = () => {
    Contract.bindMiner(
      "0x00a36b",
      "0xa3c872184195159bcdeb55108992eba1bb2e1a75ff03e31404005de783eb3396d5ad412c9461d13b5d75f8a4af4a962a06fdd69b0bd325fe300a2d4ff3309148f9d94072731eafb7547bcfe4a3783e3286e9e25ffecb4b3dbbdcaccfeb87849f"
    );
  };
  return (
    <>
      <div
        className='miner-btn'
        onClick={() => {
          setIsModalOpen(true);
          //handleClick();
        }}>
        Add Miner
      </div>
      <Modal
        wrapClassName='app-modal-wrap access-modal borrow-modal'
        open={isModalOpen}
        title='Add Miner'
        footer={
          <>
            <div
              className='connect-btn'
              onClick={() => {
                setIsModalOpen(false);
              }}>
              cancel
            </div>
            <div className='connect-btn confirm-btn' onClick={handleMine}>
              {"confirm"}
            </div>
          </>
        }>
        <div className='miner-label'>
          <span className='title'>Address:</span>
          <Input
            className='app-input access-input miner-input'
            value={miner}
            onPressEnter={() => getSigningMsg()}
            onChange={(e) => {
              setMiner(e.target.value);
            }}
          />
        </div>
        <div className='miner-label'>
          <span className='title'>signature:</span>
          <Input
            className='app-input access-input miner-input'
            value={signature}
            onChange={(e) => {
              setSignature(e.target.value);
            }}
          />
        </div>
      </Modal>
    </>
  );
};
