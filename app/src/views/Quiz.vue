<template>
  <div class="quiz">
    <div class="option">
      <div>
        <gb-button
          class="icon icon-home"
          @click="$router.push('/')"
          right-icon="home"
        />
      </div>
    </div>
    <div class="content">
      <div class="content-game">
        <div id="questions"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quiz",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
.quiz {
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 440px;
  border: 1px solid #3f536e;
  border-radius: 8px;
  background-color: #171e29;
  padding: 30px;
  margin-top: 30px;
  margin: 6px 6px 30px 6px;
}

.content-game {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.Item {
  background: linear-gradient(-45deg, #12c2ca, #b68db7, #0c6cb9);
  background-size: 400% 400%;
  animation: Gradient 8s ease infinite;
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

@media (max-width: 875px) {
  .game {
    overflow: scroll;
  }
}
</style>
