<template>
  <section>
    <div class="login-popup-wrap new_login_popup">
      <div class="login-popup-heading text-center"></div>
      <form
        id="loginMember"
        role="form"
        @submit.prevent="login"
        style="margin: 225px auto"
      >
        <h4>Login</h4>
        <div class="form-group">
          <input
            v-model="email"
            type="text"
            class="form-control"
            id="user_id"
            placeholder="Email"
            name="user_id"
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <b-button
          type="submit"
          variant="dark"
          name="submit"
          value="1"
        >
          Login
        </b-button>
      </form>
    </div>

    <!-- <div id="login">
        <h1 class="text-center text-blue pt-5">Welcome Admin, Please login!</h1>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" @submit.prevent="login">
                            <h3 class="text-center text-info">Login</h3>
                            <div class="form-group">
                                <label for="email" class="text-info">Email:</label><br>
                                <input v-model="email" type="text" name="email" id="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br>
                                <input v-model="password" type="password" name="password" id="password" class="form-control">
                            </div>
                            <button class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
  </section>
</template>

<script>
import axios from "../../config/axios";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('login', payload)
    },
  },
};
</script>
