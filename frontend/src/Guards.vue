<script setup>
import { ref } from 'vue';

defineProps({
  csrf: { type: String, default: '' },
  editing: { type: Boolean, default: false },
  listUrl: { type: String, default: '' },
  fields: { type: Object, default: () => ({}) },
  errors: { type: Object, default: () => ({}) },
  rows: { type: Array, default: () => [] },
});

const showPassword = ref(false);

const inputs = [
  { name: 'first_name', label: 'Имя' },
  { name: 'last_name', label: 'Фамилия' },
  { name: 'email', label: 'Электронная почта', type: 'email' },
  { name: 'phone', label: 'Телефон', type: 'tel' },
];
</script>

<template>
  <div class="columns">
    <section class="panel">
      <h2>
        {{ editing ? 'Редактировать карточку' : 'Добавить сотрудника' }}
      </h2>

      <form method="post" autocomplete="off">
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          :value="csrf"
        >

        <div v-if="Object.keys(errors).length" role="alert">
          <p v-for="(messages, field) in errors" :key="field">
            {{ Array.isArray(messages) ? messages.join(' ') : messages }}
          </p>
        </div>

        <p>
          <label for="guard-username">Логин (никнейм)</label>

          <input
            id="guard-username"
            name="username"
            :value="fields.username ?? ''"
            maxlength="150"
            required
            autocomplete="off"
          >
        </p>

        <p>
          <label for="guard-password">
            {{ editing ? 'Новый пароль' : 'Пароль' }}
          </label>

          <input
            id="guard-password"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            :required="!editing"
            autocomplete="new-password"
          >

          <button
            type="button"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Скрыть' : 'Показать' }}
          </button>

          <small>
            {{
              editing
                ? 'Оставьте пустым, чтобы сохранить текущий пароль.'
                : 'Не менее 8 символов.'
            }}
          </small>
        </p>

        <p v-for="field in inputs" :key="field.name">
          <label :for="'guard-' + field.name">
            {{ field.label }}
          </label>

          <input
            :id="'guard-' + field.name"
            :name="field.name"
            :type="field.type || 'text'"
            :value="fields[field.name] ?? ''"
          >
        </p>

        <p>
          <label>
            <input
              type="checkbox"
              name="is_active"
              :checked="fields.is_active ?? true"
            >
            Активен
          </label>
        </p>

        <button type="submit">Сохранить</button>

        <a v-if="editing" :href="listUrl">
          Закрыть
        </a>
      </form>
    </section>

    <section class="panel">
      <h2>
        Сотрудники
        <span class="chip">{{ rows.length }}</span>
      </h2>

      <div
        v-for="row in rows"
        :key="row.id"
        class="row"
      >
        <div>
          <strong>{{ row.name }}</strong>

          <small>
            {{ row.username }}
            {{ row.active ? '' : ' · Неактивен' }}
          </small>
        </div>

        <a :href="row.editUrl">Изменить</a>
      </div>

      <p v-if="!rows.length">
        Справочник пуст.
      </p>
    </section>
  </div>
</template>