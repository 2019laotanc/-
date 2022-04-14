<template>
  <div>
    <div class="menu-content">
      <el-card class="box-card" shadow="never">
       
        <el-button class="h38" style="margin-right: 20px" size="large" type="primary" icon="el-icon-plus"  @click="handleAdd">添加菜单</el-button>

        <el-table   :data="tableData"  align="center">
          <el-table-column prop="name" label="菜单名称"></el-table-column>
          <!-- <el-table-column prop="title" label="标题"></el-table-column> -->
          <el-table-column prop="path" label="菜单路径"> </el-table-column>
          <el-table-column prop="sort" label="排序"> </el-table-column>
          <!-- <el-table-column prop="component" label="页面模块" min-width="150"></el-table-column> -->
          <el-table-column prop="parent_name" label="父级菜单"> </el-table-column>
          <!-- <el-table-column prop="hidden" label="是否隐藏"> </el-table-column> -->
           <!-- <el-table-column prop="alwaysshow" label="常否隐藏"> </el-table-column> -->
          
  
          <el-table-column label="操作" >  <!-- 判断是否已有操作权限 v-if="isAdmin?true:(power.includes(2)||power.includes(3))" -->
            <template slot-scope="scope">
              <div>
                <span class="pointer" style="color: #1890ff"  @click="handleEdit(scope.row)">编辑</span>
                <el-divider direction="vertical"></el-divider>
                <span class="pointer"  @click="handleDelete(scope.row)">删除</span>
              </div>
            </template>
          </el-table-column>  
        </el-table>
        <Pagination  @connect="get_page"  :total=total :page=page :page_row=page_row></Pagination>
      </el-card>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="42%" center :before-close="dialogBeforeClose">
      <div>
        <el-form :rules="rules" ref="form" :model="form" label-width="120px">
          <el-form-item label="菜单名称：" prop="name">
            <el-input size="small" v-model="form.name" placeholder="请输入"  :disabled="!addParent"></el-input>
          </el-form-item>
          <el-form-item label="父级菜单：" prop="parent_name">
            <el-select size="small" class="wid-100" v-model="form.parent_name" placeholder="请选择" @change="selectChange">
              <el-option label="无" :value="0"></el-option>
              <el-option v-for="item in parentData" :key="item.sort" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址：" prop="menu_path">
            <el-input size="small" v-model="form.menu_path"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input size="small" v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="icon：" prop="icon">
            <div
            :class="['icon', item === form.icon ? 'active-icon':'']"
            v-for="(item, index) in iconList"
            :key="index"
            @click="form.icon = item">
              <icon-park
              :type="item"
              theme="outline"
              size="24"
              fill="#606266">
              </icon-park>
            </div>
          </el-form-item>
          <!-- <el-form-item label="状态：" prop="state">
            <el-radio-group v-model="form.state">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" class="wid-15 mr20" @click="dialogBeforeClose">取 消</el-button>
        <el-button size="small" class="wid-15" :disabled="disabled" type="primary" @click="handleSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>  
  </div>
</template>
<script>

import SearchInput from "@/components/SearchInput";
import Pagination from './../../components/pagination.vue'

export default {
  components: {
    SearchInput,
    Pagination
  },
  data() {
    return {
      total:0,
      page:1,
      page_row:10,
      addParent:false,
      isAdmin: false, // 是否为管理员
      iconList: [ 'user','setting-two','data-file','calendar','order','dashboard-one','equal-ratio','user-positioning','more-four','info'],
      disabled: false, // 控制重复点击
      loading: false, // 加载动态
      tableData: [],
      parentData:[],
      dragData: [],
      dialogVisible: false,
      dialogTitle:'',
      form: {
         name:'',
         menu_path:'',
         sort:'',
         parent_name:'',
         icon:''
      },
      rules: {
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" }
        ],
        parent_name: [{ required: false, message: "请选择父级菜单", trigger: "blur" }],
        // menu_path: [{ required: true, message: "请输入地址", trigger: "blur" }],
        // icon: [{ required: false, message: "请选择图标", trigger: "blur" }],
        sort: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
    };
  },

  created() {
    this.init()
  },
  mounted() {
   
  },
  methods: {
    
    init(){
      let params = {
        page:this.page,
        limit:this.page_row,
      }
      this.$test.get_menu_list(params).then(
      res => {
        this.total = res.data.data.total
        this.tableData = res.data.data.items
        this.parentData = res.data.data.items.filter( item => item.parent_name === '')
      })
    },


    handleDelete(item){
       let params ={
        name:item.name
      }
      console.log(params)
      let self = this
      this.$confirm("请谨慎操作，确认删除该用户？", {
                type: "warning"
        }).then(() => {
      self.$test.menu_delete(params).then(
            res =>{
              if(res.data.code === 20000){
                self.$message.success('删除成功');
                self.init()
              }else{
                self.$message.error('删除失败');
              }
            })    
        })
    },

    selectChange(val) {
      console.log('value',val)
      this.form.parent_name = val === 0 ? '无' : val;
    },

    handleAdd() {
      this.addParent = true
      this.dialogTitle = "添加菜单";
      this.form = {
         name:'',
         menu_path:'',
         sort:'',
         parent_name:'',
         icon:''
      };
      this.dialogVisible = true;
    },
    handleEdit(o) {
      console.log('数据',o)
      this.dialogTitle = o.name;
      this.form.name = o.name;
      this.form.menu_path = o.path;
      this.form.sort = o.sort;
      this.form.parent_name = o.parent_name;
      this.form.icon = o.meta.icon;
      this.dialogVisible = true;
      this.addParent = false
    },
    handleSubmit(formName) {
      let self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params ={
              name: this.form.name,
              menu_path:this.form.menu_path,
              component:'',
              sort:this.form.sort,
              parent_name: this.form.parent_name === '无' ? '' : this.form.parent_name,
              hidden:'',
              redirect:'',
              alwaysshow:'',
              meta:{
                title:'',
                noCache: false, 
                icon: this.form.icon
              }
          }
          if(this.addParent){
              this.$test.menu_add(params).then( res => {
              if(res.data.code === 20000){
                  self.$message.success('添加成功');
                  self.init()
                  
                }else{
                  self.$message.error('添加失败');
                  
                }
                self.addParent =false
                self.dialogVisible = false;
            })
          }else{
            this.$test.menu_put(params).then( res => {
              if(res.data.code === 20000){
                  self.$message.success('修改成功');
                  self.init()
                }else{
                  self.$message.error('修改失败');
                }
              self.dialogVisible = false;
            })
          }
          
        } else {
          return false;
        }
      });
    },
    dialogBeforeClose() {
      this.$refs["form"].resetFields();
      this.form = {
         name:'',
         menu_path:'',
         sort:'',
         parent_name:'',
         icon:''
      };
      this.dialogVisible = false;
      this.addParent = false
      this.disabled = false;
    },
    get_page(item){
      this.page = item['page'];
      this.page_row = item['page_row'];
      this.init()
    },
  }
};
</script>
<style>
.ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #409eff !important;
}
</style>
<style lang="less" scoped>
.move {
  cursor: move;
}

.icon {
  display: inline-block;
  cursor: pointer;
  margin-right: 8px;
  padding: 2px;
  box-sizing: content-box;
}

.active-icon {
  background: #7393e2;
  color: #fff;
}

.search-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  .search-wrap {
    display: flex;

    button {
      margin-left: 17px;
      margin-right: 17px;
    }
  }
}
// 去除图标的下偏移
/deep/ .i-icon {
  vertical-align: 0 !important;  
}
.iconFormItem {
  /deep/ .el-form-item__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 40px;
  }
  .icon {
    display: inline-block;
    height: 24px;
    margin-right: 8px;
    padding: 2px;
    box-sizing: content-box;
    cursor: pointer;
  }
}
.tal{text-align:left}
</style>
