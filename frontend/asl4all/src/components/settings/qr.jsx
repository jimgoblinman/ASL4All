import React, { useEffect, useRef } from 'react'
import QRCode from 'qrcode-generator'

export default function QR() {
    const qrCodeRef = useRef(null)

    useEffect(() => {
        const generateQRCode = () => {
            const currentPageURL = window.location.href

            const qr = QRCode(0, 'H')
            qr.addData(currentPageURL)
            qr.make()
            
            const qrCodeDataURL = qr.createDataURL(4, 0)

            qrCodeRef.current.src = qrCodeDataURL
        }

        generateQRCode()
    }, [])

    return (
        <div className='p-4 flex justify-center items-center bg-white rounded-lg'>
            <img ref={qrCodeRef} alt="QR Code" />
        </div>
    )
}