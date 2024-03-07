import React, { useState, useEffect, useRef } from "react";
import { Menu } from "../components/components";
import styles from "./home.module.css";
import Loading from "../components/loading.jsx";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import model from "../models/gesture_recognizer_asl_30_epoch.task";
import { FaRotate } from "react-icons/fa6";

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [currentLetter, setCurrentLetter] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");
  const [facingMode, setFacingMode] = useState("environment");
  const videoRef = useRef(null);
  const runningModeRef = useRef("VIDEO");
  let count = 0;
  let prev = "";

  useEffect(() => {
    setLoading(true);
    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: model,
          delegate: "CPU",
        },
        runningMode: runningModeRef.current, // Use current value
      });
      setGestureRecognizer(recognizer);
      setLoading(false);
    };
    createGestureRecognizer();
  }, [facingMode]);

  useEffect(() => {
    if (loading) {
      return;
    } else {
      const video = videoRef.current;

      let lastVideoTime = -1;
      let results = undefined;

      const constraints = { video: { facingMode: facingMode } };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener("loadeddata", () => {
          if (gestureRecognizer) {
            predictWebcam();
            console.log("asdass");

            let intervalId = setInterval(predictWebcam, 500);
            return () => clearInterval(intervalId);
          }
        });
      });

      async function predictWebcam() {
        let nowInMs = Date.now();
        if (video.currentTime !== lastVideoTime) {
          lastVideoTime = video.currentTime;
          results = gestureRecognizer.recognizeForVideo(video, nowInMs);
        }

        try {
          setCurrentLetter(results.gestures[0][0].categoryName);

          if (results.gestures[0][0].categoryName === prev) {
            count += 1;
          } else {
            prev = results.gestures[0][0].categoryName;
            count = 0;
          }
          if (count === 3) {
            count = 0;
            setCurrentSentence(
              (prevSentence) =>
                prevSentence + results.gestures[0][0].categoryName
            );
            prev = "";
          }
        } catch (error) {
          setCurrentLetter("");
        }
      }
    }
  }, [gestureRecognizer, facingMode]);

  const toggleFacingMode = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    console.log(facingMode);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.wrapper}>
            <FaRotate
              size="96"
              className="absolute top-0 right-0 p-5 text-white"
              onClick={toggleFacingMode}
            />

            <Menu />
            <video
              id="webcam"
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover object-center"
            />

            <div className={styles.text_box}>
              <div className="box-content h-32 w-32 absolute top-0 right-0 flex justify-center items-center bg-gray-600 rounded-2xl">
                {currentLetter}
              </div>

              <h1 className="text-3xl">{currentSentence} </h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainComponent;
