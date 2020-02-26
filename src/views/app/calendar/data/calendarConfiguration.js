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
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-10-18T22:30:00+09:00',
        end: '2018-10-19T02:30:00+09:00'
    },
    {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-10-18T17:30:00+09:00',
        end: '2018-10-19T17:31:00+09:00'
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

