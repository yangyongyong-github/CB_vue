// 正则通用验证函数

/**
 * 
 * 1）loginId, 账号 
 * -    英文字母+数字
 */
export function rules_1(str) { // length_min, length_max
    // str.test()
    if (str == null || str.length < 4) return false;
    //  /^[a-zA-Z].*\d$/  yang_01
    //  /^[a-zA-Z][0-9]$/ 无效
    const reg = /^[a-zA-Z]{4,}\d+$/ // yang01 {4,}:大于4  +: 1/n
    if (reg.test(str)) return str;
    return;

}

/**
 * 2）name：
 * -    英文字母 or 汉字
 */
export function rules_2(str) {
    if (str == null || str.length < 2) return false;

    // const reg = /[a-zA-Z]\d{4,20}|[\u4e00-\u9FA5]{2,10}/
    const reg = /(^([a-zA-Z]+\s)*[a-zA-Z]+$)|(^[\u4e00-\u9fa5]+$)/;

    if (reg.test(str)) return str;
    return;
}

/**
 * 电话号码
 */
export function rules_phone(num) {
    const reg = /^1\d{10}$/;
    if (reg.test(num)) return num;
    return
}