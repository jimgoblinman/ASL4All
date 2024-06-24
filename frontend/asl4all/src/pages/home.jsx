import React, { useState, useEffect, useRef } from "react";
import { Menu } from "../components/components";
import styles from "./home.module.css";
import Loading from "../components/loading.jsx";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import model from "../models/gesture_recognizer.task";
import { MdOutlineCameraswitch } from "react-icons/md";
import Webcam from "react-webcam";
import { FaRegTrashAlt } from "react-icons/fa";
import Notification from "../components/notification/notification.jsx";

import { Header } from "../components/header/header.jsx";
import Swiper from "../components/swiper/swiper.jsx";

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

  const [currentLetter, setCurrentLetter] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");

  const cameraRef = useRef(null);
  const runningModeRef = useRef("VIDEO");
  let count, prev;

  const predictWebcam = (video) => {
    const results = gestureRecognizer.recognizeForVideo(video, Date.now());

    try {
      const currentLetter = results.gestures[0][0].categoryName;
      setCurrentLetter(currentLetter);

      currentLetter === prev ? (count += 1) : (prev = currentLetter);

      if (count < 4) return null;
      count = 0;
      prev = "";

      switch (currentLetter) {
        case "space":
          setCurrentSentence((p) => p + " ");
          break;

        case "del":
          setCurrentSentence((p) => {
            if (p.length > 0) return p.slice(0, -1);
            return p;
          });
          break;

        default:
          setCurrentSentence((p) => p + currentLetter);
      }

      return null;
    } catch (err) {
      setCurrentLetter("");
    }
  };

  const toggleFacingMode = () => {
    setLoading(true);
    setGestureRecognizer(null);
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

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

    if (!video) {
      return;
    }
    video.addEventListener("loadeddata", () => {
      if (!gestureRecognizer) {
        return;
      }
      const vebcam = setInterval(() => {
        predictWebcam(video);
      }, 250);
      return () => clearInterval(vebcam);
    });
  }, [gestureRecognizer]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <Notification />
          <Menu />
          <Swiper setLoading={setLoading} />
          <Header />
          <Webcam
            ref={cameraRef}
            videoConstraints={{ facingMode: facingMode }}
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
              className="absolute top-0 left-0 m-3 z-50"
              onClick={() => {
                setCurrentSentence("");
              }}
            />
            <div className="absolute top-0 right-4 m-2">{currentLetter}</div>

            <p className="current_sentence">{currentSentence}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MainComponent;
