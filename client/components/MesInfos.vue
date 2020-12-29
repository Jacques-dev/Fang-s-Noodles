<template>
  <div id="background_infos">

    <div class="container">
      <div class="row">
        <div id="titre_page_info" class="col-sm-12">
          <h1>Mon profil</h1>
        </div>
      </div>
      <div class="row">
        <div  id="mes_infos" class="container-fluid">
          <div class=" col-sm-12">

            <div class="row titre_section">
              <p>Mes infos</p>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <form @submit.prevent="sendEditProfil">
                  <div class="row">
                    <div class="col-sm-7">
                      <label for="nom">Nom : {{ user.nom }}</label>
                    </div>
                    <div class="col-sm-5">
                        <input name="nom" placeholder="nom" type="text" v-model="editingProfile.nom">
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-7">
                      <label for="prenom">Prenom : {{ user.prenom }}</label>
                    </div>
                    <div class="col-sm-5">
                      <input name="prenom" placeholder="prenom" type="text" v-model="editingProfile.prenom">
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-7">
                        <label for="email">Email : {{ user.email }}</label>

                    </div>
                    <div class="col-sm-5">
                      <input name="email" placeholder="email" type="text" v-model="editingProfile.email">
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-7">
                      <label for="telephone">Telephone : {{ user.telephone }}</label>
                    </div>
                    <div class="col-sm-5">
                      <input name="telephone" placeholder="telephone" type="text" v-model="editingProfile.telephone">
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12">
                      <button type="submit">Modifier</button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <div id="mes_reservations" class="container-fluid">
          <section class="row titre_section">
             Mes réservations
          </section>
          <section class="row chaque_reservation" v-for="reserv in user.reservations">
            <section class="col-sm-12 data_reservation">
              Date : {{ reserv.date }}
            </section>
            <section class="col-sm-12 data_reservation">
              Heure : {{ reserv.heure }}
            </section>
            <section class="col-sm-12 data_reservation">
              Nombre de personnes : {{ reserv.personnes }}
            </section>
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
        editingProfile: {
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
  .chaque_reservation{
    box-shadow: 3px 3px 3px 3px rgba(137,27,23,0.95);
    margin: 12px 0 12px 0;
    padding: 10px 0 10px 0;
  }

  .data_reservation{
    margin: 0 0 10px 0;
  }

  .titre_section{
    font-size: 1.7em;
    display:flex;
    justify-content: center;
    padding: 20px;
  }

  .container{
    height: 100%;
  }

  #background_infos{
    background-color: rgba(137,27,23,0.95);
    overflow-y: scroll;
    height: auto;
  }

  #titre_page_info{
    background-color: rgba(240,221,196,1);
    text-align: center;
    padding: 20px;
  }

  #mes_infos, #mes_reservations{
    background-color: rgba(240,221,196,1);
  }

  #mes_infos{
        margin-bottom: 2%;
        border-bottom: black 1px solid;
  }
  #mes_reservations{
      padding-bottom: 15px;
  }

</style>
