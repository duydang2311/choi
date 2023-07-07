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
	import { Body, ResponseType } from '@tauri-apps/api/http';
	import httpStatus from 'http-status';
	import type { PageData } from './$types';

	export let data: PageData;

	type Field = 'email' | 'password' | 'confirm' | 'submit';

	const visible = {
		email: true,
		password: false,
		confirm: false,
		submit: false
	};
	let fieldErrors: { [key in Field]?: string } = {};
	let caption: { ok?: boolean, text?: string } = {};
	let pending = false;

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		caption = {};
		fieldErrors = {};
		
		$form.email = $form.email.trim();
		const { email, password, confirm } = $form;
		if (!email.length) {
			fieldErrors.email = signup.email.empty();
			return;
		}
		if (!password.length) {
			fieldErrors.password = signup.password.empty();
			return;
		}
		if (!confirm.length) {
			fieldErrors.confirm = signup.confirm.empty();
			return;
		}
		if (confirm !== password) {
			fieldErrors.confirm = signup.confirm.wrong();
			return;
		}
		
		pending = true;
		try {
			const { status, ok } = await HttpClient.instance.fetch<string>('/user', {
				method: 'POST',
				body: Body.json({ email: $form.email, password: $form.password }),
				responseType: ResponseType.JSON
			});

			if (status === httpStatus.CONFLICT) {
				caption = { ok: false, text: signup.email.conflict() };
				return;
			}
			
			if (!ok) {
				throw new Error($LL.error.message.badNetwork());
			}

			caption = {
				ok: true,
				text: signup.ok()
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

	$: ({ signup } = $LL);
	$: ({ form } = data);
	$: visible.password = $form.email.length !== 0;
	$: visible.confirm = visible.password && $form.password.length !== 0;
	$: visible.submit = visible.confirm && $form.confirm.length !== 0;
</script>

<div class="flex flex-col justify-center h-full p-4">
	<h1 class="text-center mb-16">{signup.h1()}</h1>
	<form method="post" action="?/login" class="grid gap-y-6 mx-auto w-72" on:submit={submit}>
		<RowVisibility visible={visible.email} class="p-[2px]">
			<div class="grid gap-y-1">
				<Label for="email">{signup.email.label()}</Label>
				<Input
					type="email"
					name="email"
					id="email"
					placeholder={signup.email.placeholder()}
					bind:value={$form.email}
				/>
			</div>
			<RowVisibility visible={!!fieldErrors.email}>
				<p class="text-h6 font-bold text-red-500">
					<Remember value={fieldErrors.email} />
				</p>
			</RowVisibility>
		</RowVisibility>
		<RowVisibility visible={visible.password} class="p-[2px]">
			<div class="grid gap-y-1">
				<Label for="password">{signup.password.label()}</Label>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder={signup.password.placeholder()}
					bind:value={$form.password}
				/>
			</div>
			<RowVisibility visible={!!fieldErrors.password}>
				<p class="text-h6 font-bold text-red-500">
					<Remember value={fieldErrors.password} />
				</p>
			</RowVisibility>
		</RowVisibility>
		<RowVisibility visible={visible.confirm} class="p-[2px]">
			<div class="grid gap-y-1">
				<Label for="confirm">{signup.confirm.label()}</Label>
				<Input
					type="password"
					name="confirm"
					id="confirm"
					placeholder={signup.confirm.placeholder()}
					bind:value={$form.confirm}
				/>
			</div>
			<RowVisibility visible={!!fieldErrors.confirm}>
				<p class="text-h6 font-bold text-red-500">
					<Remember value={fieldErrors.confirm} />
				</p>
			</RowVisibility>
		</RowVisibility>
		<RowVisibility visible={visible.submit} class="p-[2px]">
			<Button type="submit" class="w-full">
				<Pending {pending}>
					<div slot="pending">
						<Spinner class="w-5 h-5" />
					</div>
					{signup.submit()}
				</Pending>
			</Button>
		</RowVisibility>
	</form>
	<p class="text-center text-h6">
		{signup.hadAccount()}
		<Link href="/{$page.params.lang}/login">{signup.login()}</Link>.
	</p>
	<RowVisibility visible={!!caption.text}>
		<p class="text-h6 text-center font-bold {caption.ok ? 'text-green-500' : 'text-red-500'}">
			<Remember value={caption.text} />
		</p>
	</RowVisibility>
</div>
