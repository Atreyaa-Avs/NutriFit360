import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  children: ReactNode;
}

export const GilroyBoldText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[{ fontFamily: "Gilroy-Bold" }, style]} {...props}>
      {children}
    </Text>
  );
};

export const GilroyRegularText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[{ fontFamily: "Gilroy-Regular" }, style]} {...props}>
      {children}
    </Text>
  );
};

export const GilroySemiBoldText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[{ fontFamily: "Gilroy-SemiBold" }, style]} {...props}>
      {children}
    </Text>
  );
};

export const GilroyMediumText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[{ fontFamily: "Gilroy-Medium" }, style]} {...props}>
      {children}
    </Text>
  );
};

export const GilroyUltraLightText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[{ fontFamily: "Gilroy-UltraLight" }, style]} {...props}>
      {children}
    </Text>
  );
};

export const CoolJazzText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[{ fontFamily: "Cool-Jazz" }, style]} {...props}>
      {children}
    </Text>
  );
};
