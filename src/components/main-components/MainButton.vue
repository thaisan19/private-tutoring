<template>
  <button v-if="!link" :class="mode">
   <slot></slot>
  </button>
  <router-link v-else :to="to" class="router">
   <button :class="mode">
    <slot></slot>
   </button>
  </router-link>
</template>

<script>
export default {
 props: {
  mode: {
   type: String,
   required: false,
   default: null
  },
  link: {
   type: Boolean,
   required: false,
   default: false
  },
  to: {
   type: String,
   required: false,
   default: '/'
  }
 }
}
</script>

<style scoped>
.btn {
 padding: .5em .5em;
 font-size: 1em;
 background: none;
 border: 2px solid var(--black);
 cursor: pointer;
 transition: 0.5s;
 position: relative;
 overflow: hidden;
 border-radius: 30px;
}
.btn::before {
 content: "";
 position: absolute;
 left: 0;
 width: 100%;
 height: 0%;
 background: var(--black);
 z-index: -1;
 transition: 0.5s;
}
.btn:disabled {
 opacity: 0.5;
 color: var(--white);
 background: var(--black);
 cursor: not-allowed;
}
.btn:focus {
 outline: none;
 background: var(--black);
 color: var(--white);
}
.black {
 color: var(--black);
 background: #fff;
}
.black:hover {
 color:var(--white);
 z-index: 1000;
 box-shadow: -5px 5px 0px rgba(0,0,0,.15);
;
}
.black::before {
 bottom: 0;
 border-radius: 50% 50% 0 0;
}
.black:hover::before {
 height: 180%;
}
</style>