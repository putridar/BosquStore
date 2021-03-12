<template>
  <div class = "basket">
    <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <ul>
        <li v-for="(item,index) in orders" :key="index"> 
            <div style="float:right; margin-right:10px">
            <button v-bind:id="item[0]" v-on:click="deleteItem($event)"> Delete </button>
            <button v-bind:id="item[0]" v-on:click="route($event)"> Modify </button>
            </div>
            <div style="float:left; margin-left:50px">
            <p v-for="(itemm,index) in item[1]" :key="index"> 
                {{itemm.name}}: {{itemm.count}}
            </p>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import db from "../firebase.js"

export default {
    data() {
        return {
            orders: [],
            menu: []
        }
    },
    methods: {
        fetchItems : function() {
            db.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    console.log(doc.data().item[1].count)
                    var item = [doc.id, doc.data().item]
                    console.log(item[1][0].count)
                    this.orders.push(item)
                });
            });
        },
        deleteItem : function(event) {
            let doc_id = event.target.getAttribute("id");
            db.collection('orders').doc(doc_id).delete().then(() => {location.reload()});
        },
        route : function(event) {
            this.$router.push({ name: 'modify', params: {id: event.target.getAttribute("id")} })
        }
    },
    created(){
      this.fetchItems()    
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
    button {
        width: 65px;
        height: 30px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
        float: right;
    }
</style>
