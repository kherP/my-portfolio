// Motion helpers shared by the Matrix design. All of them do nothing when the
// visitor prefers reduced motion, and the page is complete without them.

export const KANA = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789<>/{}=+*';
// Text fonts have no katakana, so scrambled text sticks to ASCII to avoid layout jitter.
const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}=+*#$%';

export const pick = (s: string): string => s[Math.floor(Math.random() * s.length)];
export const prefersReducedMotion = (): boolean =>
	matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = (): boolean => matchMedia('(hover: hover) and (pointer: fine)').matches;

const frames = new WeakMap<HTMLElement, number>();

/** Decode an element's text into place from random glyphs. Use on text-only elements. */
export const scramble = (el: HTMLElement, dur = 650): void => {
	if (prefersReducedMotion()) return;
	const text = (el.dataset.text ??= el.textContent ?? '');
	const t0 = performance.now();
	cancelAnimationFrame(frames.get(el) ?? 0);
	const step = (now: number) => {
		const p = Math.min((now - t0) / dur, 1);
		el.textContent = [...text]
			.map((ch, i) => (ch === ' ' || i < p * text.length ? ch : pick(SCRAMBLE)))
			.join('');
		if (p < 1) frames.set(el, requestAnimationFrame(step));
	};
	frames.set(el, requestAnimationFrame(step));
};

/** Decode once after mount, optionally delayed (ms). */
export const decode = (node: HTMLElement, delay = 0) => {
	const t = setTimeout(() => scramble(node, 1000), delay);
	return { destroy: () => clearTimeout(t) };
};

/** Decode on hover. Pass a selector to decode a child instead of the node itself. */
export const scrambleOnHover = (node: HTMLElement, target?: string) => {
	const enter = () => {
		const el = target ? node.querySelector<HTMLElement>(target) : node;
		if (el && finePointer()) scramble(el, 450);
	};
	node.addEventListener('pointerenter', enter);
	return { destroy: () => node.removeEventListener('pointerenter', enter) };
};

/**
 * Slide in when scrolled into view. Only elements below the fold start hidden, so the
 * first frame is always complete. `glitch` flickers screens in; headings marked
 * `data-decode` inside the node decode as it appears.
 */
export const reveal = (node: HTMLElement, opts: { glitch?: boolean; delay?: number } = {}) => {
	if (prefersReducedMotion() || node.getBoundingClientRect().top < innerHeight * 0.95) return {};
	node.style.setProperty('--i', String(opts.delay ?? 0));
	node.classList.add('reveal', 'pre');
	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.remove('pre');
			if (opts.glitch) {
				node.classList.add('glitch');
				setTimeout(() => node.classList.remove('glitch'), 900);
			}
			node.querySelectorAll<HTMLElement>('[data-decode]').forEach((h) => scramble(h, 900));
			io.disconnect();
		},
		{ threshold: 0.12 }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};

/** Tilt toward the pointer. The node reads --rx/--ry in its transform. */
export const tilt = (node: HTMLElement) => {
	if (!finePointer() || prefersReducedMotion()) return {};
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		node.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
		node.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
	};
	const leave = () => {
		node.style.removeProperty('--rx');
		node.style.removeProperty('--ry');
	};
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
};

/** Pull toward the pointer while hovered. */
export const magnetic = (node: HTMLElement) => {
	if (!finePointer() || prefersReducedMotion()) return {};
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const x = (e.clientX - r.left - r.width / 2) * 0.3;
		const y = (e.clientY - r.top - r.height / 2) * 0.4;
		node.style.setProperty('translate', `${x}px ${y}px`);
	};
	const leave = () => node.style.removeProperty('translate');
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
};
