<button
	{...$$restProps}
	class="text-p font-bold rounded cursor-pointer transition ease-in-out
	bg-fill-200 border border-transparent outline-none
	hover:border-fill-300
	focus-visible:border-fill-300 focus-visible:ring-2 focus-visible:ring-fill-300 {$$restProps.class}"
>
	<slot />
</button>
