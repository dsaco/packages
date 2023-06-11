module.exports = {
	rules: {
		// 在数组方法(map, reduce, filter等)的回调中强制执行 return 语句
		'array-callback-return': 2,
		// 禁止 await 进入循环
		// "no-await-in-loop": 2,
		// 禁止操作不影响值的表达式; const y = x === []; y永远为false
		'no-constant-binary-expression': 2,
		// 不允许从构造函数返回值
		// "no-constructor-return": 2,
		// 禁止重复模块导入
		// "no-duplicate-imports": 2,
		// 禁止具有全局非构造函数的 new 运算符; new Symbol 和 new BigInt 都抛出类型错误，因为它们是函数而不是类
		'no-new-native-nonconstructor': 2,
		// 禁止从 Promise 执行器函数返回值
		'no-promise-executor-return': 2,
		// 禁止双方完全相同的比较; if (x === x) {}
		'no-self-compare': 2,
		// 禁止在常规字符串中使用模板字面占位符语法; 'Hello ${name}!'
		// "no-template-curly-in-string": 2,
		// 禁止未修改的循环条件
		// "no-unmodified-loop-condition": 2,
		// 不允许循环体只允许一次迭代
		// "no-unreachable-loop": 2,
		// 禁止未使用的私有类成员
		// "no-unused-private-class-members": 2,
		// 禁止在定义变量之前使用变量; 使用let、const不会有此问题
		// "no-use-before-define": 2,
		// 禁止因使用 await 或 yield 而导致竞争条件的分配; 在编写异步代码时，可能会产生微妙的竞争条件错误。
		'require-atomic-updates': 2,
		// 强制所有控制语句使用一致的括号风格, 当代码块只有一条语句时,也不允许省略大括号
		curly: 2,
		// 要求 Switch 语句中有 Default 分支
		'default-case': 2,
		// 强制 switch 语句中的默认子句在最后
		'default-case-last': 2,
		// 要求使用 === 和 !==
		eqeqeq: 2,
		// 要求使用 let 或 const 而不是 var
		'no-var': 2,
		// 要求或禁止 "Yoda" 条件; if ("red" === color)
		yoda: 2,
		// 禁止在数组括号内出现空格
		'array-bracket-spacing': 2,
		// 要求箭头函数的参数使用圆括号
		'arrow-parens': 2,
		// 强制箭头函数的箭头前后使用一致的空格
		'arrow-spacing': 2,
		// 强制在代码块中开括号前和闭括号后有空格
		'block-spacing': 2,
		// 强制在逗号前后使用一致的空格
		'comma-spacing': 2,
		// 要求或禁止尾随逗号
		'comma-dangle': [
			2,
			{
				arrays: 'only-multiline',
				objects: 'only-multiline',
				imports: 'only-multiline',
				exports: 'only-multiline',
				functions: 'never',
			},
		],
		// 强制所有不包含双引号的 JSX 属性值使用双引号
		'jsx-quotes': 2,
		// 不允许多个空行 默认最多2行
		'no-multiple-empty-lines': 2,
		// 强制使用一致的反勾号、双引号或单引号
		quotes: [
			1,
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		// 强制使用一致的分号
		semi: 2,
		// 强制在块之前使用一致的空格
		'space-before-blocks': 1,
	},
};
