<template>

  <section class="container">
      <h2>Menu</h2>

    <section id = "colonnes" class="row">
      <section class="col-sm-2 colonne">
        <h3 id ="utilisateur">Hi, Guest</h3>
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
                      <button type="button" name="button" class="ajouterMenu" @click="addToPanier(menu.id, 'soups')" v-if="user.id">Ajouter au panier</button>
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

            <article class="tabcontent container" v-if="checkMenu('dumplings')">
              <h3>Dumplings</h3>
              <div class="row">

                <article v-for="menu in menus[1]" :key="menu.id" class="col-sm-6 plat">
                  <div class="image-plat">
                    <img v-bind:src="'../images/dumplings/' + menu.image " class="image">
                    <div class="affichage_bouton_ajout_panier">
                      <button type="button" name="button" class="ajouterMenu" @click="addToPanier(menu.id, 'dumplings')" v-if="user.id">Ajouter au panier</button>
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
                      <button type="button" name="button" class="ajouterMenu" @click="addToPanier(menu.id, 'noodles')" v-if="user.id">Ajouter au panier</button>
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

      </section>

      <section class="col-sm-3 colonne">

        <article class="row">
          <div class="col-sm-6">
            My Order
          </div>
          <div class="col-sm-6">
            (0 selections)
          </div>
        </article>

        <article class="row">
          <div class="col-sm-12">
            <!-- <panier @remove-from-panier="removeFromPanier"></panier> -->
            <section class="container-fluid">
              <section class="row">

                <article v-for="menu in panier.soups" :key="menu.id" class="col-sm-12 plat">
                  <div class="image-plat">
                    <img v-bind:src="'../images/soups/' + menus[0][menu.id-1].image " class="image">
                    <div class="affichage_bouton_ajout_panier">
                      <button @click="removeFromPanier(menu.id, 'soups')">Retirer du panier</button>
                    </div>
                  </div>

                  <div class="description-plat">
                    {{ menus[0][menu.id-1].name }} - {{ menus[0][menu.id-1].price }}€
                  </div>

                </article>

                <article v-for="menu in panier.dumplings" :key="menu.id" class="col-sm-12 plat">
                  <div class="image-plat">
                    <img v-bind:src="'../images/dumplings/' + menus[1][menu.id-1].image " class="image">
                    <div class="affichage_bouton_ajout_panier">
                      <button @click="removeFromPanier(menu.id, 'dumplings')">Retirer du panier</button>
                    </div>
                  </div>

                  <div class="description-plat">
                    {{ menus[1][menu.id-1].name }} - {{ menus[1][menu.id-1].price }}€
                  </div>

                </article>

                <article v-for="menu in panier.noodles" :key="menu.id" class="col-sm-12 plat">
                  <div class="image-plat">
                    <img v-bind:src="'../images/noodles/' + menus[2][menu.id-1].image " class="image">
                    <div class="affichage_bouton_ajout_panier">
                      <button @click="removeFromPanier(menu.id, 'noodles')">Retirer du panier</button>
                    </div>
                  </div>

                  <div class="description-plat">
                    {{ menus[2][menu.id-1].name }} - {{ menus[2][menu.id-1].price }}€
                  </div>

                </article>
              </section>
            </section>
          </div>
        </article>
        <article class="row">
          <div class="col-sm-6">
            Total
          </div>
          <div class="col-sm-6">
            €
          </div>
        </article>
        <p>Arrivé prévu : 20 minutes</p>
        <button type="button" name="button">Commander</button>
      </section>
    </section>

  </section>

</template>

<script>
  // const Panier = window.httpVueLoader('./components/Panier.vue');
  module.exports = {
    components: {
      // Panier,
    },
    props: {
      menus: { type: Array, default: [] },
      panier: { type: Object },
      user: {type: Object }
    },
    data () {
      return {
        typeMenu: "soups"
      }
    },
    methods: {
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
      addToPanier (menuId, menuType) {
        let content = {
          id: menuId,
          type: menuType
        }
        this.$emit('add-to-panier', content)
      },
      removeFromPanier(menuId, menuType) {
        let content = {
          id: menuId,
          type: menuType
        }
        this.$emit('remove-from-panier', content)
      },
      existeDansPanier (menuId, menuType) {
        let bool = false
        if (menuType == "soups") {
          for (const m of this.panier.soups.menus) {
            if (m.id == menuId){
              bool = true
            }
          }
        } else if (menuType == "dumplings") {
          for (const m of this.panier.dumplings.menus) {
            if (m.id == menuId){
              bool = true
            }
          }
        } else {
          for (const m of this.panier.noodles.menus) {
            if (m.id == menuId){
              bool = true
            }
          }
        }
        return bool
      }
    }
  }
</script>

<style scoped>
  .colonne{
      /* border: red solid 2px; */
  }
  .colonne .row{
      /* border: black solid 2px; */
  }
  #colonnes{
    /* border: yellow solid 2px; */
  }
  .container{
    height: 100%;
    background-color:#F0DDC4;
  }

  /* .dropdown-menu {
    float: left;
    width: 30%;
    height: 300px;
  } */

  #menus-deroulant{
    display: flex;
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
