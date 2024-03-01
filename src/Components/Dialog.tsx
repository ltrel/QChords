import { StyleSheet, Pressable, Platform } from "react-native";
import { ReactNode } from "react";

export interface DialogProps {
  onPressOutside: () => void;
  children: ReactNode;
}
export default function Dialog({
  onPressOutside,
  children,
}: DialogProps) {

  return (
    <Pressable
      style={[styles.backdrop, styles.noHover]}
      onPress={() => onPressOutside()}
    >
      <Pressable style={[styles.dialog, styles.noHover]}>
        {children}
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  noHover: {
    display: "flex",
    ...Platform.select({
      web: {
        cursor: "default",
      },
    }),
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
    gap: 10,
    marginLeft: 20,
    marginRight: 20,
    maxWidth: 400,
  },
});
