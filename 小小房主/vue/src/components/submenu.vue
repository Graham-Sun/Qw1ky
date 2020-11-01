<template>
  <div>
    <template v-for="(item,index) in router">
      <el-submenu :index="item.name" :key="index" v-if="item.children">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>{{item.name}}</span>
        </template>
        <SubMenu :router="item.children" />
      </el-submenu>
      <el-menu-item v-else :index="item.path" :key="index">{{item.name}}</el-menu-item>
    </template>
  </div>  
</template>
<script>
  export default {
    //组件的唯一标识
    name: "SubMenu",
    //接受父组件传来的参数
    props: { router: Array },
    data() {
      return {
        xxx: 156
      }
    },
    methods: {

    },
    mounted() {
      // console.log(this.router);
    }

  }
</script>
<style>

</style>