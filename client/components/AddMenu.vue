<template>
  <div id="all" class="container">

    <form @submit.prevent="addMenu">
      <div class="container-fluid">
        <div class="row">
            <h2 class="col-sm-12">Nouveau menu à ajouter</h2>
        </div>
        <div class="row">
            <select class="col-sm-12" v-model="newMenu.type">
              <option value="soups">Soup</option>
              <option value="dumplings">Dumpling</option>
              <option value="noodles">Noodle</option>
              <option value="sashimi">Sashimi</option>
              <option value="nigiri">Nigiri</option>
            </select>
        </div>
        <div class="row">
            <input class="col-sm-12" type="text" v-model="newMenu.name" placeholder="Nom du menu" required>
        </div>
        <div class="row">
            <input class="col-sm-12" type="number" v-model="newMenu.price" placeholder="Prix" required>
        </div>
        <div class="row">
            <textarea class="col-sm-12" type="text" v-model="newMenu.description" required></textarea>
        </div>
        <div class="row">
            <select class="col-sm-12" v-model="newMenu.spicy">
              <option value="false">not spicy</option>
              <option value="true">spicy</option>
            </select>
        </div>
        <div class="row">
            <input class="col-sm-12" type="text" v-model="newMenu.image" placeholder="Lien vers l'image">
        </div>
        <div class="row">
            <button class="col-sm-12" type="submit">Ajouter</button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
  module.exports = {
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
@media only screen and (max-device-width: 1100px) {
  #all {
    width: 100% !important;
    text-align: center;
  }
}

  #all{
    position: fixed;
    z-index: 4;
    background-color: #891B17;
    width: 20%;
    /* margin: px 0 0 0 ; */
  }
  #all .row{
    margin: 20px 0 20px 0;
  }
</style>
