const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Propos = window.httpVueLoader('./components/Propos.vue')
const Menus = window.httpVueLoader('./components/Menus.vue')
const Commander = window.httpVueLoader('./components/Commander.vue')
const Contact = window.httpVueLoader('./components/Contact.vue')
const Reserver = window.httpVueLoader('./components/Reserver.vue')

const routes = [
  { path: '/', component: Accueil },
  { path: '/propos', component: Propos },
  { path: '/menus', component: Menus },
  { path: '/commander', component: Commander },
  { path: '/contact', component: Contact },
  { path: '/reserver', component: Reserver },
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    menus: [],
    user: {
      id: null,
      email: null,
      nom: null,
      telephone: null
    }
  },
  async mounted () {
    const res = await axios.get('/api/menus')
    this.menus = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
    const res3 = await axios.get('/api/me')
    this.user.id = res3.data
  },
  methods: {
    async register (user) {
      await axios.post('/api/register/','email=' + user.email + '&password=' + user.password)
    },
    async login (user) {
      await axios.post('/api/login/','email=' + user.email + '&password=' + user.password)
      const res3 = await axios.get('/api/me')
      this.user.id = res3.data
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
    async addToPanier (menuId) {
      if (this.panier.menus.find(a => a.id === menuId) === undefined){
        const res = await axios.post('/api/panier','id='+ menuId + '&quantity=1')
        this.panier.menus.push(res.data)
      }
    },
    async removeFromPanier (menuId) {
      await axios.delete('/api/panier/' + menuId)
      const index = this.panier.menus.findIndex(a => a.id === menuId)
      this.panier.menus.splice(index, 1)
    },
    async updateMenuFromPanier (newMenu) {
      await axios.put('/api/panier/' + newMenu.id, newMenu)
      const article = this.panier.menus.find(a => a.id === newMenu.id)
      article.quantity = newMenu.quantity
    },
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.menus.push(res.data)
    },
    async updateMenu (newMenu) {
      await axios.put('/api/article/' + newMenu.id, newMenu)
      const article = this.menus.find(a => a.id === newMenu.id)
      article.name = newMenu.name
      article.description = newMenu.description
      article.image = newMenu.image
      article.price = newMenu.price
    },
    async deleteMenu (menuId) {
      await axios.delete('/api/article/' + menuId)
      const index = this.menus.findIndex(a => a.id === menuId)
      this.menus.splice(index, 1)
    }
  }
})
