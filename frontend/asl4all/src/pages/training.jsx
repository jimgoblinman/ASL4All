import { useState, useEffect, useRef } from 'react'
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision'

import model from '../models/gesture_recognizer.task'

import Loading from '../components/loading'

import styles from './training.module.css'

export default function Training() {
    const [gestureRecognizer, setGestureRecognizer] = useState(null)
    const [currentLetter, setCurrentLetter] = useState('')
    const [nextGuess, setNextGuess] = useState('')
    const [loading, setLoading] = useState(true)

    const runningModeRef = useRef('VIDEO')
    const videoRef = useRef(null)

    const trainingList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    let count = 0
    let prev = ''

    async function predictWebcam(video, lastVideoTime) {
        let nowInMs = Date.now()
        let results

        if (video.currentTime !== lastVideoTime) {
            lastVideoTime = video.currentTime
            results = gestureRecognizer.recognizeForVideo(video, nowInMs)
        }

        try {
            const letter = await results.gestures[0][0].categoryName
            if (letter === prev || count >= 10) return count += 1
            setCurrentLetter(letter)
            count = 0
            if (nextGuess == letter) await change()
        } catch (error) {
            setCurrentLetter('')
        }
    }

    const change = async () => {
        setNextGuess(trainingList[Math.floor(Math.random() * trainingList.length + 1)])
    }

    useEffect(() => {
        const createGestureRecognizer = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
            )

            const recognizer = await GestureRecognizer.createFromOptions(vision, {
                baseOptions: {
                  modelAssetPath: model,
                  delegate: 'CPU',
                },
                runningMode: runningModeRef.current,
            })

            setGestureRecognizer(recognizer)
            setLoading(false)
        }
        
        createGestureRecognizer()
    }, [])

    useEffect(() => {
        const setVideo = () => {
            if (loading || !gestureRecognizer) return ''
            const video = videoRef.current
    
            let lastVideoTime = -1
    
            const constraints = { video: true }
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                video.srcObject = stream
                video.addEventListener('loadeddata', () => {
                    if (gestureRecognizer) {
                        predictWebcam(video, lastVideoTime)
                        let intervalId = setInterval(() => predictWebcam(video, lastVideoTime), 250)
                        return () => clearInterval(intervalId)
                    }
                })
            })
        }
        setNextGuess(trainingList[Math.floor(Math.random() * trainingList.length + 1)])
        setVideo()
    }, [loading, gestureRecognizer])

    return (
        <>
        {loading
            ? <Loading />
            : <div className={styles.wrapper}>
                <video id='webcam' autoPlay className="h-full w-full object-cover object-center" ref={videoRef}/>

                <div className={styles.text_box}>
                    <div className='box-content h-32 w-32 absolute top-0 right-0 flex justify-center items-center bg-gray-600 rounded-2xl'>
                        {nextGuess}
                    </div>
                    <p>{currentLetter} </p>
                </div>
          </div>
        }
        </>
    )
}