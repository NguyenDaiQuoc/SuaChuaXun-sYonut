/**
 * ProductCard Component - Reusable UI Component
 */
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Product } from '../../domain/entities/Product';
import { theme } from '../theme/theme';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const isDesktop = width >= theme.breakpoints.desktop;
const isTablet = width >= theme.breakpoints.tablet && width < theme.breakpoints.desktop;

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            {product.price.toLocaleString('vi-VN')}₫
          </Text>
          <Text style={styles.toppingsCount}>
            +{product.availableToppings.length} toppings
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
    margin: theme.spacing.sm,
    width: isDesktop ? 280 : isTablet ? 240 : width * 0.45 - theme.spacing.md,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: isDesktop ? 200 : isTablet ? 180 : 160,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  toppingsCount: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.light,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
});
