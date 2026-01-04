/**
 * CartButton Component - Floating Cart Button
 */
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useCartStore } from '../stores/cartStore';
import { theme } from '../theme/theme';

interface CartButtonProps {
  onPress: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ onPress }) => {
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (totalItems === 0) return null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{totalItems}</Text>
      </View>
      <Text style={styles.text}>🛒 View Cart</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius.full,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
  },
  text: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
