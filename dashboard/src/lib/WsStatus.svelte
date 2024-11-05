<script>
    import { onMount } from "svelte";
    import { wsStore } from "../stores/ws_store";
    import { connect } from "./ws";
    import { disconnect } from "./ws";
    onMount(() => {
        connect();
    });
</script>
<div>
    {#if $wsStore.status === "disconnected"}
        <button on:click={connect}>Connect</button>
    {:else if $wsStore.status === "connected"}
        <button on:click={disconnect}>Disconnect</button>
    {:else}
        <button disabled>Loading...</button>
    {/if}
    <p>Socket status: <span class={$wsStore.status}>{$wsStore.status}</span></p>
</div>

<style>
    div {
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }   
    button {
        height: min-content;
    }
    p {
        font-size: 1.5rem;
    }

    .connected {
        color: green;
    }

    .disconnected {
        color: red;
    }
</style>
