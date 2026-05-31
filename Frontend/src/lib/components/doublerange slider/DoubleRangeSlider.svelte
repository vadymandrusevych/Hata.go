<script lang="ts">
	type Props = {
		minPos: number;
		maxPos: number;
		onChange: (newMin: number, newMax: number) => void;
	};
	const { minPos, maxPos, onChange }: Props = $props();

	const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);

	let leftHandle: HTMLDivElement;
	let body: HTMLDivElement;
	let slider: HTMLDivElement;

	function getPoint(event: TouchEvent | MouseEvent) {
		if ('touches' in event) {
			return event.touches[0] ?? event.changedTouches[0];
		}
		return event;
	}

	function draggable(
		node: HTMLElement,
		callbacks: {
			ondragstart?: (detail: { x: number; y: number }) => void;
			ondragmove?: (detail: { x: number; y: number; dx: number; dy: number }) => void;
			ondragend?: (detail: { x: number; y: number }) => void;
		},
	) {
		let x: number;
		let y: number;

		function handleMousedown(event: TouchEvent | MouseEvent) {
			const e = getPoint(event);
			x = e.clientX;
			y = e.clientY;
			callbacks.ondragstart?.({ x, y });

			window.addEventListener('mousemove', handleMousemove);
			window.addEventListener('mouseup', handleMouseup);
			window.addEventListener('touchmove', handleMousemove, { passive: false });
			window.addEventListener('touchend', handleMouseup);
		}

		function handleMousemove(event: TouchEvent | MouseEvent) {
			if ('touches' in event) event.preventDefault();
			const e = getPoint(event);
			const dx = e.clientX - x;
			const dy = e.clientY - y;
			x = e.clientX;
			y = e.clientY;
			callbacks.ondragmove?.({ x, y, dx, dy });
		}

		function handleMouseup(event: TouchEvent | MouseEvent) {
			const e = getPoint(event);
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
				window.removeEventListener('mousemove', handleMousemove);
				window.removeEventListener('mouseup', handleMouseup);
				window.removeEventListener('touchmove', handleMousemove);
				window.removeEventListener('touchend', handleMouseup);
			},
		};
	}

	function setHandlePosition(which: 'start' | 'end') {
		return (detail: { x: number }) => {
			const { left, right } = slider.getBoundingClientRect();
			const p = clamp((detail.x - left) / (right - left), 0, 1);
			if (which === 'start') {
				onChange(p, Math.max(maxPos, p));
			} else {
				onChange(Math.min(p, minPos), p);
			}
		};
	}

	function setHandlesFromBody(detail: { dx: number }) {
		const { width } = body.getBoundingClientRect();
		const { left, right } = slider.getBoundingClientRect();
		const parentWidth = right - left;
		const leftHandleLeft = leftHandle.getBoundingClientRect().left;
		const pxStart = clamp(leftHandleLeft + detail.dx - left, 0, parentWidth - width);
		const pxEnd = clamp(pxStart + width, width, parentWidth);
		onChange(pxStart / parentWidth, pxEnd / parentWidth);
	}
</script>

<div class="box-border h-5 w-full select-none">
	<div
		class="relative top-1/2 h-1.5 w-full translate-y-1/2 rounded-xs bg-yellow-200 shadow-[0_7px_10px_-5px_rgba(74,74,74,1.0)]"
		bind:this={slider}
	>
		<div
			class="absolute top-0 bottom-0 bg-yellow-300"
			bind:this={body}
			use:draggable={{ ondragmove: setHandlesFromBody }}
			style="left: {100 * minPos}%; right: {100 * (1 - maxPos)}%;"
		></div>
		<div
			class="handle"
			bind:this={leftHandle}
			data-which="start"
			use:draggable={{ ondragmove: setHandlePosition('start') }}
			style="left: {100 * minPos}%"
		></div>
		<div
			class="handle"
			data-which="end"
			use:draggable={{ ondragmove: setHandlePosition('end') }}
			style="left: {100 * maxPos}%"
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
