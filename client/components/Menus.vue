<template>

  <section class="container">
    <section class="row">
      <article class="col-sm-12">
        <h1>MENU</h1>
      </article>
      <article class="col-sm-12">

        <div class="">
          Soups
        </div>

        <article v-for="menu in menus.soups" :key="menu.id">
          <div class="menu-img">
            <div :style="{ backgroundImage: 'url(' + menu.image + ')' }">
            </div>
          </div>
          <div class="menu-content" v-if="editingMenu.id !== menu.id">
            <div class="menu-title">
              <h2>{{ menu.name }} - {{ menu.price }}€</h2>
              <div>
                <button @click="deleteMenu(menu.id)">Supprimer</button>
                <button @click="editMenu(article)">Modifier</button>
                <button v-if="existeDansPanier(menu.id)" @click="removeFromPanier(menu.id)">Retirer du panier</button>
                <button v-else @click="addToPanier(menu.id)">Ajouter au panier</button>
              </div>
            </div>
            <p>{{ menu.description }}</p>
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

        <!-- <div class="">
          Dumplings
        </div>

        <article v-for="menu in menus.dumplings" :key="menu.id">
          <div class="menu-img">
            <div :style="{ backgroundImage: 'url(' + menu.image + ')' }">
            </div>
          </div>
          <div class="menu-content" v-if="editingMenu.id !== menu.id">
            <div class="menu-title">
              <h2>{{ menu.name }} - {{ menu.price }}€</h2>
              <div>
                <button @click="deleteMenu(menu.id)">Supprimer</button>
                <button @click="editMenu(article)">Modifier</button>
                <button v-if="existeDansPanier(menu.id)" @click="removeFromPanier(menu.id)">Retirer du panier</button>
                <button v-else @click="addToPanier(menu.id)">Ajouter au panier</button>
              </div>
            </div>
            <p>{{ menu.description }}</p>
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

        <div class="">
          Noodles
        </div>

        <article v-for="menu in menus.noodles" :key="menu.id">
          <div class="menu-img">
            <div :style="{ backgroundImage: 'url(' + menu.image + ')' }">
            </div>
          </div>
          <div class="menu-content" v-if="editingMenu.id !== menu.id">
            <div class="menu-title">
              <h2>{{ menu.name }} - {{ menu.price }}€</h2>
              <div>
                <button @click="deleteMenu(menu.id)">Supprimer</button>
                <button @click="editMenu(article)">Modifier</button>
                <button v-if="existeDansPanier(menu.id)" @click="removeFromPanier(menu.id)">Retirer du panier</button>
                <button v-else @click="addToPanier(menu.id)">Ajouter au panier</button>
              </div>
            </div>
            <p>{{ menu.description }}</p>
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
        </article> -->

      </article>
    </section>
  </section>

</template>

<script>
module.exports = {
  components: {
    // AddMenu,
    // Panier
  },
  props: {
    menus: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      editingMenu: {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0,
        spicy: false
      }
    }
  },
  methods: {
    existeDansPanier (menuId) {
      let bool = false
      for (const m of this.panier.menus) {
        if (m.id == menuId){
        bool = true
        }
      }
      return bool
    },
    addToPanier (menuId) {
      this.$emit('add-to-panier', menuId)
    },
    removeFromPanier(menuId) {
      this.$emit('remove-from-panier', menuId)
    },
    addMenu (menu) {
      this.$emit('add-menu', menu)
    },
    deleteMenu (menuId) {
      this.$emit('delete-menu', menuId)
    },
    editMenu (menu) {
      this.editingMenu.id = menu.id
      this.editingMenu.name = menu.name
      this.editingMenu.description = menu.description
      this.editingMenu.image = menu.image
      this.editingMenu.price = menu.price
      this.editingMenu.spicy = menu.spicy
    },
    sendEditMenu () {
      this.$emit('update-menu', this.editingMenu)
      this.abortEditmenu()
    },
    abortEditMenu () {
      this.editingMenu = {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0,
        spicy: false
      }
    }
  }
}
</script>

<style scoped>

</style>
