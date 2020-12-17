const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Menus = window.httpVueLoader('./components/Menus.vue')
const Commander = window.httpVueLoader('./components/Commander.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Reserver = window.httpVueLoader('./components/Reservation.vue')

const routes = [
  { path: '/', component: Accueil },
  { path: '/menus', component: Menus },
  { path: '/commander', component: Commander },
  { path: '/panier', component: Panier },
  { path: '/connexion', component: Connexion},
  { path: '/reserver', component: Reserver}
]

const router = new VueRouter({
  routes,
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    menus: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      menus: []
    },
    user: {
      nom: null,
      id: null
    },
    admin: {
      id: null
    },
    reservations: []
  },
  async mounted () {
    const res = await axios.get('/api/menus')
    this.menus = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
    const res3 = await axios.get('/api/me')
    this.admin.id = res3.data.admin
    this.user.id = res3.data.user
  },
  methods: {

    async register (user) {
      await axios.post('/api/register/','nom=' + user.nom + '&email=' + user.email + '&password=' + user.password +  '&prenom=' + user.prenom + '&telephone=' + user.telephone)
    },
    async login (user) {
      await axios.post('/api/login/','email=' + user.email + '&password=' + user.password)
      const res = await axios.get('/api/me')
        this.admin.id = res.data.admin
        this.user.id = res.data.user
    },
    async adminLogin (admin) {
      await axios.post('/api/adminlogin/','id=' + admin.email + '&password=' + admin.password)
      const res = await axios.get('/api/me')
      this.admin.id = res.data.admin
      this.user.id = res.data.user
    },

    async reserver (reservation) {
      const res = await axios.post('/api/reservation/','date=' + reservation.date + '&heure=' + reservation.heure + '&personnes=' + reservation.personnes)
      this.reservations.push(res.data)
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
        router.push('/connexion')
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
    async addMenu (menu) {
      const res = await axios.post('/api/menu', menu)
      if(res.data.type == "soups") {
        this.menus[0].push(res.data)
      } else if (res.data.type == "dumplings") {
        this.menus[1].push(res.data)
      } else {
        this.menus[2].push(res.data)
      }

    },
    async updateMenu (newMenu) {
      await axios.put('/api/menu/' + newMenu.type + '/' +  newMenu.id, newMenu)
      if(newMenu.type == "soups") {
        const menu = this.menus[0].find(a => a.id === newMenu.id)
        this.menus[0].splice(index, 1)
      } else if (newMenu.type  == "dumplings") {
        const menu = this.menus[1].find(a => a.id === newMenu.id)
        this.menus[1].splice(index, 1)
      } else {
        const menu = this.menus[2].find(a => a.id === newMenu.id)
        this.menus[2].splice(index, 1)
      }
      menu.name = newMenu.name
      menu.description = newMenu.description
      menu.image = newMenu.image
      menu.price = newMenu.price
    },
    async deleteMenu (content) {
      await axios.delete('/api/menu/' + content.type + '/' + content.id)
      if(content.type == "soups") {
        const index = this.menus[0].findIndex(a => a.id === content.id)
        this.menus[0].splice(index, 1)
      } else if (content.type  == "dumplings") {
        const index = this.menus[1].findIndex(a => a.id === content.id)
        this.menus[1].splice(index, 1)
      } else {
        const index = this.menus[2].findIndex(a => a.id === content.id)
        this.menus[2].splice(index, 1)
      }
    }
  }
})
