/**
 * ProductListScreen - Main Product Listing
 * Responsive layout with grid
 */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { CartButton } from '../components/CartButton';
import { useProductStore } from '../stores/productStore';
import { theme } from '../theme/theme';
import { MockProductDataSource } from '../../data/datasources/ProductDataSource';
import { ProductRepository } from '../../data/repositories/ProductRepository';
import { GetAllProductsUseCase } from '../../domain/usecases/GetAllProductsUseCase';

const { width } = Dimensions.get('window');
const isDesktop = width >= theme.breakpoints.desktop;
const numColumns = isDesktop ? 3 : 2;

export const ProductListScreen = ({ navigation }: any) => {
  const { products, loading, setProducts, setLoading, setError } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Dependency Injection - Create use case with dependencies
      const dataSource = new MockProductDataSource();
      const repository = new ProductRepository(dataSource);
      const useCase = new GetAllProductsUseCase(repository);

      const fetchedProducts = await useCase.execute();
      setProducts(fetchedProducts);
    } catch (error) {
      setError('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading delicious yogurts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🍦 Yogurt Paradise</Text>
        <Text style={styles.subtitle}>Choose your favorite flavor</Text>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <CartButton onPress={() => navigation.navigate('Cart')} />
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
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.md,
  },
  header: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
  },
  listContent: {
    padding: theme.spacing.sm,
    paddingBottom: 100,
  },
});
