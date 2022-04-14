
  
exports.install = function (Vue, options) {

    // 时间格式化
    Vue.prototype.format_date = function (DateFor){//全局函数1
      let year = DateFor.getFullYear()
      let month = DateFor.getMonth() + 1
      let day = DateFor.getDate()
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
          day = "0" + day;
      }
      let tmp= year + '-' + month + '-' + day
      return tmp
    };
    
    // 获取日期函数，若gap=0,则为系统日期，若不为0，则当期日期-gap
    Vue.prototype.get_date = function (gap){
      let date = new Date()
      date = date.getTime() - 1000*60*60*24*gap
      let temp = new Date()
      temp.setTime(date)
      let day = this.format_date(temp)
      return day
    };

    // 时间戳转时间
    Vue.prototype.timestamp_to_time = function (now){
     let year= new Date(now).getFullYear()
     let month= new Date(now).getMonth()+1
     let date= new Date(now).getDate()
     let hour= new Date(now).getHours()
     let minute= new Date(now).getMinutes()
     let second= new Date(now).getSeconds()
     return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
      // alert(page)
    };

};
