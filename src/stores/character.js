import { useToast } from 'vue-toastification';

export const useCharacterStore = defineStore('character', () => {
  const toast = useToast();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const id = user.value?.id;

  const character = ref(null);

  function setCharacter(data) {
    character.value = data;
  }

  async function getCharacter() {
    const { data: char, error } = await useAsyncData(
      'character',
      async () =>
        supabase.from('characters').select('*').eq('userId', id).maybeSingle(),
      { transform: (result) => result.data }
    );

    if (error.value) {
      console.log('QuestsCharacterError:', error.value);
      toast.error(error?.value?.message ? error.value.message : error.value);
    }

    character.value = char.value;
    return character.value;
  }

  async function claimReward() {
    const { data: char, error } = await useAsyncData(
      'updateCharacter',
      async () =>
        supabase
          .from('characters')
          .update({ reg_reward: 'true' })
          .eq('userId', id)
          .select(),
      { transform: (result) => result.data }
    );

    console.log(char.value.reg_value);

    if (char.value) {
      character.value.reg_reward = true;
    }

    console.log('charClaim', char.value);
    console.log('charClaimError', error.value);
  }

  return {
    character,
    setCharacter,
    getCharacter,
    claimReward,
  };
});
