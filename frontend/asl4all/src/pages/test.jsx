// import React, { useState, useEffect, useRef } from "react";
// import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
// import model from "../models/gesture_recognizer_asl_30_epoch.task";

// const Test = () => {
//   const [gestureRecognizer, setGestureRecognizer] = useState(null);
//   const [currentLetter, setCurrentLetter] = useState("");
//   const videoRef = useRef(null);
//   const runningModeRef = useRef("VIDEO");

//   useEffect(() => {
//     const createGestureRecognizer = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
//       );
//       const recognizer = await GestureRecognizer.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: model,
//           delegate: "CPU",
//         },
//         runningMode: runningModeRef.current, // Use current value
//       });
//       setGestureRecognizer(recognizer);
//     };
//     createGestureRecognizer();
//   }, []);

//   useEffect(() => {
//     const video = videoRef.current;

//     const constraints = { video: true };
//     navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
//       video.srcObject = stream;
//       video.addEventListener("loadeddata", () => {
//         if (gestureRecognizer) {
//           predictWebcam();
//           let intervalId = setInterval(predictWebcam, 1000);
//           return () => clearInterval(intervalId);
//         }
//       });
//     });

//     let lastVideoTime = -1;
//     let results = undefined;
//     async function predictWebcam() {
//       let nowInMs = Date.now();
//       if (video.currentTime !== lastVideoTime) {
//         lastVideoTime = video.currentTime;
//         results = gestureRecognizer.recognizeForVideo(video, nowInMs);
//       }

//       try {
//         setCurrentLetter(results.gestures[0][0].categoryName);
//       } catch (error) {
//         setCurrentLetter("No letter");
//       }
//     }
//   }, [gestureRecognizer]);

//   return (
//     <div className="h-screen flex items-center justify-center">
//       <video
//         id="webcam"
//         ref={videoRef}
//         autoPlay
//         className="w-full max-w-screen-lg"
//       />
//       <div className="fixed bottom-0 left-0 right-0 text-center text">
//         {currentLetter}
//       </div>
//     </div>
//   );
// };

// export default Test;
