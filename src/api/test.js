import axios from "axios";
import router from "../router";
import cookie from 'vue-cookie'
import { Notification } from "element-ui";



// import qs from "qs";
let path = '/test'

axios.defaults.headers.common['Authorization'] = cookie.get('Admin-Token') ? cookie.get('Admin-Token') : '';

// axios.defaults.baseURL = 'http://42.51.69.107:26009'


let instance = axios.create({
  timeout: 15000,
  

});

instance.interceptors.request.use(
  function (config) {
    
      let token = cookie.get('Admin-Token');
      if (token) {
          config.headers.common["Authorization"] = `${token}`;
      }
      return config;
  },
  function (error) {
      return Promise.reject(error);
  }
);



// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  err => {
    if (err.response.status === 401) {
      localStorage.clear()
      Notification({
        title: "温馨提示",
        dangerouslyUseHTMLString: true,
        type: "warning",
        message: err.response.data.error_msg ||`登录状态失效，请重新登录`,
        position: "bottom-right"
      })
      router.replace('/login')
    } else {
      Notification({
        title: err.response.status + err.response.statusText,
        message: err.response.data.error_msg || "Error",
        type: "error"
      });
    }

    return Promise.reject(err.response);
  }
);



export default { //接口集合

  /////////////获取盘口数据
  get_time(para){
    return axios.get(`${path}/api/v1/get/betstatus`,{params:para})
  },
  //获取实时列表
  get_bt_list(para){
    return axios.get(`${path}/api/v1/get/bets`,{params:para})
  },
  //获取实时投注列表
  
  get_plugin_list(para){
    return axios.get(`${path}/api/v1/get/plugin`,{params:para})
  },
  ////////////
  get_key(para){
    return axios.get(`${path}/api/v1/loginkey`,{params:para})
  },
  login(para){
      return axios.post(`${path}/api/v1/login`,para)
  },
  get_user_info(para){
    return axios.get(`${path}/api/v1/user/info`,{params:para})
  },
  get_menu(para){
    return axios.get(`${path}/api/v1/user/menu`,{params:para})
  }, 
  get_menu_list(para){ //菜单查询
    return axios.get(`${path}/api/v1/menu`,{params:para})
  },
  menu_delete(para){  //菜单删除
    return axios.delete(`${path}/api/v1/menu`,{data:para})
  },
  menu_add(para){  //菜单添加
    return axios.post(`${path}/api/v1/menu`,para)
  },
  menu_put(para){  //菜单添加
    return axios.put(`${path}/api/v1/menu`,para)
  },

  get_pk_list(para){
    return axios.get(`${path}/api/v1/plugin/pk`,para)
  },

  get_order_list(para){
    return axios.get(`${path}/api/v1/plugin/order`,{params:para})
  },

  get_user_list(para){    //用户列表
    return axios.get(`${path}/api/v1/user`,{params:para})
  },
  user_agent(para){      //用户添加
    return axios.post(`${path}/api/v1/user`,para)
  },
  user_edit(para){     //用户修改
    return axios.put(`${path}/api/v1/user`,para)
  },
  get_order_count(para){  //平台订单数量
    return axios.get(`${path}/api/v1/plugin/order/count`,{params:para})
  },


  //匹配列表
  match_list(para){
    return axios.get(`${path}/api/v1/plugin/mapping`,{params:para})
  },

  //供应商管理
  platform_list(para){
    return axios.get(`${path}/api/v1/plugin/platform`,{params:para})
  },
  platform_add(para){
    return axios.post(`${path}/api/v1/plugin/platform`,para)
  },
  platform_edit(para){
    return axios.put(`${path}/api/v1/plugin/platform`,para)
  },
  platform_delete(para){
    return axios.delete(`${path}/api/v1/plugin/platform`,{data:para})
  },
  
  //注册平台管理
  plugin_delete(para){
    return axios.delete(`${path}/api/v1/plugin/seti`,{data:para})
  },
  plugin_get(para){
    return axios.get(`${path}/api/v1/plugin/seti`,{params:para})
  },
  plugin_post(para){
    return axios.post(`${path}/api/v1/plugin/seti`,para)
  },
  plugin_put(para){
    return axios.put(`${path}/api/v1/plugin/seti`,para)
  },
  // 注册资料管理
  addr_delete(para){
    return axios.delete(`${path}/api/v1//plugin/addr`,{data:para})
  },
  addr_get(para){
    return axios.get(`${path}/api/v1/plugin/addr`,{params:para})
  },
  addr_post(para){
    return axios.post(`${path}/api/v1//plugin/addr`,para)
  },
  addr_put(para){
    return axios.put(`${path}/api/v1//plugin/addr`,para)
  },

  // 下注用户管理
  betsuser_delete(para){
    return axios.delete(`${path}/api/v1/plugin/account`,{data:para})
  },
  betsuser_get(para){
    return axios.get(`${path}/api/v1/plugin/account`,{params:para})
  },
  betsuser_post(para){
    return axios.post(`${path}/api/v1/plugin/account`,para)
  },
  betsuser_put(para){
    return axios.put(`${path}/api/v1/plugin/account`,para)
  },

  // 下注用户注册资料管理
  betsuserinfo_delete(para){
    return axios.delete(`${path}/api/v1/plugin/account/info`,{data:para})
  },
  betsuserinfo_get(para){
    return axios.get(`${path}/api/v1/plugin/account/info`,{params:para})
  },
  betsuserinfo_post(para){
    return axios.post(`${path}/api/v1/plugin/account/info`,para)
  },
  betsuserinfo_put(para){
    return axios.put(`${path}/api/v1/plugin/account/info`,para)
  },
  
  // 下注软件管理   
  betssoftware_delete(para){
    return axios.delete(`${path}/api/v1/plugin/account/setting`,{data:para})
  },
  betssoftware_get(para){
    return axios.get(`${path}/api/v1/plugin/account/setting`,{params:para})
  },
  betssoftware_post(para){
    return axios.post(`${path}/api/v1/plugin/account/setting`,para)
  },
  betssoftware_put(para){
    return axios.put(`${path}/api/v1/plugin/account/setting`,para)
  },
  
}