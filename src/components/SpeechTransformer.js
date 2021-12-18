import React, { useState, useEffect } from 'react'
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechRecord = new SpeechRecognition();

speechRecord.continuous = true;
speechRecord.interimResults = true;
speechRecord.lang = 'en-US';

export const SpeechTransformer = ({ setValue, value, handleSubmit }) => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  useEffect(() => {
    handleListening();
  }, [isListening]);



  const handleListening = () => {
    if (isListening) {
      speechRecord.start();
      speechRecord.onend = () => {
        console.log('continue');
        speechRecord.start()
      }
    } else {
      speechRecord.stop();
      speechRecord.onend = () => {
        console.log('Stop record');
        setValue('');
      }
    }
    speechRecord.onstart = () => {
      console.log('speech record on')
    }

    speechRecord.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setNote(transcript.toLowerCase());
      setValue(transcript.toLowerCase());
      console.log(transcript);
      speechRecord.onerror = (event) => {
        console.log(event.error)
      }
    }
  }
  const handleResetNotes = () => {
    speechRecord.stop();
    speechRecord.onend = () => {
      console.log('Stop record');
      setValue('');
      setNote(null);
      speechRecord.start()
    }
  }
  const handleAddNote = () => {
    handleSubmit();
    setNote(null);
    setIsListening(false);
  }
  return (
    <>
      <div className={isListening ? "background show" : ""}></div>
      <div className={isListening ? "note-container show" : "note-container"}>
        <h4>Record</h4>
        <p className="note">{note}</p>
        <div className="btn-container">
          <button className="btn btn-action" onClick={() => handleAddNote()}>Add</button>
          <button className="btn btn-action" onClick={() => handleResetNotes()}>Reset</button>
        </div>
      </div>
      <div className="speech-container">
        {isListening
          ? <BsFillMicFill onClick={() => setIsListening(prev => !prev)} />
          : <BsFillMicMuteFill onClick={() => setIsListening(prev => !prev)} />}
      </div>
    </>
  )
}


