const supabaseUrl = 'https://escflpzgeayghspqdkcr.supabase.co'
const supabaseKey = 'sb_publishable_X3l_oYzwfdLDEfOVXIwB2w_wcYfCBn2'
const client = supabase.createClient( supabaseUrl,supabaseKey )
console.log(client);
