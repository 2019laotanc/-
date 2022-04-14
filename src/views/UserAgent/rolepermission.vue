<template>
  <div>
    <el-card class="edit-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="ft20 tac">{{ cardTitle }}</div>
      </div>
      <el-table ref="multipleTable" v-loading="loading" :data="tableData"  row-key="id" default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-checkbox v-model="checkedAll" @change="handleCheckedAll(scope)" />
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked" @change="handleCheckedOne(scope.row)" />
          </template>
        </el-table-column>

        <el-table-column prop="name" label="菜单名称" min-width="150">
        </el-table-column>
       
      </el-table>
      <div class="tac mt40">
        <el-button class="wid-10 mr20" size="small" type="primary" @click="handleSubmit()" :disabled="disabled">
          提交
        </el-button>
        <el-button class="wid-10" size="small" @click="backBtn()">返回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
// import { deepClone } from "@/utils";
export default {
  name: "RolePermission",
  props: ["role"],
  data() {
    return {
      loading: false,
      cardTitle: "实时显示列表",
      disabled: false, // 控制重复点击
        tableData: [{
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
            }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }]
            }, {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            }],
      checkedAll:false,
      checkedRows:[]
    };
  },
  created() {
    getTableData()
  },
  mounted() {
    
  },
  methods: {
    // boolValue接收一个布尔值
    checkOne(obj, boolValue) {
      // console.log(obj, "checkOne----obj");
      let index = this.checkedRows.findIndex((item) => item.id == obj.id);
      if (boolValue) {
        if (index < 0) {
          this.checkedRows.push(obj);
        }
      } else {
        if (index > -1) {
          this.checkedRows.splice(index, 1);
        }
      }
      obj.checked = boolValue;
      // 判断存不存在child,存在就递归赋值
      if (obj.child) {
        obj.child.forEach((item) => this.checkOne(item, boolValue));
      }
      if (obj.parent_id > 0) {
        this.checkParent(obj.parent_id, boolValue);
      }
    },
    // 绑定每一行checkbox的change事件
    handleCheckedOne(row) {
      if (row.checked) {
        this.checkOne(row, true);
      } else {
        this.checkOne(row, false);
      }
      // console.log(this.checkedRows, "checkOne");
    },
    checkAll(arr, boolValue) {
      arr.forEach((item) => {
        if (boolValue) {
          this.checkedRows.push(item);
        }
        item.checked = boolValue;
        // child同样是数组
        if (item.child) {
          this.checkAll(item.child, boolValue);
        }
      });
    },
    handleCheckedAll(scope) {
      // 实际上scope并没有什么用处，仅为了表头checkbox不显示的bug
      console.log(scope);
      this.checkedRows = [];
      if (this.checkedAll) {
        this.checkAll(this.tableData, true);
      } else {
        this.checkAll(this.tableData, false);
      }
      console.log(this.checkedRows);
    },
    getTableData(){

    }
  },
};
</script>
<style lang="less" scoped>
.edit-card {
  padding: 0 0 18px;
}
</style>
