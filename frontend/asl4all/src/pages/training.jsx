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

    const runningModeRef = useRef('VIDEO')
    const cameraRef = useRef(null)

    let count = 0, prev = ''

    const predictWebcam = async (video) => {
        const results = gestureRecognizer.recognizeForVideo(video, Date.now())

        try {
            const currentLetter = results.gestures[0][0].categoryName

            currentLetter === prev
                ? count += 1
                : prev = currentLetter

            if (count < 4) return null
            count = 0
            prev = ''
            
            switch (currentLetter) {
                case 'space':
                    console.log('space')
                    break;
                
                case 'del':
                    console.log('del')
                    break;

                default:
                    console.log(currentLetter)
            }
            
            return null
        } catch (err) {
            return err
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
                predictWebcam(video)
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
                <div className={styles.textBox}>

                </div>
            </div>
        }
        </>
    )
}