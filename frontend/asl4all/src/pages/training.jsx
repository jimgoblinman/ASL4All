import { useState, useEffect, useRef } from 'react'

import Loading from '../components/loading.jsx'
import Webcam from 'react-webcam'
import model from '../models/gesture_recognizer.task'

import { MdOutlineCameraswitch } from 'react-icons/md'
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision'

import styles from './training.module.css'

export default function Training() {
    const [loading, setLoading] = useState(true)
    const [gestureRecognizer, setGestureRecognizer] = useState(null)
    const [facingMode, setFacingMode] = useState('user')

    /*const [count, setCount] = useState(0)
    const [prev, setPrev] = useState('')*/

    const runningModeRef = useRef('VIDEO')
    const cameraRef = useRef(null)

    const predictWebcam = async (video, lastVideoTime) => {
        let nowInMs = Date.now()
        let results

        if (video.currentTime !== lastVideoTime) {
            lastVideoTime = video.currentTime
            results = gestureRecognizer.recognizeForVideo(video, nowInMs)
        }

        try {
            console.log(results.gestures[0][0].categoryName)
            //let currentLetter = results.gestures[0][0].categoryName

            
        } catch (err) {
            return ''
        }
    }

    const toggleFacingMode = () => {
        setLoading(true)
        setGestureRecognizer(null)
        setFacingMode(facingMode === 'user' ? 'environment' : 'user')
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
    }, [facingMode])

    useEffect(() => {
        if (loading || !gestureRecognizer) { return }

        const video = cameraRef.current.video

        if (!video) { return }
        video.addEventListener('loadeddata', () => {
            if (!gestureRecognizer) { return }
            const vebcam = setInterval(() => {
                predictWebcam(video, -1)
            }, 250)
            return () => clearInterval(vebcam)
        })
    }, [gestureRecognizer])

    return (
        <>
        { loading
            ? <Loading />
            : <div className={styles.wrapper}>
                <Webcam ref={cameraRef}
                    videoConstraints={{ facingMode: facingMode }}
                    className="h-full w-full object-cover object-center"
                />
                <MdOutlineCameraswitch
                    size={81}
                    color='white'
                    onClick={toggleFacingMode}
                    className={styles.switchButton}
                />
                <div></div>
            </div>
        }
        </>
    )
}