<template>
	<b-card class="d-flex flex-row">
		<button class="btn team-navbar-btn" v-on:click="toggleLeaveTeam">Abandonar equipo</button>
		<button class="btn team-navbar-btn mx-2" v-on:click="toggleInviteTeam" v-if="loggedInUser.admin">Invitar al equipo</button>
		<button class="btn team-navbar-btn" v-on:click="toggleNewAdminTeam" v-if="loggedInUser.admin">Crear nuevo admin</button>
	</b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'teamNavbar',
	data: function(){
    return {
    };
	},
	computed: {
    ...mapGetters(['loggedInUser'])
  },
	methods: {
    ...mapActions(
      [ 'toggleLeaveTeam',
	      'toggleInviteTeam',
        'toggleNewAdminTeam'
      ]),
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
