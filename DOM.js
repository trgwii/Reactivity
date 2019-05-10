import State from './State.js';

const q = x => document.querySelector(x);
const el = x => document.createElement(x);

const text = (el, s) =>
	((typeof s.subscribe === 'function'
		? s.subscribe(x =>
			el.textContent = x)
		: el.textContent = s), el);

const children = (el, s) => {
	let cache = [];
	s.subscribe(x =>
		x.forEach((x, i) =>
			(x === cache[i]  || el.children[i]
				? el.replaceChild(x, el.children[i])
				: el.appendChild(x),
			cache[i] = x)));
};

const event = event => el => {
	const s = State();
	el.addEventListener(event, e =>
		s.publish(e.target.value));
	return State.readOnly(s);
};

const input = event('input');
const click = event('click');

const DOM = { q, el, text, children, event, input, click };

export default DOM;
