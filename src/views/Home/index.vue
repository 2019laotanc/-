<template>
  <el-card class="box-card" shadow="never">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleClick('测试页面')">
          <div class="card-panel-description">
            <div class="card-panel-text">测试页面</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleClick('测试页面')">
          <div class="card-panel-description">
            <div class="card-panel-text">测试页面</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleClick('测试页面')">
          <div class="card-panel-description">
            <div class="card-panel-text">测试页面</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleClick('测试页面')">
          <div class="card-panel-description">
            <div class="card-panel-text">测试页面</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleClick('测试页面')">
          <div class="card-panel-description">
            <div class="card-panel-text">测试页面</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  created() {

  },
  methods: {
    handleClick(val) {
      this.$message.success(val);
    }
  }
};
</script>
<style lang="less" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .card-panel-description {
      text-align: center;
      font-weight: bold;
      margin: 40px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
