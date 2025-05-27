// String encoding functions to hide the secret
function _0x2e4f(str) {
    return str.split('').map(c => c.charCodeAt(0)).join(',');
}

function _0x1a8c(encoded) {
    return encoded.split(',').map(n => String.fromCharCode(parseInt(n))).join('');
}

const _0x5b9e = [];
const _0x7f2a = Math.floor(Math.random() * 1000);

function _0x8d3b() {
    const _0x9c4e = _0x3c1d;

    const _0x6a1f = [];

    for (let _0x4e7b = 0; _0x4e7b < _0x9c4e[_0x4a2b[1]]; _0x4e7b++) {
        _0x6a1f[_0x4a2b[2]]({
            index: _0x4e7b,
            char: _0x9c4e[_0x4a2b[0]](_0x4e7b),
            operation: () => {
                try {
                    const _0x3f8d = new Error(`Secret character at position ${_0x4e7b}: '${_0x9c4e[_0x4a2b[0]](_0x4e7b)}'`);
                    _0x3f8d.secretIndex = _0x4e7b;
                    _0x3f8d.secretChar = _0x9c4e[_0x4a2b[0]](_0x4e7b);
                    throw _0x3f8d;
                } catch (_0x2b5c) {
                    // Empty catch block
                }
            }
        });
    }

    return _0x6a1f;
}

function _0x1b7e() {
    const _0x4c9a = _0x8d3b();

    for (let _0x8e2f = _0x4c9a[_0x4a2b[1]] - 1; _0x8e2f > 0; _0x8e2f--) {
        const _0x9d1a = Math.floor(Math.random() * (_0x8e2f + 1));
        [_0x4c9a[_0x8e2f], _0x4c9a[_0x9d1a]] = [_0x4c9a[_0x9d1a], _0x4c9a[_0x8e2f]];
    }
    _0x4c9a.forEach((_0x7b3e, _0x5d8f) => {
        setTimeout(() => {
            try {
                const _0x6e4a = _0x7f2a * Math.PI;
                const _0x8a9b = JSON.stringify({dummy: _0x6e4a});

                _0x7b3e.operation();

                const _0x3f2c = _0x8a9b.length + _0x6e4a;
            } catch (_0x1e5d) {
                // Another empty catch
            }
        }, _0x5d8f * 100);
    });
}
function _0x9a4c() {
    try {
        const _0x2d7e = undefined.property;
    } catch (_0x8f1b) {
        // Empty catch
    }
}

function _0x5e8a() {
    try {
        JSON.parse('{invalid json');
    } catch (_0x4b9c) {
        // Empty catch
    }
}

// Control flow obfuscation with nested try-catch
function _0x7c3f() {
    for (let _0x6d2a = 0; _0x6d2a < 5; _0x6d2a++) {
        try {
            try {
                if (_0x6d2a % 2 === 0) {
                    throw new Error(`Decoy error ${_0x6d2a}`);
                }
            } catch (_0x9e4b) {
                try {
                    const _0x1f8c = _0x9e4b.message.split(' ');
                    throw new Error(_0x1f8c.reverse().join(' '));
                } catch (_0x3a7d) {
                    // Empty catch
                }
            }
        } catch (_0x8b5e) {
            // Empty catch
        }
    }
}

const _0x4f6b = {
    encrypt: function(_0x2c8d) {
        return _0x2c8d.split('').map(_0x9a1e =>
            String.fromCharCode(_0x9a1e.charCodeAt(0) + 1)
        ).join('');
    },
    process: function() {
        try {
            const _0x7e3a = this.encrypt('hidden_data');
            throw new Error(`Encrypted: ${_0x7e3a}`);
        } catch (_0x5c9b) {
            // Empty catch
        }
    }
};

function initChallenge() {

    _0x9a4c();
    _0x5e8a();
    _0x7c3f();
    _0x4f6b.process();
    _0x1b7e();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChallenge);
} else {
    initChallenge();
}
