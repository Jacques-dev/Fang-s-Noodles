<template>
  <div>
    <h2>Boutique</h2>
    <article v-for="article in articles" :key="article.id">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + article.image + ')' }">
        </div>
      </div>
      <div class="article-content" v-if="editingArticle.id !== article.id">
        <div class="article-title">
          <h2>{{ article.name }} - {{ article.price }}€</h2>
          <div>
            <button class="custom-btn btn-13" @click="deleteArticle(article.id)">Supprimer</button>
            <button class="custom-btn btn-13" @click="editArticle(article)">Modifier</button>
            <button class="custom-btn btn-13" v-if="existeDansPanier(article.id)" @click="removeFromPanier(article.id)">Retirer du panier</button>
            <button class="custom-btn btn-13" v-else @click="addToPanier(article.id)">Ajouter au panier</button>
          </div>
        </div>
        <p>{{ article.description }}</p>
      </div>
      <div class="article-content" v-else>
        <div class="article-title">
          <h2><input type="text" v-model="editingArticle.name"> - <input type="number" v-model="editingArticle.price"></h2>
          <div>
            <button class="custom-btn btn-13" @click="sendEditArticle()">Valider</button>
            <button class="custom-btn btn-13" @click="abortEditArticle()">Annuler</button>
          </div>
        </div>
        <p><textarea v-model="editingArticle.description"></textarea></p>
        <input type="text" v-model="editingArticle.image" placeholder="Lien vers l'image">
      </div>
    </article>
    <add-article :show="showForm" @add-article="addArticle"></add-article>
    <button class="custom-btn btn-13" @click="showForm = !showForm">Afficher le formulaire</button>
  </div>
</template>

<script>

const AddArticle = window.httpVueLoader('./components/AddArticle.vue');
module.exports = {
  components: {
    AddArticle,
    Panier
  },
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      editingArticle: {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      },
      showForm: false
    }
  },
  methods: {
    existeDansPanier (articleId) {
      let bool = false
      for (const art of this.panier.articles) {
        if (art.id == articleId){
        bool = true
        }
      }
      return bool
    },
    addToPanier (articleId) {
      this.$emit('add-to-panier', articleId)
    },
    removeFromPanier(articleId) {
      this.$emit('remove-from-panier', articleId)
    },
    addArticle (article) {
      this.$emit('add-article', article)
    },
    deleteArticle (articleId) {
      this.$emit('delete-article', articleId)
    },
    editArticle (article) {
      this.editingArticle.id = article.id
      this.editingArticle.name = article.name
      this.editingArticle.description = article.description
      this.editingArticle.image = article.image
      this.editingArticle.price = article.price
    },
    sendEditArticle () {
      this.$emit('update-article', this.editingArticle)
      this.abortEditArticle()
    },
    abortEditArticle () {
      this.editingArticle = {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      }
    }
  }
}
</script>

<style scoped>
article {
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}

button {
  margin: 20px;
}

.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 0px 25px;
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
