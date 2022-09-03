import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import Peer from "simple-peer";
import ParticipantSlide from "../../components/Slider/ParticipantSlide";
import GroupVideo from '../../components/Video/GroupVideo';
import Schedule from '../../components/Schedule/Schedule';
// import GroupChat from '../../components/Chat/GroupChat';

// Streaming Video of the user
const Video = (props) => {
    const ref = useRef();
    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video className="groupVideo" playsInline autoPlay ref={ref} />
    )
}

// setting the constraints of video box
const videoConstraints = {
    video: true,
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const GroupRoom = () => {
    const { roomGroupID } = useParams();   
    // variables for different functionalities of video call
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const senders = useRef([]);
    const userStream = useRef();
    const roomID =  roomGroupID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        
         // ==========Asking for audio and video access============
        navigator.mediaDevices.getUserMedia({ audio: true, video: videoConstraints }).then(stream => {

            // streaming the audio and video
            userVideo.current.srcObject = stream;
            userStream.current = stream;
            
            socketRef.current.emit("join room group", roomID);

            // getting all user for the new user joining in
            socketRef.current.on("all users", users => {
                const peers = [];

                // adding the new user to the group
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID: userID,
                        peer,
                    });
                })
                setPeers(peers);
            })

            // sending signal to existing users after new user joined
            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                const peerObj = {
                    peer,
                    peerID: payload.callerID
                }

                setPeers(users => [...users, peerObj]);
            });

            // exisisting users recieving the signal
            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            // handling user disconnecting
            socketRef.current.on("user left", id => {
                // finding the id of the peer who just left
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if (peerObj) {
                    peerObj.peer.destroy();
                }

                // removing the peer from the arrays and storing remaining peers in new array
                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            })
        })
    }, []);

    // creating a peer object for newly joined user
    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            
            initiator: true,
            trickle: false,
            config: { iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }, 
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                { urls: "stun:openrelay.metered.ca:80" },
                { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
                {
                    url: 'turn:192.158.29.39:3478?transport=udp',
                    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    username: '28224511:1379330808'
                },
                {
                    "urls": [
                    "turn:13.250.13.83:3478?transport=udp"
                    ],
                    "username": "YzYNCouZM1mhqhmseWk6",
                    "credential": "YzYNCouZM1mhqhmseWk6"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
                {
                    url: 'turn:turn.anyfirewall.com:443?transport=tcp',
                    credential: 'webrtc',
                    username: 'webrtc'
                },
                {
                    urls: "turn:openrelay.metered.ca:80",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                },
                {
                    urls: "turn:openrelay.metered.ca:443",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                },
                {
                    urls: "turn:openrelay.metered.ca:443?transport=tcp",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                }
            ]},
            stream,
        });       

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    // adding the newly joined peer to the room
    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            config: { iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }, 
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                { urls: "stun:openrelay.metered.ca:80" },
                { urls: 'stun:global.stun.twilio.com:3478?transport=udp' },
                {
                    url: 'turn:192.158.29.39:3478?transport=udp',
                    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    username: '28224511:1379330808'
                },
                {
                    "urls": [
                    "turn:13.250.13.83:3478?transport=udp"
                    ],
                    "username": "YzYNCouZM1mhqhmseWk6",
                    "credential": "YzYNCouZM1mhqhmseWk6"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
                {
                    url: 'turn:turn.anyfirewall.com:443?transport=tcp',
                    credential: 'webrtc',
                    username: 'webrtc'
                },
                {
                    urls: "turn:openrelay.metered.ca:80",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                },
                {
                    urls: "turn:openrelay.metered.ca:443",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                },
                {
                    urls: "turn:openrelay.metered.ca:443?transport=tcp",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                }
            ]},
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);
        return peer;
    }

    // Toggle Video
    let isVideo = true;
    let iconVideo = 'fal fa-video-slash font-bold';
    function toggleVideo() {
        document.getElementById('btn-v').classList = iconVideo;
        if (isVideo) {
            iconVideo = 'fal fa-video font-bold';
        } else {
            iconVideo = 'fal fa-video-slash font-bold';
        }
        isVideo = !isVideo;
        userStream.current.getVideoTracks()[0].enabled = isVideo;
    }

    // Toggle Audio
    let isAudio = true;
    let iconAudio = 'fas fa-microphone-slash font-bold';
    function toggleAudio() {
        document.getElementById('btn-a').classList = iconAudio;
        if (isAudio) {
            iconAudio = 'fal fa-microphone font-bold';
        } else {
            iconAudio = 'fas fa-microphone-slash font-bold';
        }
        isAudio = !isAudio;
        userStream.current.getAudioTracks()[0].enabled = isAudio;
    }

    // Hanging up the call
    function hangUp() {
        userStream.current.getVideoTracks()[0].enabled = false;
        window.location.replace("/conference");
    }
        // Sharing the Screen
    const shareScreen =()=> {
        // asking for the display media along with the cursor movement of the user sharing the screen
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
            const screenTrack = stream.getTracks()[0];
   
               // finding the track which has a type "video", and then replacing it with the current track which is playing
               document.getElementById('btn-share').classList = 'fal fa-share-square font-bold';
               senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);
               
               document.getElementById('btn-share').classList = 'fal fa-share-square font-bold';
               document.getElementById('btn-stop').classList = 'fal fa-share-square font-bold';
               document.getElementById('btn-stop').classList = 'far fa-ban font-bold';
   
               // when the screenshare is turned off, replace the displayed screen with the video of the user
               screenTrack.onended = function() {
                   senders.current.find(sender => sender.track.kind === "video").replaceTrack(userStream.current.getTracks()[1]);
                   document.getElementById('btn-share').classList = 'fal fa-share-square font-bold';
               }
           });
       }
   
       // stopping screen share
       const stopShare =()=> {
           senders.current.find(sender => sender.track.kind === "video").replaceTrack(userStream.current.getTracks()[1]);
           document.getElementById('btn-stop').style.display = 'none';
           document.getElementById('btn-share').style.display = 'inline';
           document.getElementById('btn-share').style.backgroundColor = 'far fa-ban font-bold';
       }
   
       // Copy the Url
       const [copySuccess, setCopySuccess] = useState(''); 
       const getUrl =()=> {
           var inputc = document.body.appendChild(document.createElement("input"));
           inputc.value = window.location.href;
           inputc.focus();
           inputc.select();
           document.execCommand('copy');
           inputc.parentNode.removeChild(inputc);
           setCopySuccess('Copied!');
       }

    return (
        <div className="flex justify-center gap-1 flex-col lg:flex-row">
            <div className="md:w-12/12 lg:w-8/12">
                <GroupVideo
                 userVideo={userVideo}
                //  peers={peers}
                //  Video={Video}
                 getUrl={getUrl}
                 copySuccess={copySuccess}
                 hangUp={hangUp}
                 toggleAudio={toggleAudio}
                 toggleVideo={toggleVideo}
                 shareScreen={shareScreen}
                 stopShare={stopShare}
                />
    
                {/* ======Participent Video===== */}
                {/* <div className="flex items-center justify-center px-4">
                    <div class="videos">
                        {peers.map((peer) => {
                            return (
                                <Video class="groupVideo" key={peer.peerID} peer={peer.peer} />
                            );
                        })}
                    </div>
                </div> */}
                <div className='py-2'>
                    <ParticipantSlide 
                    peers={peers}
                    Video={Video}
                /> 
                </div>
            </div>

            {/* ========Right Sidebar ========*/}
            <div className="md:w-12/12 lg:w-4/12">
                {/* ========Group Chat Options ========*/}
                <div className='pl-0 lg:pl-2'>
                    {/* <h2 className='text-md lg:text-xl text-center uppercase font-semibold p-2 border border-green-700 rounded-md text-gray-400'>Live Chat</h2> */}
                    {/*====== Next Schedule===== */}
                    <div className="mt-2">
                        <h2 className='text-gray-300 font-semibold py-1 pl-3'>Next Schedule is:</h2>
                        <div className="rounded-lg first-letter:mb-2 overflow-y-auto max-h-screen px-3 py-2">
                        <Schedule></Schedule>
                        </div>
                    </div>
                </div>
            </div>
                    
        </div>
                        
    );
};

export default GroupRoom;