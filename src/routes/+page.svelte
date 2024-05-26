<script>
	import Content from '../components/Content.svelte';
	
</script>

<svelte:head>
	<title>Koordinat-konsul</title>
</svelte:head>
<Content title="Beranda">
	<svelte:fragment slot="head">
		<div class="flex flex-wrap text-white">
			<div class="pr-10">
				<div class="text-2xl font-bold">45</div>
				<div class="">Berlangsung</div>
			</div>
			<div class="pr-10">
				<div class="text-2xl font-bold">24</div>
				<div class="">Permintaan</div>
			</div>
			<div>
				<div class="text-2xl font-bold">62</div>
				<div class="">Total Konsultasi</div>
			</div>
		</div>
		<div class="flex items-center mt-4 md:mt-0">
			<button class="text-white bg-transparent" title="List View">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="8" y1="6" x2="21" y2="6" />
					<line x1="8" y1="12" x2="21" y2="12" />
					<line x1="8" y1="18" x2="21" y2="18" />
					<line x1="3" y1="6" x2="3.01" y2="6" />
					<line x1="3" y1="12" x2="3.01" y2="12" />
					<line x1="3" y1="18" x2="3.01" y2="18" />
				</svg>
			</button>
			<button class="text-white bg-gray-700 p-2 ml-2" title="Grid View">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="3" y="3" width="7" height="7" />
					<rect x="14" y="3" width="7" height="7" />
					<rect x="14" y="14" width="7" height="7" />
					<rect x="3" y="14" width="7" height="7" />
				</svg>
			</button>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="body">
		<div class="flex flex-wrap">
			<div class="w-full md:w-4/12">
				<div class="p-2">
					<div class="p-4 rounded-3xl" style=" background-color: #fee4cb">
						<div class="flex items-center justify-b" />
						<div class="text-center mb-4 mt-5">
							<p class="text-base font-bold opacity-70">Mahasiswa Bimbingan</p>
							<a href="http://www.w3.org/2000/svg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									enable-background="new 0 0 24 24"
									height="100%"
									viewBox="0 0 24 24"
									width="100%"
									fill="#a06308"
									><g><rect fill="none" height="24" width="24" /></g><g
										><g
											><g
												><path
													d="M21,3H3C1.9,3,1,3.9,1,5v8h2V5h18v16c1.1,0,2-0.9,2-2V5C23,3.9,22.1,3,21,3z"
												/></g
											><g><circle cx="9" cy="10" r="4" /></g><g
												><path
													d="M15.39,16.56C13.71,15.7,11.53,15,9,15c-2.53,0-4.71,0.7-6.39,1.56C1.61,17.07,1,18.1,1,19.22V22h16v-2.78 C17,18.1,16.39,17.07,15.39,16.56z"
												/></g
											></g
										></g
									></svg
								>
							</a>
						</div>
						<div>
							<p class="text-sm font-bold m-0">Progress</p>
							<div class="w-full h-1 rounded-md overflow-hidden bg-white my-2 mx-0">
								<span class="block h-1 rounded-md bg-yellow-700 w-6/12" />
							</div>
							<p class="text-right m-0 text-sm font-bold">60%</p>
						</div>
						<div class="flex justify-between pt-4 relative">
							<div class="flex items-center">
								<img
									class="w-5 h-5 rounded-full overflow-hidden object-cover"
									src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
									alt="participant"
								/>
								<img
									class="w-5 h-5 rounded-full overflow-hidden object-cover"
									src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
									alt="participant"
								/>
								<button
									class="w-5 h-5 rounded-full border-none ml-3 p-0 flex justify-center items-center bg-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="3"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="feather feather-plus"
									>
										<path d="M12 5v14M5 12h14" />
									</svg>
								</button>
							</div>
							<div
								class="text-sm rounded-lg flex flex-shrink-0 py-2 px-4 font-bold text-yellow-600"
							>
								5 Hari yang Lalu
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-4/12">
				<div class="p-2">
					<div class="p-4 rounded-3xl bg-gray-300">
						<div class="flex items-center justify-b" />
						<div class="text-center mb-4 mt-5">
							<p class="text-base font-bold opacity-70">Konsultasi</p>
							<a href="/pesan">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="100%"
									viewBox="0 0 24 24"
									width="100%"
									fill="#4438ca"
									><path d="M0 0h24v24H0z" fill="none" /><path
										d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"
									/></svg
								>
							</a>
						</div>
						<div>
							<p class="text-sm font-bold m-0">Progress</p>
							<div class="w-full h-1 rounded-md overflow-hidden bg-white my-2 mx-0">
								<span class="block h-1 rounded-md bg-indigo-700 w-5/12" />
							</div>
							<p class="text-right m-0 text-sm font-bold">50%</p>
						</div>
						<div class="flex justify-between pt-4 relative">
							<div class="flex items-center">
								<img
									class="w-5 h-5 rounded-full overflow-hidden object-cover"
									src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
									alt="participant"
								/>
								<img
									class="w-5 h-5 rounded-full overflow-hidden object-cover"
									src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
									alt="participant"
								/>
								<button
									class="w-5 h-5 rounded-full border-none ml-3 p-0 flex justify-center items-center bg-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="3"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="feather feather-plus"
									>
										<path d="M12 5v14M5 12h14" />
									</svg>
								</button>
							</div>
							<div
								class="text-sm rounded-lg flex flex-shrink-0 py-2 px-4 font-bold text-indigo-700"
							>
								2 Hari yang Lalu
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:w-4/12">
				<div class="p-2">
					<div class="p-4 rounded-3xl bg-green-200">
						<div class="flex items-center justify-b" />
						<div class="text-center mb-4 mt-5">
							<p class="text-base font-bold opacity-70">Riwayat</p>
							<a href="/arsip">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="100%"
									viewBox="0 0 24 24"
									width="100%"
									fill="#15823f"
									><path d="M0 0h24v24H0z" fill="none" /><path
										d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
									/></svg
								>
							</a>
						</div>
						<div>
							<p class="text-sm font-bold m-0">Progress</p>
							<div class="w-full h-1 rounded-md overflow-hidden bg-white my-2 mx-0">
								<span class="block h-1 rounded-md bg-green-700 w-7/12" />
							</div>
							<p class="text-right m-0 text-sm font-bold">80%</p>
						</div>
						<div class="flex justify-between pt-4 relative">
							<div class="flex items-center">
								<img
									class="w-5 h-5 rounded-full overflow-hidden object-cover"
									src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
									alt="participant"
								/>
								<img
									class="w-5 h-5 rounded-full overflow-hidden object-cover"
									src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
									alt="participant"
								/>
								<button
									class="w-5 h-5 rounded-full border-none ml-3 p-0 flex justify-center items-center bg-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="3"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="feather feather-plus"
									>
										<path d="M12 5v14M5 12h14" />
									</svg>
								</button>
							</div>
							<div class="text-sm rounded-lg flex flex-shrink-0 py-2 px-4 font-bold text-green-700">
								1 Hari yang Lalu
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</svelte:fragment>
</Content>
