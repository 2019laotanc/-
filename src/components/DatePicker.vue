<template>
  <div>
    <el-date-picker 
    value-format="yyyy-MM-dd" 
    v-model="time" 
    type="daterange"
    unlink-panels
    range-separator="~" 
    start-placeholder="开始日期" 
    end-placeholder="结束日期" 
    :clearable="false"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: "DatePicker",
  data() {
    return {
      activeIndex: 0,
      time: null,
    };
  },
  mounted() {
    this.initClickDate()
  },
  methods: {
    initClickDate(){
       let start = new Date().getTime();
        this.time = [this.formatDate(start), this.formatDate(start)];
         this.$emit('setTime', this.time);
    },
    formatDate(item) {
      var date = new Date(item);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

      return YY + MM + DD
    },

    // }
  },
  watch: {
    time(newVal,oldVal) {
      console.log(newVal,oldVal);
      if(newVal===null){
        this.time=["",""];
        this.$emit('setTime', this.time);
      }else{
        this.$emit('setTime', this.time);
      }
    },
  }
};
</script>
