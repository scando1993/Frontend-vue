<template>
    <div>
        <profile-nav-bar/>
        <div id="avatarProfile" class="d-flex justify-content-center">
            <div class="user-profile-img">
                <img class="profile-picture mb-2" src="@/assets/images/faces/1.jpg" alt="">
            </div>
        </div>

        <div id="basic_info">
            <div id="basicForm">
                <b-row>
                    <b-col md="12">
                        <b-form @submit.prevent>

                            <div class="mt-3 mb-30 border-top"></div>

                            <b-row>

                                <b-form-group
                                        class="col-md-6 mb-3"
                                        id="input-group-1"
                                        label="Nombre"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-1"
                                            type="text"
                                            required
                                            placeholder="Nombre "
                                            v-model = "PROFILE.additionalInfo.firstName"
                                    />
                                </b-form-group>
                                <b-form-group
                                        class="col-md-6 mb-3"
                                        id="input-group-2"
                                        label="Apellido"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-1"
                                            type="text"
                                            required
                                            placeholder="Apellido"
                                            v-model = "PROFILE.additionalInfo.lastName"
                                    />
                                </b-form-group>
                                <b-form-group
                                        class="col-md-6 mb-3"
                                        id="input-group-3"
                                        label="Usuario"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-1"
                                            type="email"
                                            required
                                            placeholder="usuario"
                                            v-model = "PROFILE.additionalInfo.email"
                                    />
                                </b-form-group>
                                <b-form-group
                                        class="col-md-6 mb-3"
                                        id="input-group-4"
                                        label="Contraseña"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-1"
                                            type="password"
                                            placeholder="Contraseña"
                                            v-model = "password"
                                    />
                                </b-form-group>
                            </b-row>
                                <div class="mt-3 mb-30 border-top"></div>
                            <b-row class="mb-5">
                                <b-form-group
                                        class="col-md-6 mb-3"
                                        id="input-group-5"
                                        label="Nombre de la compañia"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-1"
                                            type="text"
                                            required
                                            placeholder="Nombre Compañia"
                                            v-model = "PROFILE.additionalInfo.company"
                                    />
                                </b-form-group>
                                <b-form-group
                                        class="col-md-6 mb-3"
                                        id="input-group-6"
                                        label="Dirección"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-1"
                                            type="text"
                                            required
                                            placeholder="Dirección Compañia"
                                            v-model = "PROFILE.additionalInfo.company_address"
                                    />
                                </b-form-group>
                            </b-row>
                            <div class="mt-3 mb-30 border-top"></div>
                            <b-row class="mb-5">
                                <b-form-group
                                        class="col-md-6 mb-3"
                                        id="input-group-7"
                                        label="E-mail"
                                        label-for="input-1"
                                        description="We'll never share your email with anyone else."
                                >
                                    <b-form-input
                                            id="input-1"
                                            type="email"
                                            required
                                            placeholder="usuario@mail.com"
                                            v-model = "PROFILE.additionalInfo.email"
                                    />
                                </b-form-group>
                                <b-form-group
                                        class="col-md-6 mb-3"
                                        id="input-group-8"
                                        label="Número de Télefono"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-1"
                                            type="number"
                                            required
                                            placeholder="Télefono"
                                            v-model = "PROFILE.additionalInfo.phone"
                                    />
                                </b-form-group>
                            </b-row>
                            <b-col md="12" class="d-flex justify-content-end ">
                                <b-button class="mr-2 " type="submit" v-on:click="save" variant="primary">Guardar</b-button>
                                <b-button class="" type="cancel" variant="outline-secondary">Cancelar</b-button>
                            </b-col>
                        </b-form>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script >
import ProfileNavBar from './navbar/profileNavBar';
import { dummyProfileData } from './data/profileData';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'profiel',
  components: { ProfileNavBar },
  data() {
    return {
      user: dummyProfileData,
      formData: {
        name: '',
        lastname: '',
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        company: {
          name: '',
          address: ''
        }
      }
    };
  },
    computed: {
      ...mapGetters(['PROFILE'])
    },
    mounted() {
      this.$store.dispatch('GET_PROFILE');
    },
  methods: {
      save() {
          const form = {
              "email": this.PROFILE.additionalInfo.email,
              "firstName": this.PROFILE.additionalInfo.firstName,
              "lastName": this.PROFILE.additionalInfo.lastName,
              "name": this.PROFILE.additionalInfo.name,
              "role": this.PROFILE.additionalInfo.role,
              "phone": this.PROFILE.additionalInfo.phone,
              "company": this.PROFILE.additionalInfo.company,
              "company_address": this.PROFILE.additionalInfo.company_address
          };
          console.log('in save', form);
          this.$store.dispatch('UPDATE_PROFILE', form);
      },
    initForm() {
      this.setDummyData();
    },
    setDummyData() {
      this.formData = {
        name: this.user.name,
        lastname: this.user.lastname,
        username: this.user.username,
        password: '',
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        company: this.user.company
      };
    },
    saveDummyData() {
      dummyProfileData = this.formData;
    }
  },
  created() {
    console.log(dummyProfileData);
    this.initForm();
    console.log(this.formData);
  }

};
</script>

<style scoped>

</style>
