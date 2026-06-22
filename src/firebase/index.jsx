import { useRef, useState } from "react";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    addDoc,
    onSnapshot
} from "firebase/firestore";
import { db } from "./firestore";

const configuration = {
    iceServers: [
        { urls: ["stun:stun1.l.google.com:19302"] }
    ]
};

export default function AudioCall() {
    const localAudioRef = useRef(null);
    const remoteAudioRef = useRef(null);

    const peerConnectionRef = useRef(null);
    const localStreamRef = useRef(null);

    const [roomId, setRoomId] = useState("");
    const [mediaReady, setMediaReady] = useState(false);
    const [callStatus, setCallStatus] = useState("Idle");
    const [mic, setmic] = useState(true);
    const [callEnded, setCallEnded] = useState(false);

    //  Mic
    const openUserMedia = async () => {
        setCallEnded(false);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,

        });

        localStreamRef.current = stream;
        localAudioRef.current.srcObject = stream;

        setMediaReady(true);
    };

    //  Create Room (Caller)
    const createRoom = async () => {
        const roomRef = doc(collection(db, "rooms"));
        setRoomId(roomRef.id);

        peerConnectionRef.current = new RTCPeerConnection(configuration);
        setupConnectionStateListener(peerConnectionRef.current);


        // ICE → Caller
        const callerCandidates = collection(db, "rooms", roomRef.id, "callerCandidates");


        peerConnectionRef.current.onicecandidate = (event) => {

            console.log(event.candidate, "candidate")
            if (event.candidate) {
                addDoc(callerCandidates, event.candidate.toJSON());
            }
        };


        // Remote stream handler (ONLY ONCE)
        peerConnectionRef.current.ontrack = (event) => {

            remoteAudioRef.current.srcObject = event.streams[0];
            remoteAudioRef.current.play().catch(console.error);

        };

        // Add mic tracks
        localStreamRef.current.getTracks().forEach((track) => {
            peerConnectionRef.current.addTrack(track, localStreamRef.current);
        });

        // Offer
        const offer = await peerConnectionRef.current.createOffer();

        await peerConnectionRef.current.setLocalDescription(offer);

        await setDoc(roomRef, { offer });

        // Listen for answer
        onSnapshot(roomRef, async (snap) => {
            const data = snap.data();
            if (data?.answer && !peerConnectionRef.current.currentRemoteDescription) {
                await peerConnectionRef.current.setRemoteDescription(
                    new RTCSessionDescription(data.answer)
                );
            }
        });

        // Callee ICE
        const calleeCandidates = collection(db, "rooms", roomRef.id, "calleeCandidates");

        onSnapshot(calleeCandidates, (snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === "added") {
                    peerConnectionRef.current.addIceCandidate(
                        new RTCIceCandidate(change.doc.data())
                    );
                }
            });
        });
    };

    //  Join Room (Callee)
    const joinRoom = async () => {
        const id = prompt("Enter Room ID:");
        if (!id) return;

        setRoomId(id);

        const roomRef = doc(db, "rooms", id);
        const roomSnapshot = await getDoc(roomRef);

        if (!roomSnapshot.exists()) {
            console.error("Room not found");
            return;
        }




        peerConnectionRef.current = new RTCPeerConnection(configuration);
        setupConnectionStateListener(peerConnectionRef.current);
        // ICE → Callee
        const calleeCandidates = collection(db, "rooms", id, "calleeCandidates");

        peerConnectionRef.current.onicecandidate = (event) => {

            if (event.candidate) {
                addDoc(calleeCandidates, event.candidate.toJSON());

            }
        };

        // Remote audio
        peerConnectionRef.current.ontrack = (event) => {
            console.log("Remote track received");

            remoteAudioRef.current.srcObject = event.streams[0];
            console.log(event.streams[0], "this is the even  steanm ");
            remoteAudioRef.current.play().catch(console.error);
        };
        const offer = roomSnapshot.data().offer;
        // Set offer FIRST
        await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(offer)
        );

        // Add local tracks AFTER
        localStreamRef.current.getTracks().forEach((track) => {
            peerConnectionRef.current.addTrack(track, localStreamRef.current);
        });

        // Answer
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);

        await updateDoc(roomRef, { answer });

        // Listen caller ICE
        const callerCandidates = collection(db, "rooms", id, "callerCandidates");

        onSnapshot(callerCandidates, (snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === "added") {
                    peerConnectionRef.current.addIceCandidate(
                        new RTCIceCandidate(change.doc.data())
                    );
                }
            });
        });

    };
    const setupConnectionStateListener = (peerConnection) => {
        peerConnection.onconnectionstatechange = () => {
            const state = peerConnection.connectionState;

            switch (state) {
                case "connecting":
                    setCallStatus("Connecting...");
                    break;

                case "connected":
                    setCallStatus(" Call Connected");
                    setMediaReady(false);
                    setmic(false);
                    break;

                case "disconnected":
                    setCallStatus(" Disconnected");
                    break;

                case "failed":
                    setCallStatus(" Connection Failed");
                    setmic(true);
                    break;

                case "closed":
                    setCallStatus("Call Ended");
                    break;

                default:
                    setCallStatus(state);
            }
        };
    };
    const hangUp = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(t => t.stop());
        }

        setCallStatus("Call Ended");
        setmic(true);
        setMediaReady(false);
        setCallEnded(true);
    };


    return (
        <div className="audio-container">
            <div className="audio-card">
                <h2> Audio Call</h2>
                <div className={`status ${callStatus.includes("Connected") ? "success" : ""}`}>
                    Status: {callStatus}
                </div>
                <div className="button-group">
                    <button
                        onClick={openUserMedia}
                        disabled={!mic}
                        className="mic"
                    >
                        Start Mic
                    </button>

                    <button
                        onClick={createRoom}
                        disabled={!mediaReady || callEnded}
                    >
                        Create Room
                    </button>

                    <button
                        onClick={joinRoom}
                        disabled={!mediaReady || callEnded}
                    >
                        Join Room
                    </button>

                    <button
                        onClick={hangUp}
                        disabled={callEnded}
                        className="danger"
                    >
                        Hang Up
                    </button>
                </div>

                {roomId && (
                    <div className="room-box">
                        <span>Room ID</span>
                        <p>{roomId}</p>
                    </div>
                )}

                <audio ref={localAudioRef} autoPlay muted />
                <audio ref={remoteAudioRef} autoPlay />
            </div>
        </div>
    );

}