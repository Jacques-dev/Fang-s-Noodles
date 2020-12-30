<template>

<section id="background">

  <section id="all" class="container d-flex flex-column" >

    <section id="resume_commande" class="row">

      <article class="col-sm-5">
        <p>Nombre de menus : {{ panier.nb_menus }} </p>
      </article>
      <article class="col-sm-3">
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
            <button class="slide_page_commander" @click="changeTypeMenu('soups')">Soups</button>
          </div>
          <div class="row type_menu">
            <button class="slide_page_commander" @click="changeTypeMenu('dumplings')">Dumplings</button>
          </div>
          <div class="row type_menu">
            <button class="slide_page_commander" @click="changeTypeMenu('noodles')">Noodles</button>
          </div>
          <div class="row type_menu">
            <button class="slide_page_commander" @click="changeTypeMenu('sashimi')">Sashimi</button>
          </div>
          <div class="row type_menu">
            <button class="slide_page_commander" @click="changeTypeMenu('nigiri')">Nigiri</button>
          </div>

        </section>

      </section>

      <section id="colonne_centrale" class="col-sm-6 colonne">

        <section class="container-fluid" v-for="menuType in menus">
          <section class="row">
            <article class="col-sm-6 chaque_plat" v-for="menu in menuType" v-if="checkMenuType(menu.type)">
              <article class="container-fluid">

                <div class=" row image-plat">
                  <img v-bind:src="menu.image" class="image">
                  <div class="affichage_bouton_ajout_panier">
                    <button type="button" name="button" class="ajouter_panier_bouton" @click="addToPanier(menu.id, menu.type, menu.price, menu.image)" v-if="user.id">Ajouter au panier</button>
                  </div>
                </div>

                <div class=" row description-plat">
                  <p>{{ menu.name }} - {{ menu.price }}€ </p>
                </div>

                <div class=" row spicy" v-if="isSpicy(menu.spicy)">
                  <p>Spicy</p>
                </div>

              </article>
            </article>
          </section>
        </section>
      </section>

      <section id="colonne_droite" class="col-sm-4 colonne">
        <article class="row">
          <section class="container">

            <article class="chaque_plat_panier" v-for="menu in panier.menus" :key="menu.id" class="col-sm-12 plat">
              <section class="container-fluid">

                <article class="row">
                  <div class="image-plat col-sm-8">
                    <div>
                      <img :src="menu.image" class="image">
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="container">
                      <p class="row">Prix : {{menu.prix}} </p>
                      <p class="row">Quantité : {{menu.quantity}} </p>
                    </div>
                  </div>
                </article>

                <article class="row ligne_boutons_panier">
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

                  <article class="col-sm-6 bouton_supprimer_panier">
                    <button class="slide_page_commander col-sm-12" @click="removeFromPanier(menu.id, menu.type, menu.prix)">Supprimer</button>
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
      // Affiche les menus du type donné en argument
      checkMenuType(type) {
        let bool = false
        if(this.menuType == type) {
          bool = true
        }
        return bool
      },
      // Modifie le type de menu à afficher
      changeTypeMenu(newType) {
        this.menuType = newType
      },
      // Envoie la valeur des champs du formulaire de modification d'un menu dans le panier
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
      // Simule le passage d'une commande
      commander() {
        this.$emit('commander')
      },
      // Affiche "Spicy" sur le site si le champ spicy du menu est "true"
      isSpicy(boolean) {
        return boolean
      },
      // Ajoute un menu au panier
      addToPanier (menuId, menuType, menuPrix, menuImage) {
        let content = {
          id: menuId,
          type: menuType,
          prix: menuPrix,
          image: menuImage
        }
        this.$emit('add-to-panier', content)
      },
      // Supprime un menu du panier
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


  .ligne_boutons_panier{
    margin-top: 15px;
  }

  .slide_page_commander{
    word-break: break-word;
    min-width: 70px;
  }

  @media only screen and (min-device-width: 1000px) {
    .slide_page_commander:hover,
    .slide_page_commander:focus {
      box-shadow: inset 8em 0 0 0 var(--hover);
    }
    .slide_commander:hover,
    .slide_commander:focus {
      box-shadow: inset 21em 0 0 0 var(--hover);
    }

    .slide_page_commander, .slide_commander {
    --color: var(--beige) ;
    --hover: var(--rouge) ;
    background-color: var(--beige);
    }
    button {
    color: black;
    transition: 0.70s;
    }
    button:hover, button:focus {
    border-color: var(--hover);
    color: var(--color);
    }
  }

  @media only screen and (max-device-width: 575px) {
    #all{
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

  .chaque_plat_panier{
    margin: 10px 0 10px 0;
    padding: 10px 0 10px 0;
  }

  #resume_commande{
    padding: 20px;
    background-color: var(--bleu_o);
    /* width: 40%; */
  }

  #resume_commande button{
    padding: 5px;
    width: 100%;
  }

  #colonne_gauche{
    padding-top: 20px;
  }

  #colonne_principale{
    /* width: 60%; */
    background-color: var(--bleu_o);
    border-top: 1px solid black;
  }

  #colonne_droite{
    /* border: 4px black solid; */
    overflow-y: scroll;
    max-height: 600px;
  }

  #colonne_droite .chaque_plat_panier{
    margin-bottom: 20px;
    padding: 10px 20px 15px 10px ;
    border-bottom: 1px solid black;
  }

  #colonne_centrale{
    overflow-y: scroll;
    height: 600px;
  }

  #colonne_centrale::-webkit-scrollbar {
      display: none;
  }

  #colonne_centrale img{
    max-width:245px;
    max-height: 185px;
    margin: 15px 0 0 0;
  }

  #colonne_centrale .chaque_plat:hover .image {
    opacity: 0.50;
  }

  #colonne_centrale .chaque_plat:hover .affichage_bouton_ajout_panier {
    opacity: 1;
  }

  #colonne_centrale .chaque_plat{
    padding-bottom: 2vh;
    margin-top: 2vh;
    border-bottom: 1px solid black;
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
  }

  .ajouter_panier_bouton {
    background-color: var(--bleu);
    color: black;
    padding: 2% 5%;
  }

  .image-plat {
    position: relative;
  }

  .image {
    border: black 1px solid;
    /* opacity: 1; */
    /* display: block; */
    width: 100%;
    height: auto;
    transition: 1s ease;
    /* backface-visibility: hidden; */
  }

  .description-plat{
    padding: 15px 0 0 0;
  }

  .spicy{
    color:red;
  }

</style>
