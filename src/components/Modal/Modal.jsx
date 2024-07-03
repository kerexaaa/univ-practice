import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import Chart from "./components/Chart/Chart";
import { DATA } from "../../dataset/dataset";

const Modal = ({ onClose, isOpen }) => {
  const [data, setData] = useState([]);
  const chartUpdateIntervalRef = useRef(null);

  const startUpdating = () => {
    chartUpdateIntervalRef.current = setInterval(() => {
      const updatedPhi1 = DATA.phi1;
      const updatedPhi2 = DATA.phi2Value;
      const updU = DATA.u(DATA.radius, DATA.body_length, DATA.phi1);
      setData((prevData) => [
        ...prevData,
        { phi1: updatedPhi1, phi2: updatedPhi2, u: updU },
      ]);
    }, 10);
  };

  useEffect(() => {
    startUpdating();
    return () => clearInterval(chartUpdateIntervalRef.current);
  }, []);

  const handleStop = () => {
    clearInterval(chartUpdateIntervalRef.current);
    chartUpdateIntervalRef.current = null;
  };

  const handleStart = () => {
    startUpdating();
  };

  const handleClear = () => {
    setData([]);
  }

  return createPortal(
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div>
            <div>
              <Chart data={data}></Chart>
            </div>
          </div>
          <div className={styles.closeButton}>
            <Button onClickEvent={onClose}>Close</Button>
            <Button onClickEvent={handleStart}>Start</Button>
            <Button onClickEvent={handleStop}>Stop</Button>
            <Button onClickEvent={handleClear}>Clear</Button>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
