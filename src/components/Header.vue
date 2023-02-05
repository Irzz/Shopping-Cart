<template>
    <nav class="navbar bg-light">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Shop</span>
            <span class="navbar-brand mb-0 h1">Cart 
                <span class="badge text-bg-primary">{{ totalQty }}</span>
            </span>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Header",
    computed: {
        ...mapGetters(["cart"]),
        totalQty() {
            return this.cart.reduce((a, b) => a + b.qty, 0);
        },
    },
};
</script>

<style scoped>
.navbar{
    margin-bottom: 50px;
}

</style>