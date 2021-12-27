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
]
