exports.Package = class Package {
	publish(language = 'imba') {
		const path = language.toLowerCase() == 'imba'
			? 'imba' : (
				language.toLowerCase() == 'typescript' ? 'ts' : 'imba'
			)

		return {
			vendor: {
				paths: {
					[`app/Resolvers/BroadcastServiceResolver.${path}`]: `./formidable/vendor/resolvers/BroadcastServiceResolver.${path}`,
					[`config/broadcasting.${path}`]: `./formidable/vendor/config/broadcasting.${path}`,
					[`routes/channels.${path}`]: `./formidable/vendor/routes/channels.${path}`
				}
			},
			config: {
				paths: {
					[`config/broadcasting.${path}`]: `./formidable/vendor/config/broadcasting.${path}`,
				}
			},
			route: {
				paths: {
					[`routes/channels.${path}`]: `./formidable/vendor/routes/channels.${path}`
				}
			},
			resolver: {
				paths: {
					[`app/Resolvers/BroadcastServiceResolver.${path}`]: `./formidable/vendor/resolvers/BroadcastServiceResolver.${path}`,
				}
			}
		}
	}
}
