import React, { useState, useEffect, useRef } from "react";
import { Menu } from "../components/components";
import styles from "./home.module.css";
import Loading from "../components/loading.jsx";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import model from "../models/gesture_recognizer.task";
import { MdOutlineCameraswitch } from "react-icons/md";

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [currentLetter, setCurrentLetter] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");
  const [facingMode, setFacingMode] = useState("user");
  const videoRef = useRef(null);
  const runningModeRef = useRef("VIDEO");
  let count = 0;
  let prev = "";
  let current_word = "";

  async function predictWebcam(video, lastVideoTime) {
    let nowInMs = Date.now();
    let results;
    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;
      results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    }

    try {
      setCurrentLetter(results.gestures[0][0].categoryName);
      current_word = results.gestures[0][0].categoryName;

      if (current_word === prev) {
        count += 1;
      } else {
        prev = current_word;
        count = 0;
      }
      if (count === 2) {
        count = 0;
        if (current_word === "space") {
          current_word = " ";
        } else if (current_word === "del") {
          setCurrentSentence((prevSentence) => {
            if (prevSentence.length > 0) {
              return prevSentence.slice(0, -1);
            }
            return prevSentence;
          });
          prev = "";
        } else {
          setCurrentSentence((prevSentence) => prevSentence + current_word);
          prev = "";
        }
      }
    } catch (error) {
      setCurrentLetter("");
    }
  }

  useEffect(() => {
    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: model,
          delegate: "CPU",
        },
        runningMode: runningModeRef.current,
      });
      setGestureRecognizer(recognizer);
      setLoading(false);
    };
    createGestureRecognizer();
  }, []);

  useEffect(() => {
    if (loading || !gestureRecognizer) {
      return;
    } else {
      const video = videoRef.current;

      let lastVideoTime = -1;

      const constraints = { video: { facingMode } };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener("loadeddata", () => {
          if (gestureRecognizer) {
            predictWebcam(video, lastVideoTime);
            let intervalId = setInterval(
              () => predictWebcam(video, lastVideoTime),
              250
            );
            return () => clearInterval(intervalId);
          }
        });
      });
    }
  }, [loading, gestureRecognizer, facingMode]);

  const toggleFacingMode = () => {
    window.location.reload(false);
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.wrapper}>
            <Menu />
            <video
              id="webcam"
              ref={videoRef}
              autoPlay
              className="h-full w-full object-cover object-center"
            />
            <MdOutlineCameraswitch
              size={81}
              color="white"
              onClick={toggleFacingMode}
              className={styles.switchButton}
            >
              Switch Camera
            </MdOutlineCameraswitch>
            <div className={styles.text_box}>
              <div className="box-content h-32 w-32 absolute top-0 right-0 flex justify-center items-center bg-gray-600 rounded-2xl">
                {currentLetter}
              </div>
              <p className="current_sentence">{currentSentence}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainComponent;
