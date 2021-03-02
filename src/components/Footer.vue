<template>
  <div
    class="flex h-16 w-full justify-around content-center items-center bg-gray-100"
  >
    <a href="https://github.com/rocfoodnotbombs" target="_blank" class="h-10">
      <span class="sr-only">Workflow</span>
      <img class="w-auto h-10" src="../assets/git.svg" />
    </a>
    <div class="block font-thin text-xs xs:text-sm">
      <div class="text-indigo-500">
        This data set is made available under the
      </div>
      <div>
        <a
          class="text-indigo-600"
          rel="noopener noreferrer"
          target="_blank"
          href="http://www.opendatacommons.org/licenses/pddl/1.0/"
          >Public Domain Dedication and License v1.0</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
