<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <router-link to="/app/123">app</router-link>
    <router-link :to="{name:'login'}">login</router-link>
    <!--<router-link to="/login/exact">login exact</router-link>-->
    <transition name="fade">
      <router-view/>
    </transition>
    <div>{{ count }}</div>
    <div>{{ fullName }}</div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  import Todo from './views/todo/todo.vue'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      Header,
      Footer,
      Todo
    },
    mounted () {
      // console.log(this.$route)
      console.log(this.$store)
      this.updateCountAsync({
        num: 555,
        time: 2000
      })
      this.updateCount({
        num: 222,
        num2: 5
      })
    },
    computed: {
      ...mapState(['count']),
      ...mapGetters(['fullName'])
    },
    methods: {
      ...mapMutations(['updateCount']),
      ...mapActions(['updateCountAsync'])
    }
  }
</script>

<style lang="stylus" scoped>
  #app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }

  #cover {
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }
</style>


