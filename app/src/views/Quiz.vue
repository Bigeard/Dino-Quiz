<template>
  <div class="quiz">
    <div class="option">
      <gb-button
        class="icon icon-home"
        @click="$router.push('/')"
        right-icon="home"
      />
      <gb-button
        class="icon icon-more"
        @click="$router.push('/new-quiz')"
        right-icon="more"
      />
    </div>
    <div>
      <div class="content">
        <div v-for="quiz in quizs" :key="quiz._id" class="quiz-content">
          <gb-heading class="quiz-question" tag="h5" weight="bold">{{
            quiz.text_question
          }}</gb-heading>
          <gb-radios
            v-model="quiz.result"
            :radios="quiz.radios"
            :success="quiz.success"
            :error="quiz.error"
            full-width
          ></gb-radios>
        </div>
        <div v-if="resultDisplay" class="score">
          <gb-heading class="quiz-question" tag="h1" weight="bold">
            Score {{ score }}/{{ quizs.length }}
          </gb-heading>
          <gb-heading class="quiz-question" tag="p" weight="bold">
            {{
              quizs.length / score > 2
                ? "Try your best next time 😅"
                : "Well done ! 🎉"
            }}
          </gb-heading>
        </div>
      </div>
      <gb-button
        v-if="!resultDisplay"
        class="validate-quiz"
        @click="validateQuiz()"
        right-icon="check"
        :disabled="false"
        uppercase
      >
        Validate the quiz
      </gb-button>
    </div>
    <div v-if="resultDisplay" class="result-display">
      <gb-button
        class="restart-quiz"
        @click="() => initQuiz()"
        right-icon="loop"
        :disabled="false"
        uppercase
      >
        restart the quiz
      </gb-button>
      <gb-button
        class="new-quiz"
        @click="() => this.$router.push({ path: 'new-quiz' })"
        right-icon="more"
        :disabled="false"
        color="black"
        uppercase
      >
        start a new quiz
      </gb-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Quiz",
  beforeMount() {
    console.info(this.$route.params);
    this.quizs = this.$route.params.quizs;
    this.options = this.$route.params.options;
    if (this.quizs === undefined) {
      this.$router.push({ path: "new-quiz" });
    }
    this.initQuiz();
  },
  data() {
    return {
      success_message: [
        "Good !",
        "Nice !",
        "Excellent !",
        "Well done !",
        "Very good !",
        "Success !",
        "Great job",
        "Wooa !",
        "You are cheating ? :3"
      ],
      options: null,
      quizs: [],
      resultDisplay: false,
      score: 0
    };
  },
  methods: {
    initQuiz() {
      this.resultDisplay = false;
      this.score = 0;
      this.quizs.forEach(q => {
        q.result = null;
        q.error = null;
        q.success = null;
        q.radios = [];
        q.text_question = this.convertSpecialCharacters(q.text_question);
        q.incorrect_answers.forEach(a => {
          q.radios.push({ label: a, value: a });
        });

        q.radios.splice(
          Math.floor(Math.random() * q.incorrect_answers.length + 0),
          0,
          {
            label: q.correct_answer,
            value: q.correct_answer
          }
        );
      });
    },
    validateQuiz() {
      this.quizs.forEach((q, i) => {
        if (q.correct_answer === q.result) {
          q.error = null;
          q.success = this.success_message[
            Math.floor(Math.random() * this.success_message.length + 0)
          ];
          this.$set(this.quizs, i, q);
          this.score++;
        } else {
          q.success = null;
          q.error = "The correct answer is : <B>" + q.correct_answer + "</B>";
          this.$set(this.quizs, i, q);
        }
      });
      axios
        .post(
          "/api/v1/history",
          {
            score: this.score,
            category: this.options?.category,
            difficulty: this.options?.difficulty,
            amount_question: this.quizs.length
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
          }
        )
        .then(r => {
          console.info("Save in history", r);
        })
        .catch(e => {
          console.error("There was an error !", e);
        });

      this.resultDisplay = true;
    },
    convertSpecialCharacters(newString) {
      return newString
        .replace(/&amp;/g, "&")
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
    }
  }
};
</script>
<style lang="scss">
.quiz {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
}

.option {
  z-index: 10;
  position: fixed;
  padding: 7px 5px 5px 5px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1b2431db;
  max-width: 836px;
  .icon {
    i {
      margin: 0 !important;
    }
  }
  .icon-info {
    margin-right: 10px;
  }
  .icon-home {
    margin-right: 20px;
  }
}

.content {
  max-width: 440px;
  border: 1px solid #3f536e;
  border-radius: 8px;
  background-color: #171e29;
  padding: 8px 30px 30px 30px;
  margin: 6px 6px 30px 6px;
}

.quiz-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.quiz-question {
  margin-top: 35px !important;
  margin-bottom: 30px !important;
}

.validate-quiz {
  margin-bottom: 80px;
}

.result-display {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 80px;
  .restart-quiz,
  .new-quiz {
    margin: 15px;
  }
}

.score {
  height: 100px;
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
</style>
