const State = init => {
	const subscribers = [];
	let value = init;

	const publish = next =>
		Promise.resolve(next).then(val => {
			value = val;
			subscribers.forEach(subscriber =>
				subscriber(val));
		});

	const subscribe = f => {
		if (value) {
			f(value);
		}
		subscribers.push(f);
	};
	
	const merge = (val, f) =>
		publish(f(value, val));

	const map = f => {
		const s = State(f(value));
		subscribe(value =>
			s.publish(f(value)));
		return State.readOnly(s);
	};

	return { publish, merge, subscribe, map };
};

State.readOnly = ({ subscribe, map }) =>
	({ subscribe, map });

export default State;
