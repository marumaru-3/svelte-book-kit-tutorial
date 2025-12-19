<script lang="ts">
	let { form } = $props<{
		form: any;
	}>();
</script>

<h2>ログイン</h2>
{#if form?.success}
	<p>入力されたメールアドレスにログインリンクを送信しました。</p>
{:else}
	<form method="post">
		<div>
			<label for="email">メールアドレス</label>
			<input type="text" name="email" id="email" value={form?.email ?? ''} />
			{#if form?.error === 'missing'}
				<p style="color: red;">メールアドレスを入力してください。</p>
			{/if}
			{#if form?.error === 'invalid_format'}
				<p style="color: red;">メールアドレスに＠がありません。</p>
			{/if}
		</div>
		<div>
			<button type="submit">ログイン</button>
		</div>
	</form>
{/if}
