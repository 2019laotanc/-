<template>
    <el-card class="box-card" shadow="never">
        
        <el-row  type="flex" justify="space-between">
            <el-col :sm="3" :xs="12">
                <el-button class="h38" style="margin-right: 20px" size="large" type="primary" icon="el-icon-plus"  @click="handleAdd">添加资料</el-button>
            </el-col>
            <div class="el-flex">
                <el-input placeholder="账号id" v-model="searchForm.user_id"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            </div>
        </el-row>
        
        <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
            prop="account_id"
            label="账号id">
        </el-table-column>

        
        <el-table-column prop="add_user_id" label="添加用户ID"> </el-table-column>
        <el-table-column prop="start_date" label="开始时间"> </el-table-column>
        <el-table-column prop="end_date" label="结束时间"> </el-table-column>
        <el-table-column prop="order_index" label="数量"> </el-table-column>
        <el-table-column label="类型">
            <template slot-scope="scope">
                <span>{{ typeObject[scope.row.type]}}</span>
            </template>
        </el-table-column>

        <el-table-column label="状态"> 
            <tempalte slot-scope="scope">
                <span>{{ statusOption[scope.row.status]}}</span>
            </tempalte>
        </el-table-column>
        
        <el-table-column label="操作"> 
            <template slot-scope="scope">
                <span class="pointer"   @click="handleEdit(scope.row)">编辑</span>
                <el-divider direction="vertical"></el-divider>
                <span class="pointer"  style="color: red" @click="handleDelete(scope.row)">删除</span>
            </template>
        </el-table-column>
        </el-table>
         <!-- 页数修改 公用代码 -->
        <!-- <Pagination  @connect="get_page"  :total=total :page=page :page_row=page_row></Pagination> -->

         <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" center :before-close="dialogBeforeClose">
            <el-form :label-position="labelPosition" label-width="140px" :model="pluginform" :rules="rules" ref="ruleForm">
            
            <el-form-item  label="账号id" prop="account_id">
                <el-input v-model="pluginform.account_id" placeholder="请输入账号id"></el-input>
            </el-form-item>

            

             <el-form-item label="类型" prop="type" >
                <el-select   v-model="pluginform.type" placeholder="请选择类型" >
                    <el-option v-for="item , index in typeOpaion" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="开始时间" prop="start_date">
                <el-date-picker
                    v-model="pluginform.start_date"
                    type="date"
                    placeholder="选择开始日期">
                    </el-date-picker>
            </el-form-item>

              <el-form-item label=" 结束时间" prop="end_date">
                <el-date-picker
                    v-model="pluginform.end_date"
                    type="date"
                    placeholder="选择结束日期">
                    </el-date-picker>
            </el-form-item>

            <el-form-item label="数量" prop="order_index">
               <el-input-number v-model="pluginform.order_index" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>


            <el-form-item v-if="pluginEdit"  label="状态" prop="status" >
                <el-select   v-model="pluginform.status" placeholder="请选择平台状态" >
                    <el-option v-for="item , index in statusOpaion" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>


<script>
// import Pagination from '../../components/pagination.vue'
// import { param } from '../../../../vue-element-admin/src/utils'

export default {

// components:{
//     Pagination
// },

data(){
    return {
        labelPosition: 'right',
        total:0,
        loading:false,
        page:1,
        page_row:10,
        pluginEdit:false,
        dialogVisible:false,
        dialogTitle:'添加平台',
        tableData:[],   //表单数据

        searchForm:{
           user_id:'',
        },

        typeOpaion:[
            {value:0,label:'定量'},
            {value:1,label:'定时'},
        ],

        typeObject:{
            0:'定量',
            1:'定时'
        },
  
        statusOption:{
            1:'禁止',
            0:'正常'
        },
        pluginform:{
            account_id:'',
            type:'',   //平台ID
            start_date:'',
            end_date:'',
            order_index:'',
            //用于修改的参数
            id:'',  //integer
            create_time:'',
            status:0
        },
        rules:{
            account_id:[{ required: true, message: "请输入账号ID", trigger: "blur" }],   //平台ID
            type:[{ required: true, message: "请选择类型", trigger: "blur" }],  //供应商ID
            start_date:[{ required: true, message: "请选择开始时间", trigger: "blur" }],
            end_date:[{ required: true, message: "请选择结束时间", trigger: "blur" }],
            order_index:[{ required: true, message: "请填写数量", trigger: "blur" }],
            status: [{ required: true, message: "请输入平台状态", trigger: "blur" }],
        }
    }
},
created(){
    // this.initData()
},
methods:{
    formatDate(item) {
      var date = new Date(item);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

      return YY + MM + DD
    },
    // get_page(item){
    //   this.page = item['page'];
    //   this.page_row = item['page_row'];
    //   this.search()
    //   },
    
    search(item){
        this.tableData = []
        this.loading = true
        let params ={
            account_id:this.searchForm.user_id,
            // limit : this.page_row,
            // page:this.page
        }
        if(item){
            params.account_id = item
        }
        this.$test.betssoftware_get(params).then(res => {
            if( res.data.code = 20000 && res.data.data){
                this.tableData.push( res.data.data)
            }else{
               this.$message.error(res.data.message); 
            }
            
            this.loading = false
        })
    },
    handleAdd(){
        this.pluginEdit = false,
        this.dialogVisible = true
    },
    dialogBeforeClose(){
        this.$refs["ruleForm"].resetFields();
        this.dialogVisible = false;
       this.pluginEdit = false
    },
    submitForm(item){
        this.$refs[item].validate((valid) => {
                if (valid) {
                    let start = new Date(this.pluginform.start_date); 
                    let end = new Date(this.pluginform.end_date); 
                    start=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
                    end = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
                    let params ={
                        account_id : Number(this.pluginform.account_id),        //供应商key
                        type: Number(this.pluginform.type), 
                        start_date: new Date(start).getTime(),   //时间搓
                        end_date: new Date(end).getTime(), 
                        order_index: this.pluginform.order_index
                    }
                    if(this.pluginEdit){
                        params.id = this.pluginform.id
                        params.create_time = this.pluginform.create_time
                        params.status = this.pluginform.starus
                    this.$test.betssoftware_put(params).then( res => {
                        if(res.data.code === 20000){
                            this.$message.success('修改成功');
                            this.initData()
                        }else{
                            this.$message.error(res.data.message);
                        }
                        this.dialogVisible = false
                      })
                    }else{
                    params.ip_er = this.pluginform.ip_er, 
                    this.$test.betssoftware_post(params).then( res => {
                        if(res.data.code === 20000){
                            this.$message.success('添加成功');
                            // this.initData()
                        }else{
                            this.$message.error(res.data.message);
                        }
                        this.dialogVisible = false
                      })
                    }  
                }else{
                    return false
                }
           })
        },
    handleEdit(row){
        this.pluginform.account_id = row.account_id
        this.pluginform.type = row.type  
        this.pluginform.start_date = this.formatDate(row.start_date)
        this.pluginform.end_date = this.formatDate(row.end_date)
        this.pluginform.order_index = row.order_index
        this.pluginform.id= row.id
        this.pluginform.create_time = row.create_time
        this.pluginform.starus =  row.starus
         this.dialogTitle = '修改用户信息',
        this.pluginEdit = true,
        this.dialogVisible = true
    },
    handleDelete(item){
        let account_id = item.account_id
        let params ={
            id:item.id
           
        }
        this.$confirm("请谨慎操作，确认删除该用户么？", {
                type: "warning"
            }).then(() => {
                this.$test.betssoftware_delete(params).then(res => {
                    if(res.data.code === 20000){
                        this.$message.success('删除成功');
                        this.search(account_id)
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            })
        },
    handleChange(item){
        this.pluginform.order_index = item
    }
    }
}


</script>

<style lang="less" scoped>
   /deep/ .el-flex  .el-input{
       width: 160px;
   }
    /deep/ .el-flex .el-input__inner{
        width: 160px;
    }
   .el-flex{
       display: flex;
       justify-content: space-between;
   }
        
</style>