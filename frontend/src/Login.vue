<script setup>
import { ref } from "vue";

defineProps({
  csrf: { type: String, required: true },
  next: { type: String, default: "" },
  errors: { type: Array, default: () => [] },
  username: { type: String, default: "" },
});

const showPassword = ref(false);
</script>

<template>
  <section class="auth" aria-labelledby="auth-title">
    <div class="auth-brand"><span aria-hidden="true">ГО</span>График охраны</div>
    <header class="auth-header">
      <h1 id="auth-title">Авторизация</h1>
      <p>Вход для диспетчеров и охранников</p>
    </header>
    <ul v-if="errors.length" class="auth-errors" role="alert">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <form method="post" class="auth-form">
      <input type="hidden" name="csrfmiddlewaretoken" :value="csrf">
      <input v-if="next" type="hidden" name="next" :value="next">
      <div class="auth-field">
        <label for="auth-username">Логин</label>
        <input id="auth-username" name="username" autocomplete="username" :value="username" required>
      </div>
      <div class="auth-field">
        <label for="auth-password">Пароль</label>
        <div class="auth-password">
          <input id="auth-password" name="password" :type="showPassword ? 'text' : 'password'"
                 autocomplete="current-password" required>
          <button type="button" aria-controls="auth-password" @click="showPassword = !showPassword">
            {{ showPassword ? "Скрыть" : "Показать" }}
          </button>
        </div>
      </div>
      <button type="submit" class="auth-submit">Войти</button>
    </form>
  </section>
</template>

<style scoped>
.auth {
  width: min(29rem, calc(100vw - 2rem));
  padding: clamp(1.25rem, 5vw, 2.5rem);
  border: 1px solid #d5e5df;
  border-top: 4px solid #19745f;
  border-radius: 1.5rem;
  background: #fff;
  color: #122d29;
  box-shadow: 0 20px 55px rgb(16 64 51 / 10%);
}
.auth-brand { display: flex; align-items: center; gap: .75rem; font-weight: 750; }
.auth-brand span {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border-radius: .875rem;
  background: #e0f2eb;
  color: #0d5b49;
}
.auth-header { margin: 1.75rem 0 1.5rem; }
.auth-header h1 { margin: 0 0 .5rem; font-size: clamp(1.65rem, 5vw, 2.4rem); line-height: 1.1; letter-spacing: -.04em; }
.auth-header p { margin: 0; color: #526760; }
.auth-form, .auth-field { display: grid; gap: .5rem; }
.auth-form { gap: 1rem; }
.auth-field label { font-size: .875rem; font-weight: 700; }
.auth-field input {
  width: 100%;
  min-height: 3rem;
  padding: .7rem .85rem;
  border: 1px solid #bdcfc7;
  border-radius: .75rem;
  background: #f7faf8;
}
.auth-password { position: relative; }
.auth-password input { padding-inline-end: 6rem; }
.auth-password button {
  position: absolute;
  inset-block: .3rem;
  inset-inline-end: .35rem;
  border: 0;
  background: transparent;
  color: #0d644f;
}
.auth-submit { min-height: 3rem; margin-top: .35rem; border-radius: .75rem; background: #115e50; color: #fff; }
.auth-submit:hover { background: #0a493e; }
.auth :is(input, button):focus-visible { outline: 2px solid #19816a; outline-offset: 2px; }
.auth-errors { margin: 0 0 1rem; padding: .75rem 1rem .75rem 2rem; border-radius: .75rem; background: #fff1ef; color: #8e2924; }
</style>
