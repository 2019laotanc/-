<template>
  <div>
    <menu-table :key="componentKey"></menu-table>
  </div>
</template>
<script>
import MenuTable from "./menutable";

export default {
  components: {
    MenuTable
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  // methods: {
  //   forceRerender() {
  //     this.componentKey += 1;
  //   }
  // }
};
</script>


<style lang="less" scoped>
/deep/ .el-table__body-wrapper::-webkit-scrollbar:horizontal{
   display: block !important
}
</style>