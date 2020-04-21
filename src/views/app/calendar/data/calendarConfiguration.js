const moment = require('moment');

export const calendarList = [
  {
    id: '0',
    name: 'expired',
    bgColor: '#5D5F5E',
    color: '#292B2A',
	  borderColor: '#292B2A'
  },
  {
    id: '1',
    name: 'now',
    bgColor: '#efbaba',
    color: '#D85557',
	  borderColor: '#D85557'
  },
  {
    id: '2',
    name: 'soon',
    bgColor: '#FAE9B9',
    color: '#f6cc53',
	  borderColor: '#F9CD56'
  },
  {
    id: '3',
    name: 'early',
    bgColor: '#D5E288',
    color: '#C7D963',
	  borderColor: '#C7D963'
  },
  {
    id: '4',
    name: 'pending',
    bgColor: 'darkgrey',
    color: 'white',
	  borderColor: '#5D5F5E'
  }
];
export const calendarTasksColors = {
  'expired': {
    bgColor: '#D2D4D6',
    color: '#292B2A'
  },
  'now': {
    bgColor: '#E27D7F',
    color: '#D85557'
  },
  'soon': {
    bgColor: '#FAD97B',
    color: '#F9CD56'
  },
  'early': {
    bgColor: '#D5E288',
    color: '#C7D963'
  },
  'pending': {
    color: 'darkgrey',
    bgColor: '#D2D4D6'
  },
};
export var scheduleList = [
  {
    id: '0',
    calendarId: '1',
    title: 'Some',
    category: 'time',
    location:'ss',
    dueDateClass: '',
    start: new Date(),
    end: 'Sat Apr 8 2020 12:12:00 GMT-0500'
  },
  {
    id: '2',
    calendarId: '2',
    title: 'ssss2',
    category: 'time',
    location: '0,0',
    dueDateClass: '',
    start: '2020-04-14T05:00:00.000Z',
    end: '2020-04-14T05:59:00.000Z'
  }

];
export var view = 'month';
export var taskView = false;
export var scheduleView = ['time'];
export var theme = {
  'month.dayname.height': '20px',
  'month.dayname.fontSize': '1rem',
  'month.dayname.borderLeft': '1px solid #ff0000',
  'month.dayname.textAlign': 'center',
  'week.today.color': '#333',
  'week.daygridLeft.width': '50px',
  'week.timegridLeft.width': '50px'
};
export var week = {
  narrowWeekend: true,
  showTimezoneCollapseButton: true,
  timezonesCollapsed: false
};
export var month = {
  visibleWeeksCount: 6,
  startDayOfWeek: 1
};
export var timezones = [{
  timezoneOffset: -300,
  displayLabel: 'GMT+00:00',
  tooltip: 'Ecuador'
}, ];
export var disableDblClick = true;
export var isReadOnly = false;
// Create Event according to their Template
function getTimeTemplate(schedule, isAllDay) {
  console.log(schedule);
  var html = ['<div class="d-flex flex-row flex-wrap">'];
  var start = moment(schedule.start.toUTCString());
  var calendar = calendarList[schedule.calendarId];

  if (!isAllDay) {
    html.push('<span style="background:' + schedule.borderColor + '">' + start.format('HH:mm') + '</span> ');
    // html.push('<span>' + start.format('HH:mm') + '</span> ');
  }
  if (schedule.isPrivate) {
    html.push('<span class="bx bxs-lock-alt font-size-small align-middle"></span>');
    html.push(' Private');
  } else {
    if (schedule.isReadOnly) {
      html.push('<span class="bx bx-block font-size-small align-middle"></span>');
    } else if (schedule.recurrenceRule) {
      html.push('<span class="bx bx-repeat font-size-small align-middle"></span>');
    } else if (schedule.attendees.length) {
      html.push('<span class="bx bxs-user font-size-small align-middle"></span>');
    } else if (schedule.location) {
      html.push('<span class="bx bxs-map font-size-small align-middle"></span>');
    }
    html.push(' ' + schedule.title);
  }
  html.push('' + '</div>');
  return html.join(' ');
}

export var template = {
  milestone: function(schedule) {
    return `<span style="color:red;">${schedule.title}</span>`;
  },
  milestoneTitle: function() {
    return 'MILESTONE';
  },
  time: function (schedule) {
    return getTimeTemplate(schedule, false);  	
  }
};
export var useCreationPopup = false;
export var useDetailPopup = false;

