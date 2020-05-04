const calendarList = [
  {
    id: '2',
    name: 'Expirada',
    status: 'expired',
    bgColor: '#e8e6e7',
    color: '#2b2b2b'
  },
  {
    id: '3',
    name: 'Ahora',
    status: 'now',
    bgColor: '#eab5a9',
    color: '#d45454'
  },
  {
    id: '4',
    name: 'Pronto',
    status: 'soon',
    bgColor: '#fae9b8',
    color: '#f5ce54'
  },
  {
    id: '0',
    name: 'Temprano',
    status: 'early',
    bgColor: '#e7edc0',
    color: '#c7db5f'
  },
  {
    id: '1',
    name: 'Pendiente',
    status: 'pending',
    bgColor: '#FFFFFF',
    color: '#d2d4d8'
  }
];
const clientList = [
  {
    id: '0',
    name: 'Interaccion',
    status: 'clients_w_tasks',
    bgColor: '#02aaf5',
    color: '#02aaf5'
  },
  {
    id: '1',
    name: 'Sin interaccion',
    status: 'clients_w_o_tasks',
    bgColor: '#113d4a',
    color: '#113d4a'
  },
];
const taskList = [
  {
    id: '0',
    name: 'LLamadas',
    status: 'Llamada',
    bgColor: '#67d3f9',
    color: '#67d3f9'
  },
  {
    id: '1',
    name: 'Reuniones',
    status: 'Reunion',
    bgColor: '#02aaf5',
    color: '#02aaf5'
  },
  {
    id: '2',
    name: 'Mails',
    status: 'Mail',
    bgColor: '#1d6fad',
    color: '#1d6fad'
  },
  {
    id: '3',
    name: 'Informes',
    status: 'Informe',
    bgColor: '#012162',
    color: '#012162'
  },
  {
    id: '4',
    name: 'Otros',
    status: 'Otro',
    bgColor: '#113d4a',
    color: '#113d4a'
  }
];
const clientOptionList = [
  {
    id: '0',
    name: 'Activos',
    status: 'active',
    bgColor: '#00b3ee',
    color: '#00b3ee'
  },
  {
    id: '1',
    name: 'Inactivos',
    status: 'inactive',
    bgColor: 'gray',
    color: 'gray'
  },
];
let PieChartOptions = function(series, list){
  return {
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + '%';
      }
    },
    series: list.slice().sort((a,b) => { return a.id - b.id; }).map(x => {
      return series[x.status];
    }),
    labels: list.slice().sort((a,b) => { return a.id - b.id; }).map(x => {return x.name;}),
    stroke: {
      width: 0,
      lineCap: 'round',
    },
    colors: list.slice().sort((a,b) => { return a.id - b.id; }).map(x => {return x.color;}),
    plotOptions: {
      pie: {
        donut: {
          size: '55%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, sans-serif',
              fontWeight: 600,
              colors: '#000',
              offsetY: 20,
            },
            value: {
              show: true,
              fontSize: 'calc(1.25em + 1vmin)',
              fontFamily: 'Rubik',
              color: '#000',
              offsetY: -20,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              label: 'Total',
              color: '#000',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce(function (a, b) {
                  return a + b;
                }, 0);
              }
            }
          }
        }
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    },
  };
};
let LineChartOptions = function (series, list) {

};
let ColumnCharOptions = function(series, list){
  return {
    chart: {
      height: 250,
      type: 'bar',
    },
    colors: list.slice().sort((a,b) => { return a.id - b.id; }).map(x => {return x.color;}),
    plotOptions: {
      bar: {
        columnWidth: '15%',
        distributed: true,
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false,
    },
    // series: [{
    //   data: [21, 22, 10, 28, 16, 21, 13, 30]
    // }],
    series: [{
      data: list.slice().sort((a,b) => { return a.id - b.id; }).map(x => {
        return series[x.status];
      })
    }],
    xaxis: {
      categories: list.slice().sort((a,b) => { return a.id - b.id; }).map(x => {return x.name;}),
      labels: {
        style: {
          colors: list.slice().sort((a,b) => { return a.id - b.id; }).map(x => {return x.color;}),
          fontSize: '14px'
        }
      }
    }
  };
};
export const calendarPriorityOptions = function (seriesObj){
  return PieChartOptions(seriesObj, calendarList);
};
export const clientPriorityOptions  = function (seriesObj){
  return PieChartOptions(seriesObj, clientList);
};
export const tasksPriorityOptions  = function (seriesObj){
  return PieChartOptions(seriesObj, taskList);
};
export const clientsOptions = function (seriesObj){
  return ColumnCharOptions(seriesObj, clientOptionList);
};

export default {
  calendarPriorityOptions,
  clientPriorityOptions,
  tasksPriorityOptions,
  clientsOptions
};
