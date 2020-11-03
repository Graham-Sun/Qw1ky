<template>
  <div id="setting" v-loading="loading">
    <div class="head">宝华实验学校2019年上学期七年级期末考试</div>
    <div class="content">
      <div v-show="setting.subjectFullScoreSettings.flag" class="subjectNum">
        <div class="title">
          {{ setting.subjectFullScoreSettings.name }}
        </div>
        <div class="box">
          <span class="totalScore">总分: {{ totalScore }}</span>
          <div
            class="subject"
            v-for="(item, index) in setting.subjectFullScoreSettings.value"
            :key="index"
          >
            {{ item.name }}：
            <el-input-number
              size="mini"
              :min="0"
              :max="120"
              v-model="item.value"
              label="描述文字"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div
        v-show="
          setting.scoreValiditySettings.flag ||
            setting.caliberOfMissingTestStatistics.flag ||
            setting.caliberOf0PointsStatistics.flag
        "
        class="basicSettings"
      >
        <div class="title">
          分析报表基础设置
        </div>
        <div class="box">
          <p>{{ setting.scoreValiditySettings.name }}</p>
          <el-checkbox-group v-model="setting.scoreValiditySettings.value">
            <el-checkbox label="1">将0分设置为缺考</el-checkbox>
            <el-checkbox label="2">将缺考有分设置为不缺考</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="box">
          <p>{{ setting.caliberOfMissingTestStatistics.name }}</p>
          <el-checkbox-group
            v-model="setting.caliberOfMissingTestStatistics.value"
          >
            <el-checkbox label="1">科目缺考不参与科目统计计算</el-checkbox>
            <el-checkbox label="2">科目缺考不参与总分统计计算</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="box">
          <p>{{ setting.caliberOf0PointsStatistics.name }}</p>
          <el-checkbox-group v-model="setting.caliberOf0PointsStatistics.value">
            <el-checkbox label="1">0分不参与科目统计计算</el-checkbox>
            <el-checkbox label="2">0分不参与总分统计计算</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div
        v-show="
          setting.firstClassSettings.flag ||
            setting.levelSettings.flag ||
            setting.subjectTotalScoreSetting.flag ||
            setting.limitedNumberOfPeople.flag ||
            setting.subjectTotalScoreSetting.flag ||
            setting.subjectTotalScoreSetting.flag ||
            setting.academicQualitySetting.falg
        "
        class="advancedSetting"
      >
        <div class="title">
          分析报表高级设置
          <span class="show" v-html="show" @click="changeShow"></span>
        </div>
        <div class="box" v-show="show.indexOf('收起') > 0">
          <div
            class="firstClassSettings"
            v-show="setting.firstClassSettings.flag"
          >
            <p>{{ setting.firstClassSettings.name }}</p>
            <div>
              <span class="span">学生成绩人数等级：</span>
              <el-select
                class="select"
                size="mini"
                v-model="setting.firstClassSettings.defaultOption"
                placeholder="请选择"
                @change="changeFirstClassSettings"
              >
                <el-option
                  v-for="item in setting.firstClassSettings.options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
              <div
                class="value"
                v-for="(item, index) in setting.firstClassSettings.value"
                :key="index"
              >
                {{ item.name }}
                <el-input-number
                  v-model="item.value"
                  controls-position="right"
                  :min="0"
                  :max="100 - firstClassTotalScore + item.value"
                  size="mini"
                ></el-input-number>
              </div>
            </div>
            <div
              class="limitedNumberOfPeople"
              v-show="setting.limitedNumberOfPeople.flag"
            >
              {{ setting.limitedNumberOfPeople.name }}
              <el-radio-group
                class="radio"
                v-model="setting.limitedNumberOfPeople.value"
              >
                <el-radio label="1">可以超过人数比例限制</el-radio>
                <el-radio label="2">不得超过人数比例限制</el-radio>
              </el-radio-group>
            </div>
            <div
              class="roundingNumberSetting"
              v-show="setting.roundingNumberSetting.flag"
            >
              {{ setting.roundingNumberSetting.name }}
              <el-radio-group
                class="radio"
                v-model="setting.roundingNumberSetting.value"
              >
                <el-radio label="1">小数四舍五入</el-radio>
                <el-radio label="2">小数全舍</el-radio>
                <el-radio label="3">小数全入</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="levelSettings" v-show="setting.levelSettings.flag">
            <p>{{ setting.levelSettings.name }}</p>
            <div>
              <span class="span">学生成绩分数等级：</span>
              <el-select
                class="select"
                size="mini"
                v-model="setting.levelSettings.defaultOption"
                placeholder="请选择"
                @change="changeLevelSettings"
              >
                <el-option
                  v-for="item in setting.levelSettings.options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
              <div
                class="value"
                v-for="(item, index) in setting.levelSettings.value"
                :key="index"
              >
                <span class="text" v-if="index === 0">
                  0 ≤ {{ item.name }}
                </span>
                <span class="text" v-else>
                  ﹤
                  <el-input-number
                    v-model="setting.levelSettings.arrValue[index]"
                    controls-position="right"
                    :min="0"
                    :max="100"
                    size="mini"
                  ></el-input-number>
                  ≤
                  {{ item.name }}
                </span>
                <span
                  class="text"
                  v-if="index === setting.levelSettings.value.length - 1"
                >
                  ﹤100%
                </span>
              </div>
            </div>
          </div>
          <div
            class="subjectScoreInterval"
            v-show="setting.subjectScoreInterval.flag"
          >
            <p>{{ setting.subjectScoreInterval.name }}</p>
            <div class="subjectScoreInterval_box">
              <span class="span">总分分数间隔：</span>
              <el-input-number
                size="mini"
                v-model="setting.subjectScoreInterval.defaultOption"
                :min="5"
                :max="10"
                label="描述文字"
                @change="
                  (newNum, oldNum) => changeSubjectScoreInterval(newNum, oldNum)
                "
              ></el-input-number>
              <div class="subjectScoreInterval_number">
                <el-input-number
                  size="mini"
                  v-for="(item, index) in setting.subjectScoreInterval.value"
                  :key="index"
                  v-model="item.value"
                  controls-position="right"
                  :disabled="
                    index === 0 ||
                      index === setting.subjectScoreInterval.value.length - 1
                  "
                  :min="0"
                  :max="
                    setting.subjectScoreInterval.value[
                      setting.subjectScoreInterval.value.length - 1
                    ].value
                  "
                ></el-input-number>
              </div>
              <div class="tips">
                *分数段间隔数量填写之后，系统会自动为您生成相应数量的间隔，并将总分自动拆分
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getSetting } from "@/api/api.js";
export default {
  name: "AnalysisSetting",
  // 接受父组件传来的参数
  props: {},
  data() {
    return {
      loading: true,
      show: '<span>收起<i class="el-icon-arrow-up"/></span>',
      setting: {
        subjectFullScoreSettings: {},
        scoreValiditySettings: {
          value: [],
        },
        caliberOf0PointsStatistics: {
          value: [],
        },
        caliberOfMissingTestStatistics: {
          value: [],
        },
        firstClassSettings: {
          options: [],
        },
        levelSettings: {},
        limitedNumberOfPeople: {},
        roundingNumberSetting: {},
        subjectScoreInterval: {},
        subjectTotalScoreSetting: {},
        academicQualitySetting: {},
      },
    };
  },
  computed: {
    totalScore() {
      let totalScore = 0;
      let value = this.setting.subjectFullScoreSettings.value;
      value
        ? (totalScore = value
            .map((item) => item.value)
            .reduce((x, y) => x + y, 0))
        : (totalScore = 0);
      return totalScore;
    },
    // 第等分数设置
    firstClassTotalScore() {
      return this.setting.firstClassSettings.value
        .map((item) => item.value)
        .reduce((x, y) => x + y, 0);
    },
  },
  methods: {
    ...mapMutations("analysis", {
      next: "next",
    }),
    begin() {
      this.submit();
    },
    // 展开收起
    changeShow() {
      this.show =
        this.show === '<span>收起<i class="el-icon-arrow-up"/></span>'
          ? '<span>展开<i class="el-icon-arrow-down"/></span>'
          : '<span>收起<i class="el-icon-arrow-up"/></span>';
    },
    // 修改第等设置
    changeFirstClassSettings(e) {
      let { firstClassSettings } = this.setting;
      let index = firstClassSettings.options.findIndex(
        (item) => item.name === e
      );
      let value = firstClassSettings.options[index].value.split(",");
      let newArr = [];
      value.map((v) => {
        newArr.push({
          name: v,
          value: 0,
        });
      });
      firstClassSettings.value = newArr;
    },
    //  修改等级设置
    changeLevelSettings(e) {
      let { levelSettings } = this.setting;
      let index = levelSettings.options.findIndex((item) => item.name === e);
      let value = levelSettings.options[index].value.split(",");
      let newArr = [];
      let newValue = [];
      let key = e.split("、");
      value.map((item, index) => {
        newArr.push({
          name: key[index],
          value: item,
        });
      });
      levelSettings.value = newArr;
      newArr.map((item) => {
        newValue.push(item.value.split("-")[0]);
      });
      levelSettings.arrValue = newValue;
    },
    // 等级设置校验
    validateLevelSettings() {
      let { levelSettings } = this.setting;
      let newArr = [];
      // 修改数值
      levelSettings.value.map((item, index) => {
        newArr.push({
          name: item.name,
          value: `${levelSettings.arrValue[index]}-${levelSettings.arrValue[
            index + 1
          ] || 100}`,
        });
      });
      levelSettings.value = newArr;
      // 校验数值
      return levelSettings.arrValue.every(
        (item, index) => item < (levelSettings.arrValue[index + 1] || 100)
      );
    },
    // 修改科目分数间隔
    changeSubjectScoreInterval(newNum, oldNum) {
      let { subjectScoreInterval } = this.setting;
      let newArr = Array(Math.abs(newNum - oldNum)).fill({
        name: 0,
        value: 0,
      });
      newArr.map((item, index) => {
        if (newNum - oldNum > 0) {
          subjectScoreInterval.value.splice(
            subjectScoreInterval.value.length - 1,
            0,
            item
          );
        } else {
          subjectScoreInterval.value.splice(
            subjectScoreInterval.value.length - 2,
            1
          );
        }
      });
    },
    // 提交数据
    submit() {
      let levelSettings = this.validateLevelSettings();
      if (this.firstClassTotalScore !== 100) {
        this.$message.error("【第等设置】学生成绩人数等级总和大于100%");
      }
      if (!levelSettings) {
        this.$message.error("【等级设置】学生成绩人数等级区间错误");
      }
      if (this.firstClassTotalScore === 100 && levelSettings) {
        this.$router.push({ name: "analysis_analysisComplete" });
      }
    },
    getSetting() {
      getSetting().then((res) => {
        this.loading = false;
        this.setting = res;
        let {
          scoreValiditySettings,
          caliberOfMissingTestStatistics,
          caliberOf0PointsStatistics,
          levelSettings,
        } = this.setting;
        scoreValiditySettings.value = scoreValiditySettings.value.split(",");
        caliberOfMissingTestStatistics.value = caliberOfMissingTestStatistics.value.split(
          ","
        );
        caliberOf0PointsStatistics.value = caliberOf0PointsStatistics.value.split(
          ","
        );
        this.changeLevelSettings(levelSettings.defaultOption);
        console.log(res);
      });
    },
  },
  mounted() {
    this.getSetting();
  },
};
</script>

<style lang="scss">
#setting {
  width: 100%;
  height: 100%;
  .head {
    height: 46px;
    text-align: center;
    line-height: 46px;
    background: #fff;
    font-size: 20px;
  }
  .content {
    margin-top: 20px;
    min-height: 700px;
    margin-bottom: 30px;
    background: #fff;
    padding: 13px 26px;
    .el-input-number {
      width: 98px;
      padding-left: 0px !important;
      .el-input__inner {
        border-radius: 0px;
      }
    }

    .subjectNum,
    .basicSettings,
    .advancedSetting {
      .title {
        height: 38px;
        line-height: 38px;
        padding: 0 40px;
        background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
        border-radius: 3px;
        color: #fff;
        font-size: 14px;
      }
    }
    .subjectNum {
      .box {
        padding-right: 120px;
        position: relative;
        .totalScore {
          position: absolute;
          right: 30px;
          color: #1dbd84;
          font-size: 14px;
          top: 14px;
        }
        .subject {
          margin: 10px 20px 10px 0px;
          display: inline-block;
        }
      }
    }
    .basicSettings {
      .box {
        padding: 0 20px;
        p {
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          background: #f0f9f6;
          color: #333;
          padding: 0 0 0 30px;
          margin: 10px auto 0;
          border: 1px solid #d8e8e2;
          margin-bottom: 10px;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #000;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #72c6a8;
          border-color: #72c6a8;
        }
      }
    }
    .advancedSetting {
      .title {
        margin-top: 10px;
        .show {
          float: right;
          cursor: pointer;
        }
      }
      .box {
        .firstClassSettings,
        .levelSettings,
        .subjectScoreInterval {
          padding: 0 20px;
          p {
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            background: #f0f9f6;
            color: #333;
            padding: 0 0 0 30px;
            margin: 10px auto 0;
            border: 1px solid #d8e8e2;
            margin-bottom: 10px;
          }
          .span {
            font-size: 12px;
            margin-left: 28px;
          }
        }
        .firstClassSettings {
          .value {
            display: inline-block;
            margin-left: 30px;
          }
          .select {
            margin-bottom: 20px;
          }

          .limitedNumberOfPeople,
          .roundingNumberSetting {
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            background: #f2f2f2;
            color: #999;
            padding-left: 30px;
            margin-left: 0;
            margin-top: 13px;
            .radio {
              display: inline-block;
              margin-left: 50px;
              .el-radio__input.is-checked + .el-radio__label {
                color: #000;
              }
              .el-radio__input.is-checked .el-radio__inner {
                border-color: #72c6a8;
                background: #72c6a8;
              }
            }
          }
          .roundingNumberSetting {
            .radio {
              display: inline-block;
              margin-left: 26px;
            }
          }
        }
        .levelSettings {
          .value {
            display: inline-block;
          }
          .select {
            margin-bottom: 20px;
            margin-right: 20px;
          }
          .text {
            font-size: 14px;
          }
        }

        .subjectScoreInterval {
          .subjectScoreInterval_number {
            display: inline-block;
            margin-left: 20px;
          }
          .tips {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: #ef4747;
            line-height: 16px;
            margin-left: 28px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
