<script>

    import WsStatus from "./WsStatus.svelte";

</script>
<header>
    <h1>MQTT Websocket test</h1>
    <nav>
        <a href="/">Home</a>
        <a href="/sensors">Sensors</a>
        <a href="/settings">Settings</a>
    </nav>
    <WsStatus />
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    nav {
        display: flex;
        gap: 1rem;
    }
</style>
