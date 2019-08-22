<template>
  <md-app id="app">
      <md-app-content>
        <MainComponent v-bind:msg="state.message"/>
      </md-app-content>
  </md-app>
</template>

<script>
import MainComponent from './components/MainComponent.vue'

export default {
  name: 'app',
  data: function() {
    return {
      state: {
        message: '',
      }
    }
  },
  components: {
    MainComponent
  },
  created: function() {
    if (!localStorage.getItem('VueBotMemory')) {
      localStorage.setItem('VueBotMemory', JSON.stringify({}));
    }
    this.$set(this.state, 'message', 'Training VueJs App');
  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200), // The accent or secondary color
  theme: dark // This can be dark or light
));

@import "~vue-material/dist/theme/all";

#app {
  .md-content {
    background: #303030;
  }
  .md-card {
    background: #303030;
  }
  .md-card-header {
    background: #242424;
  }
  .md-field {
    margin: 0;
  }
  .ps__rail-y{
    display: none;
  }
}
</style>
