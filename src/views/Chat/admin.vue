<template>
  <div class="chat-container">
    <div class="login">
      <div class="form">
        <h1>确定你的身份，回车后进入聊天室</h1>
        <input type="text" value="Admin" disabled />
      </div>
    </div>
    <div class="chat" style="display: none;">
      <div class="user-list">
        <div class="title">在线人数：<span>0</span></div>
        <ul class="users">
          <li class="all">所有人</li>
        </ul>
      </div>

      <div class="main">
        <ul class="chat-list">
          <li class="log">欢迎来到 中国银行 交流区</li>
        </ul>
        <div class="sendmsg">
          <span class="gray">对</span>
          <span class="user">所有人</span>
          <span class="gray">说：</span>
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
<script src="./ui.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
<script src="./chat.js"></script>

<style lang="less" scoped>
@import './index.css';
.chat-container{
    min-width: 600px;
    background-color: aqua;
}
</style>