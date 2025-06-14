import { IconSymbol } from "@/components/ui/IconSymbol";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SelectMonthModal from "./SelectMonthModal";
import SettingModal from "./SettingModal";

const HomeView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDay, setStartDay] = useState<"monday" | "sunday">("monday");
  const insets = useSafeAreaInsets();
  const [today, setToday] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setToday(new Date(new Date().setHours(0, 0, 0, 0)));
    }, [])
  );

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDay === "monday" ? (firstDay === 0 ? 6 : firstDay - 1) : firstDay;
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString("ko-KR", { month: "long" });
  };

  const getYear = (date: Date) => {
    return date.getFullYear();
  };

  const handleMonthSelect = (year: number, month: number) => {
    setSelectedDate(new Date(year, month - 1));
    setIsMonthModalVisible(false);
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const prevMonthDays = getDaysInMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));

    const days = [];

    // Add previous month days
    for (let i = prevMonthDays - firstDay + 1; i <= prevMonthDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Add next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const isToday = (day: number) => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    return date.getTime() === today.getTime();
  };

  const weekDays =
    startDay === "monday" ? ["월", "화", "수", "목", "금", "토", "일"] : ["일", "월", "화", "수", "목", "금", "토"];

  const getDateColor = (index: number, day: number) => {
    const indexNum = index % 7;
    let color = {};
    if (startDay === "monday") {
      switch (indexNum) {
        case 5:
          color = styles.saturdayText;
          break;
        case 6:
          color = styles.sundayText;
          break;
      }
    } else {
      switch (indexNum) {
        case 0:
          color = styles.sundayText;
          break;
        case 6:
          color = styles.saturdayText;
          break;
      }
    }

    return color;
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.calendarContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.monthYearContainer} onPress={() => setIsMonthModalVisible(true)}>
            <Text style={styles.monthYearText}>
              {getYear(selectedDate)}년 {getMonthName(selectedDate)}
            </Text>
            <IconSymbol
              name="chevron.down"
              size={20}
              color="black"
              style={isMonthModalVisible && { transform: [{ rotate: "180deg" }] }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSettingModalVisible(true)}>
            <IconSymbol name="gearshape" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.calendarHeaderContainer}>
            {weekDays.map((day, index) => (
              <View key={index} style={styles.calendarHeaderBoxContainer}>
                <Text style={[styles.calendarHeaderText, getDateColor(index, 0)]}>{day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.calendarBodyContainer}>
            <View style={styles.calendarDateBoxContainer}>
              {getCalendarDays().map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarBoxContainer,
                    isToday(date.day) && styles.todayContainer,
                    !date.isCurrentMonth && { opacity: 0.5 },
                  ]}
                  onPress={() => {}}
                >
                  <Text style={[styles.calendarBoxText, getDateColor(index, date.day)]}>{date.day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
      <SelectMonthModal
        isVisible={isMonthModalVisible}
        onClose={() => setIsMonthModalVisible(false)}
        onSelect={handleMonthSelect}
        currentYear={selectedDate.getFullYear()}
        currentMonth={selectedDate.getMonth() + 1}
      />
      <SettingModal
        isVisible={isSettingModalVisible}
        onClose={() => setIsSettingModalVisible(false)}
        startDay={startDay}
        onStartDayChange={setStartDay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  calendarContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  monthButton: {
    padding: 8,
  },
  monthButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  monthYearContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingVertical: 8,
  },
  startDayToggle: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  startDayToggleText: {
    fontSize: 14,
    color: "#666",
  },
  todayButton: {
    padding: 8,
    backgroundColor: "#0066cc",
    borderRadius: 8,
  },
  todayButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  calendarHeaderContainer: {
    height: 30,
    flexDirection: "row",
    paddingVertical: 8,
  },
  calendarHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  calendarHeaderBoxContainer: {
    height: 30,
    flex: 1,
    alignItems: "center",
  },
  calendarBodyContainer: {
    flex: 1,
  },
  calendarDateBoxContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "stretch",
  },
  calendarBoxContainer: {
    width: "14.28%",
    aspectRatio: 1,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  calendarBoxText: {
    fontSize: 16,
    textAlign: "center",
  },
  saturdayText: {
    color: "blue",
  },
  sundayText: {
    color: "red",
  },
  todayContainer: {
    backgroundColor: "#e6f3ff",
  },
});

export default HomeView;
