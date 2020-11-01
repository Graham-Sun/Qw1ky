<template>
  <div id="aSingleParameter">
    <div class="full_mark">
      <p class="title">各科目满分设置</p>
      <div class="grade">
        <div class="grade-left">
          <div>
            语文:<el-input-number size="mini" v-model="num" :min="1" :max="120" label=""></el-input-number>
          </div>
          <div>
            数学:<el-input-number size="mini" v-model="num" :min="1" :max="120" label=""></el-input-number>
          </div>
          <div>
            英语:<el-input-number size="mini" v-model="num" :min="1" :max="120" label=""></el-input-number>
          </div>
          <div>
            生物:<el-input-number size="mini" v-model="num" :min="1" :max="120" label=""></el-input-number>
          </div>
          <div>
            历史:<el-input-number size="mini" v-model="num" :min="1" :max="120" label=""></el-input-number>
          </div>
        </div>
        <span>总分满分：440</span>
      </div>
    </div>
    <div class="analysis">
      <p class="title">分析报表基础设置</p>
      <div class="analysis_valid">
        <div class="analysis_v">
          <p class="small_title">分数有效性设置</p>
          <div class="analysis-v-child">
            <el-checkbox v-model="checked">将0分设置为缺考</el-checkbox>
            <el-checkbox>将缺考有分设置为不缺考</el-checkbox>
          </div>
          <p class="small_title">缺考统计口径设置</p>
          <div class="analysis-v-child">
            <el-checkbox v-model="checked">科目缺考不参与科目统计计算</el-checkbox>
            <el-checkbox>科目缺考不参与总分统计计算</el-checkbox>
          </div>
          <p class="small_title">0分统计口径设置</p>
          <div class="analysis-v-child">
            <el-checkbox v-model="checked">0分不参与科目统计计算</el-checkbox>
            <el-checkbox>0分不参与总分统计计算</el-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "aSingleParameter",
    data() {
      return {
        num: 120,
        checked: true,
      };
    },
    methods: {
      begin(active) {
        return this.againSession(active);
      },
      backStep(active) {
        return (active -= 1);
      },
      againSession(active) {
        return (active += 1);
      },
    },
  };
</script>

<style lang="scss">
  #aSingleParameter {
    width: 97.5%;
    min-height: 83%;
    background: #fff;
    padding: 1px 20px;

    .full_mark {
      width: 100%;
      height: 100px;

      .grade {
        margin-left: 30px;
        display: flex;
        justify-content: space-between;

        .grade-left {
          display: flex;

          div {
            margin-right: 60px;

            .el-input-number--mini {
              width: 140px;
              margin: 0 10px;
            }
          }
        }

        span {
          color: #0fbc77;
        }
      }
    }

    .title {
      height: 44px;
      line-height: 44px;
      text-indent: 30px;
      color: #fff;
      background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
    }

    .analysis {
      .analysis_valid {
        .analysis_v {
          width: 100%;
          height: 60px;

          .small_title {
            width: 95%;
            height: 30px;
            line-height: 30px;
            text-indent: 30px;
            margin: 0px auto;
            box-sizing: border-box;
            background: #f0f9f6;
            border: 1px solid rgb(235, 233, 233);
          }

          .analysis-v-child {
            color: #000;
            height: 44px;
            line-height: 44px;
            padding-left: 70px;
          }
        }
      }
    }
  }
</style>