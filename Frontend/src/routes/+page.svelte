<script lang="ts">
	let minValue: number = $state(0);
	let maxValue: number = $state(1);
	let minPrice: number = $state(0);
	let maxPrice: number = $state(1000);
	const minPossiblePrice: number = $state(0);
	const maxPossiblePrice: number = $state(1000);
	const nice = (d: number) => {
		if (!d && d !== 0) return '';
		return d.toFixed();
	};
	function PriceToSlider(price: number) {
		return (price - minPrice) / (maxPrice - minPrice);
	}
	function SliderToPrice(value: number) {
		return minPrice + value * (maxPrice - minPrice);
	}
	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max);
	}
	function updateMinPriceFromInput() {
		minPrice = clamp(minPrice, maxPrice, minPossiblePrice);
		minValue = PriceToSlider(minPrice);
	}
	function updateMaxPriceFromInput() {
		maxPrice = clamp(maxValue, minPrice, maxPossiblePrice);
		maxValue = PriceToSlider(maxPrice);
	}

	$effect(() => {
		minPrice = Math.round(SliderToPrice(minValue));
		maxPrice = Math.round(SliderToPrice(maxValue));
	});
	import DoubleRangeSlider from '$lib/components/doublerange slider/DoubleRangeSlider.svelte';
</script>

<div
	id="Text"
	class="flex h-auto flex-row items-center justify-center rounded-xl px-10 text-center text-7xl font-bold"
>
	Find Housing for Rent
</div>
<div id="param box" class="mx-8 my-6 flex h-1/12 flex-col rounded-2xl border-6 border-olive-700">
	<div class="flex flex-row justify-between">
		<div class="m-auto max-w-60 min-w-60 p-2 text-center">
			<div class="">PRICE-RANGE</div>
			<DoubleRangeSlider bind:minValue bind:maxValue />
			<div class="flex flex-row justify-between">
				<div>{nice(minValue * 1000)}</div>
				<input
					type="number"
					id="InputMinValue"
					bind:value={minPrice}
					oninput={updateMinPriceFromInput}
					min="0"
					max="100"
				/>
				<div>-</div>
				<div>{nice(maxValue * 1000)}</div>
			</div>
		</div>
		<div class="object-center text-center">
			<div>CITY</div>
			<input class="mx-50 max-w-60 min-w-60" type="text" value placeholder="City" />
		</div>
		<div class="mx-50 max-w-60 min-w-60">afafsf</div>
	</div>
	<div
		class="mx-5 mb-4 flex justify-center rounded-xl bg-yellow-200 px-40 py-2 text-center text-2xl"
	>
		SEARCH
	</div>
</div>
<div>
	<div></div>
</div>
<p class="w-full bg-amber-700">hui</p>

<!--Треба флекс контент 💀💀💀 алаймент-->
