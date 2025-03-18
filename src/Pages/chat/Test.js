import React, { useRef, useState } from "react";
import "./chat.css";
import { useEffect } from "react";
// import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Layout from "../../Layout";
import { getFriendList } from "../../Redux/Actions/ProfileActions";
import { getLocalStorage } from "../../Utils/LocalStorage";
import { baseUrl } from "../../Utils/ApiUrl";

const Test = () => {
    const dispatch = useDispatch();
    const friendListState = useSelector((state) => state.Profile)
    const { friendList, friendListLoading } = friendListState
    const [friendListData, setFriendListData] = useState([])
    const [getSingleFriendData, setGetSingleFriendData] = useState({})
    const [allMassage, setAllMassage] = useState([])

    const chatSocket = new WebSocket("ws://127.0.0.1:8000/ws/testings/");
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [userId, setUserId] = useState('')
    // const [currentChat, setCurrentChat] = useState(null);
    const [u_id, setU_id] = useState(null)
    const [id, setid] = useState("");
    const [sendMessage, setSendMessage] = useState('');
    useEffect(() => {
        chatSocket.onopen = function (e) {
            console.log("The connection was setup successfully !");
        };
        chatSocket.onclose = function (e) {
            console.log("Something unexpected happened !");
        };
        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            setMessages((messages) => [...messages, data]);
        }
    }, [])



    const handleSubmit = (event) => {
        event.preventDefault()
        if (name && message) {
            event.preventDefault();
            console.log("name", name)
            let data = { username: name, message: message, room_name: "testing" };
            chatSocket.send(JSON.stringify(data));
            setName('');
            setMessage('');
        }
    }

    // Don't forget to close the WebSocket connection when your component unmounts

    useEffect(() => {
        if (friendList) {
            setFriendListData(friendList)
        }
    }, [friendList])
    useEffect(() => {
        dispatch(getFriendList(getLocalStorage("user_id")))
    }, [getLocalStorage("user_id")])
    // console.log(friendListLoading, "sendMessage");
    useEffect(() => {
        if (u_id) {
            const getSingle = friendListData.find((item) => item.id == u_id)
            setGetSingleFriendData(getSingle)
            console.log(getSingle, "getSingle");
        }
    }, [u_id])
    const handleCurrentChatUser = (item) => {
        setU_id(item.id)
        setUserId(item.user)
    }
    console.log(friendListData, "allMassage");
    return (

        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
                <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        {message.username}: {message.message}
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default Test;


// import React, { useRef, useState } from "react";
// // import ChatBox from "../../components/ChatBox/ChatBox";
// // import Conversation from "../../components/Coversation/Conversation";
// // import LogoSearch from "../../components/LogoSearch/LogoSearch";
// // import NavIcons from "../../components/NavIcons/NavIcons";
// import "./chat.css";
// import { useEffect } from "react";
// // import { userChats } from "../../api/ChatRequests";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import Layout from "../../Layout";
// import { createRoom, getFriendList } from "../../Redux/Actions/ProfileActions";
// import { getLocalStorage } from "../../Utils/LocalStorage";
// import { baseUrl } from "../../Utils/ApiUrl";

// const Chat = () => {
//     const dispatch = useDispatch();
//     const friendListState = useSelector((state) => state.Profile)
//     const { friendList, friendListLoading, chatRoomList, chatRoomLoading } = friendListState
//     const [friendListData, setFriendListData] = useState([])
//     const [getSingleFriendData, setGetSingleFriendData] = useState({})
//     const [allMassage, setAllMassage] = useState([])

//     const chatSocket = new WebSocket("ws://127.0.0.1:8000/ws/testings/");
//     // const [chats, setChats] = useState([]);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const [userId, setUserId] = useState('')
//     const [roomName, setRoomName] = useState('');
//     // const [currentChat, setCurrentChat] = useState(null);
//     const [u_id, setU_id] = useState(null)
//     const [id, setid] = useState("");
//     const [sendMessage, setSendMessage] = useState('');
//     const socket = io('http://127.0.0.1:9000', { transports: ['websocket'] });
//     // const [receivedMessage, setReceivedMessage] = useState(null);
//     // // Get the chat in chat section
//     // //   useEffect(() => {
//     // //     const getChats = async () => {
//     // //       try {
//     // //         const { data } = await userChats(user._id);
//     // //         setChats(data);
//     // //       } catch (error) {
//     // //         console.log(error);
//     // //       }
//     // //     };
//     // //     getChats();
//     // //   }, [user._id]);

//     // Connect to Socket.io
//     // useEffect(() => {
//     //     socket.current = io("http://127.0.0.1:5000/");
//     //     socket.current.emit("new-user-add", u_id);
//     //     socket.current.on("connect", (users) => {
//     //         setOnlineUsers(users);
//     //     });
//     // }, [u_id]);

//     // // Send Message to socket server
//     // useEffect(() => {
//     //     if (sendMessage !== null) {
//     //         socket.current.emit("send-message", sendMessage);
//     //     }
//     // }, [sendMessage]);


//     // // Get the message from socket server
//     // useEffect(() => {
//     //     socket.current.on("recieve-message", (data) => {
//     //         console.log(data)
//     //         setReceivedMessage(data);
//     //     }

//     //     );
//     // }, []);

//     useEffect(() => {
//         // Replace 'http://your-server-url' with the URL of your WebSocket server


//         // Add event listeners to handle incoming data
//         socket.on('connect', () => {
//             console.log('Connected to WebSocket server');
//             setid(socket.id)
//             console.log(socket.u_id, "dfsdfsdfds")
//         });

//         socket.on('message', (data) => {
//             console.log('Received message:', data);
//             setAllMassage(prev => [...prev, data])
//             // Handle the incoming data in your React component
//         });

//         // Don't forget to close the WebSocket connection when your component unmounts
//         return () => {
//             socket.disconnect();
//         };
//     }, []);
//     // //   const checkOnlineStatus = (chat) => {
//     // //     const chatMember = chat.members.find((member) => member !== user._id);
//     // //     const online = onlineUsers.find((user) => user.userId === chatMember);
//     // //     return online ? true : false;
//     // //   };
//     const handleSendMessage = (e) => {
//         e.preventDefault();
        
//         // socket.emit('message', { sendMessage, u_id });
//         // socket.emit('message', sendMessage);
//         // const message = {
//         //     senderId: currentUser,
//         //     text: newMessage,
//         //     chatId: chat._id,
//         // }
//         // const receiverId = chat.members.find((id) => id !== currentUser);
//         // send message to socket server
//         // setSendMessage({ ...message, receiverId })
//         // send message to database
//         // try {
//         //     const { data } = await addMessage(message);
//         //     setMessages([...messages, data]);
//         //     setNewMessage("");
//         // }
//         // catch
//         // {
//         //     console.log("error")
//         // }
//     }


//     useEffect(() => {
//         if (friendList) {
//             setFriendListData(friendList)
//         }
//     }, [friendList])
//     useEffect(() => {
//         dispatch(getFriendList(getLocalStorage("user_id")))
//     }, [getLocalStorage("user_id")])
//     // console.log(friendListLoading, "sendMessage");
//     useEffect(() => {
//         if (u_id) {
//             const getSingle = friendListData.find((item) => item.id == u_id);
//             setGetSingleFriendData(getSingle)
//             console.log(getSingle, "getSingle");
//         }
//     }, [u_id])
//     const handleCurrentChatUser = (item) => {
//         dispatch(createRoom(item.slug));
//         setRoomName(item.slug);
//         setU_id(item.id)
//         setUserId(item.user)
//     }
//     console.log(friendListData, "allMassage");
//     return (
//         <Layout>
//             <section style={{ padding: "100px 0" }}>
//                 <div className="content-chat mt-20">
//                     <div className="content-chat-user">
//                         <div className="head-search-chat">
//                             <h4 className="text-center">Chat Finder</h4>
//                         </div>

//                         <div className="search-user mt-30">
//                             <input id="search-input" type="text" placeholder="Search..." name="search" className="search" />
//                             <span>
//                                 <i className="fa-solid fa-magnifying-glass"></i>
//                             </span>
//                         </div>

//                         <div className="list-search-user-chat mt-20">
//                             {friendListData && friendListData.map((item, index) => {
//                                 return (
//                                     <div className="user-chat" key={index} data-username={item.user_data?.first_name.charAt(0).toUpperCase() + item.user_data?.first_name.slice(1) + " " + item.user_data?.last_name.charAt(0).toUpperCase() + item.user_data.last_name
//                                         .slice(1)} onClick={() => handleCurrentChatUser(item)}>
//                                         <div className="user-chat-img">
//                                             <img src={baseUrl + item.profile_picture_data?.image} alt="user_image" />
//                                             <div className="offline"></div>
//                                         </div>

//                                         <div className="user-chat-text">
//                                             <p className="mt-0 mb-0"><strong>{item.user_data?.first_name.charAt(0).toUpperCase() + item.user_data?.first_name.slice(1) + " " + item.user_data?.last_name.charAt(0).toUpperCase() + item.user_data.last_name
//                                                 .slice(1)}</strong></p>
//                                             <small>Hi, how are you?</small>
//                                         </div>
//                                     </div>
//                                 )
//                             })}


//                             {/* <div className="user-chat" data-username="Jorge Harrinson">
//                                 <div className="user-chat-img">
//                                     <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                     <div className="online"></div>
//                                 </div>

//                                 <div className="user-chat-text">
//                                     <p className="mt-0 mb-0"><strong>Jorge Harrinson</strong></p>
//                                     <small>Hi, how are you?</small>
//                                 </div>
//                             </div> */}

//                             {/* <div className="user-chat" data-username="Carla Terry">
//                                 <div className="user-chat-img">
//                                     <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                     <div className="offline"></div>
//                                 </div>

//                                 <div className="user-chat-text">
//                                     <p className="mt-0 mb-0"><strong>Carla Terry</strong></p>
//                                     <small>Hi, how are you?</small>
//                                 </div>
//                             </div> */}
//                         </div>
//                     </div>
//                     {u_id ?
//                         <div className="content-chat-message-user" data-username="Maria Dennis">

//                             <div className="head-chat-message-user">
//                                 <img src={baseUrl + getSingleFriendData?.profile_picture_data?.image} alt="" />
//                                 <div className="message-user-profile">
//                                     <p className="mt-0 mb-0 text-white"><strong>{getSingleFriendData.user_data?.first_name.charAt(0).toUpperCase() + getSingleFriendData.user_data?.first_name.slice(1) + " " + getSingleFriendData.user_data?.last_name.charAt(0).toUpperCase() + getSingleFriendData.user_data?.last_name
//                                         .slice(1)}</strong></p>
//                                     <small className="text-white"><p className="offline  mt-0 mb-0"></p>Offline</small>
//                                 </div>
//                             </div>
//                             <div className="body-chat-message-user">
//                                 {allMassage && allMassage.map((item) => {
//                                     return (
//                                         <div className="message-user-left">
//                                             <div className="message-user-left-img">
//                                                 <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                                 <p className="mt-0 mb-0"><strong>Maria Dennis</strong></p>
//                                                 <small>min 17:59</small>
//                                             </div>
//                                             <div className="message-user-left-text">
//                                                 <strong>Hola, ¿Cómo estás?</strong>
//                                             </div>
//                                         </div>
//                                     )
//                                 })}

//                                 <div className="message-user-right">
//                                     <div className="message-user-right-img">
//                                         <p className="mt-0 mb-0"><strong>Luis Angel Solano Rivera</strong></p>
//                                         <small>min 17:59</small>
//                                         <img src="https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                     </div>
//                                     <div className="message-user-right-text">
//                                         <strong>Hola, ¿Cómo estás?</strong>
//                                     </div>
//                                 </div>

//                                 <div className="message-user-left">
//                                     <div className="message-user-left-img">
//                                         <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                         <p className="mt-0 mb-0"><strong>Maria Dennis</strong></p>
//                                         <small>min 17:59</small>
//                                     </div>
//                                     <div className="message-user-left-text">
//                                         <strong>Hola, ¿Cómo estás?</strong>
//                                     </div>
//                                 </div>
//                                 <div className="message-user-right">
//                                     <div className="message-user-right-img">
//                                         <p className="mt-0 mb-0"><strong>Luis Angel Solano Rivera</strong></p>
//                                         <small>min 17:59</small>
//                                         <img src="https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                     </div>
//                                     <div className="message-user-right-text">
//                                         <strong>Hola, ¿Cómo estás?</strong>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="footer-chat-message-user">
//                                 <div className="message-user-send">
//                                     <input type="text" placeholder="Aa" onChange={(e) => setSendMessage(e.target.value)} />
//                                 </div>
//                                 <button type="button" onClick={handleSendMessage}>
//                                     <i className="fa-solid fa-paper-plane"></i>
//                                 </button>
//                             </div>
//                         </div> :
//                         <div className="content-chat-message-user chat-content-empty p-0 h-100%" data-username="Maria Dennis">
//                             <div className="body-chat-message-user m-0">
//                                 <p classNameName="text-center pt-2">Tab on a chat to start conversation</p>
//                             </div>
//                         </div>}

//                     {/* <div className="content-chat-message-user" data-username="Jorge Harrinson">
//                     <div className="head-chat-message-user">
//                         <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                         <div className="message-user-profile">
//                             <p className="mt-0 mb-0 text-white"><strong>Jorge Harrinson</strong></p>
//                             <small className="text-white"><p className="online mt-0 mb-0"></p>Online</small>
//                         </div>
//                     </div>
//                     <div className="body-chat-message-user">
//                         <div className="message-user-left">
//                             <div className="message-user-left-img">
//                                 <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                 <p className="mt-0 mb-0"><strong>Jorge Harrinson</strong></p>
//                                 <small>min 17:59</small>
//                             </div>
//                             <div className="message-user-left-text">
//                                 <strong>Hola, ¿Cómo estás?</strong>
//                             </div>
//                         </div>
//                         <div className="message-user-right">
//                             <div className="message-user-right-img">
//                                 <p className="mt-0 mb-0"><strong>Luis Angel Solano Rivera</strong></p>
//                                 <small>min 17:59</small>
//                                 <img src="https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                             </div>
//                             <div className="message-user-right-text">
//                                 <strong>Hola, ¿Cómo estás?</strong>
//                             </div>
//                         </div>

//                         <div className="message-user-left">
//                             <div className="message-user-left-img">
//                                 <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                 <p className="mt-0 mb-0"><strong>Jorge Harrinson</strong></p>
//                                 <small>min 17:59</small>
//                             </div>
//                             <div className="message-user-left-text">
//                                 <strong>Hola, ¿Cómo estás?</strong>
//                             </div>
//                         </div>
//                         <div className="message-user-right">
//                             <div className="message-user-right-img">
//                                 <p className="mt-0 mb-0"><strong>Luis Angel Solano Rivera</strong></p>
//                                 <small>min 17:59</small>
//                                 <img src="https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                             </div>
//                             <div className="message-user-right-text">
//                                 <strong>Hola, ¿Cómo estás?</strong>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="footer-chat-message-user">
//                         <div className="message-user-send">
//                             <input type="text" placeholder="Aa" />
//                         </div>
//                         <button type="button">
//                             <i className="fa-solid fa-paper-plane"></i>
//                         </button>
//                     </div>
//                 </div>

//                 <div className="content-chat-message-user" data-username="Carla Terry">
//                     <div className="head-chat-message-user">
//                         <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                         <div className="message-user-profile">
//                             <p className="mt-0 mb-0 text-white"><strong>Carla Terry</strong></p>
//                             <small className="text-white"><p className="offline  mt-0 mb-0"></p>Offline</small>
//                         </div>
//                     </div>
//                     <div className="body-chat-message-user">
//                         <div className="message-user-left">
//                             <div className="message-user-left-img">
//                                 <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                 <p className="mt-0 mb-0"><strong>Carla Terry</strong></p>
//                                 <small>min 17:59</small>
//                             </div>
//                             <div className="message-user-left-text">
//                                 <strong>Hola, ¿Cómo estás?</strong>
//                             </div>
//                         </div>
//                         <div className="message-user-right">
//                             <div className="message-user-right-img">
//                                 <p className="mt-0 mb-0"><strong>Luis Angel Solano Rivera</strong></p>
//                                 <small>min 17:59</small>
//                                 <img src="https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                             </div>
//                             <div className="message-user-right-text">
//                                 <strong>Hola, ¿Cómo estás?</strong>
//                             </div>
//                         </div>

//                         <div className="message-user-left">
//                             <div className="message-user-left-img">
//                                 <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                                 <p className="mt-0 mb-0"><strong>Carla Terry</strong></p>
//                                 <small>min 17:59</small>
//                             </div>
//                             <div className="message-user-left-text">
//                                 <strong>Hola, ¿Cómo estás?</strong>
//                             </div>
//                         </div>
//                         <div className="message-user-right">
//                             <div className="message-user-right-img">
//                                 <p className="mt-0 mb-0"><strong>Luis Angel Solano Rivera</strong></p>
//                                 <small>min 17:59</small>
//                                 <img src="https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
//                             </div>
//                             <div className="message-user-right-text">
//                                 <strong>Hola, ¿Cómo estás?</strong>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="footer-chat-message-user">
//                         <div className="message-user-send">
//                             <input type="text" placeholder="Aa" />
//                         </div>
//                         <button type="button">
//                             <i className="fa-solid fa-paper-plane"></i>
//                         </button>
//                     </div>
//                 </div> */}
//                 </div>
//             </section>
//         </Layout>
//     );
// };

// export default Chat;

