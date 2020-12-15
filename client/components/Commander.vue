<template id="commander">

  <div class="container">
    <div class="row">
      <div class="col-sm-2">
        <h3>Hi, Guest</h3>
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Menu</a>
            <div class="dropdown-menu">
              <button class="dropdown-item" @click="changeTypeMenu('soups')">Soups</a>
              <button class="dropdown-item" @click="changeTypeMenu('dumplings')">Dumplings</a>
              <button class="dropdown-item" @click="changeTypeMenu('noodles')">Noodles</a>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-sm-7">
        <h2>Menu</h2>

        <div class="tabcontent container" v-if="checkMenu('soups')">

          <h3>Soups</h3>
          <div class="row">

            <article v-for="menu in menus[0]" :key="menu.id" class="col-sm-6">
              <div class="menu">
                <img v-bind:src="'../images/soups/' + menu.image " class="image">
                <div class="middle">
                  <button type="button" name="button" class="ajouterMenu">Ajouter au panier</button>
                </div>
              </div>

              {{ menu.name }} - {{ menu.price }}€
              <div v-if="isSpicy(menu.spicy)" style="color: red">
                Spicy
              </div>

            </article>
          </div>
        </div>

        <div class="tabcontent container" v-if="checkMenu('dumplings')">
          <h3>Dumplings</h3>
          <div class="row">

            <article v-for="menu in menus[1]" :key="menu.id" class="col-sm-6">
              <div class="menu">
                <img v-bind:src="'../images/dumplings/' + menu.image " class="image">
                <div class="middle">
                  <button type="button" name="button" class="ajouterMenu">Ajouter au panier</button>
                </div>
              </div>

              {{ menu.name }} - {{ menu.price }}€
              <div v-if="isSpicy(menu.spicy)" style="color: red">
                Spicy
              </div>

            </article>
          </div>
        </div>

        <div class="tabcontent container" v-if="checkMenu('noodles')">
          <h3>Noodles</h3>
          <div class="row">

            <article v-for="menu in menus[2]" :key="menu.id" class="col-sm-6">
              <div class="menu">
                <img v-bind:src="'../images/noodles/' + menu.image " class="image">
                <div class="middle">
                  <button type="button" name="button" class="ajouterMenu">Ajouter au panier</button>
                </div>
              </div>

              {{ menu.name }} - {{ menu.price }}€
              <div v-if="isSpicy(menu.spicy)" style="color: red">
                Spicy
              </div>

            </article>
          </div>
        </div>

      </div>
      <div class="col-sm-3">

        <div class="row">
          <div class="col-sm-6">
            My Order
          </div>
          <div class="col-sm-6">
            (0 selections)
          </div>
        </div>

        <div class="panier">
           -- affichage du panier --
        </div>
        <div class="row">
          <div class="col-sm-6">
            Total
          </div>
          <div class="col-sm-6">
            €
          </div>
        </div>

        <p>Arrivé prévu : 20 minutes</p>

        <button type="button" name="button">Commander</button>

      </div>
    </div>
  </div>

</template>

<script>
  module.exports = {
    components: {
      Panier
    },
    props: {
      menus: { type: Array, default: [] },
      panier: { type: Object }
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
      }
    }
  }
</script>

<style scoped>

  #commander .dropdown-menu {
    float: left;
    width: 30%;
    height: 300px;
  }

  #commander .dropdown-menu button {
    display: block;
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

  #commander .dropdown-menu button:hover {
    background-color: #ddd;
  }

  #commander .dropdown-menu button.active {
    background-color: #ccc;
  }

  /* ------------------------------- */

  #commander .tabcontent .col-sm-6 {
    margin: 15px auto;
  }

  #commander .menu {
    position: relative;
    width: 50%;
  }

  #commander .image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
  }

  #commander .middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  #commander .menu:hover .image {
    opacity: 0.3;
  }

  #commander .menu:hover .middle {
    opacity: 1;
  }

  #commander .ajouterMenu {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    padding: 16px 32px;
  }

</style>
