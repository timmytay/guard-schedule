<script setup>
defineProps({
  dispatcher: Boolean, guards: Number, shifts: Number, pending: Number,
  absences: Number, currentSchedule: String, upcoming: { type: Array, default: () => [] },
});
</script>

<template>
  <section class="home-hero">
    <div>
      <h2>{{ dispatcher ? "Управление дежурствами" : "Мои дежурства" }}</h2>
      <p>{{ dispatcher ? "Проверьте график и задачи, требующие внимания." : "График работы и уведомления по вашим сменам." }}</p>
    </div>
    <v-btn href="/" color="white" variant="flat">Открыть расписание</v-btn>
  </section>

  <template v-if="dispatcher">
    <section aria-label="Статистика" class="metrics home-metrics">
      <a class="panel metric" href="/directory/guards/"><span>Активные сотрудники</span><strong>{{ guards }}</strong></a>
      <a class="panel metric" :href="currentSchedule"><span>Смены в текущем месяце</span><strong>{{ shifts }}</strong></a>
      <a class="panel metric" href="/reports/?state=review"><span>Отчеты на проверке</span><strong>{{ pending }}</strong></a>
      <a class="panel metric" href="/absences/"><span>Предстоящие отсутствия</span><strong>{{ absences }}</strong></a>
    </section>
  </template>

  <section v-else class="panel">
    <div class="section-head"><h2>Ближайшие смены</h2><a href="/notifications/">Уведомления</a></div>
    <div v-for="item in upcoming" :key="item.id" class="row">
      <strong>{{ item.day }} · 08:00</strong>
      <span>{{ item.site }} · Пост {{ item.number }}</span>
    </div>
    <p v-if="!upcoming.length" class="muted">Предстоящих смен пока нет.</p>
  </section>
</template>
