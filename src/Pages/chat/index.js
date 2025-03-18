import React, { useState } from "react";
import "./chat.css";
import Layout from "../../Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, getFriendList, getCustomSearchProfile } from "../../Redux/Actions/ProfileActions";
import { getLocalStorage } from "../../Utils/LocalStorage";
import { baseUrl, chatPortUrl, Api } from "../../Utils/ApiUrl";
import { BiSend } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom";

// let chatPortURL = "ws://127.0.0.1:8001/ws/";

const Chat = () => {
    const dispatch = useDispatch();
    const friendListState = useSelector((state) => state.Profile)
    const { friendList, friendListLoading, chatRoomList, chatRoomLoading, searchByIdRes } = friendListState;
    const [friendListData, setFriendListData] = useState([])

    const [userId, setUserId] = useState(getLocalStorage('user_id'));
    const [userData, setUserData] = useState(JSON.parse(getLocalStorage('profileData')));
    const [selectedFriend, setSelectedFriend] = useState({})
    const [roomName, setRoomName] = useState('');
    const [sendMessage, setSendMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const [chatSocket, setChatSocket] = useState(null);

    const [otherUserId, setOtherUserId] = useState('');
    const [userStatus, setUserStatus] = useState('Offline');

    useEffect(() => {
        if (roomName != '') {
            let room_name = getLocalStorage('username') + '__chat__' + (roomName.split('__chat__')[0] === getLocalStorage('username') ? roomName.split('__chat__')[1] : roomName.split('__chat__')[0]);
            let webSocket = new WebSocket(chatPortUrl + room_name + '/');
            webSocket.onopen = function (e) {
                console.log("The connection was setup successfully !");
                if (userId && otherUserId) {
                    let data = { user_id: otherUserId, other_user: userId, room_name: room_name };
                    webSocket.send(JSON.stringify(data));
                }
            };
            webSocket.onmessage = function (e) {
                const data = JSON.parse(e.data);
                let msg;
                if (data.username === userId) {
                    msg = {
                        id: data.username,
                        message: data.message,
                        name: userData.first_name + ' ' + userData.last_name,
                        username: userData.username,
                        image: userData.profile_image,
                        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                }
                else if(data.status){
                    if (getLocalStorage('username') !== data.username){
                        setUserStatus(data.status);
                    }
                    if (data.online_members > 1){
                        setUserStatus(data.status);
                    }
                }
                else {
                    msg = {
                        id: data.username,
                        message: data.message,
                        name: selectedFriend.first_name + ' ' + selectedFriend.last_name,
                        username: userData.username,
                        image: userData.profile_image,
                        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                }
                if (msg){
                    setMessages((messages) => [...messages, msg]);
                }
            }

            setChatSocket(webSocket);
            if (chatRoomList?.messages?.length > messages.length) {
                for (let index = 0; index < chatRoomList?.messages?.length; index++) {
                    const element = chatRoomList?.messages[index];
                    let el = {};
                    if (element.user == userId) {
                        el = setItem(element, userData)
                    }
                    else {
                        el = setItem(element, selectedFriend)
                    }
                    setMessages((messages) => [...messages, el]);
                }
            }
            return () =>{
                webSocket.close();
                console.log("Something unexpected happened !");
            }
        }
    }, [chatRoomList])

    const setItem = (req, data) => {
        return {
            id: req.user,
            message: req.content,
            name: data.first_name + ' ' + data.last_name,
            username: data.username,
            image: data.profile_image,
            date: new Date(req.created_on).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    }

    useEffect(() => {
        let objDiv = document.getElementsByClassName("body-chat-message-user")[0];
        if (objDiv) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        if (sendMessage) {
            e.preventDefault();
            let other_user_id = e.target.getAttribute('data-id');
            if (userId && other_user_id) {
                let data = { username: userId, other_user: other_user_id, message: sendMessage, room_name: roomName };
                setSendMessage('');
                chatSocket.send(JSON.stringify(data));
            }
        }
    }

    useEffect(() => {
        if (friendList) {
            setFriendListData(friendList)
        }
    }, [friendList])

    useEffect(() => {
        dispatch(getFriendList(userId))
    }, [userId])

    const getUnreadMsgs = async () => {
        let user_id = localStorage.getItem('user_id');
        if (user_id) {
            let options = {
                method: 'GET',
            };
            let response = await fetch(Api.createChatRoom + `?user_id=${user_id}`, options);
            let result = await response.json();
            let unreadEles = document.getElementsByClassName('unread-msgs');
            if (result.status) {
                document.getElementById('unread_msgs').textContent = result.total_msgs;
                for (let i = 0; i < unreadEles.length; i++) {
                    let userId = unreadEles[i].getAttribute('data-id');
                    const userMsgExists = result.user_msgs.some(msg => msg.id === userId);
                    if (userMsgExists) {
                        const userMsg = result.user_msgs.find(msg => msg.id === userId);
                        unreadEles[i].textContent = userMsg.count;
                        unreadEles[i].classList.add('unread-msg');
                    }
                    else {
                        unreadEles[i].textContent = '';
                        unreadEles[i].classList.remove('unread-msg');
                    }
                }
            }
            else {
                document.getElementById('unread_msgs').textContent = '';
                document.getElementById('unread_msgs').textContent = '';
                for (let i = 0; i < unreadEles.length; i++) {
                    unreadEles[i].textContent = '';
                    unreadEles[i].classList.remove('unread-msg');
                }
            }
        }
    }

    useEffect(() => {
        const getUnreadMsgs = async () => {
            let user_id = localStorage.getItem('user_id');
            if (user_id) {
                let options = {
                    method: 'GET',
                };
                let response = await fetch(Api.createChatRoom + `?user_id=${user_id}`, options);
                let result = await response.json();
                let unreadEles = document.getElementsByClassName('unread-msgs');
                if (result.status) {
                    document.getElementById('unread_msgs').textContent = result.total_msgs;
                    for (let i = 0; i < unreadEles.length; i++) {
                        let userId = unreadEles[i].getAttribute('data-id');
                        const userMsgExists = result.user_msgs.some(msg => msg.id === userId);
                        if (userMsgExists) {
                            const userMsg = result.user_msgs.find(msg => msg.id === userId);
                            unreadEles[i].textContent = userMsg.count;
                            unreadEles[i].classList.add('unread-msg');
                        }
                        else {
                            unreadEles[i].textContent = '';
                            unreadEles[i].classList.remove('unread-msg');
                        }
                    }
                }
                else {
                    document.getElementById('unread_msgs').textContent = '';
                    for (let i = 0; i < unreadEles.length; i++) {
                        unreadEles[i].textContent = '';
                        unreadEles[i].classList.remove('unread-msg');
                    }
                }
            }
        }
        setTimeout(() => {
            getUnreadMsgs();
        }, 1000)
    }, [])

    const handleCurrentChatUser = (item) => {
        chatSocket?.close();
        setChatSocket(null);
        setSendMessage('');
        setSelectedFriend(item);
        setOtherUserId(item.id);
        dispatch(createRoom(item.slug));
        setRoomName(item.slug);
        setMessages([])
        setTimeout(() => {
            getUnreadMsgs();
        }, 500)
        getChatProfileData(item?.custom_id);
    }
    function stickFooter() {
        const body = document.body;
        const footer = document.getElementById('sticky-footer');
        const bodyHeight = body.clientHeight;
        const windowHeight = window.innerHeight;
        if (bodyHeight < windowHeight) {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.width = '100%';
        } else {
            footer.style.position = 'static';
        }
    }
    useEffect(() => {
        stickFooter();
        window.addEventListener('resize', stickFooter);
    })
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            document.getElementById('send-message').click();
        }
    }

    const getChatProfileData = (customId)=>{
        if (customId.length === 10) {
            let id = getLocalStorage("user_id");
            const quary = `?user_id=${id}&custom_id=${customId}`;
            dispatch(getCustomSearchProfile(quary));
        }

    }

    const goToChatProfile = ()=>{
        if (searchByIdRes?.length > 0) {
            navigate("/user-profile");
        }
    }
    return (
        <Layout>
            <section style={{}}>
                {friendListData?.subscription_name !== "Diamond" ?
                    <div className="not-upgraded my-5 text-center">
                        <div>Please upgrade you plan to chat with the user</div>
                        <div className="upgrade-btn">
                            <Link to="/membership">Upgrade</Link>
                        </div>
                    </div>
                    :
                    <div className="content-chat mt-20">
                        <div className="content-chat-user">
                            <div className="head-search-chat">
                                <h4 className="text-center">Chat Finder</h4>
                            </div>

                            <div className="search-user mt-30">
                                <input id="search-input" type="text" placeholder="Search..." name="search" className="search" />
                                <span>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                            </div>

                            <div className="list-search-user-chat mt-20">
                                {/* {friendListData?.subscription_name == "Gold" &&
                                <div>Please upgrade you plan to chat with the user</div>
                            } */}
                                {friendListData?.subscription_name == "Diamond" &&
                                    friendListData?.user_data?.length > 0 && friendListData.user_data.map((item, index) => {
                                        return (
                                            <div className="user-chat" key={index}
                                                data-username={item?.first_name.charAt(0).toUpperCase() +
                                                    item?.first_name.slice(1) + " " +
                                                    item?.last_name.charAt(0).toUpperCase() +
                                                    item?.last_name.slice(1)}
                                                onClick={() => handleCurrentChatUser(item)}>
                                                <div className="user-chat-img">
                                                    <img src={item?.profile_image ? baseUrl + item?.profile_image :
                                                        "/assets/images/background/bg.jpg"} alt="user_image" />
                                                    {/* <div className="online"></div> */}
                                                </div>

                                                <div className="user-chat-text">
                                                    <p className="mt-0 mb-0"><strong>{item?.first_name.charAt(0).toUpperCase() + item?.first_name.slice(1) + " " + item?.last_name.charAt(0).toUpperCase() + item?.last_name.slice(1)}</strong></p>
                                                    <small>Hi, how are you?</small>
                                                    <small className="unread-msgs" data-id={item?.id}></small>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                        {selectedFriend?.first_name ?
                            <div className="content-chat-message-user" data-username="Maria Dennis">
                                <div className="head-chat-message-user">
                                    <img src={selectedFriend?.profile_image ? baseUrl + selectedFriend?.profile_image : "/assets/images/background/bg.jpg"} alt="" />
                                    <div className="message-user-profile">
                                        <p className="mt-0 mb-0 text-white get-chat-profile" onClick={goToChatProfile}><strong>{selectedFriend?.first_name?.charAt(0).toUpperCase() + selectedFriend?.first_name?.slice(1) + " " + selectedFriend?.last_name?.charAt(0).toUpperCase() + selectedFriend?.last_name?.slice(1)}</strong></p>
                                        <small className="text-white"><p className={userStatus === 'Offline' ? "status-offline user-status online mt-0 mb-0" : "status-online user-status online mt-0 mb-0"}></p>{userStatus}</small>
                                    </div>
                                </div>
                                <div className="body-chat-message-user">
                                    {!!messages?.length && messages?.map((item) => {
                                        return (
                                            <div className={item?.id == userId ? "message-user-right" : "message-user-left"}>
                                                <div className={item?.id == userId ? "message-user-right-img" : "message-user-left-img"}>
                                                    <img src={item.image ? baseUrl + item.image :
                                                        "/assets/images/background/bg.jpg"} alt="" />
                                                    <p className="mt-0 mb-0"><strong>{item.name}</strong></p>
                                                    <small>{item.date}</small>
                                                </div>
                                                <div className={item?.id == userId ? "message-user-right-text" : "message-user-left-text"}>
                                                    <strong>{item.message}</strong>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="footer-chat-message-user">
                                    <div className="message-user-send">
                                        <input type="text" value={sendMessage} onKeyPress={handleKeyPress} placeholder="Please write message" onChange={(e) => setSendMessage(e.target.value)} />
                                    </div>
                                    <button type="button" id="send-message" data-id={selectedFriend?.id} onClick={handleSendMessage}>
                                        <BiSend size={25} data-id={selectedFriend?.id} />
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="content-chat-message-user chat-content-empty p-0 h-100%" data-username="Maria Dennis">
                                <div className="body-chat-message-user m-0">
                                    <p classNameName="text-center pt-2">Tab on a chat to start conversation</p>
                                </div>
                            </div>
                        }
                    </div>}
            </section>
        </Layout>
    );
};

export default Chat;
