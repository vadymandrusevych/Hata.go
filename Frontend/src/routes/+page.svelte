<script lang="ts">
	import DoubleRangeSlider from '$lib/components/doublerange slider/DoubleRangeSlider.svelte';

	const minPossiblePrice = 100;
	const maxPossiblePrice = 1000;
	const priceRange = maxPossiblePrice - minPossiblePrice;

	let minUserPrice: number = $state(minPossiblePrice);
	let maxUserPrice: number = $state(maxPossiblePrice);

	const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);
	const priceToPos = (price: number) => (price - minPossiblePrice) / priceRange;
	const posToPrice = (pos: number) => minPossiblePrice + pos * priceRange;

	const minSliderPos = $derived(clamp(priceToPos(minUserPrice), 0, 1));
	const maxSliderPos = $derived(clamp(priceToPos(maxUserPrice), 0, 1));

	function handleSliderChange(newMinPos: number, newMaxPos: number) {
		minUserPrice = Math.round(posToPrice(newMinPos));
		maxUserPrice = Math.round(posToPrice(newMaxPos));
	}

	function commitMinInput() {
		minUserPrice = clamp(minUserPrice, minPossiblePrice, maxPossiblePrice);
		if (minUserPrice > maxUserPrice) maxUserPrice = minUserPrice;
	}

	function commitMaxInput() {
		maxUserPrice = clamp(maxUserPrice, minPossiblePrice, maxPossiblePrice);
		if (maxUserPrice < minUserPrice) minUserPrice = maxUserPrice;
	}
</script>

<div
	class="flex h-auto flex-row items-center justify-center rounded-xl px-10 text-center text-7xl font-bold"
	id="Text"
>
	Find Housing for Rent
</div>
<div class="mx-8 my-6 flex h-1/12 flex-col rounded-2xl border-6 border-olive-700" id="param box">
	<div class="flex flex-row justify-between">
		<div class="m-auto max-w-60 min-w-60 p-2 text-center">
			<div>PRICE-RANGE</div>
			<DoubleRangeSlider
				minPos={minSliderPos}
				maxPos={maxSliderPos}
				onChange={handleSliderChange}
			/>
			<div class="flex flex-row justify-between">
				<input
					bind:value={minUserPrice}
					id="InputMinValue"
					max={maxPossiblePrice}
					min={minPossiblePrice}
					onchange={commitMinInput}
					type="number"
				/>
				<div>-</div>
				<input
					bind:value={maxUserPrice}
					id="InputMaxValue"
					max={maxPossiblePrice}
					min={minPossiblePrice}
					onchange={commitMaxInput}
					type="number"
				/>
			</div>
		</div>
		<div class="object-center text-center">
			<div>CITY</div>
			<input class="mx-50 max-w-60 min-w-60" placeholder="City" type="text" value="" />
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
