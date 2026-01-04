# 📁 Project Folder Structure

## Overview
This document describes the complete folder structure following Clean Architecture principles.

```
SuaChuaXun-sYonut/
│
├── src/                                    # Source code directory
│   │
│   ├── domain/                             # Domain Layer (Business Logic)
│   │   ├── entities/                       # Business entities
│   │   │   ├── Product.ts                  # Product entity with Topping interface
│   │   │   ├── CartItem.ts                 # Cart item entity
│   │   │   └── Order.ts                    # Order entity with OrderStatus enum
│   │   │
│   │   ├── repositories/                   # Repository interfaces (contracts)
│   │   │   ├── IProductRepository.ts       # Product repository interface
│   │   │   └── IOrderRepository.ts         # Order repository interface
│   │   │
│   │   └── usecases/                       # Application business rules
│   │       ├── GetAllProductsUseCase.ts    # Fetch all products
│   │       ├── GetProductByIdUseCase.ts    # Fetch single product
│   │       └── CreateOrderUseCase.ts       # Create order with validation
│   │
│   ├── data/                               # Data Layer (Infrastructure)
│   │   ├── models/                         # Data models and mappers
│   │   │   └── ProductModel.ts             # ProductDTO and ProductMapper
│   │   │
│   │   ├── datasources/                    # Data sources
│   │   │   └── ProductDataSource.ts        # Mock data source (replace with Supabase)
│   │   │
│   │   └── repositories/                   # Repository implementations
│   │       └── ProductRepository.ts        # Implements IProductRepository
│   │
│   ├── presentation/                       # Presentation Layer (UI)
│   │   ├── screens/                        # Screen components
│   │   │   ├── ProductListScreen.tsx       # Product grid/list view
│   │   │   ├── ProductDetailScreen.tsx     # Product details with toppings
│   │   │   ├── CartScreen.tsx              # Shopping cart view
│   │   │   └── CheckoutScreen.tsx          # Checkout form
│   │   │
│   │   ├── components/                     # Reusable UI components
│   │   │   ├── ProductCard.tsx             # Product card component
│   │   │   └── CartButton.tsx              # Floating cart button with badge
│   │   │
│   │   ├── navigation/                     # Navigation configuration
│   │   │   └── AppNavigator.tsx            # Responsive navigation setup
│   │   │
│   │   ├── stores/                         # State management
│   │   │   ├── cartStore.ts                # Cart state (Zustand)
│   │   │   └── productStore.ts             # Product state (Zustand)
│   │   │
│   │   └── theme/                          # Design system
│   │       └── theme.ts                    # Colors, spacing, typography
│   │
│   └── config/                             # Configuration files
│       └── supabase.ts                     # Supabase configuration
│
├── assets/                                 # Static assets
│   ├── adaptive-icon.png                   # App icon (Android adaptive)
│   ├── icon.png                            # App icon
│   ├── splash-icon.png                     # Splash screen icon
│   └── favicon.png                         # Web favicon
│
├── App.tsx                                 # Main app entry point
├── index.ts                                # Expo entry point
├── app.json                                # Expo configuration
├── package.json                            # Dependencies and scripts
├── tsconfig.json                           # TypeScript configuration
├── .gitignore                              # Git ignore rules
└── README.md                               # Project documentation
```

## Layer Responsibilities

### Domain Layer (`src/domain/`)
- **Pure business logic** - No dependencies on external frameworks
- **Entities**: Core business objects (Product, CartItem, Order)
- **Repository Interfaces**: Contracts that data layer must implement
- **Use Cases**: Orchestrate business rules and entity interactions

### Data Layer (`src/data/`)
- **Data access and persistence**
- **Models**: DTOs and mappers to convert between data and domain models
- **Data Sources**: API clients, database connections (currently mock data)
- **Repository Implementations**: Concrete implementations of domain interfaces

### Presentation Layer (`src/presentation/`)
- **User interface and user interaction**
- **Screens**: Full-page views
- **Components**: Reusable UI elements
- **Navigation**: Routing and navigation structure
- **Stores**: Client-side state management
- **Theme**: Design system (colors, spacing, typography)

## Key Design Patterns

### 1. Repository Pattern
- `IProductRepository` (interface in domain)
- `ProductRepository` (implementation in data)
- Allows switching data sources without changing business logic

### 2. Use Case Pattern
- Each use case is a single class with one responsibility
- Encapsulates business logic
- Can be easily tested in isolation

### 3. Dependency Injection
- Use cases receive dependencies through constructor
- Enables loose coupling and easy testing

### 4. Mapper Pattern
- `ProductMapper` converts between DTOs and domain entities
- Separates data representation from business logic

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- Each use case does one thing
- Each repository handles one entity type
- Each screen has one purpose

### Open/Closed Principle (OCP)
- Use cases are open for extension (can create new ones)
- Closed for modification (existing code doesn't change)

### Liskov Substitution Principle (LSP)
- Any implementation of `IProductRepository` can be substituted
- Mock and real data sources are interchangeable

### Interface Segregation Principle (ISP)
- Small, focused interfaces
- `IProductRepository` only has necessary methods

### Dependency Inversion Principle (DIP)
- High-level modules (use cases) depend on abstractions (interfaces)
- Low-level modules (repositories) implement these abstractions

## Responsive Navigation

### Mobile (< 768px)
- Bottom tab navigation
- 3 tabs: Home, Cart, Checkout

### Tablet (768px - 1023px)
- Bottom tab navigation (same as mobile)
- Wider layouts for better use of space

### Desktop (≥ 1024px)
- Drawer/sidebar navigation
- Persistent left sidebar
- More spacious layouts

## State Management

### Zustand Stores
1. **cartStore**: Shopping cart state
   - Add/remove items
   - Update quantities
   - Calculate totals

2. **productStore**: Product catalog state
   - Product list
   - Loading states
   - Error handling

## Future Enhancements

1. **Supabase Integration**
   - Replace `MockProductDataSource` with `SupabaseProductDataSource`
   - Implement real-time updates
   - Add user authentication

2. **Additional Features**
   - Order history
   - User profiles
   - Product search and filters
   - Favorites/Wishlist

3. **Testing**
   - Unit tests for use cases
   - Integration tests for repositories
   - E2E tests for screens

4. **Performance**
   - Image optimization
   - Lazy loading
   - Caching strategies
