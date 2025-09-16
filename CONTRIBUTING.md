# 🤝 Contributing to Form JSON Generator

Thank you for your interest in contributing to Form JSON Generator! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/form-json-generator.git
   cd form-json-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add comments for complex logic

### Testing
- Write tests for new features
- Ensure all tests pass: `npm test`
- Maintain or improve test coverage

### Linting
- Run linter: `npm run lint`
- Fix linting issues: `npm run lint:fix`
- Ensure code passes all linting checks

## 🐛 Reporting Issues

### Before Creating an Issue
1. Check if the issue already exists
2. Try the latest version
3. Search existing discussions

### Issue Template
When creating an issue, please include:
- **Description**: Clear description of the problem
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable

## 🔧 Pull Requests

### Before Submitting
1. **Update your fork** with the latest changes
2. **Run tests**: `npm test`
3. **Run linter**: `npm run lint`
4. **Build project**: `npm run build`
5. **Test manually** to ensure everything works

### PR Guidelines
- **Clear title**: Descriptive title for your PR
- **Description**: Explain what changes you made and why
- **Link issues**: Reference related issues using `#issue-number`
- **Screenshots**: Include screenshots for UI changes
- **Small changes**: Keep PRs focused and reasonably sized

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── fields/         # Form field components
│   ├── ConfigTab.tsx   # Configuration tab
│   ├── ResultTab.tsx   # Result tab
│   └── FormGenerator.tsx
├── data/               # Static data and examples
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main app component
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Additional field types
- [ ] Form validation improvements
- [ ] Better error handling
- [ ] Performance optimizations

### Medium Priority
- [ ] Theme customization
- [ ] Export functionality
- [ ] Import/export configurations
- [ ] Accessibility improvements

### Low Priority
- [ ] Additional examples
- [ ] Documentation improvements
- [ ] Code refactoring
- [ ] Test coverage improvements

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)

## 💬 Community

- **Discussions**: Use GitHub Discussions for questions and ideas
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Code of Conduct**: Please be respectful and constructive

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Form JSON Generator! 🎉
