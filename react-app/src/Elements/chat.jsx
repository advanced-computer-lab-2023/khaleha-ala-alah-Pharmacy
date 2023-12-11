import React, { useState, useRef, useEffect } from 'react';
import { Buffer } from 'buffer';
import { Magnifier, MOUSE_ACTIVATION } from 'react-image-magnifiers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faTimes, faDownload, faMicrophone ,faPaperPlane,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import FileViewer from 'react-file-viewer';
import { ReactMic } from 'react-mic';



const ChatInterface = ({ name, messages, onSendMessage, setMessages,loading }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const cancel=useRef(false);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileRemove = () => {
    setFile(null);
    setFilePreview(null);
    const fileInput = document.getElementById('fileInput');
    fileInput.value = '';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleSendClick = () => {
    sendMessage();
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const navigate = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = findPreviousIndex(currentIndex);
    } else if (direction === 'next') {
      newIndex = findNextIndex(currentIndex);
    }

    if (newIndex !== undefined) {
      setCurrentIndex(newIndex);
      setSelectedImage(getImageUrl(messages[newIndex]));
    }
  };

  const findPreviousIndex = (currentIndex) => {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (messages[i].file || messages[i].fileData) {
        return i;
      }
    }
    return undefined;
  };

  const findNextIndex = (currentIndex) => {
    for (let i = currentIndex + 1; i < messages.length; i++) {
      if (messages[i].file || messages[i].fileData) {
        return i;
      }
    }
    return undefined;
  };

  const getImageUrl = (message) => {
    if (message.fileData) {
      return `data:image/jpeg;base64,${Buffer.from(message.fileData).toString('base64')}`;
    } else if (message.file) {
      return URL.createObjectURL(message.file);
    }
    return null;
  };

  const getPDFUrl = (message) => {
    if (message.fileData) {
      return `data:application/pdf;base64,${Buffer.from(message.fileData).toString('base64')}`;
    } else if (message.file) {
      return URL.createObjectURL(message.file);
    }
    return null;
  };

  const openPDF = (message) => {
    const pdfWindow = window.open('', '_blank');
    pdfWindow.document.write(`<iframe src="${getPDFUrl(message)}" width="100%" height="100%"></iframe>`);
  };

  const getDocxUrl = (message) => {
    if (message.fileData) {
      return `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${Buffer.from(
        message.fileData
      ).toString('base64')}`;
    } else if (message.file) {
      return URL.createObjectURL(message.file);
    }
    return null;
  };

  const getVoiceNoteUrl = (message) => {
    if (message.fileData) {
      return `data:audio/wav;base64,${Buffer.from(message.fileData).toString('base64')}`;
    } else if (message.voiceNote) {
      return message.voiceNote.blobURL;
    }
    return null;
  }

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = (recordedBlob) => {
      if(!cancel.current){
        setIsRecording(false);
        setRecordedBlob(recordedBlob);
      }
  };
  const handleCancelClick = () => {
    cancel.current=true;
    setIsRecording(false);
  };

  const handleMicClick = () => {
      startRecording();
  };
  useEffect(() => {
    if (recordedBlob !== null ) {
      sendMessage();
    }
  }, [recordedBlob]);

  

  const sendMessage = async () => {
    if(isRecording){
      cancel.current=false;
      stopRecording();
    }
    if (message.trim() === '' && !file && !recordedBlob) {
      return;
    }
    let newMessage;
    if (file && !recordedBlob) {
      newMessage = {
        sender: 'You',
        text: message,
        file: file,
        fileType: file.type,
      };
    } else if (recordedBlob) {
      console.log(recordedBlob);
      newMessage = {
        sender: 'You',
        text: "",
        voiceNote:recordedBlob,
      };
    } else {
      newMessage = {
        sender: 'You',
        text: message,
      };
    }
    onSendMessage(newMessage);
    const updatedMessages = [...messages, newMessage];
    setMessage('');
    setFile(null);
    setFilePreview(null);
    setRecordedBlob(null);
    const fileInput = document.getElementById('fileInput');
    fileInput.value = '';
    setMessages(updatedMessages);
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">{name}</div>
      <div className={`message-list ${loading ? 'blurred-background' : ''}`}>
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div
              className="message-sender"
              sender={message.sender}
              ref={messages.length - 1 === index ? lastMessageRef : null}
            ></div>
            {message.text !== '' && <div className="message-text">{message.text}</div>}
            {((message.fileData || message.file) && message.fileType.startsWith('image/')) && (
              <img
                src={getImageUrl(message)}
                alt="Sent Image"
                style={{ maxWidth: '200px', maxHeight: '200px', cursor: 'pointer' }}
                onClick={() => handleImageClick(getImageUrl(message), index)}
              />
            )}
            {((message.fileData || message.file) && message.fileType === 'application/pdf') && (
              <div className="pdf-container">
                <div
                  style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                  onClick={() => openPDF(message)}
                >
                  <object
                    data={getPDFUrl(message)}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
                <div className="pdf-download">
                  <a href={getPDFUrl(message)} download="downloaded-file.pdf">
                    <FontAwesomeIcon icon={faDownload} /> Download PDF
                  </a>
                </div>
              </div>
            )}
            {((message.fileData || message.file) &&
              message.fileType ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
              <div className="docx-container">
                <div style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
                  <FileViewer
                    fileType="docx"
                    filePath={getDocxUrl(message)}
                    width="100%"
                    height="100%"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
                <div className="docx-download">
                  <a href={getDocxUrl(message)} download="downloaded-file.docx">
                    <FontAwesomeIcon icon={faDownload} /> Download DOCX
                  </a>
                </div>
              </div>
            )}
            {((message.fileData && message.fileType==='audio/wav')||message.voiceNote) && (
              <div className="voice-note">
                <audio controls>
                  <source src={getVoiceNoteUrl(message)} type="audio/wav" />
                </audio>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="message-input">
        {!isRecording&&(
          <label htmlFor="fileInput" className="file-label">
          <FontAwesomeIcon icon={faPaperclip} className="attachment-icon" />
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
        </label>
        )}
        {(file && !isRecording) && (
          <div className="file-preview">
            <img src={filePreview} alt="File Preview" className="file-preview-image" />
            <FontAwesomeIcon icon={faTimes} onClick={handleFileRemove} />
          </div>
        )}

        {!isRecording&&(
          <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        )}
        <ReactMic 
          className={`sound-wave ${isRecording ? '' : 'hidden'}`}
          record={isRecording} 
          onStop={(recordedBlob) => {stopRecording(recordedBlob);}} 
          mimeType="audio/wav"
        />
      
      <div className={`mic-icon ${isRecording ? 'hidden' : ''}`} onClick={handleMicClick}>
          <FontAwesomeIcon icon={faMicrophone} />
        </div>
        {isRecording && (
          <div className="cancel-icon"  onClick={handleCancelClick} >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        )}
        {(message.trim() !== '' || file || isRecording) && (
          <FontAwesomeIcon icon={faPaperPlane} onClick={handleSendClick} />
        )}

      </div>
      
      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <div className="image-display">
              <button onClick={() => navigate('prev')}>Previous</button>
              {(messages[currentIndex].fileData || messages[currentIndex].file) &&
                messages[currentIndex].fileType.startsWith('image/') && (
                  <Magnifier
                    className="image"
                    imageSrc={selectedImage}
                    imageAlt="Sent Image"
                    mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK}
                  />
                )}
              {((messages[currentIndex].fileData || messages[currentIndex].file) &&
                messages[currentIndex].fileType === 'application/pdf') && (
                <div className="pdf-modal">
                  <div className="pdf-overlay" onClick={closeModal}></div>
                  <div className="pdf-content">
                    <p>This is a PDF file</p>
                    <div className="pdf-buttons">
                      <button onClick={() => openPDF(messages[currentIndex])}>Open</button>
                      <a href={getPDFUrl(messages[currentIndex])} download="downloaded-file.pdf">
                        <button>Download</button>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {((messages[currentIndex].fileData || messages[currentIndex].file) &&
                messages[currentIndex].fileType ===
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
                <div className="docx-modal">
                  <div className="docx-overlay" onClick={closeModal}></div>
                  <div className="docx-content">
                    <p>This is a DOCX file</p>
                    <div className="docx-buttons">
                      <a
                        href={getDocxUrl(messages[currentIndex])}
                        download="downloaded-file.docx"
                      >
                        <button>Download</button>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {((messages[currentIndex].fileData && messages[currentIndex].fileType==='audio/wav')||messages[currentIndex].voiceNote) && (
                <div className="voice-note">
                  <audio controls>
                    <source src={getVoiceNoteUrl(messages[currentIndex])} type="audio/wav" />
                  </audio>
                </div>
              )}
              <button onClick={() => navigate('next')}>Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
