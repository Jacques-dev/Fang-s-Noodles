<template>

  <div id ="page_entiere">

    <ul id="nav">
      <li><a href="#first" title="Next Section"><img src="https://ianlunn.co.uk/plugins/jquery-parallax/images/dot.png" alt="Link" /></a></li>
      <li><a href="#second" title="Next Section"><img src="https://ianlunn.co.uk/plugins/jquery-parallax/images/dot.png" alt="Link" /></a></li>
      <li><a href="#third" title="Next Section"><img src="https://ianlunn.co.uk/plugins/jquery-parallax/images/dot.png" alt="Link" /></a></li>
      <li><a href="#four" title="Next Section"><img src="https://ianlunn.co.uk/plugins/jquery-parallax/images/dot.png" alt="Link" /></a></li>
    </ul>

    <section id="first" class="container-fluid parallax">
      <section class="row h-75 justify-content-center align-items-center">
        <article class="h-100" id="title">
          Saveur d'Asie
        </article>
      </section>
      <section class="row h-50 align-items-center" id="typeMenu">
        <article class="col-sm-4 d-flex justify-content-center">
          <p class="titre_soups_noodles_dumpings">SOUPS</p>
          <p class ="description_soups_noodles_dumpings">Decouvrez nos delicieuses soupes</p>
          <img src="https://static.wixstatic.com/media/a84435_89b11410bc6b4875996a2f75ba5952af.png/v1/fill/w_302,h_375,al_c,q_85,usm_0.66_1.00_0.01/a84435_89b11410bc6b4875996a2f75ba5952af.webp">
        </article>
        <article class="col-sm-4 d-flex justify-content-center">
          <p class="titre_soups_noodles_dumpings">NOODLES</p>
          <p class ="description_soups_noodles_dumpings">Decouvrez nos noodles faites maison</p>
          <img src="https://static.wixstatic.com/media/a84435_2094235a23f7450d868fb875a24df909.png/v1/fill/w_305,h_378,al_c,q_85,usm_0.66_1.00_0.01/a84435_2094235a23f7450d868fb875a24df909.webp">
        </article>
        <article class="col-sm-4 d-flex justify-content-center">
          <p class="titre_soups_noodles_dumpings">DUMPLINGS</p>
          <p class ="description_soups_noodles_dumpings">Savourez nos dumplings</p>
          <img src="https://static.wixstatic.com/media/a84435_4a1b27357f47440490e1d36e28015ee1.png/v1/fill/w_303,h_376,al_c,q_85,usm_0.66_1.00_0.01/a84435_4a1b27357f47440490e1d36e28015ee1.webp%22%3E">
        </article>
        <article class="col-sm-12 d-flex justify-content-center">
          <router-link id ="menus" to='/menus'>Menus</router-link>
        </article>
      </section>
    </section>


    <div id="second" class="container-fluid parallax">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-sm-7">

        </div>
        <div class="col-sm-4">
          <h2>Our Story Begins In The East<h2>
          <p>I'm a paragraph. Click here to add your own text and edit me.
            It’s easy.
            Just click “Edit Text” or double click me to add your own content and make changes to the font.
            Feel free to drag and drop me anywhere you like on your page.
            I’m a great place for you to tell a story and let your users know a little more about you.
            This is a great space to write long text about your company and your services.
             You can use this space to go into a little more detail about your company.
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

  </div>

</template>

<script>


</script>

<style scoped>

  #first .titre_soups_noodles_dumpings {
    padding-top: 10%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 1.4em;
    letter-spacing: 3px;
    /* align-items: center; */
    /* z-index: 5; */
    position: absolute;
  }
  #first .description_soups_noodles_dumpings {
    padding-top: 20%;
    text-align:center;
    width: 40%;
    position: absolute;
  }

  #nav {
    list-style: none;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
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
    .parallax {
      background-attachment: scroll;
    }
  }

  #first {
    background-image: url("../images/backgrounds/accueil_1.webp");
    height: auto !important;
  }

  #first #typeMenu {
    background-color: rgba(240,221,196,0.91);
  }

  #first #title {
    font-size: 50px;
  }
  @media only screen and (max-device-width: 1366px) {
    #first #typeMenu {
      height: auto !important;
    }
    #first #typeMenu img{
      display: none;
    }
  }

  #first #typeMenu img {
    width: 50%;
    height: 100%;
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

  #first, #second, #third .row{
    border: solid 1px black;
  }
/* .col-sm-4, .col-sm-3, .col-sm-5{
    border: solid 2px red;
  } */

</style>
