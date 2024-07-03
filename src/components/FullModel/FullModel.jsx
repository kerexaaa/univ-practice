import Button from "../Button/Button";
import styles from "./FullModel.module.css";

const FullModel = ({ toggleFullMode }) => {
  return (
    <div style={{ padding: "3rem" }}>
      <div className={styles.center}>
        <div className={styles.body}>
          <div
            style={{
              border: "3px solid black",
              width: "100px",
              height: "50px",
            }}
          >
            <div
              style={{
                border: "3px solid black",
                width: "10px",
                height: "10px",
                position: "absolute",
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: "3",
              }}
            ></div>
            <div
              style={{
                border: "3px solid black",
                width: "200px",
                height: "20px",
                position: "absolute",
                top: "-130px",
                left: "64%",
                rotate: "-55deg",
                transform: "translate(-50%,-50%)",
                zIndex: "1",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  border: "3px solid black",
                  width: "160px",
                  height: "10px",
                  position: "absolute",
                  top: "7px",
                  left: "55%",
                  transform: "translate(-50%,-50%)",
                  borderRadius: "10px",
                }}
              ></div>
            </div>
          </div>
          <div
            style={{
              border: "3px solid black",
              width: "75px",
              height: "150px",
              position: "absolute",
              top: "-148px",
              left: "50%",
              transform: "translateX(-50%)",
              borderTopLeftRadius: "100px",
              borderTopRightRadius: "100px",
            }}
          >
          </div>
          <div
              style={{
                position: "absolute",
                height: "10px",
                width: "100px",
                border: "3px solid black",
                borderRadius: "10px",
                left: "67%",
                transform: "translateX(-50%)",
                rotate: "45deg",
                top: "-67px",
                backgroundColor: "white",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "10px",
                  width: "10px",
                  border: "3px solid black",
                  borderRadius: "10px",
                  left: "95%",
                  top: "1px",
                  transform: "translateX(-50%)",
                  rotate: "45deg",
                  backgroundColor: "white",
                }}
              ></div>
            </div>
        </div>
      </div>
      <Button onClickEvent={toggleFullMode}>Leave</Button>
    </div>
  );
};

export default FullModel;
