/**
 * ProductDetailScreen - Product Details with Toppings Selection
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Product, Topping } from '../../domain/entities/Product';
import { useCartStore } from '../stores/cartStore';
import { theme } from '../theme/theme';
import { MockProductDataSource } from '../../data/datasources/ProductDataSource';
import { ProductRepository } from '../../data/repositories/ProductRepository';
import { GetProductByIdUseCase } from '../../domain/usecases/GetProductByIdUseCase';

export const ProductDetailScreen = ({ route, navigation }: any) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const dataSource = new MockProductDataSource();
      const repository = new ProductRepository(dataSource);
      const useCase = new GetProductByIdUseCase(repository);

      const fetchedProduct = await useCase.execute(productId);
      setProduct(fetchedProduct);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.find((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      }
      return [...prev, topping];
    });
  };

  const isToppingSelected = (topping: Topping) => {
    return selectedToppings.some((t) => t.id === topping.id);
  };

  const calculateTotal = () => {
    if (!product) return 0;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return (product.price + toppingsPrice) * quantity;
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, selectedToppings, quantity);
      navigation.goBack();
    }
  };

  if (loading || !product) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.basePrice}>
            Base Price: {product.price.toLocaleString('vi-VN')}₫
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Your Toppings</Text>
            <View style={styles.toppingsList}>
              {product.availableToppings.map((topping) => (
                <Pressable
                  key={topping.id}
                  style={[
                    styles.toppingItem,
                    isToppingSelected(topping) && styles.toppingSelected,
                  ]}
                  onPress={() => toggleTopping(topping)}
                >
                  <Text
                    style={[
                      styles.toppingName,
                      isToppingSelected(topping) && styles.toppingNameSelected,
                    ]}
                  >
                    {topping.name}
                  </Text>
                  <Text
                    style={[
                      styles.toppingPrice,
                      isToppingSelected(topping) && styles.toppingPriceSelected,
                    ]}
                  >
                    +{topping.price.toLocaleString('vi-VN')}₫
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <Pressable
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            {calculateTotal().toLocaleString('vi-VN')}₫
          </Text>
        </View>
        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.xl,
  },
  name: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  basePrice: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  toppingsList: {
    gap: theme.spacing.sm,
  },
  toppingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  toppingSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  toppingName: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  toppingNameSelected: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  toppingPrice: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  toppingPriceSelected: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.surface,
    fontWeight: theme.typography.fontWeight.bold,
  },
  quantityText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    minWidth: 40,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.md,
  },
  totalLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  totalPrice: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  addButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
