<template>
  <section id ="nav">
    <CartSmall/>
    <Product/>
  </section>
</template>

<script>
// @ is an alias to /src
import Product from '../components/Product'
import CartSmall from '../components/CartSmall'

export default {
  name: 'Home',
  components: {
    Product, CartSmall
  }
}
</script>
