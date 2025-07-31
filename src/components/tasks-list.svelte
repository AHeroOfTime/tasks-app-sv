<script>
	import { fade } from 'svelte/transition';

	let { tasks, toggleDone, removeTask } = $props();
</script>

<section>
	{#each tasks as task}
		<article class="task" transition:fade>
			<label>
				<input type="checkbox" checked={task.done} onchange={() => toggleDone(task)} />
				<span class:done={task.done}>{task.title}</span>
			</label>
			<button onclick={() => removeTask(task.id)} class="outline">Remove</button>
		</article>
	{/each}
</section>

<style>
	.done {
		text-decoration: line-through;
	}

	.task {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
