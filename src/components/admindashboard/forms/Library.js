// import { React, useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import TopNav from "../TopNav";
// import SideNav from "../SideNav";

// import useAuth from "../../hooks/useAuth";
// import moment from "moment";
// import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
// // import "./admin.css";
// import { useSidebar } from "../SidebarProvider";

// import { FaPlus, FaMicrophone } from "react-icons/fa";
// import { FiSend } from "react-icons/fi"; // Optional send icon
// const iconButtonStyle = {
//   background: "none",
//   border: "none",
//   color: "white",
//   cursor: "pointer",
//   padding: "6px",
//   borderRadius: "5px",
//   transition: "background 0.3s",
// };

// const Library = () => {
//   const { user } = useAuth();
//   const { isSidebarOpen } = useSidebar(); // Sidebar state
//   const [messages, setMessages] = useState([
//     { sender: "ai", text: "Hello! How can I assist you today?" },
//   ]);
//   const [newMessage, setNewMessage] = useState("");

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const userMessage = { sender: "user", text: newMessage };
//     const aiReply = { sender: "ai", text: "Thanks for your message!" };

//     setMessages((prev) => [...prev, userMessage, aiReply]);
//     setNewMessage("");
//   };

//   return (
//     <div>
//       <body>
//         <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
//           <SideNav />
//           <TopNav />
//           <div
//             className="page-wrapper"
//             style={{
//               marginTop: "10px",
//               backgroundColor: "#212121",
//               marginBottom: "0px",
//               height: "100%",
//               marginBottom: "0",
//             }}
//           >
//             <div className="content">
//               <div
//                 className="chat-container"
//                 style={{
//                   backgroundColor: "#212121",
//                 }}
//               >
//                 {/* Chat Messages */}
//                 <div className="chat-messages">
//                   {messages.map((msg, index) => (
//                     <div
//                       key={index}
//                       className={`message ${
//                         msg.sender === "user" ? "user-message" : "ai-message"
//                       }`}
//                     >
//                       <div className="message-text">{msg.text}</div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Message Input */}
//                 <form
//                   onSubmit={handleSendMessage}
//                   className="chat-input-area"
//                   style={{
//                     backgroundColor: "#212121",
//                   }}
//                 >
//                   <textarea
//                     className="chat-textarea"
//                     placeholder="Send a message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     style={{
//                       resize: "none",
//                       border: "none",
//                       outline: "none",
//                       backgroundColor: "transparent",
//                       color: "white",
//                       fontSize: "14px",
//                       width: "100%",
//                       minHeight: "60px",
//                     }}
//                     rows={3}
//                   />

//                   {/* Action buttons (bottom right) */}
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginTop: "8px",
//                     }}
//                   >
//                     <div style={{ display: "flex", gap: "10px" }}>
//                       <button
//                         type="button"
//                         title="Upload"
//                         style={iconButtonStyle}
//                       >
//                         <FaPlus size={16} />
//                       </button>
//                       <button
//                         type="button"
//                         title="Voice"
//                         style={iconButtonStyle}
//                       >
//                         <FaMicrophone size={16} />
//                       </button>
//                     </div>

//                     <button
//                       type="submit"
//                       className="send-button"
//                       style={{
//                         backgroundColor: "#01007a",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "6px",
//                         padding: "8px 16px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "6px",
//                       }}
//                     >
//                       <FiSend size={16} />
//                       Send
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     </div>
//   );
// };

// export default Library;
import React, { useEffect, useState } from "react";
import { FaPlus, FaMicrophone } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import useAuth from "../../hooks/useAuth";
import { useSidebar } from "../SidebarProvider";

const iconButtonStyle = {
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "5px",
  transition: "background 0.3s",
};

const Library = () => {
  const { isSidebarOpen } = useSidebar();
  const { user } = useAuth();

  const [hasCreatedImage, setHasCreatedImage] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [savedImages, setSavedImages] = useState([]); // Mock your saved images here

  // Simulate loading saved files (mock)
  useEffect(() => {
    // In real-world: fetch from DB or API
    const mockImages = []; // Replace with mock image/file objects if needed
    setSavedImages(mockImages);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = { sender: "user", text: newMessage };
    const aiReply = { sender: "ai", text: "Thanks for your message!" };

    setMessages((prev) => [...prev, userMessage, aiReply]);
    setNewMessage("");
  };

  // UI for initial library
  if (!hasCreatedImage) {
    return (
      <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <SideNav />
        <TopNav />
        <div
          className="page-wrapper"
          style={{ backgroundColor: "#212121", marginTop: "30px" }}
        >
          <div style={{ textAlign: "center", color: "white" }}>
            {savedImages.length > 0 ? (
              <>
                <h2>Your creations</h2>
                <div className="image-gallery" style={{ marginTop: "20px" }}>
                  {savedImages.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={`Generated ${index}`}
                      style={{
                        width: "200px",
                        margin: "10px",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2>You haven't created anything yet</h2>
                <p style={{ marginBottom: "20px", fontSize: "14px" }}>
                  Start by making your first image.
                </p>
                <button
                  onClick={() => setHasCreatedImage(true)}
                  style={{
                    backgroundColor: "#01007a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Make your first image
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Chat Interface shown *after* user clicks "Make your first image"
  return (
    <div>
      <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <SideNav />
        <TopNav />
        <div
          className="page-wrapper"
          style={{
            marginTop: "10px",
            backgroundColor: "#212121",
            height: "100%",
          }}
        >
          <div className="content">
            <div
              className="chat-container"
              style={{
                backgroundColor: "#212121",
              }}
            >
              {/* Chat Messages */}
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${
                      msg.sender === "user" ? "user-message" : "ai-message"
                    }`}
                  >
                    <div className="message-text">{msg.text}</div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form
                onSubmit={handleSendMessage}
                className="chat-input-area"
                style={{
                  backgroundColor: "#212121",
                }}
              >
                <textarea
                  className="chat-textarea"
                  placeholder="Send a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{
                    resize: "none",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "white",
                    fontSize: "14px",
                    width: "100%",
                    minHeight: "60px",
                  }}
                  rows={3}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      title="Upload"
                      style={iconButtonStyle}
                    >
                      <FaPlus size={16} />
                    </button>
                    <button type="button" title="Voice" style={iconButtonStyle}>
                      <FaMicrophone size={16} />
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="send-button"
                    style={{
                      backgroundColor: "#01007a",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FiSend size={16} />
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
