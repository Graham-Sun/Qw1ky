<template>
  <div :class="`${classNames}`">
    <h1>{{ msg }}</h1>
    <div :class="`${classNames}` + '_tab'">
      <ul :class="`${classNames}_ul`">
        <li :class="classNames + '_list'" v-for="item in list" :key="item.id" @click="onChangeTabs(item)" >
          <span :class="['label', { active: item.id , danger: item.id === id }]">
            {{ item.label }}
          </span>
          <span :class="[$attrs.class, { danger: item.id === id }]">{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "rander",
  props: {
    msg: String,
    id: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {
      classNames: "rander",
      list: [
        {
          label: "功夫熊猫",
          id: 1,
          value: "pander",
        },
        {
          label: "熊猫大师",
          id: 2,
          value: "bigpander",
        },
      ],
    };
  },
  methods: {
    onChangeTabs(item) {
      this.$emit("update:id", item.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@classNames: rander;
.@{classNames} {
  h1 {
    color: red;
  }
  .@{classNames}_tab{
    .@{classNames}_ul{
      display: flex;
      .@{classNames}_list{
        .active{
          color: skyblue;
        }
        .danger{
          color: red;
        }
        .label{
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
