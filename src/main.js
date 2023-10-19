import "./styles/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/blog";

store.subscribe((mutation, state) => {
    if (mutation.type !== "updateArticles") {
        localStorage.setItem("stateArticles", JSON.stringify(state.articles));
    }
});

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
