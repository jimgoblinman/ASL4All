import { useState, useEffect, useRef } from "react";
import Loading from "../components/loading.jsx";
import Webcam from "react-webcam";
import model from "../models/gesture_recognizer.task";
import { MdOutlineCameraswitch } from "react-icons/md";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import { FaQuestion, FaFastForward } from "react-icons/fa";
import styles from "./training.module.css";

import Swiper from "../components/swiper/swiper.jsx";

import Settings from "../components/settings/main";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomCharacter() {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

export default function Training() {
  const [loading, setLoading] = useState(true);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [currentLetter, setCurrentLetter] = useState("");
  const [currentSolution, setCurrentSolution] = useState(getRandomCharacter());
  const [showSolution, setShowSolution] = useState(false);
  const [check, setCheck] = useState(false);

  const currentSolutionRef = useRef(currentSolution);
  const runningModeRef = useRef("VIDEO");
  const cameraRef = useRef(null);

  let count = 0,
    prev = "";

  const predictWebcam = (video) => {
    const results = gestureRecognizer.recognizeForVideo(video, Date.now());

    try {
      const currentLetter = results.gestures[0][0].categoryName;
      setCurrentLetter(currentLetter);

      currentLetter === prev ? (count += 1) : (prev = currentLetter);

      if (count < 4) return null;
      count = 0;
      prev = "";

      const newSolution = getRandomCharacter();

      switch (currentLetter) {
        case "space":
          break;

        case "del":
          break;

        case currentSolutionRef.current:
          setShowSolution(false);
          setCheck(true);
          setTimeout(() => {
            setCheck(false);
            setCurrentSolution(newSolution);
            currentSolutionRef.current = newSolution;
          }, 500);
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

  const handelSkip = () => {
    setCurrentSolution(getRandomCharacter());
    currentSolutionRef.current = getRandomCharacter();
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
    const handleLoadedData = () => {
      if (!gestureRecognizer) {
        return;
      }
      const webcam = setInterval(() => {
        predictWebcam(video);
      }, 250);
      return () => clearInterval(webcam);
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [gestureRecognizer, loading]);

  useEffect(() => {
    currentSolutionRef.current = currentSolution;
  }, [currentSolution]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.wrapper}>
          <Settings />
          <Swiper setLoading={setLoading} />
          <Webcam
            ref={cameraRef}
            videoConstraints={{ facingMode: facingMode }}
            className="h-full w-full object-cover object-center"
          />
          <div className={styles.cam}>
            <MdOutlineCameraswitch
              size={81}
              color="white"
              onClick={toggleFacingMode}
            />
          </div>
          <div className={`${styles.textBox} ${check ? styles.check : ""}`}>
            <div
              className={`${styles.question} ${
                showSolution ? "" : styles.closed
              }`}
            >
              <img src={`/ASL4All/solution/${currentSolution}.png`} />
            </div>

            <FaQuestion
              onClick={() => {
                setShowSolution((prev) => !prev);
              }}
            />

            <FaFastForward
              className="absolute bottom-0 left-0 m-3 z-50"
              onClick={() => {
                handelSkip();
              }}
            />
            <div className="absolute top-0 right-4 m-2">{currentLetter}</div>
            <p>{currentSolution}</p>
          </div>
        </div>
      )}
    </>
  );
}
