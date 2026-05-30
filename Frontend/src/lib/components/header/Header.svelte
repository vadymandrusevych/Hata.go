<script>
	import { resolve } from '$app/paths';
</script>

<div id="nav-menu" class="flex h-auto w-full flex-row content-center justify-between p-6 font-bold">
	<div id="Logo" class="text h-auto w-auto min-w-0 content-center overflow-hidden text-7xl">
		<a class=" allign-middle inline-block w-full truncate text-center" href={resolve('/')}>
			HATA.GO
		</a>
	</div>
	<!--		<div id="separator" class="bg-amber-500  w-auto h-full">  </div>  -->
	<nav class="h-auto content-center-safe">
		<a
			id="Add Listing"
			class="m-3 h-full w-auto rounded-xl bg-yellow-200 px-10 py-4 text-center text-2xl"
		>
			Add-Listing
		</a>
		<a
			id="Regbutton"
			class="m-3 h-full w-auto rounded-xl bg-yellow-100 px-10 py-4 text-center text-2xl"
		>
			Register
		</a>
		<a
			id="Logbutton"
			class="content-centerD m-3 h-full w-auto rounded-xl bg-yellow-100 px-10 py-4 text-center text-2xl"
		>
			Login
		</a>
	</nav>
</div>
