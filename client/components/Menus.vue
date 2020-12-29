<template>
  <section id="background">

    <section v-if="admin.id" class="container-fluid" id="balise_admin">
      <div class="row">
          <button id="bouton_ajouter_menus"  @click="showForm = true">Ajouter un plat</button>
      </div>
      <div class="row">
        <button id="bouton_fermer_menus" v-if=" showForm" @click="showForm = false">Fermer</button>
      </div>
      <div class="row">
        <div  id ="colonne_admin" class="col-sm-12">
          <add-menu v-if="showForm" @add-menu="addMenu"></add-menu>
        </div>
      </div>

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

              <div id="modification_plats" class="container" v-else>

                <div class="row">
                  <div class="col-sm-6">
                    <p> nom du plat : </p>
                    <input type="text" v-model="editingMenu.name">
                  </div>
                  <div class="col-sm-6">
                    <p> prix du plat : </p>
                     <input class="col-sm-4" type="number" v-model="editingMenu.price">
                  </div>
                </div>

                <div  class="row">
                  <div class="col-sm-6">
                    <p> description du plat : </p>
                    <textarea class="col-sm-12" v-model="editingMenu.description"></textarea>
                  </div>
                  <div class="col-sm-6">
                    <p> image du plat : </p>
                    <input class="col-sm-12" type="text" v-model="editingMenu.image" placeholder="Lien vers l'image">
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <button id="valider" class="col-sm-12" @click="sendEditMenu()">Valider</button>
                  </div>
                  <div class="col-sm-6">
                    <button class="col-sm-12" @click="abortEditMenu()">Annuler</button>
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


  #colonne_admin{
    padding: 0;
    margin: 0;
  }

  #ligne_1, #ligne_2{

  }

  #modification_plats{
    margin: 15px 0 0 0;
    background-color: #f5f0e1;
    padding: 15px;
  }

  #modification_plats .row{

    color:black;
    padding: 0 0 15px 0;
    /* border: 2px red solid; */
  }

  #modification_plats p{
    font-weight:bold;
  }


  #titre_page{
    font-size: 2.6em;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 3%;
  }

  #background{
    color:var(--text);
    height: auto;
    background-size: contain;
    background-repeat: repeat;
    background-image: url("../images/backgrounds/epices.jpg");
  }

  .menu-img img {
    width: 100px;
    height: 100px;
  }

  #colonne_principale{
    background-color:var(--bleu_o);
    padding: 2%;
    width: 100%;
  }

  .spicy{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    min-width: 100px;
    color: var(--text);
    background-color: var(--rouge_o);
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
    border-top: 2px solid var(--text2);
    border-bottom: 2px solid var(--text2);
  }

  .type_plat a{
    margin-left: 3%;
    margin-right: 3%;
    color: var(--text2);
  }


  .ligne_plat{
    border-bottom: 2px solid var(--text);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 5%;
    padding: 0 0 2% 0;
  }

  .menu-img, .nom_prix_spicy_plat{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 1%;
    margin-bottom: 1%;
  }


  .menu-title, .spicy, .menu-description, .bouton-menus {
    padding:10px;
  }

  .menu-description{
    background-color: var(--beige);
    color: rgb(137,27,23);
    margin-top: 10px;
    color: black;
    font-size: 1.2em;
  }

  .menu-title{
    font-size: 1.5em;
  }

  #colonne_principale button{
    padding:  5px;
    border-radius: 20px 20px;
    font-size: 1.4em;
    margin: 10px 0 0 0 ;
    /* width: 100%; */
  }

  #colonne_principale button:hover{
    background-color: var(--rouge);
    color: var(--text);
  }

  #balise_admin{
    position: fixed;
    /* width: 50%; */
    /* left:50%; */
    /* display: flex; */
    /* justify-content: center; */
    z-index: 2;
  }

  @media only screen and (max-device-width: 1000px) {
    #bouton_ajouter_menus, #bouton_fermer_menus{
      width: 100vw !important;
    }
  }

  #bouton_ajouter_menus, #bouton_fermer_menus {
    background-color: var(--rouge);
    padding: 10px;
    border: none;
    width: 15%;
    min-width: 120px;
  }

  #bouton_fermer_menus:hover,#bouton_ajouter_menus:hover {
    background-color: var(--beige);
    border: none;
  }

</style>
