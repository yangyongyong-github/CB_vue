/**
 * 主要完成项目运行后，需要初始化的一些数据
 */

/**
 * 1. 利率信息的获取
 *  首页的显示；
 *      基本rate的获取，
 *      参照信息 【1000 元存储5年，即将获得本息。。。】
 *      用户测试信息的获取[扩展] 尝试新的输入金额和选择利率，计算出本金
 */

// 拿到db中的数据，并存储到 localStorage中

// home加载完成时
export async function getRate(id) {
    const rateInfo = await this.$store.dispatch("rateServer/getRate", {
        id,
    });
    if (rateInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init load rate data : ", rateInfo);
        try {
            // 将 rate 写入 localStorage
        } catch (error) {

        }
    }
}

// userName: localStorage.getItem("useri-name"),


// 点击按钮刷新拿取