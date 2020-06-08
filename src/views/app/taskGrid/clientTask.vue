<template>
  <div class="card no-gutters">
    <div class="card-content">
      <div class="d-flex flex-row no-gutters">
        <p class="m-2 client-task-date">{{formatDate(task.last_activity)}}</p>
        <div style="border: 1px solid #D2D4D6;"/>
        <p class="m-2 flex-grow-1">{{task.activity.name}}</p>
        <button class="btn client-task-btn m-2" @click="openTaskHistoryModal; createClickGAEvent('CLIENT_TASK_EXTRAINFO', 'CLICK', 'CLIENT')">Ver</button>
      </div>
    </div>
    <client_history_detail_modal/>
  </div>
</template>

<script>
  import client_history_detail_modal from './client.history.detail.modal'
export default {
  name: 'clientTaskWidget',
  components: {
    client_history_detail_modal
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {};
  },
  computed: {},
  methods: {
    formatDate: function (dateToFormat) {
      try {
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateToFormat);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(dateToFormat);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateToFormat);
        return `${ mo }/${ da }/${ ye }`;
      } catch ( e ) {
        return 'N/A';
      }
    },
    openTaskHistoryModal() {
      this.$store.dispatch('SET_TASK_SELECTED_ACTION', this.task);
      this.$bvModal.show("task_form_history");

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

<style scoped lang="scss">
  .client-task-btn {
    background-color: #4399B6;
    color: white;
    border-radius: 10px;
    font-size: 0.85rem;
    padding: 0 1.5rem;
    border: 0;
    align-self: center;
  }

  .client-task-date {
  }
</style>
