import CustomModal from '@/components/CustomModal';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('Error');
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { changePassword, signIn, user } = useAuth();

  const handleChangePassword = async () => {
    if (newPassword !== repeatPassword) {
        setErrorTitle('Password Mismatch');
        setErrorMessage("New passwords do not match.");
        setModalOpen(true);
        return;
    }

    if (!oldPassword || !newPassword) {
        setErrorTitle('Input Error');
        setErrorMessage("Please fill in all the fields");
        setModalOpen(true);
        return;
    }
    if (newPassword.length < 6){
      setErrorTitle("Invalid Length");
      setErrorMessage("Password must havr atleast 6 characters");
      setModalOpen(true);
      return;
    }

    // Verify old password by re-authenticating
    if (!user?.email) {
        setErrorTitle('Error');
        setErrorMessage("User email not found. Please re-login.");
        setModalOpen(true);
        return;
    }
    const verify = await signIn(user.email, oldPassword);
    if (!verify.success) {
        setErrorTitle('Authentication Failed');
        setErrorMessage("Current password is incorrect.");
        setModalOpen(true);
        return;
    }

    // Change password
    const result = await changePassword(newPassword);
    if (result.success) {
        setErrorTitle('Success');
        setErrorMessage("Password changed successfully.");
        router.push("/(tabs)")
    } else {
        setErrorTitle('Error');
        setErrorMessage(result.error || "Failed to change password.");
    }
    setModalOpen(true);
  };

  return (
    <View className="flex-1 bg-background px-6 py-10">
        <CustomModal title={errorTitle} text={errorMessage} visible={modalOpen} onPress={()=>setModalOpen(false)}/>
      {/* Header */}
      <View className="flex-row items-center mb-8 mt-5">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={28} color="#F07900" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-semibold">Change Password</Text>
      </View>

      {/* Form */}
      <TextInput
        placeholder="Old Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        className="border border-[#444] bg-[#1a1a1a] text-white p-[15px] rounded-[10px] text-[16px] mb-4"
      />
      <TextInput
        placeholder="New Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        className="border border-[#444] bg-[#1a1a1a] text-white p-[15px] rounded-[10px] text-[16px] mb-4"
      />
      <TextInput
        placeholder="Repeat New Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        className="border border-[#444] bg-[#1a1a1a] text-white p-[15px] rounded-[10px] text-[16px] mb-6"
      />

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-[#F07900] rounded-xl py-4 items-center"
        onPress={handleChangePassword}
      >
        <Text className="text-white font-semibold text-base">Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}
