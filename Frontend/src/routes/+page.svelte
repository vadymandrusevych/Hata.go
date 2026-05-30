<script lang="ts">
	const maxPossiblePrice: number = $state(1000);
	const minPossiblePrice: number = $state(100);
	let minSliderInput: number = $state(0);
	let maxSliderInput: number = $state(1);
	// svelte-ignore state_referenced_locally
	let minUserPrice: number = $state(minPossiblePrice);
	// svelte-ignore state_referenced_locally
	let maxUserPrice: number = $state(maxPossiblePrice);


	function UserInputToSliderPosition(userPrice: number) {
		return (userPrice - minPossiblePrice) / (maxPossiblePrice - minPossiblePrice);
	}

	function SliderPositionToPriceInput(SliderPosition: number) {
		return (maxPossiblePrice * SliderPosition); // slider pos 0 - 1
	}

	function RestrictToMinMaxValue(value: number) {
		return Math.min(Math.max(value, minPossiblePrice), maxPossiblePrice);
	}

	function updateMinUserPriceFromSliderInput() {
		minUserPrice = RestrictToMinMaxValue(minUserPrice);
		minSliderInput = UserInputToSliderPosition(minUserPrice);
	}

	function updateMaxUserPriceFromSliderInput() {
		maxUserPrice = RestrictToMinMaxValue(maxSliderInput);
		maxSliderInput = UserInputToSliderPosition(maxUserPrice);
	}

	$effect(() => {
		console.log(minUserPrice);
		console.log(maxUserPrice);
		maxSliderInput = UserInputToSliderPosition(maxUserPrice);
		minSliderInput = UserInputToSliderPosition(minUserPrice);
		console.log(minUserPrice);
		console.log(maxUserPrice);
	});

	import DoubleRangeSlider from '$lib/components/doublerange slider/DoubleRangeSlider.svelte';
</script>
<div class="flex flex-row items-center justify-center  text-center text-7xl font-bold h-auto px-10 rounded-xl "
     id="Text">
	Find Housing for Rent
</div>
<div class="flex flex-col border-6 border-olive-700 rounded-2xl mx-8 my-6 h-1/12" id="param box">
	<div class="flex justify-between flex-row  ">
		<div class="text-center p-2 min-w-60 max-w-60 m-auto ">
			<div class="">PRICE-RANGE</div>
			<DoubleRangeSlider bind:maxSliderInput bind:minSliderInput />
			<div class="flex flex-row justify-between">

				<input bind:value={minUserPrice} id="InputMinValue" max="{maxPossiblePrice}" min="{minPossiblePrice}"
				       oninput={updateMinUserPriceFromSliderInput}
				       type="number" />
				<div>-</div>
				<input bind:value={maxUserPrice} id="InputMaxValue" max="{maxPossiblePrice}" min="{minPossiblePrice}"
				       oninput={updateMaxUserPriceFromSliderInput}
				       type="number" />
			</div>
		</div>
		<div class="text-center object-center ">
			<div>CITY</div>
			<input class="min-w-60 max-w-60 mx-50" placeholder="City" type="text" value>
		</div>
		<div class="mx-50 min-w-60 max-w-60"> afafsf</div>
	</div>
	<div class="bg-yellow-200 flex justify-center text-2xl text-center rounded-xl mb-4 mx-5 px-40 py-2"> SEARCH</div>

</div>
<div>
	<div>

	</div>
</div>
<p class="bg-amber-700 w-full">hui</p>

<!--Треба флекс контент 💀💀💀 алаймент-->