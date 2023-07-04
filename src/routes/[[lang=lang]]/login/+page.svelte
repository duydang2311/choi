<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Link from '$lib/components/Link.svelte';
	import Pending from '$lib/components/Pending.svelte';
	import RowVisibility from '$lib/components/RowVisibility.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { Tauri } from '$lib/services/tauri';

	type Field = 'username' | 'password' | 'submit';

	const visible = {
		username: true,
		password: false,
		submit: false
	};
	let pending = false;

	function input({ target }: Event) {
		if (!(target instanceof HTMLInputElement)) {
			return;
		}

		if (target.name === 'username') {
			visible.password = !!target.value;
		} else if (target.name === 'password') {
			visible.submit = !!target.value;
		}
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		pending = true;

		await new Promise((resolve) => setTimeout(resolve, 1000));
		const data = new FormData(e.target as HTMLFormElement);
		const ok = await Tauri.instance.invoke('plugin:login|login', {
			username: data.get('username'),
			password: data.get('password')
		});
		pending = false;
	}
</script>

<div class="flex flex-col justify-center h-full p-4">
	<h1 class="text-center mb-16">Log in to Choi.</h1>
	<form method="post" action="?/login" class="grid gap-y-6 mx-auto w-72" on:submit={submit}>
		<RowVisibility visible={visible.username} class="p-[2px]">
			<div class="grid gap-y-1">
				<Label for="username">Email or username</Label>
				<Input
					type="text"
					name="username"
					id="username"
					placeholder="Email or username"
					on:input={input}
				/>
			</div>
		</RowVisibility>
		<RowVisibility visible={visible.password} class="p-[2px]">
			<div class="grid gap-y-1">
				<div class="flex justify-between">
					<Label for="password">Password</Label>
					<Link href="/en/forgot-password" class="text-h6">Forgot your password?</Link>
				</div>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					on:input={input}
				/>
			</div>
		</RowVisibility>
		<RowVisibility visible={visible.submit} class="p-[2px]">
			<Button type="submit" class="w-full">
				<Pending {pending}>
					<div slot="pending">
						<Spinner class="w-5 h-5" />
					</div>
					Log in
				</Pending>
			</Button>
		</RowVisibility>
	</form>
	<p class="text-center text-h6">
		Don't have an account? <Link href="/en/signup">Sign up</Link>.
	</p>
</div>
