/**
 * 传入一个时间戳，转换为规定格式的时间字符串输出
 * input : 908150400000 
 * @returns 2021-09-06
 */
export function formatDate(timestamp, showTime = false) {
    const date = new Date(+timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date
        .getDate()
        .toString()
        .padStart(2, "0");
    let str = `${date.getFullYear()}-${month}-${day}`;
    if (showTime) {
        const hour = date
            .getHours()
            .toString()
            .padStart(2, "0");
        const minute = date
            .getMinutes()
            .toString()
            .padStart(2, "0");
        const second = date
            .getSeconds()
            .toString()
            .padStart(2, "0");
        str += ` ${hour}:${minute}:${second}`;
    }
    return str;
}



/**
 * 创建一个时间(现在的时间)
 * "2021-09-06 08:28:54"
    getDateTimeNow()     无参，直接调用即可得到
 */
export function getDateTimeNow() {
    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2)
    var month = ("0" + (time.getMonth() + 1)).slice(-2)

    var hour = ("0" + time.getHours()).slice(-2)
    var minute = ("0" + time.getMinutes()).slice(-2)
    var second = ("0" + time.getSeconds()).slice(-2)

    var today = time.getFullYear() + "-" + (month) + "-" + (day) + " " + (hour) + ":" + (minute) + ":" + second
    return today;
}


/**
 * 2021/09/06/ 08:43 星期一
 *  getDateCommonFormt() 
 * 无参，直接调用即可得到
 */

export function getDateCommonFormt() {
    let now = new Date();
    let y = now.getFullYear();
    let month = (now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    let d = now.getDay() < 10 ? "0" + now.getDate() : now.getDate();
    let h = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    let m = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    let w = "星期" + "日一二三四五六".charAt(now.getDay());
    return (y + "/" + month + "/" + d + "/" + " " + h + ":" + m + " " + w)
}

/**
 * 获得指定时间之后的年数
 * @param {*} year 多少年之后
 * @returns 
 */
export function getEndDay(year) {

    year = parseInt(year)

    if (year <= 0) {
        alert("No edffect ");
        return;
    }

    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2)
    var month = ("0" + (time.getMonth() + 1)).slice(-2)

    var hour = ("0" + time.getHours()).slice(-2)
    var minute = ("0" + time.getMinutes()).slice(-2)
    var second = ("0" + time.getSeconds()).slice(-2)

    var today = time.getFullYear() + year + "-" + (month) + "-" + (day) + " " + (hour) + ":" + (minute) + ":" + second
    return today
}

