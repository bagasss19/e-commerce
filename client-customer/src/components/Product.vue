<template>
  <div class="container">
    <div class="row">
      <div
        class="col-md-3 col-sm-6"
        v-for="product in products"
        :key="product.id"
      >
        <div class="product-grid">
          <div class="product-image">
            <a href="#">
              <img
                class="pic-1"
                :src="product.image_url"
                style="width: 300px; height: 200px"
              />
            </a>
          </div>
          <div class="product-content">
            <h3 class="title">
              <a href="#">{{ product.name }}</a>
            </h3>
            <div class="price">Rp. {{ thousandSeparator(product.price) }}</div>

            <div class="stock">Stock : {{ product.stock }}</div>

            <a
              class="add-to-cart pointer"
              @click="addCart(product.id, product.stock)"
              v-if="product.stock >= 1"
              >+ Add To Cart</a
            ><br />
            <a class="add-to-cart" v-if="product.stock <= 0">SOLD OUT</a><br />
            <a class="add-to-cart pointer" @click="addWishlist(product.id)"
              >+ Add To Wishlist</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",

  beforeCreate() {
    this.$store.dispatch("read");
    // this.$store.dispatch("readCart");
  },

  computed: {
    products() {
      return this.$store.state.products;
    },
    carts() {
      return this.$store.state.carts;
    },
  },
  methods: {
    // whenever question changes, this function will run
    thousandSeparator(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    addCart(id, stock) {
      this.$store.dispatch("addCart", id);
    },
    addWishlist(id) {
      this.$store.dispatch("addWishlist", id);
    },
  },
};
</script>