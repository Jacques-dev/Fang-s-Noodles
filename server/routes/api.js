const express = require('express')
const router = express.Router()
const menus = require('../data/menus.js')

const bcrypt = require('bcrypt')
const { Client } = require('pg')

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
    this.menus = []
  }
}


router.post('/register', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // console.log("email : " + email)
  // console.log("password : " + password)

  const sql = "SELECT * FROM users WHERE email=$1"
  const result = await client.query({
    text: sql,
    values: [email]
  })
  // console.log('result', result.rowCount)
  if (result.rowCount == 1) {
    res.status(400).json({ message: "this user already exist" })
  } else {
    const hash = await bcrypt.hash(password, 10)
    const insert = "INSERT INTO users (email, password) VALUES ($1, $2)"

    const result2 = await client.query({
      text: insert,
      values: [email, hash]
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

  // console.log(result)

  if (result.rowCount == 1) {
    const hashedPassword = result.rows[0].password

    if (await bcrypt.compare(password, hashedPassword)) {

      if (req.session.userId) {
        res.status(401).json({ message: "user already logged" })
      } else {

        const sqlId = "SELECT id FROM users WHERE email=$1"
        const result2 = await client.query({
          text: sqlId,
          values: [email]
        })

        req.session.userId = result2.rows[0].id
        res.send()
      }

    } else {
      res.status(400).json({ message: "wrong password" })
    }
  } else {
    res.status(400).json({ message: "no such user exist" })
  }
})

router.get('/me', (req, res) => {

  if (req.session.userId) {
    res.json(req.session.userId)
  } else {
    res.status(401).json({ message: "not logged" })
  }

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

  if (menuQte <= 0) {
    res.status(400).json({ message: "bad request" })
  }

  const menu = menus.find(a => a.id === menuId)
  if (!menu) {
    res.status(501).json({ message: 'menu non existant' })
  } else {
    const newMenu = {
      id: menuId,
      quantity: menuQte
    }
    req.session.panier.menus.push(newMenu)
    res.json(newMenu)
  }
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {

  if (req.session.userId) {
    req.session.destroy()
    res.status(200).json({ message: "logged" })
  } else {
    res.status(401).json({ message: "not logged" })
  }
})

/*
 * Cette route doit permettre de changer la quantité d'un menu dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:menuId', (req, res) => {
  const menuId = parseInt(req.params.menuId)
  const menuQte = parseInt(req.body.quantity)

  const index = req.session.panier.menus.findIndex(a => a.id === menuId)

  if (isNaN(menuId)) {
    res.status(400).json({ message: 'Requête incorrecte' })
  } else if (index === -1) {
    res.status(501).json({ message: "L'menu n'est pas dans le panier" })
  } else {
    req.session.panier.menus.quantity = menuQte
    res.send()
  }
})

/*
 * Cette route doit supprimer un menu dans le panier
 */
 router.delete('/panier/:menuId', (req, res) => {
   const menuId = parseInt(req.params.menuId)
   const index = req.session.panier.menus.findIndex(a => a.id === menuId)

   if (isNaN(menuId)) {
     res.status(400).json({ message: 'Requête incorrecte' })
   } else if (index === -1) {
     res.status(501).json({ message: "L'menu n'est pas dans le panier" })
   } else {
     req.session.panier.menus.splice(index, 1)
     res.json(req.session.panier)
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
  const spicy = req.body.spicy

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      typeof spicy !== 'string' || spicy === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

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
  const menuId = parseInt(req.params.menuId)

  // si menuId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(menuId)) {
    res.status(400).json({ message: 'menuId should be a number' })
    return
  }
  // on affecte req.menuId pour l'exploiter dans toutes les routes qui en ont besoin
  req.menuId = menuId

  const menu = menus.find(a => a.id === req.menuId)
  if (!menu) {
    res.status(404).json({ message: 'menu ' + menuId + ' does not exist' })
    return
  }
  // on affecte req.menu pour l'exploiter dans toutes les routes qui en ont besoin
  req.menu = menu
  next()
}

router.route('/menu/:menuId')
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
    const index = menus.findIndex(a => a.id === req.menuId)
    menus.splice(index, 1) // remove the menu from the array
    res.send()
  })

module.exports = router
