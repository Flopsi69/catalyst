export default defineNuxtPlugin((nuxtApp) => {
  const isOpen = ref(false);
  const name = ref(null);

  const show = (modal) => {
    isOpen.value = true;
    document.body.classList.add('overflow-hidden');
    name.value = modal;
  };

  const close = () => {
    isOpen.value = false;
    document.body.classList.remove('overflow-hidden');
    name.value = null;
  };

  return {
    provide: {
      modal: {
        isOpen,
        name,
        show,
        close,
      },
    },
  };
});
