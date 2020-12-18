<template>

  <div class="container-fluid" id ="background">

    <div id="ligne_un"class="row ligne d-flex justify-content-center align-items-center">
      <p>Faites une réservation<p>
    </div>

    <div id="ligne_deux" class="row ligne">

      <form class="col-sm-8" @submit.prevent="reserver">

        <div class="container-fluid">
        <div class="row d-flex flex-wrap justify-content-center align-items-center">
          <div class="col-sm-3" align="center">
            <input type="date" name="date" id="select_date" v-model="editingReservation.date">
          </div>
          <div class="col-sm-3" align="center">
            <select id="heure_select" v-model="editingReservation.heure">
              <option value="" disabled selected>Heure de réservation</option>
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
          </div>
          <div class="col-sm-3" align="center">
            <select id="personnes_select" v-model="editingReservation.personnes">
              <option value="" disabled selected>Nombre de personnes</option>
              <option value="1">1 personne</option>
              <option value="2">2 personnes</option>
              <option value="3">3 personnes</option>
              <option value="4">4 personnes</option>
              <option value="5">5 personnes</option>
              <option value="6">6 personnes</option>
            </select>
          </div>
          <div class="col-sm-3" align="center">
            <button type="submit" id="reserver" >Reservez</button>
          </div>
        </div>
      </form>

      <div class="col-sm-4">
        <div class="container-fluid">
          <div v-for="reserv in reservations" :key="reserv.date">
            <div class="row">
              <div class="col-sm-12">
                {{ reserv.date }}
              </div>
              <div class="col-sm-12">
                {{ reserv.heure }}
              </div>
              <div class="col-sm-12">
                {{ reserv.personnes }}
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>

  </div>

</template>

<script>
  module.exports = {
    components: {

    },
    props: {
      admin: {type: Object},
      reservations: {type: Array}
    },
    data () {
      return {
        editingReservation: {
          date: '',
          heure: '',
          personnes: ''
        }
      }
    },
    methods: {
      reserver () {
        this.$emit('reserver', this.editingReservation)
      }
    }
  }
</script>

<style scoped>

  /* #background{
    display: flex;
    flex-direction: column;
    background-color: blue;
  } */

  .ligne{
    padding: 3%;
  }
  #ligne_un{
    font-size: 2.8em;
    color:#891B17;
  }

  #ligne_deux{
    height:auto;
    /* background-color: blue; */
    background-color:rgba(30,61,89,0.7);
    margin-left: 5%;
    margin-right: 5%;
    display:flex;
    justify-content:center;
    align-items:center;
  }

  #background{
    width: 100%;
    /* height: 100%; */
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("../images/backgrounds/maison_traditionnelle.jpeg");

  }

  .container-fluid {
    /* background-color: #F0DDC4; */
    height: 100%;
  }

  .container-fluid .row h2{
    color: #7D1917;
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
    background:#fff url('https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png')  97% 50% no-repeat ;
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
