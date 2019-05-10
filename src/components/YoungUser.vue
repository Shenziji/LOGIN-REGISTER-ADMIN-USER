<template>
  <div id="younguser">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="_id" label="用户id"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  data() {
    return {
      tableData: []
    };
  },

  created () {
      // console.log(this.$store.state.userList);
      this.tableData = this.$store.getters.youngUser
  }
};
</script>
<style>
</style>