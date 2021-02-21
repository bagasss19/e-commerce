<template>
  <section id="nav">
    <Navbar />
    <!-- <Carousel/> -->
    <Product />

  <!-- Using value -->
  <b-button v-b-modal="'my-modal'">Show Modal</b-button>

  <!-- The modal -->
  <b-modal id="my-modal">Hello From My Modal!</b-modal>
  </section>
</template>

<script>
// @ is an alias to /src
import Product from "../components/Product";
import Navbar from "../components/Navbar";

export default {
  name: "Home",
  components: {
    Product,
    Navbar
  },
};
</script>

<style lang="scss">
.btn {
  padding: 8px 16px;
  border-radius: 5px;
  &--primary {
    background-color: green;
    color: #fff;
  }
  &--secondary {
    background-color: #dddd;
    color: #000;
  }
}

// utilities
.overflow-hidden {
  overflow: hidden;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.justify-content-between {
  justify-content: space-between;
}
// reset
button {
  background: none;
  border: none;
  outline: inherit;
  cursor: pointer;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
</style>
