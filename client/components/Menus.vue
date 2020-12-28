<template>
  <section id="background">

    <section class="container">

        <article class="row d-flex justify-content-center">
          <p id="titre_page">Decouvrez nos variétés de plats<p>
        </article>

        <article class="row">

          <article class="col-sm-12">
            <add-menu v-if="showForm" @add-menu="addMenu"></add-menu>
            <button id="bouton_formulaire"v-if="admin.id" @click="showForm = !showForm">Afficher le formulaire</button>

              <div id="soups" class="type_plat row">
                <router-link class="current" to='/menus/#soups'>soups</router-link>
                <router-link to='/menus/#dumplings'>dumplings</router-link>
                <router-link to='/menus/#noodles'>noodles</router-link>
                <router-link to='/menus/#sashimi'>sashimi</router-link>
                <router-link to='/menus/#nigiri'>nigiri</router-link>
              </div>

              <article class ="ligne_plat row" v-for="menu in menus[0]" :key="menu.id">

                <div class="row">
                  <div class="menu-img col-sm-3">
                    <img v-bind:src="'../images/soups/' + menu.image ">
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
                    <button class="col-sm-6" v-if="admin.id" @click="deleteMenu(menu.id, 'soups')">Supprimer</button>
                    <button class="col-sm-6" v-if="admin.id" @click="editMenu(menu, 'soups')">Modifier</button>
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

              <div id="dumplings" class="type_plat row">
                <router-link to='/menus/#soups'>soups</router-link>
                <router-link class="current" to='/menus/#dumplings'>dumplings</router-link>
                <router-link to='/menus/#noodles'>noodles</router-link>
                <router-link to='/menus/#sashimi'>sashimi</router-link>
                <router-link to='/menus/#nigiri'>nigiri</router-link>
              </div>

              <article class="ligne_plat row" v-for="menu in menus[1]" :key="menu.id">

                <div class="row">
                  <div class="menu-img col-sm-3">
                    <img v-bind:src="'../images/dumplings/' + menu.image ">
                  </div>
                  <div class="col-sm-9 menu-description">
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
                    <button class="col-sm-6" v-if="admin.id" @click="deleteMenu(menu.id, 'dumplings')">Supprimer</button>
                    <button class="col-sm-6" v-if="admin.id" @click="editMenu(menu, 'dumplings')">Modifier</button>
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
                      <p class=" menu-description"><textarea v-model="editingMenu.description"></textarea></p>
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

              <div id="noodles" class="type_plat row">
                <router-link to='/menus/#soups'>soups</router-link>
                <router-link to='/menus/#dumplings'>dumplings</router-link>
                <router-link class="current" to='/menus/#noodles'>noodles</router-link>
                <router-link to='/menus/#sashimi'>sashimi</router-link>
                <router-link to='/menus/#nigiri'>nigiri</router-link>
              </div>

              <article class ="ligne_plat row" v-for="menu in menus[2]" :key="menu.id">

                <div class="row">
                  <div class="menu-img col-sm-3">
                    <img v-bind:src="'../images/noodles/' + menu.image ">
                  </div>
                  <div class=" col-sm-9 menu-description">
                    <p>{{ menu.description }}</p>
                  </div>
                </div>

                <div class="nom_prix_spicy_plat row" v-if="editingMenu.id !== menu.id">
                  <div class="menu-title row">
                    <p>{{ menu.name }} - {{ menu.price }}€</p>
                  </div>
                  <div class =" row" v-if="isSpicy(menu.spicy)">
                    <p class ="spicy">Spicy</p>
                  </div>
                  <div class ="bouton-menus row">
                    <button class="col-sm-6" v-if="admin.id" @click="deleteMenu(menu.id, 'noodles')">Supprimer</button>
                    <button class="col-sm-6" v-if="admin.id" @click="editMenu(menu, 'noodles')">Modifier</button>
                  </div>
                </div>

                <div class= "container" v-else>

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
                      <p class=" menu-description"><textarea v-model="editingMenu.description"></textarea></p>
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

              <div id="sashimi" class="type_plat row">
                <router-link to='/menus/#soups'>soups</router-link>
                <router-link to='/menus/#dumplings'>dumplings</router-link>
                <router-link to='/menus/#noodles'>noodles</router-link>
                <router-link class="current" to='/menus/#sashimi'>sashimi</router-link>
                <router-link to='/menus/#nigiri'>nigiri</router-link>
              </div>

              <article class ="ligne_plat row" v-for="menu in menus[3]" :key="menu.id">
                <div class="row">
                  <div class="menu-img col-sm-3">
                    <img v-bind:src="'../images/sashimi/' + menu.image ">
                  </div>
                  <div class=" col-sm-9 menu-description">
                    <p>{{ menu.description }}</p>
                  </div>
                </div>

                <div class="nom_prix_spicy_plat row" v-if="editingMenu.id !== menu.id">
                  <div class="menu-title row">
                    <p>{{ menu.name }} - {{ menu.price }}€</p>
                  </div>
                  <div class =" row" v-if="isSpicy(menu.spicy)">
                    <p class ="spicy">Spicy</p>
                  </div>
                  <div class ="bouton-menus row">
                    <button class="col-sm-6" v-if="admin.id" @click="deleteMenu(menu.id, 'sashimi')">Supprimer</button>
                    <button class="col-sm-6" v-if="admin.id" @click="editMenu(menu, 'sashimi')">Modifier</button>
                  </div>
                </div>

                <div class= "container" v-else>

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
                      <p class=" menu-description"><textarea v-model="editingMenu.description"></textarea></p>
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

              <div id="nigiri" class="type_plat row">
                <router-link to='/menus/#soups'>soups</router-link>
                <router-link to='/menus/#dumplings'>dumplings</router-link>
                <router-link to='/menus/#noodles'>noodles</router-link>
                <router-link to='/menus/#sashimi'>sashimi</router-link>
                <router-link class="current" to='/menus/#nigiri'>nigiri</router-link>
              </div>

              <article class ="ligne_plat row" v-for="menu in menus[4]" :key="menu.id">
                <div class="row">
                  <div class="menu-img col-sm-3">
                    <img v-bind:src="'../images/nigiri/' + menu.image ">
                  </div>
                  <div class=" col-sm-9 menu-description">
                    <p>{{ menu.description }}</p>
                  </div>
                </div>

                <div class="nom_prix_spicy_plat row" v-if="editingMenu.id !== menu.id">
                  <div class="menu-title row">
                    <p>{{ menu.name }} - {{ menu.price }}€</p>
                  </div>
                  <div class =" row" v-if="isSpicy(menu.spicy)">
                    <p class ="spicy">Spicy</p>
                  </div>
                  <div class ="bouton-menus row">
                    <button class="col-sm-6" v-if="admin.id" @click="deleteMenu(menu.id, 'nigiri')">Supprimer</button>
                    <button class="col-sm-6" v-if="admin.id" @click="editMenu(menu, 'nigiri')">Modifier</button>
                  </div>
                </div>

                <div class= "container" v-else>

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
                      <p class=" menu-description"><textarea v-model="editingMenu.description"></textarea></p>
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
        showForm: false
      }
    },
    methods: {
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
  .container{

    /* background-color: #F0DDC4; */
      /* background-color:rgba(137,27,23,0.5); */
      background-color:rgba(30,61,89,0.7);
      /* background-color: rgba(7,123,138,0.7); */
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
        padding-bottom: 14px;
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
  .menu-img{

    /* height: 300px;
    width: 300px; */
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
  button{
    padding:  1%;
    border-radius: 20px 20px;
  }
  button:hover{
    background-color: #a52421;
    color: #fff;
  }


  #bouton_formulaire{
    position: fixed;
    z-index: 4;
  }

</style>
