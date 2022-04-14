<template>
    <el-card class="box-card" shadow="never">
        <TopData></TopData>
       <el-row class="pt-container" type="flex" :gutter="20">  <!--  -->
            <el-col :span="3" v-for="item, index  in pluginData" :key="index">
                <div class="item-style">
                    <div class="flex-contain">
                        <span>{{ item.platform_id | gys }}</span><span>{{item.count_total}}</span><span class="online">{{item.count_online}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-table
        :data="relatimeData"
        height="400"
        style="width: 100%">
        <el-table-column
            prop="raw.platform_id"
            label="供应商"
            >
        </el-table-column>
        <el-table-column prop="raw.match_time" label="比赛时间"> </el-table-column>
        <el-table-column prop="bet_money" label="bet_money"> </el-table-column>
        <el-table-column prop="raw.pk_id" label="pk_id"> </el-table-column>
        <el-table-column prop="raw.type_pk_main" label="type_pk_main"> </el-table-column>
        <el-table-column prop="raw.game" label="游戏"> </el-table-column>
        <el-table-column prop="raw.type_pk_parent" label="类型"> </el-table-column>
        <el-table-column  label="队伍">
            <tempalte slot-scope="scope">
                <span>{{scope.row.raw.team_1_name}}</span>VS<span>{{scope.row.raw.team_2_name}}</span>
            </tempalte>
        </el-table-column>
        <el-table-column  label="赔率">
            <tempalte slot-scope="scope">
                <span>{{scope.row.raw.team_1_pk}}</span>:<span>{{scope.row.raw.team_2_pk}}</span>
            </tempalte>
        </el-table-column>

        </el-table>

        <el-row :gutter="20">
            <el-col :sm="4" :xs="12">
                <el-input placeholder="输入游戏名称" v-model="searchForm.game"></el-input>
            </el-col>
            <el-col :sm="4" :xs="12">
                <el-input placeholder="输入类型" v-model="searchForm.p_type"></el-input>
            </el-col>
             <el-col :sm="4" :xs="12">
                <el-input placeholder="输入平台id" v-model="searchForm.platform_id"></el-input>
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
            prop="pk_time"
            label="PK时间"
            >
        </el-table-column>

        <el-table-column label="类型" width="60">
             <template slot-scope="scope">
                <span>{{scope.row.p_type | type}}</span>
            </template>
        </el-table-column>

        <el-table-column label="供应商" width="80">
            <template slot-scope="scope">
                <span>{{scope.row.platform_id | gys}}</span>
            </template>
        </el-table-column>

        <el-table-column prop="game" label="游戏"> </el-table-column>

        <el-table-column label="盘口" width="240">
            <template slot-scope="scope">
                 <span>{{scope.row.type_pk_child}}&nbsp;</span><span>{{scope.row.type_pk_main}}&nbsp;</span><span>{{scope.row.type_pk_parent}}</span>
            </template>
        </el-table-column>

        <el-table-column prop="address4" label="队伍" width="60">
            <tempalte slot-scope="scope">
                <span>{{scope.row.team_1_name}}</span>VS<span>{{scope.row.team_2_name}}</span>
            </tempalte>
        </el-table-column>

        <el-table-column prop="match_time" label="开赛时间"> </el-table-column>


        <el-table-column  label="赔率">
            <tempalte slot-scope="scope">
                <span>{{scope.row.team_1_Pk}}</span>VS<span>{{scope.row.team_2_Pk}}</span>
            </tempalte>
        </el-table-column>


        <el-table-column prop="success_index" label="成功数"></el-table-column>

        <el-table-column label="未成功数">
             <template slot-scope="scope">
                <span class="fail-style">{{  scope.row.fail_index}}</span>
             </template>
        </el-table-column>

        <el-table-column label="未成功下注详情">
            <template slot-scope="scope">
                <span>{{ scope.row.result_message | object }}</span>
            </template>
        </el-table-column>
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
        pluginData:[],
        searchForm:{
            game:'',
            p_type:'',
            platform_id:'',
        },
        loading:true,
        relatimeData:[],
        Ptype:[
            {value:-1,label:'全部'},
            {value:0,label:'DC'},
            {value:1,label:'DD'}
        ]
    }
},

  filters:{
            orderStatus(item) {
                let status ={
                    1:'成功',
                    0:'未成功'
                }
                return  status[item]
            },
            object(item){
                let data
                if(item){
                    let data = JSON.parse(item)
                    return data.data
                }else{
                    return item
                }                
            }
            
        },
created(){
    this.initData()
    this.getplugin()
},
methods:{
    initData(){
        this.loading = true
        let params ={
            limit : this.page_row,
            page:this.page
        }
        this.$test.get_order_list(params).then(res => {
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
        this.tableData = []
        let params ={
            game:this.searchForm.game,
            p_type: this.searchForm.p_type ? Number(this.searchForm.p_type) : -1,
            platform_id: Number(this.searchForm.platform_id),
            limit : this.page_row,
            page:this.page
        }
        this.$test.get_order_list(params).then(res => {
            console.log('函数执行',res.data.code)
            if(res.data.code === 20000){
                console.log('res.data.data.items',res.data.data.items)
                this.tableData.push(res.data.data.items) 
                this.total = res.data.data.total
            }
            this.loading = false
        })
    },
    getplugin(){
        this.$test.get_order_count().then( res => {
            this.pluginData = res.data.data
        })
    },
    getrelatimeData(){
        this.$test.get_plugin_list().then( res => {
            console.log('plugin,返回的数据',res)
            this.relatimeData = res.data.data.data.list
        })
    }
        

}
}


</script>

<style lang="less" scoped>
    .pt-container{
        .item-style{
            display: flex;
            height: 36px;
            background-color: #F2F2F2;
            line-height: 36px;
            border-radius: 6px;
            box-shadow: 4px 4px 2px #888888;
        }
    }
    .flex-contain{
        display: flex;
        width: 100%;
        justify-content: space-around;
        font-weight: bold;
        .online{
            color: rgb(202, 52, 52);
        }
    }
    .fail-style{
        color: rgb(226, 17, 17);
    }


        
</style>