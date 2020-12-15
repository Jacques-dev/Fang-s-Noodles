<template>
  <div class="container" style="margin-top:30px">
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
        <div class="tabcontent" v-if="checkMenu('soups')">
          <h3>London</h3>
          <p>London is the capital city of England.</p>
        </div>

        <div class="tabcontent" v-if="checkMenu('dumplings')">
          <h3>Paris</h3>
          <p>Paris is the capital of France.</p>
        </div>

        <div class="tabcontent" v-if="checkMenu('noodles')">
          <h3>Tokyo</h3>
          <p>Tokyo is the capital of Japan.</p>
        </div>
      </div>
      <div class="col-sm-3">
        <h2>About Me</h2>
        <h5>Photo of me:</h5>
        <div class="fakeimg">Fake Image</div>
        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
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

    },
    typeMenu = "soups"
  },
  methods: {
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
  #commander {
    background-image: url("/images/backgrounds/commander.webp");
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .fakeimg {
    height: 200px;
    background: #aaa;
  }

  .dropdown-menu {
    float: left;
    width: 30%;
    height: 300px;
  }

  /* Style the buttons inside the tab */
  .dropdown-menu button {
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

  /* Change background color of buttons on hover */
  .dropdown-menu button:hover {
    background-color: #ddd;
  }

  /* Create an active/current "tab button" class */
  .dropdown-menu button.active {
    background-color: #ccc;
  }

  /* Style the tab content */
  .tabcontent {
    float: left;
    padding: 0px 12px;
    border: 1px solid #ccc;
    width: 70%;
    border-left: none;
    height: 300px;
  }

</style>
