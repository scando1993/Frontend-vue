export var calendarList = [
  {
    id: '0',
    name: 'Expirada',
    bgColor: 'black',
    color: 'white'
  },
  {
    id: '1',
    name: 'Ahora',
    bgColor: 'darkred',
    color: 'white'
  },
  {
    id: '2',
    name: 'Pronto',
    bgColor: '#a24608',
    color: 'white'
  },
  {
    id: '3',
    name: 'Temprano',
    bgColor: 'lawngreen',
    color: 'white'
  },
  {
    id: '4',
    name: 'Pendiente',
    bgColor: 'darkgrey',
    color: 'white'
  }
];
export var scheduleList = [
  {
    id: '0',
    calendarId: '1',
    title: 'Some',
    category: 'time',
    location:"ss",
    dueDateClass: '',
    start: new Date(),
    end: 'Sat Apr 8 2020 12:12:00 GMT-0500'
  },
  {
    id: '2',
    calendarId: "2",
    title: "ssss2",
    category: "time",
    location: "0,0",
    dueDateClass: "",
    start: "2020-04-14T05:00:00.000Z",
    end: "2020-04-14T05:59:00.000Z"
  }

];
export var view = 'month';
export var taskView = false;
export var scheduleView = ['time'];
export var theme = {
  'month.dayname.height': '30px',
  'month.dayname.borderLeft': '1px solid #ff0000',
  'month.dayname.textAlign': 'center',
  'week.today.color': '#333',
  'week.daygridLeft.width': '100px',
  'week.timegridLeft.width': '100px'
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
export var template = {
  milestone: function(schedule) {
    return `<span style="color:red;">${schedule.title}</span>`;
  },
  milestoneTitle: function() {
    return 'MILESTONE';
  },
};
export var useCreationPopup = true;
export var useDetailPopup = true;

