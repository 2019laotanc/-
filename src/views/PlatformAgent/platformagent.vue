<template>
    <el-card class="box-card" shadow="never">
        
        <el-row  type="flex" justify="space-between">
            <el-col :sm="3" :xs="12">
                <el-button class="h38" style="margin-right: 20px" size="large" type="primary" icon="el-icon-plus"  @click="handleAdd">添加供应商</el-button>
            </el-col>
            <div class="el-flex">
                <el-input placeholder="供应商名称" v-model="searchForm.platform_value"></el-input>
                <el-select   v-model="searchForm.status" placeholder="请选择状态" >
                    <el-option v-for="item , index in statusOpaion" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            </div>
        </el-row>
        
        <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="供应商ID">
        </el-table-column>

        <el-table-column prop="platform_key" label="供应商"> </el-table-column>
        <el-table-column prop="platform_value" label="供应商名称"> </el-table-column>
        <el-table-column prop="descrption" label="备注"> </el-table-column>
        <el-table-column label="状态"> 
            <tempalte slot-scope="scope">
                <span>{{ statusOption[scope.row.status]}}</span>
            </tempalte>
        </el-table-column>
        <el-table-column prop="add_user_id" label="添加用户ID"> </el-table-column>
        <el-table-column prop="create_time" label="添加时间"> </el-table-column>
        <el-table-column prop="update_time" label="修改时间"> </el-table-column>
        <el-table-column label="操作"> 
            <template slot-scope="scope">
                <span class="pointer"   @click="handleEdit(scope.row)">编辑</span>
                <el-divider direction="vertical"></el-divider>
                <span class="pointer"  style="color: red" @click="handleDelete(scope.row)">删除</span>
            </template>
        </el-table-column>
        </el-table>
         <!-- 页数修改 公用代码 -->
        <Pagination  @connect="get_page"  :total=total :page=page :page_row=page_row></Pagination>

         <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" center :before-close="dialogBeforeClose">
            <el-form :label-position="labelPosition" label-width="140px" :model="platform" :rules="rules" ref="ruleForm">
            
            <el-form-item label="供应商key" prop="platform_key">
                <el-input v-model="platform.platform_key" placeholder="请输入供应商key"></el-input>
            </el-form-item>

            <el-form-item label="供应商名称" prop="platform_value">
                <el-input v-model="platform.platform_value" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="descrption">
                <el-input v-model="platform.descrption" placeholder="请输入描述"></el-input>
            </el-form-item>

            <el-form-item label="供应商" prop="type">
                <el-select   v-model="platform.type" placeholder="请选择状态" >
                    <el-option v-for="item , index in typeOpaion" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

             <el-form-item v-if="platformEdit" label="状态" prop="status" >
                <el-select   v-model="platform.status" placeholder="请选择状态" >
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
import Pagination from '../../components/pagination.vue'
// import { param } from '../../../../vue-element-admin/src/utils'

export default {

components:{
    Pagination
},

data(){
    return {
        labelPosition: 'right',
        total:0,
        page:1,
        page_row:10,
        platformEdit:false,
        dialogVisible:false,
        dialogTitle:'添加供应商',
        tableData:[],   //表单数据
        searchForm:{
           platform_value:'',
           status:''
        },
        
        statusOpaion:[
            {value:1,label:'禁用'},
            {value:0,label:'正常'}
        ],
        typeOpaion:[
            {value:'1',label:'PB'},
            {value:'2',label:'TF'},
            {value:'3',label:'BOB'},
            {value:'4',label:'IM'},
            {value:'5',label:'FY'},
            {value:'6',label:'LJJ'},
            {value:'7',label:'IA'},
        ],
        statusOption:{
            1:'禁止',
            0:'正常'
        },
        platform:{
            platform_key:'',        //供应商key
            platform_value:'',      //供应商名称
            descrption:'',          //描述
            type:'',                //类型 integer
            //用于修改的参数
            id:'',  //integer
            create_time:'',
            status:0
        },
        rules:{
            platform_key: [{ required: true, message: "请输入供应商key", trigger: "blur" }],
            platform_value: [{ required: true, message: "请输入供应商名称", trigger: "blur" }],
            descrption: [{ required: true, message: "请输入描述", trigger: "blur" }],
            type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        }
    }
},
created(){
    this.initData()
},
methods:{
    initData(){
        this.loading = true
        let params ={
            limit : this.page_row,
            page:this.page
        }
        this.$test.platform_list(params).then(res => {
            console.log('res', res)
            this.tableData = res.data.data.items
            this.total = res.data.data.total
            this.loading = false
        })
    },
    get_page(item){
      this.page = item['page'];
      this.page_row = item['page_row'];
      this.search()
      },
    
    search(){
        this.loading = true
        let params ={
            platform_value:this.searchForm.platform_value,
            status: Number(this.searchForm.status),
            limit : this.page_row,
            page:this.page
        }
        this.$test.platform_list(params).then(res => {
            if( res.data = 20000){
                this.tableData = res.data.data.items
                this.total = res.data.data.total
            }else{
               this.$message.error(res.data.message); 
            }
            
            
            this.loading = false
        })
    },
    handleAdd(){
        this.platformEdit = false,
        this.dialogVisible = true
    },
    dialogBeforeClose(){
        this.$refs["ruleForm"].resetFields();
        this.dialogVisible = false;
       this.platformEdit = false
    },
    submitForm(item){
        this.$refs[item].validate((valid) => {
                if (valid) {
                    let params ={
                            platform_key: this.platform.platform_key,        //供应商key
                            platform_value: this.platform.platform_value,      //供应商名称
                            descrption: this.platform.descrption,          //描述
                            type: Number(this.platform.type),                //类型 integer
                    }
                    if(this.platformEdit){
                        params.create_time = this.platform.create_time
                        params.status = this.platform.starus
                    this.$test.platform_edit(params).then( res => {
                        if(res.data.code === 20000){
                            this.$message.success('修改成功');
                            this.initData()
                        }else{
                            this.$message.error(res.data.message);
                        }
                        this.dialogVisible = false
                      })
                    }else{
                        
                    this.$test.platform_add(params).then( res => {
                        if(res.data.code === 20000){
                            this.$message.success('添加成功');
                            this.initData()
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
      this.platform.platform_key =row.platform_key
         this.platform.platform_value = row.platform_value 
         this.platform.descrption = row.descrption    
        this.platform.type = row.type
        this.platform.create_time = row.create_time
        this.platform.starus =  row.starus
         this.dialogTitle = '修改供应商信息',
        this.platformEdit = true,
        this.dialogVisible = true
    },
    handleDelete(item){
        let params ={
            id:item.id
        }
        this.$confirm("请谨慎操作，确认删除该供应商？", {
                type: "warning"
            }).then(() => {
                this.$test.platform_delete(params).then(res => {
                    if(res.data.code === 20000){
                        this.$message.success('添加成功');
                        this.initData()
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            })
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