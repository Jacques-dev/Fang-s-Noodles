<template>
  <div>

    <h2>Je m'enregistre</h2>

    <form @submit.prevent="register">
      <input type="text" v-model="registering.email" placeholder="email" required>
      <input type="text" v-model="registering.password" placeholder="password" required>

      <button type="submit">S'enregistrer</button>
    </form>

  </div>
</template>

<script>
  module.exports = {
    props: {

    },
    data () {
      return {
        registering: {
          email: '',
          password: ''
        }
      }
    },
    async mounted () {
    },
    methods: {
      register () {
        this.$emit('register', this.registering)
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
