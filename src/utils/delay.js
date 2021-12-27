/**
 * mock dalay func
 * @param {} duration 
 * @returns 
 */
export default function (duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration)
    })
}