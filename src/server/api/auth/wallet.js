// import jwt from 'jsonwebtoken';
import { SiweMessage } from 'siwe';
import { serverSupabaseServiceRole } from '#supabase/server';

export default eventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const { message, signature } = await readBody(event);

  const sole = 'Web3Connect';
  let user = null;
  // let error = null;

  try {
    const { success, data: result } = await new SiweMessage(message).verify({
      signature,
      domain: new URL(process.env.AUTH_ORIGIN).host,
    });

    if (!success) {
      console.log('Invalid signature');
      throw new Error('Invalid signature');
    }

    const email = `${result.address}@web3.wallet`;
    const password =
      result.address.slice(-6) + sole + result.address.slice(-10, -6);

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('walletAddress', result.address)
      .single();

    console.log('userSelect', data);
    console.log('userError', error);
    user = data;

    if (!user) {
      // const createUserRes = await supabase
      //   .from('profiles')
      //   .insert({
      //     wallet: result.address,
      //     metadata: result,
      //   })
      //   .select();

      // Create user
      const {
        data: { user: createUser },
        error: createError,
      } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { walletAddress: result.address },
        app_metadata: { provider: 'web3' },
        email_confirm: true,
      });

      if (createError) {
        throw createError;
      }

      // const { data, error } = await supabase
      // .from('profiles')
      // .select('*')
      // .eq('walletAddress', result.address)
      // .single();

      user = createUser;

      console.log('createUser', createUser);
      console.log('createUserError', createError);

      if (createError) {
        throw createError;
      }
    }

    // const token = jwt.sign(
    //   {
    //     ...user,
    //     aud: 'authenticated',
    //     role: 'authenticated',
    //     exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    //   },
    //   process.env.SUPABASE_JWT
    // );

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
