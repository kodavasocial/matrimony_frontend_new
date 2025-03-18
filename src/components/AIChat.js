import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aiChatMessage } from "../Redux/Actions/AuthAction";
import { baseUrl } from "../Utils/ApiUrl";
import { getLocalStorage } from "../Utils/LocalStorage";
// import "./../../src/assets/css/AIChat.css"

const AIChat = () => {
  const dispatch = useDispatch();
  const profileData = JSON.parse(getLocalStorage("profileData"));
  const authState = useSelector((state) => state.Auth);
  const { aiMessageData, aiMessageLoading } = authState;
  const [showBox, setShowBox] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");

  useEffect(() => {
    console.log('aiMessageData>>>', aiMessageData)
    if (aiMessageData?.answer) {
      const aiMessage = { name: "Kaveri", message: aiMessageData?.answer };
      setMessages((messages) => [...messages, aiMessage]);
    }
  }, [aiMessageData]);

  const showChatBox = () => {
    setShowBox(!showBox);
  };

  const handleKeyPress = (e)=>{
    if (e.key === 'Enter'){
      document.getElementsByClassName('send__button')[0].click();
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (sendMessage != "") {
      const userMessage = { name: profileData?.username, message: sendMessage };
      setMessages((messages) => [...messages, userMessage]);
      setSendMessage("");
      dispatch(aiChatMessage(sendMessage));
    }
  };

  return (
    <>
      <div class="container">
        <div className="chat-bot">
          <button class="chat-btn" onClick={showChatBox}>
            <img className="chat-bot-img" src="chat-bot.png" alt="image" />
          </button>
        </div>
        {showBox && (
          <div class="chatbox">
            <div class="chatbox__support">
              <div class="chatbox__header">
                <div class="chatbox__content--header">
                  <h4 class="chatbox__heading--header">Kaveri Bot</h4>
                  <p class="chatbox__description--header">
                    Hi. My name is Kaveri. How can I help you?
                  </p>
                </div>
              </div>
              <div class="chatbox__messages">
                <div className="body-chat-message-user">
                  {messages?.length > 0 &&
                    messages?.map((item) => {
                      return (
                        <div
                          className={
                            item?.name != "Kaveri"
                              ? "message-user-right"
                              : "message-user-left"
                          }
                        >
                          <div
                            className={
                              item?.name != "Kaveri"
                                ? "message-user-right-img"
                                : "message-user-left-img"
                            }
                          >
                            {/* <img src={item.image ? baseUrl + item.image :
                                    "/assets/images/background/bg.jpg"} alt="" /> */}
                            <p className="mt-0 mb-0">
                              <strong>{item.name}</strong>
                            </p>
                          </div>
                          <div
                            className={
                              item?.name != "Kaveri"
                                ? "message-user-right-text"
                                : "message-user-left-text"
                            }
                          >
                            <strong>{item.message}</strong>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div class="chatbox__footer">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  class="chatbox__send--footer send__button"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChat;
