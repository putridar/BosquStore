import { Bar } from 'vue-chartjs'
import db from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Count",
                backgroundColor: ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#ED553B"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        orders: [],
        total: {},
        menu: [],
    }
  },
  methods: {
    fetchItems: function () {
        db.collection('menu').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                var item = doc.data().name 
                this.datacollection.labels.push(item)
                this.menu.push(item)
            })
          })
        db.collection('orders').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                this.countQuantity(doc.data().item)
            })
            this.convertData()
            this.renderChart(this.datacollection, this.options)
        })
    },
    countQuantity: function(item) {
        if (item !== undefined) {
            for (let x = 0; x < item.length; x++) {
                var curr = item[x]
                if (curr.name in this.total) {
                    this.total[curr.name] += curr.count;
                } else {
                    this.total[curr.name] = curr.count;
                }
            }
        }
    },
    convertData : function() {
        for (let x = 0; x < this.menu.length; x++) {
            this.datacollection.datasets[0].data.push(this.total[this.menu[x]]);
        }
    }
  },
  created () {
    this.fetchItems()
  }
}