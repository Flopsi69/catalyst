import { SiweMessage } from 'siwe';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const { message, signature } = await readBody(event);

  const sole = 'Web3Connect';
  let address,
    email,
    password,
    userData = null;
  // const address = message.address;
  // const email = `${address}@web3.wallet`;

  try {
    console.log(process.env.AUTH_ORIGIN);
    const { success, data, error } = await new SiweMessage(message).verify({
      signature,
    });

    address = data.address;
    email = `${address}@web3.wallet`;
    password = address.slice(-6) + sole + address.slice(-10, -6);

    if (!success) {
      return {
        error: error.message,
      };
    }
  } catch ({ error }) {
    console.log(error);
    return {
      error: 'Invalid signature',
    };
  }

  try {
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('walletAddress', address)
      .maybeSingle();

    console.log('userSelect', user);
    console.log('userSelectError', error);
    userData = user;

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

      userData = user;
      console.log('createUser', user);
      console.log('createUserError', error);

      if (error) {
        return {
          error: error.message,
        };
      }
    }

    userData.token = password;

    return userData;
  } catch (error) {
    console.log('errorMessage', error, error.message);
    throw createError({
      statusCode: error.status,
      statusMessage: error.message,
    });
  }
});
