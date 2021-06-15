<template>
  <div :class="`${classNames}`">
    <h1>{{ msg }}</h1>
    <div :class="`${classNames}` + '_tab'">
      <ul :class="`${classNames}_ul`">
        <li
          :class="classNames + '_list'"
          v-for="item in list"
          :key="item.id"
          @click="onChangeTabs(item)"
        >
          <span
            :class="['label', { active, danger: item.value === modelValue }]"
          >
            {{ item.label }}
          </span>
          <span
            :class="[$attrs.class, { active: item.id === value }]"
            @click="one, two"
            >{{ item.value }}</span
          >
        </li>
      </ul>
      <div>{{ $attrs["data-id"] }}</div>
      <input @keyup.space="up" v-model.lazy="inputContent" v-focus />
      <div :class="`${classNames}_input`" v-if="published">
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames" />
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
        <label for="mike">Mike</label>
        <span>Checked names: {{ checkedNames }}</span>
      </div>
      <div>{{ inputContent }}</div>
    </div>
  </div>
</template>

<script>
// import { Vue } from "vue";
export default {
  name: "rander",
  inheritAttrs: false,
  emits: ["change-tab"],
  directives: {
    focus: {
      // 指令的定义
      mounted(el, binding) {
        console.log(el, binding);
        el.focus();
      },
    },
  },
  // render() {
  //   const { h } = Vue;
  //   return h(
  //     "h" + this.value, // tag name
  //     {}, // props/attributes
  //     this.$slots.default() // array of children
  //   );
  // },
  props: {
    msg: String,
    modelValue: {
      type: [Number, String],
    },
    value: {
      type: [Number, String],
      default: 1,
    },
    published: Boolean,
  },
  created() {
    console.log(this.$attrs);
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
      checkedNames: [],
      inputContent: "",
    };
  },
  methods: {
    onChangeTabs(item) {
      this.$emit("update:modelValue", item.value);
      this.$emit("update:value", item.id);
      // this.$attrs.onChangeTab(44)
    },
    one() {
      console.log(1);
    },
    two() {
      console.log(2);
    },
    up() {
      alert(22);
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
