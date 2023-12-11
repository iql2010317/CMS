<script>
export default {
    data() {
        return {
            foundStudent: JSON.parse(sessionStorage.getItem('foundStudent')),
            foundStaff: JSON.parse(sessionStorage.getItem('foundStaff'))
        };
    },
    methods: {
        logout() {
            // 移除 session 中的 found 資料
            sessionStorage.removeItem('foundStudent');
            sessionStorage.removeItem('foundStaff');
            // 做其他登出相關的操作，比如重新導向到登入頁面或清除其他相關資料
            alert("成功登出");
            this.$router.push({ name: 'home' });
        }
    }
};
</script>

<template>
    <div>
        <div v-if="foundStudent" class="forStudentArea">
            歡迎回來 {{ foundStudent.name }}
            <button @click="logout()">使用者登出</button>
        </div>

        <div v-if="foundStaff" class="forStaffArea">
            歡迎回來 {{ foundStaff.name }}
            <button @click="logout()">使用者登出</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
/* 樣式 */
</style>
