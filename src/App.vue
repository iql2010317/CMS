<script setup>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <div class="appBody">
        <div class="sideHeader">
            <Header />
        </div>
        <div class="mainContent">
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.appBody {
    display: flex;

    .sideHeader {
        width: 15vw;
        height: 100vh;
        background-color: #f0f0f0;
        padding: 20px;

    }

    .mainContent {
        width: 85vw;
    }
}
</style>


