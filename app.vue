<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <!-- <renderless-password
      v-slot="{ matching }"
      :password="password"
      :confirmation="confirm"
    >
      <div class="wrapper">
        <div class="field">
          <label for="password">Password</label>
          <input v-model="password" id="password" />
        </div>
        <div class="field">
          <label for="confirmation">Confirmation</label>
          <input v-model="confirm" id="confirmation" />
        </div>

        <p>Matches: {{ matching }}</p>
      </div>
    </renderless-password> -->
    <!-- <tab-container v-model="activeTabId" v-slot="{ updateTabId }">
      <tab tabId="1" v-for="tab in 6">Tab 1</tab>
      <tab tabId="2">Tab 2</tab>
      <button @click="updateTabId">Update me</button>
    </tab-container> -->
    <!-- <TabGroup v-slot="{passed}">
      {{ passed }}
      <div>Another thing here now</div>
    </TabGroup> -->
   <div class="otp">
    <Otp class="red" :inputNumber="3" v-model="password" />
   </div>
   <button :disabled="password.includes('')">Click me</button>
   {{ password }}
  </div>
</template>

<script setup>
import { TabGroup } from './components/Tabs'
import { Otp } from './components/otp'
const password = ref([]);
const confirm = ref("");
const activeTabId = ref("400");
</script>

<style>
.otp {
  display: flex;
  gap: 10px;
}
.red {
  height: 60px;
  width: 60px; 
  font-size: 20px;
  text-align: center;
}

.red:focus {
  background-color: red
}


</style>
