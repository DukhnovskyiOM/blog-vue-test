import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

const store = createStore({
    state() {
        return {
            articles: [],
        };
    },
    actions: {
        getArticles({ commit }) {
            const localData = localStorage.getItem("stateArticles");
            const fakeData = [
                {
                    id: uuidv4(),
                    title: "Lorem ipsum dolor sit amet consectetur",
                    text: "Lorem ipsum dolor sit amet consectetur",
                    fullText: "Lorem ipsum dolor sit amet consectetur",
                    date: "2023.10.10",
                    comments: [
                        {
                            id: uuidv4(),
                            nameUser: "Lorem",
                            emailUser: "Lorem@Lorem",
                            textUser:
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nobis dolores reprehenderit maxime numquam anim",
                            date: "2023.10.10",
                        },
                        {
                            id: uuidv4(),
                            nameUser: "Lorem",
                            emailUser: "Lorem@Lorem",
                            textUser:
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nobis dolores reprehenderit maxime numquam anim",
                            date: "2023.10.10",
                        },
                    ],
                },
                {
                    id: uuidv4(),
                    title: "Lorem ipsum dolor sit amet consectetur",
                    text: "Lorem ipsum dolor sit amet consectetur",
                    fullText: "Lorem ipsum dolor sit amet consectetur",
                    date: "2023.10.10",
                    comments: [
                        {
                            id: uuidv4(),
                            nameUser: "Lorem",
                            emailUser: "Lorem@Lorem",
                            textUser:
                                "Lorem ip2sum dolor sit amet consectetur adipisicing elit. Incidunt nobis dolores reprehenderit maxime numquam anim",
                            date: "2023.10.10",
                        },
                    ],
                },
            ];
            if (localData !== null) {
                const data = JSON.parse(localData);
                commit("updateArticles", data);
            } else {
                commit("updateArticles", fakeData);
            }
        },
        newItem({ commit }, item) {
            commit("addArticle", item);
        },
        deleteItem({ commit }, id) {
            commit("deleteArticles", id);
        },
        refreshItem({ commit }, item) {
            commit("changeArticles", item);
        },
        newItemComment({ commit }, props) {
            commit("addArticleComment", props);
        },
        deleteItemComment({ commit }, props) {
            commit("deleteArticlesComment", props);
        },
    },
    mutations: {
        updateArticles(state, articles) {
            state.articles = articles;
        },
        addArticle(state, item) {
            state.articles = [...state.articles, item];
        },
        deleteArticles(state, id) {
            state.articles = state.articles.filter((e) => {
                if (e.id !== id) {
                    return e;
                }
            });
        },
        changeArticles(state, articles) {
            state.articles = state.articles.map((e) => {
                if (e.id === articles.id) {
                    e = articles;
                }
                return e;
            });
        },
        addArticleComment(state, props) {
            state.articles = [
                ...state.articles.map((el) => {
                    if (el.id === props.id) {
                        el.comments.push(props.comment);
                    }
                    return el;
                }),
            ];
        },
        deleteArticlesComment(state, props) {
            state.articles = [
                ...state.articles.map((el) => {
                    if (el.id === props.idItem) {
                        el.comments = el.comments.filter(
                            (e) => e.id !== props.idComment
                        );
                    }
                    return el;
                }),
            ];
        },
    },
    getters: {
        allArticles(state) {
            return state.articles;
        },
        oneArticle: (state) => (id) => {
            return state.articles.find((el) => el.id === id);
        },
    },
});

export default store;
