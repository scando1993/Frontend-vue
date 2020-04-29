<template>
  <div class="card no-gutters">
    <div class="card-content">
      <div class="d-flex flex-row no-gutters">
        <p class="m-2 client-task-date">{{formatDate(task.last_activity)}}</p>
        <div style="border: 1px solid #D2D4D6;"/>
        <p class="m-2 flex-grow-1">{{task.activity.name}}</p>
        <button class="btn client-task-btn m-2">Ver</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'clientTaskWidget',
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
