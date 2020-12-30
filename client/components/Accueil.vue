<template>

  <div id ="page_entiere">

    <ul id="slider">
      <li><router-link to="/#first" title="Next Section"><img src="https://ianlunn.co.uk/plugins/jquery-parallax/images/dot.png" alt="Link" /></router-link></li>
      <li><router-link to="/#second" title="Next Section"><img src="https://ianlunn.co.uk/plugins/jquery-parallax/images/dot.png" alt="Link" /></router-link></li>
      <li><router-link to="/#third" title="Next Section"><img src="https://ianlunn.co.uk/plugins/jquery-parallax/images/dot.png" alt="Link" /></router-link></li>
      <li><router-link to="/#four" title="Next Section"><img src="https://ianlunn.co.uk/plugins/jquery-parallax/images/dot.png" alt="Link" /></router-link></li>
    </ul>

    <section id="first" class="container-fluid parallax">
      <section class="row h-75 justify-content-center align-items-center">
        <article class="h-100" id="title">
          <p>Saveur d'Asie</p>
        </article>
      </section>
      <section class="row h-60 align-items-center" id="typeMenu">
        <article class=" test col-sm-4 d-flex justify-content-center">
          <p class="titre_soups_noodles_dumpings">SOUPS</p>
          <p class ="description_soups_noodles_dumpings">Decouvrez nos delicieuses soupes</p>
          <img src="https://static.wixstatic.com/media/a84435_89b11410bc6b4875996a2f75ba5952af.png/v1/fill/w_302,h_375,al_c,q_85,usm_0.66_1.00_0.01/a84435_89b11410bc6b4875996a2f75ba5952af.webp">
        </article>
        <article class="test col-sm-4 d-flex justify-content-center">
          <p class="titre_soups_noodles_dumpings">NOODLES</p>
          <p class ="description_soups_noodles_dumpings">Decouvrez nos noodles faites maison</p>
          <img src="https://static.wixstatic.com/media/a84435_2094235a23f7450d868fb875a24df909.png/v1/fill/w_305,h_378,al_c,q_85,usm_0.66_1.00_0.01/a84435_2094235a23f7450d868fb875a24df909.webp">
        </article>
        <article class="test col-sm-4 d-flex justify-content-center">
          <p class="titre_soups_noodles_dumpings">DUMPLINGS</p>
          <p class ="description_soups_noodles_dumpings">Savourez nos dumplings</p>
          <img src="https://static.wixstatic.com/media/a84435_4a1b27357f47440490e1d36e28015ee1.png/v1/fill/w_303,h_376,al_c,q_85,usm_0.66_1.00_0.01/a84435_4a1b27357f47440490e1d36e28015ee1.webp%22%3E">
        </article>
        <article class="col-sm-12 d-flex justify-content-center">
          <router-link id="bouton_menus" class="btn" to='/menus/#titre_page'>Voir l'ensemble du menus</router-link>
        </article>
      </section>
    </section>

    <div id="second" class="container-fluid parallax">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-sm-7">

        </div>
        <div id="text_fille_soupe" class="col-sm-4">
          <h2>Notre histoire commence en Asie<h2>
          <p>Sur les côtes de la mer de Chine naît en 1951 Fang's Noodles
           </p>
        </div>
      </div>
    </div>

    <div id="third" class="container-fluid">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-sm-1">

        </div>
        <div class="col-sm-3">
          <h2>"When you drink the water, <strong>remember the spring</strong>"<h2>
        </div>
        <div class="col-sm-8">

        </div>
      </div>
    </div>

    <div id="four" class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.946890416068!2d2.3502664630233707!3d48.85922312539578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzM2LjciTiAywrAyMScxMC45IkU!5e0!3m2!1sfr!2sfr!4v1608824490499!5m2!1sfr!2sfr"></iframe>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

</script>

<style scoped>
  #text_fille_soupe {
    padding: 0 25px 0 25px;
  }

  #first {
    background-image: url("../images/backgrounds/accueil_1.webp");
    height: auto !important;
  }

  #first .titre_soups_noodles_dumpings {
    padding-top: 10%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 1.4em;
    letter-spacing: 3px;
    position: absolute;
  }

  #first .description_soups_noodles_dumpings {
    padding-top: 19%;
    text-align:center;
    width: 40%;
    position: absolute;
  }

  #first #title {
    font-size: 50px;
  }

  #first #typeMenu {
    background-color: var(--beige_o);

  }
  #first #typeMenu img {
    padding: 20px 0 0 0;
  }

  #first #typeMenu img {
    width: 50%;
    height: 100%;
  }

  #bouton_menus {
    margin: 20px 10;
    font-size: 1.3em;
    width: 400px;
    color: var(--text2);
    border-radius: 5px;
    padding: 7px 20px;
    font-weight: 500;
    background: #A1211F;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
      7px 7px 20px 0px rgba(0,0,0,.1),
      4px 4px 5px 0px rgba(0,0,0,.1);
    outline: none;
  }

  #second {
    background-image: url("../images/backgrounds/accueil_2.webp");
  }

  #second .col-sm-5 {
    word-wrap:break-word;
  }

  #second h2 {
    font-size: 20px
  }

  #second p {
    font-size: 15px
  }

  #third {
    background-image: url("../images/backgrounds/accueil_3.webp");
    width: 100%;
    height: 100vh;
    margin: 0;
    color: white;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #four {
    background-color: #A42321;
    padding-bottom: 20px;
  }

  #map {
    width: 100%;
    height: 300px;
    border: solid 1px black;
  }

  #slider {
    z-index: 4;
    list-style: none;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }

  #slider img {
    border: 1px var(--text) solid;
    background-color: var(--text);
    border-radius: 50%;
  }
  #slider img:hover {
    border: 1px var(--bleu) solid;
    background-color: var(--bleu);
    border-radius: 50%;
  }

  .parallax {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    color: white;
    overflow: hidden;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }


  @media only screen and (max-device-width: 1366px) {
    #first #typeMenu {
      height: auto !important;
    }

    .titre_soups_noodles_dumpings, .description_soups_noodles_dumpings, #first #typeMenu img {
      display: none !important;
    }

    #bouton_menus {
      width:100vw;
    }

    .parallax {
      background-attachment: scroll;
    }
  }

  #first, #second, #third .row {
    border-top: solid 1px black;
  }

</style>
