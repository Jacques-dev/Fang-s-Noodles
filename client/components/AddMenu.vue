<template>
  <form v-show="show" @submit.prevent="addMenu">
    <h2>Nouveau menu à ajouter</h2>
    <input type="text" v-model="newMenu.name" placeholder="Nom du produit" required>
    <input type="number" v-model="newMenu.price" placeholder="Prix" required>
    <textarea type="text" v-model="newMenu.description" required></textarea>
    <select v-model="newMenu.spicy">
      <option>not spicy</option>
      <option>spicy</option>
    </select>
    <input type="text" v-model="newMenu.image" placeholder="Lien vers l'image">
    <button type="submit">Ajouter</button>
  </form>
</template>

<script>
module.exports = {
  props: {
    show: Boolean
  },
  data () {
    return {
      newMenu: {
        name: '',
        description: '',
        image: '',
        price: 0,
        spicy: false
      }
    }
  },
  methods: {
    addMenu () {
      this.$emit('add-menu', this.newMenu)
    }
  }
}
</script>

<style>
</style>
