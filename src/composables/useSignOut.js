// export async function signOut() {
//   if (user.value) {
//     const { error } = await supabase.auth.signOut();

//     if (error) {
//       return useToast().error(error.message)
//     }

//     toast.info("Successfully signed out!");
//   }

//   // return navigateTo('/');
// }

// export function useMob(width) {
//   let isMob = ref(false);

//   function update() {
//     console.log(window.innerWidth);
//     isMob.value = window.innerWidth < width;
//   }

//   onMounted(() => {
//     update();
//     window.addEventListener('resize', update);
//   });

//   onUnmounted(() => window.removeEventListener('resize', update));

//   return isMob;
// }
