<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>(null);
// IIFE to fetch data
(async () => {
  const { data, error } = await supabase.from('projects').select();
  if (error) {
    console.error(error);
  }
  projects.value = data;
})();
</script>

<template>
  <div>
    <h1>Projects page</h1>
    <RouterLink to="/">Go to home</RouterLink>
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>
