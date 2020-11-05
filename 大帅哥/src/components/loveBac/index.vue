<template></template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    love(event) {
      const likeDom = document.createElement("div");
      this.count += 1;
      likeDom.className =
        this.count % 2 === 0 ? "like" : "like like--is-second";
      likeDom.style.left = `${event.clientX}px`;
      likeDom.style.top = `${event.clientY}px`;
      document.body.appendChild(likeDom);
      setTimeout(() => {
        document.body.removeChild(likeDom);
      }, 3900);
    },
  },
  mounted() {
    window.onclick = (event) => {
      this.love(event);
    };
  },
};
</script>

<style lang="scss">
@keyframes animation-y {
  0% {
    transform: translate(-50%, 0px) scale(0);
  }
  50% {
    transform: translate(-50%, -100px) scale(1.5);
  }
  100% {
    transform: translate(-50%, -300px) scale(1.5);
  }
}

@keyframes animation-x {
  0% {
    margin-left: 0px;
  }
  25% {
    margin-left: 25px;
  }
  75% {
    margin-left: -25px;
  }
  100% {
    margin-left: 0px;
  }
}

.like {
  position: absolute;
  width: 25px;
  height: 25px;
  pointer-events: none;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(https://img14.360buyimg.com/ling/jfs/t1/134959/40/26/8929/5ec79d68E968b0377/aa4feff2b7bcf231.png);
  animation: animation-x 3s 0s linear infinite, animation-y 4s 0s linear 1;
  &--is-second {
    background-image: url(https://img14.360buyimg.com/ling/jfs/t1/134906/37/26/9080/5ec79d5dE90e5f972/bc39e647c61c8bab.png);
    animation: animation-x 3s -2s linear infinite, animation-y 4s 0s linear 1;
  }
}
</style>
