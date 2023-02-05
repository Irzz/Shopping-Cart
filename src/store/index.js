import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    products: [
        {
            "id": 1,
            "title": "Teh Pucuk",
            "price": 6600,
            "imgUrl": "https://assets.klikindomaret.com/share/20037565/20037565_1.jpg",
            "stock": 5
        },
        {
            "id": 2,
            "title": "Fanta : Strawberry",
            "price": 5000,
            "imgUrl": "https://assets.klikindomaret.com/products/20065780/20065780_2.jpg",
            "stock": 5
        },
        {
            "id": 3,
            "title": "Indomilk : Melon",
            "price": 4400,
            "imgUrl": "https://assets.klikindomaret.com/share/20053799_1.jpg",
            "stock": 5
        }
    ],
    cart: [],
};

const getters = {
    products: (state) => state.products,
    cart: (state) => state.cart,
};

const actions = {
    getProducts({ commit }) {
        commit("getProductData");
    },
    addItemToCart({ commit }, item) {
        commit("addToCart", item);
    },
    removeItemFromCart({ commit }, id) {
        commit("removeFromCart", id);
    },
    addQty({ commit }, id) {
        commit("addQty", id);
    },
    reduceQty({ commit }, id) {
        commit("reduceQty", id);
    },
    emptyCart({ commit }) {
        commit("emptyCart");
    }
};
const mutations = {
    getProductData(state) {
        state.products = products;
    },
    addToCart(state, item) {
        const productInCart = state.cart.find((product) => product.id === item.id);
        if (!productInCart) {
            state.cart.push({ ...item, qty: 1 });
        } else {
            productInCart.qty++;
        }
    },
    removeFromCart(state, id) {
        state.cart = state.cart.filter((item) => item.id !== id);
    },
    addQty(state, id) {
        const productInCart = state.cart.find((product) => product.id === id);
        productInCart.qty++;
    },
    reduceQty(state, id) {
        const productInCart = state.cart.find((product) => product.id === id);
        if (productInCart.qty > 1) {
            productInCart.qty--;
        } 
    },
    emptyCart(state) {
        state.cart = []
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});