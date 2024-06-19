import React, { useState, useEffect, useRef } from "react";
import { Menu } from "../components/components";
import styles from "./home.module.css";
import Loading from "../components/loading.jsx";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import model from "../models/gesture_recognizer.task";
import { MdOutlineCameraswitch } from "react-icons/md";
import Webcam from "react-webcam";
import { FaRegTrashAlt } from "react-icons/fa";

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [currentLetter, setCurrentLetter] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");
  const [facingMode, setFacingMode] = useState("user");

  const cameraRef = useRef(null);
  const runningModeRef = useRef("VIDEO");
  let count, prev, current_letter;

  async function predictWebcam(video, lastVideoTime) {
    let nowInMs = Date.now();
    let results;
    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;
      results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    }

    try {
      setCurrentLetter(results.gestures[0][0].categoryName);
      current_letter = results.gestures[0][0].categoryName;

      if (current_letter === prev) {
        count += 1;
      } else {
        prev = current_letter;
        count = 0;
      }
      if (count === 2) {
        count = 0;
        if (current_letter === "space") current_letter = " ";
        if (current_letter === "del") {
          setCurrentSentence((prevSentence) => {
            if (prevSentence.length > 0) {
              return prevSentence.slice(0, -1);
            }
            return prevSentence;
          });
          prev = "";
        } else {
          setCurrentSentence((prevSentence) => prevSentence + current_letter);
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
  }, [facingMode]);

  useEffect(() => {
    if (loading || !gestureRecognizer) {
      return;
    }

    const video = cameraRef.current.video;

    let lastVideoTime = -1;

    if (video) {
      video.addEventListener("loadeddata", () => {
        if (gestureRecognizer) {
          predictWebcam(video, lastVideoTime);
          const intervalId = setInterval(() => {
            predictWebcam(video, lastVideoTime);
          }, 250);
          return () => clearInterval(intervalId);
        }
      });
    }
  }, [loading, gestureRecognizer, facingMode, cameraRef]);

  const toggleFacingMode = () => {
    setLoading(true);
    setGestureRecognizer(null);
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const videoConstraints = {
    facingMode: facingMode,
  };

  const clearText = () => {
    setCurrentSentence("");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.wrapper}>
            <Menu />
            <Webcam
              ref={cameraRef}
              videoConstraints={videoConstraints}
              className="h-full w-full object-cover object-center"
            />
            <MdOutlineCameraswitch
              size={81}
              color="white"
              onClick={toggleFacingMode}
              className={styles.switchButton}
            />
            <div className={styles.text_box}>
              <FaRegTrashAlt
                className="absolute top-0 left-0 m-3 "
                onClick={clearText}
              />
              <div className="absolute top-0 right-4 m-2">{currentLetter}</div>

              <p className="current_sentence">{currentSentence}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainComponent;
