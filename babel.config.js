module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./src"],
                extensions: [".ios.ts", ".android.ts", ".ts", ".ios.tsx", ".android.tsx", ".tsx", ".jsx", ".js", ".json"]
            }
        ],
        [
            "module:react-native-dotenv",
            {
                moduleName: "@env",
                path: ".env"
            }
        ],
        [
            "@babel/plugin-transform-private-methods",
            {
                loose: true
            }
        ]
    ]
}
