'use client'
import { useState } from "react";
import HumanPrompt from "./human";
import AI from "./ai";
import "@styles/createStyle.css";

const CreatePrompt = () => {

  const [outputType, setOutput] = useState("human");

  const setActive = (outputType: string) => {
    setOutput(outputType);
  };

  return (
    <div className=" create-control p-2">
        <button
          type="button"
          className={`text-center; p-2 ${
            outputType === "human" ? "text-cyan-600" : "text-black-500"
          }`}
          onClick={() => setActive("human")}
        >
          Human Generated
        </button>
        <button
          type="button"
          className={`text-center; p-2 ${
            outputType === "AI" ? "text-cyan-600" : "text-black-500"
          }`}
          onClick={() => setActive("AI")}
        >
          AI Generated
        </button>


      {outputType === "human" ? <HumanPrompt /> : <AI />}
    </div>
  );
};

export default CreatePrompt;
