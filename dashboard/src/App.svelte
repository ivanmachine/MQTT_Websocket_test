<script>
    import Chart from "./lib/Chart.svelte";
    import Header from "./lib/Header.svelte";
    import { wsStore } from "./stores/ws_store";
</script>

<Header />
<h1>Dashboard</h1>

<section class="two_column_layout">
    <div>
        {#each $wsStore.data as temperature}
            <pre>
            {JSON.stringify(temperature, null, 2)}
            </pre>
        {/each}
    </div>
    <Chart />
</section>

<style>
    .two_column_layout {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 1rem;
        padding: 1rem;
        height: calc(100vh - 100px);
        overflow: hidden;
    }

    .two_column_layout > div:first-child {
        overflow-y: auto;
        max-height: 100%;
    }
</style>    