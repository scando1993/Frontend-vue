<template>
	<div class="main-content">
		<profile-nav-bar/>
		<div id="avatarProfile" class="d-flex justify-content-center">
			<div class="user-profile-img">
				<img class="profile-picture mb-2" src="@/assets/images/faces/1.jpg" alt="">
				<input
					type="file"
					@change="onChange"
					:style="fileInputStyles"
					:accept=accept>
				<div :style="wrapperStyles">

				</div>
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
                                <div class="col-md-6 mb-3">
                                    <b-form-group
                                            id="input-group-8"
                                            label="Contraseña Antigua"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                id="input-1"
                                                type="password"
                                                placeholder="Contraseña"
                                                v-model = "password_old"
                                        />
                                    </b-form-group>

                                    <b-form-group
                                            id="input-group-4"
                                            label="Contraseña Nueva"
                                            label-for="input-1"
                                    >
                                        <b-form-input
                                                id="input-1"
                                                type="password"
                                                placeholder="Contraseña"
                                                v-model = "password_new"
                                        />
                                    </b-form-group>
                                </div>

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

<script>
import ProfileNavBar from './navbar/profileNavBar';
import { dummyProfileData } from './data/profileData';
import { mapActions, mapGetters } from 'vuex';
import Team from '../team/team';

export default {
  name: 'profile',
  components: { ProfileNavBar, Team },
  data() {
    return {
        password_old: '',
        password_new: '',
      customImageMaxSize: 3,
      user: dummyProfileData,
      background_image: '@/assets/images/photo-wide-5.jpeg',
      image_profile: '@/assets/images/faces/1.jpg',
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
      },
      file: null,
      preview: require('@/assets/images/faces/1.jpg'),
      visiblePreview: false
    };
  },
  computed: {
    ...mapGetters(['loggedInUser']),

    getBackgroundImage: function () {
      return require('@/assets/images/photo-wide-5.jpeg');
    },
    getProfileImage: function () {
      return require('@/assets/images/faces/1.jpg');
    },
    ...mapGetters(['PROFILE']),
    wrapperStyles() {
      return {
        'position': 'relative',
        'width': '100%'
      };
    },

    fileInputStyles() {
      return {
        'width': '100%',
        'position': 'relative',
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0,
        'opacity': 0,
        'overflow': 'hidden',
        'outline': 'none',
        'cursor': 'pointer'
      };
    },

    textInputStyles() {
      return {
        'width': '100%',
        'cursor': 'pointer'
      };
    },

    previewImage() {
      return this.preview || this.defaultPreview;
    }
  },
  mounted() {
    this.$store.dispatch('GET_PROFILE');
  },
  methods: {
      changePassword() {
          if(this.password_new && this.password_old) {
              const body = {
                  "currentPassword": this.password_old,
                  "newPassword": this.password_new
              };
              this.$store.dispatch('CHANGE_PASSWORD', body);
          }
      },
    save() {
      const form = {
        'email': this.PROFILE.additionalInfo.email,
        'firstName': this.PROFILE.additionalInfo.firstName,
        'lastName': this.PROFILE.additionalInfo.lastName,
        'name': this.PROFILE.additionalInfo.name,
        'role': this.PROFILE.additionalInfo.role,
        'phone': this.PROFILE.additionalInfo.phone,
        'company': this.PROFILE.additionalInfo.company,
        'company_address': this.PROFILE.additionalInfo.company_address
      };
      console.log('in save', form);
      this.$store.dispatch('UPDATE_PROFILE', form)
          .then(response => {
              this.$store.dispatch('GET_PROFILE');
          });
      this.changePassword();
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
    },
    onFile(file) {
      console.log(file); // file object
    },

    onLoad(dataUri) {
      console.log(dataUri); // data-uri string
    },

    onSizeExceeded(size) {
      alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`);
    },

    onChange(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }

      const file = files[0];
      const size = file.size && (file.size / Math.pow(1000, 2));

      // check file max size
      if (size > this.maxSize) {
        this.$emit('size-exceeded', size);
        return;
      }

      // update file
      this.file = file;
      this.$emit('file', file);

      const reader = new FileReader();

      reader.onload = e => {
        const dataURI = e.target.result;

        if (dataURI) {
          this.$emit('load', dataURI);

          this.preview = dataURI;
        }
      };

      // read blob url from file data
      reader.readAsDataURL(file);
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
