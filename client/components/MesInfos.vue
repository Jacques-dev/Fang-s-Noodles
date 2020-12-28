<template>

  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Mon profil</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <h2>Mes infos</h2>
        Nom : {{ user.nom }}<br>
        Prénom : {{ user.prenom }}<br>
        Email : {{ user.email }}<br>
        Téléphone : {{ user.telephone }}<br>
      </div>
      <div class="col-sm-6">
        <h2>Mes réservations</h2>
        <section v-for="reserv in user.reservations">
          Date : {{ reserv.date }}<br>
          Heure : {{ reserv.heure }}<br>
          Nombre de personnes : {{ reserv.personnes }}<br>
        </section>
      </div>
    </div>
  </div>

</template>

<script>
  module.exports = {
    props: {
      user: {type: Object },
    },
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
