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
        <div v-for="quiz in quizs" :key="quiz.id" class="score-history">
          <gb-heading class="quiz-question" tag="h1" weight="bold">
            Score {{ quiz.score }}/{{ quiz.amount_question }}
          </gb-heading>
          <gb-heading class="quiz-question" tag="p" weight="bold">
            {{
              quiz.amount_question / quiz.score > 2
                ? "Try your best next time 😅"
                : "Well done ! 🎉"
            }}
          </gb-heading>
          <gb-badge filled>{{ quiz.category }}</gb-badge>
          <gb-badge color="black" filled>Difficulty : {{ quiz.difficulty }}</gb-badge>
        </div>
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
    await this.findQuizs();
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
        .get("/api/v1/history/me", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        .then(response => {
          this.quizs = response.data;
          console.log(self.quizs);
        })
        .catch(() => {
          this.online = false;
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

  .score-history {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    margin-top: 30px;
    background: linear-gradient(-45deg, #12c2ca, #b68db7, #0c6cb9);
    background-size: 400% 400%;
    animation: Gradient 8s ease infinite;

    h1,
    p {
      margin: 0 !important;
    }

    .gb-base-badge {
      margin: 2px;
    }
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
</style>
