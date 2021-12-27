import store from "../store";

export default [
    //login pager
    {
        name: "login",
        path: "/login",
        component: () => import("@/views/Login")
    },
    // 用户 注册页面 useri userii
    {
        name: "register",
        path: "/register",
        component: () => import("@/views/Register")
    },
    // admin Center
    {
        name: "admin",
        path: "/admin",
        component: () => import("@/views/Admin"),
        beforeEnter(to, from, next) {
            if ((store.state.userData) && (store.state.userData.flag === 'admin')) {
                next();
            } else {
                alert('请先登录！');
                next("/login")
            }
        }
    },
     // User_II Center pages , private
     {
        name: "useri",
        path: "/useri",
        component: () => import("@/views/User_I"),
        beforeEnter(to, from, next) {
            if ((store.state.userData) && (store.state.userData.flag === 'useri')) {
                next();
            } else {
                alert('请先登录！');
                next("/login")
            }
        }
    },
    // User_II Center pages , private
    {
        name: "userii",
        path: "/userii",
        component: () => import("@/views/User_II"),
        beforeEnter(to, from, next) {
            if ((store.state.userData) && (store.state.userData.flag === 'userii')) {
                next();
            } else {
                alert('请先登录！');
                next("/login")
            }
        }
    }
]