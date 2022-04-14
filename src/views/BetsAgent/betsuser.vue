<template>
    <el-card class="box-card" shadow="never">
        
        <el-row  type="flex" justify="space-between">
            <el-col :sm="3" :xs="12">
                <el-button class="h38" style="margin-right: 20px" size="large" type="primary" icon="el-icon-plus"  @click="handleAdd">添加资料</el-button>
            </el-col>
            <div class="el-flex">
                <el-input placeholder="平台ID" v-model="searchForm.seti_id"></el-input>
                <el-select   v-model="searchForm.status" placeholder="状态" >
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
            prop="add_user_id"
            label="操作用户">
        </el-table-column>

        <el-table-column label="状态"> 
            <tempalte slot-scope="scope">
                <span>{{ statusOption[scope.row.status]}}</span>
            </tempalte>
        </el-table-column>
        <el-table-column prop="bank_card" label="银行卡号"> </el-table-column>
        <el-table-column prop="channel" label="渠道"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="key" label="密钥"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="phone" label="手机"> </el-table-column>
        <el-table-column prop="user_card" label="用户身份证"> </el-table-column>
        <el-table-column prop="descrption" label="备注1"> </el-table-column>
        <el-table-column prop="descrption" label="备注2"> </el-table-column>
        <el-table-column prop="name_end_time" label="姓名到期时间"> </el-table-column>
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
            <el-form :label-position="labelPosition" label-width="140px" :model="pluginform" :rules="rules" ref="ruleForm">
            
            <el-form-item  v-if="!pluginEdit" label="ip环境" prop="ip_er">
                <el-input v-model="pluginform.ip_er" placeholder="请输入ip环境"></el-input>
            </el-form-item>

            <el-form-item label="ip_id" prop="ip_id">
                <el-input v-model="pluginform.ip_id" placeholder="请输入ip_id"></el-input>
            </el-form-item>

             <el-form-item label="平台id" prop="seti_id" >
                <el-select   v-model="pluginform.seti_id" placeholder="请选择平台id" >
                    <el-option v-for="item , index in typeOpaion" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="供应商id" prop="platform_id">
                <el-input v-model="pluginform.platform_id" placeholder="请输入供应商id"></el-input>
            </el-form-item>

            <el-form-item label="收款地址id" prop="addr_id">
                <el-input v-model="pluginform.addr_id" placeholder="请输入收款地址id"></el-input>
            </el-form-item>

            <el-form-item label="平台资料id" prop="info_id">
                <el-input v-model="pluginform.info_id" placeholder="请输入平台资料id"></el-input>
            </el-form-item>

            <el-form-item label="密钥" prop="key">
                <el-input v-model="pluginform.key" placeholder="请输入秘钥"></el-input>
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
        pluginEdit:false,
        dialogVisible:false,
        dialogTitle:'添加平台',
        tableData:[],   //表单数据
        searchForm:{
           seti_id:'',
           status:''
        },
        
        statusOpaion:[
            {value:1,label:'禁用'},
            {value:0,label:'正常'}
        ],
        typeOpaion:[
            {value:0,label:'平台类型'},
           
        ],
        statusOption:{
            1:'禁止',
            0:'正常'
        },
        pluginform:{
            ip_er:'',
            ip_id:'',   //平台ID
            platform_id:'',  //供应商ID
            seti_id:'',
            addr_id:'',
            info_id:'',
             key:'',
            //用于修改的参数
            id:'',  //integer
            create_time:'',
            status:0
        },
        rules:{
            ip_id:[{ required: true, message: "请输入ip_id", trigger: "blur" }],   //平台ID
            platform_id:[{ required: true, message: "请输入供应商id", trigger: "blur" }],  //供应商ID
            seti_id:[{ required: true, message: "请输入平台id", trigger: "blur" }],
            addr_id:[{ required: true, message: "请输入收款地址id", trigger: "blur" }],
            info_id:[{ required: true, message: "请输入平台资料id", trigger: "blur" }],
            key:[{ required: true, message: "请输入密钥", trigger: "blur" }],
            status: [{ required: true, message: "请输入平台状态", trigger: "blur" }],
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
        this.$test.betsuser_get(params).then(res => {
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
            seti_id:this.searchForm.seti_id,
            status: Number(this.searchForm.status),
            limit : this.page_row,
            page:this.page
        }
        this.$test.betsuser_get(params).then(res => {
            if( res.data.code = 20000){
                this.tableData = res.data.data.items
                this.total = res.data.data.total
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
                    let params ={
                            seti_id : Number(this.pluginform.seti_id),        //供应商key
                            ip_id: Number(this.pluginform.ip_id), 
                            platform_id: Number(this.pluginform.platform_id), 
                            addr_id: Number(this.pluginform.addr_id), 
                            info_id: Number(this.pluginform.info_id), 
                            key: this.pluginform.key, 
                    }
                    console.log('ip-id数据',params.ip_id)
                    if(this.pluginEdit){
                        params.id = this.pluginform.id
                        params.create_time = this.pluginform.create_time
                        params.status = this.pluginform.starus
                    this.$test.betsuser_put(params).then( res => {
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
                    this.$test.betsuser_post(params).then( res => {
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
        this.pluginform.seti_id = row.seti_id
        this.pluginform.ip_id = row.ip_id  
        this.pluginform.platform_id = row.platform_id
        this.pluginform.adder_id = row.adder_id
        this.pluginform.info_id = row.info_id
        this.pluginform.key = row.key
        this.pluginform.id= row.id
        this.pluginform.create_time = row.create_time
        this.pluginform.starus =  row.starus
         this.dialogTitle = '修改用户信息',
        this.pluginEdit = true,
        this.dialogVisible = true
    },
    handleDelete(item){
        let params ={
            id:item.id
        }
        this.$confirm("请谨慎操作，确认删除该用户么？", {
                type: "warning"
            }).then(() => {
                this.$test.betsuser_delete(params).then(res => {
                    if(res.data.code === 20000){
                        this.$message.success('删除成功');
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