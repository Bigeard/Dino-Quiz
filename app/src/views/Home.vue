<template>
  <div class="home">
    <div class="content">
      <gb-heading tag="h1" class="logo">Dino Quiz</gb-heading>
      <!-- Download button -->
      <div v-if="deferredPrompt">
        <gb-heading tag="h2">Install Application</gb-heading>
        <div
          @click="install"
          v-if="deferredPrompt"
          class="btn-circle-download"
          id="btn-download"
        >
          <svg id="arrow" width="14px" height="20px" viewBox="17 14 14 20">
            <path d="M24,15 L24,32"></path>
            <polyline points="30 27 24 33 18 27"></polyline>
          </svg>
          <svg id="check" width="21px" height="15px" viewBox="13 17 21 15">
            <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
          </svg>
          <svg id="border" width="48px" height="48px" viewBox="0 0 48 48">
            <path
              d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"
            ></path>
          </svg>
        </div>
      </div>
      <!-- Navigation -->
      <div class="nav" v-if="token">
        <gb-button
          :disabled="!token || !online"
          @click="newGame()"
          right-icon="add"
        >
          New Quiz
        </gb-button>
        <gb-button
          :disabled="!token"
          @click="$router.push('/history')"
          right-icon="search"
        >
          History
        </gb-button>
        <gb-button @click="$router.push('/about')" right-icon="info">
          About
        </gb-button>
      </div>
      <gb-divider />
      <!-- User Info -->
      <div class="user" v-if="!token">
        <div class="username">
          <gb-input
            v-model="username"
            label="Username"
            placeholder="Username is required"
            :error="errorUsername"
            :status="statusUsername"
            @submit="checkAuth"
          />
        </div>
        <br />
        <div class="password">
          <gb-input
            v-model="password"
            label="Password"
            type="password"
            placeholder="Password is required"
            :error="errorPassword"
            :status="statusPassword"
            @submit="checkAuth"
          />
          <gb-button
            @click="checkAuth"
            :disabled="waitAuth"
            :class="statusPassword + '_valid'"
          >
            Connect
          </gb-button>
        </div>
      </div>
      <div v-if="token">
        <gb-button @click="onDisconnect" color="black" full-width>
          Disconnect
        </gb-button>
        <p>
          Token :
          <span class="token">{{ token.substring(0,8) }}...</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  async beforeMount() {
    this.token = sessionStorage.getItem("token");
    window.addEventListener("online", () => (this.online = true));
    window.addEventListener("offline", () => (this.online = false));
  },
  data() {
    return {
      token: null,
      username: null,
      password: null,
      error: null,
      errorUsername: null,
      errorPassword: null,
      waitAuth: true,
      statusUsername: "warning",
      statusPassword: "warning",
      status: "warning",
      deferredPrompt: null,
      online: true
    };
  },
  watch: {
    username(v) {
      this.onChangeUsername(v);
    },
    password(v) {
      this.onChangePassword(v);
    }
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },
  methods: {
    onChangeUsername(v) {
      if (v.length === 0) {
        this.statusUsername = "warning";
        this.errorUsername = null;
      } else if (v.length < 4) {
        this.errorUsername = "A minimum of 4 characters is required";
        this.statusUsername = "error";
      } else if (v.length > 13) {
        this.errorUsername = "A maximum of 12 characters is required";
        this.statusUsername = "error";
      } else if (!/^[\w.]*$/.test(v)) {
        this.errorUsername =
          'you can only use the following characters: "A-z" "0-9" "_"';
        this.statusUsername = "error";
      } else {
        this.errorUsername = null;
        this.statusUsername = "normal";
      }

      if (
        this.statusUsername === "normal" &&
        this.statusPassword === "normal"
      ) {
        this.waitAuth = false;
        this.status = "normal";
      } else {
        this.waitAuth = true;
        this.status = "error";
      }
    },
    onChangePassword(v) {
      if (v.length === 0) {
        this.statusPassword = "warning";
        this.errorPassword = null;
      } else if (v.length < 8) {
        this.errorPassword = "A minimum of 8 characters is required";
        this.statusPassword = "error";
      } else {
        this.errorPassword = null;
        this.statusPassword = "normal";
      }

      if (
        this.statusUsername === "normal" &&
        this.statusPassword === "normal"
      ) {
        this.waitAuth = false;
        this.status = "normal";
      } else {
        this.waitAuth = true;
        this.status = "error";
      }
    },
    async checkAuth() {
      if (!this.token) {
        if (
          this.statusUsername === "normal" &&
          this.statusPassword === "normal"
        ) {
          this.waitAuth = false;
          this.status = "normal";
          await axios
            .post("/api/v1/user/signin", {
              username: this.username,
              password: this.password
            })
            .then(response => {
              sessionStorage.setItem("token", response.data);
              this.token = response.data;
              // location.reload(true);
            })
            .catch(() => {
              self.status = "error";
              self.errorUsername = "Cannot connect to the server";
            });
        } else {
          this.waitAuth = true;
          this.status = "error";
        }
      }
    },
    onDisconnect() {
      sessionStorage.removeItem("token");
      this.token = null;
      // location.reload(true);
    },
    async install() {
      document.getElementById("btn-download").classList.add("load");
      setTimeout(function() {
        document.getElementById("btn-download").classList.add("done");
      }, 1000);
      this.deferredPrompt.prompt();
    },
    async newGame() {
      this.$router.push("/new-quiz");
    }
  }
};
</script>

<style lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .error_valid {
    margin-bottom: 50px;
  }

  .content {
    width: 360px;
    border: 1px solid #3f536e;
    border-radius: 8px;
    background-color: #171e29;
    padding: 30px;
    margin: 100px 6px 30px 6px;
  }

  .logo {
    font-size: 65px !important;
    line-height: normal !important;
    margin-bottom: 40px !important;

    img {
      margin-bottom: -12px;
    }
  }

  .password {
    display: flex;
    align-items: flex-end;
    // margin-bottom: 30px;

    .gb-field-input {
      width: 100%;
      margin-right: 10px;
    }

    .gb-base-button {
      height: 42px;
    }
  }

  .token {
    margin-left: 10px;
    background-color: #222c3c;
    box-shadow: 0 1px 5px 0 #18191a;
    padding: 10px;
    border-radius: 4px;
  }

  .nav {
    .gb-base-button,
    .gb-field-input {
      width: 100%;
      margin-top: 20px;
    }
  }

  //download button style
  .btn-circle-download {
    position: relative;
    height: 48px;
    width: 48px;
    margin: auto;
    border-radius: 100%;
    background: #e8eaed;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;
    margin-top: 10px;
  }
  .btn-circle-download:after {
    content: "";
    position: relative;
    display: block;
    width: 200%;
    height: 100%;
    background-image: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0)
    );
    transform: translateX(-100%);
  }
  .btn-circle-download svg {
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
  .btn-circle-download svg#border {
    position: absolute;
    top: 0;
    left: 0;
    stroke: none;
    stroke-dasharray: 144;
    stroke-dashoffset: 144;
    transition: all 0.9s linear;
  }
  .btn-circle-download svg#arrow {
    position: absolute;
    top: 14px;
    left: 17px;
    stroke: #9098a9;
    transition: all 0.2s ease;
  }
  .btn-circle-download svg#check {
    position: absolute;
    top: 17px;
    left: 13px;
    stroke: white;
    transform: scale(0);
  }
  .btn-circle-download:hover {
    background: rgba(0, 119, 255, 0.2);
  }
  .btn-circle-download:hover #arrow path,
  .btn-circle-download:hover #arrow polyline {
    stroke: #0093ee;
  }
  .btn-circle-download.load {
    background: rgba(0, 119, 255, 0.2);
  }
  .btn-circle-download.load #arrow path,
  .btn-circle-download.load #arrow polyline {
    stroke: #0093ee;
  }
  .btn-circle-download.load #border {
    stroke: #0093ee;
    stroke-dasharray: 144;
    stroke-dashoffset: 0;
  }
  .btn-circle-download.done {
    background: #0093ee;
    animation: rubberBand 0.8s;
  }
  .btn-circle-download.done:after {
    transform: translateX(50%);
    transition: transform 0.4s ease;
    transition-delay: 0.7s;
  }
  .btn-circle-download.done #border,
  .btn-circle-download.done #arrow {
    display: none;
  }
  .btn-circle-download.done #check {
    transform: scale(1);
    transition: all 0.2s ease;
    transition-delay: 0.2s;
  }

  @keyframes rubberBand {
    from {
      transform: scale(1, 1, 1);
    }
    30% {
      transform: scale3d(1.15, 0.75, 1);
    }
    40% {
      transform: scale3d(0.75, 1.15, 1);
    }
    50% {
      transform: scale3d(1.1, 0.85, 1);
    }
    65% {
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      transform: scale3d(1.05, 0.95, 1);
    }
    to {
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
