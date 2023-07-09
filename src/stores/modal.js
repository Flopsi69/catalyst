export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const name = ref(null);

  const open = (modal) => {
    isOpen.value = true;
    name.value = modal;
  };

  const close = () => {
    isOpen.value = false;
    name.value = null;
  };

  return {
    isOpen,
    open,
    close,
    name,
  };
});
