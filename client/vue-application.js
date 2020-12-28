const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Menus = window.httpVueLoader('./components/Menus.vue')
const Commander = window.httpVueLoader('./components/Commander.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Deconnexion = window.httpVueLoader('./components/Deconnexion.vue')
const Reserver = window.httpVueLoader('./components/Reservation.vue')
const MesInfos = window.httpVueLoader('./components/MesInfos.vue')

const routes = [
  { path: '/', component: Accueil },
  { path: '/menus', component: Menus },
  { path: '/commander', component: Commander },
  { path: '/connexion', component: Connexion},
  { path: '/deconnexion', component: Deconnexion},
  { path: '/mesinfos', component: MesInfos},
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
      nb_menus: 0,
      prix: 0,
      soups: [],
      dumplings: [],
      noodles: []
    },
    user: {
      nom: null,
      prenom: null,
      email: null,
      telephone: null,
      id: null,
      reservations: []
    },
    admin: {
      id: null
    },
    typesString: ["soups", "dumplings", "noodles", "sashimi", "nigiri"],
    typesVar: ["this.panier.soups", "this.panier.dumplings", "this.panier.noodles", "this.panier.sashimi", "this.panier.nigiri"]
  },
  async mounted () {
    const res_menus = await axios.get('/api/menus')
    this.menus = res_menus.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
    await axios.get('/api/setdatas')
    const res3 = await axios.get('/api/me')
    this.admin.id = res3.data.admin
    this.user.id = res3.data.user
    this.user.reservations = res3.data.reservations

  },
  methods: {
    async register (user) {
      await axios.post('/api/register/','nom=' + user.nom + '&email=' + user.email + '&password=' + user.password +  '&prenom=' + user.prenom + '&telephone=' + user.telephone)
      router.push('/connexion')
    },
    async login (user) {
      const res1 = await axios.post('/api/login/','email=' + user.email + '&password=' + user.password)
      this.user.nom = res1.data.nom
      this.user.email = res1.data.email
      this.user.prenom = res1.data.prenom
      this.user.telephone = res1.data.telephone

      const res2 = await axios.get('/api/me')
      this.admin.id = res2.data.admin
      this.user.id = res2.data.user
      this.user.reservations = res2.data.reservations

      router.push('/')
    },
    async adminLogin (admin) {
      await axios.post('/api/adminlogin/','id=' + admin.email + '&password=' + admin.password)
      const res_menus = await axios.get('/api/me')
      this.admin.id = res_menus.data.admin
      this.user.id = res_menus.data.user
      router.push('/')
    },
    async logout () {
      const res_menus = await axios.post('/api/logout/')
      this.admin.id = res_menus.data.admin
      this.user.nom = res_menus.data.nom
      this.user.email = res_menus.data.email
      this.user.prenom = res_menus.data.prenom
      this.user.telephone = res_menus.data.telephone
      this.user.id = res_menus.data.user
      this.panier = res_menus.data.panier
      this.user.reservations = []
      router.push('/')
    },
    async reserver (reservation) {
      if (this.user.id) {
        const res = await axios.post('/api/reservation/','date=' + reservation.date + '&heure=' + reservation.heure + '&personnes=' + reservation.personnes)
        this.user.reservations.push(res.data)
        // await axios.post('api/sendemail/')
        alert("Votre réservation a été prise en compte M./Mme. " + this.user.nom)
        router.push('/')
      } else {
        alert("Veuillez vous connecter pour passer une commande")
        router.push('/connexion')
      }
    },

   async commander () {
      if (this.user.id) {
        const res = await axios.post('/api/panier/commander')
        this.panier = res.data
        alert("Votre commande a été prise en compte M./Mme. " + this.user.nom)
        router.push('/')
      } else {
        alert("Veuillez vous connecter pour passer une commande")
        router.push('/connexion')
      }
    },
    async addToPanier (menu) {
      for (let i = 0; i != this.typesString.length; i++) {
        if (menu.type == this.typesString[i]) {
          if (eval(this.typesVar[i]).find(a => a.id === menu.id) === undefined) {
            const res = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1' + '&prix=' + menu.prix)
            eval(this.typesVar[i]).push(res.data)
            this.panier.nb_menus = this.panier.nb_menus + 1
            this.panier.prix = this.panier.prix + res.data.prix
          }
        }
      }
      // if (menu.type == "soups") {
      //   if (this.panier.soups.find(a => a.id === menu.id) === undefined){
      //     const res1 = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1' + '&prix=' + menu.prix)
      //     this.panier.soups.push(res1.data)
      //     this.panier.nb_menus = this.panier.nb_menus + 1
      //     this.panier.prix = this.panier.prix + res1.data.prix
      //   }
      // } else if (menu.type == "dumplings") {
      //   if (this.panier.dumplings.find(a => a.id === menu.id) === undefined){
      //     const res2 = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1' + '&prix=' + menu.prix)
      //     this.panier.dumplings.push(res2.data)
      //     this.panier.nb_menus = this.panier.nb_menus + 1
      //     this.panier.prix = this.panier.prix + res2.data.prix
      //   }
      // } else if (menu.type == "noodles") {
      //   if (this.panier.noodles.find(a => a.id === menu.id) === undefined){
      //     const res3 = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1' + '&prix=' + menu.prix)
      //     this.panier.noodles.push(res3.data)
      //     this.panier.nb_menus = this.panier.nb_menus + 1
      //     this.panier.prix = this.panier.prix + res3.data.prix
      //   }
      // } else if (menu.type == "sashimi") {
      //   if (this.panier.sashimi.find(a => a.id === menu.id) === undefined){
      //     const res2 = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1' + '&prix=' + menu.prix)
      //     this.panier.sashimi.push(res2.data)
      //     this.panier.nb_menus = this.panier.nb_menus + 1
      //     this.panier.prix = this.panier.prix + res2.data.prix
      //   }
      // } else if (menu.type == "nigiri") {
      //   if (this.panier.nigiri.find(a => a.id === menu.id) === undefined){
      //     const res3 = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1' + '&prix=' + menu.prix)
      //     this.panier.nigiri.push(res3.data)
      //     this.panier.nb_menus = this.panier.nb_menus + 1
      //     this.panier.prix = this.panier.prix + res3.data.prix
      //   }
      // }
    },
    async removeFromPanier (menu) {
      for (let i = 0; i != this.typesString.length; i++) {
        if (menu.type == this.typesString[i]) {
          const deletedMenu = await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
          const index = eval(this.typesVar[i]).findIndex(a => a.id === menu.id)
          eval(this.typesVar[i]).splice(index, 1)
        }
      }

      var prix = 0
      var nb = 0
      const menus = [this.panier.soups, this.panier.dumplings, this.panier.noodles, this.panier.sashimi, this.panier.nigiri]

      for (let i = 0; i != menus.length; i++) {
        for (let j = 0; j != menus[i].length; j++) {
          prix += menus[i][j].prix * menus[i][j].quantity
          nb += parseInt(menus[i][j].quantity)
        }
      }
      this.panier.prix = prix
      this.panier.nb_menus = nb
      // if (menu.type == "soups") {
      //   const deletedMenu = await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
      //   const index = this.panier.soups.findIndex(a => a.id === menu.id)
      //   this.panier.soups.splice(index, 1)
      // } else if (menu.type == "dumplings") {
      //   const deletedMenu = await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
      //   const index = this.panier.dumplings.findIndex(a => a.id === menu.id)
      //   this.panier.dumplings.splice(index, 1)
      // } else if (menu.type == "noodles") {
      //   const deletedMenu = await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
      //   const index = this.panier.noodles.findIndex(a => a.id === menu.id)
      //   this.panier.noodles.splice(index, 1)
      // } else if (menu.type == "sashimi") {
      //   const deletedMenu = await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
      //   const index = this.panier.sashimi.findIndex(a => a.id === menu.id)
      //   this.panier.sashimi.splice(index, 1)
      // } else if (menu.type == "nigiri") {
      //   const deletedMenu = await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
      //   const index = this.panier.nigiri.findIndex(a => a.id === menu.id)
      //   this.panier.nigiri.splice(index, 1)
      // }


    },
    async updateMenuFromPanier (newMenu) {
      for (let i = 0; i != this.typesString.length; i++) {
        if (newMenu.type == this.typesString[i]) {
          await axios.put('/api/panier/' + newMenu.type + '/' + newMenu.id + '/' + newMenu.quantity)
          const menu = eval(this.typesVar[i]).find(a => a.id === newMenu.id)
          menu.quantity = newMenu.quantity
        }
      }

      var prix = 0
      var nb = 0
      const menus = [this.panier.soups, this.panier.dumplings, this.panier.noodles, this.panier.sashimi, this.panier.nigiri]

      for (let i = 0; i != menus.length; i++) {
        for (let j = 0; j != menus[i].length; j++) {
          prix += menus[i][j].prix * menus[i][j].quantity
          nb += parseInt(menus[i][j].quantity)
        }
      }
      this.panier.prix = prix
      this.panier.nb_menus = nb
      // if (newMenu.type == "soups") {
      //   await axios.put('/api/panier/' + newMenu.type + '/' + newMenu.id + '/' + newMenu.quantity)
      //   const menu = this.panier.soups.find(a => a.id === newMenu.id)
      //   menu.quantity = newMenu.quantity
      // } else if (newMenu.type == "dumplings") {
      //   await axios.put('/api/panier/' + newMenu.type + '/' + newMenu.id + '/' + newMenu.quantity)
      //   const menu = this.panier.dumplings.find(a => a.id === newMenu.id)
      //   menu.quantity = newMenu.quantity
      // } else if (newMenu.type == "noodles"){
      //   await axios.put('/api/panier/' + newMenu.type + '/' + newMenu.id + '/' + newMenu.quantity)
      //   const menu = this.panier.noodles.find(a => a.id === newMenu.id)
      //   menu.quantity = newMenu.quantity
      // } else if (newMenu.type == "sashimi") {
      //   await axios.put('/api/panier/' + newMenu.type + '/' + newMenu.id + '/' + newMenu.quantity)
      //   const menu = this.panier.sashimi.find(a => a.id === newMenu.id)
      //   menu.quantity = newMenu.quantity
      // } else if (newMenu.type == "nigiri"){
      //   await axios.put('/api/panier/' + newMenu.type + '/' + newMenu.id + '/' + newMenu.quantity)
      //   const menu = this.panier.nigiri.find(a => a.id === newMenu.id)
      //   menu.quantity = newMenu.quantity
      // }
    },
    async addMenu (menu) {
      const res = await axios.post('/api/menu', menu)

      for (let i = 0; i != this.typesString.length; i++) {
        if (res.data.type == this.typesString[i]) {
          this.menus[i].push(res.data)
        }
      }

      // if (res.data.type == "soups") {
      //   this.menus[0].push(res.data)
      // } else if (res.data.type == "dumplings") {
      //   this.menus[1].push(res.data)
      // } else if (res.data.type == "noodles"){
      //   this.menus[2].push(res.data)
      // } else if (res.data.type == "sashimi") {
      //   this.menus[3].push(res.data)
      // } else if (res.data.type == "nigiri"){
      //   this.menus[4].push(res.data)
      // }

    },
    async deleteMenu (content) {
      await axios.delete('/api/menu/' + content.type + '/' + content.id)
      for (let i = 0; i != this.typesString.length; i++) {
        if (content.type == this.typesString[i]) {
          const index = this.menus[i].findIndex(a => a.id === content.id)
          this.menus[i].splice(index, 1)
        }
      }
      // if(content.type == "soups") {
      //   const index = this.menus[0].findIndex(a => a.id === content.id)
      //   this.menus[0].splice(index, 1)
      // } else if (content.type  == "dumplings") {
      //   const index = this.menus[1].findIndex(a => a.id === content.id)
      //   this.menus[1].splice(index, 1)
      // } else if (content.type  == "noodles") {
      //   const index = this.menus[2].findIndex(a => a.id === content.id)
      //   this.menus[2].splice(index, 1)
      // } else if (content.type  == "sashimi") {
      //   const index = this.menus[3].findIndex(a => a.id === content.id)
      //   this.menus[1].splice(index, 1)
      // } else if (content.type  == "nigiri") {
      //   const index = this.menus[4].findIndex(a => a.id === content.id)
      //   this.menus[2].splice(index, 1)
      // }
    },
    async updateMenu (newMenu) {
      await axios.put('/api/menu/' + newMenu.type + '/' +  newMenu.id, newMenu)
      for (let i = 0; i != this.typesString.length; i++) {
        if (newMenu.type == this.typesString[i]) {
          const menu = this.menus[i].find(a => a.id === newMenu.id)
          menu.name = newMenu.name
          menu.description = newMenu.description
          menu.image = newMenu.image
          menu.price = newMenu.price
        }
      }
      // if(newMenu.type == "soups") {
      //   const menu = this.menus[0].find(a => a.id === newMenu.id)
      //   menu.name = newMenu.name
      //   menu.description = newMenu.description
      //   menu.image = newMenu.image
      //   menu.price = newMenu.price
      // } else if (newMenu.type  == "dumplings") {
      //   const menu = this.menus[1].find(a => a.id === newMenu.id)
      //   menu.name = newMenu.name
      //   menu.description = newMenu.description
      //   menu.image = newMenu.image
      //   menu.price = newMenu.price
      // } else if (newMenu.type  == "noodles") {
      //   const menu = this.menus[3].find(a => a.id === newMenu.id)
      //   menu.name = newMenu.name
      //   menu.description = newMenu.description
      //   menu.image = newMenu.image
      //   menu.price = newMenu.price
      // } else if (newMenu.type  == "sashimi") {
      //   const menu = this.menus[4].find(a => a.id === newMenu.id)
      //   menu.name = newMenu.name
      //   menu.description = newMenu.description
      //   menu.image = newMenu.image
      //   menu.price = newMenu.price
      // } else if (newMenu.type  == "nigiri") {
      //   const menu = this.menus[5].find(a => a.id === newMenu.id)
      //   menu.name = newMenu.name
      //   menu.description = newMenu.description
      //   menu.image = newMenu.image
      //   menu.price = newMenu.price
      // }
    }
  }
})
