<template>
  <div class="pagination">
    <el-pagination background
     @current-change="handleCurrentChange"
      @size-change="handleSizeChange" layout="prev, pager, next, sizes, total" 
      :total=total :page-size=page_row  :page-sizes="[ 10,20, 30, 50,100,1000]">
    </el-pagination>
  </div>

</template>

<style lang="less" scoped>
    .pagination{
        padding-top: 12px;
        display: flex;
        justify-content: flex-end;
    }
</style>

<script>
  export default{
    props:[
        "total",
        "page",
        "page_row",
    ],
    data() {
      return {
        pageid:this.page,
        pagesize:this.page_row
      };
    },
    methods: {
        handleSizeChange: function (size) {
          this.pagesize = size
          let item = {};
          item['page']=this.pageid;
          item['page_row'] = this.pagesize;
          this.$emit("connect",item);
        },
        handleCurrentChange: function (currentPage) {
          this.pageid = currentPage
          let item = {};
          item['page']=this.pageid;
          item['page_row'] = this.pagesize;
          this.$emit("connect",item);
        },
    },
    watch:{
        pageid:function () {
            this.pageid= this.page
        },
        pagesize:function () {
            this.pagesize= this.page_row
        }
    }
  }
</script>
