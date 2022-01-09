export default async function () {
    const usersInfo = await this.$store.dispatch("getUsers");
    if (usersInfo) {
        // 通过该id 拿到了对应的 数据
        console.log("init [users] data : ", usersInfo);
    }
    console.log('test mixins this.$store')
}

