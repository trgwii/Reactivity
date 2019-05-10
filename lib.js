export const q = x => document.querySelector(x);
export const el = x => document.createElement(x);

export const text = (el, s) =>
	s.subscribe(x =>
		el.textContent = x);

export const State = value => {
	const subscribers = [];

	const publish = next =>
		Promise.resolve(next).then(val =>
			subscribers.forEach(subscriber =>
				subscriber(val)));

	const subscribe = f => {
		if (value) {
			f(value);
		}
		subscribers.push(f);
	};

	const map = f => {
		const s = State(f(value));
		subscribe(value =>
			s.publish(f(value)));
		return State.readOnly(s);
	};

	return { publish, subscribe, map };
};

State.readOnly = ({ subscribe, map }) =>
	({ subscribe, map });


export const inputState = el => {
	const s = State();
	el.addEventListener('input', e =>
		s.publish(e.target.value));
	return State.readOnly(s);
};