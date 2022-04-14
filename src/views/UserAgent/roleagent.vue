<template>
    <div>
    <el-card class="box-card" shadow="never">
        <div>
            <el-button class="h38" style="margin-right: 20px" size="large" type="primary" icon="el-icon-plus"  @click="handleAdd">添加角色</el-button>
                    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        
        <el-table-column prop="address1" label="ID"> </el-table-column>
        <el-table-column prop="address2" label="角色名称"> </el-table-column>
        <el-table-column prop="address3" label="添加者"> </el-table-column>
        <el-table-column prop="address4" label="添加时间"> </el-table-column>
        <el-table-column prop="address5" label="描述"> </el-table-column>
        <el-table-column label="操作"> 
            <template slot-scope="scope">
                <span @click="handleEdit(scope.row)" class="color-style">权限</span>
                <span @click="handleDelete(scope.row)">删除</span>
                <span>编辑</span>
            </template>
        </el-table-column>
        </el-table>
        </div>
    </el-card>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" center :before-close="dialogBeforeClose">
            <div>
                <el-form :label-position="labelPosition" label-width="80px" :model="UserForm" :rules="rules" ref="ruleForm">
                
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="UserForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="UserForm.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                </el-form>
                <div>
                    <el-button @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="banck('ruleForm')">取消</el-button>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data(){
        return{
            labelPosition: 'right',
             dialogTitle:'添加用户',
             dialogVisible:false,
             UserForm:{
                 role:'',
                 name:'',
                 phone:'',
                 password:'',
             },
              rules: {
                description: [{ required: true, message: "请选择角色", trigger: "blur" }],
                name: [{ required: true, message: "请输入名称", trigger: "blur" }],
            }
        }
       
    },
    mounted(){
    
    },
    methods:{
        handleAdd(){
            this. dialogVisible = true
        },
        bank(formName){
            this.$refs[formName].resetFields();
            this.dialogVisible = false
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
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
        handleEdit(){
            this.$router.push({
                path:'/',
                query:{
                    id:1
                }
            })
        }
    }
}
</script>

<style>
.color-style{
    color: rgb(24, 144, 255);
}
</style>