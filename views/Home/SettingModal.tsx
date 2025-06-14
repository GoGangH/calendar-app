import { IconSymbol } from "@/components/ui/IconSymbol";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SettingModalProps {
  isVisible: boolean;
  onClose: () => void;
  startDay: "monday" | "sunday";
  onStartDayChange: (startDay: "monday" | "sunday") => void;
}

const SettingModal = ({ isVisible, onClose, startDay, onStartDayChange }: SettingModalProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropOpacity={0.5}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <IconSymbol name="chevron.left" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>캘린더 설정</Text>
          <View></View>
        </View>

        <View style={styles.content}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>시작 요일</Text>
            <View style={styles.toggleContainer}>
              <View style={styles.toggleLabelContainer}>
                <Text style={[styles.toggleLabel, startDay === "monday" && styles.activeToggleLabel]}>월요일</Text>
              </View>
              <TouchableOpacity
                style={[styles.toggleSwitch, startDay === "sunday" && styles.toggleSwitchActive]}
                onPress={() => onStartDayChange(startDay === "monday" ? "sunday" : "monday")}
              >
                <View style={[styles.toggleKnob, startDay === "sunday" && styles.toggleKnobActive]} />
              </TouchableOpacity>
              <Text style={[styles.toggleLabel, startDay === "sunday" && styles.activeToggleLabel]}>일요일</Text>
            </View>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>연인 등록</Text>
            <TextInput style={styles.input} placeholder="000000" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  toggleLabel: {
    fontSize: 14,
    color: "#666",
  },
  activeToggleLabel: {
    color: "#0066cc",
    fontWeight: "bold",
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: "#0066cc",
  },
  toggleKnob: {
    width: 26,
    height: 26,
    backgroundColor: "white",
    borderRadius: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleKnobActive: {
    transform: [{ translateX: 20 }],
  },
  toggleLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 100,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
  },
});

export default SettingModal;
