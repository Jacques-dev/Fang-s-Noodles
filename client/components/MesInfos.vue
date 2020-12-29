<template>
<div id="background_infos">

  <div class="container">
    <div class="row">
      <div id="titre_page_info" class="col-sm-12">
        <h1>Mon profil</h1>
      </div>
    </div>
    <div class="row">
      <div id="mes_infos" class="d-flex col-sm-8">
        <form @submit.prevent="editProfil">
          <div class="row">
            <h2>Mes infos</h2>
          </div>

          <div class="row">
            <label for="nom">{{ user.nom }}</label>
            <input name="nom" type="text" v-model="editingProfile.nom">
          </div>

          <div class="row">
            <label for="prenom">{{ user.prenom }}</label>
            <input name="prenom" type="text" v-model="editingProfile.prenom">
          </div>

          <div class="row">
            <label for="email">{{ user.email }}</label>
            <input name="email" type="text" v-model="editingProfile.email">
          </div>
          <div class="row">
            <label for="telephone">{{ user.telephone }}</label>
            <input name="telephone" type="text" v-model="editingProfile.telephone">
          </div>
          <button type="submit">Modifier</button>
        </form>

      </div>
      <div id="mes_reservations" class="col-sm-4">
        <h2>Mes réservations</h2>
        <section v-for="reserv in user.reservations">
          Date : {{ reserv.date }}<br>
          Heure : {{ reserv.heure }}<br>
          Nombre de personnes : {{ reserv.personnes }}<br>
        </section>
      </div>
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
        editingProfile:{
          id: -1,
          nom:'',
          prenom:'',
          email:'',
          telephone:''
        }
      }
    },
    methods: {
      editProfil (profile){
        this.editingProfile.nom = profile.nom
        this.editingProfile.prenom = profile.prenom
        this.editingProfile.email = profile.email
        this.editingProfile.telephone = profile.telephone
      },
      sendEditProfil(){
        this.$emit('update-profile', this.editingProfile)
        this.abortEditProfil()
      },
      abortEditeProfil(){
        this.editingProfile={
          id: -1,
          nom:'',
          prenom:'',
          email:'',
          telephone:''
        }
      }
    }
  }
</script>

<style scoped>
  .container{
    background-color: rgba(240,221,196,1);
    height: 100%;
  }
  #background_infos{
    background-color: rgba(137,27,23,0.95);
    height: 100%;
  }
  #titre_page_info{
    text-align: center;
    padding: 20px;
  }
  #mes_infos, #mes_reservations{
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center;
    align-items: center; */
    padding-bottom: 50px;
  }
</style>
