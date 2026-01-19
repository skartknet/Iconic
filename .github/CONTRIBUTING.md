# Contributing to Iconic 🎨

First off, thank you for considering contributing to Iconic! It's people like you that make Iconic such a great tool for the Umbraco community.

## 🌟 Ways to Contribute

There are many ways you can contribute to Iconic:

- **Report bugs** - Found something that doesn't work? Let us know!
- **Suggest features** - Have an idea to make Iconic better? We'd love to hear it!
- **Improve documentation** - Help others understand and use Iconic better
- **Submit code changes** - Fix bugs, add features, or improve existing code
- **Add icon library configurations** - Help support more icon libraries

## 🐛 Reporting Bugs

Before creating a bug report, please check the [existing issues](https://github.com/marciogoularte/Iconic/issues) to avoid duplicates.

When filing a bug report, please include:

- **Umbraco version** (e.g., 16.0.0, 17.0.0)
- **.NET version** (e.g., .NET 9, .NET 10)
- **Iconic version**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Browser console errors** for UI issues

## 💡 Suggesting Features

We love new ideas! When suggesting a feature:

1. Check [existing issues](https://github.com/marciogoularte/Iconic/issues) to see if it's already proposed
2. Create a new issue with the `enhancement` label
3. Describe the problem you're trying to solve
4. Explain your proposed solution
5. Consider alternative solutions you've thought about

## 🛠️ Development Setup

### Prerequisites

- [.NET 9 or 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) and npm
- Code editor (we recommend [VS Code](https://code.visualstudio.com/))

### Getting Started

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Iconic.git
   cd Iconic
   ```

2. **Install frontend dependencies**
   ```bash
   cd Our.Iconic
   npm install
   ```

3. **Build the frontend**
   ```bash
   npm run build      # Production build
   # OR
   npm run watch      # Watch mode for development
   ```

4. **Build the backend**
   ```bash
   dotnet build Our.Iconic.Core/Our.Iconic.Core.csproj
   dotnet build Our.Iconic/Our.Iconic.csproj
   ```

5. **Run a test site**
   ```bash
   cd UmbracoV16  # or UmbracoV17
   dotnet watch run
   ```

6. **Access the test site**
   - URL: https://localhost:44359 (or as shown in terminal)
   - Login: admin@admin.com
   - Password: Password123

## 📁 Project Structure

```
Iconic/
├── Our.Iconic.Core/        # Backend core (.NET 9/10)
│   ├── Models/             # Icon and Package models
│   └── ValueConverters/    # Property value converters
├── Our.Iconic/             # Frontend UI (Lit web components)
│   ├── src/elements/       # Lit elements
│   └── public/             # Static assets & configs
├── UmbracoV16/             # Test site for Umbraco 16
└── UmbracoV17/             # Test site for Umbraco 17
```

## File Locations

- Backoffice assets go in `Our.Iconic/public/`
- Lit elements go in `Our.Iconic/src/elements/`
- Icon package pre-configs go in `Our.Iconic/public/preconfigs.json`
- Documentation goes in `Documentation/`

## 🧪 Testing

We rely on manual testing using the test sites:

1. Run the appropriate test site (UmbracoV16 or UmbracoV17)
2. Create a new Data Type using the Iconic property editor
3. Configure icon packages in the Data Type settings
4. Add the property to a Document Type
5. Test icon selection and rendering
6. Verify both backoffice and frontend rendering

**Test both Umbraco versions** if your changes affect core functionality.

## 🔄 Making Changes

### Commit Messages

Write clear, descriptive commit messages:

```
Add support for Bootstrap Icons

- Add Bootstrap Icons pre-configuration
- Update documentation with setup instructions
- Add example usage in documentation
```

### Pull Request Process

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code conventions

3. **Test thoroughly** on at least one test site

4. **Update documentation** if needed
   - Update README.md for user-facing changes
   - Update relevant files in Documentation/

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Go to the [original repository](https://github.com/marciogoularte/Iconic)
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template with:
     - Description of changes
     - Related issue number (if applicable)
     - Testing performed
     - Screenshots (for UI changes)

8. **Wait for review** - A maintainer will review your PR and may request changes

## 📦 Adding a New Icon Library

To add support for a new icon library:

1. **Add pre-configuration** to `Our.Iconic/public/preconfigs.json`:
   ```json
   {
     "name": "Library Name",
     "template": "<i class=\"{icon}\"></i>",
     "selector": "regex-pattern",
     "sourcefile": "url-to-css-file",
     "filter": []
   }
   ```

2. **Document the configuration** in `Documentation/Configuration/`

3. **Test the configuration** thoroughly in a test site

4. **Submit a PR** with your changes

## 🚀 Release Process

**Note:** Releases are automated and handled by maintainers only.

The release process uses GitHub Actions:
- Push to `release/*` branch triggers build and publish to NuGet
- Version is extracted from `.csproj` files
- Pre-release versions use format like `17.0.0-beta`

Contributors don't need to worry about releases - just focus on great code!

## 📖 Documentation

Good documentation is just as important as good code! When contributing:

- Update relevant documentation files
- Add code examples for new features
- Keep language clear and friendly
- Include screenshots for UI changes

## ❓ Questions or Need Help?

- **General questions**: Open a [Discussion](https://github.com/marciogoularte/Iconic/discussions)
- **Bug reports**: Create an [Issue](https://github.com/marciogoularte/Iconic/issues)
- **Chat**: Reach out on [Umbraco Discord](https://discord.umbraco.com/)

## 🙏 Recognition

All contributors will be recognized in the project. Your contributions, no matter how small, are valuable and appreciated!

## 📜 Code of Conduct

Be kind, respectful, and constructive. We're all here to make Iconic better for the Umbraco community.

---

**Thank you for contributing to Iconic!** 🎉
