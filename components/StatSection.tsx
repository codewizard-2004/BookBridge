import { View , Text } from "react-native"
import { Clock , BookOpen , Medal } from "lucide-react-native"
import ProgressBar from "./ProgressBar"

const StatSection = () => {
    return(
        <View className="w-[95%] h-[350px] mt-2 bg-secondary rounded-3xl p-4">
            {/* Stats Section */}
            <View className="flex flex-col gap-4">
              {/* Reading Time */}
              <View className="w-full border-b border-gray-600 pb-3">
                <View className="flex flex-row items-center justify-between mb-2">
                  <View className="flex flex-row items-center gap-3 w-[70%]">
                    <Clock size={20} color="white" />
                    <View>
                      <Text className="text-white font-medium">Reading Time</Text>
                      <Text className="text-xs text-gray-400">180 / 300 min</Text>
                    </View>
                  </View>
                  <Text className="text-sm text-white font-semibold">60%</Text>
                </View>
                <ProgressBar progress={0.6} />
              </View>
        
              {/* Pages Read */}
              <View className="w-full border-b border-gray-600 pb-3">
                <View className="flex flex-row items-center justify-between mb-2">
                  <View className="flex flex-row items-center gap-3 w-[70%]">
                    <BookOpen size={20} color="white" />
                    <View>
                      <Text className="text-white font-medium">Pages Read</Text>
                      <Text className="text-xs text-gray-400">89 / 150 pages</Text>
                    </View>
                  </View>
                  <Text className="text-sm text-white font-semibold">59%</Text>
                </View>
                <ProgressBar progress={0.59} />
              </View>
        
              {/* Books Finished */}
              <View className="w-full pb-3 border-b border-gray-600">
                <View className="flex flex-row items-center justify-between mb-2">
                  <View className="flex flex-row items-center gap-3 w-[70%]">
                    <Medal size={20} color="white" />
                    <View>
                      <Text className="text-white font-medium">Books Finished</Text>
                      <Text className="text-xs text-gray-400">1 / 2 books</Text>
                    </View>
                  </View>
                  <Text className="text-sm text-white font-semibold">50%</Text>
                </View>
                <ProgressBar progress={0.5} />
              </View>
            </View>
        
            {/* Streak Section */}
            <View className="mt-4 items-center">
              <Text className="text-gray-400 text-xs font-semibold mb-2">
                Streak this week
              </Text>
              <View className="flex flex-row justify-between w-full px-2">
                {[
                  { day: "Mon", icon: "🔥" },
                  { day: "Tue", icon: "🔥" },
                  { day: "Wed", icon: "🔥" },
                  { day: "Thu", icon: "🔥" },
                  { day: "Fri", icon: "❄️" },
                  { day: "Sat", icon: "❄️" },
                  { day: "Sun", icon: "🔥" },
                ].map(({ day, icon }) => (
                  <View
                    key={day}
                    className="flex flex-col justify-center items-center gap-1"
                  >
                    <Text className="text-lg">{icon}</Text>
                    <Text className="text-xs text-gray-400">{day}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
    )
}

export default StatSection