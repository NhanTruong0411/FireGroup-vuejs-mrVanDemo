<template>
  <div class="vue-app-login-page">
    <div class="vue-app-login-page-header">Hi, Welcome Back!</div>
    <div class="vue-app-login-page-body">
      <form class="vue-app-login-page-form" novalidate @submit.stop.prevent="onSubmit">
        <div class="vue-app-login-page-form-item">
          <input type="email" v-model="form.email" placeholder="Email" />
          <div class="vue-app-login-page-form-error" v-if="formstate">
            <template v-if="!validation.form.email.required">Email is required !</template>
          </div>
        </div>
        <div class="vue-app-login-page-form-item">
          <input type="password" v-model="form.password" placeholder="Password" />
          <div class="vue-app-login-page-form-error" v-if="formstate">
            <template v-if="!validation.form.password.required">Password is required !</template>
          </div>
        </div>
        <div class="vue-app-login-page-form-item">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    <div class="vue-app-login-page-footer">
      Don't have an account?
      <router-link :to="{ name: 'Register' }">Create a Free Account </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {

    name: "Login",


    data() {
      return {
        form: {
          email: "van100@gmail.com",
          password: "123456",
          timezone: "Asia/Bangkok",
          name: "van",
        },
        formstate: false,
        is_loading: false,
      };
    },


    computed: {
      validation() {
        const email = {
          required: this.form.email ? true : false,
        };
        const password = {
          required: this.form.password ? true : false,
        };
        return {
          form:{
            email,
            password,
          },
          valid : email.required && password.required 
        };
      },
    },


    methods: {
      
      ...mapActions({
        login : 'auth/login'
      }),

      onSubmit() {
        this.formstate = true;
        if( this.is_loading || !this.validation.valid ) return 
        this.is_loading = true 
        this.login(this.form).then((res)=>{
          let { status  } = res 
          if( status ){
            this.$router.push({
              name : 'Dashboard'
            })
          }
          this.is_loading = false
        })
        .catch((err)=>{
          alert("email or password is incorrect !")
          this.is_loading = false 
        })
      },
    },
  };
</script>

<style lang="scss" scoped>
  .vue-app-login-page {
    &-header {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 700;
      font-size: 38px;
      color: #5b86e5;
      margin-bottom: 20px;
    }
    &-body {
    }
    &-form {
      &-item {
        display: block;
        margin-bottom: 20px;
        position: relative;
        input {
          height: 32px;
          display: block;
          padding: 8px 12px;
          background: #fff;
          border: 1px solid #ccc;
          font-size: 14px;
          width: 100%;
          &:focus {
            box-shadow: none;
            outline: none;
            border-color: #5b86e5;
          }
        }
        button {
          display: block;
          width: 100%;
          padding: 8px 12px;
          height: 32px;
          text-align: center;
          color: #fff;
          background: #5b86e5;
          border: 1px solid #5b86e5;
        }
      }
      &-error {
        color: #f2545d;
      }
    }
  }
</style>
