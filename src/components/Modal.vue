<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import store from "../store/blog";

const props = defineProps({
    show: Boolean,
});

const articleForm = ref({
    title: "",
    text: "",
    fullText: "",
});

const emit = defineEmits(["close"]);

function onSubmit(e) {
    e.preventDefault();
    const item = {
        id: uuidv4(),
        ...articleForm.value,
        date: new Date()
            .toLocaleString("en-CA", {
                timeZone: "America/Los_Angeles",
                hourCycle: "h24",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\D+/g, "-"),
        comments: [],
    };
    store.dispatch("newItem", item);
    articleForm.value = {
        title: "",
        text: "",
        fullText: "",
    };
    emit("close");
}
</script>

<template>
    <div v-if="show" class="modal-mask">
        <div class="modal-container">
            <span class="del_comment" @click="$emit('close')">&#9587;</span>
            <div class="modal-header">
                <slot name="header">Добавление статьи</slot>
            </div>

            <div class="modal-body">
                <slot name="body">
                    <form class="form" @submit="onSubmit">
                        <label>
                            Заголовок:
                            <textarea
                                class="textTitle"
                                v-model="articleForm.title"
                                name="title"
                                type="text"
                                placeholder="Заголовок"
                                maxlength="50"
                                required
                            ></textarea>
                        </label>
                        <label>
                            Краткое описание:
                            <textarea
                                class="textText"
                                v-model="articleForm.text"
                                name="text"
                                type="text"
                                placeholder="Краткое описание"
                                maxlength="100"
                                required
                            ></textarea>
                        </label>
                        <label>
                            Полное описание:
                            <textarea
                                v-model="articleForm.fullText"
                                name="fullText"
                                type="text"
                                placeholder="Полное описание"
                                maxlength="255"
                                required
                            ></textarea>
                        </label>
                        <button class="button" type="submit">сохранить</button>
                    </form>
                </slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../styles/main.scss";
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;

    .modal-container {
        position: relative;
        width: max(50%, 300px);
        margin: auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        .del_comment {
            position: absolute;
            right: 20px;
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
        .modal-header {
            text-align: center;
            text-transform: uppercase;
            font-weight: 600;
        }

        .modal-body {
            margin: 20px 0;

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
                        min-width: 70%;
                        resize: none;
                        height: 100px;
                        margin-left: 8px;
                        color: grey;

                        &:focus {
                            border: 1px solid rgb(233, 231, 231);
                            padding: 4px;
                        }
                    }

                    .textTitle {
                        height: 30px;
                    }
                    .textText {
                        height: 60px;
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
    }
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
