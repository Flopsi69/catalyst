import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const res = await readBody(event);
  console.log('res', res);
  const { message, signature } = res;

  const sole = 'Web3Connect';
  const address = message.address;
  const email = `${address}@web3.wallet`;
  const password = address.slice(-6) + sole + address.slice(-10, -6);

  try {
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('walletAddress', address)
      .maybeSingle();

    console.log('userSelect', user);
    console.log('userSelectError', error);

    if (!user) {
      const {
        data: { user },
        error,
      } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { walletAddress: address },
        app_metadata: { provider: 'web3' },
        email_confirm: true,
      });

      console.log('createUser', user);
      console.log('createUserError', error);

      if (error) {
        throw error;
      }

      console.log(1);
    }

    return {
      authData: {
        email,
        password,
      },
      user,
    };
  } catch (error) {
    console.log('errorMessage', error);
    throw createError({
      statusCode: error.status,
      statusMessage: error.message,
    });
  }
});
