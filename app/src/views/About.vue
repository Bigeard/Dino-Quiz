<template>
  <div class="about">
    <gb-heading tag="h1" class="logo">Dino Quiz</gb-heading>

    <div class="author">
      <gb-heading tag="h1">Marceau David</gb-heading>
      <gb-heading tag="h1">Geoffrey Clermont</gb-heading>
      <gb-heading tag="h1">Robin Bigeard</gb-heading>
    </div>

    <div class="info">
      <ul>
        <li>
          Template:
          <a href="https://www.growthbunker.dev/vuedarkmode">Vue Dark Mode</a>
        </li>
        <li>
          Sprite: <a href="https://arks.itch.io/dino-characters">Dino GIF</a>
        </li>
        <li>
          Repo: <a href="https://github.com/Bigeard/dino">Dino Project</a>
        </li>
      </ul>
    </div>

    <gb-button @click="$router.push('/')" right-icon="home">
      Return
    </gb-button>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>

<style lang="scss">
.about {
  padding: 10px;
  margin-bottom: 180px;
  margin-top: 20px;

  .logo {
    margin-top: 15px;
    font-size: 65px !important;
    line-height: normal !important;
    margin-bottom: 15px !important;

    img {
      width: 74px;
      margin-bottom: -12px;
    }
  }

  .author {
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .info {
    display: flex;
    justify-content: center;

    ul {
      margin: auto;
      width: 100%;
      text-align: left;
      list-style-type: none;
    }
  }
}
</style>
