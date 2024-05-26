<script>
	export let title;
</script>

<div class="flex flex-wrap">
	<!-- lg:w-8/12 -->
	<div class="w-full bg-gray-800 py-6 px-6 rounded-3xl">
		<div class="flex justify-between text-white items-center mb-8">
			<p class="text-2xl font-bold">{title}</p>
			<p class="">December, 12</p>
		</div>
		<div class="flex flex-wrap justify-between items-center pb-5">
			<slot name="head" />
		</div>
		<slot name="body" />
	</div>
	<!-- <div class="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
		<div class="bg-gray-800 rounded-3xl px-6 pt-6">
			<div class="flex text-white text-2xl pb-6 font-bold">
				<p>Obrolan</p>
			</div>
			<div>
				<div
					class="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700"
				>
					<img
						src="https://simakad.unismuh.ac.id/upload/mahasiswa/105841109520_.jpg?1714763929"
						alt="profile"
						class="object-cover w-10 h-10 rounded-full"
					/>
					<div class="pl-4 w-full">
						<div class="flex items-center justify-between w-full">
							<div class="text-white font-medium">IF 20</div>
							<div class="flex justify-center items-center cursor-pointer h-7 w-7">
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
									class="text-white"
								>
									<polygon
										points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
									/>
								</svg>
							</div>
						</div>
						<p class="my-2 text-sm text-gray-400">
							Saya, Andi, mahasiswa Informatika ingin meminta waktu konsultasi dengan Anda. Apakah bisa kita bertemu pada hari Rabu...
						</p>
						<p class="text-right text-gray-400 text-sm">Dec, 12</p>
					</div>
				</div>
				<div
					class="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700"
				>
					<img
						src="https://simakad.unismuh.ac.id/upload/mahasiswa/105841108019_.jpg?1714763929"
						alt="profile"
						class="object-cover w-10 h-10 rounded-full"
					/>
					<div class="pl-4 w-full">
						<div class="flex items-center justify-between w-full">
							<div class="text-white font-medium">IF 19</div>
							<div class="flex justify-center items-center cursor-pointer h-7 w-7">
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
									class="text-white"
								>
									<polygon
										points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
									/>
								</svg>
							</div>
						</div>
						<p class="my-2 text-sm text-gray-400">
							Saya, Dian, mahasiswa Informatika ingin mengatur waktu konsultasi dengan Anda terkait topik tugas akhir saya...
						</p>
						<p class="text-right text-gray-400 text-sm">Dec, 12</p>
					</div>
				</div>
				<div
					class="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700"
				>
					<img
						src="https://simakad.unismuh.ac.id/upload/mahasiswa/105841109522_.jpg?1714763929"
						alt="profile"
						class="object-cover w-10 h-10 rounded-full"
					/>
					<div class="pl-4 w-full">
						<div class="flex items-center justify-between w-full">
							<div class="text-white font-medium">IF 22</div>
							<div class="flex justify-center items-center cursor-pointer h-7 w-7">
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
									class="text-white"
								>
									<polygon
										points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
									/>
								</svg>
							</div>
						</div>
						<p class="my-2 text-sm text-gray-400">
							Saya, Budi, mahasiswa Informatika ingin melakukan konsultasi dengan Anda terkait topik penelitian saya...
						</p>
						<p class="text-right text-gray-400 text-sm">Dec, 12</p>
					</div>
				</div>
				<div
					class="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700"
				>
					<img
						src="https://simakad.unismuh.ac.id/upload/mahasiswa/105841102721_.jpg?1714763929"
						alt="profile"
						class="object-cover w-10 h-10 rounded-full"
					/>
					<div class="pl-4 w-full">
						<div class="flex items-center justify-between w-full">
							<div class="text-white font-medium">IF 21</div>
							<div class="flex justify-center items-center cursor-pointer h-7 w-7">
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
									class="text-white"
								>
									<polygon
										points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
									/>
								</svg>
							</div>
						</div>
						<p class="my-2 text-sm text-gray-400">
							Perkenalkan, saya Cinta, mahasiswa Informatika. Saya ingin meminta kesempatan untuk konsultasi dengan Anda mengenai pemrograman web...
						</p>
						<p class="text-right text-gray-400 text-sm">Dec, 12</p>
					</div>
				</div>
			</div>
		</div>
	</div> -->
</div>
