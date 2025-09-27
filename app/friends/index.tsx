import {
  cancelOutgoingRequest,
  getMyFriends,
  getPendingIncoming,
  getPendingOutgoing,
  getRelationship,
  removeFriend,
  respondToRequest,
  searchUsersByName,
  sendFriendRequest
} from '@/services/friendsService';
import { useRouter } from 'expo-router';
import { Check, ChevronLeft, Clock, UserCheck, UserPlus, X } from 'lucide-react-native';
import * as React from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

function SearchResultItem({ item, router }: { item: any; router: any }) {
  const [relationship, setRelationship] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadRelationship();
  }, []);

  const loadRelationship = async () => {
    try {
      const rel = await getRelationship(item.id);
      setRelationship(rel);
    } catch (error) {
      console.error('Error loading relationship:', error);
    }
  };

  const handleAddFriend = async () => {
    setLoading(true);
    try {
      await sendFriendRequest(item.id);
      Alert.alert('Success', 'Friend request sent!');
      loadRelationship(); // Refresh relationship
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send friend request');
    } finally {
      setLoading(false);
    }
  };

  const getButtonContent = () => {
    if (loading) return <ActivityIndicator size="small" color="#F07900" />;
    
    if (!relationship) return null;
    
    switch (relationship.state) {
      case 'friends':
        return (
          <View className="flex-row items-center gap-1">
            <UserCheck size={16} color="#4CAF50" />
            <Text className="text-green-400 text-sm">Friends</Text>
          </View>
        );
      case 'outgoing':
        return (
          <View className="flex-row items-center gap-1">
            <Clock size={16} color="#F07900" />
            <Text className="text-orange-400 text-sm">Requested</Text>
          </View>
        );
      case 'incoming':
        return (
          <View className="flex-row items-center gap-1">
            <UserCheck size={16} color="#4CAF50" />
            <Text className="text-green-400 text-sm">Wants to be friends</Text>
          </View>
        );
      default:
        return (
          <TouchableOpacity
            onPress={handleAddFriend}
            className="bg-[#F07900] px-3 py-1 rounded-full flex-row items-center gap-1"
          >
            <UserPlus size={16} color="white" />
            <Text className="text-white text-sm">Add</Text>
          </TouchableOpacity>
        );
    }
  };

  return (
    <TouchableOpacity
      className="bg-[#1a1a1a] p-4 rounded-xl flex-row justify-between items-center mb-3"
      onPress={() =>
        router.push({ pathname: "/(tabs)/profile", params: { userId: item.id } })
      }>
      <View className="flex-row items-center space-x-3 gap-2 flex-1">
        <Image 
          source={{ uri: item.profile_url || 'https://avatar.iran.liara.run/public/1' }} 
          style={{ width: 60, height: 60, borderRadius: 16 }} 
        />
        <View className="flex-1">
          <Text className="text-white font-semibold">{item.name}</Text>
          <Text className='text-red font-semibold'></Text>
          <Text className="text-gray-400">@{item.name.toLowerCase().replace(/\s+/g, '')}</Text>
        </View>
      </View>
      {getButtonContent()}
    </TouchableOpacity>
  );
}

function FriendsRoute({ router }: { router: any }) {
  const [query, setQuery] = React.useState('');
  const [friends, setFriends] = React.useState<any[]>([]);
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchLoading, setSearchLoading] = React.useState(false);

  // Load friends on mount
  React.useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    setLoading(true);
    try {
      const data = await getMyFriends();
      setFriends(data);
    } catch (error) {
      console.error('Error loading friends:', error);
      Alert.alert('Error', 'Failed to load friends');
    } finally {
      setLoading(false);
    }
  };

  const handleFriendRemoved = (removedFriendId: string) => {
    setFriends(currentFriends =>
      currentFriends.filter(friend => friend.id !== removedFriendId)
    );
  };

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    
    setSearchLoading(true);
    try {
      const results = await searchUsersByName(text);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
      Alert.alert('Error', 'Failed to search users');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddFriend = async (userId: string) => {
    try {
      await sendFriendRequest(userId);
      Alert.alert('Success', 'Friend request sent!');
      // Refresh search results to update button state
      if (query.trim()) {
        handleSearch(query);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send friend request');
    }
  };

  const renderUserItem = ({ item }: { item: any }) => (
    <FriendItem 
      item={item} 
      router={router} 
      onFriendRemoved={handleFriendRemoved} 
    />
  );

  const renderSearchResult = ({ item }: { item: any }) => {
    return (
      <SearchResultItem item={item} router={router} />
    );
  };

  return (
    <View className="flex-1 bg-black px-4 pt-4">
      {/* Search Input */}
      <TextInput
        placeholder="Find friends..."
        placeholderTextColor="#999"
        className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl mb-4"
        value={query}
        onChangeText={handleSearch}
      />

      {/* Content */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#F07900" />
          <Text className="text-gray-400 mt-2">Loading friends...</Text>
        </View>
      ) : query.trim() ? (
        // Search Results
        <View className="flex-1">
          {searchLoading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#F07900" />
              <Text className="text-gray-400 mt-2">Searching...</Text>
            </View>
          ) : searchResults.length > 0 ? (
      <FlatList
              data={searchResults}
        keyExtractor={(item) => item.id}
              renderItem={renderSearchResult}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-400">No users found</Text>
            </View>
          )}
              </View>
      ) : (
        // Friends List
        <View className="flex-1">
          {friends.length > 0 ? (
            <FlatList
              data={friends}
              keyExtractor={(item) => item.id}
              renderItem={renderUserItem}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-400">No friends yet</Text>
              <Text className="text-gray-500 text-sm mt-2">Search for users to add them as friends</Text>
            </View>
          )}
        </View>
        )}
    </View>
  );
}

function FriendItem({ item, router, onFriendRemoved }: { item: any; router: any; onFriendRemoved: (id: string) => void }) {
  const handleRemoveFriend = () => {
    Alert.alert(
      "Remove Friend",
      `Are you sure you want to remove ${item.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await removeFriend(item.id);
              onFriendRemoved(item.id);
              Alert.alert("Success", `${item.name} has been removed from your friends.`);
            } catch (error) {
              Alert.alert("Error", "Failed to remove friend. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      className="bg-[#1a1a1a] p-4 rounded-xl flex-row justify-between items-center mb-3"
      onPress={() =>
        router.push({ pathname: "/(tabs)/profile", params: { userId: item.id } })
      }>
      <View className="flex-row items-center space-x-3 gap-2 flex-1">
        <Image 
          source={{ uri: item.profile_url || 'https://avatar.iran.liara.run/public/1' }} 
          style={{ width: 60, height: 60, borderRadius: 16 }} 
        />
        <View className="flex-1">
          <Text className="text-white font-semibold">{item.name}</Text>
          <Text className="text-gray-400">@{item.name.toLowerCase().replace(/\s+/g, '')}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleRemoveFriend} className="p-2">
        <X size={24} color="#E53E3E" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function PendingRoute() {
  const [incoming, setIncoming] = React.useState<any[]>([]);
  const [outgoing, setOutgoing] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    setLoading(true);
    try {
      const [incomingData, outgoingData] = await Promise.all([
        getPendingIncoming(),
        getPendingOutgoing()
      ]);
      setIncoming(incomingData);
      setOutgoing(outgoingData);
    } catch (error) {
      console.error('Error loading pending requests:', error);
      Alert.alert('Error', 'Failed to load pending requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: number) => {
    try {
      await respondToRequest(requestId, 'accepted');
      Alert.alert('Success', 'Friend request accepted!');
      loadPendingRequests();
    } catch (error) {
      Alert.alert('Error', 'Failed to accept friend request');
    }
  };

  const handleDecline = async (requestId: number) => {
    try {
      await respondToRequest(requestId, 'declined');
      Alert.alert('Success', 'Friend request declined');
      loadPendingRequests();
    } catch (error) {
      Alert.alert('Error', 'Failed to decline friend request');
    }
  };

  const handleCancel = async (requestId: number) => {
    try {
      await cancelOutgoingRequest(requestId);
      Alert.alert('Success', 'Friend request cancelled');
      loadPendingRequests();
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel friend request');
    }
  };

  const renderIncomingRequest = ({ item }: { item: any }) => (
    <View className="bg-[#1a1a1a] p-4 rounded-xl mb-3">
      <View className="flex-row items-center gap-3 mb-3">
        <Image 
          source={{ uri: item.requester?.profile_url || 'https://avatar.iran.liara.run/public/1' }} 
          style={{ width: 50, height: 50, borderRadius: 12 }} 
        />
        <View className="flex-1">
          <Text className="text-white font-semibold">{item.requester?.name || 'Unknown User'}</Text>
          <Text className="text-gray-400 text-sm">Wants to be your friend</Text>
        </View>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => handleAccept(item.id)}
          className="bg-green-600 px-4 py-2 rounded-lg flex-row items-center gap-2 flex-1 justify-center"
        >
          <Check size={16} color="white" />
          <Text className="text-white font-semibold">Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDecline(item.id)}
          className="bg-red-600 px-4 py-2 rounded-lg flex-row items-center gap-2 flex-1 justify-center"
        >
          <X size={16} color="white" />
          <Text className="text-white font-semibold">Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOutgoingRequest = ({ item }: { item: any }) => (
    <View className="bg-[#1a1a1a] p-4 rounded-xl mb-3">
      <View className="flex-row items-center gap-3 mb-3">
        <Image 
          source={{ uri: item.addressee?.profile_url || 'https://avatar.iran.liara.run/public/1' }} 
          style={{ width: 50, height: 50, borderRadius: 12 }} 
        />
        <View className="flex-1">
          <Text className="text-white font-semibold">{item.addressee?.name || 'Unknown User'}</Text>
          <Text className="text-gray-400 text-sm">Request sent</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleCancel(item.id)}
        className="bg-gray-600 px-4 py-2 rounded-lg flex-row items-center gap-2 justify-center"
      >
        <X size={16} color="white" />
        <Text className="text-white font-semibold">Cancel Request</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#F07900" />
        <Text className="text-gray-400 mt-2">Loading requests...</Text>
      </View>
    );
  }

  const hasRequests = incoming.length > 0 || outgoing.length > 0;

  return (
    <View className="flex-1 bg-black px-4 pt-4">
      {!hasRequests ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">No pending requests</Text>
        </View>
      ) : (
        <View className="flex-1">
          {incoming.length > 0 && (
            <View className="mb-6">
              <Text className="text-white text-lg font-semibold mb-3">Incoming Requests</Text>
              <FlatList
                data={incoming}
                keyExtractor={(item) => `incoming-${item.id}`}
                renderItem={renderIncomingRequest}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
          
          {outgoing.length > 0 && (
            <View>
              <Text className="text-white text-lg font-semibold mb-3">Outgoing Requests</Text>
              <FlatList
                data={outgoing}
                keyExtractor={(item) => `outgoing-${item.id}`}
                renderItem={renderOutgoingRequest}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default function Friends() {
  const router = useRouter();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'friends', title: 'Friends' },
    { key: 'pending', title: 'Pending Requests' },
  ]);

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case 'friends':
        return <FriendsRoute router={router} />;
      case 'pending':
        return <PendingRoute />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-black pt-12">
      {/* Header */}
      <View className="flex-row items-center mb-2 mt-5 px-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="#F07900" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-2">Friends</Text>
      </View>

      {/* TabView */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: 'black' }}
            indicatorStyle={{ backgroundColor: '#F07900' }}
            activeColor="#F07900"
            inactiveColor="#999"
          />
        )}
      />
    </View>
  );
}