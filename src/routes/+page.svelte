<script>
	import TasksForm from '../components/tasks-form.svelte';
	import TasksList from '../components/tasks-list.svelte';
	import { tasks } from '$lib/store.svelte';

	let message = 'Tasks App';
	let currentFilter = $state('all');
	let totalDone = $derived(tasks.current.reduce((total, task) => total + Number(task.done), 0));

	let filteredTasks = $derived.by(() => {
		switch (currentFilter) {
			case 'all': {
				return tasks.current;
			}
			case 'done': {
				return tasks.current.filter((task) => task.done);
			}
			case 'todo': {
				return tasks.current.filter((task) => !task.done);
			}
		}
		return tasks.current;
	});

	function addTask(newTask) {
		tasks.current.push({
			id: crypto.randomUUID(),
			title: newTask,
			done: false
		});
	}

	function toggleDone(task) {
		task.done = !task.done;
	}

	function removeTask(id) {
		const index = tasks.current.findIndex((task) => task.id === id);
		tasks.current.splice(index, 1);
	}
</script>

{#snippet filterButton(filter)}
	<button
		onclick={() => (currentFilter = filter)}
		class="secondary filterButton"
		class:contrast={currentFilter === filter}>{filter}</button
	>
{/snippet}

<main>
	<h1>{message}</h1>
	<TasksForm {addTask} />
	<p>
		{#if tasks.current.length}
			{totalDone} / {tasks.current.length} tasks completed
		{:else}
			Add a task to get started
		{/if}
	</p>
	{#if tasks.current.length}
		<div class="button-container">
			{@render filterButton('all')}
			{@render filterButton('todo')}
			{@render filterButton('done')}
		</div>
	{/if}
	<TasksList tasks={filteredTasks} {toggleDone} {removeTask} />
</main>

<style>
	main {
		margin: 1rem auto;
		max-width: 800px;
	}

	.button-container {
		display: flex;
		justify-content: end;
		margin-bottom: 1rem;
		gap: 0.5rem;
	}

	.filterButton {
		text-transform: capitalize;
	}
</style>
