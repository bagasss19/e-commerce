<template>
  <section>
      <div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-10 col-md-offset-1">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th class="text-center">Price</th>
                        <th class="text-center">Total</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cart in carts" :key="cart.id">
                        <template>
                        <td class="col-sm-8 col-md-6" >
                        <div class="media" >
                            <img class="media-object" :src="cart.Product.image_url" style="width: 72px; height: 72px;">
                            <div class="media-body">
                                <h2 class="media-heading">{{cart.Product.name}}</h2>
                                <span>Status: </span><span class="text-warning"><strong>Unpaid</strong></span>
                            </div>
                        </div></td>
                        <td class="col-sm-1 col-md-1 product-count" style="text-align: center">
                               <form action="#" class="count-inlineflex">
										    <div class="qtyminus pointer" v-on:click="decrease(cart.id ,cart.quantity)">-</div>
										    <input v-model="cart.quantity" disabled type="number" name="quantity" class="qty">
										    <div class="qtyplus pointer" v-on:click="increase(cart.id, cart.quantity, cart.Product.stock)">+</div>
								</form>
                        </td>
                        <!-- <td class="col-sm-1 col-md-1 text-center">{{cart.quantity}}</td> -->
                        <td class="col-sm-1 col-md-1 text-center"><strong>{{thousandSeparator(cart.Product.price)}}</strong></td>
                        <td class="col-sm-1 col-md-1 text-center"><strong>{{total(cart.quantity, cart.Product.price)}}</strong></td>
                        <td class="col-sm-1 col-md-1">
                        <button type="button" class="btn btn-danger" @click="remove(cart.id)">
                            <span class="glyphicon glyphicon-remove"></span> Remove
                        </button></td></template>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h5>Subtotal (Rp)</h5></td>
                        <td class="text-right"><h5><strong>{{totalAll()}}</strong></h5></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h5>Free Delivery (Rp)</h5></td>
                        <td class="text-right"><h5><strong>0</strong></h5></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h3>Total (Rp)</h3></td>
                        <td class="text-right"><h3><strong>{{totalAll()}}</strong></h3></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                        <button type="button" class="btn btn-default" @click="home">
                            <span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                        </button></td>
                        <td>
                        <button type="button" class="btn btn-success" @click="checkout">
                            Checkout <span class="glyphicon glyphicon-play"></span>
                        </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
  </section>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    name : 'Cart',
    methods : {
        home () {
            this.$router.push({name : 'Home', path : '/'})
        },
        // whenever question changes, this function will run
        thousandSeparator(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        total(num1,num2) {
            let output =  num1 * num2
            return this.thousandSeparator(output)
        },

        addCart(id) {
            this.$store.dispatch('addCart', id)
        },

        checkout(id) {
            this.$store.dispatch('checkout')
        },

        remove(id) {
            this.$store.dispatch('deleteCart', id)
        },

        increase(id, qty, stock) {
            console.log(qty,stock, '<<<<<increase');
             if (Number(qty) >= stock) {Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Maximum Stock Reached'
                })}
             else this.$store.dispatch('increase', id)
        },

        decrease(id,num) {
            //  v-if="cart.quantity > 0"
            this.$store.dispatch('decrease', id)
            if (Number(num) <= 1) this.$store.dispatch('deleteCart', id)
                  console.log(num,'>>>>num decrease');
        },

        totalAll() {
            let data = this.$store.state.carts
            let total = []
            data.forEach(x => total.push(x.Product.price * x.quantity))
            let output =  total.reduce((a, b) => a + b, 0)
            return this.thousandSeparator(output)
        }
      },

    computed: { 
        carts () {
             return this.$store.state.carts
         },

        products () {
             return this.$store.state.products
         }
   },
  beforeCreate () {
          this.$store.dispatch('readCart')
  }
}
</script>

<style>
.product-count .qtyminus,
.product-count .qtyplus {
	width: 34px;
    height: 34px;
    background: transparent;
    text-align: center;
    font-size: 19px;
    line-height: 34px;
    color: #000;
    cursor: pointer;
    font-weight: 600;
}
.product-count .qtyminus {
    line-height: 32px;
}
.product-count .qtyminus {
	border-radius: 3px 0 0 3px; 
}
.product-count .qtyplus {
	border-radius: 0 3px 3px 0; 
}
.product-count .qty {
	width: 60px;
	text-align: center;
	border: none;
}
.count-inlineflex {
	display: inline-flex;
	border: solid 2px #ccc;
	border-radius: 20px;  
}
</style>