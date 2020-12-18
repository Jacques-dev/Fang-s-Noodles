<template>

  <section class="container-fluid">
    <section class="row">
      <article v-for="menu in panier.soups" :key="menu.id" class="col-sm-12 plat">
        {{ menu.id }}
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
    </section>

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

</template>

<script>
  module.exports = {
    components: {

    },
    props: {
      menus: { type: Array, default: [] },
      panier: { type: Object }
    },
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>
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
