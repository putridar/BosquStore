import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        },
        temp: {}
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            this.getValue(response.data.items)
            this.renderChart(this.datacollection, this.options)
        })
    },
    getValue : function(data) {
        for (let x = 0; x < data.length; x++) {
            this.datacollection.labels.push(data[x]["timestamp"])
            var item = data[x]["readings"]["psi_twenty_four_hourly"]
            for (var [key, value] of Object.entries(item)) {
                if (key in this.temp) {
                    this.temp[key].push(value);
                } else {
                    this.temp[key] = [value]
                }
            }
        }
        var color = ["#F9D1D1", "#FFA4B6", "#F765A3", "#A155B9", "#165BAA", "#0B1354"]
        var count = 0 
        for ([key, value] of Object.entries(this.temp)) {
            this.datacollection.datasets.push({
                data: value,
                label: key,
                borderColor: color[count],
                fill: false
            })
            count ++;
        }
    }
  },
  created () {
    this.fetchItems()
  }
}