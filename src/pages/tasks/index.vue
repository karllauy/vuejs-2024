<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import { ref, h } from 'vue';
import type { Tables } from '../../../database/types'
import type { ColumnDef } from '@tanstack/vue-table';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import { RouterLink } from 'vue-router';

const tasks = ref<Tables<'tasks'>[] | null>(null);
// IIFE to fetch data
(async () => {
  const { data, error } = await supabase.from('tasks').select();
  if (error) {
    console.error(error);
  }
  tasks.value = data;
})();

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'), // <div class="text-right">Name</div>
    cell: ({ row }) => {
      return h(RouterLink, { to: `tasks/${row.original.id}`, class: 'text-left font-medium hover:bg-muted block w-full' }, row.getValue('name'));
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'), // <div class="text-right">Name</div>
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'));
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'), // <div class="text-right">Name</div>
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'));
    },
  },
  {
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project'), // <div class="text-right">Name</div>
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('project_id'));
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'), // <div class="text-right">Name</div>
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators')));
    },
  }
]
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
