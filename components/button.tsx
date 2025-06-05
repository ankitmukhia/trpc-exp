'use client';

type ButtonTypes = "submit" | "reset" | "button" | undefined

export const Button = ({ type, children }: { type: ButtonTypes, children: React.ReactNode }) => {
	return (
		<button type={type} className="bg-orange-300 py-2 px-4 text-white font-light cursor-pointer">
			{children}
		</button>
	)
}
