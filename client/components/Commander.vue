<template>

  <section class="container-fluid" id ="background">

    <section id = "colonnes" class="row">
      <!-- <section> -->
          <section class="col-sm-2 colonne">

                    <!-- <h3 id ="utilisateur">Hi, Guest</h3> -->
                    <ul id ="menus-deroulant"class="nav nav-pills">
                      <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Menu</a>
                        <div class="dropdown-menu">
                          <button class="dropdown-item" @click="changeTypeMenu('soups')">Soups</a>
                          <button class="dropdown-item" @click="changeTypeMenu('dumplings')">Dumplings</a>
                          <button class="dropdown-item" @click="changeTypeMenu('noodles')">Noodles</a>
                        </div>
                      </li>
                    </ul>

          </section>

          <section class="col-sm-7 colonne">

                      <article class="tabcontent container" v-if="checkMenu('soups')">

                        <h3>Soups</h3>
                        <div class="row">

                          <article v-for="menu in menus[0]" :key="menu.id" class="col-sm-6 plat">
                            <div class="image-plat">
                              <img v-bind:src="'../images/soups/' + menu.image " class="image">
                              <div class="affichage_bouton_ajout_panier">
                                <button type="button" name="button" class="ajouterMenu" @click="addToPanier(menu.id, 'soups', menu.price)" v-if="user.id">Ajouter au panier</button>
                              </div>
                            </div>
                            <div class="description-plat">
                              {{ menu.name }} - {{ menu.price }}€
                            </div>

                            <div v-if="isSpicy(menu.spicy)" >
                              Spicy
                            </div>
                          </article>
                        </div>
                      </article>

                      <article class="tabcontent container" v-if="checkMenu('dumplings')">
                        <h3>Dumplings</h3>
                        <div class="row">

                          <article v-for="menu in menus[1]" :key="menu.id" class="col-sm-6 plat">
                            <div class="image-plat">
                              <img v-bind:src="'../images/dumplings/' + menu.image " class="image">
                              <div class="affichage_bouton_ajout_panier">
                                <button type="button" name="button" class="ajouterMenu" @click="addToPanier(menu.id, 'dumplings', menu.price)" v-if="user.id">Ajouter au panier</button>
                              </div>
                            </div>

                            <div class="description-plat">
                              {{ menu.name }} - {{ menu.price }}€
                            </div>
                            <div v-if="isSpicy(menu.spicy)" style="color: red">
                              Spicy
                            </div>

                          </article>
                        </div>
                      </article>

                      <article class="tabcontent container" v-if="checkMenu('noodles')">
                        <h3>Noodles</h3>
                        <div class="row">

                          <article v-for="menu in menus[2]" :key="menu.id" class="col-sm-6 plat">
                            <div class="image-plat">
                              <img v-bind:src="'../images/noodles/' + menu.image " class="image">
                              <div class="affichage_bouton_ajout_panier">
                                <button type="button" name="button" class="ajouterMenu" @click="addToPanier(menu.id, 'noodles', menu.price)" v-if="user.id">Ajouter au panier</button>
                              </div>
                            </div>

                            <div class="description-plat">
                              {{ menu.name }} - {{ menu.price }}€
                            </div>
                            <div v-if="isSpicy(menu.spicy)">
                              Spicy
                            </div>

                          </article>
                        </div>
                      </article>
          </section>

      <form @submit.prevent="pay()" class="col-sm-3 colonne">

        <article class="row">
          <div class="col-sm-12">

            <section class="container-fluid">
              <section class="row">

                <article v-for="menu in panier.soups" :key="menu.id" class="col-sm-12">

                  <section class="container-fluid">
                    <section class="row">
                      <article class="col-sm-12" align="center">
                        <div class="image-plat">
                          <img v-bind:src="'../images/soups/' + menus[0][menu.id-1].image " class="image">
                        </div>
                      </article>
                      <article class="col-sm-12">
                        <section class="row">

                          <article class="col-sm-6">
                            <!-- <form @submit.prevent="edit(menu.id)"> -->
                              <select @change="edit(menu.id, 'soups', menu.price)" v-model="editMenu.quantity">
                                <option value="" disabled selected>{{menu.quantity}}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                              </select>
                              <!-- <button type="submit">save</button> -->
                            <!-- </form> -->
                          </article>

                          <article class="col-sm-6">
                            <button @click="removeFromPanier(menu.id, 'soups', menu.price)">Supprimer</button>
                          </article>

                        </section>
                      </article>
                    </section>
                  </section>

                </article>

                <article v-for="menu in panier.dumplings" :key="menu.id" class="col-sm-12 plat">
                  <section class="container-fluid">
                    <section class="row">
                      <article class="col-sm-12" align="center">
                        <div class="image-plat">
                          <img v-bind:src="'../images/dumplings/' + menus[1][menu.id-1].image " class="image">
                        </div>
                      </article>
                      <article class="col-sm-12">
                        <section class="row">

                          <article class="col-sm-6">
                            <!-- <form @submit.prevent="edit(menu.id)"> -->
                              <select @change="edit(menu.id, 'dumplings', menu.price)" v-model="editMenu.quantity">
                                <option value="" disabled selected>{{menu.quantity}}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                              </select>
                              <!-- <button type="submit">save</button> -->
                            <!-- </form> -->
                          </article>

                          <article class="col-sm-6">
                            <button @click="removeFromPanier(menu.id, 'dumplings', menu.price)">Supprimer</button>
                          </article>

                        </section>
                      </article>
                    </section>
                  </section>

                </article>

                <article v-for="menu in panier.noodles" :key="menu.id" class="col-sm-12 plat">
                  <section class="container-fluid">
                    <section class="row">
                      <article class="col-sm-12" align="center">
                        <div class="image-plat">
                          <img v-bind:src="'../images/noodles/' + menus[2][menu.id-1].image " class="image">
                        </div>
                      </article>
                      <article class="col-sm-12">
                        <section class="row">

                          <article class="col-sm-6">
                            <!-- <form @submit.prevent="edit(menu.id)"> -->
                              <select @change="edit(menu.id, 'noodles', menu.price)" v-model="editMenu.quantity">
                                <option value="" disabled selected>{{menu.quantity}}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                              </select>
                              <!-- <button type="submit">save</button> -->
                            <!-- </form> -->
                          </article>

                          <article class="col-sm-6">
                            <button @click="removeFromPanier(menu.id, 'noodles', menu.price)">Supprimer</button>
                          </article>

                        </section>
                      </article>
                    </section>
                  </section>

                </article>
              </section>
            </section>
          </div>
        </article>
        <article class="row">
          <div class="col-sm-6">
            Nombre de menus
          </div>
          <div class="col-sm-6">
            {{ panier.nb_menus }}
          </div>
        </article>
        <article class="row">
          <div class="col-sm-6">
            Total
          </div>
          <div class="col-sm-6">
            {{ panier.prix }}€
          </div>
        </article>
        <p>Arrivé prévu : 20 minutes</p>
        <button type="submit">Commander</button>
      </form>
    </section>

  </section>

</template>

<script>
  module.exports = {
    components: {
    },
    props: {
      menus: { type: Array, default: [] },
      panier: { type: Object },
      user: { type: Object }
    },
    data () {
      return {
        editMenu: {
          id: '',
          quantity: '',
          prix: '',
          type: ''
        },
        typeMenu: "soups"
      }
    },
    methods: {
      edit(id, type, prix) {
        this.editMenu.id = id
        this.editMenu.type = type
        this.editMenu.prix = prix
        let content = {
          id: this.editMenu.id,
          quantity: this.editMenu.quantity,
          prix: this.editMenu.prix,
          type: this.editMenu.type
        }
        this.$emit('update-menu-from-panier', content)
      },
      pay() {
        let content = {
          id: this.editMenu.id,
          quantity: this.editMenu.quantity
        }
        this.$emit('pay', content)
      },
      isSpicy(boolean) {
        return boolean
      },
      checkMenu(type) {
        let bool = false
        if(this.typeMenu == type) {
          bool = true
        }
        return bool
      },
      changeTypeMenu(newType) {
        this.typeMenu = newType
      },
      addToPanier (menuId, menuType, menuPrix) {
        let content = {
          id: menuId,
          type: menuType,
          prix: menuPrix
        }
        this.$emit('add-to-panier', content)
      },
      removeFromPanier(menuId, menuType, menuPrix) {
        let content = {
          id: menuId,
          type: menuType,
          prix: menuPrix
        }
        this.$emit('remove-from-panier', content)
      }
    }
  }
</script>

<style scoped>
#background{
  color:#fff;
  /* color:rgb(137,27,23); */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url("../images/backgrounds/plats_styles2.jpeg");
}
  .colonne{
      /* background-color:rgba(240,221,196,0.9); */
      /* margin-top: 3%; */
      /* justify-content: center; */
      /* display: flex; */
      /* background-color:rgba(137,27,23,0.8); */
      background-color:rgba(30,61,89,0.66);
      /* background-color:rgba(169,192,166,0.8); */

      /* margin: 2px; */
      /* border: red solid 2px; */
  }
  .colonne .row{
      /* background-color:#F0DDC4; */
      /* border: black solid 2px; */
  }
  .row .colonne{

  }
  /* #colonnes{
    border: yellow solid 2px;
  } */
  .container-fluid{
    height: 100%;
    /* background-color:#F0DDC4; */
  }

  /* .dropdown-menu {
    float: left;
    width: 30%;
    height: 300px;
  } */

  #menus-deroulant{
    /* display: flex; */
    /* border: red solid 2px; */
  }

  #utilisateur{
    display: flex;
    /* border: black solid 2px; */
  }

  .dropdown-menu button {
    display: flex;
    background-color: inherit;
    color: black;
    padding: 22px 16px;
    width: 100%;
    border: none;
    outline: none;
    text-align: left;
    cursor: pointer;
    transition: 0.3s;
    font-size: 17px;
  }

  .dropdown-menu button:hover {
    background-color: #ddd;
  }

  .dropdown-menu button.active {
    background-color: #ccc;
  }

  /* ------------------------------- */

  .tabcontent .col-sm-6 {
    margin: 15px auto;
  }

  .image-plat {
    position: relative;
    display: flex;
    width: 50%;
    /* border: 2px red solid; */
  }

  .plat{
    /* border: 2px grey solid; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .description-plat{
    /* border: 2px black solid; */
  }

  .image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
  }

  .affichage_bouton_ajout_panier {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  .plat:hover .image {
    opacity: 0.3;
  }

  .plat:hover .affichage_bouton_ajout_panier {
    opacity: 1;
  }

  .ajouterMenu {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    padding: 16px 32px;
  }
</style>
