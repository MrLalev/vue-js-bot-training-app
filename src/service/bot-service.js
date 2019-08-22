import axios from 'axios';
import * as _ from 'lodash';

export default {
    getBotMemoryAsArray: () => {
      const botMemory = JSON.parse(localStorage.getItem('VueBotMemory'));
      return Object.keys(botMemory).map(k => {
        const memoryItem = botMemory[k];
        memoryItem.question = k;
        return memoryItem;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    setInitMessage: () => {
      const newMemory = {};
      newMemory[''] = {
        answer: 'Hi, I am the Decision Bot. I will help you to have fun, ask me something...',
        image: null,
        date: Date.now()
      };
      localStorage.setItem('VueBotMemory', JSON.stringify(newMemory));
    },
    getAnswer: (question) => {
      let botObject = { question, answer: "", image: null };
      const botMemory = JSON.parse(localStorage.getItem('VueBotMemory'));
      if (!botMemory[botObject.question.trim().toLowerCase()]) {
        return axios.get('https://yesno.wtf/api')
          .then((response) => {
            const newMemory = botMemory;
            const answerDate = Date.now();
            newMemory[botObject.question.trim().toLowerCase()] = {answer: response.data.answer, image: _.capitalize(response.data.image), date: answerDate};
            localStorage.setItem('VueBotMemory', JSON.stringify(newMemory));
            botObject.image = response.data.image;
            botObject.answer = _.capitalize(response.data.answer);
            botObject.date = answerDate;
            return { ...botObject };
          })
          .catch(() => {
            botObject.image = null;
            botObject.answer = 'Sorry can not help you :(';
            botObject.date = Date.now();
            return { ...botObject };
          })
      } else {
        botObject.image = botMemory[botObject.question.trim().toLowerCase()].image;
        botObject.answer = botMemory[botObject.question.trim().toLowerCase()].answer;
        botObject.answer = botMemory[botObject.question.trim().toLowerCase()].date;
        return { ...botObject };
      }
    }
}
