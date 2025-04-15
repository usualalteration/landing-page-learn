<script  lang="ts">
    import { onMount } from "svelte";

    let message = $state("Loading...");
    let name = $state("");
    function hello() {
        console.log("hello")
        fetch("/api/my/form/hello", {
            method: "POST",
            body: JSON.stringify({ name: name  }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => {
            message = data.message
            name = ""
        });
    }
    onMount(hello)

</script>
<h1>{message}</h1>
<form>
<input type="input" bind:value={name} placeholder="Enter your name" />
<button onclick={hello}>Send</button>
</form>