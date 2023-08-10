import {
  serverSupabaseServiceRole,
  serverSupabaseUser,
} from '#supabase/server';

export default eventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = serverSupabaseServiceRole(event);
  const { id } = await serverSupabaseUser(event);

  console.log('id', id, 'method', method);
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
    console.log('CharError', error);

    // throw createError({
    //   statusMessage: 'Character added',
    //   status: 400,
    // });

    return character;
  }
});
