<template>
  <div>
    <el-input
      :placeholder="placeholderText"
      v-model="searchVal"
      :size="sizeSet"
      clearable
    ></el-input>
  </div>
</template>
<script>
// const delay = (function () {
//   let timer = 0
//   return function (callback, ms) {
//     clearTimeout(timer)
//     timer = setTimeout(callback, ms)
//   }
// })();
export default {
  name: "SearchInput",
  props: ['placeholder', 'size'],
  data() {
    return {
      placeholderText: this.placeholder,
      sizeSet: this.size,
      searchVal: ""
    };
  },
  watch: {
    // 监听页面变量的变化
    // 变化停止500ms执行一次搜索
    searchVal() {
      // delay(() => {
        this.$emit("searchFun", this.searchVal);
      // }, 500);
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
