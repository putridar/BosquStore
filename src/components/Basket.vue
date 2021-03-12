<template>
  <div class = "basket">
    <p> Menu: </p>
    <ul>
        <li v-for="(item,index) in itemsSelected" :key="index"> 
            {{item[0]}} x {{item[1]}}
        </li>
    </ul>
    <button v-on:click = "findTotal(); sendOrder();"> Add Order </button><br>
    <p v-show="show">Subtotal: ${{total}} </p>
    <p v-show="show">Grand Total: ${{grandTotal}} </p>
  </div>
</template>

<script>
import db from "../firebase.js"

export default {
    data() {
        return {
            counter: 0,
            total: 0,
            grandTotal: 0,
            show: false,
            order: []
        }
    },
    props: {
        itemsSelected: {
            type: Array
        },
        //menu from pageContent
        items: {
            type: Array
        }
    },
    methods: {
        findTotal: function() {
            this.total = 0;
            for (let x = 0; x < this.itemsSelected.length; x++) {
                var price = this.itemsSelected[x][2] * this.itemsSelected[x][1];
                this.total += price;
            }
            this.show = true;
            return this.total;
            
        },
        convertData : function() {
            for (let x = 0; x < this.itemsSelected.length; x++) {
                var item = {
                    name: this.itemsSelected[x][0],
                    count: this.itemsSelected[x][1],
                    price: this.itemsSelected[x][2],
                };
                this.order.push(item);
            }
        },
        //add menu with count 0 since it is not handled in PageContent
        addData : function() {
            for (let x = 0; x < this.items.length; x++) {
                var found = false;
                for (let y = 0; y < this.order.length; y++) {
                    if (this.items[x].name == this.order[y].name) {
                        found = true;
                    }
                }
                if (!found) {
                    this.order.splice(x,0, {
                        name: this.items[x].name,
                        count: 0,
                        price: this.items[x].price,
                    })
                }
            }
        },
        sendOrder: function() {
            this.convertData();
            this.addData();
            db.collection('orders').add({
                item: this.order
            }).then(() => {location.reload()});
        }
    },
    watch: {
        total:function(val) {
            this.total = val;
            this.grandTotal = val * 1.07;
            this.grandTotal = this.grandTotal.toFixed(2);
        },
        
    }

}

</script>


<style scoped>
    .basket {
        text-align: left;
    }
    button {
        background-color: #9fe3cf;
        width: 250px;
        height: 40px;
        border-radius: 5px;
        font-size: 20px;
    }
    p {
        margin: 10px;
        font-size: 24px;
    }
    li {
        font-size: 24px;
        margin: 10px;
    }
</style>
