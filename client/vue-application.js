const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Menus = window.httpVueLoader('./components/Menus.vue')
const Commander = window.httpVueLoader('./components/Commander.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Deconnexion = window.httpVueLoader('./components/Deconnexion.vue')
const Reserver = window.httpVueLoader('./components/Reservation.vue')

const routes = [
  { path: '/', component: Accueil },
  { path: '/menus', component: Menus },
  { path: '/commander', component: Commander },
  { path: '/connexion', component: Connexion},
  { path: '/deconnexion', component: Deconnexion},
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
      soups: [],
      dumplings: [],
      noodles: []
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
      router.push('/connexion')
    },
    async login (user) {
      await axios.post('/api/login/','email=' + user.email + '&password=' + user.password)
      const res = await axios.get('/api/me')
      this.admin.id = res.data.admin
      this.user.id = res.data.user
      router.push('/')
    },
    async adminLogin (admin) {
      await axios.post('/api/adminlogin/','id=' + admin.email + '&password=' + admin.password)
      const res = await axios.get('/api/me')
      this.admin.id = res.data.admin
      this.user.id = res.data.user
      router.push('/')
    },
    async logout () {
      const res = await axios.post('/api/logout/')
      this.admin.id = res.data.admin
      this.user.id = res.data.user
      router.push('/')
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
    async addToPanier (menu) {
      if (menu.type == "soups") {
        if (this.panier.soups.find(a => a.id === menu.id) === undefined){
          const res1 = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1')
          this.panier.soups.push(res1.data)
        }
      } else if (menu.type == "dumplings") {
        if (this.panier.dumplings.find(a => a.id === menu.id) === undefined){
          const res2 = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1')
          this.panier.dumplings.push(res2.data)
        }
      } else {
        if (this.panier.noodles.find(a => a.id === menu.id) === undefined){
          const res3 = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1')
          this.panier.noodles.push(res3.data)
        }
      }
    },
    async removeFromPanier (menu) {
      if (menu.type == "soups") {
        await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
        const index = this.panier.soups.findIndex(a => a.id === menu.id)
        this.panier.soups.splice(index, 1)
      } else if (menu.type == "dumplings") {
        await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
        const index = this.panier.dumplings.findIndex(a => a.id === menu.id)
        this.panier.dumplings.splice(index, 1)
      } else {
        await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
        const index = this.panier.noodles.findIndex(a => a.id === menu.id)
        this.panier.noodles.splice(index, 1)
      }
    },
    async updateMenuFromPanier (newMenu) {
      await axios.put('/api/panier/' + newMenu.id, newMenu)
      const article = this.panier.find(a => a.id === newMenu.id)
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
    },
    async updateMenu (newMenu) {
      await axios.put('/api/menu/' + newMenu.type + '/' +  newMenu.id, newMenu)
      if(newMenu.type == "soups") {
        const menu = this.menus[0].find(a => a.id === newMenu.id)
        menu.name = newMenu.name
        menu.description = newMenu.description
        menu.image = newMenu.image
        menu.price = newMenu.price
      } else if (newMenu.type  == "dumplings") {
        const menu = this.menus[1].find(a => a.id === newMenu.id)
        menu.name = newMenu.name
        menu.description = newMenu.description
        menu.image = newMenu.image
        menu.price = newMenu.price
      } else {
        const menu = this.menus[2].find(a => a.id === newMenu.id)
        menu.name = newMenu.name
        menu.description = newMenu.description
        menu.image = newMenu.image
        menu.price = newMenu.price
      }
    }
  }
})
