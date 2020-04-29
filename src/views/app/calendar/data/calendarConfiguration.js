const moment = require('moment');

export const calendarList = [
  {
    id: '0',
    name: 'expired',
    bgColor: '#e8e6e7',
    color: '#2b2b2b',
    borderColor: '#2b2b2b'
  },
  {
    id: '1',
    name: 'now',
    bgColor: '#eab5a9',
    color: '#d45454',
    borderColor: '#d45454'
  },
  {
    id: '2',
    name: 'soon',
    bgColor: '#fae9b8',
    color: '#f5ce54',
    borderColor: '#f5ce54'
  },
  {
    id: '3',
    name: 'early',
    bgColor: '#e7edc0',
    color: '#c7db5f',
    borderColor: '#C7D963'
  },
  {
    id: '4',
    name: 'pending',
    bgColor: '#FFFFFF',
    color: '#d2d4d8',
    borderColor: '#d2d4d8'
  }
];
export const calendarTasksColors = {
  'expired': {
    bgColor: '#e8e6e7',
    color: '#2b2b2b'
  },
  'now': {
    bgColor: '#eab5a9',
    color: '#d45454'
  },
  'early': {
    bgColor: '#fae9b8',
    color: '#f5ce54'
  },
  'soon': {
    bgColor: '#e7edc0',
    color: '#c7db5f'
  },
  'pending': {
    color: '#d2d4d8',
    bgColor: '#FFFFFF'
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
  'month.dayname.borderLeft': '1px solid #000000',
  'month.dayname.textAlign': 'center',
  'week.today.color': '#000',
  'week.daygridLeft.width': '50px',
  'week.timegridLeft.width': '50px',

  'common.border': '1px solid #e5e5e5',
  'common.backgroundColor': 'white',
  'common.holiday.color': '#000',
  'common.saturday.color': '#000',
  'common.dayname.color': '#000',
  'common.today.color': '#000',
};
export var week = {
  narrowWeekend: false,
  showTimezoneCollapseButton: true,
  timezonesCollapsed: false,
  startDayOfWeek: 1
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
    // html.push('<span style="background:' + schedule.borderColor + '">' + start.format('HH:mm') + '</span> ');
    html.push('<span>' + start.format('HH:mm') + '</span> ');
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

