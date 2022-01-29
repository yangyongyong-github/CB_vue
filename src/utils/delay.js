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

// or
// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))