import { useEffect, useRef, useState } from "react";
import styles from "./Field.module.css";
import { DATA } from "../../dataset/dataset";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const Field = ({ onOpen, onClose, isOpen, toggleFullMode }) => {
  const [radius, setRadius] = useState(DATA.radius);
  const [deltaPhi, setDeltaPhi] = useState(DATA.phi1);
  const radiusInputRef = useRef(DATA.radius);

  // anim

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const duration = 5000;

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - (deltaPhi / 360) * duration;
      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const updatedPhi = (elapsedTime / duration) * 360;
        setDeltaPhi(Math.floor(updatedPhi % 360));
        DATA.phi1 = Math.floor(updatedPhi % 360);
        DATA.phi2Value = DATA.phi2(DATA.radius, DATA.body_length, DATA.phi1);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startAnimation = () => {
    setDeltaPhi(deltaPhi);
    setIsRunning(true);
  };

  const endAnimation = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // anim

  const changeRadius = (e) => {
    setRadius((prev) => (prev = e.target.value));
    DATA.radius = Number(radiusInputRef.current.value);
    DATA.body_length = Number(radiusInputRef.current.value) + 40;
    DATA.backstage.lk = Number(radiusInputRef.current.value) + DATA.body_length;
    DATA.backstage.l0 = Number(radiusInputRef.current.value) * 2;
  };

  return (
    <div className={styles.fieldWrapper}>
      <Modal isOpen={isOpen} onClose={onClose}></Modal>
      <div className={styles.valuesField}>
        <div style={{ background: "gray" }}>values</div>
        <div className={styles.values} style={{ background: "#d4d4d4" }}>
          <div className={styles.label} style={{ zIndex: "100" }}>
            <label htmlFor="radius">R: {DATA.radius}</label>
            <input
              type="range"
              name="radius"
              min="40"
              max="100"
              step="1"
              value={radius}
              ref={radiusInputRef}
              onChange={(e) => changeRadius(e)}
            />
          </div>
          <div>
            <p>L: {DATA.body_length}</p>
          </div>
          <div>
            <p>
              L<sub>k</sub>: {DATA.backstage.lk}
            </p>
          </div>
          <div>
            <p>
              L<sub>0</sub>: {DATA.backstage.l0}
            </p>
          </div>
          <div>
            <p>
              &phi;<sub>1</sub>: {DATA.phi1}&deg;
            </p>
          </div>
          <div>
            <p>
              &phi;<sub>2</sub>:{" "}
              {DATA.phi2(DATA.radius, DATA.body_length, DATA.phi1)}&deg;
            </p>
          </div>
          <div>
            <p>u: {DATA.u(DATA.radius, DATA.body_length, DATA.phi1)}</p>
          </div>
        </div>
      </div>
      <div className={styles.showcaseField}>
        <div style={{ background: "gray" }}>showcase</div>
        <div
          className={styles.showcase}
          style={{
            background: "#f1f1f1",
            height: "calc(100% - 18px)",
            position: "relative",
          }}
        >
          <div
            style={{
              borderTop: "none",
              position: "absolute",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Button onClickEvent={startAnimation}>Start</Button>
            <Button onClickEvent={endAnimation}>Stop</Button>
            <Button onClickEvent={onOpen}>Show Graphs</Button>
            <Button onClickEvent={toggleFullMode}>Toggle Full Model</Button>
          </div>
          <svg
            style={{
              position: "absolute",
              transform: "translateX(-50%)",
              left: "50%",
              top: `${410 - Number(DATA.radius)}px`,
              width: "48px",
              height: "48px",
            }}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="549.000000pt"
            height="426.000000pt"
            viewBox="0 0 549.000000 426.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,426.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M2847 4070 c-92 -24 -179 -96 -219 -185 -17 -38 -22 -68 -22 -130 0
          -98 24 -159 90 -226 l45 -46 -642 -1237 -643 -1236 -533 0 -533 0 0 -65 0 -65
          352 0 353 0 -200 -203 c-594 -602 -551 -555 -532 -574 17 -17 35 -1 410 380
          l392 398 375 -1 375 0 -200 -203 c-594 -602 -551 -555 -532 -574 17 -17 35 -1
          410 380 l392 398 365 -1 365 0 -200 -203 c-594 -602 -551 -555 -532 -574 17
          -17 35 -1 410 380 l392 398 375 -1 375 0 -200 -203 c-594 -602 -551 -555 -532
          -574 17 -17 35 -1 410 380 l392 398 380 -1 380 0 -200 -203 c-594 -602 -551
          -555 -532 -574 17 -17 35 -1 410 380 l392 398 335 -1 335 0 -200 -202 c-594
          -603 -551 -556 -532 -575 17 -17 35 -1 410 380 228 231 399 398 410 397 14 0
          17 10 17 65 l0 65 -408 0 -408 0 -643 1236 -642 1237 45 46 c66 67 90 128 90
          226 0 61 -5 92 -23 131 -27 63 -101 136 -163 164 -55 24 -156 33 -211 20z
          m189 -98 c86 -44 128 -116 128 -217 0 -76 -15 -117 -63 -168 -46 -50 -98 -71
          -176 -71 -78 0 -130 21 -176 71 -48 51 -63 92 -63 168 0 117 60 199 174 236
          40 13 133 3 176 -19z m-111 -537 c28 0 64 3 81 7 l31 7 629 -1211 c346 -666
          631 -1214 632 -1219 2 -5 -577 -9 -1373 -9 -796 0 -1375 4 -1373 9 2 5 286
          553 632 1219 l629 1211 31 -7 c17 -4 54 -7 81 -7z"
              />
            </g>
          </svg>
          <div
            style={{
              borderTop: "none",
              width: "3px",
              height: "3px",
              rotate: `${90 + DATA.phi1}deg`,
              position: "relative",
              left: "calc(50%)",
              transform: "translateX(-50%)",
              top: `${386 - Number(DATA.radius)}px`,
              textAlign: "unset",
            }}
          >
            <svg
              style={{
                position: "absolute",
                background: "#000",
              }}
              width={radius}
              height="3"
              viewBox="0 0 1000 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 1H1000" stroke="black" stroke-width="2" />
            </svg>
            <svg
              style={{
                position: "absolute",
                top: "-2.5px",
                left: `${radius}px`,
              }}
              width="8"
              height="8"
              viewBox="0 0 5 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 2.5C4.5 3.60457 3.60457 4.5 2.5 4.5C1.39543 4.5 0.5 3.60457 0.5 2.5C0.5 1.39543 1.39543 0.5 2.5 0.5C3.60457 0.5 4.5 1.39543 4.5 2.5Z"
                stroke="black"
              />
            </svg>
          </div>
          <div
            style={{
              borderTop: "none",
              width: "3px",
              height: "3px",
              rotate: `${
                -DATA.phi2(DATA.radius, DATA.body_length, DATA.phi1) - 90
              }deg`,
              position: "relative",
              left: "calc(50%)",
              transform: "translateX(-50%)",
              top: "426px",
              textAlign: "unset",
            }}
          >
            <svg
              style={{
                position: "absolute",
                border: "2px solid black",
                borderRadius: "5px",
                width: `${
                  DATA.backstage.l0 * (DATA.backstage.lk / DATA.backstage.l0)
                }`,
                top: "50%",
                left: "1.5rem",
                transform: "translateY(-50%)",
              }}
              width="60"
              height="10"
              viewBox="0 0 1000 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M166.667 1H833.333C924.93 1 999 67.8061 999 150C999 232.194 924.93 299 833.333 299H166.667C75.0698 299 1 232.194 1 150C1 67.8061 75.0698 1 166.667 1Z"
                stroke="black"
                stroke-opacity="0.3"
                stroke-width="2"
              />
            </svg>
            <svg
              style={{
                position: "absolute",
                background: "#000",
                width: `1.5rem`,
              }}
              height="3"
              viewBox="0 0 1000 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 1H1000" stroke="black" stroke-width="2" />
            </svg>
          </div>
          <svg
            style={{
              position: "absolute",
              transform: "translateX(-50%)",
              left: "50%",
              top: "450px",
              width: "48px",
              height: "48px",
            }}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="549.000000pt"
            height="426.000000pt"
            viewBox="0 0 549.000000 426.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,426.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M2847 4070 c-92 -24 -179 -96 -219 -185 -17 -38 -22 -68 -22 -130 0
          -98 24 -159 90 -226 l45 -46 -642 -1237 -643 -1236 -533 0 -533 0 0 -65 0 -65
          352 0 353 0 -200 -203 c-594 -602 -551 -555 -532 -574 17 -17 35 -1 410 380
          l392 398 375 -1 375 0 -200 -203 c-594 -602 -551 -555 -532 -574 17 -17 35 -1
          410 380 l392 398 365 -1 365 0 -200 -203 c-594 -602 -551 -555 -532 -574 17
          -17 35 -1 410 380 l392 398 375 -1 375 0 -200 -203 c-594 -602 -551 -555 -532
          -574 17 -17 35 -1 410 380 l392 398 380 -1 380 0 -200 -203 c-594 -602 -551
          -555 -532 -574 17 -17 35 -1 410 380 l392 398 335 -1 335 0 -200 -202 c-594
          -603 -551 -556 -532 -575 17 -17 35 -1 410 380 228 231 399 398 410 397 14 0
          17 10 17 65 l0 65 -408 0 -408 0 -643 1236 -642 1237 45 46 c66 67 90 128 90
          226 0 61 -5 92 -23 131 -27 63 -101 136 -163 164 -55 24 -156 33 -211 20z
          m189 -98 c86 -44 128 -116 128 -217 0 -76 -15 -117 -63 -168 -46 -50 -98 -71
          -176 -71 -78 0 -130 21 -176 71 -48 51 -63 92 -63 168 0 117 60 199 174 236
          40 13 133 3 176 -19z m-111 -537 c28 0 64 3 81 7 l31 7 629 -1211 c346 -666
          631 -1214 632 -1219 2 -5 -577 -9 -1373 -9 -796 0 -1375 4 -1373 9 2 5 286
          553 632 1219 l629 1211 31 -7 c17 -4 54 -7 81 -7z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Field;
