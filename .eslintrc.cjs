module.exports = {
    env: { browser: true, node: true, es2021: true },
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        sourceType: 'module',
        ecmaVersion: 'latest',
        babelOptions: {
            plugins: ['@babel/plugin-syntax-import-attributes']
        },
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'semi': ['error', 'always'],
    },
};
