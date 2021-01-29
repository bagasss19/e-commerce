<template>
  <section id="app">
    <Navbar/>
    <Product :product="products.data" />
  </section>
</template>

<script>
// @ is an alias to /src
import Product from "@/components/Product.vue";
import Navbar from "../components/Navbar";

export default {
  name: "Home",
  components: {
    Product,
    Navbar,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch("read");
  },
};
</script>
