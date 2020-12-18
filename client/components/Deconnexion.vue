<template>
  <div v-if="checkIfLogged(admin.id, user.id)"></div>
</template>

<script>
  module.exports = {
    components: {

    },
    props: {
      admin:{type: Object },
      user: {type: Object }
    },
    data () {
      return {

      }
    },
    methods: {
      checkIfLogged(admin, user) {
        if (admin != '' || user  != '') {
          this.$emit('logout');
        }
      }
    }
  }
</script>

<style scoped>
</style>
