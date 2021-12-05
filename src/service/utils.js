
/**
 * 模拟网络延迟的函数
 * @param {*} duratioin 
 * @returns 
 */
 function delay(duratioin) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duratioin);
    });
}

export { delay }