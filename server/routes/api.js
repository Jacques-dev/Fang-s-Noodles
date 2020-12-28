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
      this.soups = []
      this.dumplings = []
      this.noodles = []
      this.sashimi = []
      this.nigiri = []
    }
  }


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
    req.session.userId = null
    req.session.adminId = null

    const email = req.body.email
    const password = req.body.password
    const hash = await bcrypt.hash(password, 10)

    const sql = "SELECT password FROM users WHERE email=$1"
    const result = await client.query({
      text: sql,
      values: [email]
    })

    // console.log(result)

    if (result.rowCount == 1) {
      const hashedPassword = result.rows[0].password

      if (await bcrypt.compare(password, hashedPassword)) {

        const sqlId = "SELECT id, nom, prenom, email, telephone FROM users WHERE email=$1"
        const result2 = await client.query({
          text: sqlId,
          values: [email]
        })

        req.session.userName = result2.rows[0].nom
        req.session.userEmail = result2.rows[0].email
        req.session.userFirstName = result2.rows[0].prenom
        req.session.userTelephone = result2.rows[0].telephone


        req.session.userId = result2.rows[0].id
        req.session.reservationId = 0
        const log = {
          nom: req.session.userName,
          email: req.session.userEmail,
          prenom: req.session.userFirstName,
          telephone: req.session.userTelephone
        }
        res.json(log)

      } else {
        res.status(400).json({ message: "wrong password" })
      }
    } else {
      res.status(400).json({ message: "no such user exist" })
    }
  })

  router.post('/adminlogin', async (req, res) => {

    req.session.userId = null
    req.session.adminId = null

    const id = req.body.id
    const password = req.body.password

    const sql = "SELECT password FROM admin WHERE id=$1"
    const result = await client.query({
      text: sql,
      values: [id]
    })

    if (result.rowCount == 1) {
      const hashedPassword = result.rows[0].password

      if (await bcrypt.compare(password, hashedPassword)) {

        const sqlId = "SELECT id FROM admin WHERE id=$1"
        const result2 = await client.query({
          text: sqlId,
          values: [id]
        })

        req.session.adminId = result2.rows[0].id
        res.send()

      } else {
        res.status(400).json({ message: "wrong password" })
      }
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

  router.get('/me', (req, res) => {
    if (req.session.userId) {
      const log = {
        admin: req.session.adminId,
        user: req.session.userId
      }
      res.status(200).json(log)
    } else if (req.session.adminId) {
      const log = {
        admin: req.session.adminId,
        user: req.session.userId
      }
      res.status(201).json(log)
    } else {
      res.status(401).json({ message: "not logged" })
    }
  })

  router.post('/reservation', async (req, res) => {
    if (req.session.userId) {

      const date = req.body.date
      const heure = req.body.heure
      const personnes = parseInt(req.body.personnes)

      const reserv = {
        id: req.session.reservationId + 1,
        date: date,
        heure: heure,
        personnes: personnes
      }

      res.json(reserv)
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
      from: 'noreply@domain.com',
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

    if (menuQte <= 0) {
      res.status(400).json({ message: "bad request" })
    }

    if (menuType == "soups") {
      var menu = menus[0].find(a => a.id === menuId)
    } else if (menuType == "dumplings") {
      var menu = menus[1].find(a => a.id === menuId)
    } else if (menuType =="noodles") {
      var menu = menus[2].find(a => a.id === menuId)
    } else if (menuType =="sashimi") {
      var menu = menus[3].find(a => a.id === menuId)
    } else if (menuType =="nigiri") {
      var menu = menus[4].find(a => a.id === menuId)
    }

    if (!menu) {
      res.status(501).json({ message: 'menu non existant' })
    } else {
      var newMenu = {
        id: menuId,
        quantity: menuQte,
        prix: menuPrix
      }

      req.session.panier.nb_menus = req.session.panier.nb_menus + newMenu.quantity
      req.session.panier.prix = req.session.panier.prix + newMenu.prix

      if (menuType == "soups") {
        req.session.panier.soups.push(newMenu)
      } else if (menuType == "dumplings") {
        req.session.panier.dumplings.push(newMenu)
      } else if (menuType == "noodles") {
        req.session.panier.noodles.push(newMenu)
      } else if (menuType == "sashimi") {
        req.session.panier.sashimi.push(newMenu)
      } else if (menuType == "nigiri") {
        req.session.panier.nigiri.push(newMenu)
      }
      res.json(newMenu)
    }
  })

  /*
   * Cette route doit supprimer un menu dans le panier
   */
 router.delete('/panier/:type/:id', (req, res) => {
   const menuId = parseInt(req.params.id)
   const menuType = req.params.type

   var index = null
   var menu = null

   if (menuType == "soups") {
     index = req.session.panier.soups.findIndex(a => a.id === menuId)
     menu = req.session.panier.soups.find(a => a.id === menuId)
   } else if (menuType == "dumplings") {
     index = req.session.panier.dumplings.findIndex(a => a.id === menuId)
     menu = req.session.panier.dumplings.find(a => a.id === menuId)
   } else if(menuType =="noodles") {
     index = req.session.panier.noodles.findIndex(a => a.id === menuId)
     menu = req.session.panier.noodles.find(a => a.id === menuId)
   } else if(menuType =="sashimi") {
     index = req.session.panier.sashimi.findIndex(a => a.id === menuId)
     menu = req.session.panier.sashimi.find(a => a.id === menuId)
   } else if(menuType =="nigiri") {
     index = req.session.panier.nigiri.findIndex(a => a.id === menuId)
     menu = req.session.panier.nigiri.find(a => a.id === menuId)
   }

   if (isNaN(menuId)) {
     res.status(400).json({ message: 'Requête incorrecte' })
   } else if (index === -1) {
     res.status(501).json({ message: "L'menu n'est pas dans le panier" })
   } else {
     if (menuType == "soups") {
       req.session.panier.soups.splice(index, 1)
     } else if (menuType == "dumplings") {
       req.session.panier.dumplings.splice(index, 1)
     } else if (menuType == "noodles") {
       req.session.panier.noodles.splice(index, 1)
     } else if (menuType == "sashimi") {
       req.session.panier.sashimi.splice(index, 1)
     } else if (menuType == "nigiri") {
       req.session.panier.nigiri.splice(index, 1)
     }

     req.session.panier.nb_menus = req.session.panier.nb_menus - menu.quantity
     req.session.panier.prix = req.session.panier.prix - (menu.quantity * menu.prix)
     res.json(menu)
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

    if (menuType == "soups") {
      index = req.session.panier.soups.findIndex(a => a.id === menuId)
    } else if (menuType == "dumplings") {
      index = req.session.panier.dumplings.findIndex(a => a.id === menuId)
    } else if (menuType = "noodles") {
      index = req.session.panier.noodles.findIndex(a => a.id === menuId)
    } else if (menuType == "sashimi") {
      index = req.session.panier.sashimi.findIndex(a => a.id === menuId)
    } else if (menuType = "nigiri") {
      index = req.session.panier.nigiri.findIndex(a => a.id === menuId)
    }

    if (isNaN(menuId)) {
      res.status(400).json({ message: 'Requête incorrecte' })
    } else if (index === -1) {
      res.status(501).json({ message: "L'menu n'est pas dans le panier" })
    } else {
      if (menuType == "soups") {
        req.session.panier.soups.quantity = menuQte
      } else if (menuType == "dumplings") {
        req.session.panier.dumplings.quantity = menuQte
      } else if(menuType =="noodles") {
        req.session.panier.noodles.quantity = menuQte
      } else if (menuType == "sashimi") {
        req.session.panier.sashimi.quantity = menuQte
      } else if(menuType == "nigiri") {
        req.session.panier.nigiri.quantity = menuQte
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
      const log = {
        panier: req.session.panier
      }
      res.status(200).json(log)
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
    const image = req.body.image
    const price = parseInt(req.body.price)
    const spicy = (req.body.spicy == 'true')

    const menu = {
      id: menus.length + 1,
      name: name,
      description: description,
      image: image,
      price: price,
      spicy: spicy
    }
    menus.push(menu)
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

    if(req.menuType == "soups") {
      const menu = menus[0].find(a => a.id === req.menuId)
      req.menu = menu
      req.type = menuType
    } else if (req.menuType  == "dumplings") {
      const menu = menus[1].find(a => a.id === req.menuId)
      req.menu = menu
      req.type = menuType
    } else if (req.menuType  == "noodles") {
      const menu = menus[2].find(a => a.id === req.menuId)
      req.menu = menu
      req.type = menuType
    } else if (req.menuType  == "sashimi") {
      const menu = menus[3].find(a => a.id === req.menuId)
      req.menu = menu
      req.type = menuType
    } else if (req.menuType  == "nigiri") {
      const menu = menus[4].find(a => a.id === req.menuId)
      req.menu = menu
      req.type = menuType
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
    if(req.menuType == "soups") {
      const index = menus[0].findIndex(a => a.id === req.menuId)
      menus[0].splice(index, 1)
    } else if (req.menuType  == "dumplings") {
      const index = menus[1].findIndex(a => a.id === req.menuId)
      menus[1].splice(index, 1)
    } else if (req.menuType  == "noodles") {
      const index = menus[2].findIndex(a => a.id === req.menuId)
      menus[2].splice(index, 1)
    } else if (req.menuType  == "sashimi") {
      const index = menus[3].findIndex(a => a.id === req.menuId)
      menus[3].splice(index, 1)
    } else if (req.menuType  == "nigiri") {
      const index = menus[4].findIndex(a => a.id === req.menuId)
      menus[4].splice(index, 1)
    }

    res.send()
  })

module.exports = router
