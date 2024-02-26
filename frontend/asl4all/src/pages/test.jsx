import React, { useState, useEffect, useRef } from "react";
import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
} from "@mediapipe/tasks-vision";
import model from "../models/gesture_recognizer_asl_30_epoch.task"

const Test = () => {
    const [gestureRecognizer, setGestureRecognizer] = useState(null);
    let [runningMode, setRunningMode] = useState("IMAGE");
    const [webcamRunning, setWebcamRunning] = useState(false);
    const [currentLetter, setCurrentLetter] = useState("")
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const gestureOutputRef = useRef(null);

    useEffect(() => {
        const createGestureRecognizer = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
            );
            const recognizer = await GestureRecognizer.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: model,
                    delegate: "GPU"
                },
                runningMode: runningMode
            });
            setGestureRecognizer(recognizer);
        };
        createGestureRecognizer();
    }, []);

    const enableCam = () => {
        setWebcamRunning(prevState => !prevState);
    };

    useEffect(() => {
        const video = videoRef.current;
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
        const gestureOutput = gestureOutputRef.current;


        if (webcamRunning) {
            const constraints = { video: true };
            navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                video.srcObject = stream;
                video.addEventListener("loadeddata", predictWebcam);
            });
        }

        let lastVideoTime = -1;
        let results = undefined;
        async function predictWebcam() {
            const webcamElement = document.getElementById("webcam");
            // Now let's start detecting the stream.
            if (runningMode === "IMAGE") {
                runningMode = "VIDEO";
                await gestureRecognizer.setOptions({runningMode: "VIDEO"});
            }
            let nowInMs = Date.now();
            if (video.currentTime !== lastVideoTime) {
                lastVideoTime = video.currentTime;
                results = gestureRecognizer.recognizeForVideo(video, nowInMs);
            }



            try {
                setCurrentLetter(results.gestures[0][0].categoryName)
            } catch (error) {
                setCurrentLetter("No letter")
            }

        }

        let intervalId;
        if (webcamRunning) {
            intervalId = setInterval(() => {
                predictWebcam();
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
            // ... existing cleanup logic
        };
    }, [webcamRunning]);


    return (
        <div>
            <button id="webcamButton" onClick={enableCam}>
                {webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE PREDICTIONS"}
            </button>
            <div id="demos">
                {/* Your other HTML elements */}
            </div>
            <video id="webcam" ref={videoRef} autoPlay />
            <canvas id="output_canvas" ref={canvasRef} />
            <div id="gesture_output" ref={gestureOutputRef} />
            <div>{currentLetter}</div>
        </div>
    );
};

export default Test;
