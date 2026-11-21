<script setup>
defineProps({ exportUrl: String, rows: Array });
</script>

<template>
  <div class="toolbar"><v-btn :href="exportUrl" variant="outlined">Экспорт в Excel</v-btn></div>
  <section class="panel">
    <article v-for="row in rows" :key="row.id" class="record">
      <strong>{{ row.event }}</strong><small>{{ row.date }} · {{ row.author }}</small>
      <dl v-if="Object.keys(row.details).length">
        <div v-for="(value, field) in row.details" :key="field"><dt>{{ field }}</dt><dd>{{ value }}</dd></div>
      </dl>
    </article>
    <p v-if="!rows.length">В журнале пока нет записей.</p>
  </section>
</template>
