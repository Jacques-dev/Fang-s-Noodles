<template>
  <section id="background">
    <section id="balise_bouton_admin">
      <!-- <div> -->
        <button id="bouton_ajouter_menus"v-if="admin.id" @click="showForm = true">Afficher le formulaire</button>
        <button id="bouton_fermer_menus"v-if="admin.id && showForm" @click="showForm = false">Fermer le formulaire</button>
      <!-- </div> -->
        <add-menu v-if="showForm" @add-menu="addMenu"></add-menu>

    </section>

    <section id="colonne_principale" class="container">

        <article class="row d-flex justify-content-center">
          <p id="titre_page">Decouvrez nos variétés de plats<p>
        </article>

        <article class="row">
          <article class="col-sm-12">

              <article v-for="menuType in menus">

                <div id="soups" class="type_plat row">
                  <router-link to='/menus/#soups'>soups</router-link>
                  <router-link to='/menus/#dumplings'>dumplings</router-link>
                  <router-link to='/menus/#noodles'>noodles</router-link>
                  <router-link to='/menus/#sashimi'>sashimi</router-link>
                  <router-link to='/menus/#nigiri'>nigiri</router-link>
                </div>

                <article class ="ligne_plat row" v-for="menu in menuType" :key="menu.id" :id="nav(menu.type)">

                  <div class="row">
                    <div class="menu-img col-sm-3">
                      <img v-bind:src="menu.image">
                    </div>
                    <div class=" col-sm-9 menu-description">
                      <p>{{ menu.description }}</p>
                    </div>
                  </div>

                  <div class="nom_prix_spicy_plat row" v-if="editingMenu.id !== menu.id">
                    <div class="menu-title row">
                      <p>{{ menu.name }} - {{ menu.price }}€</p>
                    </div>
                    <div class="row" v-if="isSpicy(menu.spicy)">
                      <p class="spicy">Spicy</p>
                    </div>
                    <div class="bouton-menus row">
                      <button class="col-sm-6" v-if="admin.id" @click="deleteMenu(menu.id, menu.type)">Supprimer</button>
                      <button class="col-sm-6" v-if="admin.id" @click="editMenu(menu, menu.type)">Modifier</button>
                    </div>
                  </div>

                  <div class="container" v-else>

                    <div class="row">
                      <div class="col-sm-6">
                        <input type="text" v-model="editingMenu.name">
                      </div>
                      <div class="col-sm-6">
                        <input class="col-sm-4" type="number" v-model="editingMenu.price">
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-6">
                        <p class="menu-description"><textarea v-model="editingMenu.description"></textarea></p>
                      </div>
                      <div class="col-sm-6">
                        <input class="col-sm-6" type="text" v-model="editingMenu.image" placeholder="Lien vers l'image">
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-6">
                        <button @click="sendEditMenu()">Valider</button>
                      </div>
                      <div class="col-sm-6">
                        <button @click="abortEditMenu()">Annuler</button>
                      </div>
                    </div>

                  </div>

                </article>
              </article>

          </article>
        </article>

    </section>

  </section>
</template>

<script>
  const AddMenu = window.httpVueLoader('./components/AddMenu.vue');
  module.exports = {
    components: {
      AddMenu,
    },
    props: {
      menus: { type: Array, default: [] },
      admin:{type: Object },
      user: {type: Object }
    },
    data () {
      return {
        editingMenu: {
          id: -1,
          name: '',
          description: '',
          image: '',
          price: 0,
          spicy: false,
          type: ''
        },
        type: 'soups',
        showForm: false
      }
    },
    methods: {
      nav(menuType) {
        return menuType
      },
      isSpicy(boolean) {
        return boolean
      },
      addMenu (menu) {
        this.$emit('add-menu', menu)
      },
      deleteMenu (menuId, menuType) {

        let content = {
          id: menuId,
          type: menuType
        }
        this.$emit('delete-menu', content)
      },
      editMenu (menu, menuType) {
        this.editingMenu.id = menu.id
        this.editingMenu.name = menu.name
        this.editingMenu.description = menu.description
        this.editingMenu.image = menu.image
        this.editingMenu.price = menu.price
        this.editingMenu.spicy = menu.spicy
        this.editingMenu.type = menuType
      },
      sendEditMenu () {
        this.$emit('update-menu', this.editingMenu)
        this.abortEditMenu()
      },
      abortEditMenu () {
        this.editingMenu = {
          id: -1,
          name: '',
          description: '',
          image: '',
          price: 0,
          spicy: false,
          type: ''
        }
      }
    }
  }
</script>

<style scoped>

  #titre_page{
    font-size: 2.6em;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 3%;
  }

  #background{
    color:#fff;
    height: auto;
    background-size: contain;
    background-repeat: repeat;
    background-image: url("../images/backgrounds/epices.jpg");
  }

  .type_plat .current{
    color:#FFA213;
    text-decoration: underline;
    letter-spacing: 2px;
    padding-bottom: 15px;
  }

  .menu-img img {
    width: 100px;
    height: 100px;
  }
  #colonne_principale{

      background-color:rgba(30,61,89,0.7);
      padding: 2%;

    width: 100%;
  }
  .spicy{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    min-width: 100px;
    color: #fff;
    background-color: #A52421;
  }
  .type_plat{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    font-weight: bold;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-top: 2%;
    margin-bottom: 5%;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;

  }
      .type_plat a{
        margin-left: 2%;
        margin-right: 2%;
        color:#fff;
      }
      .type_plat a:hover{
        letter-spacing: 2px;
        /* padding-bottom: 14px; */
      }
      .type_plat p{
        margin-left: 2%;
        margin-right: 2%;
        margin-bottom: 1rem;
      }

  .ligne_plat{
    /* border-top: 2px solid #fff; */
    border-bottom: 2px solid #fff;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 5%;
  }
  .menu-img, .nom_prix_spicy_plat{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 1%;
    margin-bottom: 1%;

    /* border: 2px solid red; */
  }

  .bouton-menus button:hover{
    font-weight: bold;
    letter-spacing: 2px;
  }
  .menu-title, .spicy, .menu-description, .bouton-menus {
    padding:10px;
  }
  .menu-description{
    background-color: #f5f0e1;
    color: rgb(137,27,23);
    margin-top: 10px;
  }

  .menu-title{
    font-size: 1.5em;
  }
  #colonne_principale button{
    padding:  1%;
    border-radius: 20px 20px;
  }
  #colonne_principale button:hover{
    background-color: #a52421;
    color: #fff;
  }

  #balise_bouton_admin{
    position: fixed;
    z-index: 2;
  }
  @media only screen and (max-device-width: 1100px) {
    #balise_bouton_admin {
      width: 100% !important;
      /* position: relative; */
      /* margin: 0;
      padding: 0; */
    }
    #bouton_ajouter_menus, #bouton_fermer_menus{
      width: 100vw !important;
      /* position: relative; */
      /* margin: 0; */
    }
  }

  #bouton_ajouter_menus, #bouton_fermer_menus {
    background-color: #A52421;
    padding: 10px;
    border: none;
  }
  #bouton_fermer_menus:hover,#bouton_ajouter_menus:hover {
    background-color: #f5f0e1;
    border: none;
  }

</style>
