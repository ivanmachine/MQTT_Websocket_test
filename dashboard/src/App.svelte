<script>

    import Header from "./lib/Header.svelte";
    import { wsStore } from "./stores/ws_store";

</script>

<Header />
<h1>Dashboard</h1>

<div>
    {#each $wsStore.data as temperature}
        <p>{temperature}</p>
    {/each}
</div>