<template>
  <div id="bouton_connexion_register">

    <div class="login-popup">
      <div class="form-popup" id="popupForm_login">
        <form class="form-container" @submit.prevent="login">
          <h2>Veuillez vous connecter</h2>
          <label for="email">
            <p class="titre_formulaire">E-mail</p>
          </label>
          <input type="text" v-model="editLogin.email" id="email" placeholder="Votre Email" name="email" required>
          <label for="psw">
            <p class="titre_formulaire">Mot de passe</p>
          </label>
          <input type="password" v-model="editLogin.password" placeholder="Votre mot de passe" name="psw" required>
          <button type="submit" class="btn">Connexion</button>
          <button type="button" class="btn other" @click="openForm_register()">Pas encore de compte ?</button>
        </form>
      </div>
    </div>

    <div class="register-popup">
      <div class="form-popup" id="popupForm_register">
        <form class="form-container" @submit.prevent="register">
          <h2>Inscription</h2>
          <label for="email">
            <p class="titre_formulaire">E-mail</p>
          </label>
          <input type="text" v-model="editRegister.email" id="email_register" placeholder="Entrez votre Email" name="email" required>

          <label for="psw">
            <p class="titre_formulaire">Mot de passe</p>
          </label>
          <input type="text" v-model="editRegister.password" placeholder="Entrez votre mot de passe" name="psw" required>

          <label for="nom">
            <p class="titre_formulaire">Nom</p>
          </label>
          <input type="text" v-model="editRegister.nom" placeholder="Entrez votre nom" name="nom" required>

          <label for="prenom">
            <p class="titre_formulaire">Prenom</p>
          </label>
          <input type="text" v-model="editRegister.prenom" placeholder="Entrez votre Prenom" name="prenom" required>

          <label for="telephone">
            <p class="titre_formulaire">Telephone</p>
          </label>
          <input type="text" v-model="editRegister.telephone" placeholder="Entrez votre numéro de Telephone" name="telephone" required>

          <button class="btn" @click="openForm_login()">Je m'inscris</button>

        </form>
      </div>
    </div>
  </div>

</template>

<script>
  module.exports = {
    data () {
      return {
        editRegister:{
          email:'',
          password:'',
          nom:'',
          prenom:'',
          telephone:''
        },
        editLogin:{
          email:'',
          password:''
        }
      }
    },
    methods: {
      openForm_login () {
        document.getElementById("popupForm_login").style.display="flex";
        document.getElementById("popupForm_register").style.display="none";
      },
      openForm_register () {
        document.getElementById("popupForm_register").style.display="flex";
        document.getElementById("popupForm_login").style.display="none";
      },

      register () {
        var email = document.getElementById("email_register").value;
        if (email.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)) {
          this.$emit('register', this.editRegister);
        }
      },
      login () {
        var email = document.getElementById("email").value;
        if (email.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i) ) {
          this.$emit('login', this.editLogin);
        } else if (email.match(/(admin-)+[a-z]+(-)+[a-z]+(-efrei_2023)/gm)) {// admin-jacques-tellier-efrei_2023
          this.$emit('admin-login', this.editLogin);
        }
      }

    }
  }

</script>

<style>

  #popupForm_register{
    display: none;
  }

  #bouton_connexion_register{
    background-color: #F0DDC4;
    height: 100%;
  }

  .open-button {
    background-color: #891B17;
    color: white;
    border: none;
    cursor: pointer;
  }

  .login-popup, .register-popup{
    position: relative;
    text-align: center;
    width: 100%;
  }

  .login-popup .other {
    background-color: blue !important;
  }

  .form-popup {
    display: flex;
    justify-content: center;
    padding-top:3%;
  }

  .form-container {
    border: solid black 2px;
    max-width: 500px;
    padding: 20px;
    background-color: #fff;
  }

  .form-container input[type=text], .form-container input[type=password] {
    width: 100%;
    padding: 10px;
    margin: 5px 0 22px 0;
    border: none;
    background: #eee;
  }

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

  .form-container .btn:hover, .open-button:hover {
    opacity: 1;
    color:#fff;
  }

</style>
