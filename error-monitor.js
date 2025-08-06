// 🔧 ERROR MONITORING & DEBUGGING SCRIPT
// Quick diagnostics for the Aranya One platform

const fs = require('fs');
const path = require('path');

class ErrorMonitor {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.startTime = Date.now();
  }

  async runDiagnostics() {
    console.log('🔍 Running Aranya One Platform Diagnostics...\n');
    
    // Check package.json dependencies
    await this.checkDependencies();
    
    // Check configuration files
    await this.checkConfigurations();
    
    // Check critical files
    await this.checkCriticalFiles();
    
    // Generate report
    this.generateReport();
  }

  async checkDependencies() {
    console.log('📦 Checking Dependencies...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const requiredDeps = [
        'next',
        'react',
        'framer-motion',
        'lucide-react',
        'tailwindcss',
        '@tailwindcss/postcss'
      ];

      for (const dep of requiredDeps) {
        if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
          this.errors.push(`Missing dependency: ${dep}`);
        } else {
          console.log(`  ✅ ${dep}`);
        }
      }

      const optionalDeps = [
        '@anthropic-ai/sdk',
        'openai',
        'critters'
      ];

      for (const dep of optionalDeps) {
        if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
          this.warnings.push(`Optional dependency missing: ${dep}`);
        } else {
          console.log(`  ✅ ${dep} (optional)`);
        }
      }

    } catch (error) {
      this.errors.push(`Cannot read package.json: ${error.message}`);
    }
    
    console.log('');
  }

  async checkConfigurations() {
    console.log('⚙️ Checking Configuration Files...');
    
    const configs = [
      'next.config.js',
      'tailwind.config.js',
      'postcss.config.js'
    ];

    for (const config of configs) {
      if (fs.existsSync(config)) {
        console.log(`  ✅ ${config}`);
        
        // Check for common issues
        if (config === 'postcss.config.js') {
          const content = fs.readFileSync(config, 'utf8');
          if (content.includes('tailwindcss: {}') && content.includes('@tailwindcss/postcss')) {
            this.warnings.push('PostCSS config has both old and new Tailwind configs');
          }
        }
        
        if (config === 'next.config.js') {
          const content = fs.readFileSync(config, 'utf8');
          if (content.includes('experimental:') && content.includes('turbo:')) {
            this.warnings.push('Next.js config uses deprecated experimental.turbo');
          }
        }
      } else {
        this.errors.push(`Missing configuration file: ${config}`);
      }
    }
    
    console.log('');
  }

  async checkCriticalFiles() {
    console.log('📁 Checking Critical Files...');
    
    const criticalPaths = [
      'app/page.js',
      'app/layout.js',
      'app/globals.css',
      'lib/advanced-integration-engine.js',
      'lib/advanced-analytics-engine.js',
      'app/services-integration-hub/page.js',
      'app/performance-optimization/page.js',
      'app/system-testing/page.js'
    ];

    for (const filePath of criticalPaths) {
      if (fs.existsSync(filePath)) {
        console.log(`  ✅ ${filePath}`);
        
        // Check for common issues in files
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
          // Check for missing imports
          if (content.includes("import") && content.includes("from 'framer-motion'") && !this.hasFramerMotion()) {
            this.warnings.push(`${filePath} imports framer-motion but it may not be installed`);
          }
          
          // Check for syntax errors (basic)
          const openBraces = (content.match(/{/g) || []).length;
          const closeBraces = (content.match(/}/g) || []).length;
          if (openBraces !== closeBraces) {
            this.errors.push(`${filePath} has mismatched braces`);
          }
        }
      } else {
        this.errors.push(`Missing critical file: ${filePath}`);
      }
    }
    
    console.log('');
  }

  hasFramerMotion() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return packageJson.dependencies['framer-motion'] || packageJson.devDependencies['framer-motion'];
    } catch {
      return false;
    }
  }

  generateReport() {
    const duration = Date.now() - this.startTime;
    
    console.log('📊 DIAGNOSTIC REPORT');
    console.log('='.repeat(50));
    console.log(`⏱️  Scan Duration: ${duration}ms`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log('');

    if (this.errors.length > 0) {
      console.log('❌ ERRORS:');
      this.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
      console.log('');
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  WARNINGS:');
      this.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning}`);
      });
      console.log('');
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('🎉 ALL CHECKS PASSED! Platform is healthy.');
    } else if (this.errors.length === 0) {
      console.log('✅ No critical errors found. Warnings are minor issues.');
    } else {
      console.log('🚨 Critical errors found. Please fix before deployment.');
    }

    console.log('');
    console.log('🚀 Quick Fixes:');
    console.log('  npm install @tailwindcss/postcss critters');
    console.log('  npm install @anthropic-ai/sdk openai (optional)');
    console.log('  npm run dev (restart development server)');
    console.log('');
  }
}

// Run diagnostics if called directly
if (require.main === module) {
  const monitor = new ErrorMonitor();
  monitor.runDiagnostics().catch(console.error);
}

module.exports = ErrorMonitor;
