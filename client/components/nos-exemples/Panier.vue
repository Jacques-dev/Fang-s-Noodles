<template>
  <div>
    <h2>Mon Panier</h2>
    <article v-for="article in panier.articles" :key="article.id">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + articles[article.id-1].image + ')' }">
        </div>
      </div>
      <div class="article-content">
        <div class="article-title">
          <h2>Numéro : {{ article.id }}</h2>
        </div>
        <div class="article-title">
          <h2>Quantité : {{ article.quantity }}</h2>
        </div>

        <div class="article-title">
          <div v-if="editingArticleFromPanier.id !== article.id">
            <button class="custom-btn btn-13" @Click="editArticleFromPanier(article)">Modifier</button>
          </div>
          <div v-else>
            <input type="number" name="quantity" v-model="editingArticleFromPanier.quantity">
            <div>
              <button class="custom-btn btn-13" @click="sendEditArticleFromPanier()">Valider</button>
              <button class="custom-btn btn-13" @click="abortEditArticleFromPanier()">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </article>

    <pay>
      <button class="custom-btn btn-13" @click="pay()">Payer</button>
    </pay>

  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      editingArticleFromPanier: {
        id: -1,
        quantity: 0
      }
    }
  },
  methods: {
    editArticleFromPanier (article) {
      this.editingArticleFromPanier.id = article.id
      this.editingArticleFromPanier.quantity = article.quantity
    },
    sendEditArticleFromPanier () {
      this.$emit('update-article-from-panier', this.editingArticleFromPanier)
      this.abortEditArticleFromPanier()
    },
    abortEditArticleFromPanier () {
      this.editingArticleFromPanier = {
        id: -1,
        quantity: 0
      }
    },
    pay () {
      this.$emit('pay')
    }
  }
}
</script>

<style scoped>

h2 {
  text-align: center;
}

article {
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-img {

}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {

}

.article-title {

}

textarea {
  width: 100%;
}

button {
  margin: 20px 20px 25px 20px;
}

.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}

.btn-13 {
  background-color: #89d8d3;
  background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  border: none;
  z-index: 1;
}
.btn-13:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-radius: 5px;
  background-color: #4dccc6;
  background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
  box-shadow:
   -7px -7px 20px 0px #fff9,
   -4px -4px 5px 0px #fff9,
   7px 7px 20px 0px #0002,
   4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}
.btn-13:hover {
  color: #fff;
}
.btn-13:hover:after {
  top: 0;
  height: 100%;
}
.btn-13:active {
  top: 2px;
}
</style>
