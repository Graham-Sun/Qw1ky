<template>
  <div class="analysisSetting">
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
    <div class="title">
      分析报表高级设置
    </div>
    <div class="contentBox">
      <div class="contentBoxTitle">
        第等设置
      </div>
      <div class="contentBoxContent">
        <div class="contentBoxContentGrade">
          <div class="sel">
            学生成绩人数等级:
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label">
              </el-option>
            </el-select>
          </div>
          <div class="inp" v-for="(item, index) in grade">
            {{item.name}}
            <el-input-number size="mini" v-model="item.num" controls-position="right" @change="handleChange" :min="1"
              :max="10"></el-input-number>
          </div>

        </div>
        <div class="condition">
          人数比例限定：
          <el-radio-group v-model="radio">
            <el-radio :label="1">可以超过人数比例限制</el-radio>
            <el-radio :label="2">不得超过人数比例限制</el-radio>
          </el-radio-group>
        </div>
        <div class="condition">
          人数四舍五入设置：
          <el-radio-group v-model="limit">
            <el-radio :label="1">小数四舍五入</el-radio>
            <el-radio :label="2">小数全舍</el-radio>
            <el-radio :label="3">小数全入</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "analysisSetting",
    data() {
      return {
        options: [{
          label: '六等级（ABC）'
        }, {
          label: '五等级（ABCDE）'
        }, {
          label: '四等级（ABCD）'
        }],
        value: '',
        grade: [{
          name: 'A+',
          value: 1
        },
        {
          name: 'A',
          value: 1
        },
        {
          name: 'B+',
          value: 1
        },
        {
          name: 'B',
          value: 1
        },
        {
          name: 'C+',
          value: 1
        },
        {
          name: 'C',
          value: 1
        }
        ],
        radio: 1,
        limit: 1,
        num: 120,
        checked: true,
      }
    },
    methods: {
      next() {
        this.asd()
      },
      asd() {
        this.$bus.$emit('next', "true");
      },
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>

<style lang="scss">
  .analysisSetting {
    font-size: 12px;
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

    .title {
      width: 100%;
      height: 36px;
      line-height: 36px;
      background: linear-gradient(270deg, #17c7bb, #0fbc77);
      border-radius: 2px;
      box-sizing: border-box;
      padding-left: 30px;
      color: #fff;
    }

    .contentBoxTitle {
      width: 94%;
      height: 26px;
      line-height: 26px;
      background: #f0f9f6;
      color: #333;
      padding: 0 0 0 30px;
      margin: 10px auto 0;
      border: 1px solid #d8e8e2;
    }

    .contentBoxContentGrade {
      width: 90%;
      margin: 12px 0;
      display: flex;
      justify-content: space-around;

      .sel {
        .el-input {
          width: 180px;
        }
      }

      .inp {

        .el-input {
          width: 80px;
        }

        .el-input-number {
          width: 80px;
        }
      }
    }

    .condition {
      width: 90%;
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      background: #f2f2f2;
      color: #999;
      padding-left: 30px;
      margin-left: 0;
      margin-top: 13px
    }


    .contentBoxContent {
      margin: 0 0 0 60px;
    }
  }
</style>