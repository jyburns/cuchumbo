<script>
	import Cuchumbo from './components/Cuchumbo.svelte';
</script>

<div class="container">
	<main>
		<h1>Cuchumbo!</h1>
		<h2>🎁 A small app for setting up gift exchanges 🎉</h2>
		<Cuchumbo/>
	</main>
</div>

<style>
	:root {
		--background-color--main: white;
		--h1-color--main: #ff3e00;
		--default-text-color--main: #4a4a4a;
		--disabled-text-color--main: #aaaaaa;
		--default-border-color--main: #aaaaaa;
		--default-button-color--main: #88bbda;
		--secondary-button-color--main: #f07248;
		--disabled-button-color--main: #dbdbdb;
		--error-color--main: #ff3e00;

		--background-color--dark-mode: #3a3a3a;
		--h1-color--dark-mode: #ff3e00;
		--default-text-color--dark-mode: #dadada;
		--disabled-text-color--dark-mode: #aaaaaa;
		--default-border-color--dark-mode: #aaaaaa;
		--default-button-color--dark-mode: #6b9bb6;
		--secondary-button-color--dark-mode: #f06132;
		--disabled-button-color--dark-mode: #b3c7d3;
		--error-color--dark-mode: #ff3e00;

		--background-color: var(--background-color--main);
		--h1-color: var(--h1-color--main);
		--default-text-color: var(--text-color--main);
		--disabled-text-color: var(--disabled-text-color--main);
		--default-border-color: var(--default-border-color--main);
		--default-button-color: var(--default-button-color--main);
		--secondary-button-color: var(--secondary-button-color--main);
		--disabled-button-color: var(--disabled-button-color--main);
		--error-color: var(--error-color--main);
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

  :global(svg) {
		fill: black;
		stroke: black;
		height: 30px;
	}

	.container {
		height: 100vh;
		width: 100vw;
		background-color: var(--background-color);
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: var(--h1-color);
		text-transform: uppercase;
		font-size: 2.5em;
		font-weight: 100;
	}

	h2 {
		color: var(--default-text-color);
		font-weight: 300;
	}

	@media (min-width: 640px) {
		h1 {
			font-size: 4em;
		}

		main {
			max-width: 650px;
		}
	}
</style>