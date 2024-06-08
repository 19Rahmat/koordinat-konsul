<script>
	export let title;
	export let aside_title;
	export let visit = false;
</script>

<div class="flex flex-wrap">
	<!-- lg:w-8/12 -->
	<main class="grow lg:w-8/12 bg-gray-800 p-6 rounded-3xl">
		<div class="flex justify-between text-white items-center mb-8">
			<p class="text-2xl font-bold">{title}</p>
			<p class="">TA Genap 2023</p>
		</div>
		<div class="flex w-full relative lg:max-w-xl justify-between gap-2 items-center pb-5">
			<slot name="head" />
		</div>
		<slot name="body" />
	</main>
	<aside
		class="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4"
		style={`display: ${visit == true ? 'block' : 'none'}`}
	>
		<div class="bg-gray-800 rounded-3xl px-6 pt-6">
			<div class="flex text-white text-2xl pb-6 font-bold">
				<p>{aside_title}</p>
			</div>
			<div class="pb-6">
				<slot name="aside_body" />
			</div>
		</div>
	</aside>
</div>
