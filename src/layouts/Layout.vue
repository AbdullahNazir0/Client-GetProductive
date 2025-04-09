<script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { Dialog, Button, PanelMenu } from "primevue"
  import { useToast } from 'vue-toast-notification'
  import api from '../utils/axios.js'

  const showDialog = ref(false)
  const isLoading = ref(false)
  const router = useRouter()
  const toast = useToast()

  const toggleDialog = () => {
    showDialog.value = !showDialog.value
  }

  const menuItems = ref([
    { label: "Home", command: () => router.push('/home') },
    { label: "All Tasks", command: () => router.push('/all-tasks') },
    { label: "Settings", command: () => router.push("/settings") },
    { label: "Profile", command: () => router.push("/profile") },
    { label: 'Logout', command: toggleDialog }
  ])

  const logout = async () => {
    if (isLoading.value) return

    isLoading.value = true
    try {
      await api.post('/users/logout')
      toast.success('Logged out successfully')
      router.push('/auth/login')
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message ?? 'Logout failed')
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="flex h-screen">
    <Dialog v-model:visible="showDialog" header="Confirm Logout" :modal="true">
        <p>Are you sure you want to log out?</p>
        <div class="flex justify-end gap-2 mt-4">
          <Button label="Cancel" severity="secondary" @click="toggleDialog" />
          <Button :loading="isLoading" label="Logout" severity="primary" icon="pi pi-check" @click="logout" />
        </div>
    </Dialog>

    <aside class="w-64 bg-gray-700 text-white p-4">
      <h2 class="text-lg font-bold text-center mb-4 py-10">Get Productive</h2>
      <PanelMenu :model="menuItems" class="w-full" />
    </aside>

    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>
