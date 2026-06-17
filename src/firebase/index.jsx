import React, { useRef, useState } from "react";
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

    // 🎤 Mic
    const openUserMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });

        localStreamRef.current = stream;
        localAudioRef.current.srcObject = stream;

        setMediaReady(true);
    };

    // 🏠 Create Room (Caller)
    const createRoom = async () => {
        const roomRef = doc(collection(db, "rooms"));
        setRoomId(roomRef.id);

        peerConnectionRef.current = new RTCPeerConnection(configuration);

        console.log(peerConnectionRef.current,"peer");
        const test = new RTCPeerConnection(configuration);
        console.log(test,"newwwwwwwwwtedst")
        // ICE → Caller
        const callerCandidates = collection(db, "rooms", roomRef.id, "callerCandidates");

        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                addDoc(callerCandidates, event.candidate.toJSON());
            }
        };

        // Remote stream handler (ONLY ONCE)
        peerConnectionRef.current.ontrack = (event) => {
            console.log("Remote track received");

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

    // 📞 Join Room (Callee)
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

        const offer = roomSnapshot.data().offer;

        peerConnectionRef.current = new RTCPeerConnection(configuration);

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
            remoteAudioRef.current.play().catch(console.error);
        };

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

    const hangUp = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(t => t.stop());
        }
        window.location.reload();
    };

    return (
        <div style={{ padding: 20 }}>
            <h2> Audio Call</h2>

            <button onClick={openUserMedia}>Start Mic</button>
            <button onClick={createRoom} disabled={!mediaReady}>Create Room</button>
            <button onClick={joinRoom} disabled={!mediaReady}>Join Room</button>
            <button onClick={hangUp}>Hangup</button>

            <p>Room: {roomId}</p>

            <audio ref={localAudioRef} autoPlay muted />
            <audio ref={remoteAudioRef} autoPlay />
        </div>
    );
}