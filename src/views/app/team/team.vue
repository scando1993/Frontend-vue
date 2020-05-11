<template>
  <div>
    <vue-perfect-scrollbar>
      <div id="list_body" class="scrollable">
        <template v-for="(item, index) in TEAM">
          <div class="team-container" v-bind:key="index">
            <div class="" style="flex-basis: 100%;">
              <div class="ul-contact-page__profile">
                <div class="user-profile-img">
                  <img class="profile-picture mr-2" :src="getImageForUser(index + 1)" alt="">
                </div>
                <div class="ul-contact-page__info">
                  <p class="m-0 text-24">{{item.additionalInfo.firstName}} {{item.additionalInfo.lastname}}</p>
                  <p class="text-muted mt-3">{{item.additionalInfo.email}}</p>
                </div>
              </div>
            </div>
            <div class="d-inline-flex flex-row flex-nowrap align-items-stretch">
              <label class="align-self-center">{{getMemberType(item)}}</label>
              <b-dropdown v-if="showDropDown(item)" size="lg" variant="link" toggle-class="text-decoration-none"
                          no-caret>
                <template slot="button-content">
                  <i class="i-Arrow-Down" @click="setIndexMember(index)" style="font-size: 30px; color: #00b3ee"/>
                </template>
                <b-dropdown-item @click="changeToCalendar">Ver calendario</b-dropdown-item>
                <b-dropdown-item @click="changeToClients">Ver cliente</b-dropdown-item>
                <b-dropdown-item @click="changeToReports">Ver reportes</b-dropdown-item>
                <b-dropdown-item class="bg-danger" v-b-modal.m-confirm-delete>Eliminar del equipo</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </template>
      </div>
    </vue-perfect-scrollbar>
    <b-modal id="m-confirm-delete" centered title="Confirmar">
      <div class="d-flex justify-content-center text-24">
        <p style="text-align: center">
          ¿Estas seguro que deseas eliminar a este miembro del equipo?
        </p>
      </div>
      <template class="d-flex justify-content-center" v-slot:modal-footer="{ ok, cancel }">
        <div>
          <b-button variant="info " size="sm" style=" margin-right: 190px;padding-left: 60px;padding-right: 60px;"
                    @click="cancelDeleteMember()">No
          </b-button>
          <b-button variant="info " size="sm" style=" padding-left: 60px;padding-right: 60px" @click="deleteMember()">
            Si
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'team',
  data() {
    return {
      boxOne: '',
      nameState: null,
      teamData: null,
      // modal_title: 'Añade un nuevo miembro',
      // isAdminModal: false,
      // newMemberForm: {
      //   name: 'New Member',
      //   lastname: '',
      //   profile: 'Programmer',
      //   email: ''
      // },
      indexMember: 0
    };
  },
  mounted() {
    this.$store.dispatch('GET_TEAM');
  },
  computed: {
    ...mapGetters([ 'loggedInUser' ]),
    ...mapGetters([ 'TEAM' ]),
    getTitle: function () {
      if ( this.isAdminModal ) {
        return 'Añade nuevo administrador';
      }
      return 'Añade nuevo miembro';
    }
  },
  methods: {
    changeToCalendar() {
      this.$router.push('calendar/calendar.dashboard.v1');

    },
    changeToClients() {
      this.$router.push('taskGrid');


    },
    changeToReports() {
      this.$router.push('reports');

    },
    // leaveTeam() {
    //   this.$store.dispatch('LEAVE_TEAM');
    //   this.$bvModal.hide('m-confirm-leave');
    // },
    // cancelLeaveTeam() {
    //   this.$bvModal.hide('m-confirm-leave');
    // },
    cancelDeleteMember() {
      this.$bvModal.hide('m-confirm-delete');
    },
    setIndexMember(index) {
      this.indexMember = index;
    },
    deleteMember() {
      console.log('deleting', this.indexMember);
      this.TEAM.splice(this.indexMember, 1);
      const selectedMember_id = this.TEAM[this.indexMember].id.id;
      this.$store.dispatch('DELETE_MEMBER', selectedMember_id)
        .then(response => {
          this.$store.dispatch('GET_TEAM');
        });
      this.$bvModal.hide('m-confirm-delete');
    },
    // addNewMember() {
    //   if ( this.isAdminModal ) {
    //     this.newAdmin();
    //   } else {
    //     //this.teamData.push(Object.assign({}, this.newMemberForm));
    //     this.$store.dispatch('INVITE_MEMBER', this.newMemberForm.email)
    //       .then(response => {
    //         this.$store.dispatch('GET_TEAM');
    //       })
    //       .catch(error => {
    //
    //       });
    //     this.hideNewMemberModal();
    //   }
    //
    // },
    showNewMemberModal() {
      this.$modal.show('m-new-admin');
    },
    getImageForUser(value) {
      let images = require.context('@/assets/images/faces/', false, /\.jpg$/);
      if ( value > 5 ) {
        value = 5;
      }
      return images('./' + value + '.jpg');
    },
    getMemberType(member) {
      const type = member.additionalInfo.type;
      var display = 'Member';
      switch ( type ) {
      case 'Team Admin':
        display = 'Administrador';
        break;
      case 'Vendor':
        display = 'Member';
        break;
      }
      return display;
    },
    showDropDown(member) {
      const condition1 = this.getMemberType(member) !== 'Administrador';
      const condition2 = this.loggedInUser.admin;
      return condition1 && condition2;
    },
  }
};

</script>

<style scoped lang="scss">
  .team-container{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    border-top: 0px;
    border-bottom: 1px;
    border-left: 0px;
    border-right: 0px;
    border-style: solid;
    border-color: #cecece;
  }
  .team-profile{
    width: 3em;
    height: 3em;
  }
  .scrollable {
    height: 600px;
    width: 100%;
    overflow-y: scroll;
  }

  .planniButton {
    color: white;
    background-color: #00b3ee;
  }
</style>
