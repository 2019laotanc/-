<template>
    
    <el-card class="box-card" shadow="never">
        <DatePicker @setTime="setTime"></DatePicker>
        <div id="myChart"></div>

        <DatePicker @setTime="setTime2"></DatePicker>
        <div id="myChart2"></div>
    </el-card>
</template>



<script>
import * as echarts from 'echarts';
import DatePicker from '@/components/DatePicker.vue'
// import DatePicker from './';


export default {
    components:{
        DatePicker
    },
    data (){
        return{
           myChart:null,
           myChart2:null,
           start_date:'',
           end_date:'',
           start_date2:'',
           end_date2:''
        }
    },
    mounted(){
        let self = this
        this.myChart = echarts.init(document.getElementById('myChart'))
        this.myChart2 = echarts.init(document.getElementById('myChart2'))
        this.drawLine()
        // this.drawLine2()
        window.addEventListener("resize",function (){
            self.myChart.resize();
            self.myChart2.resize();
            
        });
    },
    methods:{
        drawLine(){
        // 基于准备好的dom，初始化echarts实例
        // 绘制图表
        this.myChart.setOption({
                title: { 
                    text: `${this.start_date} 至 ${this.end_date}`,
                    x:'center' 
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    x: 'right' //居右显示
                },
                xAxis: {
                    data: ["TF","BOB","IM","FY","LJJ","IA"]
                },
                yAxis: {},
                series: [
                    {
                        name: '总单数',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '流水',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金1',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金2',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金3',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金4',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金5',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        },
        drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        // 绘制图表
        this.myChart2.setOption({
                title: { 
                    text: `${this.start_date2} 至 ${this.end_date2}`,
                    x:'center' 
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    x: 'right' //居右显示
                },
                xAxis: {
                    data: ["CSGO","英雄联盟","DOTA2","无畏契约","王者荣耀","彩虹六号"]
                },
                yAxis: {},
                series: [
                    {
                        name: '总单数',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '流水',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金1',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金2',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金3',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金4',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: '彩金5',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        },
            //修改时间
        setTime(time) {
            this.start_date = time[0];
            this.end_date = time[1];
            this.drawLine()
        },
        setTime2(time){
            console.log('函数支持')
            this.start_date2 = time[0];
            this.end_date2 = time[1];
            this.drawLine2()
        }
   
    },
    beforeDestroy() { // 清理工作 避免内存泄漏
    // 销毁监听事件
    window.removeEventListener('resize', this.myChart.resize(),this.myChart2.resize())
	// 销毁 Echarts 实例
    this.myChart.dispose(),
    this.myChart2.dispose()
  },
   
    
}

</script>

<style lang="less" scoped>
#myChart{
    width: 100%;
    height: 400px;
}
#myChart2{
    width: 100%;
    height: 400px;   
}
</style>

