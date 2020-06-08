<template>
  <b-card>
    <button class="btn profile-navbar-btn" v-on:click="logout; createClickGAEvent('PROFILE_SINGOUT', 'CLICK', 'PROFILE')">Cerrar sesion</button>
    <button class="btn profile-navbar-btn" v-on:click="toggleEditProfile; createClickGAEvent('PROFILE_EDIT', 'CLICK', 'PROFILE')">Editar</button>
  </b-card>
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
    createClickGAEvent(action, category, label, value) {
      this.$gtag.event(action, {
        'event_category': category,
        'event_label': label,
        'value': value || null
      })
    }
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
