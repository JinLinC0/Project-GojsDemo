<template>
    <div class="container">
        <div class="top">
            <span class="title">基于Gojs的拖拽思维导图编辑器</span>
        </div>
        <div class="main">
            <imageNode></imageNode>
        </div>
        <div class="bottom">
            <span style="color: #868e96; font-size: 15px;">该项目只是一个简单的Gojs小Demo，及支持简单的思维导图的绘制，同时支持GoJs数据的导出</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import imageNode from './stageAchievements/imageNode.vue';
</script>

<style scoped>
.container {
    background-color: #f1f3f5;
    width: 100%;       
    height: 100vh;
    overflow: hidden;
}
.top {
    height: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 20px;
    font-weight: bold;
    color: rgb(30, 31, 32);
}

.main {
    width: 100%;
    height: 90%;
}

.bottom {
    width: 100%;
    height: 3%;
    display: flex;
    align-items: center;      /* 垂直居中 */
    justify-content: center;  /* 水平居中 */
}
</style>