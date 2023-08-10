export default defineNuxtRouteMiddleware((to, _from) => {
  // console.log(to, _from);

  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo('/');
  }
});
