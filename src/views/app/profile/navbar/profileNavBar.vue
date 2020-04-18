<template>
	<div>
		<b-card>
			<button class="btn profile-navbar-btn" v-on:click="logout">Cerrar sesion</button>
			<button class="btn profile-navbar-btn" v-on:click="toggleEditProfile">Editar</button>
		</b-card>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'profileNavBar',
	methods: {
    ...mapActions(['toggleEditProfile', 'signOut']),
    logout: function (){
      this.signOut();
      this.$router.push('/app/sessions/signIn');
    },
	}
};
</script>

<style scoped>
	.profile-navbar-btn {
		background-color: #4399B6;
		color: white;
		border-radius: 3px;
		font-size: 0.85rem;
		padding: 0 0.5rem;
		border: 0;
		align-self: center;
	}
</style>
