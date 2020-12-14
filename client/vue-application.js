const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    },
    user: {
      userId: null
    }
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
    const res3 = await axios.get('/api/me')
    this.user.userId = res3.data
  },
  methods: {
    async register (user) {
      await axios.post('/api/register/','email=' + user.email + '&password=' + user.password)
    },
    async login (user) {
      await axios.post('/api/login/','email=' + user.email + '&password=' + user.password)
      const res3 = await axios.get('/api/me')
      this.user.userId = res3.data
    },
    async pay () {
      try {
        await axios.post('/api/panier/pay')
        const res2 = await axios.get('/api/panier')
        this.panier = res2.data
        alert("Merci d'être venu sur notre site !")
        router.push('/')
      } catch (e) {
        alert("Vous n'êtes pas conncecté, veuillez le faire")
        router.push('/login')
      }
    },
    async addToPanier (articleId) {
      if (this.panier.articles.find(a => a.id === articleId) === undefined){
        const res = await axios.post('/api/panier','id='+ articleId + '&quantity=1')
        this.panier.articles.push(res.data)
      }
    },
    async removeFromPanier (articleId) {
      await axios.delete('/api/panier/' + articleId)
      const index = this.panier.articles.findIndex(a => a.id === articleId)
      this.panier.articles.splice(index, 1)
    },
    async updateArticleFromPanier (newArticle) {
      await axios.put('/api/panier/' + newArticle.id, newArticle)
      const article = this.panier.articles.find(a => a.id === newArticle.id)
      article.quantity = newArticle.quantity
    },
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    }
  }
})
