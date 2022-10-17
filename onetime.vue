<template>
  <div>
    <section
      class="flex flex-col relative items-center text-dark justify-center w-full h-full mx-auto overflow-x-hidden"
    >
      <form class="w-[384px] px-2">
        <p class="text-[28px] font-medium mb-[18px]">Verify Account</p>
        <p class="text-[14px] font-medium text-dark mb-[37px]">
          Please input the OTP sent to your email
        </p>
        <div class="w-full">
          <div class="grid grid-cols-6 gap-2 mb-[46px]">
            <input
              v-for="(item, index) in otp"
              ref="inputRefs"
              :key="index"
              type="text"
              class="rounded-md text-center text-dark w-[50px] h-12 flex items-center justify-center text-lg font-semibold focus:outline-primary outline-none transition-all duration-200 ease-in border border-black/[0.12]"
              :class="{
                'bg-primary_light border-primary': otp[index] !== '',
              }"
              :value="otp[index]"
              @keyup="handleChange($event, index)"
            />
          </div>
          <!-- submit button -->
          <CustomButton
            label="Verify OTP"
            theme="submit"
            class="mb-1.5 font-semibold"
            @click="$router.push('/auth/signin')"
          />
          <div class="text-[13px] font-medium text-primary text-center">
            <NuxtLink to="/auth/signin"> Return to Login </NuxtLink>
          </div>
        </div>
      </form>
      <div class="text-[13px] absolute bottom-10 font-medium text-dark">
        <span>Didn’t receive an OTP via email? </span
        ><span class="text-primary cursor-pointer underline-offset-1 underline">
          Resend OTP</span
        >
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const otp = ref(new Array(6).fill(""));
const inputRefs = ref([]);
onMounted(() => inputRefs.value[0].focus());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleChange = (e, index: number) => {
  const newOTP = [...otp.value];
  newOTP[index] = e.target.value.substring(e.target.value.length - 1);
  otp.value = newOTP;
  if (
    (!inputRefs.value[index]?.value || inputRefs.value[index]?.value) &&
    inputRefs.value[index + 1] &&
    e.key === "ArrowRight"
  ) {
    inputRefs.value[index + 1].focus();
  }
  if (inputRefs.value[index]?.value && inputRefs.value[index + 1]) {
    inputRefs.value[index + 1].focus();
  }
  if (
    (!inputRefs.value[index]?.value || inputRefs.value[index]?.value) &&
    inputRefs.value[index - 1] &&
    e.key === "ArrowLeft"
  ) {
    inputRefs.value[index - 1].focus();
  }
  if (
    !inputRefs.value[index]?.value &&
    inputRefs.value[index - 1] &&
    e.key === "Backspace"
  ) {
    inputRefs.value[index - 1].focus();
  }
};
</script>

<style scoped></style>
