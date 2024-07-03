import { useState } from "react";
import Field from "./components/Field/Field";
import FullModel from "./components/FullModel/FullModel";
import Header from "./components/Header/Header";
import useDisclouse from "./hooks/useDisclouse";

function App() {

  const {isOpen, onClose, onOpen } = useDisclouse(true);
  const [isFullMode, setIsFullMode] = useState(false);

  const toggleFullMode = () => {
    setIsFullMode((prev) => !prev);
  };

  return (
    <div style={{height:"100dvh"}}>
      {!isFullMode && <Header />}
      {isFullMode && <FullModel toggleFullMode={toggleFullMode} />}
      {!isFullMode && <Field onOpen={onOpen} onClose={onClose} isOpen={isOpen} toggleFullMode={toggleFullMode}/>}
    </div>
  );
}

export default App;
