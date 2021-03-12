<template>
  <div class = "count">
    <button v-on:click="decrease()"> - </button>
    {{counter}}
    <button v-on:click="increase()"> + </button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        increase: function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.counter++;
            }
            this.$emit('counter', this.item, this.counter);
            return this.counter;
        },
        decrease: function() {
            this.counter = Math.max(this.counter - 1, 0);
            this.$emit('counter', this.item, this.counter);
            return this.counter;
        }
    }

}

</script>


<style scoped>
    button {
        background-color: #4ed9c6;
        text-align: center;
        border-radius: 5px;
        width: 35px;
        height: 35px;
    }
    .count {
        font-size:30px;
        margin: 8px;
    }
</style>
