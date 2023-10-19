import { createRouter, createWebHashHistory } from "vue-router";
import ArticleList from "../pages/ArticleList.vue";
import Article from "../pages/Article.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", name: "home", props: true, component: ArticleList },
        {
            path: "/article/:id",
            name: "article",
            props: true,
            component: Article,
        },
    ],
});
