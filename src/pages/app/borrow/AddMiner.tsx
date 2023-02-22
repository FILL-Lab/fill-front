/** @format */

import { Modal, Input, Button, message } from "antd";
import { useState } from "react";
import Validation from "@/store/Validation";
import Contract from "@/store/contract";

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [miner, setMiner] = useState("0x00a36b");
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
      "0xaa7521a260bb22d5470f7813bfcced5dbc5e2edbd20f28611ba222c46f384866123d6e76076396596c08ed7b99a4d531021fa72f2225844af1aa1f119eab1c54325b9af0c613beb58464d539784d9ab73ddfeababece7ac36095bf5f062d2196"
    );
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
