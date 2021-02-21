<template>
  <section id="app">
    <b-button variant="primary" @click="addForm" style="margin-top:50px;margin-bottom:50px">Add Product</b-button>
    <div class="divider" />
    <Product :product="products.data" />
  </section>
</template>

<script>
// @ is an alias to /src
import Product from "@/components/Product.vue";

export default {
  name: "Home",
  components: {
    Product
  },
  methods: {
    addForm() {
      this.$router.push({ name: "Add" });
    },
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
