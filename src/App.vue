<script setup>
import { ref } from "vue";
import store from "./store/blog";
import Modal from "./components/Modal.vue";

store.dispatch("getArticles");

const showModal = ref(false);
</script>

<template>
    <header class="header">
        <div class="logo"><router-link to="/">BloG TesT</router-link></div>
        <div class="button" @click="showModal = true">создать статью</div>
    </header>
    <main class="main">
        <div class="conteiner">
            <router-view></router-view>
        </div>
    </main>
    <modal :show="showModal" @close="showModal = false"> </modal>
</template>

<style lang="scss" scoped>
@import "./styles/main.scss";
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px;

    .logo {
        font-size: 25px;
        cursor: default;
        user-select: none;
        font-weight: 500;
        background: white;
        color: black;
        padding: 5px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }

    .button {
        background: grey;
        cursor: pointer;
        border-radius: 5px;
        color: white;
        user-select: none;
        font-weight: 500;
        text-transform: uppercase;
        padding: 10px;
        overflow: hidden;
        margin-left: 10px;
        text-align: center;

        &:hover {
            background: rgb(153, 152, 152);
        }
    }
}

.main {
    display: flex;
    align-items: center;
    justify-content: center;
    .conteiner {
        display: flex;
        flex-direction: column;
        width: max(50%, 800px);
        padding: 10px;
        gap: 30px;
        border-radius: 15px;
    }
}
</style>
