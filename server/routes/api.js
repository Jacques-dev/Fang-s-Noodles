  const express = require('express')
  const router = express.Router()
  const menus = require('../data/menus.js')
  const bcrypt = require('bcrypt')
  const { Client } = require('pg')

  const nodemailer = require('nodemailer');

  const client = new Client({
   user: 'postgres',
   host: 'localhost',
   password: 'Tellier_Souadji',
   database: 'Fang-s-Noodles'
  })

  client.connect()

  class Panier {
    constructor () {
      this.createdAt = new Date()
      this.updatedAt = new Date()
      this.nb_menus = 0
      this.prix = 0
      this.menus = []
    }
  }


  router.get('/setdatas', async (req, res) => {
    req.session.typesString = ["soups", "dumplings", "noodles", "sashimi", "nigiri"]
    res.send()
  })

  router.post('/register', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const prenom = req.body.prenom
    const nom = req.body.nom
    const telephone = req.body.telephone

    // console.log("email : " + email)
    // console.log("password : " + password)

    const sql = "SELECT * FROM users WHERE email=$1"


    const result = await client.query({
      text: sql,
      values: [email]
    })
    if (result.rowCount == 1) {
      res.status(400).json({ message: "this user already exist" })
    } else {
      const hash = await bcrypt.hash(password, 10)
      const insert = "INSERT INTO users (nom ,prenom, telephone, email, password) VALUES ($1, $2, $3, $4, $5)"

      const result2 = await client.query({
        text: insert,
        values: [nom, prenom, telephone, email, hash]
      })
      res.send()
    }
  })

  router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const hash = await bcrypt.hash(password, 10)

    const sql = "SELECT password FROM users WHERE email=$1"
    const result = await client.query({
      text: sql,
      values: [email]
    })

    if (result.rowCount == 1) {
      const hashedPassword = result.rows[0].password

      if (await bcrypt.compare(password, hashedPassword)) {

        const sqlId = "SELECT id, nom, prenom, email, telephone FROM users WHERE email=$1"
        const result2 = await client.query({
          text: sqlId,
          values: [email]
        })

        req.session.adminId = null
        req.session.userId = result2.rows[0].id
        req.session.userName = result2.rows[0].nom
        req.session.userEmail = result2.rows[0].email
        req.session.userFirstName = result2.rows[0].prenom
        req.session.userTelephone = result2.rows[0].telephone
        req.session.reservationId = 0

        res.status(200).json({ message: "well logged as user" })

      } else {
        res.status(400).json({ message: "wrong password" })
      }
    } else {
      res.status(400).json({ message: "no such user exist" })
    }
  })

  router.post('/adminlogin', async (req, res) => {

    const id = req.body.id
    const password = req.body.password

    const sql = "SELECT password FROM admin WHERE id=$1"
    const result = await client.query({
      text: sql,
      values: [id]
    })

    if (result.rowCount == 1) {
      const hashedPassword = result.rows[0].password

      // if (await bcrypt.compare(password, hashedPassword)) {

        const sqlId = "SELECT id FROM admin WHERE id=$1"
        const result2 = await client.query({
          text: sqlId,
          values: [id]
        })

        req.session.adminId = result2.rows[0].id
        req.session.userId = null
        req.session.userName = null
        req.session.userEmail = null
        req.session.userFirstName = null
        req.session.userTelephone = null

        res.status(200).json({ message: "well logged as admin" })

      // } else {
      //   res.status(400).json({ message: "wrong password" })
      // }
    } else {
      res.status(400).json({ message: "no such user exist" })
    }
  })

  router.post('/logout', async (req, res) => {
    req.session.userId = null
    req.session.adminId = null
    req.session.userName = null
    req.session.userEmail = null
    req.session.userFirstName = null
    req.session.userTelephone = null
    req.session.panier = new Panier()
    const log = {
      admin: req.session.adminId,
      user: req.session.userId,
      nom: req.session.userName,
      email: req.session.userEmail,
      prenom: req.session.userFirstName,
      telephone: req.session.userTelephone,
      panier: req.session.panier
    }
    res.json(log)
  })

  router.get('/me', async (req, res) => {

    if (req.session.userId || req.session.adminId) {

      var reserv = []

      if (req.session.userId) {
        const select = "SELECT * FROM reservation WHERE client=$1"
        const result = await client.query({
          text: select,
          values: [req.session.userId]
        })

        for (let i = 0; i < result.rows.length; i++) {
          result.rows[i].date = new Date(result.rows[i].date).toString().slice(0,15)
        }
        reserv = result.rows
      }

      const log = {
        admin: req.session.adminId,
        user: req.session.userId,
        nom: req.session.userName,
        email: req.session.userEmail,
        prenom: req.session.userFirstName,
        telephone: req.session.userTelephone,
        reservations: reserv
      }
      res.json(log)
    } else {
      res.status(401).json({ message: "not logged" })
    }
  })

  router.put('/user', async (req, res) => {
    var nom = req.body.nom
    var prenom = req.body.prenom
    var email = req.body.email
    var telephone = req.body.telephone
    if (!nom) {
      nom = req.session.userName
    }
    if (!prenom) {
      prenom = req.session.userFirstName
    }
    if (!email) {
      email = req.session.userEmail
    }
    if (!telephone) {
      telephone = req.session.userTelephone
    }
    req.session.userName = nom
    req.session.userFirstName = prenom
    req.session.userEmail = email
    req.session.userTelephone = telephone

    const update = "UPDATE users SET nom = $1, prenom = $2, email = $3, telephone = $4 WHERE email=$3"
    const result = await client.query({
      text: update,
      values: [nom, prenom, email, telephone]
    })

    res.send()
  })

  router.post('/reservation', async (req, res) => {

    if (req.session.userId) {

      const date = req.body.date
      const heure = req.body.heure
      const personnes = req.body.personnes


      const insert = "INSERT INTO reservation (date, heure, personnes, client) VALUES ($1, $2, $3, $4)"

      const result = await client.query({
        text: insert,
        values: [date, heure, personnes, req.session.userId]
      })

      res.send()

      const reserv = {
        id: req.session.reservationId + 1,
        date: date,
        heure: heure,
        personnes: personnes
      }

      res.status(200).json(reserv)

    } else {
      res.status(401).json({ message: "not logged" })
    }
  })

  router.post('/sendemail', async (req, res) => {
    var transporter = nodemailer.createTransport({
      port: 3000,
      host: 'localhost',
      tls: {
        rejectUnauthorized: false
      },
    });

    var mailOptions = {
      from: '',
      to: req.session.userEmail,
      subject: "Votre réservation sur Fang's Noodles",
      text: 'M./Mme. + ' + req.session.userName,
      html: "<p>Merci d'avoir réservé une table chez Fang's Noodles.</p>"
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  })

  /**
   * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
   * Ces requêtes concernent l'ajout ou la suppression d'menus sur le site
   * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
   *
   * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
   * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
   */

  /**
   * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
   */
  router.use((req, res, next) => {
    // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
    if (typeof req.session.panier === 'undefined') {
      req.session.panier = new Panier()
    }
    next()
  })

  /*
   * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
   */
  router.get('/panier', (req, res) => {
    res.json(req.session.panier)
  })

  /*
   * Cette route doit ajouter un menu au panier, puis retourner le panier modifié à l'utilisateur
   * Le body doit contenir l'id de l'menu, ainsi que la quantité voulue
   */
  router.post('/panier', (req, res) => {
    const menuId = parseInt(req.body.id)
    const menuQte = parseInt(req.body.quantity)
    const menuPrix = parseInt(req.body.prix)
    const menuType = req.body.type
    const menuImage = req.body.image

    if (menuQte <= 0) {
      res.status(400).json({ message: "bad request" })
    }

    const size = parseInt(req.session.typesString.length)
    for (let i = 0; i != size; i++) {
      if (menuType == req.session.typesString[i]) {
        var menu = menus[i].find(a => a.id === menuId)
      }
    }

    if (!menu) {
      res.status(501).json({ message: 'menu non existant' })
    } else {
      var newMenu = {
        id: menuId,
        quantity: menuQte,
        prix: menuPrix,
        type: menuType,
        image: menuImage
      }

      req.session.panier.nb_menus = req.session.panier.nb_menus + newMenu.quantity
      req.session.panier.prix = req.session.panier.prix + newMenu.prix

      const size = parseInt(req.session.typesString.length)
      for (let i = 0; i != size; i++) {
        if (menuType == req.session.typesString[i]) {
          if (checkIfNotMenuExistInPanier(newMenu.id, newMenu.type, req.session.panier.menus)) {
            req.session.panier.menus.push(newMenu)
            res.json(newMenu)
          }
        }
      }
    }
  })

  function checkIfNotMenuExistInPanier (id, type, menus) {
    var bool = true
    for (let i = 0; i != menus.length; i++) {
      if (menus[i].type == type) {
        if (menus[i].id == id) {
          bool = false
        }
      }
    }
    return bool
  }
  function menuInPanier (id, type, menus) {
    for (let i = 0; i != menus.length; i++) {
      if (menus[i].type == type) {
        if (menus[i].id == id) {
          return menus[i]
        }
      }
    }
  }
  function indexMenuInPanier (id, type, menus) {
    var index = 0
    for (let i = 0; i != menus.length; i++) {
      if (menus[i].type == type) {
        if (menus[i].id == id) {
          return index
        }
      }
      index ++
    }
  }

  /*
   * Cette route doit supprimer un menu dans le panier
   */
  router.delete('/panier/:type/:id', (req, res) => {
   const menuId = parseInt(req.params.id)
   const menuType = req.params.type

   var index = null
   var menu = null

   const size = parseInt(req.session.typesString.length)
   for (let i = 0; i != size; i++) {
     if (menuType == req.session.typesString[i]) {
       index = indexMenuInPanier (menuId, menuType, req.session.panier.menus)
       menu = menuInPanier (menuId, menuType, req.session.panier.menus)
     }
   }

   if (isNaN(menuId)) {
     res.status(400).json({ message: 'Requête incorrecte' })
   } else if (index === -1) {
     res.status(501).json({ message: "L'menu n'est pas dans le panier" })
   } else {
     const size = parseInt(req.session.typesString.length)
     for (let i = 0; i != size; i++) {
       if (menuType == req.session.typesString[i]) {
         req.session.panier.menus.splice(index, 1)
       }
     }

     req.session.panier.nb_menus = req.session.panier.nb_menus - menu.quantity
     req.session.panier.prix = req.session.panier.prix - (menu.quantity * menu.prix)
     res.json(index)
   }
  })

  /*
   * Cette route doit permettre de changer la quantité d'un menu dans le panier
   * Le body doit contenir la quantité voulue
   */
  router.put('/panier/:type/:id/:quantity', (req, res) => {
    const menuId = parseInt(req.params.id)
    const menuQte = parseInt(req.params.quantity)
    const menuType = req.params.type

    var index = null

    const size = parseInt(req.session.typesString.length)
    for (let i = 0; i != size; i++) {
      if (menuType == req.session.typesString[i]) {
        index = indexMenuInPanier (menuId, menuType, req.session.panier.menus)
      }
    }

    if (isNaN(menuId)) {
      res.status(400).json({ message: 'Requête incorrecte' })
    } else if (index === -1) {
      res.status(501).json({ message: "L'menu n'est pas dans le panier" })
    } else {
      const size = req.session.panier.menus.length
      for (let i = 0; i != size; i++) {
        req.session.panier.menus[i].quantity = menuQte
      }
      res.send()
    }
  })

  /*
   * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
   * Le panier est ensuite supprimé grâce à req.session.destroy()
   */
  router.post('/panier/commander', (req, res) => {

    if (req.session.userId) {
      req.session.panier = new Panier()
      res.status(200).json(req.session.panier)
    } else {
      res.status(401).json({ message: "not logged" })
    }
  })

  /**
   * Cette route envoie l'intégralité des menus du site
   */
  router.get('/menus', (req, res) => {
    res.json(menus)
  })

  /**
 * Cette route crée un menu.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'menu ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
  router.post('/menu', (req, res) => {
    const name = req.body.name
    const description = req.body.description
    var image
    const price = parseInt(req.body.price)
    const spicy = (req.body.spicy == 'true')
    const type = req.body.type

    if (!req.body.image) {
      image = '../images/black.jpg'
    } else {
      image = req.body.image
    }

    var size
    for (let i = 0; i != parseInt(req.session.typesString.length); i++) {
      if (type == req.session.typesString[i]) {
        size = menus[i].length
      }
    }

    const menu = {
      id: size + 1,
      name: name,
      description: description,
      image: image,
      price: price,
      spicy: spicy,
      type: type
    }
    for (let i = 0; i != parseInt(req.session.typesString.length); i++) {
      if (type == req.session.typesString[i]) {
        menus[i].push(menu)
      }
    }

    // on envoie l'menu ajouté à l'utilisateur
    res.json(menu)
  })

  /**
 * Cette fonction fait en sorte de valider que l'menu demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /menu/:menuId
 * - PUT /menu/:menuId
 * - DELETE /menu/:menuId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
  function parseMenu (req, res, next) {
    const menuId = parseInt(req.params.id)
    const menuType = req.params.type

    // si menuId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
    if (isNaN(menuId)) {
      res.status(400).json({ message: 'menuId should be a number' })
      return
    }
    // on affecte req.menuId pour l'exploiter dans toutes les routes qui en ont besoin
    req.menuId = menuId
    req.menuType = menuType

    const size = parseInt(req.session.typesString.length)
    for (let i = 0; i != size; i++) {
      if (req.menuType == req.session.typesString[i]) {
        const menu = menus[i].find(a => a.id === req.menuId)
        req.menu = menu
        req.type = menuType

      }
    }

    if (!req.menu) {
      res.status(404).json({ message: 'menu ' + menuId + ' does not exist' })
      return
    }

    next()
  }

  router.route('/menu/:type/:id')
  /**
   * Cette route envoie un menu particulier
   */
  .get(parseMenu, (req, res) => {
    // req.menu existe grâce au middleware parsemenu
    res.json(req.menu)
  })

  /**
   * Cette route modifie un menu.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'menu disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseMenu, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)
    const spicy = req.body.spicy

    req.menu.name = name
    req.menu.description = description
    req.menu.image = image
    req.menu.price = price
    req.body.spicy = spicy
    res.send()
  })

  .delete(parseMenu, (req, res) => {
    const size = parseInt(req.session.typesString.length)
    for (let i = 0; i != size; i++) {
      if (req.menuType == req.session.typesString[i]) {
        const index = menus[i].findIndex(a => a.id === req.menuId)
        menus[i].splice(index, 1)
      }
    }

    res.send()
  })

module.exports = router
