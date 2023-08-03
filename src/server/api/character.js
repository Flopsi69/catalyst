import {
  serverSupabaseServiceRole,
  serverSupabaseUser,
  serverSupabaseClient,
} from '#supabase/server';

export default eventHandler(async (event) => {
  const cookies = parseCookies(event);
  const method = getMethod(event);
  console.log('cookies3', cookies['sb-refresh-token']);
  const supabase = await serverSupabaseClient(event);

  supabase.auth.setSession(
    {
      refresh_token: cookies['sb-refresh-token'],
      access_token: cookies['sb-access-token'],
    },
    {
      auth: { persistSession: false },
    }
  );

  const user = await serverSupabaseUser(event);
  console.log('method', method, user, user.id);
  const id = user?.id;
  if (!id) {
    throw createError({
      statusMessage: 'Not logged in',
      status: 400,
    });
  }

  if (method === 'GET') {
    console.log(1);
    const { data: character, error } = await supabase
      .from('characters')
      .select('*')
      .eq('userId', id)
      .limit(1)
      .single();

    console.log('CharSelect', character);
    console.log('CharError', error);
    if (error) {
      throw createError({
        statusMessage: 'Character not found',
        status: 400,
      });
    }
    return character;
  }

  if (method === 'POST') {
    const characterData = await readBody(event);

    console.log('characterData', characterData);

    const { data: character, error } = await supabase
      .from('characters')
      .insert({ ...characterData, userId: id })
      .select()
      .single();

    console.log('CharAdd', character);
    console.log('CharError', character);

    // throw createError({
    //   statusMessage: 'Character added',
    //   status: 400,
    // });

    return character;
  }
});
