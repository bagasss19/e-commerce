<template>
  <section v-if="token">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <button @click="logout" class="btn btn-danger">Logout</button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </section>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
};
</script>

<style>
.divider {
  width: 5px;
  height: auto;
  display: inline-block;
}
</style>