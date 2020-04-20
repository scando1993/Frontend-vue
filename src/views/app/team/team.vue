<template>
	<div>
		<team-navbar v-if="loggedInUser.admin"/>
		<div v-b-modal.m-new-admin id="list_header" class="d-flex justify-content-end btn">
			<i class="d-inline i-Add mx-1" style="font-size: 20px; color: #00b3ee">
			</i>
			<p class="m-0 d-inline text-18 font-weight-bold">Agregar nuevo integrante</p>
		</div>

		<vue-perfect-scrollbar>
			<div id="list_body" class="scrollable">
				<div class="container" v-for="(item, index) in TEAM" v-bind:key="index">
					<b-row>
						<div class="col-md-6">
							<div class="ul-contact-page__profile">
								<div class="user-profile-img">
									<img class="profile-picture mb-2" :src="getImageForUser(index + 1)" alt="">
								</div>
								<div class="ul-contact-page__info">
									<p class="m-0 text-24">{{item.additionalInfo.firstName}} {{item.additionalInfo.lastname}}</p>
									<p class="text-muted m-0">{{'DEV'}}</p>
									<p class="text-muted mt-3">{{item.additionalInfo.email}}</p>
								</div>
							</div>
						</div>


						<div class="col-md-6 ">
							<h3 class="d-inline">Miembro</h3>
							<b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
								<template slot="button-content">
									<i class="i-Arrow-Down" @click="setIndexMember(index)" style="font-size: 30px; color: #00b3ee"/>
								</template>
								<b-dropdown-item @click="changeToCalendar">Ver calendario</b-dropdown-item>
								<b-dropdown-item @click="changeToClients">Ver cliente</b-dropdown-item>
								<b-dropdown-item @click="changeToReports">Ver reportes</b-dropdown-item>
								<b-dropdown-item class="bg-danger" v-b-modal.m-confirm-delete>Eliminar del equipo</b-dropdown-item>
							</b-dropdown>
						</div>
					</b-row>
					<!--                <div class="mt-3 mb-30 border-top"></div>-->
				</div>
			</div>
		</vue-perfect-scrollbar>
		<div id="footer-body" class="mt-5 d-flex justify-content-end">
			<button class="btn planniButton" v-b-modal.m-confirm-leave>Abandonar Equipo</button>
		</div>
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

		<b-modal id="m-new-admin" centered title="Confirmar" hide-footer>
			<div class="d-flex justify-content-center ">
				<p style="text-align: center" class="text-24">
					Elige nuevo admin
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
import TeamNavbar from './navbar/teamNavbar';
import { teamDummyData } from './data/teamData';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'team',
  components: { TeamNavbar },
  data() {
    return {
      boxOne: '',
      nameState: null,
      teamData: teamDummyData,
      newMemberForm: {
        name: 'New Member',
        lastname: '',
        profile: 'Programmer',
        email: ''
      },
      indexMember: 0
    };
  },
  mounted() {
    this.$store.dispatch('GET_TEAM');
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapGetters(['TEAM'])
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
    leaveTeam() {
      this.$bvModal.hide('m-confirm-leave');
    },
    cancelLeaveTeam() {
      this.$bvModal.hide('m-confirm-leave');
    },
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
      this.$store.dispatch('DELETE_MEMBER', selectedMember_id);
      this.$bvModal.hide('m-confirm-delete');
    },
    addNewMember() {
      this.teamData.push(Object.assign({}, this.newMemberForm));
      this.hideNewMemberModal();
    },
    showNewMemberModal () {
      this.$modal.show('m-new-admin');
    },
    hideNewMemberModal () {
      this.newMemberForm.email = '';
      this.$bvModal.hide('m-new-admin');
    },
    getImageForUser (value){
      let images = require.context('@/assets/images/faces/', false, /\.jpg$/);
      return images('./' + value + '.jpg');
    }
  }
};

</script>

<style scoped>
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
