<template>
  <div id="app">
    <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <bar-chart></bar-chart>
    <API></API>
  </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import API from './charts/CallAPI.vue'
export default {
  name: 'app',
  components: {
    BarChart,
    API
  }
}
</script>

<style scoped>
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        border: 1px solid #222;
        margin: 10px;
    }
</style>
