<template>
    <el-card class="box-card" shadow="never">
        <TopData></TopData>

        <el-row :gutter="20">
            <el-col :sm="4" :xs="12">
                <el-input placeholder="游戏名称" v-model="searchForm.gname"></el-input>
            </el-col>
            <el-col :sm="3" :xs="12">
                <el-input placeholder="平台2id" v-model="searchForm.platform_id_mp"></el-input>
            </el-col>
             <el-col :sm="3" :xs="12">
                <el-input placeholder="类型" v-model="searchForm.p_type"></el-input>
            </el-col>
             <el-col :sm="3" :xs="12">
                <el-input placeholder="平台1id" v-model="searchForm.platform_id"></el-input>
            </el-col>
            <el-col :sm="3" :xs="12">
                <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
            </el-col>
        </el-row>
        
        <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
            prop="match_id"
            label="match_id"
            >
        </el-table-column>

         <el-table-column prop="platform_id_mp" label="平台2ID"> </el-table-column>
         <el-table-column prop="platform_id" label="平台1ID"> </el-table-column>


        <el-table-column label="类型">
             <template slot-scope="scope">
                <span>{{scope.row.p_type | type}}</span>
            </template>
        </el-table-column>

        <el-table-column label="供应商">
             <template slot-scope="scope">
                <span>{{scope.row.platform_id | gys}}</span>
            </template>
        </el-table-column>

        <el-table-column label="匹配方式">
             <template slot-scope="scope">
                <span>{{matchType[scope.row.match_type]}}</span>
            </template>
        </el-table-column>

      <el-table-column prop="match_name" label="比赛名称"> </el-table-column>
       
        <el-table-column prop="write_time" label="等待时间"> </el-table-column>

        <el-table-column prop="game" label="游戏名称"> </el-table-column>

        <el-table-column prop="address4" label="队伍" width="160">
            <tempalte slot-scope="scope">
                <span>{{scope.row.team_1_name}}</span>VS<span>{{scope.row.team_2_name}}</span>
            </tempalte>
        </el-table-column>

        <el-table-column prop="match_time" label="开赛时间"> </el-table-column>

        <el-table-column prop="match_name_mp" label="match_name_mp"> </el-table-column>

        </el-table>

         <!-- 页数修改 公用代码 -->
        <Pagination  @connect="get_page"  :total=total :page=page :page_row=page_row></Pagination>
    </el-card>
</template>


<script>
import TopData from './../../components/TopData/topdata.vue'
import Pagination from './../../components/pagination.vue'
// import { param } from '../../../../vue-element-admin/src/utils'

export default {

components:{
    TopData,
    Pagination
},

data(){
    return {
        total:0,
        page:1,
        page_row:10,
        tableData:[],   //表单数据
        searchForm:{
            gname:'',
            platform_id_mp:'',  //平台2id
            p_type:'',
            platform_id:''     //平台1id
        },
        loading:true,
        matchType:{
            0:'人工',
            1:'自动'
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
        this.$test.match_list(params).then(res => {
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
            limit : this.page_row,
            page:this.page,
            gname:this.searchForm.gname,
            platform_id_mp:this.searchForm.platform_id_mp,  //平台2id string
            p_type: Number(this.searchForm.p_type),
            platform_id: Number(this.searchForm.platform_id)     //平台1id
        }
        this.$test.match_list(params).then(res => {
            this.tableData = res.data.data.items
            this.total = res.data.data.total
            this.loading = false
        })
    }
}
}


</script>

<style lang="less" scoped>
        
</style>