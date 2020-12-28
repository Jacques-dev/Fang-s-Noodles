<template>

  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Mon profil</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <h2>Mes infos</h2>
        Nom : {{ user.nom }}<br>
        Prénom : {{ user.prenom }}<br>
        Email : {{ user.email }}<br>
        Téléphone : {{ user.telephone }}<br>
      </div>
      <div class="col-sm-4">
        <h2>Mes commandes</h2>
      </div>
      <div class="col-sm-4">
        <h2>Mes réservations</h2>
        <section v-for="reserv in reservations" :key="reserv.id">
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
      reservations: { type: Array, default: [] },
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
