import React, { useState, useEffect, useRef } from "react";
import { Menu } from "../components/components";
import styles from "./home.module.css";
import Loading from "../components/loading.js";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import model from "../models/gesture_recognizer_asl_30_epoch.task";

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [currentLetter, setCurrentLetter] = useState("");
  const videoRef = useRef(null);
  const runningModeRef = useRef("VIDEO");

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
        runningMode: runningModeRef.current, // Use current value
      });
      setGestureRecognizer(recognizer);
    };
    createGestureRecognizer();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.addEventListener("loadeddata", () => {
        if (gestureRecognizer) {
          predictWebcam();
          let intervalId = setInterval(predictWebcam, 1000);
          return () => clearInterval(intervalId);
        }
      });
    });

    let lastVideoTime = -1;
    let results = undefined;
    async function predictWebcam() {
      let nowInMs = Date.now();
      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
      }

      try {
        setCurrentLetter(results.gestures[0][0].categoryName);
      } catch (error) {
        setCurrentLetter("No letter");
      }
    }
  }, [gestureRecognizer]);

  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);

  const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a 2-second loading time
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Menu />
        <video
          id="webcam"
          ref={videoRef}
          autoPlay
          className="h-full w-full bg-cover bg-center"
        />
        <div className={styles.text_box}>
          <h1 className="text-3xl">{currentLetter}</h1>
        </div>
      </div>
      {/* <div className="z-10">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <video src="../assets/loading-video.mp4" controls></video>
            <p>Test</p>
          </div>
        )}
      </div> */}
    </>
  );
};

export default MainComponent;
