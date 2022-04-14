<template>
    <el-row class="el-row" type="flex" justify="space-between" :gutter="20">
        <el-col >
        <div class="card-1 card">
            <!-- <div class="item-top">
            <span class="top-txt">日期统计</span>
            </div> -->
            <div class="ul-list" >
              <div v-for=" (item, index) in updateTime" :key="index">
                <span class="date">{{item.name}}:</span> <span class="deat-number">{{item.time}}</span>
              </div>
            </div>
        </div>
        </el-col>
        <el-col >
        <div class="card-2 card">
            <!-- <div class="item-top">
            <span class="top-txt">展示次数</span>
            </div> -->
            <div class="ul-list" >
              <div v-for=" (item, index) in data" :key="index">
                <span class="date">{{item.name}}:</span> <span class="deat-number">{{item.take}}</span>
              </div>
            </div>
        </div>
        </el-col>
        <el-col >
        <div class="card-3 card">
            <!-- <div class="item-top">
            <span class="top-txt">点击次数</span>
            </div> -->
            <ul class="ul-list">
            <li><span class="date">采集异常告警:</span> <span class="deat-number">3</span></li>
            <li><span class="date">计算异常告警:</span> <span class="deat-number">3</span></li>
            <li><span class="date">下注软件异常:</span> <span class="deat-number">3</span></li>
            <li><span class="date">未成功匹配赛事提示:</span> <span class="deat-number">3</span></li>
            </ul>
        </div>
        </el-col>

        <el-col >
        <div class="card-3 card">
            <!-- <div class="item-top">
            <span class="top-txt">点击次数</span>
            </div> -->
            <ul class="ul-list">
            <li><span class="date">采集异常告警:</span> <span class="deat-number">3</span></li>
            <li><span class="date">计算异常告警:</span> <span class="deat-number">3</span></li>
            <li><span class="date">下注软件异常:</span> <span class="deat-number">3</span></li>
            <li><span class="date">未成功匹配赛事提示:</span> <span class="deat-number">3</span></li>
            </ul>
        </div>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    data(){
      return{
        updateTime:[],
        PT:['PB','TF','BOB','IM','FY','LJJ','IA'],
        data:[]
      }
    },
    mounted(){
      this.getTabData1()
    },
    methods:{
      getTabData1(){
        let params ={
          btype:1
        }
        this.$test.get_time(params).then(res => {
          let data = Array.from(res.data.data.data.list)
          console.log(' data', data)
          let updateTime = res.data.data.data.list.盘口数据更新时间
          let filterData = res.data.data.data.list
          
          for( let i in updateTime){
            this.updateTime.push({ name:this.PT[i - 1],time:updateTime[i]})
          }
          for( let index in filterData){
            if(index === '盘口数据更新时间'){
              null
            }else{
              this.data.push({ name:index, take:filterData[index]})
            }
            
          }
          console.log()
          // console.log('this.updateTime',this.updateTime)
        })
      }
    }
  }
</script>

<style lang="less" scopeds>
    .el-row{
      margin-top: 10px;
      margin-bottom: 20px;
      width: 100%;
      .card{
        color: #ffffff;
        padding-top: 8px;
        padding-left: 20px;
        border-radius: 6px;
        box-shadow: 1px 2px 2px rgba(214, 213, 213, 0.8);
      }
      .card-1{
        background: linear-gradient(-45deg, #3b81fa 10%,   #1a78c0 100%);
      }
      .card-2{
        background: linear-gradient(-45deg, #3b81fa 10%,   #1a78c0 100%);
      }
      .card-3{
        background: linear-gradient(-45deg, #538EFD 10%, #6D5AFE 100%);
      } 
    }

    .ul-list::-webkit-scrollbar {
      width: 6px;
    }
    .ul-list::-webkit-scrollbar-thumb {
      background-color: #d9d9d9;
      -webkit-box-shadow:none
    }
    
.ul-list{
    height: 200px;
    overflow: hidden;
    overflow-y: auto;
    .date{
      font-size: 22px;
      line-height: 28px;
      font-family: 'Trebuchet MS';
    }
    .deat-number{
      padding-left: 10px;
      font-size: 19px;
      line-height: 28px;
      vertical-align: bottom;
    }
    .number-bottom{
      float: right;
      padding-right: 20px;
      font-size: 25px;
      }
  }
</style>
    
