<template>

  <section class="container-fluid">
    <article v-for="menu in panier.soups.menus" :key="menu.id" class="col-sm-12 plat">
      <div class="image-plat">
        <img v-bind:src="'../images/soups/' + menu.image " class="image">
        <div class="affichage_bouton_ajout_panier">
          <button @click="removeFromPanier(menu.id, 'soups')">Retirer du panier</button>
        </div>
      </div>

      <div class="description-plat">
        {{ menu.name }} - {{ menu.price }}€
      </div>

    </article>

    <article v-for="menu in panier.dumplings.menus" :key="menu.id" class="col-sm-12 plat">
      <div class="image-plat">
        <img v-bind:src="'../images/dumplings/' + menu.image " class="image">
        <div class="affichage_bouton_ajout_panier">
          <button @click="removeFromPanier(menu.id, 'dumplings')">Retirer du panier</button>
        </div>
      </div>

      <div class="description-plat">
        {{ menu.name }} - {{ menu.price }}€
      </div>

    </article>

    <article v-for="menu in panier.noodles.menus" :key="menu.id" class="col-sm-12 plat">
      <div class="image-plat">
        <img v-bind:src="'../images/noodles/' + menu.image " class="image">
        <div class="affichage_bouton_ajout_panier">
          <button @click="removeFromPanier(menu.id, 'noodles')">Retirer du panier</button>
        </div>
      </div>

      <div class="description-plat">
        {{ menu.name }} - {{ menu.price }}€
      </div>

    </article>
  </section>

</template>

<script>
  module.exports = {
    components: {

    },
    props: {
      panier: { type: Object },
    },
    data () {
      return {

      }
    },
    methods: {
      removeFromPanier(menuId, menuType) {
        let content = {
          id: menuId,
          type: menuType
        }
        this.$emit('remove-from-panier', content)
      }
    }
  }
</script>

<style scoped>

</style>
