<script>
	import { clearSessionToken } from '$lib/data/getData';
	import { openSidebar } from './store';
	import { getPhoto } from '$lib/data/getData';

	let isProfilOpen = false;
	function handleLogout() {
		clearSessionToken();
		window.location.href = '/';
	}

	function toggleDropdown() {
		isProfilOpen = !isProfilOpen;
	}
</script>

<header class="h-20 items-center relative z-10">
	<div
		class="flex flex-center flex-col h-full justify-center mx-auto relative px-3 text-white z-10"
	>
		<div class="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68">
			<div class="flex group h-full items-center relative w-12">
				<button
					type="button"
					aria-expanded="false"
					aria-label="Toggle sidenav"
					on:click={openSidebar}
					class="text-4xl text-white focus:outline-none"
				>
					&#8801;
				</button>
			</div>
			<div class="container flex left-0 relative w-3/4">
				<div class="group hidden items-center ml-8 relative w-full md:flex lg:w-72">
					<div
						class="absolute cursor-pointer flex items-center justify-center h-10 p-3 pr-2 text-gray-500 text-sm uppercase w-auto sm:hidden"
					>
						<svg
							fill="none"
							class="h-5 relative w-5"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
				</div>
			</div>
			<div class="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto">
				<!-- <span class="block pr-5 relative">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
				</span> -->
				<span class="block relative">
					<button on:click={toggleDropdown}>
						<img
							alt="Rahmat Gunawan"
							src={getPhoto()}
							class="h-10 mx-auto object-scale-down rounded-full w-10"
						/>
					</button>
					<!-- dropdwon profile -->
					{#if isProfilOpen}
						<div
							on:mouseleave={() => (isProfilOpen = false)}
							class="z-10 fixed rounded-lg shadow w-44 bg-gray-700 divide-gray-600 right-10"
						>
							<ul class="py-2 text-smtext-gray-200" aria-labelledby="avatarButton">
								<li>
									<a
										href="/page/profile"
										class="block px-4 py-2 hover:bg-gray-600 hover:text-white"
									>
										Profile
									</a>
								</li>
							</ul>
							<div class="py-1">
								<a
									href="/"
									class="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
									on:click={handleLogout}
								>
									Sign out
								</a>
							</div>
						</div>
					{/if}
				</span>
			</div>
		</div>
	</div>
</header>
