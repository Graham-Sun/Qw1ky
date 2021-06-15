/**
 * @param  {vue}  mixin
 */
export const myMixin = {
  data() {
    return {
      list: [1, 2],
    };
  },
  methods: {},
};

/**
 * @param  {js原生}  公共方法
 */

//计算滚动距离的兼容性写法（兼容ie8以上及以下）
let getScroll0ffset = function () {
  if (window.pageXOffset) {
    return {
      x: window.pageXoffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
};
//计算浏览器的可视窗口的兼容写法
let getViewport0ffset = function () {
  if (window.innerwidth) {
    return {
      w: window.innerwidth,
      h: window.innerHeight,
    };
  } else {
    //怪异模式
    if (document.compatMode === "BackCompat") {
      return {
        w: document.body.clientwidth,
        h: document.body.clientHeight,
      };
    } else {
      //标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
};
/**查询元素样式的兼容性写法
 * @param {dom元素} elem 查询的对象 <div></div>
 * @param {String} prop 要查询的样式属性
 * @returns
 */
let getStyle = function (elem, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop];
  } else {
    return elem.currentStyle[prop];
  }
};
/**
 *绑定事件的兼容性写法
 * @param {dom元素} elem 绑定的对象 <div></div>
 * @param {String} type 事件的类型
 * @param {function} handle 事件的方法
 */
let addEvent = function (elem, type, handle) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + type, function () {
      handle.caLl(elem);
    });
  } else {
    elem["on" + type] = handle;
  }
};
/**
 *阻止冒泡的兼容性写法
 * @param {*} event 绑定的事件对象
 */
let stopBubble = function (event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
};
/**
 * 阻止默认事件的兼容性写法
 * @param {*} event 绑定的事件对象
 */
let cancelHandLer = function (event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
};
/**
 *简单拖拽
 * @param {dom元素} elem 绑定事件的元素
 */
let drag = function (elem) {
  var disX, disY;
  addEvent(elem, " mousedown", function (e) {
    var event = e || window.event;
    disX = event.clientX - parseInt(getStyle(elem, " left"));
    disY = event.clientY - parseInt(getStyle(elem, " top"));
    addEvent(document, " mousemove", mouseMove);
    addEvent(document, " mouseup", mouseUp);
    stopBubble(event);
    cancelHandLer(event);
  });

  function mouseMove(e) {
    var event = e || window.event;
    elem.style.left = event.clientX - disX + "px";
    elem.style.top = event.clientY - disY + "px";
  }

  function mouseUp(document) {
    // var event = e || window;
    document.removeEventListener("mousemove", mouseMove, false);
    document.removeEventListener("mouseup", mouseUp, false);
  }
};

export {
  getScroll0ffset,
  getViewport0ffset,
  getStyle,
  addEvent,
  stopBubble,
  cancelHandLer,
  drag,
};
