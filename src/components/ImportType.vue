<template>
  <p>import type should be removed without side-effect</p>
</template>

<script setup lang="ts">
interface Foo {}
const msg: Foo = {}
</script>
