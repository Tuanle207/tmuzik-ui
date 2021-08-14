import { FC, useState, useEffect, ChangeEvent, useRef } from 'react';
import { Icon } from '../../assets';
import { MainView } from '../../components';
import { Button } from '../../components/shared';
// import { connection as socket } from '../../configs/websocket';

const configs = {
  iceServers: [
      {
          urls: 'stun:stun.l.google.com:19302'
      }
  ]
};

interface IHomeViewProps { }

export const HomeView: FC<IHomeViewProps> = () => {

  const audioRef = useRef<any>();
  const audioAnsRef = useRef<any>();


  const [id, setId] = useState('');
  const [remoteId, setRemoteId] = useState('');
  const [url, setUrl] = useState('');

  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    
  }, []);

  const answerHandler = ({id, description}: {id: any, description: any}) => {
    
    // create peer connection
    const connection = new RTCPeerConnection(configs); 

    // create answer-message -> send to remote
    connection
      .setRemoteDescription(description)
      .then(() => connection.createAnswer())
      .then(sdp => connection.setLocalDescription(sdp))
      .then(() => {
        // socket.invoke('SendAnswerMessage', {id, description: connection.localDescription});
      });

    // tracking remote stream track from peer connection for ussage
    connection.ontrack = event => {
      if (event.streams && event.streams[0]) {
        console.log('ok');
        audioAnsRef.current.srcObject = event.streams[0];
      }
    };

    // attach stream track on peer connectiton for sending
    let stream = audioRef.current.captureStream(25);

    stream.getTracks().forEach((track: any) => {
      connection.addTrack(track, stream);
    });

    // waiting and handle when browser generate ice-candidate -> send to remote 
    connection.onicecandidate = event => {
      if (event.candidate) {
        // socket.invoke("SendCandidateMessage", {id, candidate: event.candidate});
      }
    };

    // listen for ice-candidate received event -> add it to peer connection
    // socket.on("ReceivedCandidateMessage", ({id, candidate}) => {
    //   connection
    //     .addIceCandidate(new RTCIceCandidate(candidate))
    //     .catch(e => console.error(e));
    // });

    setPeerConnection(connection);
};

  const handleCall = () => {

    // create peer connection
    const peerConnection = new RTCPeerConnection(configs);

    // attach stream track on peer connectiton for sending
    let stream = audioRef.current.captureStream(25);

    stream.getTracks().forEach((track: any) => {
      peerConnection.addTrack(track, stream);
      console.log(track);
    });

    // create offer-message => send to remote
    peerConnection
      .createOffer()
      .then(sdp => peerConnection.setLocalDescription(sdp))
      // a "candidate" will be automatically sent (after setLocalDescription get finished)
      // to remote peer for geting remote candidate
      .then(() => {
          // socket.invoke('SendOfferMessage', {
          //     id: remoteId, 
          //     description: peerConnection.localDescription
          // });
      });

    // listen for answering from remote (or cancel....)
    // socket.on('ReceiveAnswerMessage', ({id, description}) => {
    //     peerConnection.setRemoteDescription(description);
    // });


    // listen for receiving ice-candidate -> add it to peer connection
    // socket.on("ReceivedCandidateMessage", ({id, candidate}) => {
    //   peerConnection
    //     .addIceCandidate(new RTCIceCandidate(candidate))
    //     .catch(e => console.error(e));
    // });

    
    // waiting and handle when browser generate ice-candidate -> send to remote 
    // peerConnection.onicecandidate = event => {
    //     if (event.candidate) {
    //       socket.invoke("SendCandidateMessage", {id: id, candidate: event.candidate});
    //     }
    // };

    // tracking remote stream track from peer connection for ussage
    peerConnection.ontrack = event => {
      console.log({event}); 
      if (event.streams && event.streams[0]) {
        audioAnsRef.current.srcObject = event.streams[0];
      }
    };
  }

  const handleListen = () => {
    // socket.on('ReceiveOfferMessage', answerHandler);
  }

  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0]
      const objUrl = URL.createObjectURL(file);
      setUrl(objUrl);
    }
  }


  return (
    <MainView>
      <div>
        {/* <input placeholder="your id"
          id="your-id"
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)}
        ></input>
        <input placeholder="remote id"
          id="remote-id"
          type="text" 
          value={remoteId} 
          onChange={(e) => setRemoteId(e.target.value)}
        ></input>
        <input type="file" placeholder="file" onChange={fileChange} />
        <audio ref={audioRef} controls src={url} >
          Your browser does not support the audio element.
        </audio>
        <audio ref={audioAnsRef} controls></audio>
        <button onClick={handleCall}>start</button>
        <button onClick={handleListen}>listen</button> */}
        <Button title="Continue" icon={<Icon.Love />} />
      </div>
    </MainView>
  )
};