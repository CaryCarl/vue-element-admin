<template>
  <div id="message" class="jiexi-page">
    <div class="aside-right">
      <div>
        <el-button type="primary" @click="onBtn2(1)">网址信息解析</el-button>
        <el-input v-model="inputWebUrl" placeholder="请输入网址"></el-input>
      </div>
      <div class="newslist">
        <p @click="copyClick(inputWebUrl)">
          <span>网址：</span>
          <span>{{inputWebUrl}}</span>
        </p>
        <p @click="copyClick(newsObj.title)">
          <span>标题：</span>
          <span>{{newsObj.title}}</span>
        </p>
        <p @click="copyClick(newsObj.description)">
          <span>描述：</span>
          <span>{{newsObj.description}}</span>
        </p>
        <p @click="copyClick(newsObj.keywords)">
          <span>关键词：</span>
          <span>{{newsObj.keywords}}</span>
        </p>
      </div>

      <div class="web-main">
        <iframe :src="inputWebUrl" frameborder="0"></iframe>
      </div>
      <div>

      </div>
    </div>
    <div class="aside-left">
      <div class="t-main">
        <el-button type="primary" @click="onBtn1(1)">链接数据解析</el-button>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </div>

      <div class="html-main">
        <div v-html="textarea"></div>
      </div>
    </div>

  </div>
</template>


<script>
  import Documentation from './index.js';
  export default Documentation;
</script>

<style lang="scss" src="./index.scss" scoped></style>
