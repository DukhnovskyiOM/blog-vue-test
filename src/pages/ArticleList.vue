<script setup>
import store from "../store/blog";

function declOfNum(number, words) {
    return (
        number +
        " " +
        words[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][
                      number % 10 < 5 ? Math.abs(number) % 10 : 5
                  ]
        ]
    );
}
</script>

<template>
    <template v-for="item in store.getters.allArticles" :key="item.id">
        <router-link :to="{ path: `/article/${item.id}` }">
            <div class="item">
                <h1 class="title">{{ item.title }}</h1>
                <p class="text">{{ item.text }}</p>
                <div class="footer">
                    <span class="date"
                        >Добавлена (обновлена):
                        {{ item.date.split("-").reverse().join(".") }}</span
                    >
                    <span class="comments">{{
                        declOfNum(item.comments?.length, [
                            "комментарий",
                            "комментария",
                            "комментариев",
                        ])
                    }}</span>
                </div>
            </div>
        </router-link>
    </template>
    <template v-if="store.state.articles.length === 0">
        <div class="item">
            <h1 class="title">Здесь пока пусто</h1>
        </div>
    </template>
</template>

<style lang="scss" scoped>
@import "../styles/main.scss";

.item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    user-select: none;
    padding: 16px;
    min-height: 50px;
    color: rgb(73, 73, 73);
    border-radius: 12px;
    background-color: rgb(216, 216, 216);

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 5px;
        font-size: 12px;
    }
}
</style>
