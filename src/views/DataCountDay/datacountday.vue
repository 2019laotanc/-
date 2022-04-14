<template>
    <el-card class="box-card" shadow="never">
        <div class="select-style">
            <div  :class="active === '1' ? 'active' : '' "  @click="Ndata()">内部</div>
            <div  :class="active === '2' ? 'active' : ''" @click="Wdata()">外部</div>
        </div>

        <div class="container-margin" >
            <el-date-picker
            class="right-margin"
            v-model="month"
            type="month"
            placeholder="选择月"
            @change="selectMonth">
            </el-date-picker>

            <el-select v-model="pt" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>

        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="余额"
            width="180">
        </el-table-column>

        <el-table-column prop="address1" label="未结算"> </el-table-column>

        <el-table-column prop="address2" label="充值">
            <template slot-scope="scope">
                <el-input v-model="scope.row.address2"></el-input>
            </template>
        </el-table-column>

        <el-table-column prop="address3" label="提款">
            <template slot-scope="scope">
                <el-input v-model="scope.row.address3" @change="editAwakenCount()"></el-input>
            </template>
        </el-table-column>

        <el-table-column prop="address4" label="名称 + 账号"> </el-table-column>
        </el-table>

         <!-- 页数修改 公用代码 -->
        <!-- <Pagination  @connect="get_page"  :total=total :page=page :page_row=page_row></Pagination> -->
    </el-card>
</template>

<script>
// import TopData from './../../components/TopData/topdata.vue'
// import { Cook } from '@icon-park/vue';
// import Pagination from './../../components/pagination.vue'

export default {

components:{
    // TopData,
    // Pagination
},

data(){
    return {
        total:0,
        page:1,
        page_row:10,
        tableData:[{address4:1,address3:1,address2:1,address1:1,}],   //表单数据
        order_id:'',
        money:'',
        active:'1',
        month:'',
        pt:'PB',
        options:[
            {value:1,label:'PB' },
            {value:2,label:'TF' },
            {value:3,label:'BOB' },
            {value:4,label:'IM' },
            {value:5,label:'FY' },
            {value:6,label:'LJJ' },
        ]
    }
},

mounted(){
     let start = new Date().getTime();
     this.month =  this.formatDate(start)
},

methods:{
     formatDate(item) {
      var date = new Date(item);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    //   var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

      return YY + MM
    },
        initData(){
            console.log('搜索数据')
        },
        get_page(item){
        this.page = item['page'];
        this.page_row = item['page_row'];
        //   if(this.radio === '1'){
        //     this.getTableData()
        //   }else{
        //     this.business()
            },
        editAwakenCount(){
            console.log('sds')
            this.$confirm('产品收入将更改', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                console.log('sfds')
                })
            },
        Wdata(){
            this.active = '2'
            console.log('请求外部数据')
            },
        Ndata(){
            this.active = '1'
            console.log('请求部数据')
            } ,
        selectMonth(value){
            console.log('value',value, this.month)
        }
    },

}


</script>

<style lang="less" scoped>
    .pt-container{
        .item-style{
            display: flex;
            justify-content: center;
            height: 36px;
            background-color: #F2F2F2;
            line-height: 36px;
            border-radius: 6px;
            box-shadow: 4px 4px 2px #888888;
        }
    }
    .uncheck{
        width: 60px;
        height: 40px;
        border: 1px solid #a6a6a6;
        background-color: #fff;
        line-height: 40px;
        text-align: center;
    } 

.select-style {
    height: 38px;
    width: 300px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    color: rgba(166, 166, 166, 1);
    border: 1px solid rgba(166, 166, 166, 1);
    margin-right: 60px;
    user-select: none;
    -moz-user-select: none; /* 火狐 */
    -webkit-user-select: none; /* webkit浏览器 */
    -ms-user-select: none; /* IE10 */

    div {
      flex: 1;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-right: 1px solid rgba(166, 166, 166, 1);

      &:last-of-type {
        border-right: none;
      }
    }

    .active {
      color: #fff;
      background-color: rgba(166, 166, 166, 1);
    }
  }
.container-margin{
    padding: 8px 0;
    .right-margin{
        padding-right: 10px;
    }
}
</style>