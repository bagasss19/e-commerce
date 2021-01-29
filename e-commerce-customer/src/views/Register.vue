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
            <div class="register-form">
               <form @submit.prevent="custregister">
                  <div class="form-group">
                     <label>Email</label>
                     <input v-model="email" type="text" class="form-control" placeholder="Email">
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input v-model="password" type="password" class="form-control" placeholder="Password">
                  </div>
                  <button type="submit" class="btn btn-black">Register</button>
               </form><br>

                <h5>Already have account? Login <a href="" @click.prevent="login">here</a></h5>
            </div>
         </div>
      </div>
  </section>
</template>

<script>
export default {
    name : "Register",
    data() {
        return {
            email : '',
            password :''
        }
    },
    methods : {
        custregister () {
            let payload = {
                email : this.email,
                password : this.password
            }
            console.log(payload);
            this.$store.dispatch('custregister', payload)
        },
        login() {
            this.$router.push({name : 'Login', path : '/login'})
        }
    }
}
</script>

<style>
body {
    background-image: url('https://i.pinimg.com/originals/46/1d/25/461d254f8563f8945ce3a385f289df17.jpg');
    background-size: cover;
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

.main-head{
    height: 150px;
    background: #FFF;
   
}

.sidenav {
    height: 100%;
    background-color: #000;
    overflow-x: hidden;
    padding-top: 20px;
}


.main {
    padding: 0px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

    .register-form{
        margin-top: 10%;
    }
}

@media screen and (min-width: 768px){
    .main{
        margin-left: 40%; 
    }

    .sidenav{
        width: 40%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }

    .login-form{
        margin-top: 50%;
    }

    .register-form{
        margin-top: 50%;
    }
}


.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: #000 !important;
    color: #fff;
}
</style>