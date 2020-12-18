<template>
<section id ="background">

  <section class="container" >

    <section class="row">

      <article class="col-sm-12">
        <p id="titre_page">Decouvrez nos variétés de plats<p>
      </article>
      <article class="col-sm-12">

      <div class="titre_plats">
        <p class ="current" id="soups">Soups</p>
        <a href="#dumplings">Dumplings</a>
        <a href="#noodles">Noodles</a>
        <a href="#sashimi">Sashimi</a>
        <a href="#nigiri">Nigiri</a>
      </div>

      <article class ="famille_de_plats" v-for="menu in menus[0]" :key="menu.id">

        <div class="menu-img">
          <img v-bind:src="'../images/soups/' + menu.image ">
        </div>
        <div class="menu-content" v-if="editingMenu.id !== menu.id">
          <div class="menu-title">
            <p>{{ menu.name }} - {{ menu.price }}€</p>
          </div>
          <p class="menu-description">{{ menu.description }}</p>
          <div class ="spicy" v-if="isSpicy(menu.spicy)">
            Spicy
          </div>
          <div class ="bouton-menus">
            <button v-if="admin.id" @click="deleteMenu(menu.id, 'soups')">Supprimer</button>
            <button v-if="admin.id" @click="editMenu(menu, 'soups')">Modifier</button>
          </div>
        </div>

        <div v-else>
          <div>
            <h2><input type="text" v-model="editingMenu.name"> - <input type="number" v-model="editingMenu.price"></h2>
            <div>
              <button @click="sendEditMenu()">Valider</button>
              <button @click="abortEditMenu()">Annuler</button>
            </div>
          </div>
          <p class="menu-description"><textarea v-model="editingMenu.description"></textarea></p>
          <input type="text" v-model="editingMenu.image" placeholder="Lien vers l'image">
        </div>

      </article>

      <div class="titre_plats">
        <a href="#soups">Soups</a>
        <p class ="current" id="dumplings">Dumplings</p>
        <a href="#noodles">Noodles</a>
        <a href="#sashimi">Sashimi</a>
        <a href="#nigiri">Nigiri</a>
      </div>

      <article class="famille_de_plats" v-for="menu in menus[1]" :key="menu.id">
            <div class="menu-img">
              <img v-bind:src="'../images/dumplings/' + menu.image ">
            </div>

            <div class="menu-content" v-if="editingMenu.id !== menu.id">
                  <div class="menu-title">
                    <p>{{ menu.name }} - {{ menu.price }}€</p>

                  </div>
                  <p class="menu-description">{{ menu.description }}</p>
                  <div class="spicy" v-if="isSpicy(menu.spicy)">
                    Spicy
                  </div>
                  <div class ="bouton-menus">
                    <button v-if="admin.id" @click="deleteMenu(menu.id, 'dumplings')">Supprimer</button>
                    <button v-if="admin.id" @click="editMenu(menu, 'dumplings')">Modifier</button>
                  </div>
            </div>

            <div v-else>
              <div>
                <h2><input type="text" v-model="editingMenu.name"> - <input type="number" v-model="editingMenu.price"></h2>
                <div>
                  <button @click="sendEditMenu()">Valider</button>
                  <button @click="abortEditMenu()">Annuler</button>
                </div>
              </div>
              <p><textarea v-model="editingMenu.description"></textarea></p>
              <input type="text" v-model="editingMenu.image" placeholder="Lien vers l'image">
            </div>

        </article>


        <div class="titre_plats">
          <a href="#soups">Soups</a>
          <a href="#dumplings">Dumplings</a>
          <p class ="current" id="noodles">Noodles</p>
          <a href="#sashimi">Sashimi</a>
          <a href="#nigiri">Nigiri</a>
        </div>

        <article class ="famille_de_plats" v-for="menu in menus[2]" :key="menu.id">

          <div class="menu-img">
            <img v-bind:src="'../images/noodles/' + menu.image ">
          </div>

          <div class="menu-content" v-if="editingMenu.id !== menu.id">
            <div class="menu-title">
              <p>{{ menu.name }} - {{ menu.price }}€</p>

            </div>
            <p class="menu-description">{{ menu.description }}</p>
            <div class="spicy" v-if="isSpicy(menu.spicy)">
              Spicy
            </div>
            <div class ="bouton-menus">
              <button v-if="admin.id" @click="deleteMenu(menu.id, 'noodles')">Supprimer</button>
              <button v-if="admin.id" @click="editMenu(menu, 'noodles')">Modifier</button>
            </div>
          </div>

          <div v-else>
            <div>
              <h2><input type="text" v-model="editingMenu.name"> - <input type="number" v-model="editingMenu.price"></h2>
              <div>
                <button @click="sendEditMenu()">Valider</button>
                <button @click="abortEditMenu()">Annuler</button>
              </div>
            </div>
            <p><textarea v-model="editingMenu.description"></textarea></p>
            <input type="text" v-model="editingMenu.image" placeholder="Lien vers l'image">
          </div>

        </article>

        <div class="titre_plats">
          <a href="#soups">Soups</a>
          <a href="#dumplings">Dumplings</a>
          <a href="#noodles">Noodles</a>
          <p class ="current" id="sashimi">Sashimi</p>
          <a href="#nigiri">Nigiri</a>
        </div>

        <article class="famille_de_plats" v-for="menu in menus[3]" :key="menu.id">
              <div class="menu-img">
                <img v-bind:src="'../images/sashimi/' + menu.image ">
              </div>

              <div class="menu-content" v-if="editingMenu.id !== menu.id">
                    <div class="menu-title">
                      <p>{{ menu.name }} - {{ menu.price }}€</p>

                    </div>
                    <p class="menu-description">{{ menu.description }}</p>
                    <div class="spicy" v-if="isSpicy(menu.spicy)">
                      Spicy
                    </div>
                    <div class ="bouton-menus">
                      <button v-if="admin.id" @click="deleteMenu(menu.id, 'sashimi')">Supprimer</button>
                      <button v-if="admin.id" @click="editMenu(menu, 'sashimi')">Modifier</button>
                    </div>
              </div>

              <div v-else>
                <div>
                  <h2><input type="text" v-model="editingMenu.name"> - <input type="number" v-model="editingMenu.price"></h2>
                  <div>
                    <button @click="sendEditMenu()">Valider</button>
                    <button @click="abortEditMenu()">Annuler</button>
                  </div>
                </div>
                <p><textarea v-model="editingMenu.description"></textarea></p>
                <input type="text" v-model="editingMenu.image" placeholder="Lien vers l'image">
              </div>

          </article>

          <div class="titre_plats">
            <a href="#soups">Soups</a>
            <a href="#dumplings">Dumplings</a>
            <a href="#noodles">Noodles</a>
            <a href="#sashimi">Sashimi</a>
            <p class ="current" id="nigiri">Nigiri</p>
          </div>

          <article class="famille_de_plats" v-for="menu in menus[4]" :key="menu.id">
                <div class="menu-img">
                  <img v-bind:src="'../images/nigiri/' + menu.image ">
                </div>

                <div class="menu-content" v-if="editingMenu.id !== menu.id">
                      <div class="menu-title">
                        <p>{{ menu.name }} - {{ menu.price }}€</p>

                      </div>
                      <p class="menu-description">{{ menu.description }}</p>
                      <div class="spicy" v-if="isSpicy(menu.spicy)">
                        Spicy
                      </div>
                      <div class ="bouton-menus">
                        <button v-if="admin.id" @click="deleteMenu(menu.id, 'nigiri')">Supprimer</button>
                        <button v-if="admin.id" @click="editMenu(menu, 'nigiri')">Modifier</button>
                      </div>
                </div>

                <div v-else>
                  <div>
                    <h2><input type="text" v-model="editingMenu.name"> - <input type="number" v-model="editingMenu.price"></h2>
                    <div>
                      <button @click="sendEditMenu()">Valider</button>
                      <button @click="abortEditMenu()">Annuler</button>
                    </div>
                  </div>
                  <p><textarea v-model="editingMenu.description"></textarea></p>
                  <input type="text" v-model="editingMenu.image" placeholder="Lien vers l'image">
                </div>

            </article>

        <add-menu :show="showForm" @add-menu="addMenu"></add-menu>
        <button v-if="admin.id" @click="showForm = !showForm">Afficher le formulaire</button>

      </article>
    </section>
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

#background{
  color:#fff;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* width: 150%; */
  height: auto;
  background-size: contain;
  /* background-repeat: no-repeat; */
  background-image: url("../images/backgrounds/epices.jpg");
}
.titre_plats .current{
  color:#FFA213;
  text-decoration: underline;
}
  p{

  }
  .menu-img img {
    width: 100px;
    height: 100px;
  }
  .container{
    /* position: relative; */
    /* background-color: #F0DDC4; */
      /* background-color:rgba(137,27,23,0.5); */
      background-color:rgba(30,61,89,0.7);
    width: 100%;
  }
  .spicy{
    display: flex;
    justify-content: center;
    width: 10%;
    margin-left: 2%;
    color: #fff;
    padding: 2px 5px 2px 5px;
    background-color: #A52421;
  }
  .titre_plats{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    font-weight: bold;
    padding-top: 2%;
    padding-bottom: 2%;
    /* margin-top: 3%;
    margin-bottom: 3%; */
    /* margin-left: 2%;
    margin-right: 2%; */
    width: 100%;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;

  }
  .titre_plats a{
    margin-left: 2%;
    margin-right: 2%;
    color:#fff;
  }
  .titre_plats p{
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 1rem;
  }

  .famille_de_plats{
    /* border-top: 2px solid #fff; */
    border-bottom: 2px solid #fff;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 2% 5% 2% 5%;
  }
  .menu-img, .menu-content{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-top: 1%;
    margin-bottom: 1%;
    /* border: 2px solid red; */
  }
  .menu-title, .spicy, .menu-description, .bouton-menus {
    /* border:3px solid green; */
    padding:1%;
  }
  .menu-description{
    background-color: #f5f0e1;
    color: rgb(137,27,23);
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
  #titre_page{
    font-size: 2.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    /* height:120%; */
    /* margin-bottom: 3%; */
  }

</style>
