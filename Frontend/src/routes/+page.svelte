<script lang="ts">
	let minValue: number = $state(0);
	let maxValue: number = $state(1);
	let minPrice: number = $state(0);
	let maxPrice: number = $state(1000);
	const maxPossiblePrice: number = $state(1000);
	const minPossiblePrice: number = $state(0);
	const nice = (d: number) => {
		if (!d && d !== 0) return '';
		return d.toFixed()
	};
function PriceToSlider(price: number) {
	return (price - minPrice) / (maxPrice - minPrice);
}
function SliderToPrice(value: number) {
	return minPrice+value * (maxPrice - minPrice);
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
		minPrice=Math.round(SliderToPrice(minValue));
		maxPrice=Math.round(SliderToPrice(maxValue));
	});
	import DoubleRangeSlider from '$lib/components/doublerange slider/DoubleRangeSlider.svelte';
</script>
<div id="Text" class="flex flex-row items-center justify-center  text-center text-7xl font-bold h-auto px-10 rounded-xl ">
	Find Housing for Rent
	</div>
	<div id="param box" class="flex flex-col border-6 border-olive-700 rounded-2xl mx-8 my-6 h-1/12">
		<div class="flex justify-between flex-row  ">
			<div class="text-center p-2 min-w-60 max-w-60 m-auto ">
				<div class="">PRICE-RANGE</div>
				<DoubleRangeSlider bind:minValue bind:maxValue />
				<div class="flex flex-row justify-between">
					<div>{nice(minValue*1000)}</div>
						<input type="number" id="InputMinValue" bind:value={minPrice} oninput ={updateMinPriceFromInput} min="0" max="100" />
						<div>-</div>
						<div>{nice(maxValue*1000)}</div>
					</div>
				</div>
				<div class="text-center object-center ">
					<div>CITY</div>
				<input class="min-w-60 max-w-60 mx-50" type="text" value placeholder="City">
				</div>
				<div class="mx-50 min-w-60 max-w-60"> afafsf</div>
			</div>
			<div class="bg-yellow-200 flex justify-center text-2xl text-center rounded-xl mb-4 mx-5 px-40 py-2"> SEARCH </div>

		</div>
	<div>
		<div>

		</div>
	</div>
		<p class="bg-amber-700 w-full">hui</p>

		<!--Треба флекс контент 💀💀💀 алаймент-->