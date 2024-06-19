import FontPart from './font'
import SizePart from './size'
import ColorPart from './color'
import OpacityPart from './opacity'
import QRPart from './qr'
import LanguagePart from './language'
import RecognitionPart from './recognition'

export function Font() { return <FontPart /> }
export function Size() { return <SizePart /> }
export function Color() { return <ColorPart /> }
export function Opacity() { return <OpacityPart /> }
export function QR() { return <QRPart /> }
export function Language() { return <><div><LanguagePart /></div></> }
export function Recognition() { return <RecognitionPart /> }    