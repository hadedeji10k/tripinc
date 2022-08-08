declare global {
    interface Window {
        tripInc?: any
    }
}
const windowCopy = window
export { windowCopy as window }