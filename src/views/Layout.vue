<template>
    <div id="layout">
      <el-container>
        <el-aside  style="width: auto;background-color:#545c64;"> <!-- background-color: #3C3D40; -->
         <el-menu 
          :default-active="currentPath"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border:none;"
          unique-opened
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :router="true"
          >
          <template v-for="(o, i) in menuData">
              <el-menu-item v-if="!(o.children) " :key="i" :index="o.path">
                  <div class="menu_name">
                    <icon-park v-if="o.meta.icon" :type="o.meta.icon" theme="outline" size="20" strokeWidth="3">
                    </icon-park>
                    <span style="margin-left: 1em;">{{ o.name }}</span>
                  </div>
                </el-menu-item>
                <!-- 侧边栏  -->
                <el-submenu v-else-if="o.children " :index="String(i)" :key="i">
                  <!-- 图标行 -->
                  <template slot="title">
                    <div class="menu_name">
                      <icon-park v-if="o.meta.icon" :type="o.meta.icon" theme="outline" size="20" strokeWidth="3">
                      </icon-park>
                      <span style="margin-left: 1em;">{{ o.name }}</span>
                    </div>
                  </template>
                  <!-- 对状况特殊处理，下拉显示了   -->
                  <template v-for="(o1, i1) in o.children">
                    <el-menu-item  :key="i1" :index="o1.path">
                      <div class="menu_name">
                        <span style="margin-left: 1em;">{{ o1.name }}</span>
                      </div>
                    </el-menu-item>
                  </template>
                </el-submenu>
            </template>
           <!-- <el-menu-item :index="'index'">
            <i class="el-icon-message"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item :index="'tapedata'">
            <i class="el-icon-message"></i>
            <span>盘口数据</span>
          </el-menu-item>
          <el-menu-item :index="'datacount'">
            <i class="el-icon-message"></i>
            <span>数据统计</span>
          </el-menu-item> 
          <el-menu-item :index="'order-show'">
            <i class="el-icon-message"></i>
            <span>订单显示</span>
          </el-menu-item>
          <el-menu-item :index="'datacount-date'">
            <i class="el-icon-message"></i>
            <span>数据日统计</span>
          </el-menu-item>
          <el-menu-item :index="'/seting-menu'">  
            <i class="el-icon-message"></i>
            <span>菜单管理</span>
          </el-menu-item> -->
          </el-menu> 
        </el-aside> 
        
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <div class="router-name-flex">
              <el-button 
              :icon="isCollapse ? 'el-icon-s-unfold': 'el-icon-s-fold'" 
              style="border: 0;font-size: 20px;padding: 10px;margin: 0;"
              @click="isCollapse = !isCollapse"
              ></el-button>
              <el-breadcrumb>
                <el-breadcrumb-item>{{
                  this.$route.meta.routerName.parentName
                }}</el-breadcrumb-item>
                <el-breadcrumb-item>
                  <span style="margin: 0 9px;font-weight: 700;color: #C0C4CC;" v-if="$route.meta.routerName.childName !== ''">/</span>
                  {{ this.$route.meta.routerName.childName }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

            <div>
              <el-dropdown @command="handleCommand">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">
                    <span>退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            <span>admin</span>
            </div>
          </el-header>
          
          <!-- <el-main>
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>
          </el-main> -->

          <el-main class="content-height">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse:false,
        currentPath:'',
        menuData:[]
      }
    },
    mounted(){
      console.log('那个限制性')
      this.getMenu()
    },
    watch: {
      $route: {
        handler: function (val) {
            this.currentPath = val.path;
        },
        immediate: true,
        // 深度观察监听
        deep: true,
      },
    },
    methods:{
      handleCommand(command){
        if(command === 'logout' ){
          this.$cookie.delete('Admin-Token'),
          this.$router.push({
            path:'/login'
          })
        }
      },
      getMenu(){
        if(!this.menuData.length){
           this.$test.get_menu().then( res => {
            console.log(res.data)
            if(res.data.code === 401){
              this.$router.go(0)
            }else{
              this.menuData = res.data.data
              console.log('this.menuData',this.menuData[0])
            }
          })
        }
        // console.log('this.menuData',this.menuData)
      }
    }
  };
</script>


<style lang="less" scoped>
// 面包屑




 /deep/ .el-breadcrumb__item 
    .el-breadcrumb__separator {
    display: none !important;
    }

    .i-icon {
  font-size: 0.8em;
  min-width: 20px;
  min-height: 20px;
  visibility: visible !important;
}

.el-menu-item {
  display: flex;
  align-items: center;
}

.menu_name, .el-submenu__title {
  width: 100%;
  display: flex;
  align-items: center;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

</style>


<style lang="less" scoped>
  #layout {
      min-height: 100vh;
      overflow-x: hidden;
    }
    .el-container{
      height: 100vh;
  }  
  .el-header {
    // background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content:space-between;
  }
  .content-height{
      background-color:#f5f7f9;
      height: calc(100vh - 100px);
      overflow: auto
  }
  .el-aside {
    color: #333;
  }
  .router-name-flex{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .font-color{
    color: #ffff;
  }
  
</style>



