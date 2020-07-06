<template>
  <div>
    <asset-management-search/>
    <div style="margin-top: 10px">
      <asset-management-table/>
    </div>
  </div>
</template>

<script>
  import AssetManagementTable from "./asset-management-table";
  import AssetManagementSearch from "./asset-management-search";

  export default {
    name: "index",
    components: {
      AssetManagementSearch,
      AssetManagementTable,
    },
  }
</script>

<style scoped>

</style>
