<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";

import store from "../store/blog";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const router = useRouter();

const changeFlag = ref(false);

const commentForm = ref({
    nameUser: "",
    emailUser: "",
    textUser: "",
});

const objItem = store.getters.oneArticle(props.id);

const changeDataArticle = ref({
    title: objItem.title,
    text: objItem.text,
    fullText: objItem.fullText,
});

function deleteComment(id) {
    store.dispatch("deleteItemComment", { idComment: id, idItem: props.id });
}

function deleteArticle() {
    store.dispatch("deleteItem", props.id);
    router.push({ name: "home" });
}

function onSubmit(e) {
    e.preventDefault();
    const comment = {
        id: uuidv4(),
        ...commentForm.value,
        date: new Date()
            .toLocaleString("en-CA", {
                timeZone: "America/Los_Angeles",
                hourCycle: "h24",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\D+/g, "-"),
    };
    store.dispatch("newItemComment", { comment, id: props.id });
    commentForm.value = {
        nameUser: "",
        emailUser: "",
        textUser: "",
    };
}

function newDataArticle() {
    changeFlag.value = !changeFlag.value;
    if (changeFlag.value !== true) {
        const item = {
            id: props.id,
            ...changeDataArticle.value,
            date: new Date()
                .toLocaleString("en-CA", {
                    timeZone: "America/Los_Angeles",
                    hourCycle: "h24",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })
                .replace(/\D+/g, "-"),
            comments: [...objItem.comments],
        };
        store.dispatch("refreshItem", item);
        location.reload();
    }
}
</script>

<template>
    <div class="item">
        <div class="changeItem">
            <button class="btn change" @click="newDataArticle">
                {{ !changeFlag ? "редактировать" : "сохранить" }}
            </button>
            <button class="btn delete" @click="deleteArticle">удалить</button>
        </div>

        <template v-if="!changeFlag"
            ><h1 class="title">{{ objItem.title }}</h1>
            <p class="text">{{ objItem.text }}</p>
            <p class="full_text">{{ objItem.fullText }}</p>
        </template>
        <template v-if="changeFlag"
            ><p class="titleChange">
                <textarea
                    v-model="changeDataArticle.title"
                    name="changeTitle"
                    type="text"
                    maxlength="50"
                    required
                ></textarea>
            </p>
            <p class="text">
                <textarea
                    v-model="changeDataArticle.text"
                    name="changeText"
                    type="text"
                    maxlength="100"
                    required
                ></textarea>
            </p>
            <p class="full_text">
                <textarea
                    v-model="changeDataArticle.fullText"
                    name="changeFullText"
                    type="text"
                    maxlength="255"
                    required
                ></textarea>
            </p>
        </template>

        <span class="date">Добавлена (обновлена): {{ objItem.date }}</span>
        <span class="comments">Комментарии: </span>
        <div class="block_comments">
            <ul>
                <li
                    v-for="comment in objItem.comments"
                    :key="objItem.comments.id"
                >
                    <div class="comment_top">
                        <span class="name"
                            >{{ comment.nameUser
                            }}<span class="email">{{
                                comment.emailUser
                            }}</span></span
                        >
                        <span class="date">{{
                            comment.date.split("-").reverse().join(".")
                        }}</span>
                    </div>
                    <p class="comment_text">{{ comment.textUser }}</p>
                    <span
                        class="del_comment"
                        @click="() => deleteComment(comment.id)"
                        >&#9587;</span
                    >
                </li>
                <li v-if="objItem.comments.length === 0">Здесь пока пусто</li>
            </ul>
        </div>
        <div class="form_comment">
            <h4>Добавить комментарий:</h4>
            <form class="form" @submit="onSubmit">
                <label>
                    Имя:
                    <input
                        name="nameUser"
                        type="text"
                        placeholder="Имя"
                        maxlength="50"
                        v-model="commentForm.nameUser"
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        v-model="commentForm.emailUser"
                        name="email"
                        type="email"
                        placeholder="Email"
                        maxlength="50"
                        required
                    />
                </label>
                <label>
                    Текст:
                    <textarea
                        v-model="commentForm.textUser"
                        name="text"
                        type="text"
                        placeholder="Текст"
                        maxlength="255"
                        required
                    ></textarea>
                </label>
                <button class="button" type="submit">сохранить</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../styles/main.scss";

textarea {
    min-width: 60%;
    resize: none;
    height: 120px;
    font-size: 14px;
    color: grey;
    background-color: white;
    padding: 2px;
    padding-left: 8px;
    border-radius: 10px;

    &:focus {
        border: 1px solid rgb(233, 231, 231);
        padding: 4px;
    }
}

.item {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 10px;
    user-select: none;
    padding: 16px;
    min-height: 50px;
    color: rgb(73, 73, 73);
    border-radius: 12px;
    background-color: rgb(216, 216, 216);

    .title {
        width: 60%;
        word-wrap: break-word;
    }

    .titleChange {
        width: 100%;
    }

    .text {
        word-wrap: break-word;
    }

    .full_text {
        word-wrap: break-word;
    }

    .changeItem {
        display: flex;
        flex-direction: row;
        gap: 10px;
        position: absolute;
        right: 20px;
        .btn {
            background: grey;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            color: white;
            user-select: none;
            font-weight: 500;
            text-transform: uppercase;
            padding: 10px;
            overflow: hidden;
            margin-left: 10px;
            text-align: center;
        }
        .change {
            &:hover {
                background: rgb(32, 151, 28);
            }
        }

        .delete {
            &:hover {
                background: rgb(170, 35, 35);
            }
        }
    }
    .form_comment {
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: white;
        padding: 18px;
        border-radius: 10px;

        .form {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            font-size: 14px;
            gap: 10px;
            label {
                width: 100%;
                display: flex;
                align-items: flex-start;
                flex-direction: row;
                justify-content: space-between;
                padding: 4px;

                textarea {
                    min-width: 90%;
                    resize: none;
                    height: 80px;
                    margin-left: 8px;
                    color: grey;

                    &:focus {
                        border: 1px solid rgb(233, 231, 231);
                        padding: 4px;
                    }
                }
                input {
                    width: 90%;
                    margin-left: 8px;
                    color: grey;

                    &:focus {
                        border: 1px solid rgb(233, 231, 231);
                        padding: 4px;
                    }
                }
            }

            .button {
                background: rgb(233, 231, 231);
                cursor: pointer;
                border: none;
                border-radius: 5px;
                color: grey;
                user-select: none;
                font-weight: 500;
                text-transform: uppercase;
                padding: 10px;
                overflow: hidden;
                text-align: center;

                &:hover {
                    background: rgb(153, 152, 152);
                    color: white;
                }
            }
        }
    }

    .date {
        font-size: 12px;
        margin: 15px 0;
        color: grey;
    }

    .text {
        font-size: 14px;
        color: grey;
    }

    .block_comments {
        display: flex;
        margin: 0 40px;

        ul {
            width: 100%;

            li {
                border-bottom: 1px dotted grey;
                padding-bottom: 2px;
                position: relative;

                .del_comment {
                    position: absolute;
                    right: -20px;
                    top: 13px;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    color: rgb(170, 35, 35);
                    font-size: 10px;
                    font-weight: 600;

                    &:hover {
                        color: rgb(236, 58, 58);
                    }
                }
            }
        }

        .comment_text {
            word-wrap: break-word;
            font-size: 14px;
        }

        .comment_top {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;

            .name {
                word-wrap: break-word;
                .email {
                    font-size: 12px;
                    color: grey;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
