import { supabase } from '@/utils/supabaseClient';

export async function sendFriendRequest(addresseeId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const { error } = await supabase.from('friend_requests').insert({
    requester_id: user.id,
    addressee_id: addresseeId
  });
  if (error?.code === '23505') throw new Error('Already requested or already friends');
  if (error) throw error;
}

export async function respondToRequest(requestId: number, action: 'accepted' | 'declined') {
  const { error } = await supabase
    .from('friend_requests')
    .update({ status: action, responded_at: new Date().toISOString() })
    .eq('id', requestId);
  if (error) throw error;
}

export async function cancelOutgoingRequest(requestId: number) {
  const { error } = await supabase.from('friend_requests').delete().eq('id', requestId);
  if (error) throw error;
}

export async function removeFriend(friendId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const { error } = await supabase
  .from('friend_requests')
  .delete()
  .or(`and(requester_id.eq.${user.id},addressee_id.eq.${friendId}),and(requester_id.eq.${friendId},addressee_id.eq.${user.id})`).eq('status', 'accepted');
  if (error) throw error;

  console.log(`Friend ${friendId} removed for user ${user.id}`);
}

export async function getMyFriends() {
  const { data, error } = await supabase.rpc('get_my_friends');
  if (error) throw error;
  return data || [];
}

export async function getPendingIncoming() {
  const { data, error } = await supabase
    .from('friend_requests')
    .select(`
      *,
      requester:requester_id(id, name, profile_url)
    `)
    .eq('addressee_id', (await supabase.auth.getUser()).data.user?.id)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPendingOutgoing() {
  const { data, error } = await supabase
    .from('friend_requests')
    .select(`
      *,
      addressee:addressee_id(id, name, profile_url)
    `)
    .eq('requester_id', (await supabase.auth.getUser()).data.user?.id)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function searchUsersByName(q: string) {
  if (!q.trim()) return [];
  const { data, error } = await supabase.rpc('search_users', { q: q.trim() });
  if (error) throw error;
  return data || [];
}

/** Determine relationship for a given other user (to show Add/Requested/Friends) */
export async function getRelationship(otherUserId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { state: 'none' as const };

  const { data, error } = await supabase
    .from('friend_requests')
    .select('*')
    .or(`and(requester_id.eq.${user.id},addressee_id.eq.${otherUserId}),and(addressee_id.eq.${user.id},requester_id.eq.${otherUserId})`)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) throw error;
  if (!data || data.length === 0) return { state: 'none' as const };

  const fr = data[0];
  if (fr.status === 'accepted') return { state: 'friends' as const };
  if (fr.status === 'pending' && fr.requester_id === user.id) return { state: 'outgoing' as const, requestId: fr.id };
  if (fr.status === 'pending' && fr.addressee_id === user.id) return { state: 'incoming' as const, requestId: fr.id };
  return { state: 'none' as const };
}
