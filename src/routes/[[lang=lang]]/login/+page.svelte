<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Link from '$lib/components/Link.svelte';
	import Pending from '$lib/components/Pending.svelte';
	import Remember from '$lib/components/Remember.svelte';
	import RowVisibility from '$lib/components/RowVisibility.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import LL from '$lib/i18n/i18n-svelte';
	import { HttpClient } from '$lib/services/http-client';
	import type { PageData } from './$types';
	import { Body, ResponseType } from '@tauri-apps/api/http';

	export let data: PageData;

	type Field = 'name' | 'password' | 'submit';

	const visible = {
		name: true,
		password: false,
		submit: false
	};
	let fieldErrors: { [key in Field]?: string } = {};
	let caption = {
		ok: false,
		text: ''
	};
	let pending = false;

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		pending = true;
		fieldErrors = {};
		if (!$form.name.length) {
			fieldErrors.name = login.name.empty();
			return;
		}
		if (!$form.password.length) {
			fieldErrors.password = login.password.empty();
			return;
		}
		try {
			const { data, ok } = await HttpClient.instance.fetch<string>('/login', {
				method: 'POST',
				body: Body.json({ name: $form.name, password: $form.password }),
				responseType: ResponseType.JSON
			});
			if (!ok) {
				throw new Error($LL.error.message.badNetwork());
			}
			if (data.error) {
				caption.ok = false;
				switch (data.error.code) {
					case 'NOT_FOUND': {
						caption.text = login.wrong();
						break;
					}
					case 'WRONG': {
						caption.text = login.wrong();
						break;
					}
				}
				return;
			}
			caption = {
				ok: true,
				text: login.ok()
			};
		} catch (e: unknown) {
			if (e instanceof Error) {
				caption = { ok: false, text: $LL.error.fetch({ message: e.message }) };
			}
			return;
		} finally {
			pending = false;
		}
	}

	$: ({ login } = $LL);
	$: ({ form } = data);
	$: visible.password = $form.name.length !== 0;
	$: visible.submit = visible.password && $form.password.length !== 0;
</script>

<div class="flex flex-col justify-center h-full p-4">
	<h1 class="text-center mb-16">{login.h1()}</h1>
	<form method="post" action="?/login" class="grid gap-y-6 mx-auto w-72" on:submit={submit}>
		<RowVisibility visible={visible.name} class="p-[2px]">
			<div class="grid gap-y-1">
				<Label for="name">{login.name.label()}</Label>
				<Input
					type="text"
					name="name"
					id="name"
					placeholder={login.name.placeholder()}
					bind:value={$form.name}
				/>
			</div>
			<RowVisibility visible={!!fieldErrors.name}>
				<p class="text-h6 font-bold text-red-500">
					{fieldErrors.name}
				</p>
			</RowVisibility>
		</RowVisibility>
		<RowVisibility visible={visible.password} class="p-[2px]">
			<div class="grid gap-y-1">
				<div class="flex justify-between">
					<Label for="password">{login.password.label()}</Label>
					<Link href="/en/forgot-password" class="text-h6">{login.password.forgot()}</Link>
				</div>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder={login.password.placeholder()}
					bind:value={$form.password}
				/>
			</div>
			<RowVisibility visible={!!fieldErrors.password}>
				<p class="text-h6 font-bold text-red-500">
					{fieldErrors.password}
				</p>
			</RowVisibility>
		</RowVisibility>
		<RowVisibility visible={visible.submit} class="p-[2px]">
			<Button type="submit" class="w-full">
				<Pending {pending}>
					<div slot="pending">
						<Spinner class="w-5 h-5" />
					</div>
					{login.submit()}
				</Pending>
			</Button>
		</RowVisibility>
	</form>
	<p class="text-center text-h6">
		{login.noAccount()}
		<Link href="/{$page.params.lang}/signup">{login.signUp()}</Link>.
	</p>
	<RowVisibility visible={!!caption.text}>
		<p class="text-h6 text-center font-bold {caption.ok ? 'text-green-500' : 'text-red-500'}">
			<Remember value={caption.text} />
		</p>
	</RowVisibility>
</div>
