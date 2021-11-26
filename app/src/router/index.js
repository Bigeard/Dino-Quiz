import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import HistoryQuiz from "../views/HistoryQuiz.vue";
import NewQuiz from "../views/NewQuiz.vue";
import Quiz from "../views/Quiz.vue";
import Signup from "../views/Signup.vue";
import Page404 from "../views/Page404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/history",
    name: "History",
    component: HistoryQuiz
  },
  {
    path: "/new-quiz",
    name: "New Quiz",
    component: NewQuiz
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz
  },
  {
    path: "/signup",
    name: "Sign up",
    component: Signup
  },
  {
    path: "*",
    name: "404",
    component: Page404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
