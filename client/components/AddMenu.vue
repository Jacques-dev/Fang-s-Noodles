<template>
  <div class="container">

    <form v-show="show" @submit.prevent="addMenu">
      <div class="row">
        <div class="col-sm-12">
          <h2>Nouveau menu à ajouter</h2>
        </div>
        <div class="col-sm-12">
          <select v-model="newMenu.type">
            <option value="soups">Soup</option>
            <option value="dumplings">Dumpling</option>
            <option value="noodles">Noodle</option>
          </select>
        </div>
        <div class="col-sm-12">
          <input type="text" v-model="newMenu.name" placeholder="Nom du menu" required>
        </div>
        <div class="col-sm-12">
          <input type="number" v-model="newMenu.price" placeholder="Prix" required>
        </div>
        <div class="col-sm-12">
          <textarea type="text" v-model="newMenu.description" required></textarea>
        </div>
        <div class="col-sm-12">
          <select v-model="newMenu.spicy">
            <option value="false">not spicy</option>
            <option value="true">spicy</option>
          </select>
        </div>
        <div class="col-sm-12">
          <input type="text" v-model="newMenu.image" placeholder="Lien vers l'image">
        </div>
        <div class="col-sm-12">
          <button type="submit">Ajouter</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
module.exports = {
  props: {

  },
  data () {
    return {
      newMenu: {
        type: '',
        name: '',
        description: '',
        image: '',
        price: '',
        spicy: null
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
