const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Menus = window.httpVueLoader('./components/Menus.vue')
const Commander = window.httpVueLoader('./components/Commander.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Deconnexion = window.httpVueLoader('./components/Deconnexion.vue')
const Reserver = window.httpVueLoader('./components/Reservation.vue')
const Profil = window.httpVueLoader('./components/Profil.vue')

const routes = [
  { path: '/', component: Accueil },
  { path: '/menus', component: Menus },
  { path: '/commander', component: Commander},
  { path: '/connexion', component: Connexion},
  { path: '/deconnexion', component: Deconnexion},
  { path: '/profil', component: Profil},
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
      menus: []
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
    typesString: ["soups", "dumplings", "noodles", "sashimi", "nigiri"]
  },
  async mounted () {
    const res_menus = await axios.get('/api/menus')
    this.menus = res_menus.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data

    await axios.post('/api/setdatas', 'typesString=' + this.typesString)

    const res3 = await axios.get('/api/me')
    this.admin.id = res3.data.admin
    this.user.id = res3.data.user
    this.user.nom = res3.data.nom
    this.user.email = res3.data.email
    this.user.prenom = res3.data.prenom
    this.user.telephone = res3.data.telephone
    this.user.reservations = res3.data.reservations

  },
  methods: {
    // Permet de s'enregistrer
    async register (user) {
      try {
        await axios.post('/api/register/','nom=' + user.nom + '&email=' + user.email + '&password=' + user.password +  '&prenom=' + user.prenom + '&telephone=' + user.telephone)
        router.push('/connexion')
      } catch (e) {
        asAlertMsg({
          type: "warning",
          title: "Attention",
          message: "Cette adresse mail existe déjà"
        })
      }
    },
    // Permet de se connecter en tant que client
    async login (user) {
      await axios.post('/api/login/','email=' + user.email + '&password=' + user.password)

      const res = await axios.get('/api/me')
      this.admin.id = res.data.admin
      this.user.id = res.data.user
      this.user.nom = res.data.nom
      this.user.email = res.data.email
      this.user.prenom = res.data.prenom
      this.user.telephone = res.data.telephone
      this.user.reservations = res.data.reservations

      router.push('/')
    },
    // Permet de se connecter en tant qu'admin
    async adminLogin (admin) {
      await axios.post('/api/adminlogin/','id=' + admin.email + '&password=' + admin.password)

      const res = await axios.get('/api/me')
      this.admin.id = res.data.admin
      this.user.id = res.data.user
      this.user.nom = res.data.nom
      this.user.email = res.data.email
      this.user.prenom = res.data.prenom
      this.user.telephone = res.data.telephone
      this.user.reservations = res.data.reservations

      router.push('/')
    },
    // Permet de se déconnecter
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
    // Permet de modifier un profil
    async updateProfile (newUser) {
      await axios.put('/api/user/', 'nom=' + newUser.nom + '&prenom=' + newUser.prenom + '&email=' + newUser.email + '&telephone=' + newUser.telephone)
      const res = await axios.get('/api/me')
      this.user.nom = res.data.nom
      this.user.email = res.data.email
      this.user.prenom = res.data.prenom
      this.user.telephone = res.data.telephone
    },
    // Permet d'enregistrer une réservation
    async reserver (reservation) {
      if (this.user.id) {
        const res = await axios.post('/api/reservation','date=' + reservation.date + '&heure=' + reservation.heure + '&personnes=' + reservation.personnes)
        this.user.reservations.push(res.data)
        asAlertMsg({
          type: "success",
          title: "Validé",
          message: "Votre réservation a été prise en compte M./Mme. " + this.user.nom
        })
        router.push('/')
      } else {
        asAlertMsg({
          type: "warning",
          title: "Attention",
          message: "Veuillez vous connecter pour passer une commande"
        })
        router.push('/connexion')
      }
    },
    // Permet de simuler le passage d'une commande
    async commander () {
      if (this.user.id) {
        if (this.panier.menus.length != 0) {
          const res = await axios.post('/api/panier/commander')
          this.panier = res.data
          asAlertMsg({
            type: "success",
            title: "Validé",
            message: "Votre commande a été prise en compte M./Mme. " + this.user.nom
          })
          router.push('/')
        } else {
          asAlertMsg({
            type: "warning",
            title: "Attention",
            message: "Votre panier est vide !"
          })
        }
      } else {
        asAlertMsg({
          type: "warning",
          title: "Attention",
          message: "Veuillez vous connecter pour passer une commande"
        })
        router.push('/connexion')
      }
    },
    // Permet d'ajouter un menu au panier
    async addToPanier (menu) {
      for (let i = 0; i != this.typesString.length; i++) {
        if (menu.type == this.typesString[i]) {
          const res = await axios.post('/api/panier','id=' + menu.id + '&type=' + menu.type + '&quantity=1' + '&prix=' + menu.prix + '&image=' + menu.image)
          this.panier.menus.push(res.data)

          this.panier.nb_menus = this.panier.nb_menus + 1
          this.panier.prix = this.panier.prix + res.data.prix
        }
      }
    },
    // Permet de supprimer un menu du panier
    async removeFromPanier (menu) {
      for (let i = 0; i != this.typesString.length; i++) {
        if (menu.type == this.typesString[i]) {
          const indexMenu = await axios.delete('/api/panier/' + menu.type + '/' + menu.id)
          this.panier.menus.splice(indexMenu.data, 1)
        }
      }

      var prix = 0
      var nb = 0

      for (let i = 0; i != this.panier.menus.length; i++) {
        prix += this.panier.menus[i].prix * this.panier.menus[i].quantity
        nb += parseInt(this.panier.menus[i].quantity)
      }
      this.panier.prix = prix
      this.panier.nb_menus = nb

    },
    // Permet de modifier la quantité d'un menu dans le panier
    async updateMenuFromPanier (newMenu) {
      for (let i = 0; i != this.typesString.length; i++) {
        if (newMenu.type == this.typesString[i]) {

          await axios.put('/api/panier/' + newMenu.type + '/' + newMenu.id + '/' + newMenu.quantity)

          for (let i = 0; i != this.panier.menus.length; i++) {
            if (this.panier.menus[i].type == newMenu.type) {
              if (this.panier.menus[i].id == newMenu.id) {
                this.panier.menus[i].quantity = newMenu.quantity
              }
            }
          }

        }
      }

      var prix = 0
      var nb = 0

      for (let i = 0; i != this.panier.menus.length; i++) {
        prix += this.panier.menus[i].prix * this.panier.menus[i].quantity
        nb += parseInt(this.panier.menus[i].quantity)
      }
      this.panier.prix = prix
      this.panier.nb_menus = nb
    },
    // Permet d'ajouter un menu à la liste des menus du sites
    async addMenu (menu) {
      const res = await axios.post('/api/menu', menu)

      for (let i = 0; i != this.typesString.length; i++) {
        if (res.data.type == this.typesString[i]) {
          this.menus[i].push(res.data)
        }
      }
    },
    // Permet de supprimer un menu depius la liste des menus du site
    async deleteMenu (content) {
      await axios.delete('/api/menu/' + content.type + '/' + content.id)
      for (let i = 0; i != this.typesString.length; i++) {
        if (content.type == this.typesString[i]) {
          const index = this.menus[i].findIndex(a => a.id === content.id)
          this.menus[i].splice(index, 1)
        }
      }
    },
    // Permet de modifier un des menus du site
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
    }
  }
})
