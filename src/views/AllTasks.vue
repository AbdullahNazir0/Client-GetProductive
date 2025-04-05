<script setup>
  import { ref, onMounted } from "vue"
  import { ProgressBar, DataTable, Column, Tag } from "primevue"
  import { useToast } from "vue-toast-notification"
  import api from "../utils/axios"

  const tasks = ref([])

  const isLoading = ref(false)
  const toast = useToast()

  onMounted(() => {
      fetchAllTasks()
  })

  async function fetchAllTasks() {
      if (isLoading.value) return

      isLoading.value = true
      try {
          const response = await api.get("/tasks/all", { withCredentials: true })
          console.log(response)
          tasks.value = response.data.data
      } catch (error) {
          toast.error("Failed to fetch all tasks")
      } finally {
          isLoading.value = false
      }
  }
</script>

<template>
    <div class="fixed top-0 left-0 w-full">
        <ProgressBar
            v-if="isLoading"
            mode="indeterminate"
            style="height: 6px"
        />
    </div>
    <div class="h-[15vh] flex justify-between items-center px-10">
        <h1 class="text-4xl font-bold text-primary">All Tasks</h1>
    </div>
    <div class="h-[80vh] overflow-y-auto scrollbar-hidden p-4 space-y-6">
        <div v-for="(group, index) in tasks" :key="group._id" class="space-y-2">
            <h4 class="text-xl font-semibold text-gray-600">{{ group._id }}</h4>
            <DataTable
                :value="group.tasks"
                :loading="isLoading"
                tableStyle="min-width: 50rem height: auto max-height: 70vh"
            >
                <Column header="Title" field="title" style="width: 20%">
                    <template #body="{ data }">
                        <span
                            :class="{
                                'line-through text-gray-500': data.isDone,
                            }"
                        >
                            {{ data.title }}
                        </span>
                    </template>
                </Column>
                <Column header="Description" field="description" style="width: 35%">
                    <template #body="{ data }">
                        <span
                            :class="{
                                'line-through text-gray-500': data.isDone,
                            }"
                        >
                            {{ data.description }}
                        </span>
                    </template>
                </Column>
                <Column header="Created At" field="createdAt">
                    <template #body="{ data }">
                        <span
                            :class="{
                                'line-through text-gray-500': data.isDone,
                            }"
                        >
                            {{
                                data.deadline
                                    ? new Date(
                                          data.createdAt,
                                      ).toLocaleDateString("en-GB")
                                    : "N/A"
                            }}
                        </span>
                    </template>
                </Column>
                <Column header="Deadline" field="deadline">
                    <template #body="{ data }">
                        <span
                            :class="{
                                'line-through text-gray-500': data.isDone,
                            }"
                        >
                            {{
                                data.deadline
                                    ? new Date(
                                          data.deadline,
                                      ).toLocaleDateString("en-GB")
                                    : "N/A"
                            }}
                        </span>
                    </template>
                </Column>
                <Column header="Priority" field="priority">
                    <template #body="{ data }">
                        <Tag
                            :value="
                                data.priority === 0
                                    ? 'Low'
                                    : data.priority === 1
                                      ? 'Medium'
                                      : 'High'
                            "
                            :severity="
                                data.priority === 0
                                    ? 'success'
                                    : data.priority === 1
                                      ? 'warning'
                                      : 'danger'
                            "
                            :class="{
                                'line-through text-gray-500': data.isDone,
                            }"
                        />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<style scoped>
    .scrollbar-hidden::-webkit-scrollbar {
    display: none;
    }

    .scrollbar-hidden {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    }
</style>
