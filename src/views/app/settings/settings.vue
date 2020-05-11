<template>
  <div class="main-content">
    <profile-nav-bar v-if="selectedView === 0"/>
    <team-nav-bar v-else-if="selectedView === 1"/>

    <b-tabs align="center" justified
            v-model="selectedView"
            no-nav-style
            active-nav-item-class="settings-nav-items-selected"
            nav-class="settings-nav-items"
            nav-wrapper-class="settings-nav-items">
      <b-tab :title="profileTitle"
             title-item-class="settings-nav-item">
        <profile-component/>
      </b-tab>
      <b-tab :title="teamTitle" v-if="loggedInUser.admin"
             title-item-class="settings-nav-item">
        <team-component/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import ProfileComponent from '../profile/profile';
import TeamComponent from '../team/team';
import { mapGetters } from 'vuex';
import ProfileNavBar from '../profile/navbar/profileNavBar';
import TeamNavBar from '../team/navbar/teamNavBar';

export default {
  name: 'settings',
  data(){
    return {
      selectedView: 0,
      profileTitle: 'Perfil',
      teamTitle: 'Equipo'
    };
  },
  components: { TeamNavBar, ProfileNavBar, ProfileComponent, TeamComponent },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    linkClass( idx ){
      if (this.selectedView === idx){
        return ['settings-nav-items', 'settings-nav-items-selected'];
      } else {
        return ['settings-nav-items'];
      }
    }
  }
};
</script>

<style lang="scss">
  .settings-nav-item{
    margin-right: 0;
    padding-bottom: 0;
  }
  .settings-nav-items{
    color: #4298b5;
    background: #f9f9f9;
    padding-bottom: 0;
    margin-right: 0;
    font-size: 1.2em;
  }
  .settings-nav-items-selected{
    text-decoration: underline;
  }

</style>
