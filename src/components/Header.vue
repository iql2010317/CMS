<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from "pinia";
import indexState from "../Store/indexState";
export default {
    components: {
        RouterLink,
    },
    computed: {
        ...mapState(indexState, ["location", "locationInfo"])
    },
    methods: {
        ...mapActions(indexState, ["getLocation", "setLocation"])
    }
};
</script>
<template>
    <nav class="sideborad">
        <RouterLink to="/" class="router-link-custom">登入</RouterLink>
        <RouterLink to="/BackstagePM" class="router-link-custom">人員管理</RouterLink>
        <RouterLink to="/BackstageCM" class="router-link-custom">課程管理</RouterLink>
        <RouterLink to="/BackstageSP" class="router-link-custom">課程進度</RouterLink>

    </nav>

    <!-- <p>{{ this.location }}</p> -->
</template>


<style lang="scss" scoped>
.sideborad {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    /* 添加邊距 */
    align-items: center;
    justify-content:space-around;
}

.router-link-custom {
    text-decoration: none;
    color: blue;
    transition: text-decoration-color 0.3s;
    border-bottom: 1px solid transparent;
    margin-left: 15px;

    &:hover {
        text-decoration-color: blue;
        border-bottom: 1px solid blue;
    }
}
</style>

