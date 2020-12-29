<template>

<section id="background">

  <section id="ici" class="container d-flex flex-column" >

    <section id="resume_commande" class="row">

      <article class="col-sm-4">
        <p>Nombre de menus : {{ panier.nb_menus }} </p>
      </article>
      <article class="col-sm-4">
        <p>Total : {{ panier.prix }}€ </p>
      </article>
      <article class="col-sm-4">
        <button class="slide_commander" id="bouton_commander" class="col-sm-12" @click="commander()">
          Commander
        </button>
      </article>

    </section>

    <section id="colonne_principale" class="row">

      <section id="colonne_gauche" class="col-sm-2 colonne">
        <section class="container-fluid d-flex flex-column">
          <div class="row type_menu">
            <button class="slide" @click="changeTypeMenu('soups')">Soups</a>
          </div>
          <div class="row type_menu">
            <button class="slide" @click="changeTypeMenu('dumplings')">Dumplings</a>
          </div>
          <div class="row type_menu">
            <button class="slide" @click="changeTypeMenu('noodles')">Noodles</a>
          </div>
          <div class="row type_menu">
            <button class="slide" @click="changeTypeMenu('sashimi')">Sashimi</a>
          </div>
          <div class="row type_menu">
              <button class="slide" @click="changeTypeMenu('nigiri')">Nigiri</a>
          </div>

        </section>

      </section>

      <section id="colonne_centrale" class="col-sm-6 colonne">

        <section class="container-fluid" v-for="menuType in menus">
          <section class="row">
            <article class="col-sm-6 plat" v-for="menu in menuType" :key="menu.id" v-if="checkMenuType(menu.type)">
              <article class="tabcontent container">

                <div class="image-plat">
                  <img v-bind:src="menu.image" class="image">
                  <div class="affichage_bouton_ajout_panier">
                    <button type="button" name="button" class="ajouter_panier_bouton" @click="addToPanier(menu.id, menu.type, menu.price, menu.image)" v-if="user.id">Ajouter au panier</button>
                  </div>
                </div>

                <div class="description-plat">
                  {{ menu.name }} - {{ menu.price }}€
                </div>

                <div class ="spicy" v-if="isSpicy(menu.spicy)">
                  Spicy
                </div>

              </article>
            </article>
          </section>
        </section>
      </section>

      <section id="colonne_droite" class="col-sm-4 colonne">
        <article class="row">
          <section class="container">

            <article v-for="menu in panier.menus" class="col-sm-12 plat">
              <section class="container-fluid">

                <article class="row">
                  <div class="image-plat col-sm-7">
                    <div>
                      <img v-bind:src="menu.image" class="image">
                    </div>
                  </div>
                  <div class="col-sm-5">
                    <div class="container-fluid">
                      <p class="row">Prix : {{menu.prix}} </p>
                      <p class="row">Quantité : {{menu.quantity}} </p>
                    </div>
                  </div>
                </article>

                <article class="row">
                  <article class="col-sm-6">
                    <select class="col-sm-12" @change="edit(menu.id, menu.type, menu.prix)" v-model="editMenu.quantity" class="mySelect">
                      <option value="" disabled selected>quantité</option>
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
                  </article>

                  <article class="col-sm-6">
                    <button class="slide" @click="removeFromPanier(menu.id, menu.type, menu.prix)">Supprimer</button>
                  </article>
                </article>

              </section>
            </article>

          </section>
        </article>
      </section>

    </section>

  </section>

</section>
</template>

<script>
  module.exports = {
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
          image: '',
          type: ''
        },
        menuType: "soups"
      }
    },
    methods: {
      checkMenuType(type) {
        let bool = false
        if(this.menuType == type) {
          bool = true
        }
        return bool
      },
      changeTypeMenu(newType) {
        this.menuType = newType
      },
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
      commander() {
        let content = {
          id: this.editMenu.id,
          quantity: this.editMenu.quantity
        }
        this.$emit('commander', content)
      },
      isSpicy(boolean) {
        return boolean
      },
      addToPanier (menuId, menuType, menuPrix, menuImage) {
        let content = {
          id: menuId,
          type: menuType,
          prix: menuPrix,
          image: menuImage
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

  /* #menu{
    width: 100%;
  } */



/* button {
background: none;
border: 2px solid;
font: inherit;
line-height: 1;
margin: 0.5em;
padding: 1em 2em;
} */

@media only screen and (min-device-width: 1000px) {
  .slide:hover,
  .slide:focus {
    box-shadow: inset 8em 0 0 0 var(--hover);
  }
  .slide_commander:hover,
  .slide_commander:focus {
    box-shadow: inset 21em 0 0 0 var(--hover);
  }

  .slide, .slide_commander {
  --color: #8fc866;
  --hover: #66c887;
  }
  button {
  color: black;
  transition: 0.70s;
  }
  button:hover, button:focus {
  border-color: var(--hover);
  color: #fff;
  }
}

@media only screen and (max-device-width: 575px) {
  #ici{
    max-height: 100%;
    overflow-y: scroll;
  }
  #resume_commande{
    margin-bottom: 25px;
  }
  #colonne_gauche{
    margin-bottom: 25px;
  }
  #colonne_centrale{
    margin-bottom: 25px;
  }
  #colonne_droite{
    border-top: 8px double black
  }
}
  #background{
    color:black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* overflow-y: scroll; */
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-image: url("../images/backgrounds/commander.webp");
  }

  #resume_commande{
    padding: 20px;
    background-color:rgba(252,243,215,0.97);
    /* width: 40%; */
  }

  #resume_commande button{
    padding: 5px;
    width: 100%;
  }

  #colonne_principale{
    /* width: 60%; */
    background-color:rgba(252,243,215,0.97);
    border-top: 1px solid black;
  }

  #colonne_droite{
    /* border: 4px black solid; */
    overflow-y: scroll;
    max-height: 600px;
  }

  #colonne_droite .plat{
    margin-bottom: 20px;
    padding: 10px 20px 15px 10px ;
    border-bottom: 1px solid black;
  }

  #colonne_centrale{
    overflow-y: scroll;
    height: 600px;
  }

  #colonne_centrale img{
    max-width:245px;
    max-height: 185px;
  }

  #colonne_centrale .plat:hover .image {
    opacity: 0.35;
  }

  #colonne_centrale .plat:hover .affichage_bouton_ajout_panier {
    opacity: 1;
  }

  .type_menu{
    margin: 10px 0 10px 0;
    /* border: 2px black solid; */
  }

  .type_menu button{
    /* text-decoration: none; */
    /* border: none; */
    width: 100%;
  }

  .type_plat{
    justify-content: center;
    border-bottom: solid 1px black;
    padding: 20px;
    font-size: 2em;
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

  .ajouter_panier_bouton {
    background-color: #4CAF50;
    color: black;
    font-size: 16px;
    padding: 16px 32px;
  }

  .image-plat {
    position: relative;
  }

  .image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
  }

  .spicy{
    color:red;
  }
</style>
