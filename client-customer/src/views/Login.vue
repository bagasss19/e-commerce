<template>
  <section>
<div class="sidenav">
         <div class="login-main-text">
            <h1>Welcome to TokoBagas!</h1>
            <h5>Login or register from here to access.</h5>
         </div>
      </div>
      <div class="main">
         <div class="col-md-8">
            <div class="login-form">
               <form @submit.prevent="custlogin">
                  <div class="form-group">
                     <label>Email</label>
                     <input v-model="email" type="text" class="form-control" placeholder="Email">
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input v-model="password" type="password" class="form-control" placeholder="Password">
                  </div>
                  <button type="submit" class="btn btn-black">Login</button>
               </form><br>

                <h5>Don't have account? Register <a href="" @click.prevent="register">here</a></h5>
            </div>
         </div>
      </div>
  </section>
</template>

<script>
export default {
    name : "Login",
    data() {
        return {
            email : '',
            password :''
        }
    },
    methods : {
        custlogin () {
            let payload = {
                email : this.email,
                password : this.password
            }
            console.log(payload);
            this.$store.dispatch('custlogin', payload)
        },

        register() {
            this.$router.push({name : 'Register', path : '/register'})
        }
    }
}
</script>

<style>
body {
    background-image: url('https://i.pinimg.com/originals/46/1d/25/461d254f8563f8945ce3a385f289df17.jpg');
    background-size: auto;
    background-repeat: repeat;
}

h1 {
    font-family: 'Roboto', sans-serif;
}

#email, #password {
    font-size: 20px;
}

.button1 {
    padding: 12px 28px;
    font-size: 15px;
}

.button1:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>