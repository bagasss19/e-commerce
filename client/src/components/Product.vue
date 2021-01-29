<template>
<section id="product">
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <ProductRow v-for="product in product" :key="product.id" :product="product"/>
                </tbody>
            </table>
        </div>
</section>  
</template>


<script>
import ProductRow from "./ProductRow"
export default {
    name : "Products",
    props : ['product'],
    components : {ProductRow}
}
</script>

<style>

</style>