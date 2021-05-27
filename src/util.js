export function getProperty(props, name) {
	return props.find(({ name: check }) => check === name)?.value;
}

export const power = {
	ON: "power.on",
	OFF: "power.off"
};
