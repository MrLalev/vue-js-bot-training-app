<template>
  <div>
    <h1 id="app-title">{{ msg }}</h1>
    <BotComponent class="chat-bot"/>
  </div>
</template>

<script>
import BotComponent from './BotComponent.vue';

export default {
  name: 'MainComponent',
  props: {
    msg: String
  },
  components: {
    BotComponent
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app-title {
  margin-left: 21px;
}
.chat-bot {
  width: 450px;
}
</style>
