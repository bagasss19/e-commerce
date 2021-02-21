<template>
  <section>
      <form enctype="multipart/form-data" class="col-lg-6 offset-lg-3" @submit.prevent="add">
  <div class="form-group">
    <label for="email">Name:</label>
    <input v-model="name" type="text" class="form-control" placeholder="Enter name">
  </div>
  <div class="form-group">
    <label for="pwd">Image :</label><br>
    <!-- <input v-model="image_url" type="text" class="form-control" placeholder="Enter url"> -->
    <!-- Styled -->
         <b-form-file
      v-model="image_url"
      :state="Boolean(image_url)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ image_url ? image_url.name : '' }}</div>
  </div>
  
  <div class="form-group">
    <label for="pwd">Price:</label>
    <input v-model="price" type="text" class="form-control" placeholder="Enter price">
  </div>
  <div class="form-group">
    <label for="pwd">Stock:</label>
    <input v-model="stock" type="text" class="form-control" placeholder="Enter stock">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form><br>
  <button class="btn btn-primary" @click="back">Back</button>
  </section>
</template>

<script>
export default {
    name : 'Add',
     data() {
        return {
            name : '',
            image_url :null,
            price : '',
            stock : ''
        }
    },
    methods : {
        back () {
            this.$router.push({ name: "Home" });
        },
        add () {
          let payload = {
                name : this.name,
                image_url : this.image_url,
                price : this.price,
                stock : this.stock
            }
            this.$store.dispatch('add', payload)

        }
    }
}
</script>

<style>

</style>