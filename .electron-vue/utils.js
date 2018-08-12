const PRODUCTION = 'production'

const urlRules = (rules) => {
  return rules.map(({ ext, folder }) => {
    return {
      test: new RegExp(`\.(${ext})(\\\?.*)?$`),
      use: {
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: `${folder}/[name]--[folder].[ext]`
        }
      }
    }
  })
}

module.exports = {PRODUCTION, urlRules}