import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Battle from "./views/Battle.vue";
import Tavern from "./views/Tavern.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/battle",
      name: "Battle",
      component: Battle
    },
    {
      path: "/tavern",
      name: "Tavern",
      component: Tavern
    }
  ]
});
