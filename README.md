# 🍦 Yogurt Paradise - Cross-Platform Yogurt App

ứng dụng bán sữa chua đa nền tảng (Cross-platform yogurt selling application)

## 🚀 Features

- **Product Catalog**: Browse delicious yogurt flavors with beautiful images
- **Product Details**: View detailed information and select custom toppings
- **Shopping Cart**: Add items, adjust quantities, and manage your order
- **Checkout**: Complete orders with customer information
- **Responsive Design**: 
  - Desktop: Sidebar navigation
  - Mobile/Tablet: Bottom tab navigation
- **Pastel Theme**: Beautiful, modern UI with soft colors

## 🏗️ Architecture

Built with **Clean Architecture** principles following SOLID design patterns:

```
src/
├── domain/              # Business Logic Layer
│   ├── entities/        # Core business objects (Product, CartItem, Order)
│   ├── repositories/    # Repository interfaces (Dependency Inversion)
│   └── usecases/        # Application business rules
├── data/                # Data Layer
│   ├── models/          # Data models and mappers
│   ├── datasources/     # Data sources (API, Database)
│   └── repositories/    # Repository implementations
├── presentation/        # Presentation Layer
│   ├── screens/         # UI screens
│   ├── components/      # Reusable UI components
│   ├── navigation/      # Navigation configuration
│   ├── stores/          # State management (Zustand)
│   └── theme/           # Design system
└── config/              # App configuration
```

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **Language**: TypeScript (Type-safe)
- **Navigation**: React Navigation (Stack, Tabs, Drawer)
- **State Management**: Zustand
- **Backend**: Supabase (configured, using mock data)
- **Platform Support**: Web, iOS, Android, Desktop (via Expo)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run web      # Web browser
npm run android  # Android emulator/device
npm run ios      # iOS simulator (macOS only)
```

## 🎨 Design System

The app features a beautiful **pastel color theme**:

- **Primary**: Pastel Pink (#FFB6C1)
- **Secondary**: Pastel Green (#B4E7CE)
- **Accent**: Pastel Blue (#C7CEEA)
- **Background**: Light Pink (#FFF9F9)

Responsive breakpoints:
- Mobile: 0-767px
- Tablet: 768-1023px
- Desktop: 1024px+

## 📱 Screens

1. **Product List**: Grid layout of yogurt products
2. **Product Detail**: Detailed view with topping selection
3. **Cart**: Shopping cart with item management
4. **Checkout**: Order form with customer information

## 🔧 SOLID Principles Implementation

- **Single Responsibility**: Each class/module has one specific purpose
- **Open/Closed**: Extendable through interfaces without modification
- **Liskov Substitution**: Repository implementations are interchangeable
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: High-level modules depend on abstractions

## 🔐 Environment Setup

For Supabase integration, create a `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📝 Notes

- Currently using mock data for development
- Supabase integration is configured but not active
- All TypeScript with strict mode enabled
- Follows React Native best practices

## 🤝 Contributing

This project follows Clean Architecture and SOLID principles. Please maintain these standards when contributing.

## 📄 License

MIT
