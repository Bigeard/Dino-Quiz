<template>
  <div class="signup">
    <div class="content">
      <gb-heading tag="h1" class="logo">Sign up</gb-heading>
      <div class="form_signup">
        <div class="username">
          <gb-input
            v-model="username"
            label="Username"
            placeholder="Username is required"
            :error="errorUsername"
            :status="statusUsername"
            @submit="checkAuth"
            required
          />
        </div>
        <!-- <div class="email">
          <gb-input
            v-model="email"
            label="Email"
            placeholder="Email is required"
            :error="errorEmail"
            :status="statusEmail"
            @submit="checkAuth"
            required
          />
        </div> -->
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
            required
          />
        </div>
      </div>
      <gb-divider class="divider-custom" />
      <div class="choice_button">
        <gb-button @click="$router.push('/')" color="black">
          Return
        </gb-button>
        <gb-button
          @click="checkAuth()"
          right-icon="arrow_forward"
          :disabled="
            !(statusPassword === 'normal' && statusUsername === 'normal')
          "
          uppercase
        >
          Sign up
        </gb-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  beforeMount() {},
  data() {
    return {
      waitAuth: true,
      username: null,
      // email: null,
      password: null,
      errorUsername: null,
      // errorEmail: null,
      errorPassword: null,
      statusUsername: "warning",
      // statusEmail: "warning",
      statusPassword: "warning"
    };
  },
  watch: {
    username(v) {
      this.onChangeUsername(v);
    },
    // email(v) {
    //   this.onChangeEmail(v);
    // },
    password(v) {
      this.onChangePassword(v);
    }
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
        this.statusEmail === "normal" &&
        this.statusPassword === "normal" &&
        this.statusUsername === "normal"
      ) {
        this.waitAuth = false;
        this.status = "normal";
      } else {
        this.waitAuth = true;
        this.status = "error";
      }
    },
    // onChangeEmail(v) {
    //   if (v.length === 0) {
    //     this.statusEmail = "warning";
    //     this.errorEmail = null;
    //   } else if (
    //     !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    //       v
    //     )
    //   ) {
    //     this.errorEmail = "You can only use email format";
    //     this.statusEmail = "error";
    //   } else {
    //     this.errorEmail = null;
    //     this.statusEmail = "normal";
    //   }

    //   if (
    //     this.statusEmail === "normal" &&
    //     this.statusPassword === "normal" &&
    //     this.statusUsername === "normal"
    //   ) {
    //     this.waitAuth = false;
    //     this.status = "normal";
    //   } else {
    //     this.waitAuth = true;
    //     this.status = "error";
    //   }
    // },
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
        this.statusEmail === "normal" &&
        this.statusPassword === "normal" &&
        this.statusUsername === "normal"
      ) {
        this.waitAuth = false;
        this.status = "normal";
      } else {
        this.waitAuth = true;
        this.status = "error";
      }
    },
    async checkAuth() {
      if (
        // this.statusEmail === "normal" &&
        this.statusPassword === "normal" &&
        this.statusUsername === "normal"
      ) {
        axios
          .post(`/api/v1/user/signup`, {
            username: this.username,
            // email: this.email,
            password: this.password
          })
          .then(response => {
            sessionStorage.setItem("token", response.data);
            this.$router.push("/");
          })
          .catch(e => {
            console.error("There was an error !", e);
          });
      }
    }
  }
};
</script>

<style lang="scss">
.signup {
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

  .form_signup {
    width: 100%;

    .username {
      margin-top: 40px;
    }

    // .email {
    //   margin-top: 20px;
    // }

    // .password {
    // }
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
