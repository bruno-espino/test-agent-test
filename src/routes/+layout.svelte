<script lang="ts">
	import PhFolders from '~icons/ph/folders'
	import PhChartBar from '~icons/ph/chart-bar'
	import PhListMagnifyingGlass from '~icons/ph/list-magnifying-glass'
	import PhPlugsConnected from '~icons/ph/plugs-connected'
	import PhGear from '~icons/ph/gear'
	import PhQuestion from '~icons/ph/question'
	import PhCaretLeft from '~icons/ph/caret-left'
	import PhCaretRight from '~icons/ph/caret-right'
	import '../app.css';

	let { children } = $props();
	let { collapsed } = $state(false);
	// Use a string to track the current active route.
	let { current } = $state('/dashboard');

	interface MenuItem {
		href: string;
		label: string;
		Icon: any;
	}

	const menuItems: MenuItem[] = [
		{ href: '/dashboard', label: 'Dashboards', Icon: PhChartBar },
		{ href: '/projects', label: 'Projects', Icon: PhFolders },
		{ href: '/runs', label: 'Runs', Icon: PhListMagnifyingGlass },
		{ href: '/integrations', label: 'Integrations', Icon: PhPlugsConnected },
		{ href: '/settings', label: 'Settings', Icon: PhGear },
	];

	function toggleCollapse() {
		collapsed = !collapsed;
	}
	function setCurrent(item: MenuItem) {
		current = item.href;
	}
</script>

<div class="min-h-screen flex flex-col">
	<div class="min-h-screen flex">
	  <!-- Left Sidebar -->
	  <aside class="bg-[#333333] p-6 flex flex-col {collapsed ? 'w-16' : 'w-50'}">
		<!-- Top Section: Menu Items -->
		<nav class="flex-grow">
		  <ul>
			{#each menuItems as item}
			  <li class="mb-3">
				<a 
					href={item.href} 
					class="{current === item.href ? 'text-white' : 'text-gray-400'} hover:text-white flex items-center" 
					onclick={() => setCurrent(item)}>
				  <div class="flex-shrink-0 w-6">
					<item.Icon/>
				  </div>
				  <div class="ml-2 overflow-hidden" style="width: {collapsed ? '0px' : 'auto'}">
					{item.label}
				  </div>
				</a>
			  </li>
			{/each}
		  </ul>
		</nav>
		
		<!-- Bottom Section: Help & Collapse -->
		<div>
		  <ul>
			<li class="mb-3">
			  <a href="/help" class="text-gray-400 hover:text-white flex items-center">
				<div class="flex-shrink-0 w-6">
				  <PhQuestion/>
				</div>
				<div class="ml-2 overflow-hidden" style="width: {collapsed ? '0px' : 'auto'}">
				  {#if !collapsed}
					Help
				  {/if}
				</div>
			  </a>
			</li>
			<li class="mb-2">
			  <a href="#" class="text-gray-400 hover:text-white flex items-center" onclick={toggleCollapse}>
				<div class="flex-shrink-0 w-6">
				  {#if !collapsed}
					<PhCaretLeft/>
				  {:else}
					<PhCaretRight/>
				  {/if}
				</div>
				<div class="ml-2 overflow-hidden" style="width: {collapsed ? '0px' : 'auto'}">
				  {#if !collapsed}
					Collapse
				  {/if}
				</div>
			  </a>
			</li>
		  </ul>
		</div>
	  </aside>
	  
	  <!-- Main Content -->
	  <main class="flex-1 p-4">
		{@render children()}
	  </main>
	</div>
	
	<!-- Footer -->
	<footer class="bg-[#25252] text-white p-4">
	  <p class="text-center">Footer</p>
	</footer>
</div>
