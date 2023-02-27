/** @format */

import { Modal, Input, Button, message } from "antd";
import { useState } from "react";
import Validation from "@/store/Validation";
import Contract from "@/store/contract";

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [miner, setMiner] = useState("0x00878a01");
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
    Contract.bindMiner(miner, signature);
  };

  const handleUnbind = () => {
    Contract.unbindMiner("0x00a36b");
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
        onCancel={() => {
          setIsModalOpen(false);
        }}
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
        <Button onClick={handleUnbind}>解绑</Button>
      </Modal>
    </>
  );
};
