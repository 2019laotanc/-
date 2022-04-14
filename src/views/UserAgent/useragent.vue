<template>
    <div>
    <el-card class="box-card" shadow="never">
        <div>
            <el-button class="h38" style="margin-right: 20px" size="large" type="primary" icon="el-icon-plus"  @click="handleAdd">添加用户</el-button>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="序号"
            width="">
        </el-table-column>
        
        <el-table-column prop="user_name" label="用户名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="phone" label="手机"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="create_time" label="添加时间"> </el-table-column>
        <el-table-column prop="update_time" label="修改时间"> </el-table-column>
        <el-table-column label="操作"> 
            <template slot-scope="scope">
                <span class="pointer"   @click="handleEdit(scope.row)">编辑</span>
                <el-divider direction="vertical"></el-divider>
                <span class="pointer"  style="color: #1890ff">角色</span>
                <el-divider direction="vertical"></el-divider>
                <!-- <span class="pointer"  style="color: red" @click="handleDelete(scope.row)">删除</span> -->

            </template>
        </el-table-column>
        </el-table>
        <Pagination  @connect="get_page"  :total=total :page=page :page_row=page_row></Pagination>
        </div>
    </el-card>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" center :before-close="dialogBeforeClose">
            <el-form :label-position="labelPosition" label-width="140px" :model="UserForm" :rules="rules" ref="ruleForm">
            
            <el-form-item label="用户名" prop="name">
                <el-input v-model="UserForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password" placeholder="请输入密码">
                <el-input  v-model="UserForm.password" type="password"></el-input>
            </el-form-item>
            
             <el-form-item label="密码确认" prop="password2" placeholder="请输入密码">
                <el-input  v-model="UserForm.password2" type="password"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="UserForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input v-model="UserForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="通知方式" prop="notice">
                <el-select size="small"  v-model="UserForm.notice" placeholder="请选择">
                    <el-option v-for="(item, index) in notice" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            </el-form>
            <div slot="footer">
                <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
                <el-button @click="dialogBeforeClose()">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Pagination from './../../components/pagination.vue'

export default {

components:{
    Pagination
},
    data(){
        var checkPhone = (rule, value, callback) => {
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
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.UserForm.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return{
            labelPosition: 'right',
            total:0,
            page:1,
            page_row:10,
            tableData:[],
            userEdit:false,
            dialogTitle:'添加用户',
            dialogVisible:false,
            dialogEdit:false,
            UserForm:{
                name:'',
                phone:'',
                email:'',
                password:'',
                password2:'',
                notice:''
            },

            UserFormEdit:{
                role:'',
                name:'',
                phone:'',
                password:'',
            },
            notice:[
                {value:'0',label:'通知栏'},
                {value:'1',label:'手机短信'}
            ],
            roleList:[
                {value:1,label:'管理员'},
                {value:2,label:'用户'}
            ],
            rules: {

            name: [{ required: true, message: "请输入名称", trigger: "blur" }],

            phone: [{required: true, validator: checkPhone, trigger: 'blur' }],
            email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}$/, message: '密码为数字，字母，长度为 6 - 11位，' }
                ],
            password2: [
                { required: true, validator: validatePass2, trigger: 'blur' }
            ]
            }
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            let patams = {
                page:this.page,
                limit:this.page_row
            }
            this.$test.get_user_list(patams).then( res => {
                this.tableData = res.data.data.items
                this.total = res.data.data.total
            })
        },
        get_page(item){
            this.page = item['page'];
            this.page_row = item['page_row'];
            this.init()
        },
        handleAdd(){
            this.dialogVisible = true
            this.userEdit = false
        },
        bank(formName){
            this.$refs[formName].resetFields();
            this.dialogVisible = false
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        user_name:this.UserForm.name,
                        email:this.UserForm.email,
                        password:this.UserForm.password,
                        passwordconfirm:this.UserForm.password2,
                        phone:this.UserForm.phone,
                        message_type:this.UserForm.notice   
                    }
                    if(this.userEdit){
                        this.$test.user_edit(params).then(res => {
                           if(res.data.code === 20000){
                                this.$message.success('修改成功');
                                this.init()
                            }else{
                                this.$message.error(res.data.message);
                            } 
                        })
                    }else{
                        this.$test.user_agent(params).then(res => {
                            if(res.data.code === 20000){
                                this.$message.success('添加成功');
                                this.init()
                            }else{
                                this.$message.error(res.data.message);
                            }
                        })
                    }
                   this.dialogVisible = false;
                } else {
                    return false;
                }
            });
        },
        handleDelete(id){
            this.$confirm("请谨慎操作，确认删除该用户？", {
                type: "warning"
            }).then(() => {

                this.$api.delUser({
                    user_id: this.userInfo.id,
                    id_str: o.id.toString()
                })
                .then(data => {
                    // if (Number(data.error_no) === 0) {
                    this.$message.success(`删除成功`);
                })
            })
        },
        handleEdit(item){
            this.UserForm.name = item.user_name,      
            this.UserForm.phone = item.phone,
            this.UserForm.email = item.email,
            this.UserForm.password = '',
            this.UserForm.password2 = '',
            this.UserForm.notice = item.message_type
            this.dialogVisible = true;
            this.userEdit = true
        },
    dialogBeforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.dialogVisible = false;
       this.userEdit = false
    },
    }
}
</script>

<style lang="less" scoped>


/deep/.el-form-item__content .el-input .el-input__inner{
    width: 320px;
}

</style>