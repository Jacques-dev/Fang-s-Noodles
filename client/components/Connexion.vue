<template>
  <div id="bouton_connexion_register">

      <div class="login-popup">
        <div class="form-popup" id="popupForm_login">
          <form class="form-container"  @submit.prevent="login">
            <h2>Veuillez vous connecter</h2>
            <label for="email">
              <p class="titre_formulaire">E-mail</p>
            </label>
              <input type="text" v-model="login.email" id="email" placeholder="Votre Email" name="email" required>
            <label for="psw">
              <p class="titre_formulaire">Mot de passe</p>
            </label>
              <input type="password" v-model="login.password" id="psw" placeholder="Votre mot de passe" name="psw" required>
            <button type="submit" class="btn">Connexion</button>
            <!-- <button type="button" class="btn cancel" onclick="closeForm_login()">Fermer</button> -->
            <button type="button" class="btn other" v-on:click="openForm_register()">Pas encore de compte ?</button>
          </form>
        </div>
      </div>

      <div class="register-popup">
        <div class="form-popup" id="popupForm_register">
          <form class="form-container" @submit.prevent="register">
            <h2>Inscription</h2>
            <label for="nom">
            <p class="titre_formulaire">Nom</p>
            </label>
              <input type="text" v-model="registering.nom" id="nom" placeholder="Entrez votre nom" name="nom" required>

            <label for="prenom">
            <p class="titre_formulaire">Prenom</p>
            </label>
              <input type="text" v-model="registering.prenom" id="prenom" placeholder="Entrez votre Prenom" name="prenom" required>

            <label for="telephone">
            <p class="titre_formulaire">Telephone</p>
            </label>
              <input type="text" v-model="registering.telephone" id="telephone" placeholder="Entrez votre numéro de Telephone" name="telephone" required>

            <label for="email">
            <p class="titre_formulaire">E-mail</p>
            </label>
              <input type="text" v-model="registering.email" id="email" placeholder="Entrez votre Email" name="email" required>

            <label for="psw">
            <p class="titre_formulaire">Mot de passe</p>
            </label>
              <input type="text" v-model="registering.password" id="psw" placeholder="Entrez votre mot de passe" name="psw" required>
            <button type="submit" class="btn" v-on:click="openForm_login()">Je m'inscris</button>
            <!-- <button type="button" class="btn cancel" onclick="closeForm_register()">Fermer</button> -->
          </form>
        </div>
      </div>
    </div>

</template>

<script>
module.exports = {
  data () {
      return {
        registering:{
          email:'',
          password:'',
          Nom:'',
          prenom:'',
          telephone:''
        },
        login:{
          email:'',
          password:''
        }
      }
  },
  methods: {

    openForm_login() {
      document.getElementById("popupForm_login").style.display="flex";
      document.getElementById("popupForm_register").style.display="none";
    },
    openForm_register() {
      document.getElementById("popupForm_register").style.display="flex";
      document.getElementById("popupForm_login").style.display="none";
    },


    register(){
      var email = document.getElementById("email").value;
      if (email.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
        this.$emit('register', this.registering);
      }

    },
    login(){
      var email = document.getElementById("email").value;
      if (email.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
        this.$emit('login', this.login);
      }
    }


  }
}

//
// function closeForm_login() {
//   document.getElementById("popupForm_login").style.display="none";
// }
// function closeForm_register() {
//   document.getElementById("popupForm_register").style.display="none";
// }
</script>

<style>

      #popupForm_register{
        display: none;
      }

      #psw, #email{
        /* box-sizing: border-box; */
      }
      /* Stylez et fixez le bouton sur la page */
      .open-button {
        background-color: #891B17;
        color: white;
        border: none;
        cursor: pointer;
      }
      /* Positionnez la forme Popup */
      .login-popup, .register-popup{
        position: relative;
        text-align: center;
        width: 100%;
      }

      .login-popup .other {
        background-color: blue !important;
      }

      /* Masquez la forme Popup */
      .form-popup {
        /* display: no  ne; */
        display: flex;
        justify-content: center;
        /* position: relative; */

        /* top:5%; */
        /* z-index: 9; */
      }
      /* Styles pour le conteneur de la forme */
      .form-container {
        border: solid black 2px;
        max-width: 500px;
        padding: 20px;
        background-color: #fff;
      }
      /* Largeur complète pour les champs de saisie */
      .form-container input[type=text], .form-container input[type=password] {
        width: 100%;
        padding: 10px;
        margin: 5px 0 22px 0;
        border: none;
        background: #eee;
      }

      /* Stylez le bouton de connexion */
      .form-container .btn {
        background-color: #8ebf42;
        color: #fff;
        padding: 12px 20px;
        border: none;
        cursor: pointer;
        width: 100%;
        margin-bottom:10px;
        opacity: 0.8;
      }
      /* Stylez le bouton pour annuler */
      /* .form-container .cancel {
        background-color: #A52420;
      } */
      /* Planez les effets pour les boutons */
      .form-container .btn:hover, .open-button:hover {
        opacity: 1;
        color:#fff;
      }

</style>
