<template>
    <el-card class="box-card" shadow="never">
        
        <el-row  type="flex" justify="space-between">
            <el-col :sm="3" :xs="12">
                <el-button class="h38" style="margin-right: 20px" size="large" type="primary" icon="el-icon-plus"  @click="handleAdd">添加用户注册资料</el-button>
            </el-col>
            <div class="el-flex">
                <el-input placeholder="平台ID" v-model="searchForm.name"></el-input>
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
            
            <el-form-item   label="姓名" prop="name">
                <el-input v-model="pluginform.name" placeholder="请输入姓名"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="pluginform.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="pluginform.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="phone">
                <el-input v-model="pluginform.phone" placeholder="请输入电话"></el-input>
            </el-form-item>

            <el-form-item label="银行卡号" prop="bank_card">
                <el-input v-model="pluginform.bank_card" placeholder="请输入银行卡号"></el-input>
            </el-form-item>

            <el-form-item label="用户证件号" prop="user_card">
                <el-input v-model="pluginform.user_card" placeholder="请输入用户证件号"></el-input>
            </el-form-item>

            <el-form-item label="渠道" prop="channel">
                <el-input v-model="pluginform.channel" placeholder="请输入渠道"></el-input>
            </el-form-item>

            <el-form-item label="备注1" prop="remark1">
                <el-input v-model="pluginform.remark1" placeholder="请输入备注1"></el-input>
            </el-form-item>

            <el-form-item label="备注2" prop="remark2">
                <el-input v-model="pluginform.remark2" placeholder="请输入备注2"></el-input>
            </el-form-item>

            <el-form-item label="秘钥" prop="key">
                <el-input v-model="pluginform.key" placeholder="请输入秘钥"></el-input>
            </el-form-item>

            <el-form-item label="姓名到期时间" prop="name_end_time">
                <el-date-picker
                v-model="pluginform.name_end_time"
                type="date"
                placeholder="选择姓名到期时间">
                </el-date-picker>
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
    var bankAccountValid = (rule, value, callback) => {
        const strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
        if (!value) {
        return callback(new Error('银行卡号不能为空'))
        } else if (!Number.isInteger(+value)) {
        callback(new Error('银行卡号必须全为数字'))
        } else if (value.trim().length < 12 || value.trim().length > 19) {
        callback(new Error('银行卡号长度必须在12到19之间'))
        } else if (strBin.indexOf(value.substring(0, 2)) === -1) {
        callback(new Error('银行卡号开头6位不符合规范'))
        } else {
        callback()
        }
    }
    var phone = (rule, value, callback) => {
		    const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
		    if (!value) {
		      return callback(new Error('电话号码不能为空'))
		    }
		    setTimeout(() => {
		      
		      if (!Number.isInteger(+value)) {
		        callback(new Error('请输入数字值'))
		      } else {
		        if (phoneReg.test(value)) {
		          callback()
		        } else {
		          callback(new Error('电话号码格式不正确'))
		        }
		      }
		    }, 100)
		  };


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
           name:'',
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
            name:'',
            password:'',   //平台ID
            email:'',  //供应商ID
            phone:'',
            bank_card:'',
            user_card:'',
            channel:'',
            remark1:'',
            remark2:'',
            name_end_time:'',
            key:'',
            //用于修改的参数
            id:'',  //integer
            create_time:'',
            status:0
        },
        rules:{
            remark1:'',
            remark2:'',
            name_end_time:'',
            email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ],
            bank_card:[
                { required: true, message: '不能为空',trigger: 'blur'},
                {validator: bankAccountValid, message: '请输入正确的银行卡号',trigger: 'blur' }
            ],
            phone: [{required: true, validator: phone, trigger: 'blur' }],
            key:[{ required: true, message: "请输入密钥", trigger: "blur" }],
            password:[{ required: true, message: "请输入密码", trigger: "blur" }],
            name:[{ required: true, message: "请输入姓名", trigger: "blur" }],
            user_card:[
                { required: true, message: '不能为空',trigger: 'blur' },
                { pattern: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/, message: '请输入正确的身份证号',trigger: 'blur' },
            ],//身份证号
            channel:[{ required: true, message: "请输入渠道", trigger: "blur" }],
            remark1:[{ required: true, message: "请输入备注1", trigger: "blur" }],
            remark2:[{ required: true, message: "请输入备注2", trigger: "blur" }],
            name_end_time:[{ required: true, message: "请输选择姓名到期时间", trigger: "blur" }],

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
        this.$test.betsuserinfo_get(params).then(res => {
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
            name:this.searchForm.name,
            status: Number(this.searchForm.status),
            limit : this.page_row,
            page:this.page
        }
        this.$test.betsuserinfo_get(params).then(res => {

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
    this.pluginform.name = ''
        this.pluginform.password = ''
        this.pluginform.email = ''
        this.pluginform.phone = ''
        this.pluginform.bank_card = ''
        this.pluginform.user_card = ''
        this.pluginform.channel= ''
        this.pluginform.remark1= ''
        this.pluginform.remark2= ''
        this.pluginform.name_end_time= ''
        this.pluginform.key= ''
        this.pluginEdit = false,
        this.dialogVisible = true
    },
    dialogBeforeClose(){
        this.dialogVisible = false;
       this.pluginEdit = false
    },
    submitForm(item){
        this.$refs[item].validate((valid) => {
                if (valid) {
                    let params ={
                        name:this.pluginform.name,
                        password:this.pluginform.password,   //平台ID
                        email:this.pluginform.email,  //供应商ID
                        phone:this.pluginform.phone,
                        bank_card:this.pluginform.bank_card,
                        user_card:this.pluginform.user_card,
                        channel:this.pluginform.channel,
                        remark1:this.pluginform.remark1,
                        remark2:this.pluginform.remark2,
                        name_end_time:this.pluginform.name_end_time,
                        key:this.pluginform.key,
                    }
                    if(this.pluginEdit){
                        params.id = this.pluginform.id
                        params.create_time = this.pluginform.create_time
                        params.status = this.pluginform.starus
                    this.$test.betsuserinfo_put(params).then( res => {
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
                    this.$test.betsuserinfo_post(params).then( res => {
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
        this.pluginform.name = row.name
        this.pluginform.password = row.password 
        this.pluginform.email = row.email
        this.pluginform.phone = row.phone
        this.pluginform.bank_card = row.bank_card
        this.pluginform.user_card = row.user_card
        this.pluginform.channel= row.channel
        this.pluginform.remark1= row.remark1
        this.pluginform.remark2= row.remark2
        this.pluginform.name_end_time= row.name_end_time
        this.pluginform.key= row.key
        this.pluginform.id = row.id
        this.pluginform.starus =  row.starus
         this.dialogTitle = '修改用户信息',
        this.pluginEdit = true,
        this.dialogVisible = true
    },
    handleDelete(item){
        let params ={
            id:item.id
        }
        this.$confirm("请谨慎操作，确认删除该账号的注册资料么？", {
                type: "warning"
            }).then(() => {
                this.$test.betsuserinfo_delete(params).then(res => {
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