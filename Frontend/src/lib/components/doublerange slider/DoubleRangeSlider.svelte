<script lang="ts">
	import { clamp } from 'yootils';

	let { minSliderInput = $bindable(), maxSliderInput = $bindable() }: { minSliderInput: number; maxSliderInput: number } =
		$props();
	let leftHandle: HTMLDivElement;
	let body: HTMLDivElement;
	let slider: HTMLDivElement;
	function draggable(
		node: HTMLElement,
		callbacks: {
			ondragstart?: (detail: { x: number; y: number }) => void;
			ondragmove?: (detail: { x: number; y: number; dx: number; dy: number }) => void;
			ondragend?: (detail: { x: number; y: number }) => void;
		}
	) {
		let x: number;
		let y: number;

		function handleMousedown(event: TouchEvent | MouseEvent) {
			const e = event instanceof TouchEvent ? event.touches[0] : event;
			x = e.clientX;
			y = e.clientY;
			callbacks.ondragstart?.({ x, y });

			window.addEventListener('mousemove', handleMousemove);
			window.addEventListener('mouseup', handleMouseup);
			window.addEventListener('touchmove', handleMousemove);
			window.addEventListener('touchend', handleMouseup);
		}

		function handleMousemove(event: TouchEvent | MouseEvent) {
			const e = event instanceof TouchEvent ? event.touches[0] : event;
			const dx = e.clientX - x;
			const dy = e.clientY - y;
			x = e.clientX;
			y = e.clientY;
			callbacks.ondragmove?.({ x, y, dx, dy });
		}

		function handleMouseup(event: TouchEvent | MouseEvent) {
			const e = event instanceof TouchEvent ? event.touches[0] : event;
			x = e.clientX;
			y = e.clientY;
			callbacks.ondragend?.({ x, y });

			window.removeEventListener('mousemove', handleMousemove);
			window.removeEventListener('mouseup', handleMouseup);
			window.removeEventListener('touchmove', handleMousemove);
			window.removeEventListener('touchend', handleMouseup);
		}

		node.addEventListener('mousedown', handleMousedown);
		node.addEventListener('touchstart', handleMousedown);

		return {
			destroy() {
				node.removeEventListener('mousedown', handleMousedown);
				node.removeEventListener('touchstart', handleMousedown);
			}
		};
	}
	function setHandlePosition(which: 'start' | 'end') {
		return function (detail: { x: number; y: number; dx: number; dy: number }) {
			const { left, right } = slider.getBoundingClientRect();
			const parentWidth = right - left;
			const p = Math.min(Math.max((detail.x - left) / parentWidth, 0), 1);
			if (which === 'start') {
				minSliderInput = p;
				maxSliderInput = Math.max(maxSliderInput, p);
			} else {
				minSliderInput = Math.min(p, minSliderInput);
				maxSliderInput = p;
			}
		};
	}
	function setHandlesFromBody(detail: { x: number; y: number; dx: number; dy: number }) {
		const { width } = body.getBoundingClientRect();
		const { left, right } = slider.getBoundingClientRect();
		const parentWidth = right - left;
		const leftHandleLeft = leftHandle.getBoundingClientRect().left;
		const pxStart = clamp(leftHandleLeft + detail.dx - left, 0, parentWidth - width);
		const pxEnd = clamp(pxStart + width, width, parentWidth);
		const pStart = pxStart / parentWidth;
		const pEnd = pxEnd / parentWidth;
		minSliderInput = pStart;
		maxSliderInput = pEnd;
	}
</script>

<div class="w-full h-5 select-none box-border whitespace-nowrap">
	<div class="relative w-full h-1.5 top-1/2 translate-x-0 translate-y-1/2 bg-yellow-200 shadow-[0_7px_10px_-5px_rgba(74,74,74,1.0)] shadow-[0_-1px_0px_0px_rgba(156,156,156,1.0) rounded-xs" bind:this={slider}>
		<div
			class="top-0 absolute bg-yellow-300 bottom-0"
			bind:this={body}
			use:draggable={{ ondragmove: setHandlesFromBody }}
			style="
				left: {100 * minSliderInput}%;
				right: {100 * (1 - maxSliderInput)}%;
			"
		></div>
		<div
			class="handle"
			bind:this={leftHandle}
			data-which="start"
			use:draggable={{ ondragmove: setHandlePosition('start') }}
			style="
				left: {100 * minSliderInput}%"
		></div>
		<div
			class="handle"
			data-which="end"
			use:draggable={{ ondragmove: setHandlePosition('end') }}
			style="
				left: {100 * maxSliderInput}%
			"
		></div>
	</div>
</div>

<style>
	.handle {
		position: absolute;
		top: 50%;
		width: 0;
		height: 0;
	}
	.handle:after {
		content: ' ';
		box-sizing: border-box;
		position: absolute;
		border-radius: 50%;
		width: 16px;
		height: 16px;
		background-color: #fdfdfd;
		border: 1px solid #7b7b7b;
		transform: translate(-50%, -50%);
	}
	.handle:active:after {
		background-color: #ddd;
		z-index: 9;
	}
	</style>