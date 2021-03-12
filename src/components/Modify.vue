<template>
  <div class="modify">
    <ul>
        <li v-for="(item,index) in datapacket" :key="index"> 
            <label> {{item.name}}: {{item.count}} </label><br>
            <input id="index" placeholder=0 type="number" min="0" v-model="updated[index].count"/><br>
        </li>
    </ul>
    <button v-on:click="updateOrder">Update Order</button>
  </div>
</template>

<script>
import db from "../firebase.js"

export default {
    data() {
        return {
            datapacket: [],
            //store the menu
            items: [],
            //temp variable to show 0 instead of current count in the input (as shown in gdrive)
            updated:[],

        }
    },
    props: {
        id: {
            type: String
        }
    },
    methods: {
        fetchItems : function() {
            db.collection('orders').doc(this.id).get().then(snapshot => {
                var item = snapshot.data().item
                this.datapacket = item
                this.setDefault();
            });
        },
        //set the default value as null
        setDefault : function() {
            for (let x = 0; x < this.datapacket.length; x++) {
                this.updated.push({
                    name: this.datapacket[x].name,
                    count: null,
                    price: this.datapacket[x].price
                });
            }
        },
        updateOrder : function() {
            //update datapacket when the count in updated variable is updated
            for (let x = 0; x < this.updated.length; x++) {
                if (this.updated[x].count != null) {
                    this.datapacket[x].count = Number(this.updated[x].count);
                }
            }
            db.collection('orders').doc(this.id).update({
                item: this.datapacket
            }).then(() => {this.$router.push({ path: '/orders'})});
        }
    },
    created(){
      this.fetchItems()    
    }

}

</script>


<style scoped>
    .modify {
        text-align: left;
        margin: 10px;
    }
    ul {
        
        list-style-type: none;
        padding: 0;
    }
    li {
        font-size : 20px;
        margin-top: 20px
    }
    input {
        height: 30px;
        width: 300px;
        font-size: 20px
    }
    button {
        width: 200px;
        height: 70px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
        font-size: 20px;
    }
</style>
