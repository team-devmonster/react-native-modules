import { ColorSchemeName } from "react-native";

export const textColor = ({ colorScheme }:{ colorScheme:ColorSchemeName }) => colorScheme === 'dark' ? '#ffffff' : '#1f1f1f';