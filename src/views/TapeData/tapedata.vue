<template>

       <el-card class="box-card" shadow="never">
        <TopData></TopData>
       

         <el-row class="pt-container" type="flex" justify="center">  <!-- :gutter="20" -->
            <el-col  class="table-title">实时在线投注软件</el-col>
        </el-row>
        <el-table
        :data="pluginData"
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
        <el-table-column prop="raw.game" label="游戏"> </el-table-column>
        <el-table-column prop="raw.type_pk_parent" label="类型"> </el-table-column>
        <el-table-column prop="address4" label="队伍">
            <tempalte slot-scope="scope">
                <span>{{scope.row.raw.team_1_name}}</span>VS<span>{{scope.row.raw.team_2_name}}</span>
            </tempalte>
        </el-table-column>
        <el-table-column prop="address4" label="赔率">
            <tempalte slot-scope="scope">
                <span>{{scope.row.raw.team_1_pk}}</span>:<span>{{scope.row.raw.team_2_pk}}</span>
            </tempalte>
        </el-table-column>

        </el-table>

         <!-- 页数修改 公用代码 -->
    </el-card>
</template>


<script>
import TopData from './../../components/TopData/topdata.vue'
export default {

components:{
    TopData,
},

data(){
    return {
        total:0,
        page:1,
        page_row:10,
        tableData:[],   //表单数据
        pluginData:[]
    }
},
mounted(){
    this.initData()
    this.getplugin()
},

methods:{
    initData(){ //下注类表
         this.$test.get_bt_list().then( res => {
             console.log(res,'实时返回的数据')
             let dataObject = res.data.data.data.list
             console.log('dataObject',dataObject)
            if(res.data.code === 20000){
                for( let i in dataObject){
                    if( dataObject[i].length > 0){
                        this.tableData = [...this.tableData, ...dataObject[i]]
                    }
                }
            }
         })     
        },
    
    }
}


</script>

<style lang="less" scoped>
.pt-container{
    padding-top: 20px;
}
.table-title{
    font-size: 24px;
    font-weight: bold;
}
        
</style>