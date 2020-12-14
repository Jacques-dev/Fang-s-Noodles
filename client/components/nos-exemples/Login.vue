<template>
  <div>

    <h2>Je me connecte</h2>

    <form @submit.prevent="login">
      <input type="text" v-model="registering.email" placeholder="email" id="email" required>
      <input type="text" v-model="registering.password" placeholder="password" required>

      <button type="submit">Me connecter</button>
    </form>

    <!-- <button @click="checkIfLogged()">test</button> -->



  </div>
</template>

<script>




  module.exports = {
    props: {
      userId: Number
    },
    data () {
      return {
        registering: {
          email: '',
          password: ''
        }
      }

    },
    methods: {
      login () {
        var email = document.getElementById("email").value;
        if (email.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
          this.$emit('login', this.registering)
        }
      }
    }
  }
</script>

<style scoped>
h2 {
  text-align: center;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

form input {
  /* flex: 1; */
}

</style>
