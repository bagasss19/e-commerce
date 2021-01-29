<template>
  <tr>
    <td>
      <img :src="product.image_url" alt="poster" style="width: 200px" />
    </td>
    <td>{{ product.name }}</td>
    <td>{{ product.stock }}</td>
    <td>Rp. {{ thousandSeparator(product.price) }}</td>
    <td>
      <button class="btn btn-primary button" @click="editForm(product.id)">
        Edit
      </button>
      <button class="btn btn-primary" @click="remove(product.id)">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ProductRow",
  props: ["product"],
  methods: {
    editForm(id) {
      this.$router.push({ name: "Edit", params: { id: id } });
    },
    remove(id) {
      this.$store.dispatch("remove", id);
    },
    thousandSeparator(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style>
</style>