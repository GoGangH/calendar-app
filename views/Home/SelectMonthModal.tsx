import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface SelectMonthModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (year: number, month: number) => void;
  currentYear: number;
  currentMonth: number;
}

const SelectMonthModal = ({ isVisible, onClose, onSelect, currentYear, currentMonth }: SelectMonthModalProps) => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleConfirm = () => {
    onSelect(selectedYear, selectedMonth);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm}>
            <Text style={styles.confirmButton}>확인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(value) => setSelectedYear(value)}
              style={styles.picker}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={`${year}년`} value={year} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(value) => setSelectedMonth(value)}
              style={styles.picker}
            >
              {months.map((month) => (
                <Picker.Item key={month} label={`${month}월`} value={month} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  cancelButton: {
    fontSize: 16,
    color: "#666",
  },
  confirmButton: {
    fontSize: 16,
    color: "#0066cc",
    fontWeight: "bold",
  },
  pickerContainer: {
    flexDirection: "row",
    height: 200,
  },
  pickerWrapper: {
    flex: 1,
  },
  picker: {
    flex: 1,
  },
});

export default SelectMonthModal;
