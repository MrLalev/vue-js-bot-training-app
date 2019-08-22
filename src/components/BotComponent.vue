<template>
  <div>
     <md-card>
      <md-card-header>
        <md-avatar>
          <img src="../assets/bot.png" alt="Avatar">
        </md-avatar>

        <div class="md-title">Decision Bot</div>
        <div class="md-subhead">Magic 8 Ball</div>
      </md-card-header>

      <md-card-content>
        <perfect-scrollbar id="chat-window">
          <div class="chat-content">
            <div class="chat-item" v-for="memory in botMemory" :key="memory.date">
              <div v-if="memory.question" class="person-section">
                <md-avatar class="person-avatar">
                  <img src="../assets/question.png" alt="Avatar">
                </md-avatar>
                <div class="person-question">
                  <div>
                      <span>{{ memory.question }}</span>
                  </div>
                </div>
              </div>
              <div class="bot-section">
                <div class="bot-answer">
                  <div>
                    <div class="bot-message">
                        <span>{{ memory.answer }}</span>
                    </div>
                  </div>
                  <md-avatar>
                    <img src="../assets/bot.png" alt="Avatar">
                  </md-avatar>
                </div>
                <div v-if="memory.image" class="bot-answer-image">
                  <img :src="memory.image" alt="answer image" width="500" height="300">
                </div>
              </div>
            </div>
          </div>
        </perfect-scrollbar>
        <SendInputComponent v-on:search-event="handleSearchEvent"/>
      </md-card-content>
    </md-card>

  </div>
</template>

<script>
import botService from "../service/bot-service";
import SendInputComponent from "./SendInputComponent.vue";

export default {
  name: "BotComponent",
  components: {
    SendInputComponent
  },
  data: function() {
    return {
      botMemory: []
    };
  },
  created: function() {
    let botMemory = botService.getBotMemoryAsArray();
    if (!botMemory.length) {
      botService.setInitMessage();
      botMemory = botService.getBotMemoryAsArray();
    }
    this.botMemory = [ ...botMemory ];
  },
  mounted: function() {
    this.$nextTick(() => {
      this.scrollDown();
    });
  },
  updated: function () {
  this.$nextTick(function () {
       this.scrollDown();
    })
  },
  methods: {
    getAnswer: async function(question) {
      const botAnswer = await botService.getAnswer(question);
      this.botMemory.push(botAnswer);
    },
    scrollDown: function() {
      const div = document.getElementById('chat-window');
      div.scrollTop = div.scrollHeight - div.clientHeight;
    },
    handleSearchEvent: function(event) {
      this.getAnswer(event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chat-content {
  height: 350px;
  .chat-item {
    display: flex;
    flex-direction: column;
    .person-section {
      display: flex;
      width: 50%;
      margin-top: 15px;
      .person-avatar {
        margin: 0;
      }
      .person-question {
        margin-right: 20px;
        div {
          background: #448aff;
          margin-left: 10px;
          padding: 10px;
          border-radius: 15px;
          word-break: break-word;
        }
      }
  }
  .bot-section {
    display: flex;
    width: 50%;
    align-self: flex-end;
    flex-direction: column;
    margin-top: 5px;
    .bot-answer {
      display: flex;
      align-self: flex-end;
    }
    .bot-answer-image {
      display: flex;
      align-self: flex-end;
      height: 200px;
      width: 250px;
      margin-top: 5px;
    }
    .bot-message {
      margin-right: 10px;
      padding: 10px;
      word-break: break-word;
      background: #448aff;
      border-radius: 15px;
    }
  }
  }
}
</style>
