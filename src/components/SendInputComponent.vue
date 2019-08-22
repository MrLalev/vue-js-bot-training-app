<template>
  <div>
    <md-field md-inline>
      <label>Ask a yes/no question</label>
      <md-input @keyup="handleKeyUp" v-model="state.question"></md-input>
    </md-field>
  </div>
</template>

<script>
import * as _ from "lodash";

export default {
  name: "SendInputComponent",
  data: function() {
    return {
      state: {
        question: "",
      },
    };
  },
  watch: {
    "state.question": function() {
      this.debouncedGetAnswer();
    }
  },
  created: function() {
    this.debouncedGetAnswer = _.debounce(this.emitAnswerEvent, 3000);
  },
  methods: {
    emitAnswerEvent: function() {
      if (this.$data.state.question) {
        this.$emit('search-event', this.state.question);
        this.$set(this.state, 'question', '');
      }
    },
    handleKeyUp: function(event) {
      if (event.key === "Enter") {
          this.emitAnswerEvent();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
