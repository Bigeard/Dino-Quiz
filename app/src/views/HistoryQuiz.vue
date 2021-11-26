<template>
  <div class="historyQuiz">
    <div class="content">
      <gb-heading tag="h1" class="logo">Dino Quiz</gb-heading>
      <gb-button class="icon" @click="$router.push('/')" right-icon="home"
        >Home
      </gb-button>
      <br />
      <div>
        <h2>History :</h2>
        <div v-for="quiz in quizs" :key="quiz.id"></div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "HistoryQuiz",
  async beforeMount() {
    this.findGames();
  },
  data() {
    return {
      quizs: [],
      error: "",
      online: true
    };
  },
  computed: {
    orderedQuiz: function() {
      return _.orderBy(this.quizs, "updatedAt", "desc");
    }
  },
  methods: {
    async findQuizs() {
      let self = this;
      await axios
        .get("https://localhost:3000/api/v1/histories/me", {
          user: this.user._id
        })
        .then(response => {
          self.quizs = response.data;
        })
        .catch(() => {
          self.online = false;
        });
    },
    splitState(status) {
      return status.replace("_", " ");
    },
    dateToLisible(date) {
      return date.replace("T", " ").replace(/\.\d{3}Z/, "");
    }
  }
};
</script>
<style lang="scss">
.historyQuiz {
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 20px;

  .content {
    width: 360px;
    border: 1px solid #3f536e;
    border-radius: 8px;
    background-color: #171e29;
    padding: 30px;
    margin-top: 30px;
    margin: 6px 6px 30px 6px;
  }

  .logo {
    font-size: 65px !important;
    line-height: normal !important;
    margin-bottom: 20px;
  }

  h2 {
    text-align: left;
  }

  .card {
    border: 1px solid #3f536e;
    border-radius: 8px;
    background-color: #616060;
    margin: 6px 6px 30px 6px;
    padding: 3%;
    text-align: center;
  }
}
</style>
