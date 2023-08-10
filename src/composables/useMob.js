export function useMob(width) {
  let isMob = ref(false);

  function update() {
    console.log(window.innerWidth);
    isMob.value = window.innerWidth < width;
  }

  onMounted(() => {
    update();
    window.addEventListener('resize', update);
  });

  onUnmounted(() => window.removeEventListener('resize', update));

  return isMob;
}
