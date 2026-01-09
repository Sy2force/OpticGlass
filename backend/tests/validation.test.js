import { jest } from '@jest/globals';

describe('Input Validation Tests', () => {
  describe('Email Validation', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    test('should accept valid emails', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.org',
        'user+tag@company.co.uk',
        'firstname.lastname@subdomain.domain.com'
      ];

      validEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    test('should reject invalid emails', () => {
      const invalidEmails = [
        'invalid',
        'test@',
        '@domain.com',
        'test.com',
        'test @example.com',
        'test@ example.com'
      ];

      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe('Phone Validation', () => {
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;

    test('should accept valid French phone numbers', () => {
      const validPhones = [
        '+33612345678',
        '0612345678'
      ];

      validPhones.forEach(phone => {
        const cleaned = phone.replace(/\s/g, '');
        expect(phoneRegex.test(cleaned)).toBe(true);
      });
    });
  });

  describe('Postal Code Validation', () => {
    const postalCodeRegex = /^\d{5}$/;

    test('should accept valid French postal codes', () => {
      const validCodes = ['75001', '69001', '13001', '33000'];

      validCodes.forEach(code => {
        expect(postalCodeRegex.test(code)).toBe(true);
      });
    });

    test('should reject invalid postal codes', () => {
      const invalidCodes = ['7500', '750001', 'ABCDE', '75 001'];

      invalidCodes.forEach(code => {
        expect(postalCodeRegex.test(code)).toBe(false);
      });
    });
  });

  describe('Price Validation', () => {
    test('should validate positive prices', () => {
      const validPrices = [0.01, 1, 100, 999.99, 10000];

      validPrices.forEach(price => {
        expect(price > 0).toBe(true);
        expect(typeof price).toBe('number');
      });
    });

    test('should reject invalid prices', () => {
      const invalidPrices = [0, -1, -100];

      invalidPrices.forEach(price => {
        expect(price > 0).toBe(false);
      });
    });
  });

  describe('Quantity Validation', () => {
    test('should validate positive integers', () => {
      const validQuantities = [1, 2, 5, 10, 100];

      validQuantities.forEach(qty => {
        expect(Number.isInteger(qty)).toBe(true);
        expect(qty > 0).toBe(true);
      });
    });

    test('should reject invalid quantities', () => {
      const invalidQuantities = [0, -1, 1.5, 'abc'];

      invalidQuantities.forEach(qty => {
        const isValid = Number.isInteger(qty) && qty > 0;
        expect(isValid).toBe(false);
      });
    });
  });
});

describe('Sanitization Tests', () => {
  describe('XSS Prevention', () => {
    const sanitize = (input) => {
      if (typeof input !== 'string') return input;
      return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    };

    test('should escape HTML tags', () => {
      const malicious = '<script>alert("xss")</script>';
      const sanitized = sanitize(malicious);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('&lt;script&gt;');
    });

    test('should escape quotes', () => {
      const input = 'Test "quoted" and \'single\'';
      const sanitized = sanitize(input);
      
      expect(sanitized).not.toContain('"');
      expect(sanitized).not.toContain("'");
    });
  });

  describe('SQL Injection Prevention', () => {
    const containsSQLInjection = (input) => {
      const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b)/i,
        /(--|;|\/\*|\*\/)/,
        /(\bOR\b\s+\d+\s*=\s*\d+)/i
      ];
      
      return sqlPatterns.some(pattern => pattern.test(input));
    };

    test('should detect SQL injection attempts', () => {
      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "1 OR 1=1",
        "SELECT * FROM users",
        "admin'--"
      ];

      maliciousInputs.forEach(input => {
        expect(containsSQLInjection(input)).toBe(true);
      });
    });

    test('should allow normal inputs', () => {
      const normalInputs = [
        'John Doe',
        'test@example.com',
        'Ray-Ban Aviator',
        '123 Main Street'
      ];

      normalInputs.forEach(input => {
        expect(containsSQLInjection(input)).toBe(false);
      });
    });
  });

  describe('NoSQL Injection Prevention', () => {
    const containsNoSQLInjection = (input) => {
      if (typeof input === 'object' && input !== null) {
        const keys = Object.keys(input);
        return keys.some(key => key.startsWith('$'));
      }
      return false;
    };

    test('should detect NoSQL injection attempts', () => {
      const maliciousInputs = [
        { $gt: '' },
        { $ne: null },
        { $where: 'function(){}' }
      ];

      maliciousInputs.forEach(input => {
        expect(containsNoSQLInjection(input)).toBe(true);
      });
    });

    test('should allow normal objects', () => {
      const normalInputs = [
        { name: 'John' },
        { email: 'test@example.com' },
        'string value'
      ];

      normalInputs.forEach(input => {
        expect(containsNoSQLInjection(input)).toBe(false);
      });
    });
  });
});

describe('Rate Limiting Tests', () => {
  test('should track request count', () => {
    const requestCounts = new Map();
    const ip = '192.168.1.1';
    const limit = 100;
    const windowMs = 60000;

    // Simulate requests
    for (let i = 0; i < 50; i++) {
      const count = (requestCounts.get(ip) || 0) + 1;
      requestCounts.set(ip, count);
    }

    expect(requestCounts.get(ip)).toBe(50);
    expect(requestCounts.get(ip) <= limit).toBe(true);
  });

  test('should block when limit exceeded', () => {
    const requestCounts = new Map();
    const ip = '192.168.1.1';
    const limit = 100;

    requestCounts.set(ip, 101);
    
    const isBlocked = requestCounts.get(ip) > limit;
    expect(isBlocked).toBe(true);
  });
});
