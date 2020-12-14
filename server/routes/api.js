const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'Tellier_Souadji',
 database: 'TP5'
})

client.connect()

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
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
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
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
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */

router.post('/panier', (req, res) => {
  const articleId = parseInt(req.body.id)
  const articleQte = parseInt(req.body.quantity)

  if (articleQte <= 0) {
    res.status(400).json({ message: "bad request" })
  }

  const article = articles.find(a => a.id === articleId)
  if (!article) {
    res.status(501).json({ message: 'Article non existant' })
  } else {
    const newArticle = {
      id: articleId,
      quantity: articleQte
    }
    req.session.panier.articles.push(newArticle)
    res.json(newArticle)
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
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {
  const articleId = parseInt(req.params.articleId)
  const articleQte = parseInt(req.body.quantity)

  const index = req.session.panier.articles.findIndex(a => a.id === articleId)

  if (isNaN(articleId)) {
    res.status(400).json({ message: 'Requête incorrecte' })
  } else if (index === -1) {
    res.status(501).json({ message: "L'article n'est pas dans le panier" })
  } else {
    req.session.panier.articles.quantity = articleQte
    res.send()
  }
})

/*
 * Cette route doit supprimer un article dans le panier
 */
 router.delete('/panier/:articleId', (req, res) => {
   const articleId = parseInt(req.params.articleId)
   const index = req.session.panier.articles.findIndex(a => a.id === articleId)

   if (isNaN(articleId)) {
     res.status(400).json({ message: 'Requête incorrecte' })
   } else if (index === -1) {
     res.status(501).json({ message: "L'article n'est pas dans le panier" })
   } else {
     req.session.panier.articles.splice(index, 1)
     res.json(req.session.panier)
   }
 })

/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  res.json(articles)
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const article = {
    id: articles.length + 1,
    name: name,
    description: description,
    image: image,
    price: price
  }
  articles.push(article)
  // on envoie l'article ajouté à l'utilisateur
  res.json(article)
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)
    articles.splice(index, 1) // remove the article from the array
    res.send()
  })

module.exports = router
