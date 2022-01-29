import Home from "@/views/Home";
// 其他的全部使用懒加载
import store from "@/store";

export default [
    // 首页 Home public
    { name: "home", path: '/', component: Home },
    // CB introduce page public
    {
        name: "introduce",
        path: '/introduce',
        component: () => import("@/views/Introduce")
    },
    // lottery private
    {
        name: 'lottery',
        path: '/lottery',
        component: () => import("@/views/Lottery"),
        beforeEnter(to, from, next) {
            if (store.state.lottery.auth) {
                next();
            } else {
                alert('请先拿取权限(注册或办理存款业务)！');
                next("/")
            }
        }
    }
]
