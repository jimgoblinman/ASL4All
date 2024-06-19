import { useState, useEffect, useRef } from "react";

import Loading from "../components/loading.jsx";
import Webcam from "react-webcam";
import { Menu } from "../components/components";
import model from "../models/gesture_recognizer.task";

import { MdOutlineCameraswitch } from "react-icons/md";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

import styles from "./training.module.css";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomCharacter() {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

export default function Training() {
  const [loading, setLoading] = useState(true);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

  const [currentLetter, setCurrentLetter] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState(
    getRandomCharacter()
  );

  const runningModeRef = useRef("VIDEO");
  const cameraRef = useRef(null);

  let count = 0,
    prev = "";

  const predictWebcam = async (video) => {
    const results = gestureRecognizer.recognizeForVideo(video, Date.now());

    try {
      const currentLetter = results.gestures[0][0].categoryName;
      setCurrentLetter(currentLetter);

      currentLetter === prev ? (count += 1) : (prev = currentLetter);

      if (count < 4) return null;
      count = 0;
      prev = "";

      console.log(currentLetter, currentCharacter);

      switch (currentLetter) {
        case "space":
          break;

        case "del":
          break;

        case currentCharacter:
          setCurrentCharacter(getRandomCharacter());
          break;

        default:
          break;
      }
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
          <Menu />
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
          <div className={styles.textBox}>
            <div className="absolute top-0 right-4 m-2">{currentLetter}</div>
            <p>{currentCharacter}</p>
          </div>
        </div>
      )}
    </>
  );
}
