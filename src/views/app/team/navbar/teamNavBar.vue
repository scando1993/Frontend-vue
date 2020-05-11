<template>
  <div>
    <b-card class="d-flex flex-row p-1">
      <button class="btn team-navbar-btn" v-b-modal.m-confirm-leave>Abandonar equipo</button>
      <button class="btn team-navbar-btn mx-2" v-b-modal.m-new-member v-if="loggedInUser.admin">Invitar al equipo</button>
      <button class="btn team-navbar-btn mx-2" @click="onAdminClick()" v-if="loggedInUser.admin">Crear nuevo admin</button>
    </b-card>
    <b-modal id="m-confirm-leave" centered title="Confirmar">
      <div class="d-flex justify-content-center text-24">
        <p style="text-align: center">
          ¿Estas seguro que deseas abandonar el equipo?
        </p>
      </div>
      <template class="d-flex justify-content-center" v-slot:modal-footer="{ ok, cancel }">
        <div>
          <b-button variant="info " size="sm" style=" margin-right: 190px;padding-left: 60px;padding-right: 60px;"
                    @click="cancelLeaveTeam()">No
          </b-button>
          <b-button variant="info " size="sm" style=" padding-left: 60px;padding-right: 60px" @click="leaveTeam()">Si
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal id="m-new-member" centered title="Confirmar" @hide="hideNewMemberModal" hide-footer>
      <div class="d-flex justify-content-center ">
        <p style="text-align: center" class="text-24">
          {{getTitle}}
        </p>
      </div>
      <div>
        <form ref="formNewAdmin" @submit.stop.prevent @submit="addNewMember" @reset="hideNewMemberModal">
          <b-form-group
            label-for="email-input"
            invalid-feedback="Email no valido"
          >
            <b-form-input
              id="email-input"
              placeholder="ejemplo@email.com"
              type="email"
              v-model="newMemberForm.email"
              required
            />
          </b-form-group>
          <div class="d-flex justify-content-between mt-5">
            <b-button variant="info " type="reset" size="sm"
                      style=" margin-right: 190px;padding-left: 60px;padding-right: 60px;">No
            </b-button>
            <b-button variant="info " type="submit" size="sm" style=" padding-left: 60px;padding-right: 60px">Si
            </b-button>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'teamNavBar',
  data: function () {
    return {
      isAdminModal: false,
      modal_title: 'Añade un nuevo miembro',
      newMemberForm: {
        name: 'New Member',
        lastName: '',
        profile: 'Programmer',
        email: ''
      },
    };
  },
  computed: {
    ...mapGetters([ 'loggedInUser' ]),
    getTitle: function () {
      if ( this.isAdminModal ) {
        return 'Añade nuevo administrador';
      }
      return this.modal_title;
    }
  },
  methods: {
    ...mapActions(
      [ 'toggleLeaveTeam',
        'toggleInviteTeam',
        'toggleNewAdminTeam'
      ]),
    leaveTeam() {
      this.$store.dispatch('LEAVE_TEAM');
      this.$bvModal.hide('m-confirm-leave');
    },
    cancelLeaveTeam() {
      this.$bvModal.hide('m-confirm-leave');
    },
    onAdminClick() {
      this.isAdminModal = true;
      this.$bvModal.show('m-new-admin');
    },
    hideNewMemberModal() {
      console.log('en hide');
      this.isAdminModal = false;
      this.newMemberForm.email = '';
      this.$bvModal.hide('m-new-admin');
    },
    addNewMember() {
      if ( this.isAdminModal ) {
        this.newAdmin();
      } else {
        //this.teamData.push(Object.assign({}, this.newMemberForm));
        this.$store.dispatch('INVITE_MEMBER', this.newMemberForm.email)
          .then(response => {
            this.$store.dispatch('GET_TEAM');
          })
          .catch(error => {

          });
        this.hideNewMemberModal();
      }

    },
    newAdmin() {
      this.$store.dispatch('INVITE_ADMIN', this.newMemberForm.email)
        .then(response => {
          this.$store.dispatch('GET_TEAM');
        })
        .catch(error => {
        });
      this.hideNewMemberModal();
    }
  },
};
</script>

<style scoped>
  .team-navbar-btn {
    background-color: #4399B6;
    color: white;
    border-radius: 3px;
    font-size: 0.85rem;
    padding: 0 0.5rem;
    border: 0;
    align-self: center;
  }
</style>
