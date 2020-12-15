<template>


  <section>
      <section class="ligne" id ="ligne_1">
            <article id="text_un">
              <p id ="titre_un_un">Taste of the East</p>
            </article>

            <section id ="ligne_fixe_bas">
                <article class="soups_noodles_dumplings">
                  <p class="titre_un_deux">SOUPES</p>
                  <p class="text_soups_noodles_dumplings">Cliquez sur l'icone pour découvrire nos différentes soupes</p>
                </article>

                <article class="soups_noodles_dumplings">
                  <p class="titre_un_deux">NOODLES</p>
                  <p class="text_soups_noodles_dumplings">Cliquez sur l'icone pour découvrire nos différentes nouilles</p>
                </article>

                <article class="soups_noodles_dumplings">
                  <p class="titre_un_deux">DUMPLINGS</p>
                  <p class="text_soups_noodles_dumplings">Cliquez sur l'icone pour découvrire nos différentes dumplings</p>
                </article>
            </section>
            <article id="emplacement_btn_menus">
                <button id="btn_menus" type="button" name="button"> Voir tous les menus</button>
            </article>

      </section>


      <section class="ligne parallax-two" id ="ligne_2">
          <article id="texte_deux">
            <p id="titre_deux_un">Our Story Begins In The East<p>
            <p id="texte_deux_un">I'm a paragraph. Click here to add your own text and edit me.
              It’s easy.
              Just click “Edit Text” or double click me to add your own content and make changes to the font.
              Feel free to drag and drop me anywhere you like on your page.
              I’m a great place for you to tell a story and let your users know a little more about you.
              This is a great space to write long text about your company and your services.
               You can use this space to go into a little more detail about your company.
             </p>
          </article>
      </section>


      <section class="ligne" id ="ligne_3">
        <article class="texte_trois">
          <p id ="texte_trois_un">"When you drink the water, remember the spring"<p>
        </article>
      </section>

      <section class="ligne" id ="ligne_4">
            <p id ="titre_quatre">Faites une réservation</p>
            <article class="btn_ligne_4">
              <input type ="date"name="date" id="select_date">

              <select name="heure" id="heure_select">
                  <option value="">Heure de réservation</option>
                  <option value="1200">12h00</option>
                  <option value="1215">12h15</option>
                  <option value="1230">12h30</option>
                  <option value="1245">12h45</option>
                  <option value="1300">13h00</option>
                  <option value="1315">13h15</option>
                  <option value="1330">13h30</option>
                  <option value="1345">13h45</option>
                  <option value="1400">14h00</option>
                  <option value="1415">14h15</option>
                  <option value="1430">14h30</option>
                  <option value="1445">14h45</option>
                  <option value="1500">15h00</option>
                  <option value="1515">15h15</option>
                  <option value="1530">15h30</option>
                  <option value="1545">15h45</option>
                  <option value="1600">16h00</option>
                  <option value="1615">16h15</option>
                  <option value="1630">16h30</option>
                  <option value="1645">16h45</option>
                  <option value="1700">17h00</option>
                  <option value="1715">17h15</option>
                  <option value="1730">17h30</option>
                  <option value="1745">17h45</option>
                  <option value="1800">18h00</option>
                  <option value="1815">18h15</option>
                  <option value="1830">18h30</option>
                  <option value="1845">18h45</option>
                  <option value="1900">19h00</option>
                  <option value="1915">19h15</option>
                  <option value="1930">19h30</option>
                  <option value="1945">19h45</option>
                  <option value="2000">20h00</option>
                  <option value="2015">20h15</option>
                  <option value="2030">20h30</option>
                  <option value="2045">20h45</option>
                  <option value="2100">21h00</option>
                  <option value="2115">21h15</option>
                  <option value="2130">21h30</option>
                  <option value="2145">21h45</option>
                  <option value="2200">22h00</option>
                  <option value="2215">22h15</option>
                  <option value="2230">22h30</option>
                  <option value="2245">22h45</option>
                  <option value="2300">23h00</option>
                  <option value="2315">23h15</option>
                  <option value="2330">23h30</option>
            </select>

            <select name="personnes" id="personnes_select">
                  <option value="">Nombre de personnes</option>
                  <option value="1">1 personne</option>
                  <option value="2">2 personnes</option>
                  <option value="3">3 personnes</option>
                  <option value="4">4 personnes</option>
                  <option value="5">5 personnes</option>
                  <option value="6">6 personnes</option>
            </select>
            <button id ="reserver" type="button" name="button"> Reservez</button>
          </article>
      </section>

  </section>
</template>

<script>


</script>

<style scoped>
/* @import url(https://fonts.googleapis.com/css?family=Oswald:300,400,700); */
/* @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic); */

/* Override UGG site */
/* #main {width: 100%; } */
/* .content-asset p {margin:0 auto;}
.breadcrumb {display:none;} */

body{
  margin: 0;
}

#test{
  background-image: url(accueil_2.webp);
  width: 100%;
  height: 100px;
  background-size:contain;
  background-repeat: no-repeat;
}
#text_un{
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.titre_un_deux{
  font-weight: bold;
  letter-spacing: 2px;
  color:#fff;
}

.soups_noodles_dumplings {
  width: 13%;
  height: 250px;
  background-color: #A52420;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2.5% 1% 3% 1%;
  padding: 1.5%;
  opacity: 1;
}
.text_soups_noodles_dumplings{
  text-align: center;
  color: #fff;
}

#ligne_1{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url("../images/backgrounds/accueil_1.webp");
  background-attachment:fixed;
  background-size:contain;
  background-repeat: no-repeat;
  background-position: top center;
}
#emplacement_btn_menus{
  background-color: rgba(240,221,196,0.91);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
}
#btn_menus{
  width: 10%;
  background-color: #A52420;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px;
}

#ligne_fixe_bas{
  display: flex;
  background-attachment: fixed;
  justify-content: center;
  align-items: center;
  background-color: rgba(240,221,196,0.91);
}

#titre_un_un{
  display: flex;
  color: #fff;
  font-weight: bold;
  font-size: 2.2em;
}
#text_un{
  margin-top: 4%;
  margin-bottom: 12%;
}

#ligne_2{
  /* width: 100%; */
  /* display: flex; */

  /* justify-content:center; */
  /* align-items: center; */

  /* padding-top: 17%; */
  /* padding-bottom: 17%; */
  /* position: relative; */
  height: 803px;
  background-image: url("../images/backgrounds/accueil_2.webp");
  background-attachment: fixed;
  background-size:contain;
  background-repeat: no-repeat;
  background-position: center center;
}

#texte_deux{
  display: flex;
  margin-top: 9%;
  margin-bottom: 5%;
  flex-direction: column;
  width: 20%;
}

#titre_deux_un{
  font-weight: bold;
  font-size: 2.2em;
  /* width: 100%; */
  display: flex;
  color: #fff;
}
#texte_deux_un{
  display:flex;

  color:#fff;
}

#ligne_3{
  width: 100%;
  /* width: 1374px; */
  height: 650px;
  /* padding-top: 400px;
  padding-bottom: 200px; */
  display: flex;
  background-image: url("../images/backgrounds/accueil_3.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  }

#texte_trois{
  display:flex;
}
#texte_trois_un{
  display: flex;
  color:#fff;
  font-weight: bold;
  width:30%;
  font-size: 2.2em;
}

#ligne_4{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-color: #FCF3D7;
}

#titre_quatre{
  font-weight: bold;
  font-size: 1.9em;
}
#heure_select, #personnes_select{
  padding: 6px;
  color: #A52420;
  border: solid #A52420 2px;
  text-decoration: none;
  background-color: #FCF3D7;
}
[type="date"] {
  background:#fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)  97% 50% no-repeat ;
}
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}
#select_date{
  padding: 5px;
  color: #A52420;
  border: solid #A52420 2px;
  text-decoration: none;
  background-color: #FCF3D7;
}
#reserver{
  border: solid #A52420 2px;
  text-decoration: none;
  padding: 5px 15px 5px 15px;

}

</style>
