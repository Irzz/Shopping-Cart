<template>
    <div class="cart">
        <div v-if="!cart.length" class="alert alert-secondary" role="alert">
            No product in cart!
        </div>
        <div v-if="orderPlaced" class="alert alert-success" role="alert">
            Order Successfully placed
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="() => (orderPlaced = false)"></button>
        </div>
        <ul class="list-group">
            <li class="list-group-item" v-for="item in cart" :key="item.id">
                <div class="media d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <img width="80px" :src="item.imgUrl" :alt="item.title">
                    </div>
                    <div class="media-body flex-grow-1 ms-3">                   
                        <p class="mt-0">{{item.title}}</p>
                        <button class="btn-qty btn btn-sm btn-secondary" @click="reduceQty(item.id)">-</button>
                        x {{ item.qty }}
                        <button class="btn-qty btn btn-sm btn-secondary" @click="addQty(item.id)">+</button>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="removeItemFromCart(item.id)"></button>
                </div>
            </li>
        </ul>
        <button class="btn-checkout btn btn-lg btn-success d-grid col-10 mx-auto" v-if="cart.length" :disabled="isProcessing" @click="placeOrder">
            <span v-if="!isProcessing">Checkout Rp.{{ totalPrice }}</span>
            <div  v-else class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Cart",
    data() {
        return {
            isProcessing: false,
            orderPlaced: false
        }
    },
    computed: {
        ...mapGetters(["cart"]),
        totalPrice() {
            return this.cart.reduce((a, b) => a + b.qty * b.price, 0)
        }
    },
    methods: {
        ...mapActions(["removeItemFromCart", "addQty", "reduceQty", "emptyCart"]),
        placeOrder() {
            this.isProcessing = true;
            setTimeout(() => {
                this.isProcessing = false;
                this.orderPlaced = true;
                this.emptyCart();
            }, 1000)
        }
    }
}
</script>

<style scoped>
.btn-qty {
    border-radius: 50%;
    width: 30px;
}
.media-body {
    text-align: left;
}
.media{
    width: 90%;
}
.btn-checkout{
    margin-top: 20px;
}
</style>