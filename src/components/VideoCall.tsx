"use client";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { FaVideo } from "react-icons/fa";
import { MdMic } from "react-icons/md";
import { HiPhone } from "react-icons/hi";
import { useRouter } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const socket = io(`${baseURL}`, {
  transports: ["websocket"],
  reconnectionAttempts: 5,                                                                              
  reconnectionDelay: 5000,
}); // Replace with your backend URL in production

interface VideoCallProps {
  room_name: string;
  role: "doctor" | "patient"; // Add role to props
}

const VideoCall: React.FC<VideoCallProps> = ({ room_name, role }) => {
  const router = useRouter();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<number>(0);
  const hasJoinedRoom = useRef(false);
  const isNegotiating = useRef(false);
  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);
  const iceCandidatesQueue = useRef<RTCIceCandidate[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false); // Add this line
  const [connectionStatus, setConnectionStatus] = useState<string>(""); // Add this line
  const [isConnected, setIsConnected] = useState(false); // Add this line
  const [waitingMessage, setWaitingMessage] = useState<string>("");
  const [isWaiting, setIsWaiting] = useState(true);
  const [isEnding, setIsEnding] = useState(false);
  const [endingMessage, setEndingMessage] = useState("");
  const [remoteAudioEnabled, setRemoteAudioEnabled] = useState(true);
  const [remoteVideoEnabled, setRemoteVideoEnabled] = useState(true);

  console.log("Room Name from Video Call Component:", room_name);

  useEffect(() => {
    if (!room_name) return;

    let pc: RTCPeerConnection | null = null;

    const initializePeerConnection = () => {
      pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
          },
        ],
        iceCandidatePoolSize: 10,
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require",
      });

      pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
          console.log("Sending ICE candidate:", candidate);
          socket.emit("signal", {
            room_name,
            signal: { candidate },
          });
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log("ICE Connection State:", pc?.iceConnectionState);
        if (pc?.iceConnectionState === "failed") {
          pc.restartIce();
        }
      };

      pc.ontrack = (event) => {
        console.log("Received remote track:", event.streams[0].id);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      return pc;
    };

    const startCall = async () => {
      try {
        console.log("Starting call initialization...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        pc = initializePeerConnection();
        peerConnection.current = pc;

        // Add all tracks to the peer connection
        stream.getTracks().forEach((track) => {
          console.log("Adding track to PC:", track.kind);
          pc?.addTrack(track, stream);
        });

        // Join room after media setup
        socket.emit(`${role}Join`, { room_name });
        console.log(`Joined as ${role} to room ${room_name}`);
      } catch (error) {
        console.error("Failed to start call:", error);
        alert("Failed to access camera/microphone");
      }
    };

    // Enhanced signal handler
    const handleSignal = async (data: any) => {
      try {
        if (!pc || pc.connectionState === "closed") return;
        const { signal } = data;

        if (signal.sdp) {
          console.log("Received SDP:", signal.sdp.type);
          await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));

          if (signal.sdp.type === "offer") {
            console.log("Creating answer...");
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket.emit("signal", {
              room_name,
              signal: { sdp: answer },
            });
          }
        } else if (signal.candidate) {
          console.log("Adding ICE candidate");
          await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
      } catch (error) {
        console.error("Signal handling error:", error);
      }
    };

    socket.on("ready-to-connect", async ({ participants }) => {
      console.log("Ready to connect, participants:", participants);
      if (role === "doctor" && participants.patient) {
        try {
          console.log("Doctor creating offer...");
          const offer = await pc?.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });
          await pc?.setLocalDescription(offer);
          socket.emit("signal", {
            room_name,
            signal: { sdp: offer },
          });
        } catch (err) {
          console.error("Error creating offer:", err);
        }
      }
    });

    // Cleanup function to handle refresh
    const cleanup = () => {
      console.log("Cleaning up video call...");
      localStream?.getTracks().forEach((track) => {
        track.stop();
        console.log("Stopped track:", track.kind);
      });
      peerConnection.current?.close();
      socket.off("signal");
      socket.off("ready-to-connect");
      socket.off("waiting");
      setIsConnected(false);
    };

    // Handle connection established
    const handleConnectionEstablished = () => {
      setIsConnected(true);
      // Force refresh effect
      cleanup();
      window.location.reload();
    };

    // Add connection state change listener
    peerConnection.current?.addEventListener(
      "connectionstatechange",
      (event) => {
        if (peerConnection.current?.connectionState === "connected") {
          handleConnectionEstablished();
        }
      }
    );

    // Start the call
    startCall();

    // Event listeners
    socket.on("signal", handleSignal);
    socket.on("waiting", ({ message }) => {
      setWaitingMessage(message);
      setIsWaiting(true);
    });

    socket.on("ready-to-connect", () => {
      setIsWaiting(false);
      setWaitingMessage("");
    });

    socket.on('callEnded', ({ message, endedBy }) => {
      setIsEnding(true);
      setEndingMessage(message);
      // Stop all tracks
      localStream?.getTracks().forEach(track => track.stop());
      // Close peer connection
      peerConnection.current?.close();
      // Redirect after 2 seconds
      setTimeout(() => {
        router.back();
      }, 2000);
    });

    socket.on('patientLeft', ({ message }) => {
      if (role === 'doctor') {
        setWaitingMessage(message);
        setIsWaiting(true);
      }
    });

    // Add media state change handler
    socket.on('remoteMediaStateChanged', ({ type, enabled }) => {
      if (type === 'audio') {
        setRemoteAudioEnabled(enabled);
      } else if (type === 'video') {
        setRemoteVideoEnabled(enabled);
      }
    });

    // Cleanup
    return () => {
      cleanup();
      socket.off('callEnded');
      socket.off('patientLeft');
      socket.off('remoteMediaStateChanged');
    };
  }, [room_name, role, isConnected, router]); // Add isConnected and router to dependencies

  const handleEndCall = () => {
    setIsEnding(true);
    setEndingMessage(role === 'doctor' ? 'Ending consultation...' : 'Leaving consultation...');
    socket.emit('endCall', { room_name, role });
    // Stop local tracks
    localStream?.getTracks().forEach(track => track.stop());
    // Close peer connection
    peerConnection.current?.close();
    // Redirect after 2 seconds
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  const toggleMedia = (type: 'audio' | 'video') => {
    if (localStream) {
      const tracks = type === 'audio' ? 
        localStream.getAudioTracks() : 
        localStream.getVideoTracks();
      
      tracks.forEach(track => {
        track.enabled = !track.enabled;
      });

      // Emit state change to peer
      socket.emit('mediaStateChange', {
        room_name,
        type,
        enabled: tracks[0]?.enabled ?? false
      });

      if (type === 'audio') {
        setIsMuted(!tracks[0]?.enabled);
      } else {
        setIsVideoOff(!tracks[0]?.enabled);
      }
    }
  };

  if (!room_name) {
    return <div>Error: Room name is required</div>;
  }

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-100 to-teal-100">
      {/* End Call Message Overlay */}
      {isEnding && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 mx-auto flex items-center justify-center">
                <HiPhone className="text-red-500 text-xl transform rotate-135" />
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-800">{endingMessage}</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
          </div>
        </div>
      )}

      {/* Waiting Message Overlay */}
      {isWaiting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">{waitingMessage}</p>
          </div>
        </div>
      )}

      {/* Add connection status indicator */}
      {/* <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded-full shadow">
        <span
          className={`inline-block w-2 h-2 rounded-full mr-2 ${
            connectionStatus === "connected" ? "bg-green-500" : "bg-yellow-500"
          }`}
        ></span>
        {isDoctor ? "Doctor" : "Patient"} -{" "}
        {connectionStatus || "connecting..."}
      </div> */}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Video Section */}
        <div className="flex-1 relative">
          {/* Remote Video */}
          <div className="relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="object-cover rounded-lg h-80 w-full"
            />
            {!remoteVideoEnabled && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl">Video Off</span>
              </div>
            )}
            {!remoteAudioEnabled && (
              <div className="absolute top-4 left-4 bg-red-500 rounded-full p-2">
                <MdMic className="text-white" />
              </div>
            )}
          </div>

          {/* Local Video */}
          <div className="absolute bottom-4 right-4 w-20 h-20">
            <div className="relative w-full h-full">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-lg border-2 border-white"
              />
              {isVideoOff && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center rounded-lg">
                  <span className="text-white text-xs">Video Off</span>
                </div>
              )}
              {isMuted && (
                <div className="absolute top-1 left-1 bg-red-500 rounded-full p-1">
                  <MdMic className="text-white text-xs" />
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={() => toggleMedia('video')}
              className={`flex items-center justify-center w-12 h-12 ${
                isVideoOff ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
              } rounded-full shadow-md hover:opacity-90`}
            >
              <FaVideo className="text-xl" />
            </button>

            <button
              onClick={() => toggleMedia('audio')}
              className={`flex items-center justify-center w-12 h-12 ${
                isMuted ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
              } rounded-full shadow-md hover:opacity-90`}
            >
              <MdMic className="text-xl" />
            </button>

            {/* Call ending Section */}
            <button
              onClick={handleEndCall}
              className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
            >
              <span className="material-icons">
                <HiPhone className="text-xl" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
