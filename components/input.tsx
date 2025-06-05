export const Input = ({ placeholder, onChange, type, name }: {
	placeholder: string
	type: string
	name: string
	onChange?: () => void
}) => {
	return (
		<input placeholder={placeholder} type={type} name={name} onChange={onChange} className="py-3 px-2 border border-orange-300 focus:outline-none placeholder-amber-100/80 w-full" />
	)
}
