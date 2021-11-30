<template>
  <div class="new_quiz">
    <div class="content">
      <gb-heading tag="h1" class="logo">Start New Quiz</gb-heading>
      <div class="form_quiz">
        <gb-input-numeric
          v-model="amountQuestion"
          label="Number of Questions :"
          class="input_amount_question"
        ></gb-input-numeric>

        <gb-select
          v-model="category"
          label="Select Category :"
          class="select_category"
          :options="optionsCategory"
        />

        <gb-select
          v-model="difficulty"
          label="Select difficulty :"
          class="select_difficulty"
          :options="optionsDifficulty"
        />
      </div>
      <gb-divider class="divider-custom" />
      <div class="choice_button">
        <gb-button @click="$router.push('/')" color="black" right-icon="home">
          Home
        </gb-button>
        <gb-button @click="startQuiz()" right-icon="arrow_forward" uppercase>
          Strart Game
        </gb-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NewQuiz",
  beforeMount() {},
  data() {
    return {
      amountQuestion: 10,
      category: "any",
      difficulty: "any",
      optionsCategory: [
        { label: "Any Category", value: "any" },
        { label: "Entertainment: Music", value: "Entertainment: Music" },
        { label: "Entertainment: Film", value: "Entertainment: Film" },
        {
          label: "Entertainment: Video Games",
          value: "Entertainment: Video Games"
        }
      ],
      optionsDifficulty: [
        { label: "Any Difficulty", value: "any" },
        { label: "Easy", value: "esay" },
        { label: "Medium", value: "medium" },
        { label: "Hard", value: "hard" }
      ]
    };
  },
  watch: {},
  methods: {
    async startQuiz() {
      axios
        .get(
          "http://localhost:3000/quiz/all"
          // `http://localshot:3000/api/v1/quiz/amount_question=${this.amountQuestion}&category=${this.category}&difficulty=${this.difficulty}`
        )
        .then(response => {
          // this.$router.push("/quiz");
          console.log(response.data);
          const quizs = response.data;
          this.$router.push({ name: "Quiz", params: { quizs } });
        })
        .catch(e => {
          console.error("There was an error !", e);
        });
    }
  }
};
</script>

<style lang="scss">
.new_quiz {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  .content {
    width: 440px;
    border: 1px solid #3f536e;
    border-radius: 8px;
    background-color: #171e29;
    padding: 30px;
    margin-top: 30px;
    margin: 6px 6px 30px 6px;
  }

  .form_quiz {
    width: 100%;

    .input_amount_question {
      margin-top: 40px;
    }

    .select_category,
    .select_difficulty {
      margin-top: 20px;
    }
  }

  .choice_button {
    display: flex;
    width: 100%;
    justify-content: space-between;
    button {
      width: 45% !important;
      height: 45px;
    }
  }
}
</style>
